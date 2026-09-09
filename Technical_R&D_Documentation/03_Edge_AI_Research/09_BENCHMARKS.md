# PROJECT 03 · Benchmarks

> **Regla de este documento: no se inventa ningún número.** Donde no hay dato fiable, la celda dice `NO RELIABLE BENCHMARK FOUND`. Donde el dato viene de una fuente secundaria sin metodología documentada, se marca con ⚠️.

---

## 1. Advertencia metodológica

Los benchmarks públicos de LLM en SBC tienen problemas serios de comparabilidad:

| Problema | Efecto |
|---|---|
| No se documenta la cuantización exacta (`Q4_0` vs `Q4_K_M` difieren un 7 % en tamaño) | Cifras no comparables |
| No se documenta la longitud del prompt ni del contexto | El prefill puede dominar o no |
| No se distingue **prefill** de **decode** | Se publican cifras 20× distintas como si fueran lo mismo |
| No se documenta la refrigeración | El throttling cambia el resultado tras minutos |
| No se documenta si hay overclock | |
| No se documenta la versión del motor de inferencia | `llama.cpp` mejora mes a mes |
| Se mide un solo run, no una distribución | Sin p95 ni desviación |
| Muchas fuentes son blogs con contenido optimizado para buscadores | Números repetidos sin origen verificable |

`[PROPUESTA DE DISEÑO]` **Definir una metodología propia** (§5) y medir nosotros. Los datos de terceros sirven para acotar el orden de magnitud, no para planificar con precisión.

---

## 2. Raspberry Pi 5

| Modelo | Params | Cuantización | RAM del modelo | Dispositivo | **Decode (t/s)** | Prefill (t/s) | Consumo | Temp. | Fiabilidad |
|---|---|---|---|---|---|---|---|---|---|
| TinyLlama | 1,1B | Q4_K_M | ~0,7 GB | Pi 5 8 GB, NVMe, refrig. activa | **18,4** | `NO RELIABLE BENCHMARK FOUND` | `NRBF` | `NRBF` | ⚠️ Media |
| Llama 3.2 | 1B | Q4_K_M | ~0,8 GB | Pi 5 8 GB, NVMe, refrig. activa | **17,2** | `NRBF` | `NRBF` | `NRBF` | ⚠️ Media |
| Llama 3.2 | 3B | Q4_K_M | ~1,9 GB | Pi 5 8 GB, NVMe, refrig. activa | **8,8** | `NRBF` | `NRBF` | `NRBF` | ⚠️ Media |
| Llama 3.2 | 3B | Q4_K_M | ~1,9 GB | Pi 5, con OpenBLAS | **4–6** | `NRBF` | `NRBF` | `NRBF` | ⚠️ Media |
| Qwen 2.5 | 7B | Q4 | ~4,2 GB | Pi 5 **16 GB** | **2–3** | `NRBF` | `NRBF` | `NRBF` | ⚠️ Media |
| Llama 3.1 | 8B | Q4 | ~4,8 GB | Pi 5 **16 GB** | **2–3** | `NRBF` | `NRBF` | `NRBF` | ⚠️ Media |
| Cualquiera | ≥13B | — | — | Pi 5 | `NO RELIABLE BENCHMARK FOUND` | — | — | — | — |

**Fuentes:** benchmarks agregados publicados en 2025–2026 (TinyWeights, Local AI Master, Stratosphere Labs, foros oficiales de Raspberry Pi). Las cifras aparecen de forma consistente entre fuentes, lo que da confianza en el **orden de magnitud** aunque no en la precisión.

**Condiciones reportadas que sí están documentadas:**
- `[CONFIRMADO]` Se usa **refrigeración activa** y **arranque desde NVMe** para los mejores resultados.
- `[CONFIRMADO]` Se ha investigado el efecto del **overclock** sobre Ollama en los foros oficiales.

---

## 3. NVIDIA Jetson Orin Nano Super 8 GB

