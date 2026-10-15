# Rutinal — Plan de arquitectura Coach / Atleta

Estado: diseño inicial; implementación pendiente. Rama: feature/coach-nutrition-platform.

## Evidencia de la base existente
- README describe Android WebView + puente nativo, PWA offline y almacenamiento localStorage / SharedPreferences.
- assets/web/index.html contiene interfaz HTML/CSS/JS y versión interna 31.2.
- android-gradle/app/build.gradle define Android Java 17, SDK 34, versionName 1.9.7, CameraX y ML Kit.
- La discrepancia de versiones requiere revisión; no asumir que es un bug.

## Principios no negociables
1. Mantener la experiencia local-first y conservar datos existentes sin borrarlos.
2. Nunca guardar credenciales privilegiadas o claves de servicio en GitHub Pages.
3. Aislamiento entre atletas mediante autenticación, permisos de servidor y políticas de acceso por fila si la tecnología elegida lo permite.
4. Datos médicos privados por defecto; consentimiento explícito y revocable para compartir.
5. Coach puede asignar nutrición/ejercicio, pero no prescribir ni cambiar medicamentos.
6. Publicación de planes atómica, versionada e idempotente.
7. Pruebas de sincronización offline, migración, accesibilidad y aislamiento antes de despliegue.

## Diseño funcional
- Identidades: users, coach_athlete_relationships, invitations, consents.
- Entrenamiento: exercise_catalog, workout_templates, workout_plan_versions, workout_assignments, workout_sessions, workout_sets.
- Nutrición: food_catalog, recipes, meal_plan_versions, meal_assignments, food_logs, macro_targets.
- Salud: medication_records (privados), medication_logs, measurements, symptom_logs.
- Operación: notifications, sync_outbox, change_events, audit_events.

## Protocolo de sincronización
- Toda escritura local recibe UUID, timestamp y estado de envío.
- Outbox persistente reintenta con idempotency_key.
- El servidor asigna revision monotónica por recurso; clientes consumen cambios incrementales desde cursor.
- Planes publicados son inmutables; modificaciones crean nueva versión.
- Sesiones históricas referencian la versión asignada al momento de ejecución.
- Conflictos de registros se resuelven por tipo de dato, nunca sobrescribiendo silenciosamente historial.
- Cualquier dato sensible requiere cifrado y control de acceso antes de subirlo.

## Secuencia de implementación
1. Auditoría de datos actuales, flujos de import/export y estrategia de migración no destructiva.
2. Contratos tipados y pruebas de compatibilidad con almacenamiento local.
3. Autenticación y relación coach-atleta con políticas de acceso probadas.
4. Constructor de rutinas, asignación y ejecución offline.
5. Constructor de dietas integrado con catálogo y macros actuales.
6. Check-ins, mensajería, recordatorios y consentimientos.
7. E2E web/Android, pruebas de regresión, seguridad, accesibilidad WCAG 2.2 AA.
8. Despliegue controlado y rollback.

## Criterios mínimos de aceptación
- Coach invita; atleta acepta; permisos validados en backend.
- Coach publica rutina y dieta; atleta recibe cambios sin recargar toda la aplicación.
- Atleta registra entrenamiento/comida sin conexión; sincroniza al recuperar red sin duplicados.
- Editar un plan no altera historial.
- Un coach no accede a registros de un atleta ajeno.
- Datos de medicamentos nunca se comparten sin autorización explícita.
- Importación de datos anteriores no pierde registros.
- Builds y pruebas pasan antes de fusionar a main.

## Pendiente de auditoría
- Revisar totalidad de assets/web/index.html, scripts auxiliares, puente Java y persistencia.
- Elegir backend con base en necesidades y despliegue, no por preferencia arbitraria.
- Establecer baseline de pruebas y medir performance.
- Verificar versionado de web y Android.
