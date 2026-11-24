-- 24 nov 2026 · migración `rutinal_signup_verification`.
-- Registro propio de atletas (función pública `signup`) y verificación de especialistas.
-- Resumen (el SQL completo va abajo):
--   profiles: privacy_at, cedula (6–10 dígitos), verified_at.
--   private.contacts: correo de contacto (sin verificar mientras no haya envío de correos).
--   private.signup_log + rutinal_signup_allowed(ip_hash): 5 registros por IP por hora y 60 en total (solo servidor).
--   public.specialist_applications (RLS: cada quien ve la suya) + rutinal_apply_specialist(roles, nombre, cédula, estudios):
--     nutriólogo y fisioterapeuta requieren cédula; reenviar la deja otra vez pendiente.
--   Administrador: rutinal_admin_applications(), rutinal_admin_review(usuario, aprobar, roles, nota),
--     rutinal_admin_set_verification(usuario, cédula, verificado), rutinal_admin_verifications().
--   rutinal_specialist_badge(usuario): { verified, cedula } de un especialista, para quien tiene sesión.
-- Verificado en la base real (cambios deshechos): sin cédula se rechaza, un tercero no ve solicitudes ajenas,
-- solo el administrador aprueba, la aprobación suma la especialidad y marca verificado, sexto registro por IP bloqueado.

alter table public.profiles add column privacy_at timestamptz;
alter table public.profiles add column cedula text check (cedula is null or cedula ~ '^[0-9]{6,10}$');
alter table public.profiles add column verified_at timestamptz;
grant select (privacy_at, cedula, verified_at) on public.profiles to authenticated;

