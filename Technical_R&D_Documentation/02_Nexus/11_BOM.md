# PROJECT 02 — NEXUS · Preliminary BOM

> Mismas reglas de precios que en el Proyecto 01: estimaciones de orden de magnitud etiquetadas `[HIPÓTESIS]`, con fuente y fecha cuando existan. Re-cotizar antes de comprar. Fecha de estimación: **agosto 2026**.

---

## 1. NEXUS 1 — Voz (sin hardware propio)

| # | Componente | Propósito | Pieza sugerida | Specs críticas | Cant. | Coste est. | Alternativa | Razón |
|---|---|---|---|---|---|---|---|---|
| 1 | Array de micrófonos | Captación de campo lejano con AEC | **ReSpeaker XVF3800 USB 4-Mic Array** | AEC, beamforming, DoA, VAD, AGC 60 dB, USB **o I²S**, 360°/5 m `[CONFIRMADO]` | 1 | ~80–100 € `[HIPÓTESIS]` | Array de 6/8 micrófonos; micrófonos MEMS crudos | El modo dual USB/I²S evita rehacer el trabajo al integrar |
| 2 | Altavoz | Salida de voz | Altavoz de rango medio en caja cerrada | Inteligibilidad de voz, 65–75 dBA a 1 m | 1 | ~30–60 € `[HIPÓTESIS]` | Altavoz activo comercial | La calidad "hi-fi" no aporta; la colocación sí |
| 3 | Amplificador | Si el altavoz es pasivo | Amplificador clase D | 5–20 W, ruido bajo | 1 | ~15 € `[HIPÓTESIS]` | Altavoz activo | |
| 4 | PC / servidor | Modelos | Máquina existente con GPU | Ver `../03_Edge_AI_Research/08_HARDWARE_COMPARISON.md` | 1 | reutilizar | — | No comprar hasta saber qué modelo se va a usar |
| | | | | | | **~130–175 €** | | |

---

## 2. NEXUS 2 — Visión

| # | Componente | Propósito | Pieza sugerida | Specs críticas | Cant. | Coste est. | Alternativa | Razón |
|---|---|---|---|---|---|---|---|---|
| 5 | Cámara | Percepción visual | Cámara USB o módulo MIPI con buena sensibilidad | 1080p30, FOV 90–120°, buena respuesta con poca luz, sin filtro IR o conmutable | 1–2 | ~40–120 € `[HIPÓTESIS]` | Cámara de vigilancia con buena óptica | La sensibilidad importa más que los megapíxeles |
| 6 | SBC para visión | Ejecutar el pipeline en el borde | **Raspberry Pi 5 (8/16 GB)** | 4× A76, PCIe, MIPI CSI | 1 | ~80–140 € `[HIPÓTESIS]` | Jetson Orin Nano | Ver `07_SENSOR_HARDWARE.md` §3 |
| 7 | Acelerador de IA | Detección + embeddings | **Raspberry Pi AI HAT+ 2 (Hailo-10H)** — 40 TOPS INT4, 8 GB LPDDR4X `[CONFIRMADO]` | PCIe, HailoRT | 1 | `SIN PRECIO FIABLE` — verificar en el canal oficial | AI HAT+ (Hailo-8/8L, 13/26 TOPS) | El 10H añade memoria propia y capacidad para modelos generativos |
| 8 | Iluminación IR | Visión nocturna | Módulo de LEDs IR 940 nm con driver de corriente | Ver cálculo IEC 62471 en `07_SENSOR_HARDWARE.md` §5 | 1 | ~15–40 € `[HIPÓTESIS]` | Iluminador IR comercial de CCTV | ⚠️ **Requiere cálculo de seguridad ocular** |
| 9 | Almacenamiento | Sistema + modelos | SSD NVMe 256 GB+ vía HAT | — | 1 | ~35 € `[HIPÓTESIS]` | microSD | Los modelos son grandes; la SD es lenta y frágil |
| 10 | Alimentación | — | Fuente 5 V/5 A oficial o inyector PoE | — | 1 | ~15–40 € `[HIPÓTESIS]` | | |
| | | | | | | **~185–375 €** + acelerador | | |

