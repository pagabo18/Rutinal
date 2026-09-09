# PROJECT 01 — CARPLAY BRIDGE · Preliminary BOM

---

## ⚠️ Nota obligatoria sobre precios

- Los precios de esta tabla son **estimaciones de orden de magnitud** para planificar, **no cotizaciones**.
- Están etiquetados `[HIPÓTESIS]` salvo donde se cite una fuente con fecha.
- **Re-cotizar siempre antes de comprar.** Los precios de semiconductores y SBC cambian mes a mes.
- Donde no tenemos base fiable, la celda dice `SIN PRECIO FIABLE`.
- Moneda: EUR. Fecha de estimación: **agosto 2026**.

---

## 1. BOM — MVP v0.1 (Proof of Concept)

| # | Componente | Propósito | Pieza sugerida | Specs críticas | Cant. | Coste est. | Alternativa | Razón |
|---|---|---|---|---|---|---|---|---|
| 1 | SBC | Cómputo y radios | Raspberry Pi 4 B 2 GB | USB peripheral en USB-C, Wi-Fi 5 GHz, BT 5.0 | 1 | ~45 € `[HIPÓTESIS]` | Pi 3 A+ (~25 €) | El 3 A+ tiene OTG pero **sólo Wi-Fi 2,4 GHz** → no sirve para AA inalámbrico |
| 2 | Almacenamiento | Sistema | microSD 16–32 GB clase A2 | A2, alta resistencia | 1 | ~10 € `[HIPÓTESIS]` | SD industrial | En PoC la SD normal basta |
| 3 | Cable USB | Enlace al head unit | USB-C ↔ USB-A **de datos** | Debe llevar D+/D−, no sólo alimentación | 1 | ~8 € `[HIPÓTESIS]` | — | **Punto de fallo nº1** si se usa un cable de sólo carga |
| 4 | Alimentación de banco | 5 V al Pi por GPIO | Fuente de laboratorio o PSU 5 V/3 A | 5,1 V, ≥ 3 A | 1 | ~25 € `[HIPÓTESIS]` | Adaptador de mechero USB de calidad + cable a GPIO | Nunca alimentar por el USB-C: ese puerto es el enlace de datos |
| 5 | Disipación | Térmica | Disipador pasivo + carcasa metálica | — | 1 | ~12 € `[HIPÓTESIS]` | Ventilador | Evitar ventilador incluso en PoC |
| 6 | Cableado | Alimentación por GPIO | Jumpers de calidad o conector JST-XH | 2 A por vía | 1 | ~5 € `[HIPÓTESIS]` | — | |
| | | | | | | **≈ 105 €** | | |

---

## 2. BOM — v0.2 / v0.3 (etapa de potencia + supervisor)

Se añade sobre el v0.1.

