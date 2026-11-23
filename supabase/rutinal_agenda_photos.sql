-- Rutinal · agenda de citas y fotos de progreso (aplicada como migración `rutinal_agenda_photos`, 22 nov 2026)

-- ---------- Agenda de citas entre especialista y atleta ----------
create table public.appointments (
  id         uuid primary key default gen_random_uuid(),
  link_id    uuid not null references public.links(id) on delete cascade,
  starts_at  timestamptz not null,
  minutes    int not null default 60 check (minutes between 5 and 600),
  title      text not null check (length(btrim(title)) between 1 and 120),
  note       text check (note is null or length(note) <= 500),
  status     text not null default 'scheduled' check (status in ('scheduled','cancelled','done')),
  created_by uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index appointments_link_idx on public.appointments (link_id, starts_at);
alter table public.appointments enable row level security;
revoke all on public.appointments from anon, authenticated;
grant select, insert, update on public.appointments to authenticated;
grant all on public.appointments to service_role;
create policy appointments_party_select on public.appointments for select to authenticated using (private.link_party(link_id, false));
create policy appointments_party_insert on public.appointments for insert to authenticated
  with check (private.link_party(link_id, true) and created_by = (select auth.uid()));
create policy appointments_party_update on public.appointments for update to authenticated
  using (private.link_party(link_id, true)) with check (private.link_party(link_id, true));

-- ---------- Fotos de progreso ----------
create or replace function private.has_client(p_client uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.links l where l.specialist_id = (select auth.uid()) and l.client_id = p_client and l.status = 'active');
$$;
revoke all on function private.has_client(uuid) from public, anon;
grant execute on function private.has_client(uuid) to authenticated;

create table public.progress_photos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  path       text not null unique check (length(path) between 10 and 200),
  taken_on   date not null default current_date,
  note       text check (note is null or length(note) <= 200),
  shared     boolean not null default false,   -- solo si es true la ven sus especialistas
  created_at timestamptz not null default now()
);
create index progress_photos_user_idx on public.progress_photos (user_id, taken_on desc);
alter table public.progress_photos enable row level security;
revoke all on public.progress_photos from anon, authenticated;
grant select, insert, update, delete on public.progress_photos to authenticated;
grant all on public.progress_photos to service_role;
create policy progress_photos_own on public.progress_photos for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()) and path like ((select auth.uid())::text || '/%'));
create policy progress_photos_specialist_select on public.progress_photos for select to authenticated
  using (shared and private.has_client(user_id));

-- Bucket privado: cada quien sube y borra solo en su carpeta (<uid>/...); el especialista solo lee lo compartido
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('progress', 'progress', false, 3145728, array['image/jpeg'])
on conflict (id) do nothing;

create policy progress_own_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'progress' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy progress_own_delete on storage.objects for delete to authenticated
  using (bucket_id = 'progress' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy progress_read on storage.objects for select to authenticated
  using (bucket_id = 'progress' and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or exists (select 1 from public.progress_photos p where p.path = name and p.shared and private.has_client(p.user_id))
  ));

-- 23 nov 2026 · migración `rutinal_photo_pose`: pose de cada foto de progreso, para compararlas lado a lado.
alter table public.progress_photos add column pose text check (pose is null or pose in ('front','side','back','free'));
