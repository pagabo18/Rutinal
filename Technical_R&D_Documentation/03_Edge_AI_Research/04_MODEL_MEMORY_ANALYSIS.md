# PROJECT 03 · Model Memory Analysis — las matemáticas

> Documento de referencia con todas las fórmulas y ejemplos calculados. Si sólo se lee un documento de este proyecto, que sea este.

---

## 1. Memoria de los pesos

```
Memoria_pesos = N_parámetros × bytes_por_parámetro
```

| Formato | Bits/param | Bytes/param | Uso |
|---|---|---|---|
| FP32 | 32 | 4,0 | Entrenamiento, referencia |
| FP16 / BF16 | 16 | 2,0 | Inferencia sin cuantizar |
| FP8 | 8 | 1,0 | Hardware moderno |
| INT8 / Q8 | 8 | 1,0 | Cuantización conservadora |
| Q6_K | ~6,6 | ~0,82 | Cuantización de calidad alta |
| Q5_K_M | ~5,7 | ~0,71 | Buen equilibrio |
| **Q4_K_M** | **~4,8** | **~0,60** | **El estándar de facto** |
| Q4_0 | ~4,5 | ~0,56 | Más simple, algo peor |
| Q3_K_M | ~3,9 | ~0,49 | Degradación perceptible |
| Q2_K | ~3,0 | ~0,37 | Degradación fuerte |

> ⚠️ **Los formatos "K" de GGUF no usan exactamente N bits por parámetro.** Mezclan precisiones por tipo de tensor y añaden metadatos de escala por bloque. Por eso `Q4_K_M` ocupa ~4,8 bits/param y no 4,0. Los valores de la tabla son los efectivos observados. `[INFERENCIA]`

### Tabla de memoria de pesos

| Modelo | FP16 | Q8 | **Q4_K_M** | Q3_K_M | Q2_K |
|---|---|---|---|---|---|
| **1B** | 2,0 GB | 1,0 GB | **0,60 GB** | 0,49 GB | 0,37 GB |
| **3B** | 6,0 GB | 3,0 GB | **1,80 GB** | 1,47 GB | 1,11 GB |
| **7B** | 14,0 GB | 7,0 GB | **4,20 GB** | 3,43 GB | 2,59 GB |
| **8B** | 16,0 GB | 8,0 GB | **4,80 GB** | 3,92 GB | 2,96 GB |
| **13B** | 26,0 GB | 13,0 GB | **7,80 GB** | 6,37 GB | 4,81 GB |
| **14B** | 28,0 GB | 14,0 GB | **8,40 GB** | 6,86 GB | 5,18 GB |
| **30B** | 60,0 GB | 30,0 GB | **18,0 GB** | 14,7 GB | 11,1 GB |
| **32B** | 64,0 GB | 32,0 GB | **19,2 GB** | 15,7 GB | 11,8 GB |
| **70B** | 140 GB | 70,0 GB | **42,0 GB** | 34,3 GB | 25,9 GB |
| **100B** | 200 GB | 100 GB | **60,0 GB** | 49,0 GB | 37,0 GB |
| **405B** | 810 GB | 405 GB | **243 GB** | 198 GB | 150 GB |
| **1T** | 2 000 GB | 1 000 GB | **600 GB** | 490 GB | 370 GB |

---

## 2. Memoria del KV cache

```
Memoria_KV = 2 × n_capas × n_kv_heads × dim_head × bytes_elemento × n_tokens
```

El factor 2 es por las matrices K y V. En modelos con **Multi-Head Attention (MHA)**, `n_kv_heads = n_heads`. En modelos con **Grouped-Query Attention (GQA)**, `n_kv_heads` es mucho menor, lo que reduce drásticamente el KV cache. Casi todos los modelos modernos usan GQA.

### Ejemplo calculado: modelo tipo 8B con GQA

```
n_capas = 32, n_kv_heads = 8, dim_head = 128, FP16 (2 bytes)

Por token:  2 × 32 × 8 × 128 × 2 = 131 072 B = 128 KiB

   2 048 tokens →   256 MiB
   4 096 tokens →   512 MiB
   8 192 tokens →     1,0 GiB
  16 384 tokens →     2,0 GiB
  32 768 tokens →     4,0 GiB
 131 072 tokens →    16,0 GiB
```

### Ejemplo calculado: modelo tipo 7B con MHA (arquitectura más antigua)

```
n_capas = 32, n_kv_heads = 32, dim_head = 128, FP16

Por token:  2 × 32 × 32 × 128 × 2 = 524 288 B = 512 KiB   ← ¡4× más!

   4 096 tokens →   2,0 GiB
  32 768 tokens →  16,0 GiB
```

