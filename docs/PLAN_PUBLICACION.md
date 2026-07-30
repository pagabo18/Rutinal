# Plan de publicación, monetización y escalabilidad de Rutinal

*Última actualización: 29 de julio de 2026. Datos verificados contra fuentes oficiales (enlaces al final de cada sección).*

**Estado actual**: app Android local-first (WebView + puente nativo) con APK funcional, PWA publicada en GitHub Pages, base local de 677 alimentos + USDA + Open Food Facts, 4 widgets, sin backend, sin cuentas, sin recolección de datos. Base legal ya en el repo: política de privacidad hospedada, atribución ODbL/USDA, descargo de salud.

---

## FASE 1 — Google Play Store (4-6 semanas, ~25 USD)

### Lo que tienes que hacer tú (no es delegable)
1. **Crear cuenta de Play Console** (25 USD, pago único): verificación de identidad con documento oficial, teléfono y dirección. Cuenta *personal* no requiere DUNS. Tu nombre legal aparecerá en la ficha pública.
2. **Prueba cerrada obligatoria** (cuentas personales creadas después de nov-2023): **12 testers que instalen la app y permanezcan 14 días consecutivos**, y después responder el cuestionario de "acceso a producción". Plan práctico: recluta amigos/familia por WhatsApp con el enlace de la prueba cerrada. Este es el cuello de botella de calendario: empieza esto ANTES que todo lo demás.
3. **Crear cuenta de AdMob** (gratuita) con datos fiscales; el pago llega al acumular 100 USD.

### Lo que preparo yo en el código
- [ ] **Migrar el build canónico al proyecto Gradle** (Play exige **AAB**, no APK; build.sh no genera AAB). El Gradle ya compila con escáner nativo ML Kit incluido — la versión de tienda será la más completa.
- [ ] **Subir targetSdk a 36** (obligatorio para apps nuevas desde el 31-ago-2026; hoy el mínimo es 35).
- [ ] **Workflow de CI para AAB firmado** con upload key en GitHub Secrets + **Play App Signing** (Google custodia la llave maestra: si pierdes tu upload key se puede resetear, la app no se pierde).
- [ ] **Integración AdMob** (ver Fase 2) con IDs de prueba hasta que exista la cuenta.
- [ ] Ficha: textos, capturas (ya tenemos el pipeline de screenshots), icono 512, feature graphic.

### Requisitos de política que ya cubrimos o cubriremos
| Requisito | Estado |
|---|---|
| Privacy policy URL pública | ✅ `https://pagabo18.github.io/Rutinal/privacy.html` |
| Atribución ODbL (Open Food Facts) | ✅ En Ajustes → Acerca de |
| Funcionalidad mínima (no ser "wrapper web") | ✅ Local-first, offline, puente nativo, widgets — documentarlo en las notas de revisión |
| Formulario de salud de Play | ⏳ Se llena en Console; sin claims médicos ("registra", nunca "cura/adelgaza") |
| Data Safety form | ⏳ Declarar exactamente lo que recolecta el SDK de AdMob (IP, Advertising ID, interacciones, diagnósticos) según la tabla oficial de Google. **Nunca declarar "no recolecta" teniendo AdMob** |
| Better Ads (sin intersticiales al abrir ni en medio de tareas) | ✅ Por diseño solo usaremos banner |

