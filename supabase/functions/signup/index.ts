// Rutinal · registro propio de atletas desde la pantalla de acceso.
// Pública a propósito (verify_jwt = false): quien se registra aún no tiene sesión.
// Crea una cuenta de atleta (sin especialidades). Para ser especialista se pide después desde la app
// y lo aprueba el administrador. Límite: 5 registros por IP por hora y 60 en total por hora
// (se guarda solo una huella de la IP).
// { username, password, display_name?, email?, privacy: true }
import { createClient } from "npm:@supabase/supabase-js@2";

const DOMAIN = "rutinal.invalid";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

function secretKey(): string {
  try {
    const k = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
    if (k && k.default) return k.default;
  } catch (_) { /* sin llaves nuevas */ }
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
}
async function sha(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);
  try {
    const body = await req.json().catch(() => ({}));
    const username = String(body.username ?? "").trim().toLowerCase();
    if (!/^[a-z0-9._-]{3,32}$/.test(username)) return json({ ok: false, error: "bad_user" });
    const password = String(body.password ?? "");
    if (password.length < 8 || password.length > 72) return json({ ok: false, error: "weak" });
    if (body.privacy !== true) return json({ ok: false, error: "privacy" });
    const display_name = String(body.display_name ?? "").trim().slice(0, 80) || null;
    const email = String(body.email ?? "").trim().toLowerCase();
    if (email && (email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))) return json({ ok: false, error: "email" });
    if (String(body.website ?? "")) return json({ ok: true, username }); // trampa para bots: campo oculto

    const db = createClient(Deno.env.get("SUPABASE_URL")!, secretKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "sin-ip";
    const { data: allowed, error: ae } = await db.rpc("rutinal_signup_allowed", { p_ip_hash: await sha("rutinal-signup:" + ip) });
    if (ae) return json({ ok: false, error: "server" }, 500);
    if (!allowed) return json({ ok: false, error: "locked" });

    const { data: taken } = await db.from("profiles").select("id").eq("username", username).maybeSingle();
    if (taken) return json({ ok: false, error: "taken" });

    const { data: cu, error: ce } = await db.auth.admin.createUser({
      email: `${username}@${DOMAIN}`, password, email_confirm: true, user_metadata: { username },
    });
    if (ce || !cu?.user) return json({ ok: false, error: "taken" });
    const uid = cu.user.id;
    const { error: pe } = await db.from("profiles").insert({
      id: uid, username, display_name, specialties: [], is_admin: false, active: true, privacy_at: new Date().toISOString(),
    });
    if (pe) { await db.auth.admin.deleteUser(uid); return json({ ok: false, error: "server" }, 500); }
    if (email) await db.rpc("rutinal_signup_contact", { p_user: uid, p_email: email });
    return json({ ok: true, username });
  } catch (e) {
    console.error("signup", e);
    return json({ ok: false, error: "server" }, 500);
  }
});