> 🔑 **La arquitectura del modelo importa tanto como su tamaño.** Dos modelos de 7B pueden tener KV caches que difieren en 4×. **Al elegir modelo para el edge, comprobar si usa GQA o MQA.**

### Cuantizar el KV cache

Muchos motores permiten almacenar el KV cache en Q8 o Q4:

| Precisión del KV | Factor | KV de 8 192 tokens (modelo 8B GQA) |
|---|---|---|
| FP16 | 1,0× | 1,00 GiB |
| Q8 | 0,5× | 0,50 GiB |
| Q4 | 0,25× | 0,25 GiB |

`[PROPUESTA DE DISEÑO]` Cuantizar el KV cache a Q8 es casi gratis en calidad y ahorra la mitad de la memoria de contexto. Recomendable siempre en el edge.

---

## 3. Overhead de inferencia

Además de pesos y KV cache hay que contar:

| Elemento | Tamaño típico | Nota |
|---|---|---|
| Activaciones intermedias | 100–500 MB `[INFERENCIA]` | Depende del tamaño de lote y del contexto |
| Buffers del motor de inferencia | 100–300 MB | |
| Tabla de tokens / vocabulario | 10–100 MB | |
| Sistema operativo y servicios | 500 MB – 1,5 GB | En un Pi con Linux mínimo |
| Fragmentación y margen | 10 % | |

```
Memoria_total ≈ (Memoria_pesos + Memoria_KV + Overhead) × 1,10 + Memoria_SO
```

---

## 4. Ejemplos completos

### Ejemplo A — Modelo de 8B Q4_K_M con 8 192 tokens en un Pi 5 de 16 GB

```
Pesos    (8B × 0,60 B/param)         =  4,80 GB
KV cache (8 192 tok × 128 KiB, FP16) =  1,00 GB
Overhead                             =  0,50 GB
Subtotal                             =  6,30 GB
Margen 10 %                          =  0,63 GB
Total del proceso                    =  6,93 GB
Sistema operativo                    =  1,00 GB
TOTAL                                =  7,93 GB

En un Pi 5 de 16 GB:  ✅ CABE con holgura
En un Pi 5 de 8 GB:   ⚠️ MUY JUSTO (probablemente falla)
Velocidad estimada:   10 GB/s ÷ 4,8 GB ≈ 2,1 t/s
```

### Ejemplo B — Modelo de 3B Q4_K_M con 4 096 tokens en un Pi 5 de 8 GB

```
Pesos    (3B × 0,60)                            =  1,80 GB
KV cache (4 096 tok, ~64 KiB/tok en modelo 3B)  =  0,26 GB
Overhead                                        =  0,40 GB
Margen 10 %                                     =  0,25 GB
Total del proceso                               =  2,71 GB
Sistema operativo                               =  1,00 GB
TOTAL                                           =  3,71 GB

En un Pi 5 de 8 GB:  ✅ CABE con mucho margen
Velocidad estimada:  10 GB/s ÷ 1,8 GB ≈ 5,6 t/s
Medido públicamente: 4-8,8 t/s  ✅ CONCUERDA
```

### Ejemplo C — Modelo de 70B Q4_K_M: ¿qué haría falta?

```
Pesos    (70B × 0,60)                =  42,0 GB
KV cache (8 192 tok, ~160 KiB/tok)   =   1,3 GB
Overhead                             =   1,0 GB
Margen                               =   4,4 GB
TOTAL                                ≈  48,7 GB

Raspberry Pi 5 de 16 GB:  ❌ NO CABE (haría falta 3× más memoria)
Velocidad si cupiera:     10 GB/s ÷ 42 GB ≈ 0,24 t/s
                          = 1 token cada 4,2 segundos
                          = una respuesta de 100 tokens en 7 minutos

Conclusión: aunque se resolviera la capacidad (p. ej. con un clúster),
            la velocidad sería inutilizable.
```

### Ejemplo D — Modelo de 1T de parámetros

```
Pesos Q4  (1×10¹² × 0,60)  =  600 GB

Para que cupiera en Raspberry Pi de 16 GB harían falta:  38 nodos
Ancho de banda agregado si funcionara perfectamente:      38 × 10 = 380 GB/s
Velocidad ideal (imposible, ignora la red):               380 ÷ 600 = 0,63 t/s
Velocidad real con Gigabit Ethernet:                      órdenes de magnitud peor

Conclusión: CURRENTLY IMPRACTICAL, y no por poco.
```

---

## 5. Modelo de rendimiento (roofline simplificado)

```
                       BW_efectivo
    t/s_decode  ≈  ─────────────────────
                    Memoria_pesos

    BW_efectivo ≈ BW_teórico × η,    con η ≈ 0,5 - 0,7  [INFERENCIA]
```

