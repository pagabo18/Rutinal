-- 23 nov 2026 · migración `rutinal_recovery`: recuperación de contraseña sin correo.
-- 1) Código de recuperación: el usuario lo genera con sesión iniciada; aquí solo se guarda su huella (sal + sha256).
-- 2) Solicitud de restablecimiento: quien no tiene código avisa al administrador desde la pantalla de acceso.
-- La función pública `recover` (supabase/functions/recover) es la única que llama a
-- rutinal_recovery_check y rutinal_reset_request, con la llave de servicio.
create table private.recovery (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  salt         text not null,
  hash         text not null,
  created_at   timestamptz not null default now(),
  attempts     int not null default 0,
  locked_until timestamptz
);
create table private.reset_requests (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
revoke all on private.recovery, private.reset_requests from public, anon, authenticated;

create function public.rutinal_recovery_new() returns text
language plpgsql security definer set search_path = '' as $$
declare alpha constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  raw bytea; code text := ''; v_salt text; i int; me uuid := auth.uid();
begin
  if me is null then raise exception 'sin sesion'; end if;
  raw := sha256(uuid_send(gen_random_uuid()) || uuid_send(gen_random_uuid()));
  for i in 0..15 loop code := code || substr(alpha, (get_byte(raw, i) & 31) + 1, 1); end loop;
  v_salt := encode(uuid_send(gen_random_uuid()), 'hex');
  insert into private.recovery (user_id, salt, hash) values (me, v_salt, encode(sha256(convert_to(v_salt || code, 'UTF8')), 'hex'))
  on conflict (user_id) do update set salt = excluded.salt, hash = excluded.hash, created_at = now(), attempts = 0, locked_until = null;
  return substr(code,1,4) || '-' || substr(code,5,4) || '-' || substr(code,9,4) || '-' || substr(code,13,4);
end $$;
revoke all on function public.rutinal_recovery_new() from public, anon;
grant execute on function public.rutinal_recovery_new() to authenticated;

create function public.rutinal_recovery_status() returns timestamptz
language sql stable security definer set search_path = '' as $$
  select created_at from private.recovery where user_id = auth.uid()
$$;
revoke all on function public.rutinal_recovery_status() from public, anon;
grant execute on function public.rutinal_recovery_status() to authenticated;

-- Acierto: devuelve el id y consume el código. Fallo: cuenta el intento; al quinto bloquea 30 minutos.
create function public.rutinal_recovery_check(p_username text, p_code text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare u uuid; r private.recovery%rowtype; c text := upper(regexp_replace(coalesce(p_code,''), '[^A-Za-z0-9]', '', 'g'));
begin
  select id into u from public.profiles where username = lower(trim(coalesce(p_username,''))) and active;
  if u is null then return null; end if;
  select * into r from private.recovery where user_id = u for update;
  if not found then return null; end if;
  if r.locked_until is not null and r.locked_until > now() then return null; end if;
  if length(c) = 16 and r.hash = encode(sha256(convert_to(r.salt || c, 'UTF8')), 'hex') then
    delete from private.recovery where user_id = u;
    delete from private.reset_requests where user_id = u;
    return u;
  end if;
  update private.recovery set attempts = case when attempts >= 4 then 0 else attempts + 1 end,
    locked_until = case when attempts >= 4 then now() + interval '30 minutes' else null end where user_id = u;
  return null;
end $$;
revoke all on function public.rutinal_recovery_check(text, text) from public, anon, authenticated;
grant execute on function public.rutinal_recovery_check(text, text) to service_role;

create function public.rutinal_reset_request(p_username text) returns void
language plpgsql security definer set search_path = '' as $$
declare u uuid;
begin
  select id into u from public.profiles where username = lower(trim(coalesce(p_username,''))) and active;
  if u is null then return; end if;
  if (select count(*) from private.reset_requests where created_at > now() - interval '1 hour') >= 20 then return; end if;
  insert into private.reset_requests (user_id) values (u) on conflict (user_id) do nothing;
end $$;
revoke all on function public.rutinal_reset_request(text) from public, anon, authenticated;
grant execute on function public.rutinal_reset_request(text) to service_role;

create function public.rutinal_admin_reset_requests() returns table (username text, created_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select p.username, q.created_at from private.reset_requests q join public.profiles p on p.id = q.user_id
  where exists (select 1 from public.profiles a where a.id = auth.uid() and a.is_admin and a.active)
$$;
create function public.rutinal_admin_reset_clear(p_username text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not exists (select 1 from public.profiles a where a.id = auth.uid() and a.is_admin and a.active) then raise exception 'forbidden'; end if;
  delete from private.reset_requests q using public.profiles p where p.id = q.user_id and p.username = lower(trim(p_username));
end $$;
revoke all on function public.rutinal_admin_reset_requests() from public, anon;
revoke all on function public.rutinal_admin_reset_clear(text) from public, anon;
grant execute on function public.rutinal_admin_reset_requests() to authenticated;
grant execute on function public.rutinal_admin_reset_clear(text) to authenticated;
