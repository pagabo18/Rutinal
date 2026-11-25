# Rutinal

App Android local-first para organizar tu día, tus hábitos, tu Pomodoro y tu nutrición. Fork limpio de Organizame, sin widgets ni sync con Google Calendar. WebView + puente nativo.

**Versión actual: v1.9.7** (versionCode 20)

## Qué incluye

### Hoy
Card del bloque activo con progreso, hidratación (0/8 vasos), racha global y siguiente bloque.

### Hábitos
Por categoría con racha, weekly achievements y estadísticas de 30 días.
**Hábito automático "Cumplí mi meta nutricional"**: se marca solo al final del día si tus totales caen dentro de tu tolerancia configurada (strict / balanced / flex). Cuenta hacia tu racha global.

### Pomodoro
Timer con historial por categoría.

### Comida (mejorado en v1.5)
- **Anillos concéntricos** de kcal, proteína, carbos y grasa con % vs meta
- Estado **over-goal >100%** con pulso animado
- **Base local de ~680 alimentos** (huevo, claras, cortes de carne, platillos mexicanos...) con macros USDA (cortes de carne, quesos, comida rápida, dulces y platillos mexicanos, bebidas): resultados instantáneos y sin conexión
- **Búsqueda local + USDA + Open Food Facts en paralelo** (Foundation, SR Legacy, FNDDS + Branded), con traducción ES→EN de frases ("clara de huevo" → "egg white")
- Badges LOCAL / USDA / OFF en cada resultado
- **Escáner de código de barras**: nativo (CameraX + ML Kit) en el build Gradle, y **escáner web con la cámara del WebView** (BarcodeDetector) como fallback universal; entrada manual como último recurso
- **Barcode**: OFF primero, USDA GTIN (coincidencia exacta) como fallback
- **Mis platillos**: guarda combinaciones frecuentes
- **v1.8**: copiar comidas de ayer, tendencias (kcal 14 días, promedios, peso), porciones naturales (pieza/taza/cucharada), fotos en tus alimentos, pausa de racha (vacaciones), correlaciones hábitos×nutrición, Pomodoro hereda la categoría del bloque, recordatorio de comida, respaldo automático semanal, abrir JSON compartidos, widget de hábitos y Hábitos en dos columnas en plegables
- **v1.9**: 4 widgets rediseñados con modo oscuro (Ahora con progreso, Hábitos interactivo con toggles, Comida con kcal/macros, Pomodoro con cuenta regresiva en vivo y play/pausa) + modo Temporizador en la pestaña Pomo
- **Metas editables (v1.7)**: cálculo con Mifflin-St Jeor / Katch-McArdle, proteína ISSN, panel de evidencia, y override manual de kcal y macros
- **Mis alimentos (v1.6)**: crea alimentos propios con macros y categoría, renombra los que no tienen foto, y compártelos/impórtalos en JSON entre dispositivos
- Editor de porción con macros por gramo

