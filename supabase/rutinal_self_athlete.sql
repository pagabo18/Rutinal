-- El especialista también es su propio atleta: vínculo consigo mismo para los tres
-- servicios (así puede asignarse rutinas, dietas, metas, objetivos y fases), que no
-- ocupa lugar en su límite de atletas.

create or replace function private.athletes_active(p_spec uuid, p_except uuid default null)
returns integer language sql stable security definer set search_path to '' as $$
  select count(distinct client_id)::int from public.links
  where specialist_id = p_spec and status = 'active' and client_id is not null
    and client_id is distinct from p_except and client_id <> specialist_id
$$;

create or replace function public.rutinal_slots_for(p_spec uuid)
returns integer language sql stable security definer set search_path to '' as $$
  select (select count(distinct client_id) from public.links where specialist_id = p_spec and client_id is not null
           and client_id <> specialist_id
           and (status = 'active' or (status = 'pending' and created_at > now() - interval '14 days')))::int
$$;

create or replace function private.links_guard()
returns trigger language plpgsql security definer set search_path to '' as $$
declare sp public.profiles;
begin
  -- una invitación reservada para una persona no la puede aceptar otra
  if tg_op = 'UPDATE' and old.client_id is not null and new.client_id is distinct from old.client_id then
    raise exception 'reserved';
  end if;
  -- el vínculo consigo mismo no cuenta para el límite
  if new.client_id is not null and new.client_id = new.specialist_id then return new; end if;
  select * into sp from public.profiles where id = new.specialist_id;
  if sp.is_admin then return new; end if;
  -- nueva invitación con el cupo lleno
  if tg_op = 'INSERT' and new.status = 'pending' and new.client_id is null
     and private.athletes_active(new.specialist_id) >= sp.athlete_limit then
    raise exception 'athlete_limit';
  end if;
  -- nuevo atleta activo con el cupo lleno (si ya es su atleta por otro servicio, no ocupa otro lugar)
  if new.status = 'active' and (tg_op = 'INSERT' or old.status is distinct from 'active')
     and not exists (select 1 from public.links x where x.specialist_id = new.specialist_id and x.client_id = new.client_id and x.status = 'active' and x.id <> new.id)
     and private.athletes_active(new.specialist_id, new.client_id) >= sp.athlete_limit then
    raise exception 'athlete_limit';
  end if;
  return new;
end $$;

-- Crea (si falta) el vínculo del especialista consigo mismo para los tres servicios.
create or replace function public.rutinal_self_link()
returns jsonb language plpgsql security definer set search_path to '' as $$
declare me public.profiles; r text; n int := 0;
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  if coalesce(array_length(me.specialties, 1), 0) = 0 then return jsonb_build_object('ok', false, 'error', 'not_specialist'); end if;
  foreach r in array array['coach', 'nutriologo', 'fisioterapeuta'] loop
    if not exists (select 1 from public.links where specialist_id = me.id and client_id = me.id and role = r and status = 'active') then
      insert into public.links (specialist_id, client_id, role, status, accepted_at) values (me.id, me.id, r, 'active', now());
      n := n + 1;
    end if;
  end loop;
  return jsonb_build_object('ok', true, 'created', n);
end $$;
revoke all on function public.rutinal_self_link() from public, anon;
grant execute on function public.rutinal_self_link() to authenticated;
