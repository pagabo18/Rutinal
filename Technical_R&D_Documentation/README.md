# Technical R&D Documentation

Documentación técnica e investigación de ingeniería para tres proyectos conectados:

| Proyecto | Nombre | Qué es |
|---|---|---|
| **PROJECT 01** | CarPlay Bridge | Dispositivo embebido que permite usar la pantalla del automóvil como interfaz de un teléfono Android |
| **PROJECT 02** | Nexus | Asistente/compañero digital con percepción (voz + visión), memoria, agentes y avatar MetaHuman |
| **PROJECT 03** | Edge AI Research | Hasta dónde llegan los modelos de IA en hardware tipo Raspberry Pi, y cuál es la arquitectura correcta de IA local |
| **PROJECT 00** | Master Technology Roadmap | Cómo evoluciona todo el ecosistema por fases |

**Audiencia principal:** ingeniero en electrónica que no conoce los proyectos.
**Objetivo:** que pueda empezar a investigar, seleccionar componentes, diseñar y prototipar.

---

## Estructura

```
/Technical_R&D_Documentation
    README.md                          <- este archivo
    00_MASTER_TECHNOLOGY_ROADMAP.md
    ENGINEER_HANDOFF.md                <- EMPEZAR AQUÍ si eres el ingeniero electrónico

    /01_CarPlay_Bridge
        01_EXECUTIVE_SUMMARY.md
        02_TECHNICAL_RESEARCH.md
        03_SYSTEM_ARCHITECTURE.md
        04_HARDWARE_ARCHITECTURE.md
        05_SOFTWARE_ARCHITECTURE.md
        06_PROTOCOL_RESEARCH.md
        07_PROTOTYPE_PLAN.md
        08_BOM.md
        09_RISKS_AND_OPEN_QUESTIONS.md

    /02_Nexus
        01_EXECUTIVE_SUMMARY.md
        02_SYSTEM_VISION.md
        03_AI_ARCHITECTURE.md
        04_VISION_SYSTEM.md
        05_AUDIO_SYSTEM.md
        06_METAHUMAN_ARCHITECTURE.md
        07_SENSOR_HARDWARE.md
        08_TRANSPARENT_DISPLAY_RESEARCH.md
        09_SYSTEM_ARCHITECTURE.md
        10_PROTOTYPE_ROADMAP.md
        11_BOM.md
        12_RISKS_AND_OPEN_QUESTIONS.md

    /03_Edge_AI_Research
        01_EXECUTIVE_SUMMARY.md
        02_LLM_FUNDAMENTALS.md
        03_RASPBERRY_PI_LIMITS.md
        04_MODEL_MEMORY_ANALYSIS.md
        05_QUANTIZATION.md
        06_DISTRIBUTED_INFERENCE.md
        07_AI_ACCELERATORS.md
        08_HARDWARE_COMPARISON.md
        09_BENCHMARKS.md
        10_NEXUS_EDGE_AI_ARCHITECTURE.md
        11_EXPERIMENTS.md
        12_CONCLUSIONS.md
```

---

## Convención de etiquetas de evidencia

Toda afirmación técnica en estos documentos está etiquetada. **Esto es obligatorio de respetar al editar.**

| Etiqueta | Significado |
|---|---|
| `[CONFIRMADO]` | Verificado en documentación oficial, repositorio oficial, datasheet, estándar o paper. Lleva fuente. |
| `[INFERENCIA]` | Deducción razonada a partir de fuentes confirmadas. No verificada directamente. |
| `[HIPÓTESIS]` | Suposición plausible que **debe** validarse con un experimento. Suele tener un `EXP-xxx` asociado. |
| `[PROPUESTA DE DISEÑO]` | Decisión de ingeniería nuestra. No es un hecho externo; es una elección discutible. |
| `[NO RELIABLE BENCHMARK FOUND]` | Buscamos y no hay dato fiable. No se inventa un número. |

