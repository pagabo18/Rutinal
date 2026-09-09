# PROJECT 03 · Conclusiones

---

## 1. Las respuestas a las preguntas del brief

### *"¿Hasta qué punto podemos ejecutar modelos de miles de millones de parámetros en hardware tipo Raspberry Pi?"*

**Hasta 8 mil millones de parámetros, cuantizados a 4 bits, a 2–3 tokens por segundo.** Con un modelo de 3B se llega a 5–9 t/s, que es el límite práctico de lo conversacional en un Pi 5.

Más allá de eso no es cuestión de optimizar: es un muro físico.

### *"¿Cuál es realmente el límite? ¿Qué limita primero?"*

En este orden:

1. **Ancho de banda de memoria** (~17 GB/s teóricos, ~10 GB/s efectivos en Pi 5) — determina los tokens/segundo
2. **Capacidad de RAM** — determina qué modelo cabe, incluido el KV cache
3. **Cómputo** — sólo domina en el prefill de prompts largos
4. **Térmica** — sin refrigeración activa el rendimiento se degrada
5. **Almacenamiento** — casi nunca limita

### *"¿Por qué tener un SSD grande no significa poder ejecutar un modelo grande?"*

Porque para generar **cada token** hay que leer **todos los pesos**. Un modelo de 70B en Q4 son 42 GB por token. Un SSD NVMe en un Pi 5 da ~0,45 GB/s ⇒ **93 segundos por token**. El almacenamiento guarda; la memoria alimenta.

### *"¿Podemos distribuir capas de un LLM entre varios dispositivos?"*

Sí técnicamente, pero **no sirve**. La medición de referencia da 10–15 % de mejora con dos nodos. La red es 144× peor en ancho de banda y 2 500× peor en latencia que la memoria local. Y aunque funcionara, un 70B en 6 Pi daría ~1,2 t/s: inutilizable.

### *"¿Sirven los aceleradores externos para LLM?"*

**Sólo los que tienen memoria propia con buen ancho de banda.**
- Coral Edge TPU: no (8 MB de SRAM, INT8, diseñado para CNN pequeñas)
- Hailo-8/8L: excelente para visión, no para LLM
- **Hailo-10H (AI HAT+ 2): sí** — 40 TOPS INT4 y **8 GB LPDDR4X propios**
- Jetson Orin Nano Super: sí — por sus **102 GB/s**, no por sus 67 TOPS

### *"¿Tiene sentido entrenar en una Raspberry Pi?"*

**No, por órdenes de magnitud.** Entrenar un modelo de 7B desde cero en un Pi tardaría del orden de 53 000 años. LoRA y QLoRA se hacen en GPU; el adaptador resultante sí se puede ejecutar en el edge.

### *"¿Cuál es la mejor arquitectura para tener IA local potente con bajo consumo?"*

**Una jerarquía en la que el dispositivo caro está apagado el 95 % del tiempo:**

```
Sensor Hub (10-15 W, 24/7)  →  Servidor con GPU (150-400 W, bajo demanda)  →  Remoto
```

La pieza que hace viable esta arquitectura es el **sensor de presencia que despierta al servidor antes de que hables**.

---

## 2. La fórmula que resume todo el proyecto

```
                    ancho de banda de memoria efectivo
tokens/segundo ≈ ──────────────────────────────────────
                       tamaño del modelo en memoria
```

Y su corolario práctico:

```
Para conseguir X tokens/s con un modelo de N mil millones de parámetros en Q4:

    Ancho de banda necesario (GB/s) ≈ X × N × 0,6 / 0,6 = X × N × 1,0

    Ejemplo: 30 t/s con un modelo de 14B  ⇒  ~420 GB/s
```

**Un ingeniero con esta fórmula puede dimensionar cualquier sistema de IA local sin comprar nada primero.**

---

## 3. Tabla de decisión rápida

