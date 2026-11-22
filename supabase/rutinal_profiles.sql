-- Fase 1 (aplicada, migración rutinal_profiles): perfiles sobre Supabase Auth.
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     text not null unique check (username ~ '^[a-z0-9._-]{3,32}$'),
  display_name text,
  specialties  text[] not null default '{}' check (specialties <@ array['coach','nutriologo','fisioterapeuta']::text[]),
  is_admin     boolean not null default false,
  active       boolean not null default true,
  note         text,            -- nota privada del administrador (el usuario no la ve)
  created_at   timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
revoke all on public.profiles from anon, authenticated;
grant select (id, username, display_name, specialties, is_admin, active, created_at) on public.profiles to authenticated;
grant all on public.profiles to service_role;

-- Cerrar las sesiones de un usuario (al desactivarlo o cambiarle la contraseña). Solo servidor.
create function public.rutinal_revoke_sessions(p_user uuid) returns void
language sql security definer set search_path = '' as $$ delete from auth.sessions where user_id = p_user $$;
revoke all on function public.rutinal_revoke_sessions(uuid) from public, anon, authenticated;
grant execute on function public.rutinal_revoke_sessions(uuid) to service_role;