create table private.contacts (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null check (length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  verified   boolean not null default false,
  created_at timestamptz not null default now()
);
create table private.signup_log (ip_hash text not null, created_at timestamptz not null default now());
create index signup_log_idx on private.signup_log (created_at);
revoke all on private.contacts, private.signup_log from public, anon, authenticated;

create function public.rutinal_signup_allowed(p_ip_hash text) returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  delete from private.signup_log where created_at < now() - interval '1 day';
  if (select count(*) from private.signup_log where ip_hash = p_ip_hash and created_at > now() - interval '1 hour') >= 5 then return false; end if;
  if (select count(*) from private.signup_log where created_at > now() - interval '1 hour') >= 60 then return false; end if;
  insert into private.signup_log (ip_hash) values (p_ip_hash);
  return true;
end $$;
create function public.rutinal_signup_contact(p_user uuid, p_email text) returns void
language sql security definer set search_path = '' as $$
  insert into private.contacts (user_id, email) values (p_user, lower(btrim(p_email))) on conflict (user_id) do update set email = excluded.email, verified = false
$$;
revoke all on function public.rutinal_signup_allowed(text), public.rutinal_signup_contact(uuid, text) from public, anon, authenticated;
grant execute on function public.rutinal_signup_allowed(text), public.rutinal_signup_contact(uuid, text) to service_role;

create table public.specialist_applications (
  user_id     uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  roles       text[] not null check (cardinality(roles) between 1 and 3 and roles <@ array['coach','nutriologo','fisioterapeuta']::text[]),
  full_name   text not null check (length(btrim(full_name)) between 3 and 120),
  cedula      text check (cedula is null or cedula ~ '^[0-9]{6,10}$'),
  credentials text check (credentials is null or length(credentials) <= 600),
  status      text not null default 'pending' check (status in ('pending','approved','rejected')),
  review_note text check (review_note is null or length(review_note) <= 300),
  created_at  timestamptz not null default now(),
  reviewed_at timestamptz
);
alter table public.specialist_applications enable row level security;
revoke all on public.specialist_applications from anon, authenticated;
grant select on public.specialist_applications to authenticated;
grant all on public.specialist_applications to service_role;
create policy spapp_own_select on public.specialist_applications for select to authenticated using (user_id = (select auth.uid()));

create function public.rutinal_apply_specialist(p_roles text[], p_full_name text, p_cedula text, p_credentials text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare me public.profiles; c text := nullif(regexp_replace(coalesce(p_cedula,''), '[^0-9]', '', 'g'), '');
  r text[] := array(select distinct x from unnest(coalesce(p_roles, '{}')) x where x in ('coach','nutriologo','fisioterapeuta'));
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  if cardinality(r) = 0 then return jsonb_build_object('ok', false, 'error', 'roles'); end if;
  if length(btrim(coalesce(p_full_name,''))) < 3 then return jsonb_build_object('ok', false, 'error', 'name'); end if;
  if (r && array['nutriologo','fisioterapeuta']) and (c is null or c !~ '^[0-9]{6,10}$') then return jsonb_build_object('ok', false, 'error', 'cedula'); end if;
  if exists (select 1 from public.specialist_applications where user_id = me.id and status = 'pending' and created_at > now() - interval '1 minute') then
    return jsonb_build_object('ok', false, 'error', 'wait'); end if;
  insert into public.specialist_applications (user_id, roles, full_name, cedula, credentials)
  values (me.id, r, btrim(p_full_name), c, nullif(btrim(left(coalesce(p_credentials,''), 600)), ''))
  on conflict (user_id) do update set roles = excluded.roles, full_name = excluded.full_name, cedula = excluded.cedula,
    credentials = excluded.credentials, status = 'pending', review_note = null, created_at = now(), reviewed_at = null;
  return jsonb_build_object('ok', true);
end $$;
revoke all on function public.rutinal_apply_specialist(text[], text, text, text) from public, anon;
grant execute on function public.rutinal_apply_specialist(text[], text, text, text) to authenticated;

create function public.rutinal_admin_applications() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(jsonb_build_object('username', p.username, 'display_name', p.display_name, 'roles', a.roles, 'full_name', a.full_name,
    'cedula', a.cedula, 'credentials', a.credentials, 'status', a.status, 'created_at', a.created_at) order by a.created_at), '[]'::jsonb)
  from public.specialist_applications a join public.profiles p on p.id = a.user_id
  where a.status = 'pending' and exists (select 1 from public.profiles x where x.id = auth.uid() and x.is_admin and x.active)
$$;
create function public.rutinal_admin_review(p_username text, p_approve boolean, p_roles text[], p_note text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare u public.profiles; a public.specialist_applications;
  r text[] := array(select distinct x from unnest(coalesce(p_roles, '{}')) x where x in ('coach','nutriologo','fisioterapeuta'));
begin
  if not exists (select 1 from public.profiles x where x.id = auth.uid() and x.is_admin and x.active) then return jsonb_build_object('ok', false, 'error', 'forbidden'); end if;
  select * into u from public.profiles where username = lower(btrim(p_username));
  select * into a from public.specialist_applications where user_id = u.id;
  if a.user_id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if p_approve then
    if cardinality(r) = 0 then return jsonb_build_object('ok', false, 'error', 'roles'); end if;
    update public.profiles set specialties = array(select distinct x from unnest(specialties || r) x),
      display_name = coalesce(nullif(btrim(display_name), ''), a.full_name), cedula = coalesce(a.cedula, cedula), verified_at = now() where id = u.id;
    update public.specialist_applications set status = 'approved', roles = r, review_note = nullif(btrim(left(coalesce(p_note,''), 300)), ''), reviewed_at = now() where user_id = u.id;
  else
    update public.specialist_applications set status = 'rejected', review_note = nullif(btrim(left(coalesce(p_note,''), 300)), ''), reviewed_at = now() where user_id = u.id;
  end if;
  return jsonb_build_object('ok', true);
end $$;
create function public.rutinal_admin_set_verification(p_username text, p_cedula text, p_verified boolean) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare c text := nullif(regexp_replace(coalesce(p_cedula,''), '[^0-9]', '', 'g'), '');
begin
  if not exists (select 1 from public.profiles x where x.id = auth.uid() and x.is_admin and x.active) then return jsonb_build_object('ok', false, 'error', 'forbidden'); end if;
  if c is not null and c !~ '^[0-9]{6,10}$' then return jsonb_build_object('ok', false, 'error', 'cedula'); end if;
  update public.profiles set cedula = c, verified_at = case when p_verified then coalesce(verified_at, now()) else null end where username = lower(btrim(p_username));
  return jsonb_build_object('ok', true);
end $$;
create function public.rutinal_admin_verifications() returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_object_agg(p.username, jsonb_build_object('cedula', p.cedula, 'verified', p.verified_at is not null,
    'email', (select c.email from private.contacts c where c.user_id = p.id))), '{}'::jsonb)
  from public.profiles p where exists (select 1 from public.profiles x where x.id = auth.uid() and x.is_admin and x.active)
$$;
revoke all on function public.rutinal_admin_applications(), public.rutinal_admin_review(text, boolean, text[], text),
  public.rutinal_admin_set_verification(text, text, boolean), public.rutinal_admin_verifications() from public, anon;
grant execute on function public.rutinal_admin_applications(), public.rutinal_admin_review(text, boolean, text[], text),
  public.rutinal_admin_set_verification(text, text, boolean), public.rutinal_admin_verifications() to authenticated;

create function public.rutinal_specialist_badge(p_username text) returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('verified', p.verified_at is not null, 'cedula', p.cedula)
  from public.profiles p where p.username = lower(btrim(p_username)) and cardinality(p.specialties) > 0 and auth.uid() is not null
$$;
revoke all on function public.rutinal_specialist_badge(text) from public, anon;
grant execute on function public.rutinal_specialist_badge(text) to authenticated;
