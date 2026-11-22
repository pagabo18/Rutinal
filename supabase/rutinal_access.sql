-- Acceso a Rutinal: usuarios que da de alta el administrador, sesiones por token.
-- Aplicado al proyecto de Supabase `rutinal` (migraciones rutinal_access y rutinal_access_only_anon).
-- Las tablas viven en el esquema `private` (no expuesto por la API); la app solo puede
-- llamar a las funciones public.rutinal_* (SECURITY DEFINER) con la llave pública.
create schema if not exists private;
create extension if not exists pgcrypto with schema extensions;

create table private.app_users (
  username   text primary key check (username ~ '^[a-z0-9._-]{3,32}$'),
  pass_hash  text not null,
  role       text not null default 'user' check (role in ('user','admin')),
  active     boolean not null default true,
  note       text,
  created_at timestamptz not null default now(),
  last_login timestamptz
);
create table private.app_sessions (
  token_hash text primary key,
  username   text not null references private.app_users(username) on delete cascade on update cascade,
  created_at timestamptz not null default now(),
  last_seen  timestamptz not null default now()
);
create index app_sessions_username_idx on private.app_sessions (username);
create table private.login_attempts (
  id       bigint generated always as identity primary key,
  username text not null,
  at       timestamptz not null default now()
);
create index login_attempts_user_at_idx on private.login_attempts (username, at);
create index login_attempts_at_idx on private.login_attempts (at);

alter table private.app_users enable row level security;
alter table private.app_sessions enable row level security;
alter table private.login_attempts enable row level security;
revoke all on schema private from anon, authenticated;
revoke all on all tables in schema private from anon, authenticated;

-- ---------- utilidades internas ----------
create function private.norm_user(p text) returns text
language sql immutable set search_path = '' as $$ select lower(btrim(coalesce(p, ''))) $$;

create function private.token_hash(p text) returns text
language sql immutable set search_path = '' as $$ select encode(extensions.digest(coalesce(p, ''), 'sha256'), 'hex') $$;

-- Usuario activo dueño del token (o null)
create function private.session_user_of(p_token text) returns private.app_users
language sql stable security definer set search_path = '' as $$
  select u.* from private.app_sessions s join private.app_users u on u.username = s.username
  where s.token_hash = private.token_hash(p_token) and u.active and length(coalesce(p_token, '')) >= 32
$$;

create function private.too_many_attempts(p_user text) returns boolean
language sql stable security definer set search_path = '' as $$
  select (select count(*) from private.login_attempts where username = p_user and at > now() - interval '15 minutes') >= 8
      or (select count(*) from private.login_attempts where at > now() - interval '1 minute') >= 60
$$;