| Modelo | Params | Cuantización | Dispositivo | **Decode (t/s)** | **Prefill (t/s)** | Consumo | Fiabilidad |
|---|---|---|---|---|---|---|---|
| Llama 3.2 | 7B | Q4_K_M | Orin Nano Super 8 GB | **14,2** | **285** | `NRBF` | ✅ Alta (benchmark documentado) |
| Modelos ≤ 4B | — | — | Orin Nano Super @ 25 W | 47–48 % más t/s que @15 W | — | 25 W | ✅ `[CONFIRMADO]` NVIDIA |
| Bonsai | 8B | — | Orin Nano Super | 15 W y 25 W dan tok/J casi idénticos | — | 15/25 W | ✅ |
| Varios pequeños | — | — | Orin Nano Super | Reportado "158 TPS a 8 W" en un caso | — | 8 W | ⚠️ Baja (no se especifica el modelo) |

`[CONFIRMADO]` Especificaciones oficiales: 67 TOPS, 102 GB/s de ancho de banda, consumo configurable 7/15/25 W.

---

## 4. Raspberry Pi AI HAT+ 2 (Hailo-10H)

| Modelo | Params | Cuantización | **Decode (t/s)** | Fiabilidad | Nota |
|---|---|---|---|---|---|
| Qwen 2.5 | 1,5B | INT4 | **~20–35** | ⚠️ Baja | Rango muy amplio |
| Qwen 2 | 1,5B | INT4 | **~9** | ⚠️ Baja | Medición independiente |
| Genérico 1.5B | 1,5B | INT4 | **6–8** | ⚠️ Baja | Tercera medición |
| Comparación: CPU del Pi 5 sola | — | — | ~11 (con los 4 núcleos al 100 %) | ⚠️ Media | |
| Modelos de 3B, 7B | — | — | `NO RELIABLE BENCHMARK FOUND` | — | **Es el dato que más falta** |
| Ancho de banda de la LPDDR4X del HAT | — | — | `NO RELIABLE BENCHMARK FOUND` | — | **Dato crítico ausente** |

> ⚠️ **Las cifras publicadas para el mismo tamaño de modelo varían entre 6 y 35 t/s (factor 6×).** Eso indica que las condiciones de medición son muy distintas o que el software está madurando rápido. **No planificar con estos números.** → `EXP-304`.

**Especificaciones confirmadas:** 40 TOPS INT4, 8 GB LPDDR4X a bordo, interfaz DDR directa, lanzado el 15 de enero de 2026.

---

## 5. Metodología propia propuesta

`[PROPUESTA DE DISEÑO]` Para que nuestras mediciones sean comparables y reutilizables:

### Datos a registrar en cada medición

| Campo | Ejemplo |
|---|---|
| Dispositivo y variante exacta | "Raspberry Pi 5, 16 GB, rev 1.1" |
| Refrigeración | "Ventilador activo oficial" |
| Alimentación | "Fuente oficial 27 W" |
| Almacenamiento y arranque | "NVMe 256 GB vía HAT, PCIe Gen 3 forzado" |
| Temperatura ambiente | "23 °C" |
| SO y kernel | |
| Motor y versión | "llama.cpp b#### compilado con `-march=native`" |
| Flags de compilación | |
| Modelo: nombre, tamaño de fichero, cuantización exacta | "Llama-3.2-3B-Instruct-Q4_K_M.gguf, 1,93 GB" |
| Longitud del prompt (tokens) | "512" |
| Longitud de la generación (tokens) | "128" |
| Tamaño de contexto configurado | "4096" |
| Precisión del KV cache | "FP16" |
| Número de hilos | "4" |
| **Prefill (t/s)** | separado del decode |
| **Decode (t/s)** | media de 5 ejecuciones |
| Desviación entre ejecuciones | |
| Consumo medio (W) | medido con vatímetro |
| Temperatura máxima del SoC | |
| ¿Hubo throttling? | |
| RAM máxima usada | |

### Protocolo

1. **Calentamiento:** una ejecución descartada.
2. **5 ejecuciones** con el mismo prompt.
3. **Ejecución larga:** 10 minutos continuos, para detectar throttling.
4. Registrar todo en un fichero CSV versionado en el repositorio.

> Un CSV con estos campos, mantenido a lo largo del proyecto, se convierte en el activo más valioso de esta investigación. **Vale más que cualquier tabla copiada de un blog.**