| # | Componente | Propósito | Pieza sugerida (familia) | Specs críticas | Cant. | Coste est. | Alternativa | Razón |
|---|---|---|---|---|---|---|---|---|
| 7 | Fusible + portafusibles | Protección de cortocircuito | Portafusibles en línea automotriz | 3 A, 32 V | 1 | ~4 € `[HIPÓTESIS]` | Fusible SMD | Obligatorio si se conecta a la batería |
| 8 | Protección de polaridad inversa | Instalación al revés | P-FET canal P de baja Rds(on) o controlador de diodo ideal | Vds ≥ 60 V, Rds(on) < 20 mΩ | 1 | ~2–6 € `[HIPÓTESIS]` | Schottky en serie | El Schottky disipa ~0,8 W a 2 A |
| 9 | TVS load dump | Supresión de transitorios | TVS unidireccional de alta energía (p. ej. familia SMDJ) | Vbr ≈ 26–33 V, ≥ 5 kW pico | 1–2 | ~1,5 € `[HIPÓTESIS]` | — | No basta por sí solo para un load dump de 400 ms (ver `04_HARDWARE_ARCHITECTURE.md` §3.2) |
| 10 | Surge stopper / sobretensión | Desconexión activa en load dump | Controlador tipo LTC4364 / LT4363 + FET | Vin hasta 80 V | 1 | ~8–15 € `[HIPÓTESIS]` | Sólo TVS (fase PoC) | La opción robusta para producto |
| 11 | Buck 12 V → 5,1 V | Conversión | Controlador síncrono de amplio Vin (familia LM5164 / LMR51450 / TPS54540) | Vin 4–60 V, Iout ≥ 5 A, EN pin, Iq shutdown < 10 µA | 1 | ~4–10 € `[HIPÓTESIS]` | Módulo buck comercial | **No usar módulos genéricos**: su consumo en vacío arruina NFR-07 |
| 12 | Inductor de potencia | Buck | Inductor blindado | 4,7–10 µH, Isat ≥ 8 A, DCR baja | 1 | ~1,5 € `[HIPÓTESIS]` | | |
| 13 | Condensadores de entrada/salida | Buck + bulk | Cerámicos X7R 100 V + electrolítico/polímero | Derating de tensión ≥ 2× | ~10 | ~3 € `[HIPÓTESIS]` | | Los X7R pierden capacidad con la tensión: sobredimensionar |
| 14 | Filtro EMI | Cumplimiento | Choke de modo común + condensadores | ≥ 3 A, atenuación en banda AM | 1 | ~2 € `[HIPÓTESIS]` | Ferrita simple | |
| 15 | MCU supervisor | Ignición, apagado, watchdog | STM32G031 (LQFP/QFN) | ADC, STOP < 5 µA, UART | 1 | ~1,5–3 € `[HIPÓTESIS]` | RP2350 | Ver Q-E04 |
| 16 | LDO 3,3 V | Alimentación del MCU | LDO de bajo Iq | Iq < 5 µA, 3,3 V/100 mA | 1 | ~0,5 € `[HIPÓTESIS]` | | |
| 17 | Load switch | Corte de alimentación del SBC | Load switch de alto lado con soft-start | 5 V, ≥ 5 A, control lógico | 1 | ~1–3 € `[HIPÓTESIS]` | P-FET discreto | |
| 18 | Sensado ACC | Detección de ignición | Divisor + TVS + filtro RC | Entrada hasta 40 V, salida 0–3,3 V | 1 | ~0,5 € `[HIPÓTESIS]` | Optoacoplador | El opto añade aislamiento |
| 19 | LED RGB de estado | UX y diagnóstico | LED RGB de cátodo común o WS2812 | — | 1 | ~0,5 € `[HIPÓTESIS]` | | |
| 20 | Sensor de temperatura | Protección térmica | Sensor I²C (familia TMP102 / LM75) | ±1 °C, −40…+125 °C | 1 | ~1 € `[HIPÓTESIS]` | NTC + ADC del MCU | |
| 21 | TVS de datos USB | ESD | TVS de baja capacitancia | < 1 pF, IEC 61000-4-2 nivel 4 | 1 | ~0,5 € `[HIPÓTESIS]` | | |
| 22 | PCB | Soporte | PCB 4 capas, ~80×60 mm | ENIG, 1 oz | 5 | ~40 € (lote) `[HIPÓTESIS]` | 2 capas para v0.2 | |
| 23 | Conector de alimentación | Entrada 12 V | Conector automotriz 2–3 vías con retención | 5 A, retención positiva | 1 | ~3 € `[HIPÓTESIS]` | Bornero | |
| 24 | Caja | Mecánica | Caja de aluminio extruido | Disipación, ~120×80×30 mm | 1 | ~15 € `[HIPÓTESIS]` | Impresión 3D en v0.2 | El plástico no disipa |
| 25 | Antenas externas | RF | Antena adhesiva dual-band + pigtail U.FL | 2,4/5 GHz, ≥ 2 dBi | 2 | ~8 € `[HIPÓTESIS]` | Antena de PCB | Ver `04_HARDWARE_ARCHITECTURE.md` §8 |
| | | | | | | **≈ 100–140 €** por unidad + PCB | | |

---

## 3. BOM — v1.0 (Engineering prototype con Compute Module)

Cambios respecto a v0.3:

| # | Cambio | De | A | Motivo | Coste est. |
|---|---|---|---|---|---|
| 1 | SBC | Pi 4 B | **CM4 2 GB Lite + WiFi** | Puerto USB2 dedicado (no el de alimentación), rango de temperatura industrial disponible, formato integrable | ~40–55 € `[HIPÓTESIS]` |
| 2 | Almacenamiento | microSD | **eMMC integrada en el CM4** o SSD | Fiabilidad en campo | incluido / +15 € |
| 3 | PCB | HAT | **Carrier board propia 4 capas** con conectores del CM4 | Integración completa | ~60 € el lote `[HIPÓTESIS]` |
| 4 | Conectores del CM | — | 2× conector DF40C-100DS o equivalente | Interfaz del módulo | ~6 € `[HIPÓTESIS]` |
| 5 | Caja | Impresa | **Aluminio mecanizado con acoplamiento térmico** | NFR-06 | ~40 € en prototipo `[HIPÓTESIS]` |
| 6 | Componentes de potencia | Comerciales | **Grado extendido (−40…+125 °C)** | Entorno del vehículo | +20 % sobre el coste de los pasivos |