-- ---------- funciones que llama la app ----------
create function public.rutinal_login(p_user text, p_pass text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_user text := private.norm_user(p_user);
  v_row  private.app_users;
  v_ok   boolean;
  v_token text;
begin
  if v_user = '' or coalesce(p_pass, '') = '' or length(p_pass) > 72 or length(v_user) > 32 then
    return jsonb_build_object('ok', false, 'error', 'invalid');
  end if;
  if private.too_many_attempts(v_user) then
    return jsonb_build_object('ok', false, 'error', 'locked');
  end if;
  select * into v_row from private.app_users where username = v_user;
  -- Siempre se calcula un hash para no revelar por tiempo si el usuario existe
  v_ok := coalesce(v_row.pass_hash, '$2a$10$abcdefghijklmnopqrstuuJ8m9cQmY0b6oXq0bYQ7bq3oYQ7bq3oY') = extensions.crypt(p_pass, coalesce(v_row.pass_hash, '$2a$10$abcdefghijklmnopqrstuuJ8m9cQmY0b6oXq0bYQ7bq3oYQ7bq3oY'))
          and v_row.username is not null;
  if not v_ok then
    insert into private.login_attempts (username) values (v_user);
    delete from private.login_attempts where at < now() - interval '1 day';
    return jsonb_build_object('ok', false, 'error', 'invalid');
  end if;
  if not v_row.active then
    return jsonb_build_object('ok', false, 'error', 'disabled');
  end if;
  delete from private.login_attempts where username = v_user;
  delete from private.app_sessions where last_seen < now() - interval '180 days';
  v_token := encode(extensions.gen_random_bytes(32), 'hex');
  insert into private.app_sessions (token_hash, username) values (private.token_hash(v_token), v_user);
  update private.app_users set last_login = now() where username = v_user;
  return jsonb_build_object('ok', true, 'token', v_token, 'user', v_user, 'role', v_row.role);
end $$;

create function public.rutinal_check(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_row private.app_users;
begin
  v_row := private.session_user_of(p_token);
  if v_row.username is null then
    return jsonb_build_object('ok', false);
  end if;
  update private.app_sessions set last_seen = now()
   where token_hash = private.token_hash(p_token) and last_seen < now() - interval '1 hour';
  return jsonb_build_object('ok', true, 'user', v_row.username, 'role', v_row.role);
end $$;

create function public.rutinal_logout(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
begin
  delete from private.app_sessions where token_hash = private.token_hash(p_token);
  return jsonb_build_object('ok', true);
end $$;

create function public.rutinal_change_password(p_token text, p_old text, p_new text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_row private.app_users;
begin
  v_row := private.session_user_of(p_token);
  if v_row.username is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  if private.too_many_attempts(v_row.username) then return jsonb_build_object('ok', false, 'error', 'locked'); end if;
  if coalesce(p_old, '') = '' or length(p_old) > 72 or v_row.pass_hash <> extensions.crypt(p_old, v_row.pass_hash) then
    insert into private.login_attempts (username) values (v_row.username);
    return jsonb_build_object('ok', false, 'error', 'invalid');
  end if;
  if length(coalesce(p_new, '')) < 6 or length(p_new) > 72 then return jsonb_build_object('ok', false, 'error', 'weak'); end if;
  update private.app_users set pass_hash = extensions.crypt(p_new, extensions.gen_salt('bf', 10)) where username = v_row.username;
  -- cerrar las demás sesiones de ese usuario
  delete from private.app_sessions where username = v_row.username and token_hash <> private.token_hash(p_token);
  return jsonb_build_object('ok', true);
end $$;

-- ---------- administración (solo rol admin) ----------
create function public.rutinal_admin_list(p_token text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_row private.app_users;
begin
  v_row := private.session_user_of(p_token);
  if v_row.username is null or v_row.role <> 'admin' then return jsonb_build_object('ok', false, 'error', 'forbidden'); end if;
  return jsonb_build_object('ok', true, 'users', coalesce((
    select jsonb_agg(jsonb_build_object('username', u.username, 'role', u.role, 'active', u.active, 'note', u.note,
             'created_at', u.created_at, 'last_login', u.last_login,
             'devices', (select count(*) from private.app_sessions s where s.username = u.username)) order by u.created_at)
    from private.app_users u), '[]'::jsonb));
end $$;

create function public.rutinal_admin_save(p_token text, p_user text, p_pass text default null, p_role text default 'user', p_active boolean default true, p_note text default null) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_adm  private.app_users;
  v_user text := private.norm_user(p_user);
  v_old  private.app_users;
  v_role text := coalesce(nullif(p_role, ''), 'user');
  v_active boolean := coalesce(p_active, true);
begin
  v_adm := private.session_user_of(p_token);
  if v_adm.username is null or v_adm.role <> 'admin' then return jsonb_build_object('ok', false, 'error', 'forbidden'); end if;
  if v_user !~ '^[a-z0-9._-]{3,32}$' then return jsonb_build_object('ok', false, 'error', 'bad_user'); end if;
  if v_role not in ('user', 'admin') then return jsonb_build_object('ok', false, 'error', 'bad_role'); end if;
  if coalesce(p_pass, '') <> '' and (length(p_pass) < 6 or length(p_pass) > 72) then return jsonb_build_object('ok', false, 'error', 'weak'); end if;
  select * into v_old from private.app_users where username = v_user;
  if v_old.username is null then
    if coalesce(p_pass, '') = '' then return jsonb_build_object('ok', false, 'error', 'weak'); end if;
    insert into private.app_users (username, pass_hash, role, active, note)
    values (v_user, extensions.crypt(p_pass, extensions.gen_salt('bf', 10)), v_role, v_active, nullif(btrim(coalesce(p_note, '')), ''));
    return jsonb_build_object('ok', true, 'created', true);
  end if;
  -- no quitarse a uno mismo el acceso de administrador
  if v_user = v_adm.username and (v_role <> 'admin' or not v_active) then return jsonb_build_object('ok', false, 'error', 'self'); end if;
  update private.app_users set role = v_role, active = v_active, note = nullif(btrim(coalesce(p_note, '')), ''),
         pass_hash = case when coalesce(p_pass, '') <> '' then extensions.crypt(p_pass, extensions.gen_salt('bf', 10)) else pass_hash end
   where username = v_user;
  if not v_active or coalesce(p_pass, '') <> '' then
    delete from private.app_sessions where username = v_user and token_hash <> private.token_hash(p_token);
  end if;
  delete from private.login_attempts where username = v_user;
  return jsonb_build_object('ok', true, 'created', false);
end $$;

create function public.rutinal_admin_delete(p_token text, p_user text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_adm private.app_users; v_user text := private.norm_user(p_user);
begin
  v_adm := private.session_user_of(p_token);
  if v_adm.username is null or v_adm.role <> 'admin' then return jsonb_build_object('ok', false, 'error', 'forbidden'); end if;
  if v_user = v_adm.username then return jsonb_build_object('ok', false, 'error', 'self'); end if;
  delete from private.app_users where username = v_user;
  return jsonb_build_object('ok', true);
end $$;

-- Permisos: la app (rol anon) solo puede ejecutar las funciones rutinal_*
revoke all on all functions in schema private from public, anon, authenticated;
revoke all on function public.rutinal_login(text, text), public.rutinal_check(text), public.rutinal_logout(text),
  public.rutinal_change_password(text, text, text), public.rutinal_admin_list(text),
  public.rutinal_admin_save(text, text, text, text, boolean, text), public.rutinal_admin_delete(text, text) from public, authenticated;
grant execute on function public.rutinal_login(text, text), public.rutinal_check(text), public.rutinal_logout(text),
  public.rutinal_change_password(text, text, text), public.rutinal_admin_list(text),
  public.rutinal_admin_save(text, text, text, text, boolean, text), public.rutinal_admin_delete(text, text) to anon;

-- El primer administrador se crea a mano (SQL Editor), con una contraseña propia:
--   insert into private.app_users (username, pass_hash, role)
--   values ('admin', extensions.crypt('<contraseña>', extensions.gen_salt('bf', 10)), 'admin');
