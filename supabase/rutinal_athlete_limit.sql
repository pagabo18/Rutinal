-- 24 nov 2026 · migración `rutinal_athlete_limit`.
-- Límite de atletas por especialista (activos y distintos; los administradores no tienen límite)
-- y cuentas de atleta creadas por el especialista (función `athletes`), con invitación reservada.
alter table public.profiles add column athlete_limit int not null default 5 check (athlete_limit between 0 and 1000);
alter table public.profiles add column created_by uuid references auth.users(id) on delete set null;
grant select (athlete_limit) on public.profiles to authenticated;

create function private.athletes_active(p_spec uuid, p_except uuid default null) returns int
language sql stable security definer set search_path = '' as $$
  select count(distinct client_id)::int from public.links
  where specialist_id = p_spec and status = 'active' and client_id is not null and client_id is distinct from p_except
$$;

-- Candado en la tabla de vínculos: invitaciones por código, aceptaciones y cuentas creadas por el especialista.
create function private.links_guard() returns trigger
language plpgsql security definer set search_path = '' as $$
declare sp public.profiles;
begin
  if tg_op = 'UPDATE' and old.client_id is not null and new.client_id is distinct from old.client_id then
    raise exception 'reserved';
  end if;
  select * into sp from public.profiles where id = new.specialist_id;
  if sp.is_admin then return new; end if;
  if tg_op = 'INSERT' and new.status = 'pending' and new.client_id is null
     and private.athletes_active(new.specialist_id) >= sp.athlete_limit then
    raise exception 'athlete_limit';
  end if;
  if new.status = 'active' and (tg_op = 'INSERT' or old.status is distinct from 'active')
     and not exists (select 1 from public.links x where x.specialist_id = new.specialist_id and x.client_id = new.client_id and x.status = 'active' and x.id <> new.id)
     and private.athletes_active(new.specialist_id, new.client_id) >= sp.athlete_limit then
    raise exception 'athlete_limit';
  end if;
  return new;
end $$;
create trigger links_guard before insert or update on public.links for each row execute function private.links_guard();

create function public.rutinal_my_slots() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('used', private.athletes_active(p.id),
    'pending', (select count(distinct l.client_id) from public.links l where l.specialist_id = p.id and l.status = 'pending' and l.client_id is not null),
    'limit', p.athlete_limit, 'unlimited', p.is_admin)
  from public.profiles p where p.id = auth.uid()
$$;
revoke all on function public.rutinal_my_slots() from public, anon;
grant execute on function public.rutinal_my_slots() to authenticated;

create function public.rutinal_my_reserved_invite() returns text
language sql stable security definer set search_path = '' as $$
  select code from public.links where client_id = auth.uid() and status = 'pending' and code is not null
    and created_at > now() - interval '14 days' order by created_at desc limit 1
$$;
revoke all on function public.rutinal_my_reserved_invite() from public, anon;
grant execute on function public.rutinal_my_reserved_invite() to authenticated;

create function public.rutinal_slots_for(p_spec uuid) returns int
language sql stable security definer set search_path = '' as $$
  select (select count(distinct client_id) from public.links where specialist_id = p_spec and client_id is not null
           and (status = 'active' or (status = 'pending' and created_at > now() - interval '14 days')))::int
$$;
revoke all on function public.rutinal_slots_for(uuid) from public, anon, authenticated;
grant execute on function public.rutinal_slots_for(uuid) to service_role;
