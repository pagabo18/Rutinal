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

La app pide iniciar sesión al abrir. Las cuentas las crea el administrador desde **Editar → Ajustes → Cuenta → Administrar usuarios** (alta, contraseña nueva, desactivar, eliminar). No hay registro público.

- Backend: proyecto de Supabase `rutinal`. Las tablas (`private.app_users`, `private.app_sessions`, `private.login_attempts`) no están expuestas; la app solo llama a las funciones `rutinal_*` (ver `supabase/rutinal_access.sql`) con la llave pública.
- Contraseñas con bcrypt, sesiones por token (se guarda solo su hash), bloqueo de 15 min tras 8 intentos fallidos.
- La sesión se guarda en el dispositivo y se verifica en línea al abrir la app; sin conexión sigue funcionando hasta 14 días. Al desactivar o eliminar un usuario, pierde el acceso en la siguiente verificación.
- Los datos de la app siguen siendo locales: el servidor solo conoce usuario, contraseña cifrada y fechas de acceso.
- Límite conocido: el código es público, así que el login frena el uso normal de la app publicada, no a quien copie y modifique el código.

## Respaldo en la nube (sincronización)

Opcional y con consentimiento (Editar → Ajustes → Cuenta → Respaldo en la nube). La app sigue leyendo y escribiendo en el dispositivo; `S.set`/`S.del` anotan qué cambió y el motor de sincronización sube esos documentos a `public.user_docs` (uno por clave y, en registros diarios, uno por día) y baja los cambios de otros dispositivos. En conflicto gana lo último que llega al servidor, por documento. Los datos locales pertenecen a una sola cuenta: si otra cuenta inicia sesión en el dispositivo, se pide borrar los datos locales antes de continuar. Esquema y permisos en `supabase/rutinal_sync_links.sql`.

## Especialistas y entrenados

Editar → Ajustes → Cuenta → Especialistas y entrenados. Un especialista (cuenta con especialidad de coach, nutriólogo o fisioterapeuta) genera un código de invitación; el entrenado lo escribe, ve qué va a compartir y acepta. Cualquiera de los dos puede terminar el vínculo. El especialista ve a sus entrenados con indicadores de los últimos 7 días (último registro, comidas, entrenamientos, dolor máximo) y una ficha de solo lectura de 30 días. Qué puede leer cada rol lo decide el servidor (`private.role_keys` y la política de `user_docs` en `supabase/rutinal_sync_links.sql`): coach → entrenamientos, rutinas y peso; nutriólogo → comidas, metas, agua y peso; fisioterapeuta → entrenamientos y rutinas.

## Modo especialista

Las cuentas con especialidad tienen arriba un selector Entrenado / Especialista (y al iniciar sesión se pregunta "¿Quién eres hoy?"). El modo especialista cambia la navegación a cuatro pantallas propias, basadas en los diseños de v0: **Inicio** (entrenados activos, invitaciones, avisos, actividad reciente), **Entrenados** (búsqueda, lista y ficha con pestañas Planes / Progreso / Registros), **Plantillas** (biblioteca, crear y asignar) y **Notas** (conversaciones por entrenado). En Ajustes → Cuenta solo queda lo del entrenado: sus especialistas y el código de invitación.

## Plantillas, asignaciones y notas

El especialista guarda plantillas en Especialistas y entrenados → Mis plantillas: **rutina** (una rutina de su pestaña Gym), **plan de alimentación** (el menú de un día de su pestaña Comida), **metas de nutrición** e **indicaciones**. Al asignarla a uno o varios entrenados se entrega una copia (`public.assignments`); un plan o unas metas nuevas reemplazan a los anteriores del mismo especialista. El entrenado las recibe al sincronizar: la rutina aparece en su Gym marcada como asignada, las metas pasan a ser su meta diaria, y el plan y las indicaciones se ven en la tarjeta "De tus especialistas" de Hoy (el plan permite registrar cada comida en el día). Cada vínculo tiene un hilo de notas. Qué puede asignar cada rol lo valida el servidor (`supabase/rutinal_templates.sql`); al terminar un vínculo se terminan sus asignaciones.

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

## Tablero de Hoy (entrenado)

Arriba de la pestaña **Hoy** hay un tablero con saludo y tres tarjetas: el entrenamiento programado (con botón *Empezar/Continuar*), la comida del día contra la meta de calorías y el peso actual (toca para registrarlo). Usa los mismos datos que Gym, Comida y el perfil de nutrición; si un nutriólogo asignó metas, se usan esas.

## Registro de entrenamiento

La pantalla de entrenamiento muestra cada ejercicio como tarjeta con tabla **Serie / carga / Reps / Hecho**, botón *+ Agregar serie* (series extra además de las prescritas), temporizador de descanso (automático al marcar una serie o manual) y *Terminar entrenamiento* siempre visible. Se conservan RIR, RPE, tempo, dolor (NPRS), esfuerzo por ejercicio, reemplazo de ejercicio y el cierre de "cómo te sentiste".

Las cargas se pueden ver en **kg o lb** (selector arriba de la pantalla, clave `gym_unit`). Los registros se guardan siempre en kg; la conversión es solo de presentación, así el especialista y el historial no cambian al alternar la unidad.

## Páginas a pantalla completa

En teléfono (menos de 640 px de ancho) las hojas que antes subían desde abajo ahora son páginas completas: flecha de regreso a la izquierda, título centrado y *Guardar* a la derecha. El botón "atrás" de Android cierra la página en vez de salir de la app (se usa una entrada del historial mientras hay una página abierta). En tableta y escritorio siguen siendo un panel centrado.

### Cargas recomendadas por serie

Cada ejercicio puede llevar `loads`: la carga recomendada de cada serie, en kg (si hay menos cargas que series, la última se repite). Se capturan en el editor de rutina ("Carga recomendada por serie") y, para un entrenado concreto, desde su ficha en modo especialista: **Planes → Cargas por serie** en la rutina asignada. Eso cambia solo la copia de ese entrenado (se guarda en la asignación) y su app actualiza las cargas en la siguiente consulta, sin tocar lo que ya registró. En el entrenamiento aparecen como "Carga recomendada" y como valor sugerido de cada serie.
