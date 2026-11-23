-- Rutinal · check-in semanal (aplicada como migración `rutinal_checkins`, 23 nov 2026)
-- El atleta envía un check-in por semana; sus especialistas con vínculo activo lo leen y responden.

create table public.checkins (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null default auth.uid() references auth.users(id) on delete cascade,
  week_of    date not null,
  data       jsonb not null default '{}'::jsonb check (pg_column_size(data) <= 16384),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, week_of)
);
alter table public.checkins enable row level security;
revoke all on public.checkins from anon, authenticated;
grant select, insert, update, delete on public.checkins to authenticated;
grant all on public.checkins to service_role;
create policy checkins_select on public.checkins for select to authenticated
  using (client_id = (select auth.uid()) or private.has_client(client_id));
create policy checkins_insert on public.checkins for insert to authenticated with check (client_id = (select auth.uid()));
create policy checkins_update on public.checkins for update to authenticated
  using (client_id = (select auth.uid())) with check (client_id = (select auth.uid()));
create policy checkins_delete on public.checkins for delete to authenticated using (client_id = (select auth.uid()));
create trigger checkins_touch before update on public.checkins for each row execute function private.touch_updated_at();

create table public.checkin_reviews (
  id          uuid primary key default gen_random_uuid(),
  checkin_id  uuid not null references public.checkins(id) on delete cascade,
  client_id   uuid not null references auth.users(id) on delete cascade,
  reviewer_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  body        text not null check (length(btrim(body)) between 1 and 2000),
  created_at  timestamptz not null default now()
);
create index checkin_reviews_checkin_idx on public.checkin_reviews (checkin_id);
create index checkin_reviews_client_idx on public.checkin_reviews (client_id);
create index checkin_reviews_reviewer_idx on public.checkin_reviews (reviewer_id);
alter table public.checkin_reviews enable row level security;
revoke all on public.checkin_reviews from anon, authenticated;
grant select, insert, update, delete on public.checkin_reviews to authenticated;
grant all on public.checkin_reviews to service_role;
create policy checkin_reviews_select on public.checkin_reviews for select to authenticated
  using (client_id = (select auth.uid()) or reviewer_id = (select auth.uid()) or private.has_client(client_id));
create policy checkin_reviews_insert on public.checkin_reviews for insert to authenticated
  with check (reviewer_id = (select auth.uid()) and private.has_client(client_id)
    and exists (select 1 from public.checkins c where c.id = checkin_id and c.client_id = checkin_reviews.client_id));
create policy checkin_reviews_update on public.checkin_reviews for update to authenticated
  using (reviewer_id = (select auth.uid())) with check (reviewer_id = (select auth.uid()));
create policy checkin_reviews_delete on public.checkin_reviews for delete to authenticated using (reviewer_id = (select auth.uid()));

-- 23 nov 2026 · migración `rutinal_role_keys_sports`: coach y fisioterapeuta también leen
-- las actividades (cardio y otros deportes) y el perfil de atleta de sus atletas.
create or replace function private.role_keys(p_role text) returns text[] language sql immutable set search_path = '' as $$
  select case p_role
    when 'coach' then array['gym_logs','gym_routines','gym_schedule','weight_log','act_log','athlete_profile']
    when 'nutriologo' then array['meal_log','nutri_profile','food_goal_kcal','weight_log','hydration_log','hydration_settings']
    when 'fisioterapeuta' then array['gym_logs','gym_routines','gym_schedule','act_log','athlete_profile']
    else array[]::text[] end
$$;