---

## 6. Predicciones a verificar

Estas son las predicciones de nuestro modelo (`04_MODEL_MEMORY_ANALYSIS.md`) que los experimentos deben confirmar o refutar:

| # | Predicción | Experimento | Refutación |
|---|---|---|---|
| P1 | El ancho de banda efectivo del Pi 5 estará entre 8 y 12 GB/s | `EXP-301` | Si sale > 14 GB/s o < 6 GB/s, el modelo está mal calibrado |
| P2 | Un modelo de 3B Q4_K_M dará 5–9 t/s en decode | `EXP-302` | Fuera de ese rango |
| P3 | Un modelo de 8B Q4_K_M dará 1,8–3 t/s | `EXP-302` | |
| P4 | El prefill será ≥ 5× más rápido que el decode | `EXP-302` | |
| P5 | Sin refrigeración activa, el rendimiento caerá ≥ 20 % tras 10 min | `EXP-302` | |
| P6 | Duplicar la cuantización (Q8→Q4) casi duplicará la velocidad | `EXP-305` | |
| P7 | Dos Pi con RPC darán < 30 % de mejora sobre uno | `EXP-306` | Si dan > 80 %, revisar nuestra conclusión sobre clústeres |
| P8 | El AI HAT+ 2 dará al menos 3× la velocidad de la CPU del Pi 5 con el mismo modelo | `EXP-304` | |

> **Si P7 se refuta** (es decir, si un clúster sí acelera sustancialmente), habría que revisar `06_DISTRIBUTED_INFERENCE.md`. Documentamos la condición de refutación explícitamente porque es la forma honesta de hacer esto.

---

## 7. Huecos de información identificados

| Hueco | Importancia | Cómo cerrarlo |
|---|---|---|
| Ancho de banda de la memoria del Hailo-10H | **Alta** | Documentación de Hailo, o inferirlo de `EXP-304` |
| Rendimiento del AI HAT+ 2 con modelos de 3B y 7B | **Alta** | `EXP-304` |
| Benchmarks de `distributed-llama` sobre Pi 5 en fuente primaria | Media | Discusiones del repositorio + `EXP-306` |
| Consumo y temperatura en los benchmarks públicos de Pi 5 | Media | Nuestra propia medición |
| Rendimiento del prefill en Pi 5 | Media | `EXP-302` |
| Comparativa directa Pi 5 + Hailo-10H vs Jetson Orin Nano Super | **Alta** | `EXP-304` + adquirir ambos |
| Datos del paper arXiv:2511.07425 (*An Evaluation of LLMs Inference on Popular Single-board Computers*) | **Alta** | No accesible desde este entorno. **Leer y contrastar** — es probablemente la fuente académica más relevante que existe sobre esta pregunta |

---

## 8. Fuentes consultadas

| Fuente | Tipo | Fiabilidad |
|---|---|---|
| [Phoronix — Raspberry Pi 5 benchmarks](https://www.phoronix.com/review/raspberry-pi-5-benchmarks) | Medición independiente sistemática | ✅ Alta |
| [Foros oficiales de Raspberry Pi](https://forums.raspberrypi.com/) | Discusión técnica con ingenieros de Raspberry Pi | ✅ Alta |
| [NVIDIA Developer Blog — Orin Nano Super](https://developer.nvidia.com/blog/nvidia-jetson-orin-nano-developer-kit-gets-a-super-boost/) | Fabricante | ✅ Alta (con sesgo comercial) |
| [Hailo](https://hailo.ai/) / [Raspberry Pi news](https://www.raspberrypi.com/news/) | Fabricante | ✅ Alta (con sesgo comercial) |
| [llama.cpp repo](https://github.com/ggml-org/llama.cpp) | Documentación oficial del motor | ✅ Alta |
| arXiv:2511.07425 | Paper académico | ✅ Alta — **pendiente de leer** |
| Stratosphere Labs, TinyWeights, Local AI Master, smolhub | Blogs técnicos con mediciones | ⚠️ Media |
| Otros blogs y sitios optimizados para buscadores | Contenido agregado | ⚠️ Baja — no usados como fundamento |