## Convención de madurez tecnológica

| Nivel | Significado |
|---|---|
| `READY NOW` | Se puede comprar/usar hoy y funciona |
| `PROVEN BUT REQUIRES INTEGRATION` | Existe y funciona, pero hay que integrarlo con trabajo real |
| `EXPERIMENTAL` | Existe, funciona a veces, sin garantías |
| `RESEARCH REQUIRED` | No sabemos todavía si funciona; hace falta experimentar |
| `CURRENTLY IMPRACTICAL` | Técnica, legal o económicamente inviable hoy |

## Convención de madurez de producto

Nunca se confunden estas cuatro cosas en la documentación:

1. **PROOF OF CONCEPT (PoC)** — demuestra que una idea es posible. Cables sueltos, protoboard, sin caja.
2. **PROTOTYPE** — hace la función completa en condiciones controladas.
3. **ENGINEERING PROTOTYPE** — PCB propia, caja, cumple requisitos ambientales/eléctricos, medible.
4. **PRODUCTION DESIGN** — fabricable, certificable, con coste objetivo y cadena de suministro.

> Una Raspberry Pi es excelente en (1) y (2), aceptable en (3) vía Compute Module, y **normalmente inadecuada** en (4) para producto automotriz.

---

## Resumen de las tres conclusiones más importantes

1. **CarPlay Bridge:** hacer que un Pi "aparente ser un iPhone" ante el coche **no es una ruta viable ni legal** — Apple sólo licencia CarPlay del lado del *receptor* (head unit), no del lado del *transmisor*, y la sesión exige un coprocesador de autenticación MFi. La ruta realmente construible es la equivalente en **Android Auto**, donde el protocolo de accesorio USB (AOAP) es público y existe una implementación open source funcionando sobre Raspberry Pi. Ver `01_CarPlay_Bridge/02_TECHNICAL_RESEARCH.md`.

2. **Edge AI:** el límite en una Raspberry Pi no es el almacenamiento ni "los TOPS": es el **ancho de banda de memoria** (~17 GB/s teóricos en Pi 5). Eso fija un techo duro de tokens/segundo por tamaño de modelo, calculable con una división. Ver `03_Edge_AI_Research/04_MODEL_MEMORY_ANALYSIS.md`.

3. **Nexus:** la arquitectura correcta **no** es "un cerebro grande en el edge", sino una jerarquía *edge → home AI server → cloud*, con los lazos sensibles a latencia (VAD, wake word, tracking facial, lipsync) **siempre locales** y el razonamiento pesado remoto. Ver `03_Edge_AI_Research/10_NEXUS_EDGE_AI_ARCHITECTURE.md`.

---

## Cómo leer esto según tu rol

| Rol | Ruta de lectura |
|---|---|
| **Ingeniero electrónico** | `ENGINEER_HANDOFF.md` → `01/04_HARDWARE_ARCHITECTURE.md` → `02/07_SENSOR_HARDWARE.md` → `01/08_BOM.md` |
| **Ingeniero de software / firmware** | `01/05_SOFTWARE_ARCHITECTURE.md` → `01/06_PROTOCOL_RESEARCH.md` → `02/03_AI_ARCHITECTURE.md` |
| **Decisión de producto / roadmap** | `00_MASTER_TECHNOLOGY_ROADMAP.md` → los `01_EXECUTIVE_SUMMARY.md` de cada proyecto |
| **Quien vaya a comprar material** | `01/08_BOM.md`, `02/11_BOM.md`, y la sección de laboratorio en `ENGINEER_HANDOFF.md` |

---

## Nota sobre precios y fechas

Los precios citados llevan **fecha y fuente**. Los precios de componentes electrónicos cambian; cualquier BOM debe re-cotizarse antes de comprar. Donde no encontramos precio fiable, la celda dice `SIN PRECIO FIABLE`.

Fecha de elaboración de esta documentación: **agosto 2026**.