**Coste estimado por unidad en v1.0 (serie de 5 unidades):** `SIN PRECIO FIABLE` — depende críticamente de la carrier board y del proveedor de mecanizado. Orden de magnitud: **250–450 € por unidad** en serie de 5. `[HIPÓTESIS]`

---

## 4. Equipamiento de laboratorio necesario

| Equipo | Para qué | Prioridad | Coste est. |
|---|---|---|---|
| Fuente de alimentación programable 0–30 V / 5 A con límite de corriente | Simular 12 V, cold crank, rampas | **Imprescindible** | ~150–400 € `[HIPÓTESIS]` |
| Multímetro con rango de µA | EXP-106 (consumo en reposo) | **Imprescindible** | ~60–200 € `[HIPÓTESIS]` |
| Osciloscopio ≥ 100 MHz, 2–4 canales | Transitorios, integridad de señal, arranque | **Imprescindible** | ~350–800 € `[HIPÓTESIS]` |
| Analizador lógico USB | Depurar UART MCU↔SBC, I²C | Alta | ~15–150 € `[HIPÓTESIS]` |
| Medidor de corriente USB en línea | EXP-107 | Alta | ~20 € `[HIPÓTESIS]` |
| Adaptador USB-UART 3,3 V | Consola serie del SBC y del MCU | **Imprescindible** | ~10 € `[HIPÓTESIS]` |
| Estación de soldadura + aire caliente | Reparación y rework | **Imprescindible** | ~150–350 € `[HIPÓTESIS]` |
| Cámara termográfica (o cámara de móvil con módulo térmico) | EXP-111, puntos calientes | Media | ~250–500 € `[HIPÓTESIS]` |
| Sondas near-field de EMI | Pre-compliance casero | Media | ~80–200 € `[HIPÓTESIS]` |
| Generador de transitorios ISO 7637-2 | Validación de protecciones | Baja (se subcontrata) | `SIN PRECIO FIABLE` — típicamente se alquila laboratorio |
| Analizador de espectro / SDR (2,4 y 5 GHz) | Selección de canal, coexistencia | Media | ~150–600 € `[HIPÓTESIS]` |
| Relé/actuador controlable para EXP-105 | Ciclado automatizado | Media | ~30 € `[HIPÓTESIS]` |
| Segundo Pi 4 + monitor táctil HDMI | Head unit de laboratorio (EXP-102) | Alta | ~150 € `[HIPÓTESIS]` |

---

## 5. Material de referencia a comprar para estudio

| Elemento | Por qué comprarlo | Coste est. |
|---|---|---|
| Un adaptador comercial de Android Auto inalámbrico (AAWireless, Ottocast A2, Carlinkit) | **Referencia de comportamiento y de latencia** para EXP-104; ver qué hace bien la competencia | ~50–90 € `[HIPÓTESIS]` |
| Un dongle Carlinkit CPC200-CCPA | Permite convertir un Linux en receptor CarPlay (útil para Nexus en el coche, no para el Bridge) | ~90–120 € `[HIPÓTESIS]` |
| Un "CarPlay AI Box" barato | **Objeto de estudio**: entender cómo se comporta el head unit; ver `02_TECHNICAL_RESEARCH.md` §2.4 | ~80–150 € `[HIPÓTESIS]` |

> Estos tres dispositivos, juntos, cuestan menos que un día de ingeniería y ahorran semanas de suposiciones.

---

## 6. Resumen de costes por fase

| Fase | Clasificación | Coste de material estimado | Nota |
|---|---|---|---|
| v0.1 | PoC | **~105 €** | Sin contar teléfono ni coche |
| v0.2–v0.3 | PoC eléctrico → Prototype | **~250 €** adicionales (una unidad + PCB) | |
| v1.0 | Engineering prototype | **~250–450 €/unidad** en serie de 5 | `SIN PRECIO FIABLE` para la mecánica |
| Laboratorio | — | **~1 000–2 500 €** | Inversión única, reutilizable en los tres proyectos |
| Producción | Production design | `SIN PRECIO FIABLE` | Requiere diseño para fabricación y volumen definido |

**Estimación de coste de producción (BOM únicamente, volumen 1 000 unidades):** `SIN PRECIO FIABLE`. Un análisis honesto requiere el diseño cerrado. Como orden de magnitud puramente indicativo, el mayor coste será el módulo de cómputo, no la electrónica de potencia. `[HIPÓTESIS]`
