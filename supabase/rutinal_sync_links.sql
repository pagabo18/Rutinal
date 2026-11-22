-- Fase 2: copia en el servidor de los datos de cada cuenta (un documento por clave y, en los
-- registros diarios, por día). Fase 3: vínculos especialista–entrenado y permisos por rol.
-- PENDIENTE DE APLICAR en el proyecto de Supabase `rutinal` (migración rutinal_sync_links).

-- ---------- documentos sincronizados ----------
create table public.user_docs (
  user_id    uuid not null references auth.users(id) on delete cascade,
  key        text not null check (length(key) between 1 and 40),
  sub        text not null default '' check (length(sub) <= 20),   -- 'AAAA-MM-DD' en registros diarios
  value      jsonb,                                                   -- null = borrado
  updated_at timestamptz not null default clock_timestamp(),
  primary key (user_id, key, sub),
  constraint user_docs_size check (value is null or pg_column_size(value) < 700000)
);
create index user_docs_user_updated_idx on public.user_docs (user_id, updated_at);

create function private.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at := clock_timestamp(); return new; end $$;
create trigger user_docs_touch before insert or update on public.user_docs
  for each row execute function private.touch_updated_at();

-- ---------- vínculos ----------
create table public.links (
  id            uuid primary key default gen_random_uuid(),
  specialist_id uuid not null references auth.users(id) on delete cascade,
  client_id     uuid references auth.users(id) on delete cascade,
  role          text not null check (role in ('coach','nutriologo','fisioterapeuta')),
  status        text not null default 'pending' check (status in ('pending','active','ended')),
  code          text unique,
  created_at    timestamptz not null default now(),
  accepted_at   timestamptz,
  ended_at      timestamptz
);
create unique index links_active_uniq on public.links (specialist_id, client_id, role) where status = 'active';
create index links_client_idx on public.links (client_id) where status = 'active';
create index links_specialist_idx on public.links (specialist_id);
alter table public.links enable row level security;
revoke all on public.links from anon, authenticated;
grant all on public.links to service_role;

-- Qué claves puede leer cada rol de especialista
create function private.role_keys(p_role text) returns text[] language sql immutable set search_path = '' as $$
  select case p_role
    when 'coach' then array['gym_logs','gym_routines','gym_schedule','weight_log']
    when 'nutriologo' then array['meal_log','nutri_profile','food_goal_kcal','weight_log','hydration_log','hydration_settings']
    when 'fisioterapeuta' then array['gym_logs','gym_routines','gym_schedule']
    else array[]::text[] end
$$;
-- ¿Quien llama es especialista activo del dueño y su rol incluye esta clave?
create function private.can_read_doc(p_owner uuid, p_key text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.links l
                 where l.client_id = p_owner and l.specialist_id = (select auth.uid()) and l.status = 'active'
                   and p_key = any(private.role_keys(l.role)))
$$;
revoke all on function private.role_keys(text), private.can_read_doc(uuid, text), private.touch_updated_at() from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.can_read_doc(uuid, text) to authenticated;

alter table public.user_docs enable row level security;
revoke all on public.user_docs from anon, authenticated;
grant select, insert, update on public.user_docs to authenticated;
grant all on public.user_docs to service_role;
create policy user_docs_own_select on public.user_docs for select to authenticated using (user_id = (select auth.uid()));
create policy user_docs_own_insert on public.user_docs for insert to authenticated with check (user_id = (select auth.uid()));
create policy user_docs_own_update on public.user_docs for update to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy user_docs_specialist_select on public.user_docs for select to authenticated using (private.can_read_doc(user_id, key));

-- ---------- funciones de vínculos (las llama la app con la sesión del usuario) ----------
create function private.me() returns public.profiles language sql stable security definer set search_path = '' as $$
  select p.* from public.profiles p where p.id = (select auth.uid()) and p.active
$$;
create function private.shown_name(p public.profiles) returns text language sql immutable set search_path = '' as $$
  select coalesce(nullif(btrim(p.display_name), ''), p.username)
$$;
revoke all on function private.me(), private.shown_name(public.profiles) from public, anon, authenticated;

-- El especialista crea una invitación para uno de sus roles
create function public.rutinal_invite(p_role text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare me public.profiles; v_code text; i int;
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  if not (p_role = any(me.specialties)) then return jsonb_build_object('ok', false, 'error', 'forbidden'); end if;
  delete from public.links where status = 'pending' and created_at < now() - interval '14 days';
  if (select count(*) from public.links where specialist_id = me.id and status = 'pending') >= 20 then
    return jsonb_build_object('ok', false, 'error', 'too_many');
  end if;
  for i in 1..5 loop
    v_code := (select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 1 + (get_byte(extensions.gen_random_bytes(1), 0) % 31), 1), '') from generate_series(1, 8));
    begin
      insert into public.links (specialist_id, role, code) values (me.id, p_role, v_code);
      return jsonb_build_object('ok', true, 'code', v_code);
    exception when unique_violation then null; end;
  end loop;
  return jsonb_build_object('ok', false, 'error', 'server');
