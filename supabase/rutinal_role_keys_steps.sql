-- 27 nov 2026 · migración `rutinal_role_keys_steps`: coach y fisioterapeuta también leen
-- los pasos del día (`steps_log`) y la meta diaria de pasos y cardio (`cardio_goal`) de sus atletas.
-- Solo cambia la lista de claves por rol; el resto de la función queda igual.
create or replace function private.role_keys(p_role text) returns text[] language sql immutable set search_path = '' as $$
  select case p_role
    when 'coach' then array['gym_logs','gym_routines','gym_schedule','weight_log','act_log','athlete_profile','goals','phases','steps_log','cardio_goal']
    when 'nutriologo' then array['meal_log','nutri_profile','food_goal_kcal','weight_log','hydration_log','hydration_settings','goals','phases']
    when 'fisioterapeuta' then array['gym_logs','gym_routines','gym_schedule','act_log','athlete_profile','goals','steps_log','cardio_goal']
    else array[]::text[] end
$$;
