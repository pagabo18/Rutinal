# Organizame

App Android para organizar tu día a día con bloques de tiempo, hábitos e imprevistos. WebView + widgets nativos + notificaciones.

## Qué incluye

- **Hoy**: card del bloque activo con progreso, siguiente bloque y hábitos.
- **Día**: timeline por horas del día actual.
- **Planificador semanal**: los 7 días de un vistazo.
- **Hábitos**: por categoría, con racha y meta.
- **Imprevistos**: eventos ad-hoc del día con su propio color.
- **Plan de 8 semanas**: tareas semanales expandibles.
- **Editor**: bloques, hábitos, imprevistos, categorías y ajustes editables.
- **Modo oscuro / claro / sistema**.
- **Exportar / importar / restablecer** todos los datos como JSON.

### Widgets nativos

- **Ahora** (4×1): bloque activo con barra de progreso.
- **Próximos** (4×2): los siguientes bloques del día.
- **Hábitos** (4×2): checklist tocable sin abrir la app.

### Notificaciones

- **5 min antes** de cada bloque: aviso previo.
- **Al iniciar**: notificación con acciones "Listo" y "Posponer 10 min".
- Programadas con `AlarmManager` exacto. Reprograma sola al editar o al reiniciar el teléfono.

## Estructura

```
organizame/
├── AndroidManifest.xml
├── build.sh                    # Script de compilación
├── assets/web/index.html       # UI completa (HTML + CSS + JS)
├── src/com/gabriel/organizame/
│   ├── MainActivity.java              # WebView + bridge
│   ├── WebAppInterface.java           # Puente JS ↔ Java
│   ├── DataHelper.java                # Modelo compartido
│   ├── NotificationScheduler.java     # Programación de alarmas
│   ├── BlockNotificationReceiver.java # Muestra la notificación
│   ├── NotificationActionReceiver.java # Acciones Listo/Posponer
│   ├── BootReceiver.java              # Reprograma al reiniciar
│   ├── AhoraWidgetProvider.java
│   ├── ProximosWidgetProvider.java
│   ├── ProximosRemoteViewsService.java
│   └── HabitosWidgetProvider.java
└── res/
    ├── drawable/, mipmap-*/, layout/, values/, xml/
```

## Compilación

Requiere Android SDK (build-tools 34) y JDK 17.

```bash
./build.sh
```

El APK sale en `build/Organizame.apk`.

## Persistencia

- WebView usa `localStorage`.
- El bridge `Android.saveState()` copia el estado a `SharedPreferences` para que widgets y notificaciones lean sin abrir el WebView.

## Permisos requeridos

- `INTERNET`, `VIBRATE`
- `POST_NOTIFICATIONS` (Android 13+)
- `SCHEDULE_EXACT_ALARM` / `USE_EXACT_ALARM`
- `RECEIVE_BOOT_COMPLETED`

## Licencia

MIT (o la que quieras poner).