---

## 3. NEXUS 4 — Sensor Hub propio (electrónica a diseñar)

| # | Componente | Propósito | Pieza sugerida (familia) | Specs críticas | Cant. | Coste est. | Notas |
|---|---|---|---|---|---|---|---|
| 11 | Módulo de cómputo | Cerebro del hub | **CM5** (o Pi 5 en la primera iteración) | −20…+85 °C `[CONFIRMADO]`, PCIe, MIPI | 1 | ~60–110 € `[HIPÓTESIS]` | |
| 12 | PCB portadora | Integración | 4–6 capas, ~120×90 mm | MIPI CSI enrutado, PCIe, I²S | 5 | ~80–150 € el lote `[HIPÓTESIS]` | |
| 13 | Conectores del módulo | — | DF40C o equivalente | — | 2 | ~6 € `[HIPÓTESIS]` | |
| 14 | MCU auxiliar | Tiempo real, IR, privacidad, presencia | STM32G0/G4 o RP2350 | ADC, PWM, bajo consumo | 1 | ~2–4 € `[HIPÓTESIS]` | |
| 15 | Radar mmWave | Presencia sin cámara | Módulo mmWave 60 GHz o 24 GHz | Detección de persona inmóvil a 4 m | 1 | ~15–40 € `[HIPÓTESIS]` | ⚠️ Verificar homologación regional |
| 16 | Driver IR | Iluminación | Driver de corriente constante + limitación por hardware | Límite duro de corriente | 1 | ~3–8 € `[HIPÓTESIS]` | ⚠️ El límite debe ser de hardware |
| 17 | Sensor de luz ambiente | Adaptar exposición e indicadores | ALS I²C | — | 1 | ~1 € `[HIPÓTESIS]` | |
| 18 | Sensor de temperatura/humedad | Salud y contexto | Sensor I²C | — | 1 | ~2 € `[HIPÓTESIS]` | |
| 19 | Interruptores de privacidad | Corte físico | 2× interruptor deslizante DPDT con posición visible | Corriente del rail de sensores | 2 | ~3 € `[HIPÓTESIS]` | **Elemento de diseño clave** |
| 20 | Indicadores | Estado y privacidad | LEDs; los de cámara/micro **en serie con su rail** | — | ~6 | ~2 € `[HIPÓTESIS]` | |
| 21 | Módulo PoE+ | Alimentación por Ethernet | PD 802.3at (30 W) | 30 W, aislado | 1 | ~15–30 € `[HIPÓTESIS]` | |
| 22 | Reguladores | Rails 5 V / 3,3 V / analógico | Bucks + LDO de bajo ruido | Rail analógico separado para audio | ~4 | ~8 € `[HIPÓTESIS]` | |
| 23 | Micrófonos MEMS + DSP (opción integrada) | Array propio | XMOS + MEMS I²S | Geometría controlada ±0,5 mm | 4+1 | ~25 € `[HIPÓTESIS]` | Alternativa: seguir con el módulo comprado |
| 24 | Amplificador + altavoz | Salida | Clase D + altavoz | Desacoplo mecánico | 1 | ~25 € `[HIPÓTESIS]` | |
| 25 | Carcasa | Mecánica | Aluminio mecanizado con referencias de posicionamiento | Disipación 10–15 W sin ventilador; rigidez para calibración | 1 | ~60–150 € `[HIPÓTESIS]` prototipo | |
| 26 | Óptica | Cámara | Lente + soporte + ventana IR | Transmisión en IR y visible | 1 | ~20 € `[HIPÓTESIS]` | |
| | | | | | | **~330–560 €/unidad** en serie de 5 `[HIPÓTESIS]` | |

---

## 4. NEXUS 3 / 5 — Render y display

