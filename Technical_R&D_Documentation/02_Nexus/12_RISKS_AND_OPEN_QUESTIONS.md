# PROJECT 02 — NEXUS · Risks and Open Questions

---

## 1. Registro de riesgos

**P** = probabilidad (1–5), **I** = impacto (1–5), **R** = P × I.

| ID | Riesgo | P | I | R | Categoría | Mitigación |
|---|---|---|---|---|---|---|
| **R-20** | **La latencia conversacional no baja de ~1,5 s** y Nexus se siente lento e incómodo | 3 | 5 | **15** | Técnico | `EXP-201`; streaming en todas las etapas; respuesta de relleno; palancas de `05_AUDIO_SYSTEM.md` §7 |
| **R-21** | **El barge-in no funciona** porque el AEC no es suficiente | 3 | 4 | **12** | Técnico | Array con AEC hardware; desacoplo mecánico del altavoz; `EXP-202` |
| **R-22** | **El reconocimiento facial falla en condiciones reales** (contraluz, distancia, ángulo) pese a las cifras de benchmark | 4 | 3 | **12** | Técnico | `EXP-203` con curva ROC propia; iluminación IR; no copiar umbrales de papers |
| **R-23** | **Valle inquietante**: el avatar produce rechazo en lugar de cercanía | 3 | 4 | **12** | Producto | Priorizar capas procedurales (parpadeo, respiración, sácadas) sobre fidelidad; probar con personas ajenas |
| **R-24** | **Cumplimiento normativo de datos biométricos** (RGPD art. 9) al identificar a visitantes | 3 | 5 | **15** | Legal | Base de rostros opt-in; desconocidos no se almacenan; consulta legal antes de identificar a terceros |
| **R-25** | **Seguridad ocular del iluminador IR**: exposición invisible sin reflejo de defensa | 2 | 5 | **10** | **Seguridad** | Cálculo IEC 62471 obligatorio (`EXP-208`); límite de corriente **por hardware**; grupo exento |
| **R-26** | **La restricción del EULA de MetaHuman** bloquea una ruta futura (destilar el avatar a un modelo ligero) | 4 | 2 | 8 | Legal | Ya identificado. Si esa ruta se vuelve necesaria, partir de otro personaje base |
| **R-27** | **Consumo eléctrico inaceptable** en modo de espera | 3 | 4 | **12** | Diseño | Modo REPOSO por defecto; Wake-on-LAN del servidor; radar en vez de cámara para despertar |
| **R-28** | **Ruido audible** de ventiladores rompe la sensación de compañía | 3 | 3 | 9 | Diseño | NFR-09 como requisito duro; limitar la potencia disipable del hub a lo que la convección natural permita |
| **R-29** | **La instalación de display cuesta mucho más de lo que aporta** | 3 | 4 | **12** | Económico | `EXP-210` antes de comprar nada; considerar que un monitor grande bien usado puede bastar |
| **R-30** | **Conflicto de GPU** entre LLM local y render del avatar | 4 | 3 | **12** | Arquitectura | `EXP-209`; separar máquinas desde NEXUS 3 |
| **R-31** | **La memoria a largo plazo se degrada**: recupera cosas irrelevantes o contradictorias | 3 | 4 | **12** | Técnico | Consolidación estructurada, no volcado de transcripciones; evaluación de recuperación |
| **R-32** | **Cambiar de modelo de embeddings invalida el índice** de memoria | 3 | 3 | 9 | Técnico | Versionar el índice con el nombre del modelo; plan de reindexación desde el día 1 |
| **R-33** | **Deriva de calibración**: alguien mueve la cámara y la mirada del avatar se descalibra | 4 | 2 | 8 | Mecánico | Montaje rígido; procedimiento de recalibración sencillo; detección automática de descalibración |
| **R-34** | **El proyecto no sobrevive a la novedad**: se usa 2 semanas y se abandona | 3 | 5 | **15** | Producto | `EXP-212` (convivencia 30 días) como puerta antes de gastar en hardware caro |
| **R-35** | **Un agente hace algo destructivo** con permisos excesivos | 2 | 5 | **10** | Seguridad | Niveles L0–L4 aplicados por el Tool Gateway, fuera del modelo |
| **R-36** | **Suplantación**: alguien engaña al reconocimiento facial con una foto | 3 | 3 | 9 | Seguridad | El reconocimiento **no** autoriza acciones; detección de vida sólo si alguna vez lo hiciera |
| **R-37** | **Dependencia de un proveedor de modelos** remoto que cambie precios o condiciones | 3 | 3 | 9 | Externo | El router permite sustituir el destino remoto; modo local funcional |
| **R-38** | **Riesgo de suministro de cámaras de profundidad** (RealSense recién escindida) | 2 | 2 | 4 | Suministro | Abstracción de cámara en software; empezar sin profundidad |
| **R-39** | **El wake word elegido da demasiados falsos positivos** | 3 | 2 | 6 | Técnico | `EXP-204`; elegir palabra de ≥3 sílabas y reentrenar con negativos de la casa |
| **R-40** | **Complejidad descontrolada**: el sistema se vuelve imposible de mantener | 4 | 4 | **16** | Gestión | Puertas de fase estrictas; el sistema debe estar utilizable al final de cada fase, no sólo al final |

### Riesgos por encima del umbral (R ≥ 12)

