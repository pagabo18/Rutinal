// Rutinal · recuperar el acceso sin sesión iniciada (pantalla de acceso).
// Pública a propósito (verify_jwt = false): quien olvidó su contraseña no tiene token.
// Acciones:
//   reset   { username, code, password }  -> cambia la contraseña si el código de recuperación es correcto.
//                                            El código se consume; 5 fallos bloquean la cuenta 30 minutos.
//   request { username }                  -> deja un aviso para el administrador. Siempre responde ok,
//                                            exista o no el usuario, para no revelar qué cuentas hay.
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function secretKey(): string {
  try {
    const k = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
    if (k && k.default) return k.default;
  } catch (_) { /* sin llaves nuevas */ }
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);
  try {
    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "");
    const username = String(body.username ?? "").trim().toLowerCase();
    if (!/^[a-z0-9._-]{3,32}$/.test(username)) { await wait(600); return json({ ok: false, error: "invalid" }); }
    const db = createClient(Deno.env.get("SUPABASE_URL")!, secretKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    if (action === "request") {
      await db.rpc("rutinal_reset_request", { p_username: username });
      await wait(400);
      return json({ ok: true });
    }

    if (action === "reset") {
      const code = String(body.code ?? "").slice(0, 40);
      const password = String(body.password ?? "");
      if (password.length < 8 || password.length > 72) return json({ ok: false, error: "weak" });
      const { data: uid, error } = await db.rpc("rutinal_recovery_check", { p_username: username, p_code: code });
      if (error) return json({ ok: false, error: "server" }, 500);
      if (!uid) { await wait(800); return json({ ok: false, error: "invalid" }); }
      const { error: ue } = await db.auth.admin.updateUserById(String(uid), { password });
      if (ue) return json({ ok: false, error: "server" }, 500);
      await db.rpc("rutinal_revoke_sessions", { p_user: uid });
      return json({ ok: true });
    }
    return json({ ok: false, error: "action" }, 400);
  } catch (_) {
    return json({ ok: false, error: "server" }, 500);
  }
});