| Quiero... | Necesito... |
|---|---|
| Wake word, VAD, clasificación | Cualquier SBC. Un Pi Zero basta |
| Detección facial y embeddings a 15 fps | Pi 5 + Hailo-8 (AI HAT+) |
| Un LLM de 1–3B a velocidad conversacional | Pi 5 (16 GB si además hay contexto largo) |
| Un LLM de 7–8B usable | Jetson Orin Nano Super, o un mini-PC con buen ancho de banda |
| Un LLM de 7–14B a ≥ 30 t/s | PC con GPU: ≥ 250 GB/s y ≥ 12 GB de VRAM |
| Un LLM de 32B | GPU de 24 GB, o Apple Silicon con mucha memoria |
| Un LLM de 70B+ | Múltiples GPU, o servicio remoto |
| Modelos de 100B+ o "trillion parameter" | Servicio remoto. Sin alternativa doméstica razonable |

---

## 4. Recomendaciones

### Para el proyecto Nexus

| # | Recomendación |
|---|---|
| 1 | **Sensor Hub:** Raspberry Pi 5 + Hailo (AI HAT+ o AI HAT+ 2). Percepción, no cognición |
| 2 | **Servidor:** PC con GPU de ≥ 12 GB y ≥ 250 GB/s. Es el gasto principal y está justificado |
| 3 | **Modelo local:** empezar en 7–8B Q4_K_M; subir a 14B si el hardware lo permite |
| 4 | **KV cache en Q8** siempre |
| 5 | **Prompt caching** desde el primer día: es la optimización de mayor retorno |
| 6 | **El 30 % de peticiones que no necesitan LLM** deben resolverse con reglas, no con modelo |
| 7 | **Router con reglas duras de privacidad**: la biometría nunca sale del dispositivo |
| 8 | **Suspensión a RAM del servidor + despertar por presencia** |
| 9 | **No construir un clúster de Raspberry Pi** para inferencia de un solo modelo |
| 10 | **Medir siempre**, no confiar en los benchmarks de blogs |

### Qué comprar primero

| Prioridad | Material | Coste est. | Para qué |
|---|---|---|---|
| 1 | Raspberry Pi 5 16 GB + NVMe + refrigeración activa | ~200 € `[HIPÓTESIS]` | `EXP-301`, `EXP-302` — calibrar el modelo de rendimiento |
| 2 | Vatímetro de precisión | ~40 € `[HIPÓTESIS]` | Medir consumo en todos los experimentos |
| 3 | AI HAT+ 2 (Hailo-10H) | `SIN PRECIO FIABLE` | `EXP-304` — el hueco de información más importante |
| 4 | Segundo Pi 5 + switch | ~180 € `[HIPÓTESIS]` | `EXP-306` — cerrar la pregunta del clúster |
| 5 | Servidor con GPU | `SIN PRECIO FIABLE` | Sólo tras las etapas 1–4 |

---

## 5. Lo que esta investigación no ha podido resolver

| Hueco | Por qué importa | Cómo cerrarlo |
|---|---|---|
| **Ancho de banda de la memoria del Hailo-10H** | Determina qué modelos puede ejecutar el hub | Documentación de Hailo o `EXP-304` |
| **Rendimiento real del AI HAT+ 2 con 3B y 7B** | Las cifras públicas varían 6× entre sí | `EXP-304` |
| **El paper arXiv:2511.07425** (*An Evaluation of LLMs Inference on Popular Single-board Computers*) | Es probablemente la fuente académica más relevante que existe sobre esta pregunta exacta | **No accesible desde este entorno.** Leer y contrastar |
| Benchmarks primarios de `distributed-llama` sobre Pi 5 | Confirmaría o refutaría nuestra conclusión sobre clústeres | Discusiones del repositorio + `EXP-306` |
| Precios actualizados de aceleradores y GPU | Determina la relación coste/rendimiento | Cotización real |
| Especificaciones verificadas de plataformas Rockchip, Qualcomm y mini-PC | Podrían ser alternativas mejores de lo que asumimos | Datasheets de fabricante |

> **Estos huecos están documentados a propósito.** Un informe que finge no tener incógnitas es un informe en el que no se puede confiar.

---

## 6. La conclusión de una frase

> **La Raspberry Pi es una plataforma excelente de percepción y mediocre de cognición.** El error a evitar no es usar hardware pequeño: es pedirle a hardware pequeño que haga el trabajo del grande. La arquitectura correcta reconoce esa división y coloca cada modelo donde su tamaño lo permite — y el cálculo de dónde va cada cosa **cabe en una división**.
