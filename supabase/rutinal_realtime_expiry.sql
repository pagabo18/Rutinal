-- 25 nov 2026 · migración `rutinal_realtime_expiry`.
-- 1) Tiempo real: la app recibe al instante mensajes nuevos y lo que asigna un especialista.
--    Realtime respeta las políticas RLS de cada tabla: cada quien solo recibe lo que ya podía leer.
alter publication supabase_realtime add table public.notes, public.assignments;

-- 2) Vigencia de lo asignado (horas, días o permanente). Al vencer, el atleta deja de verlo y la app lo retira.
alter table public.assignments add column expires_at timestamptz check (expires_at is null or expires_at > created_at);
drop policy assignments_client_select on public.assignments;
create policy assignments_client_select on public.assignments for select to authenticated
  using (client_id = (select auth.uid()) and (expires_at is null or expires_at > now()));