Fuentes: [testers](https://support.google.com/googleplay/android-developer/answer/14151465) · [target API](https://support.google.com/googleplay/android-developer/answer/11926878) · [Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756) · [salud](https://support.google.com/googleplay/android-developer/answer/14738291) · [Data Safety + AdMob](https://developers.google.com/admob/android/privacy/play-data-disclosure) · [Better Ads](https://support.google.com/googleplay/android-developer/answer/12271244)

---

## FASE 2 — Monetización con anuncios no intrusivos

### Diseño (decidido para NO molestar)
- **Un solo banner adaptativo anclado** en la parte inferior, **solo en las pestañas Hoy y Calendario** (nunca en Comida mientras registras, nunca en Reloj durante un Pomodoro — no interrumpir es también lo que exige la política Better Ads).
- **Cero intersticiales, cero app-open ads, cero rewarded** en v1.
- Banner **nativo junto al WebView** — patrón explícitamente permitido por AdMob ([fuente](https://support.google.com/admob/answer/11893859)).
- **UMP SDK (consentimiento) desde el día uno**: obligatorio para usuarios de Europa desde 2024; sin él, AdMob corta la monetización en esa región.
- **`app-ads.txt`** en el dominio de Pages para validar el inventario.
- La PWA y el APK directo de GitHub **seguirán sin anuncios** (sin SDK): los ads solo van en los builds de tienda.
- Regla de oro (política Apple 5.1.3 y sentido común): **los datos de nutrición/hábitos jamás alimentan la capa de anuncios**.

### Expectativas honestas de ingreso
- eCPM de banner en LatAm: **~0.10–0.20 USD**. Con solo banners espera **~1–3 USD al mes por cada 1,000 usuarios activos diarios**. Es "algo de dinero" real pero modesto: el objetivo correcto de la Fase 2 es dejar la infraestructura lista y crecer usuarios.
- Palanca futura sin volverse intrusivo: **compra única "Quitar anuncios" (1–2 USD)** — suele generar más que los banners en apps de productividad y mejora las reseñas.

---

## FASE 3 — App Store (iOS) (3-6 semanas de trabajo, 99 USD/año)

### Realidad del port
- **No existe "APK para iOS"**: hay que empaquetar la web app con **Capacitor (WKWebView)**. La buena noticia: **~100% del HTML/JS se reutiliza** (todo el core de hábitos, nutrición, reloj).
- Se reescribe la capa nativa: notificaciones → `@capacitor/local-notifications`; escáner → plugin ML Kit de Capacitor; AdMob → `@capacitor-community/admob` + **SKAdNetwork** en Info.plist; ajustes de safe-areas/teclado.
- **Widgets iOS quedan fuera de la v1** (requieren Swift/WidgetKit; se evalúan en Fase 5).
- **No necesitas Mac**: compilar con **Xcode Cloud (25 h/mes incluidas en la membresía)** o GitHub Actions con runner macOS (~1 USD por build). Ionic Appflow está descontinuado (cierre 2027) — no usarlo.
- Sí conviene **acceso a al menos un iPhone físico** para probar antes de enviar.

### Riesgos específicos de Apple y mitigación
- **Guideline 4.2 (funcionalidad mínima)** — riesgo #1 para apps Capacitor: se mitiga con features nativas visibles (notificaciones locales, escáner, haptics, offline total) y Review Notes claras. Presupuestar **1-3 rondas de rechazo/reenvío** (cada una 1-3 días); es normal y corregible.
- **Anuncios sin rastreo**: serviremos **ads no personalizados sin prompt ATT** (legal y soportado por AdMob; eCPM menor pero sin fricción de privacidad). Si algún día se quiere ATT, va ANTES de inicializar el SDK.
- **App Privacy labels**: declarar lo del SDK de AdMob (nunca "Data Not Collected").
- **Account deletion no aplica** (no hay cuentas) — confirmado por la 5.1.1(v).
- **PWA-only en iOS NO es alternativa seria**: almacenamiento evictable (riesgo de pérdida de datos), sin AdMob, sin widgets, fricción de instalación. La App Store es el camino si quieres ads en iOS.

Fuentes: [enrolamiento](https://developer.apple.com/support/enrollment/) · [guidelines](https://developer.apple.com/app-store/review/guidelines/) · [Xcode Cloud](https://developer.apple.com/news/?id=ik9z4ll6) · [AdMob iOS sin ATT](https://support.google.com/admob/answer/9997589) · [account deletion](https://developer.apple.com/news/?id=12m75xbj)

---

## FASE 4 — Escalabilidad técnica

La app es local-first sin servidores: **escala a millones de usuarios con costo de infraestructura ≈ 0**. Lo que sí hay que escalar:

1. **APIs externas**: cada usuario usa su propia cuota — la DEMO_KEY de USDA compartida es el único punto débil. Mitigación ya implementada (base local de 677 alimentos +캠po para API key propia); siguiente paso: instrucción in-app más visible para obtener key gratuita, y caché de resultados (ya existe para barcode OFF).
2. **Calidad antes de volumen**: pipeline actual (tests Playwright + compilación verificada) → añadir **crash reporting** en builds de tienda (Crashlytics; gratuito) porque Play penaliza ANRs/crashes en visibilidad.
3. **Un solo código, cuatro canales**: Web/PWA (gratis, sin ads) · APK GitHub (early adopters) · Play Store (masivo, con ads) · App Store (iOS). El HTML/JS es el núcleo compartido; solo la cáscara cambia.
4. **Datos del usuario a prueba de crecimiento**: export/import + respaldo automático ya existen; siguiente paso natural cuando haya tracción: **sincronización opcional entre dispositivos** (p. ej. archivo cifrado en el Drive del propio usuario — mantiene el espíritu local-first y costo cero de servidores; evitar construir backend propio hasta que sea imprescindible).
5. **Internacionalización**: es/en/pt-BR/fr ya existen — pt-BR y en-US son los mercados obvios de expansión (multiplican el eCPM: EE. UU. paga 5-10× LatAm).

## FASE 5 — Crecimiento (después de publicar)
- ASO: nombre/keywords ("hábitos", "contador de calorías", "pomodoro"), capturas por idioma, video corto.
- Pedir reseña in-app tras rachas logradas (API nativa de review, sin spam).
- "Quitar anuncios" como compra única; después evaluar premium (más widgets, temas).
- Widgets iOS (WidgetKit) cuando la base iOS lo justifique.

---

## REGISTRO DE RIESGOS (y cómo los evitamos)

| # | Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|---|
| 1 | Rechazo Play 4.3 "wrapper web" | Baja | Medio | App offline/local-first con nativo real; notas de revisión explícitas |
| 2 | Rechazo Apple 4.2 | **Media-alta** | Medio | Features nativas visibles; 1-3 reenvíos presupuestados |
| 3 | Suspensión por Data Safety/labels incorrectas con AdMob | Media si se hace mal | **Alto** | Declarar exactamente la tabla oficial del SDK en ambas tiendas |
| 4 | Claims de salud en ficha o app | Baja | Alto | Lenguaje de registro/seguimiento; disclaimer ya integrado |
| 5 | Cierre de cuenta AdMob por clics inválidos en pruebas | Media | **Alto e irreversible** | SIEMPRE test ads/test devices en desarrollo; jamás clicar ads propios |
| 6 | Servir ads en Europa sin CMP | Media | Alto (corte de ingresos) | UMP SDK integrado desde v1 |
| 7 | Pérdida del upload keystore | Baja | Bajo (con Play App Signing) | Play App Signing + copia del upload key fuera del repo (NUNCA commitearlo) |
| 8 | Incumplir ODbL (Open Food Facts) | Baja | Medio | Atribución ya visible; mantener datasets OFF/USDA separados (no fusionar en una base derivada) |
| 9 | Target API desactualizado (bloqueo de updates) | Media a futuro | Medio | Subir a targetSdk 36 ya; revisar cada agosto |
| 10 | "Android Developer Verification" (sept-2026, afecta también distribución fuera de Play) | Alta (es un hecho) | Medio | La verificación de Play Console la cubre; estar atentos al APK de GitHub |
| 11 | Pérdida de datos de usuarios (localStorage) | Baja en APK / media en PWA iOS | Alto (reputación) | Respaldo automático semanal ya activo + export manual |
| 12 | Dependencia de APIs externas (USDA/OFF caídas) | Media | Bajo | Base local de 677 alimentos funciona offline |
| 13 | Costo anual Apple (99 USD) sin ingresos que lo cubran | Media | Bajo | Lanzar iOS DESPUÉS de validar tracción en Android |

---

## ORDEN DE EJECUCIÓN RECOMENDADO

1. **Ya** — Preparación técnica (yo): Gradle como build canónico, targetSdk 36, workflow AAB, AdMob+UMP con IDs de prueba, textos de ficha.
2. **Semana 1** — Tú: cuenta Play Console (25 USD) + cuenta AdMob + reclutar 12 testers.
3. **Semanas 1-3** — Prueba cerrada corriendo (14 días) mientras pulimos con feedback real.
4. **Semana 3-4** — Solicitar producción; activar ads reales con la app ya publicada.
5. **Mes 2-3** — Validar tracción Android; decidir inversión iOS (99 USD/año + 3-6 semanas de port).
6. **Después** — "Quitar anuncios", sync opcional, widgets iOS.
