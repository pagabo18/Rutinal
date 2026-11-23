-- 23 nov 2026 · migración `rutinal_meal_photos`.
-- Fotos de comidas: cada quien guarda las suyas; las ve su nutriólogo mientras el vínculo esté activo.
create table public.meal_photos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  path       text not null unique check (length(path) between 10 and 200),
  day        date not null default current_date,
  meal       text not null check (meal in ('breakfast','lunch','dinner','snack')),
  note       text check (note is null or length(note) <= 200),
  created_at timestamptz not null default now()
);
create index meal_photos_user_idx on public.meal_photos (user_id, day desc);
alter table public.meal_photos enable row level security;
revoke all on public.meal_photos from anon, authenticated;
grant select, insert, update, delete on public.meal_photos to authenticated;
grant all on public.meal_photos to service_role;
create policy meal_photos_own on public.meal_photos for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()) and path like ((select auth.uid())::text || '/%'));
create policy meal_photos_nutri_select on public.meal_photos for select to authenticated
  using (private.is_my_client(user_id, 'nutriologo'));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('meals', 'meals', false, 2097152, array['image/jpeg'])
on conflict (id) do nothing;

create policy meals_own_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'meals' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy meals_own_delete on storage.objects for delete to authenticated
  using (bucket_id = 'meals' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy meals_read on storage.objects for select to authenticated
  using (bucket_id = 'meals' and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or exists (select 1 from public.meal_photos p where p.path = name and private.is_my_client(p.user_id, 'nutriologo'))
  ));
