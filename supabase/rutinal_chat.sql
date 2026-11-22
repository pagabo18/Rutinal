-- Rutinal · chat entre especialista y atleta (aplicada como migración `rutinal_chat_ref`)
-- Los mensajes viven en public.notes (ver rutinal_templates.sql). Esta migración solo agrega
-- la referencia opcional a algo asignado: { "t": "asg", "kind": "routine|diet|targets|note", "name": "..." }

alter table public.notes add column if not exists ref jsonb;
alter table public.notes add constraint notes_ref_size check (ref is null or pg_column_size(ref) < 2000);
create index if not exists notes_created_idx on public.notes (created_at desc);
