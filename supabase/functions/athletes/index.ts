// Rutinal · el especialista da de alta a sus atletas.
// La app la llama con el token de sesión en Authorization; se valida contra Supabase Auth.
// Acción `create` { username, password, display_name, roles }:
//   - quien llama debe ser especialista activo, y los servicios (roles) deben ser suyos;
//   - respeta su límite de atletas (profiles.athlete_limit; los administradores no tienen límite),
//     contando atletas activos y cuentas creadas por él que aún no aceptan;
//   - crea la cuenta (sin especialidades) y deja una invitación reservada a ese atleta.
//     El atleta la ve al entrar y decide si acepta compartir; nada se comparte antes.
import { createClient } from "npm:@supabase/supabase-js@2";

const DOMAIN = "rutinal.invalid";
const SPECS = ["coach", "nutriologo", "fisioterapeuta"];
const ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
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
function code8(): string {
  const b = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(b, (x) => ALPHA[x % ALPHA.length]).join("");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);
  try {
    const db = createClient(Deno.env.get("SUPABASE_URL")!, secretKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const body = await req.json().catch(() => ({}));
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    if (!token) return json({ ok: false, error: "session" });
    const { data: got, error: gerr } = await db.auth.getUser(token);
    if (gerr || !got?.user) return json({ ok: false, error: "session" });
    const { data: me } = await db.from("profiles").select("id, is_admin, active, specialties, athlete_limit")
      .eq("id", got.user.id).maybeSingle();
    if (!me || !me.active || !(me.specialties ?? []).length) return json({ ok: false, error: "forbidden" });

    if (String(body.action ?? "") !== "create") return json({ ok: false, error: "action" }, 400);

    const username = String(body.username ?? "").trim().toLowerCase();
    if (!/^[a-z0-9._-]{3,32}$/.test(username)) return json({ ok: false, error: "bad_user" });
    const password = String(body.password ?? "");
    if (password.length < 6 || password.length > 72) return json({ ok: false, error: "weak" });
    const display_name = String(body.display_name ?? "").trim().slice(0, 80) || null;
    let roles: string[] = Array.isArray(body.roles) ? [...new Set(body.roles.map((r: unknown) => String(r)))] : [];
    roles = roles.filter((r) => SPECS.includes(r) && me.specialties.includes(r));
    if (!roles.length) return json({ ok: false, error: "forbidden" });

    if (!me.is_admin) {
      const { data: used, error: se } = await db.rpc("rutinal_slots_for", { p_spec: me.id });
      if (se) return json({ ok: false, error: "server" }, 500);
      if ((used ?? 0) >= (me.athlete_limit ?? 5)) return json({ ok: false, error: "athlete_limit" });
    }
    const { data: taken } = await db.from("profiles").select("id").eq("username", username).maybeSingle();
    if (taken) return json({ ok: false, error: "taken" });

    const { data: cu, error: ce } = await db.auth.admin.createUser({
      email: `${username}@${DOMAIN}`, password, email_confirm: true, user_metadata: { username },
    });
    if (ce || !cu?.user) return json({ ok: false, error: "create" });
    const uid = cu.user.id;
    const { error: pe } = await db.from("profiles")
      .insert({ id: uid, username, display_name, specialties: [], is_admin: false, active: true, created_by: me.id });
    if (pe) { await db.auth.admin.deleteUser(uid); return json({ ok: false, error: "create" }); }

    let done = false;
    for (let i = 0; i < 5 && !done; i++) {
      const code = code8();
      const { error: le } = await db.from("links")
        .insert(roles.map((role) => ({ specialist_id: me.id, client_id: uid, role, status: "pending", code })));
      if (!le) done = true;
    }
    if (!done) { await db.auth.admin.deleteUser(uid); return json({ ok: false, error: "server" }, 500); }
    return json({ ok: true, username });
  } catch (e) {
    console.error("athletes", e);
    return json({ ok: false, error: "server" }, 500);
  }
});