| # | Componente | Propósito | Opción | Coste est. | Fuente |
|---|---|---|---|---|---|
| 27 | GPU para render | Unreal + MetaHuman a 60 fps | GPU dedicada; dimensionar con `EXP-209` | `SIN PRECIO FIABLE` | — |
| 28 | **Maqueta Pepper's Ghost (EXP-210)** | Validar el efecto | Acrílico transparente + estructura + tela negra + tablet existente | **< 200 €** `[HIPÓTESIS]` | — |
| 29a | Display opción A: Pepper's Ghost a tamaño real | Presencia | Panel 65–86" de alto brillo + lámina + estructura | Panel: `SIN PRECIO FIABLE`; estructura: `SIN PRECIO FIABLE` | — |
| 29b | Display opción B: Looking Glass HLD | Presencia con profundidad | HLD 16" 4K desde **1 500 USD**; 27" 4K **3 000 USD**; 86" 4K **15 000 USD** | `[CONFIRMADO]` sept. 2025 | [Looking Glass](https://blog.lookingglassfactory.com/looking-glass-unveils-a-new-category-of-display/) |
| 29c | Display opción C: producto Pepper's Ghost llave en mano | Presencia | Proto M ~**5 900–6 900 USD**; Proto Epic/Luma **29 000–65 000 USD** | `[CONFIRMADO]` | [Entrepreneur](https://www.entrepreneur.com/business-news/proto-hologram-boxes-project-3d-images-like-the-jetsons/480494) |
| 29d | Display opción D: OLED transparente | Presencia con transparencia real | Canal profesional LG | `SIN PRECIO FIABLE` | — |
| 29e | Display opción E: **descartado** LED transparente | — | — | — | Ver `08_TRANSPARENT_DISPLAY_RESEARCH.md` §1 |

> **Ninguna de las opciones 29a–29d debe comprarse antes de completar EXP-210.**

---

## 5. Equipamiento de laboratorio adicional (sobre el del Proyecto 01)

| Equipo | Para qué | Coste est. |
|---|---|---|
| Sonómetro (medidor de SPL) | NFR-10 (ruido), calibración de nivel de voz | ~50–200 € `[HIPÓTESIS]` |
| Radiómetro / medidor de irradiancia IR | **EXP-208, seguridad IEC 62471** | ~200–800 € `[HIPÓTESIS]`, o subcontratar la medición |
| Patrón de calibración de cámara (tablero de ajedrez rígido) | Calibración de intrínsecos | ~30 € `[HIPÓTESIS]` |
| Luxómetro | Caracterizar la iluminación de la sala | ~30 € `[HIPÓTESIS]` |
| Cámara de alta velocidad (o móvil a 240 fps) | Medición de latencias | reutilizar `[HIPÓTESIS]` |
| Trípodes y soportes ajustables | Posicionamiento repetible en experimentos | ~60 € `[HIPÓTESIS]` |
| Acrílico, tela negra, perfil de aluminio | EXP-210 | ~100 € `[HIPÓTESIS]` |

---

## 6. Resumen de costes por fase

| Fase | Clasificación | Coste de material estimado | Nota |
|---|---|---|---|
| NEXUS 0 | PoC software | **0 €** | Sólo software y modelos |
| NEXUS 1 | PoC | **~130–175 €** | Array + altavoz |
| NEXUS 2 | Prototype | **~185–375 €** + acelerador | Cámara + Pi + acelerador |
| NEXUS 3 | Prototype | GPU (`SIN PRECIO FIABLE`) | Puede reutilizar hardware existente |
| **EXP-210** | Experimento clave | **< 200 €** | ⭐ Mejor relación información/coste del proyecto |
| NEXUS 4 | Engineering prototype | **~330–560 €/unidad** en serie de 5 | Diseño electrónico completo |
| NEXUS 5 | Engineering prototype | **1 500 – 65 000 USD** según ruta de display | La decisión más cara del proyecto |
| NEXUS 6 | — | Incremental | Sobre todo software |

> **Punto de decisión económica:** entre NEXUS 4 y NEXUS 5 el coste salta uno o dos órdenes de magnitud. **EXP-212 (convivencia) y EXP-210 (Pepper's Ghost) deben completarse antes de cruzar esa frontera.**