### Calibración con datos reales

| Dispositivo | BW teórico | Modelo | Memoria | t/s medido | **η implícito** |
|---|---|---|---|---|---|
| Pi 5 | 17 GB/s | 1B Q4 (0,60 GB) | 0,60 GB | 17,2 | **0,61** |
| Pi 5 | 17 GB/s | 3B Q4 (1,80 GB) | 1,80 GB | 8,8 | **0,93** ⚠️ |
| Pi 5 | 17 GB/s | 8B Q4 (4,80 GB) | 4,80 GB | 2,5 | **0,71** |
| Jetson Orin Nano Super | 102 GB/s | 7B Q4 (4,20 GB) | 4,20 GB | 14,2 | **0,58** |

`[INFERENCIA]` El η implícito se sitúa en **0,58–0,93**, con un valor central de ~0,7. El caso del 3B a 8,8 t/s da un η superior a lo esperado, lo que sugiere que (a) el modelo real es algo menor de 1,80 GB, (b) la medición usaba overclock o condiciones favorables, o (c) hay efectos de caché. **Los datos de benchmarks públicos tienen dispersión y no siempre documentan las condiciones.** → `EXP-301` para medir con nuestro método.

### Uso práctico del modelo

`[PROPUESTA DE DISEÑO]` **Para planificar, usar η = 0,6 (conservador):**

```
    t/s ≈ (BW_teórico × 0,6) ÷ Memoria_pesos_GB
```

| Dispositivo | BW | 1B Q4 | 3B Q4 | 8B Q4 | 14B Q4 | 32B Q4 | 70B Q4 |
|---|---|---|---|---|---|---|---|
| Pi 4 | 12,8 GB/s | 12,8 | 4,3 | 1,6 | 0,9 | ❌ | ❌ |
| **Pi 5** | 17 GB/s | **17,0** | **5,7** | **2,1** | **1,2** | ❌ | ❌ |
| Jetson Orin Nano Super | 102 GB/s | 102 | 34 | 12,8 | 7,3 | 3,2 | ❌ |
| PC con GPU 500 GB/s | 500 GB/s | — | — | 62,5 | 35,7 | 15,6 | 7,1 |
| PC con GPU 1 TB/s | 1 000 GB/s | — | — | 125 | 71 | 31 | 14,3 |

❌ = no cabe en la memoria del dispositivo.

> Esta tabla permite **elegir hardware antes de comprarlo**. Ejemplo: si Nexus necesita ≥ 20 t/s con un modelo de 14B, hace falta un dispositivo con al menos `20 × 8,4 / 0,6 = 280 GB/s` de ancho de banda y ≥ 12 GB de memoria disponible.

---

## 6. Umbrales de usabilidad

| tokens/s | Sensación | Uso apropiado |
|---|---|---|
| < 1 | Inutilizable interactivamente | Procesamiento por lotes nocturno |
| 1–3 | Muy lento; se ve escribir letra a letra | Tareas de fondo |
| 3–7 | Lento pero soportable | Respuestas cortas |
| **7–15** | **Cómodo**: aproximadamente la velocidad de lectura humana | **Conversación** |
| 15–40 | Fluido | Conversación cómoda, respuestas largas |
| > 40 | Más rápido de lo que se lee | Agentes, generación de código, cadenas de razonamiento |

`[INFERENCIA]` La velocidad de lectura humana es de ~200–300 palabras/minuto ≈ **5–8 tokens/s en inglés**, menos en español por la tokenización. Por eso el umbral de "cómodo" está sobre 7–15 t/s.

**Para agentes que generan mucho texto intermedio (razonamiento, llamadas a herramientas), hacen falta ≥ 30 t/s**, porque el usuario no lee ese texto: espera a que termine.

---

## 7. Hoja de cálculo mental para el ingeniero

Cuatro pasos para dimensionar cualquier sistema de IA local:

```
1. ¿Qué calidad necesito?          → elige tamaño de modelo (1B / 3B / 8B / 14B / 32B / 70B)
2. Memoria de pesos                = N_params × 0,60 (para Q4_K_M)
3. Memoria total                   = pesos + KV_cache + 1,5 GB de overhead y SO
4. Velocidad                       = (BW_teórico × 0,6) ÷ memoria_de_pesos

Comprobación:  ¿memoria_total < RAM_del_dispositivo × 0,85?
               ¿velocidad > umbral de usabilidad de mi caso?
```

Si alguna de las dos comprobaciones falla, hay tres palancas: **modelo más pequeño**, **cuantización más agresiva**, o **hardware con más ancho de banda**. No hay una cuarta.