end $$;

create function public.rutinal_invite_preview(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare me public.profiles; l public.links; sp public.profiles;
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  select * into l from public.links where code = upper(btrim(coalesce(p_code, ''))) and status = 'pending' and created_at > now() - interval '14 days';
  if l.id is null then return jsonb_build_object('ok', false, 'error', 'bad_code'); end if;
  if l.specialist_id = me.id then return jsonb_build_object('ok', false, 'error', 'own_code'); end if;
  select * into sp from public.profiles where id = l.specialist_id and active;
  if sp.id is null then return jsonb_build_object('ok', false, 'error', 'bad_code'); end if;
  return jsonb_build_object('ok', true, 'role', l.role, 'specialist', private.shown_name(sp), 'username', sp.username,
                            'keys', to_jsonb(private.role_keys(l.role)));
end $$;

create function public.rutinal_invite_accept(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare me public.profiles; l public.links;
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  select * into l from public.links where code = upper(btrim(coalesce(p_code, ''))) and status = 'pending' and created_at > now() - interval '14 days' for update;
  if l.id is null then return jsonb_build_object('ok', false, 'error', 'bad_code'); end if;
  if l.specialist_id = me.id then return jsonb_build_object('ok', false, 'error', 'own_code'); end if;
  if exists (select 1 from public.links where specialist_id = l.specialist_id and client_id = me.id and role = l.role and status = 'active') then
    delete from public.links where id = l.id;
    return jsonb_build_object('ok', true, 'already', true);
  end if;
  update public.links set client_id = me.id, status = 'active', code = null, accepted_at = now() where id = l.id;
  return jsonb_build_object('ok', true);
end $$;

-- Cualquiera de las dos partes termina el vínculo (o el especialista cancela una invitación)
create function public.rutinal_link_end(p_id uuid) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare me public.profiles; l public.links;
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  select * into l from public.links where id = p_id and (specialist_id = me.id or client_id = me.id);
  if l.id is null then return jsonb_build_object('ok', false, 'error', 'not_found'); end if;
  if l.status = 'pending' then delete from public.links where id = l.id;
  else update public.links set status = 'ended', ended_at = now(), code = null where id = l.id; end if;
  return jsonb_build_object('ok', true);
end $$;

-- Mis vínculos: como entrenado (mis especialistas) y como especialista (mis entrenados, con resumen)
create function public.rutinal_my_links() returns jsonb
language plpgsql security definer set search_path = '' as $$
declare me public.profiles; d7 text := to_char((now() at time zone 'America/Mexico_City')::date - 6, 'YYYY-MM-DD');
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  return jsonb_build_object('ok', true,
    'as_client', coalesce((select jsonb_agg(jsonb_build_object('id', l.id, 'role', l.role, 'name', private.shown_name(sp), 'username', sp.username,
                             'since', l.accepted_at, 'keys', to_jsonb(private.role_keys(l.role))) order by l.accepted_at)
                           from public.links l join public.profiles sp on sp.id = l.specialist_id
                           where l.client_id = me.id and l.status = 'active'), '[]'::jsonb),
    'as_specialist', coalesce((select jsonb_agg(x.j order by x.ord) from (
        select l.created_at as ord, jsonb_build_object('id', l.id, 'role', l.role, 'status', l.status, 'code', l.code, 'since', coalesce(l.accepted_at, l.created_at),
                 'client_id', l.client_id, 'name', case when c.id is null then null else private.shown_name(c) end, 'username', c.username,
                 'last_activity', (select max(d.updated_at) from public.user_docs d where d.user_id = l.client_id and d.key = any(private.role_keys(l.role))),
                 'meals7', case when l.role = 'nutriologo' then (select count(*) from public.user_docs d where d.user_id = l.client_id and d.key = 'meal_log' and d.sub >= d7 and d.value is not null and d.value <> '{}'::jsonb) end,
                 'workouts7', case when l.role in ('coach','fisioterapeuta') then (select count(*) from public.user_docs d where d.user_id = l.client_id and d.key = 'gym_logs' and d.sub >= d7 and coalesce((d.value->>'done')::boolean, false)) end,
                 'pain7', case when l.role in ('coach','fisioterapeuta') then (select max((d.value->'feel'->>'pain')::numeric) from public.user_docs d where d.user_id = l.client_id and d.key = 'gym_logs' and d.sub >= d7 and d.value->'feel'->>'pain' is not null) end
               ) as j
        from public.links l left join public.profiles c on c.id = l.client_id
        where l.specialist_id = me.id and l.status in ('pending','active')) x), '[]'::jsonb));
end $$;

revoke all on function public.rutinal_invite(text), public.rutinal_invite_preview(text), public.rutinal_invite_accept(text),
  public.rutinal_link_end(uuid), public.rutinal_my_links() from public, anon;
grant execute on function public.rutinal_invite(text), public.rutinal_invite_preview(text), public.rutinal_invite_accept(text),
  public.rutinal_link_end(uuid), public.rutinal_my_links() to authenticated;