1. **R-40** (16) — complejidad descontrolada
2. **R-20**, **R-24**, **R-34** (15) — latencia, cumplimiento biométrico, abandono
3. **R-21**, **R-22**, **R-23**, **R-27**, **R-29**, **R-30**, **R-31** (12)

> Nótese que **tres de los cinco riesgos más altos no son técnicos**: son de gestión (R-40), legales (R-24) y de producto (R-34). Es lo habitual en proyectos de esta ambición.

---

## 2. Incógnitas

| ID | Incógnita | Cómo se resuelve |
|---|---|---|
| **U-20** | ¿Cuál es nuestra latencia conversacional real con modelos locales? | `EXP-201` |
| **U-21** | ¿Funciona el barge-in con nuestro hardware y en nuestra sala? | `EXP-202` |
| **U-22** | ¿Qué precisión de reconocimiento facial obtenemos realmente? | `EXP-203` |
| **U-23** | ¿Produce el Pepper's Ghost una mejora perceptible sobre un monitor? | **`EXP-210`** ⭐ |
| **U-24** | ¿Cabe el pipeline de visión en el acelerador del hub? | `EXP-206` |
| **U-25** | ¿Cumple nuestro iluminador IR el grupo exento de IEC 62471? | `EXP-208` |
| **U-26** | ¿Puede el mismo equipo renderizar y servir el LLM? | `EXP-209` |
| **U-27** | ¿Detecta el radar a una persona inmóvil de forma fiable? | `EXP-211` |
| **U-28** | ¿Seguiremos usando Nexus a los 30 días? | **`EXP-212`** ⭐ |
| **U-29** | ¿Qué marco legal aplica a identificar visitantes en un domicilio? | Consulta legal |
| **U-30** | ¿Qué tolerancias mecánicas necesita la calibración cámara↔pantalla? | Análisis de sensibilidad + `EXP-205` |
| **U-31** | ¿Cuánta cobertura de sala necesitamos realmente? | `EXP-207` |
| **U-32** | ¿Cuál es el consumo real del sistema en cada modo? | Medición tras NEXUS 3 |

---

## 3. Enfoques alternativos

| Si falla... | Alternativa |
|---|---|
| La latencia local es demasiado alta | Modelo remoto con streaming agresivo + respuesta de relleno local; o modelo local más pequeño para conversación y remoto sólo para razonamiento |
| El AEC no da suficiente cancelación | Micrófono de solapa / cercano al usuario; o "push to talk" con gesto; o bajar el volumen de salida automáticamente al detectar posible habla |
| El reconocimiento facial no es fiable | Identificación por voz; o simplemente "hay alguien" sin identificar; o identificación asistida ("¿eres tú, Gabriel?") |
| El valle inquietante es un problema | Avatar estilizado en vez de fotorrealista; o representación abstracta (una presencia luminosa) |
| El display transparente es inviable o no aporta | Monitor grande de alta calidad, bien colocado y a la escala correcta |
| El hub propio es demasiado trabajo | Seguir con periféricos USB comerciales indefinidamente; se pierde la garantía de privacidad por hardware pero el sistema funciona |
| El servidor local no da la potencia necesaria | Ver `../03_Edge_AI_Research/10_NEXUS_EDGE_AI_ARCHITECTURE.md` — arquitectura jerárquica |

---

## 4. Recomendación técnica actual

### Qué hacer, en orden

1. **NEXUS 0 y NEXUS 1 primero, con hardware comprado.** No diseñar electrónica hasta tener un sistema de voz que funcione y se use.
2. **EXP-201 (latencia) y EXP-210 (Pepper's Ghost) lo antes posible.** Son baratos y deciden dos ramas enteras del proyecto.
3. **EXP-212 (convivencia 30 días) como puerta obligatoria** antes de gastar en NEXUS 4/5.
4. **Resolver la cuestión legal de biometría (U-29) antes de que el sistema identifique a alguien que no sea el propietario.**
5. **El cálculo de seguridad IEC 62471 del IR es innegociable** antes de encender cualquier iluminador a potencia.

### Qué no hacer

1. ❌ **No comprar una pantalla LED transparente.** Es la tecnología equivocada para este caso de uso (`08_TRANSPARENT_DISPLAY_RESEARCH.md` §1).
2. ❌ **No intentar ejecutar un LLM grande en el Sensor Hub.** Ver Proyecto 03.
3. ❌ **No empezar por el avatar.** Es la parte más vistosa y la menos útil sin el resto.
4. ❌ **No diseñar la PCB del Sensor Hub antes de EXP-206 y EXP-207.** Determinan cuánta potencia de cálculo y cuántas cámaras hacen falta.
5. ❌ **No usar MetaHuman para entrenar modelos.** Prohibido por licencia.
6. ❌ **No usar el reconocimiento facial como autenticación.**

### La frase para el ingeniero

> Nexus se puede llevar bastante lejos comprando hardware, no diseñándolo. **Tu trabajo empieza de verdad en NEXUS 4**, y consiste en tres cosas concretas y difíciles: (1) un array de sensores mecánicamente rígido y calibrable, (2) una cadena de privacidad que sea *hardware* y no una promesa de software, y (3) disipar 10–15 W sin que se oiga un ventilador. La cuarta, el iluminador IR, es una cuestión de **seguridad de personas** y requiere cálculo, no estimación.