### Gym
- **Rutinas** con ejercicios, circuitos (mismo número = alternar), series×reps por bloque (`2x10-15, 1x15-20`), RIR, RPE, tempo, descanso y notas
- **Importar PDF del coach**: lee la tabla (Circuito / Ejercicio / Series/Reps / Peso), las indicaciones (objetivo, calentamiento, descanso, cadencia) y recorta la foto de cada ejercicio del PDF. Usa pdf.js 3.11 (`lib/pdfjs`, Apache-2.0) en el hilo principal para funcionar en el WebView
- **Semana**: asigna una rutina a cada día y la pestaña muestra la de hoy
- **Registro de cargas** por serie (kg × reps, ✓), "última vez", temporizador de descanso, alternancia automática en circuitos, historial y "Compartir cargas" para mandárselas al coach
- **Seguimiento (criterios de fisioterapia)**: frecuencia, intensidad (%1RM con 1RM estimado por Epley, RIR, RPE) y volumen; descanso 2–3 min; densidad (kg/min); dolor por ejercicio y por sesión con escala NPRS y fatiga con RPE; "¿cómo te sentiste?" al terminar; sugerencia de progresar / mantener / regresar (cada 2–3 semanas, una sola variable) y aviso si cambias más de una variable; pantalla de Progreso con gráficas
- **Base de ejercicios**: [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (873 ejercicios, dominio público) en `gym_db.js`, con búsqueda en español o inglés, músculos, equipo, instrucciones e imágenes inicio/fin animadas (se cachean para verlas sin conexión)

### Calendario
Vista mensual con bloques, hábitos e imprevistos.

### Editar
Bloques, hábitos, imprevistos, categorías, plan de 8 semanas, nutrición (perfil + macros + tolerancia), ajustes.

### Ajustes de nutrición
Perfil (sexo, edad, altura, peso, %grasa, actividad, objetivo), split de macros (equilibrado / alto proteína / low carb), tolerancia. Campo para pegar tu USDA API key personal.

### General
- **Modo oscuro / claro / sistema**
- **Multilenguaje**: es, en, pt-BR, fr
- **Exportar / importar / restablecer** JSON
- **Local-first**: todo vive en localStorage + SharedPreferences

## PWA (iPhone, Android y PC desde el navegador)

`assets/web` se publica en GitHub Pages como PWA instalable: manifest + service worker con modo offline. En iPhone: Safari → Compartir → "Agregar a pantalla de inicio". Requiere activar Pages en el repo (Settings → Pages → Source: GitHub Actions; el repo debe ser público en plan gratuito). La PWA no incluye widgets ni alarmas exactas (eso es exclusivo del APK).

## Estructura

```
rutinal/
├── AndroidManifest.xml
├── assets/web/
│   ├── index.html          # UI completa (HTML + CSS + JS)
│   └── i18n.js             # Traducciones runtime
├── src/com/pagabo18/rutinal/
│   ├── MainActivity.java
│   ├── WebAppInterface.java
│   ├── BarcodeScannerActivity.java   # CameraX + ML Kit
│   └── ...
├── res/
├── android-gradle/         # Proyecto Gradle para builds firmados
│   ├── build.gradle
│   ├── settings.gradle
│   └── app/
│       ├── build.gradle    # versionCode 5, versionName "1.4"
│       └── src/
├── releases/
│   ├── Rutinal-v1.4.apk    # 22 MB, firmado
│   └── Rutinal-v1.4.aab    # 12 MB, para Play Store
└── build.sh                # Script legacy (aapt manual)
```

## Build firmado v1.4

Requiere JDK 17, Android SDK build-tools 34.0.0 y Gradle 8.5.

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=/ruta/a/android-sdk
export PATH=$JAVA_HOME/bin:$ANDROID_HOME/build-tools/34.0.0:$PATH

# Configura tu keystore
export RUTINAL_KEYSTORE_PATH=/ruta/a/tu-upload.keystore
export RUTINAL_KEYSTORE_PASS='tu-password'

# Copia los assets web al proyecto gradle
rm -rf android-gradle/app/src/main/assets/web
cp -r assets/web android-gradle/app/src/main/assets/web

# Build
cd android-gradle
gradle assembleRelease bundleRelease --no-daemon
```

Los artefactos salen en:
- `android-gradle/app/build/outputs/apk/release/app-release.apk`
- `android-gradle/app/build/outputs/bundle/release/app-release.aab`

## Acceso (usuario y contraseña)

La app pide iniciar sesión al abrir. Las cuentas las crea el administrador desde **Más → Ajustes → Administrar usuarios** (alta, contraseña nueva, desactivar, eliminar). No hay registro público.

- Backend: proyecto de Supabase `rutinal`, con Supabase Auth y la tabla `public.profiles` (ver `supabase/rutinal_profiles.sql`). El sistema de acceso propio que hubo antes se eliminó (`supabase/rutinal_drop_old_access.sql`).
- La sesión se guarda en el dispositivo y se verifica en línea al abrir la app; sin conexión sigue funcionando hasta 14 días. Al desactivar o eliminar un usuario, pierde el acceso en la siguiente verificación.
- Los datos de la app siguen siendo locales: el servidor solo conoce usuario, contraseña cifrada y fechas de acceso.
- Límite conocido: el código es público, así que el login frena el uso normal de la app publicada, no a quien copie y modifique el código.

## Respaldo en la nube (sincronización)

Opcional y con consentimiento (Editar → Ajustes → Cuenta → Respaldo en la nube). La app sigue leyendo y escribiendo en el dispositivo; `S.set`/`S.del` anotan qué cambió y el motor de sincronización sube esos documentos a `public.user_docs` (uno por clave y, en registros diarios, uno por día) y baja los cambios de otros dispositivos. En conflicto gana lo último que llega al servidor, por documento. Los datos locales pertenecen a una sola cuenta: si otra cuenta inicia sesión en el dispositivo, se pide borrar los datos locales antes de continuar. Esquema y permisos en `supabase/rutinal_sync_links.sql`.

## Especialistas y atletas

Editar → Ajustes → Cuenta → Especialistas y atletas. Un especialista (cuenta con especialidad de coach, nutriólogo o fisioterapeuta) genera un código de invitación; el atleta lo escribe, ve qué va a compartir y acepta. Cualquiera de los dos puede terminar el vínculo. El especialista ve a sus atletas con indicadores de los últimos 7 días (último registro, comidas, entrenamientos, dolor máximo) y una ficha de solo lectura de 30 días. Qué puede leer cada rol lo decide el servidor (`private.role_keys` y la política de `user_docs` en `supabase/rutinal_sync_links.sql`): coach → entrenamientos, rutinas y peso; nutriólogo → comidas, metas, agua y peso; fisioterapeuta → entrenamientos y rutinas.

## Modo especialista

Las cuentas con especialidad tienen arriba un selector Atleta / Especialista (y al iniciar sesión se pregunta "¿Quién eres hoy?"). El modo especialista cambia la navegación a cuatro pantallas propias, basadas en los diseños de v0: **Inicio** (atletas activos, invitaciones, avisos, actividad reciente), **Atletas** (búsqueda, lista y ficha con pestañas Planes / Progreso / Registros), **Plantillas** (biblioteca, crear y asignar) y **Notas** (conversaciones por atleta). En Ajustes → Cuenta solo queda lo del atleta: sus especialistas y el código de invitación.

## Plantillas, asignaciones y notas

El especialista guarda plantillas en Especialistas y atletas → Mis plantillas: **rutina** (una rutina de su pestaña Gym), **plan de alimentación** (el menú de un día de su pestaña Comida), **metas de nutrición** e **indicaciones**. Al asignarla a uno o varios atletas se entrega una copia (`public.assignments`); un plan o unas metas nuevas reemplazan a los anteriores del mismo especialista. El atleta las recibe al sincronizar: la rutina aparece en su Gym marcada como asignada, las metas pasan a ser su meta diaria, y el plan y las indicaciones se ven en la tarjeta "De tus especialistas" de Hoy (el plan permite registrar cada comida en el día). Cada vínculo tiene un hilo de notas. Qué puede asignar cada rol lo valida el servidor (`supabase/rutinal_templates.sql`); al terminar un vínculo se terminan sus asignaciones.

## APIs de nutrición

- **USDA FoodData Central**: `api.nal.usda.gov/fdc/v1/foods/search`. Con `DEMO_KEY` funciona con rate limit compartido; para uso intensivo registra una key gratis en [api.data.gov/signup](https://api.data.gov/signup/) y pégala en **Editar → Ajustes → USDA API key**.
- **Open Food Facts**: código de barras con `world.openfoodfacts.org/api/v3/product/{código}` (respaldo v2) y búsqueda por texto. Sin key.
- **Catálogo de México (Open Food Facts)**: `.github/workflows/off-catalog.yml` corre cada semana, filtra el volcado de OFF a los productos vendidos en México con tabla nutricional (`tools/build_off_mx.py`) y publica `off_mx.json` en la rama `off-data`. La app lo descarga una vez, lo guarda en IndexedDB y lo usa para buscar marcas en español, leer códigos de barras sin conexión y sugerir alternativas de la misma categoría. Datos © Open Food Facts, licencia ODbL.
- **Sellos NOM-051**: se calculan en el dispositivo con la tabla nutricional (Tabla 6 de la norma) y se muestran como "estimados".

## Permisos requeridos

- `INTERNET`, `VIBRATE`
- `POST_NOTIFICATIONS` (Android 13+)
- `SCHEDULE_EXACT_ALARM` / `USE_EXACT_ALARM`
- `RECEIVE_BOOT_COMPLETED`
- `CAMERA` (barcode scanner)

## Changelog

### v1.4 (jul 2026)
- Anillos concéntricos con % y estado over-goal
- Hábito automático "Cumplí mi meta nutricional"
- Búsqueda USDA estratificada + merge con OFF
- Barcode con fallback USDA GTIN
- 25+ strings i18n nuevos (es/en/pt-BR/fr)
- Fix crítico i18n: `dataset` no admite guiones → camelCase

### v1.3
- Sistema de nutrición base con perfil y macros
- Editor de porción con macros por gramo

### v1.0
- Fork limpio de Organizame sin widgets ni Google Calendar

## Licencia

MIT

## Tablero de Hoy (atleta)

Arriba de la pestaña **Hoy** hay un tablero con saludo y tres tarjetas: el entrenamiento programado (con botón *Empezar/Continuar*), la comida del día contra la meta de calorías y el peso actual (toca para registrarlo). Usa los mismos datos que Gym, Comida y el perfil de nutrición; si un nutriólogo asignó metas, se usan esas.

## Registro de entrenamiento

La pantalla de entrenamiento muestra cada ejercicio como tarjeta con tabla **Serie / carga / Reps / Hecho**, botón *+ Agregar serie* (series extra además de las prescritas), temporizador de descanso (automático al marcar una serie o manual) y *Terminar entrenamiento* siempre visible. Se conservan RIR, RPE, tempo, dolor (NPRS), esfuerzo por ejercicio, reemplazo de ejercicio y el cierre de "cómo te sentiste".

Las cargas se pueden ver en **kg o lb** (selector arriba de la pantalla, clave `gym_unit`). Los registros se guardan siempre en kg; la conversión es solo de presentación, así el especialista y el historial no cambian al alternar la unidad.

## Páginas a pantalla completa

En teléfono (menos de 640 px de ancho) las hojas que antes subían desde abajo ahora son páginas completas: flecha de regreso a la izquierda, título centrado y *Guardar* a la derecha. El botón "atrás" de Android cierra la página en vez de salir de la app (se usa una entrada del historial mientras hay una página abierta). En tableta y escritorio siguen siendo un panel centrado.

### Cargas recomendadas por serie

Cada ejercicio puede llevar `loads`: la carga recomendada de cada serie, en kg (si hay menos cargas que series, la última se repite). Se capturan en el editor de rutina ("Carga recomendada por serie") y, para un atleta concreto, desde su ficha en modo especialista: **Planes → Cargas por serie** en la rutina asignada. Eso cambia solo la copia de ese atleta (se guarda en la asignación) y su app actualiza las cargas en la siguiente consulta, sin tocar lo que ya registró. En el entrenamiento aparecen como "Carga recomendada" y como valor sugerido de cada serie.

## Comida (rediseño)

La pestaña Comida abre con la tarjeta **Meta diaria** (calorías objetivo, lo que falta o lo que se pasó, y barras de proteína, carbos y grasa) en lugar de los anillos. Cada comida es una tarjeta con icono, calorías, alimentos, macros y botón para añadir; las que están vacías muestran *+ Registrar* y, si el nutriólogo asignó una dieta, el plan de esa comida con *Registrar el plan*. Al final hay una tarjeta de **Agua** que usa la misma cuenta que Hábitos.

## Estilo unificado en el resto de pestañas

Hábitos, Reloj, Calendario, Gym y Editar usan el mismo lenguaje visual que las pantallas rediseñadas: títulos de pestaña, tarjetas redondeadas, selectores tipo píldora (Día/Semana/Mes, Lista/Por horas, Pomodoro/Temporizador, Tema) y la tarjeta de hidratación igual a la de agua en Comida. En **Editar → Ajustes** cada sección es una tarjeta y la cuenta aparece primero, con inicial, nombre, usuario y rol.

## Barra inferior de 5 pestañas y "Más"

En teléfono y tableta (menos de 1024 px) la barra inferior muestra **Hoy · Comida · Gym · Hábitos · Más**. Reloj, Calendario y Editar siguen existiendo como pantallas, pero se entra desde **Más**, que reúne: perfil (lleva a Ajustes), herramientas (Reloj, Calendario), tu contenido (Bloques, Hábitos, Imprevistos, Categorías, Nutrición, Metas semanales) y cuenta (Ajustes, Especialistas y atletas, Respaldo en la nube, Cerrar sesión). Cada una de esas pantallas tiene un regreso "‹ Más". En modo especialista la barra es Inicio · Atletas · Plantillas · Notas · Más. En escritorio se conserva la barra lateral con todas las pestañas.

### Ficha del atleta: resumen semanal, gráficas y PDF

La pestaña **Progreso** de la ficha (modo especialista) trae ahora 8 semanas de datos y muestra: resumen de los últimos 7 días contra los 7 anteriores, y gráficas según la especialidad. Coach y fisioterapeuta ven entrenamientos y volumen por semana, dolor y esfuerzo por sesión y 1RM estimado por ejercicio; el nutriólogo ve calorías y proteína por día (14 días) con la línea de la meta, que es la asignada por él si existe. **Copiar resumen** lo deja como texto para pegar en un mensaje y **Guardar PDF** imprime el reporte (impresión nativa en la app, diálogo de impresión en el navegador).

## Chat entre especialista y atleta

Las "notas" por vínculo ahora son un **chat**: burbujas por autor, separadores por día, barra de escritura fija abajo y actualización cada 12 s mientras está abierto. Los mensajes siguen en `public.notes` (solo los ven las dos partes del vínculo); la migración `supabase/rutinal_chat.sql` agrega `ref`, la referencia opcional a algo asignado.

- **Adjuntos**: al asignar una plantilla (o cambiar las cargas por serie) queda un mensaje en el chat con la rutina, dieta, metas o indicaciones adjuntas. El atleta toca el adjunto para abrirlo. Con **+**, el especialista asigna una plantilla desde el chat y el atleta elige sobre qué rutina o plan pregunta.
- **No leídos**: punto rojo en *Mensajes* (especialista) o en *Hoy* (atleta), y en cada conversación. Lo "visto" se guarda en el dispositivo (`__nt_seen`), no en el servidor.
- **Dónde está**: el atleta ve la tarjeta *Mensajes* en Hoy con cada especialista; el especialista tiene la pestaña *Mensajes* y el botón *Mensajes* en la ficha de cada atleta.
- No hay notificaciones con la app cerrada: los mensajes nuevos se revisan al abrir la app, al volver a ella y cada 2 minutos.

### Avisos de mensajes con la app cerrada (solo APK)

No se usa un servicio de push. `ChatPollReceiver` se despierta cada ~15 minutos con una alarma, pregunta al servidor por mensajes nuevos que no haya escrito la propia cuenta y muestra una notificación. Detalles:

- Usa una **sesión propia**, distinta a la del WebView (si compartieran el refresh token se invalidarían entre sí). La app la crea al iniciar sesión o desde **Ajustes → Avisos de mensajes** (pide la contraseña) y la entrega con `Android.chatEnable(json)`. Se guarda en `SharedPreferences` (`rutinal_chat`).
- `Android.chatMeta` pasa los nombres de cada conversación y los textos traducidos; `Android.chatSeen` evita avisar de lo que la app ya mostró. Con la app a la vista no se avisa.
- Al cerrar sesión se llama `Android.chatDisable()`, que borra la sesión guardada y la cierra en el servidor. Si el servidor rechaza la sesión (cuenta desactivada, etc.), el revisor se apaga solo.
- Límites: el aviso puede tardar 15 minutos o más (el ahorro de batería de Android retrasa las alarmas) y en la PWA no existe.

### Editor de dieta

Las plantillas de plan de alimentación se arman en un editor propio (`openDietEditor`): nombre, las cuatro comidas con sus alimentos y gramos, buscador integrado (mis alimentos, base local, USDA y Open Food Facts) y el total del día fijo abajo. También permite copiar un día del registro propio como punto de partida, editar plantillas ya guardadas y, desde la ficha del atleta (**Planes → Editar**), ajustar el plan ya asignado solo para esa persona; ese cambio le llega a su app y queda avisado en el chat.

### Gráficas con degradado

Las barras (`gymBarsSvg`, `spBars`) y las áreas bajo las líneas (`gymLineSvg`, `spWeightChart`) usan un degradado vertical generado con `svgGrad(color, de, a)`. Cada gráfica define su propio `<linearGradient>` dentro del SVG, así también salen en el PDF.

## Editor de rutinas, resumen semanal, agenda y fotos

- **Editor de rutinas**: las plantillas de rutina se crean y editan en el editor completo (`openRoutineEditorFor`), sin armarlas antes en el Gym propio. Desde la ficha del atleta, **Planes → Editar** cambia la rutina ya asignada solo para esa persona; su app reemplaza su copia conservando el mismo id, así que sus registros no se pierden (`asgSig` detecta el cambio).
- **Tu semana**: tarjeta en Hoy con entrenamientos, días con comidas (y promedio contra la meta), hábitos y cambio de peso de los últimos 7 días.
- **Agenda**: tabla `public.appointments` (ver `supabase/rutinal_agenda_photos.sql`). Cualquiera de las dos partes de un vínculo activo puede agendar, cambiar o cancelar; cada movimiento deja un mensaje en el chat. Se abre desde Más → Agenda, la tarjeta "Próxima cita" de Hoy, el inicio del especialista y el botón *Cita* de la ficha. No hay recordatorios con la app cerrada.
- **Fotos de progreso**: bucket privado `progress` y tabla `public.progress_photos`. La foto se reduce a 1280 px en JPEG antes de subirla. Solo la ve su dueño; sus especialistas ven únicamente las marcadas como compartidas (`shared`), y nadie más. Se abren desde Más → Fotos de progreso; el especialista las ve en la pestaña Progreso de la ficha.

### Unidades y recordatorio de citas

- **Unidades** (Más → Ajustes): peso corporal (`body_unit`) y cargas del gym (`gym_unit`) en kg o lb. Todo se guarda en kg; la conversión es de presentación. El perfil de nutrición y las tendencias de comida siguen en kg.
- **Recordatorio de citas** (solo APK): la app entrega las citas próximas con `Android.setAppointments(json)` y `ApptReminderReceiver` programa un aviso 30 minutos antes de cada una (se reprograma al reiniciar el teléfono y se cancela al cerrar sesión). Solo conoce las citas que la app ya descargó, así que una cita agendada por la otra persona se avisa después de abrir la app al menos una vez.

## Una sola relación por persona, con varios servicios

Si alguien es a la vez tu coach y tu nutriólogo, aparece **una sola vez** con sus servicios como insignias: una conversación, una ficha y una entrada en las listas. Por dentro sigue habiendo una fila de `public.links` por servicio (los permisos de cada especialidad no cambian); la app los agrupa por persona con `linkGroup` (`spClients` para mis atletas, `mySpecialists` para mis especialistas).

- **Invitación**: el especialista elige los servicios y sale un solo código (`rutinal_invite_many`, ver `supabase/rutinal_multi_service.sql`). La vista previa muestra todos los servicios y la unión de lo que podrá ver; al aceptar se activan juntos. Un código nuevo para alguien que ya es tu atleta le suma servicios a la misma relación.
- **Ficha y plantillas**: la ficha muestra lo de todos los servicios y solo se pueden asignar los tipos de plantilla que esos servicios permiten; cada asignación se guarda con el servicio que le corresponde (`asgRoleFor`).
- **Chat**: se leen juntos los mensajes de todos los vínculos de la pareja y los nuevos se escriben en el más antiguo.
- **Terminar**: "Dejar de compartir" o "Terminar vínculo" cierra todos los servicios con esa persona.

## Herramientas profesionales (`assets/web/pro.js`)

**Evaluación antropométrica.** En la ficha del atleta, pestaña *Evaluación* (y en *Más → Composición corporal* para el propio atleta). Se capturan peso, talla, edad, sexo, 10 pliegues, 11 perímetros, 3 diámetros, FC en reposo y presión arterial; cada pliegue acepta varias tomas (promedio de 2, mediana de 3). La app calcula:

- IMC y rango de peso saludable; índice cintura-cadera, cintura-talla y riesgo por cintura.
- % de grasa por Durnin-Womersley, Jackson-Pollock 3 y 7, Faulkner, Yuhasz y perímetros (Marina de EE. UU.), con conversión de Siri, promedio de métodos y referencia de Deurenberg.
- Masa grasa, masa libre de grasa, IMG, IMLG (y normalizado), masa muscular de Lee, área muscular del brazo, sumatorias de 6 y 8 pliegues.
- Somatotipo de Heath-Carter.
- Gasto en reposo por Mifflin-St Jeor, Harris-Benedict revisada, Katch-McArdle y Cunningham, promedio y gasto total con factor de actividad.
- Peso objetivo para un % de grasa meta y zonas de frecuencia cardiaca (Tanaka y Karvonen).

Cada evaluación se compara con la anterior, hay gráficas de evolución y se puede guardar en PDF. Tabla `assessments` (`supabase/rutinal_assessments.sql`).

**Sistema de equivalentes.** Un plan de alimentación puede ser un menú con gramos o un plan por equivalentes (grupos y aportes del Sistema Mexicano de Alimentos Equivalentes). El especialista llena el cuadro por grupo y comida y ve la adecuación contra la meta; el atleta ve cuántos equivalentes le tocan en cada comida, abre la lista de intercambios y registra lo que eligió.

**Dietas prehechas.** Se elige el tipo (equilibrada, alta en proteína, volumen, baja en carbohidratos) y las calorías; la app arma el plan por equivalentes y se puede ajustar antes de guardarlo o asignarlo.

**Peso con tendencia.** La tarjeta de peso de Hoy muestra el promedio de los últimos 7 días y el ritmo de cambio por semana (% del peso) contra los 7 días anteriores.

**Check-in semanal.** El atleta con especialista ve en Hoy su check-in de la semana: datos automáticos de sus registros más escalas de 1 a 5 (energía, hambre, sueño, estrés, digestión, recuperación, ánimo), cumplimiento de dieta y entreno, sueño, pasos, cardio, cintura y texto libre. El especialista lo ve en la pestaña *Check-ins* de la ficha, comparado con la semana anterior y con una tabla de las últimas 8 semanas, y responde; en su Inicio aparece la lista de check-ins por revisar. Tablas `checkins` y `checkin_reviews` (`supabase/rutinal_checkins.sql`).

**Deportes.** *Más → Perfil de atleta*: se eligen los deportes que se practican, nivel, objetivo y marcas; los campos de marcas dependen de los deportes elegidos. En Gym, la sección *Cardio y otros deportes* registra sesiones de running, ciclismo, natación, box, funcional, Hyrox, calistenia, escalada, fisio, caminata, yoga, deporte de equipo u otro: cada deporte pide sus propios datos (distancia, tiempo, rounds, grado, estaciones de Hyrox, dolor antes y después…) y calcula ritmo o velocidad. *Rutinas por deporte* agrega rutinas base a Mis rutinas. Las actividades de la semana se incluyen en el check-in. Se guardan en `act_log` y `athlete_profile`.

**Objetivos y logros.** En Más → Objetivos y logros (y tarjeta en Hoy): peso objetivo, % de grasa, récord en un ejercicio, kilómetros acumulados por deporte, marca de tiempo, sesiones por semana u objetivo libre. El avance se calcula solo con lo registrado (`weight_log`, `gym_logs`, `act_log`, última evaluación) y al llegar al 100 % pasa a Logros con su fecha. Se guarda en `goals` y se respalda en la nube.

**Fases del plan.** En Más → Fases del plan (y tarjeta en Hoy): etapas con fechas (volumen, definición, mantenimiento, recomposición, dieta inversa, semana pico, descarga, competencia, transición), con calorías/macros y ritmo de peso opcionales. Mientras dura una fase con calorías, esas son la meta diaria de Comida (mandan sobre las metas asignadas y el perfil). El ritmo se compara con el promedio de 7 días. Se guarda en `phases`.

**Objetivos y fases desde el especialista.** En la ficha del atleta → Planes: «Poner objetivo» y «Fases del plan» crean asignaciones `goal` y `phase` (coach y nutriólogo; fisioterapeuta solo objetivos). En el teléfono del atleta se copian a `goals`/`phases` marcadas como asignadas (no las puede borrar ni editar). En Progreso el especialista ve la fase en curso y los objetivos con el avance que calculó la app del atleta (`snap`).

**Foto del plato y porciones con la mano.** En Comida: «Foto del plato» (o la cámara de cada comida) sube la foto al bucket privado `meals` y la registra en `meal_photos` para ese día y comida; la ve el nutriólogo en Registros. «Con la mano» estima macros por palmas, puñados, pulgares y puños (valores aproximados del método de la mano) y los registra como alimentos del día.

**Recuperar contraseña (sin correo).** Ajustes → Cuenta → «Código de recuperación» genera un código de un solo uso (en la base solo queda su huella). En la pantalla de acceso, «¿Olvidaste tu contraseña?» pide usuario + código + contraseña nueva y llama a la función pública `recover` (`verify_jwt = false`); 5 fallos bloquean 30 minutos. Sin código, el usuario puede dejar un aviso que el administrador ve en Usuarios («Pidió contraseña nueva»). SQL en `supabase/rutinal_recovery.sql`.

**Fotos de progreso por pose.** Cada foto lleva su pose (frente, perfil, espalda o libre; columna `pose`). En Fotos de progreso hay un comparador lado a lado por pose con dos fechas a elegir. El check-in semanal tiene tres casillas (frente, perfil, espalda) que suben la foto ya compartida; el especialista las ve en la revisión junto a la foto anterior de la misma pose.

**Bioimpedancia (Tanita, InBody…).** En la evaluación de composición corporal hay una sección para copiar lo que da el equipo: % de grasa (entra como método «Bioimpedancia / equipo»), masa muscular, agua, grasa visceral, masa ósea, metabolismo basal, edad metabólica y ángulo de fase, más el modelo. Salen en el reporte con su cambio, en la evolución y en «Tu cuerpo». No hay conexión automática con la báscula.

**Altas por el especialista y límite de atletas.** El administrador crea a los especialistas; cada especialista crea las cuentas de sus atletas desde «Agregar atleta» (función `athletes`), que quedan con una invitación reservada: al entrar, el atleta decide si acepta compartir. Cada especialista tiene un límite de atletas activos (`profiles.athlete_limit`, 5 por omisión; los administradores no tienen límite) que el administrador cambia en Usuarios. Lo hace cumplir el disparador `links_guard` en la base, también para invitaciones por código. SQL en `supabase/rutinal_athlete_limit.sql`.

**Registro propio y especialistas verificados.** En la pantalla de acceso, «Crear cuenta» registra a un atleta (función pública `signup`: usuario, contraseña de 8+, correo opcional, aceptación del aviso de privacidad; límite de 5 registros por IP por hora y 60 en total, campo trampa para bots). Para ser especialista: Ajustes → Cuenta → «Soy especialista» envía una solicitud (cédula obligatoria para nutriólogo y fisioterapeuta); el administrador la ve en Usuarios, la verifica en el Registro Nacional de Profesionistas de la SEP y la aprueba. El atleta ve «Cédula verificada» o «Sin verificar» en la invitación y en sus especialistas. Pendiente: inicio con Google (requiere credenciales de Google Cloud) y envío de correos (requiere SMTP propio).

**RIR y técnicas por serie.** En el entrenamiento cada serie tiene RIR (`gym_logs[día].ex[id][i].rir`) y, tocando el número de serie, técnicas con ícono (`tags`): aproximación, negativas, parciales, isométrico, drop set, rest-pause, myo-reps, cluster, forzadas, al fallo. En la rutina se marcan las técnicas planeadas por ejercicio (`exercises[].tech`). Ejercicios seguidos con el mismo número de circuito se muestran como biserie (2), triserie (3) o circuito (4+). El especialista ve RIR e íconos en el historial del atleta.

**Tiempo real y vigencia.** La app abre un canal de Supabase Realtime (WebSocket, sin librería; `rtStart` en `pro.js`) para `notes` y `assignments`: mensajes y asignaciones llegan en segundos; la revisión periódica queda de respaldo. Al asignar se elige vigencia (permanente, horas, días o fecha); `assignments.expires_at` y la política RLS del atleta ocultan lo vencido, y la app retira la rutina vencida aunque esté sin conexión. SQL en `supabase/rutinal_realtime_expiry.sql`.

**Plantillas de rutina y asistente.** En Gym → «Plantillas» (y en Plantillas del especialista): divisiones prehechas (cuerpo completo, AB torso/pierna, Push Pull Legs de 3 y 6 días, Arnold, Weider, PHUL, 5×5, glúteo, casa) y un asistente por reglas que arma la semana según objetivo, días, nivel, equipo, tiempo, enfoque y zonas a cuidar. Usa un catálogo de ejercicios por patrón de movimiento con su imagen (`RX_EX` en `pro.js`), prescribe series, reps, RIR y descanso por objetivo, permite cambiar cada ejercicio (⇄) y programa la semana. No usa IA: la versión con IA necesita una llave de API guardada como secreto en Supabase.

**Rutinas de otros deportes.** En el editor de rutina, *Tipo de rutina* permite elegir running, natación, ciclismo, box, Hyrox, etc. además de Gimnasio. Esas rutinas se escriben como series × distancia o tiempo («8x400 m», «1x2 km», «4x3 min»); al entrenarlas cada serie registra tiempo, distancia o reps y RPE en lugar de peso, y al terminar se suma la distancia y el tiempo y queda como actividad en `act_log` (con `rid` de la rutina). El especialista las encuentra en Plantillas → Rutinas prehechas → *Otros deportes* para guardarlas y asignarlas como cualquier rutina.

**Instrucciones de ejercicios en el idioma de la app.** `gym_steps.js` trae los pasos en español de los ejercicios del catálogo del asistente; en inglés se usan los originales de free-exercise-db. Para el resto, si el navegador tiene traducción integrada (Chrome con la API Translator) se traducen y se guardan en el dispositivo; si no, se muestran en inglés con un aviso.

**Récords del atleta (vista del especialista).** En Atletas → ficha → Progreso, la tarjeta *Récords* muestra por ejercicio el mejor 1RM estimado, la mejor serie con su fecha, el cambio desde el primer registro y una línea de tendencia; marca «Nuevo récord» si es de los últimos 7 días. Para running, ciclismo y natación muestra la distancia más larga y el mejor ritmo. Sustituye a la tarjeta anterior de 1RM estimado.

**Entrenamiento fuera de la app (APK).** Desde que marcas la primera serie y hasta terminar, Rutinal muestra una notificación fija visible en la pantalla de bloqueo con el ejercicio y la serie que siguen, la carga objetivo (la que escribiste, la recomendada o la de la última vez) y la cuenta del descanso; trae botones *Serie hecha*, *+30 s* y *Saltar*, y al terminar el descanso avisa con vibración aunque la app esté cerrada. El widget *Entrenamiento* (pantalla de inicio; en los equipos que lo permiten, también en la de bloqueo) muestra lo mismo, y sin entrenamiento en curso muestra la rutina que toca hoy. El botón *Ventana flotante* del entrenamiento la abre en picture-in-picture sobre otras apps; en Chrome de escritorio abre una ventanita siempre visible con los mismos botones. Lo que se toque fuera se registra en `gym_logs` al volver a la app (cola `widget_actions`, acciones `gym_set` y `gym_rest`). El JS manda la foto del entrenamiento con `Android.setGymLive()` (`GymLive.java`, `GymWidgetProvider.java`, `GymLiveReceiver.java`); se apaga en Ajustes → *Entrenamiento fuera de la app* y deja de mostrarse si pasan 3 horas sin actividad. En iPhone (PWA) no hay widgets ni notificaciones fijas: Apple no lo permite a las apps web.

**Personalizar.** En Ajustes se apagan las secciones que no se usan y se activa «Solo palomear ejercicios». Preferencias en `app_prefs`.
