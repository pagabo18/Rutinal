-- Fase 5: plantillas del especialista y asignaciones a sus atletas. Fase 6: notas por vínculo.

create function private.kind_allowed(p_role text, p_kind text) returns boolean language sql immutable set search_path = '' as $$
  select case p_kind when 'routine' then p_role in ('coach','fisioterapeuta')
                     when 'diet' then p_role = 'nutriologo'
                     when 'targets' then p_role = 'nutriologo'
                     when 'note' then true else false end
$$;
-- ¿Quien llama tiene un vínculo activo como especialista de ese atleta con ese rol?
create function private.is_my_client(p_client uuid, p_role text) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.links l where l.specialist_id = (select auth.uid()) and l.client_id = p_client
                 and l.role = p_role and l.status = 'active')
$$;
-- ¿Quien llama es parte de ese vínculo? (p_active: exigir que siga activo)
create function private.link_party(p_link uuid, p_active boolean) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.links l where l.id = p_link and (select auth.uid()) in (l.specialist_id, l.client_id)
                 and (not p_active or l.status = 'active'))
$$;
revoke all on function private.kind_allowed(text, text), private.is_my_client(uuid, text), private.link_party(uuid, boolean) from public, anon, authenticated;
grant execute on function private.kind_allowed(text, text), private.is_my_client(uuid, text), private.link_party(uuid, boolean) to authenticated;

-- ---------- plantillas ----------
create table public.templates (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('routine','diet','targets','note')),
  name       text not null check (length(btrim(name)) between 1 and 80),
  payload    jsonb not null check (pg_column_size(payload) < 300000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index templates_owner_idx on public.templates (owner_id);
alter table public.templates enable row level security;
revoke all on public.templates from anon, authenticated;
grant select, insert, update, delete on public.templates to authenticated;
grant all on public.templates to service_role;
create policy templates_own on public.templates for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

-- ---------- asignaciones (copia de una plantilla entregada a un atleta) ----------
create table public.assignments (
  id            uuid primary key default gen_random_uuid(),
  specialist_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  client_id     uuid not null references auth.users(id) on delete cascade,
  role          text not null check (role in ('coach','nutriologo','fisioterapeuta')),
  kind          text not null check (kind in ('routine','diet','targets','note')),
  name          text not null check (length(btrim(name)) between 1 and 80),
  payload       jsonb not null check (pg_column_size(payload) < 300000),
  note          text check (note is null or length(note) <= 500),
  author_name   text check (author_name is null or length(author_name) <= 80),
  status        text not null default 'active' check (status in ('active','ended')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index assignments_client_idx on public.assignments (client_id) where status = 'active';
create index assignments_specialist_idx on public.assignments (specialist_id, client_id);
alter table public.assignments enable row level security;
revoke all on public.assignments from anon, authenticated;
grant select, insert, update on public.assignments to authenticated;
grant all on public.assignments to service_role;
create policy assignments_specialist_select on public.assignments for select to authenticated using (specialist_id = (select auth.uid()));
create policy assignments_client_select on public.assignments for select to authenticated using (client_id = (select auth.uid()));
create policy assignments_specialist_insert on public.assignments for insert to authenticated
  with check (specialist_id = (select auth.uid()) and private.is_my_client(client_id, role) and private.kind_allowed(role, kind));
create policy assignments_specialist_update on public.assignments for update to authenticated
  using (specialist_id = (select auth.uid()))
  with check (specialist_id = (select auth.uid()) and private.kind_allowed(role, kind));

-- ---------- notas entre especialista y atleta ----------
create table public.notes (
  id         uuid primary key default gen_random_uuid(),
  link_id    uuid not null references public.links(id) on delete cascade,
  author_id  uuid not null default auth.uid() references auth.users(id) on delete cascade,
  body       text not null check (length(btrim(body)) between 1 and 1000),
  created_at timestamptz not null default now()
);
create index notes_link_idx on public.notes (link_id, created_at);
alter table public.notes enable row level security;
revoke all on public.notes from anon, authenticated;
grant select, insert on public.notes to authenticated;
grant all on public.notes to service_role;
create policy notes_party_select on public.notes for select to authenticated using (private.link_party(link_id, false));
create policy notes_party_insert on public.notes for insert to authenticated
  with check (author_id = (select auth.uid()) and private.link_party(link_id, true));

-- Al terminar un vínculo se terminan también las asignaciones de ese especialista con ese rol
create function private.end_assignments_on_link_end() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.status = 'ended' and old.status = 'active' then
    update public.assignments set status = 'ended', updated_at = now()
     where specialist_id = new.specialist_id and client_id = new.client_id and role = new.role and status = 'active';
  end if;
  return new;
end $$;
revoke all on function private.end_assignments_on_link_end() from public, anon, authenticated;
create trigger links_end_assignments after update on public.links
  for each row execute function private.end_assignments_on_link_end();
