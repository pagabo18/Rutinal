# Rutinal

App Android local-first para organizar tu día, tus hábitos, tu Pomodoro y tu nutrición. Fork limpio de Organizame, sin widgets ni sync con Google Calendar. WebView + puente nativo.

**Versión actual: v1.9** (versionCode 13)

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

## APIs de nutrición

- **USDA FoodData Central**: `api.nal.usda.gov/fdc/v1/foods/search`. Con `DEMO_KEY` funciona con rate limit compartido; para uso intensivo registra una key gratis en [api.data.gov/signup](https://api.data.gov/signup/) y pégala en **Editar → Ajustes → USDA API key**.
- **Open Food Facts**: `world.openfoodfacts.org/api/v2/`. Sin key. Bueno para productos europeos/latinos y barcode.

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
