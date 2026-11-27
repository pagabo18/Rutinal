-- La lista de atletas del especialista (rutinal_my_links) convertía a número y a booleano
-- datos que escribe el atleta (dolor de la sesión, «done»). Un valor que no fuera número
-- hacía fallar la función y el especialista se quedaba sin su lista de atletas.
-- Ahora esos datos se leen de forma tolerante, y el dolor de 7 días (pain7) también
-- toma en cuenta el dolor registrado por serie.

create or replace function private.safe_num(p text)
returns numeric language sql immutable set search_path to '' as $$
  select case when p ~ '^\s*-?\d+(\.\d+)?\s*$' then p::numeric end
$$;

create or replace function public.rutinal_my_links()
returns jsonb language plpgsql security definer set search_path to '' as $function$
declare me public.profiles; d7 text := to_char((now() at time zone 'America/Mexico_City')::date - 6, 'YYYY-MM-DD');
begin
  me := private.me();
  if me.id is null then return jsonb_build_object('ok', false, 'error', 'session'); end if;
  return jsonb_build_object('ok', true,
    'as_client', coalesce((select jsonb_agg(jsonb_build_object('id', l.id, 'role', l.role, 'name', private.shown_name(sp), 'username', sp.username,
                             'since', l.accepted_at, 'keys', to_jsonb(private.role_keys(l.role))) order by l.accepted_at)
                           from public.links l join public.profiles sp on sp.id = l.specialist_id
                           where l.client_id = me.id and l.status = 'active'), '[]'::jsonb),
    'as_specialist', coalesce((select jsonb_agg(x.j order by x.ord) from (
        select l.created_at as ord, jsonb_build_object('id', l.id, 'role', l.role, 'status', l.status, 'code', l.code, 'since', coalesce(l.accepted_at, l.created_at),
                 'client_id', l.client_id, 'name', case when c.id is null then null else private.shown_name(c) end, 'username', c.username,
                 'last_activity', (select max(d.updated_at) from public.user_docs d where d.user_id = l.client_id and d.key = any(private.role_keys(l.role))),
                 'meals7', case when l.role = 'nutriologo' then (select count(*) from public.user_docs d where d.user_id = l.client_id and d.key = 'meal_log' and d.sub >= d7 and d.value is not null and d.value <> '{}'::jsonb) end,
                 'workouts7', case when l.role in ('coach','fisioterapeuta') then (select count(*) from public.user_docs d where d.user_id = l.client_id and d.key = 'gym_logs' and d.sub >= d7 and coalesce(d.value->>'done', '') = 'true') end,
                 'pain7', case when l.role in ('coach','fisioterapeuta') then (
                     select max(q.v) from (
                       select private.safe_num(d.value->'feel'->>'pain') as v
                         from public.user_docs d
                        where d.user_id = l.client_id and d.key = 'gym_logs' and d.sub >= d7
                       union all
                       select private.safe_num(s.value->>'pain')
                         from public.user_docs d
                              cross join lateral jsonb_each(case when jsonb_typeof(d.value->'ex') = 'object' then d.value->'ex' else '{}'::jsonb end) e
                              cross join lateral jsonb_array_elements(case when jsonb_typeof(e.value) = 'array' then e.value else '[]'::jsonb end) s
                        where d.user_id = l.client_id and d.key = 'gym_logs' and d.sub >= d7
                          and jsonb_typeof(s.value) = 'object' and coalesce(s.value->>'done', '') = 'true'
                     ) q where q.v between 0 and 10) end
               ) as j
        from public.links l left join public.profiles c on c.id = l.client_id
        where l.specialist_id = me.id and l.status in ('pending','active')) x), '[]'::jsonb));
end $function$;
