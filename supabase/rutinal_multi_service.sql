-- Rutinal · una invitación para varios servicios (aplicada como migración `rutinal_multi_service_invites`, 22 nov 2026)
-- Sigue habiendo una fila de public.links por servicio (los permisos no cambian), pero las filas de una
-- misma invitación comparten código y se aceptan juntas. La app agrupa los vínculos por persona.
-- Funciones: rutinal_invite_many(text[]) nueva; rutinal_invite, rutinal_invite_preview (devuelve `roles` y la unión
-- de `keys`) y rutinal_invite_accept (activa todas las filas del código) reemplazadas. Ver el historial de migraciones.
alter table public.links drop constraint if exists links_code_key;
create unique index if not exists links_code_role_uniq on public.links (code, role) where code is not null;
create index if not exists links_code_idx on public.links (code) where code is not null;
