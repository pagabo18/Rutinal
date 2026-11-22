-- Rutinal · limpieza del sistema de acceso anterior (aplicada como migración `rutinal_drop_old_access`, 22 nov 2026)
-- El acceso propio (tablas private.app_users / app_sessions / login_attempts y las funciones
-- public.rutinal_login, rutinal_check, etc.) fue sustituido por Supabase Auth + public.profiles
-- (ver rutinal_profiles.sql). Se eliminó cuando todas las cuentas ya habían entrado con el sistema nuevo.
-- Sin CASCADE a propósito: si algo vigente dependiera de estos objetos, la migración falla y no borra nada.

drop function if exists public.rutinal_login(text, text);
drop function if exists public.rutinal_check(text);
drop function if exists public.rutinal_logout(text);
drop function if exists public.rutinal_change_password(text, text, text);
drop function if exists public.rutinal_admin_list(text);
drop function if exists public.rutinal_admin_save(text, text, text, text, boolean, text);
drop function if exists public.rutinal_admin_delete(text, text);
drop function if exists public.rutinal_migrate_export();
drop function if exists private.session_user_of(text);
drop function if exists private.too_many_attempts(text);
drop function if exists private.token_hash(text);
drop function if exists private.norm_user(text);
drop table if exists private.app_sessions;
drop table if exists private.login_attempts;
drop table if exists private.app_users;
drop extension if exists http;
