// Rutinal · administración de usuarios (solo cuentas con is_admin).
// La app la llama con el token de sesión del usuario en Authorization. Aquí se valida ese
// token contra Supabase Auth y se comprueba que el perfil sea administrador y esté activo.
// Acciones: list, save (alta o edición, incluye athlete_limit), delete.
import { createClient } from "npm:@supabase/supabase-js@2";

const DOMAIN = "rutinal.invalid"; // los usuarios entran con nombre de usuario; el correo es interno y no recibe mensajes
const SPECS = ["coach", "nutriologo", "fisioterapeuta"];
const BAN = "876000h"; // ~100 años: cuenta desactivada
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405);
  try {
    const db = createClient(Deno.env.get("SUPABASE_URL")!, secretKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "");

    // ---- quién llama ----
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    if (!token) return json({ ok: false, error: "session" });
    const { data: got, error: gerr } = await db.auth.getUser(token);
    if (gerr || !got?.user) return json({ ok: false, error: "session" });
    const { data: me } = await db.from("profiles").select("id, username, is_admin, active")
      .eq("id", got.user.id).maybeSingle();
    if (!me || !me.active || !me.is_admin) return json({ ok: false, error: "forbidden" });

    if (action === "list") {
      const { data: profs, error } = await db.from("profiles").select("*").order("created_at");
      if (error) return json({ ok: false, error: "server", detail: error.message }, 500);
      const { data: lu } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const last = new Map((lu?.users ?? []).map((u) => [u.id, u.last_sign_in_at ?? null]));
      return json({
        ok: true,
        users: (profs ?? []).map((p) => ({
          username: p.username, display_name: p.display_name, specialties: p.specialties,
          is_admin: p.is_admin, active: p.active, note: p.note, created_at: p.created_at,
          athlete_limit: p.athlete_limit,
          created_by: (profs ?? []).find((x) => x.id === p.created_by)?.username ?? null,
          last_login: last.get(p.id) ?? null,
        })),
      });
    }

    if (action === "save") {
      const username = String(body.username ?? "").trim().toLowerCase();
      if (!/^[a-z0-9._-]{3,32}$/.test(username)) return json({ ok: false, error: "bad_user" });
      const password = body.password ? String(body.password) : "";
      if (password && (password.length < 6 || password.length > 72)) return json({ ok: false, error: "weak" });
      const specialties = Array.isArray(body.specialties)
        ? [...new Set(body.specialties.map((s: unknown) => String(s)))].filter((s) => SPECS.includes(s as string))
        : [];
      const is_admin = !!body.is_admin;
      const active = body.active !== false;
      const note = String(body.note ?? "").trim().slice(0, 200) || null;
      const display_name = String(body.display_name ?? "").trim().slice(0, 80) || null;
      const lim = Number(body.athlete_limit);
      const limit = Number.isInteger(lim) && lim >= 0 && lim <= 1000 ? lim : null;

      const { data: old } = await db.from("profiles").select("id").eq("username", username).maybeSingle();
      if (!old) {
        if (!password) return json({ ok: false, error: "weak" });
        const { data: cu, error: ce } = await db.auth.admin.createUser({
          email: `${username}@${DOMAIN}`, password, email_confirm: true, user_metadata: { username },
        });
        if (ce || !cu?.user) return json({ ok: false, error: "create", detail: ce?.message ?? "" });
        const { error: pe } = await db.from("profiles")
          .insert({ id: cu.user.id, username, display_name, specialties, is_admin, active, note, ...(limit != null ? { athlete_limit: limit } : {}) });
        if (pe) {
          await db.auth.admin.deleteUser(cu.user.id);
          return json({ ok: false, error: "create", detail: pe.message });
        }
        if (!active) await db.auth.admin.updateUserById(cu.user.id, { ban_duration: BAN });
        return json({ ok: true, created: true });
      }
      // no quitarse a uno mismo el acceso de administrador
      if (old.id === me.id && (!is_admin || !active)) return json({ ok: false, error: "self" });
      const attrs: Record<string, unknown> = { ban_duration: active ? "none" : BAN };
      if (password) attrs.password = password;
      const { error: ue } = await db.auth.admin.updateUserById(old.id, attrs);
      if (ue) return json({ ok: false, error: "server", detail: ue.message }, 500);
      const { error: pe } = await db.from("profiles")
        .update({ display_name, specialties, is_admin, active, note, ...(limit != null ? { athlete_limit: limit } : {}) }).eq("id", old.id);
      if (pe) return json({ ok: false, error: "server", detail: pe.message }, 500);
      // cerrar sus sesiones si se desactivó o se le cambió la contraseña
      if ((!active || password) && old.id !== me.id) await db.rpc("rutinal_revoke_sessions", { p_user: old.id });
      return json({ ok: true, created: false });
    }

    if (action === "delete") {
      const username = String(body.username ?? "").trim().toLowerCase();
      const { data: old } = await db.from("profiles").select("id").eq("username", username).maybeSingle();
      if (!old) return json({ ok: true });
      if (old.id === me.id) return json({ ok: false, error: "self" });
      const { error: de } = await db.auth.admin.deleteUser(old.id);
      if (de) return json({ ok: false, error: "server", detail: de.message }, 500);
      return json({ ok: true });
    }

    return json({ ok: false, error: "action" }, 400);
  } catch (e) {
    console.error("admin-users", e);
    return json({ ok: false, error: "server", detail: String((e as Error)?.message ?? e) }, 500);
  }
});
