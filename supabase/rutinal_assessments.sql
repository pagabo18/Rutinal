-- Rutinal · evaluaciones antropométricas (aplicada como migración `rutinal_assessments`, 23 nov 2026)
-- Una fila por evaluación. La escribe el especialista del atleta (o el propio atleta para sí mismo);
-- la leen el atleta y cualquiera de sus especialistas con vínculo activo.

create table public.assessments (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null references auth.users(id) on delete cascade,
  author_id  uuid not null default auth.uid() references auth.users(id) on delete cascade,
  taken_on   date not null default current_date,
  data       jsonb not null default '{}'::jsonb check (pg_column_size(data) <= 16384),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index assessments_client_idx on public.assessments (client_id, taken_on desc);
create index assessments_author_idx on public.assessments (author_id);
alter table public.assessments enable row level security;
revoke all on public.assessments from anon, authenticated;
grant select, insert, update, delete on public.assessments to authenticated;
grant all on public.assessments to service_role;

create policy assessments_select on public.assessments for select to authenticated
  using (client_id = (select auth.uid()) or private.has_client(client_id));
create policy assessments_insert on public.assessments for insert to authenticated
  with check (author_id = (select auth.uid()) and (client_id = (select auth.uid()) or private.has_client(client_id)));
create policy assessments_update on public.assessments for update to authenticated
  using (author_id = (select auth.uid()))
  with check (author_id = (select auth.uid()) and (client_id = (select auth.uid()) or private.has_client(client_id)));
create policy assessments_delete on public.assessments for delete to authenticated
  using (author_id = (select auth.uid()));

create trigger assessments_touch before update on public.assessments
  for each row execute function private.touch_updated_at();
