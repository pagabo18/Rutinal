# PROJECT 00 — MASTER TECHNOLOGY ROADMAP

> **No hay fechas cerradas en este documento.** Se usan **fases tecnológicas** con puertas de salida medibles. Una fase termina cuando se cumple su criterio, no cuando pasa el tiempo.

---

## 1. Cómo se conectan los tres proyectos

A primera vista son tres cosas distintas. En realidad comparten el 70 % de la ingeniería.

```mermaid
flowchart TB
    subgraph SHARED["Base tecnológica compartida"]
        S1["Linux embebido\nbuildroot, systemd, rootfs r/o, A/B"]
        S2["SBC: Raspberry Pi / Compute Module\ncarrier boards propias"]
        S3["Electrónica de potencia\nconversión, protección, supervisión"]
        S4["Térmica sin ventiladores"]
        S5["Conectividad\nUSB gadget, Wi-Fi, BT, Ethernet/PoE"]
        S6["Metodología\nexperimentos, medición, etiquetado de evidencia"]
    end

    P1["PROJECT 01\nCarPlay Bridge"]
    P2["PROJECT 02\nNexus"]
    P3["PROJECT 03\nEdge AI"]

    SHARED --> P1
    SHARED --> P2
    P3 -->|"define qué modelos\ny qué hardware"| P2
    P2 -.->|"Nexus en el vehículo\n(fase lejana)"| P1
    P1 -.->|"aprendizaje de\nembedded automotriz"| P2
```

| Elemento compartido | CarPlay Bridge | Nexus | Edge AI |
|---|---|---|---|
| Linux embebido con arranque rápido y rootfs inmutable | ✅ Crítico | ✅ Sensor Hub | ⚠️ |
| Compute Module + carrier board propia | ✅ v1.0 | ✅ NEXUS 4 | — |
| Conversión y protección de potencia | ✅ 12 V automotriz | ✅ PoE / 12 V | — |
| Disipación sin ventilador | ✅ | ✅ Requisito duro | ⚠️ Conflicto (los LLM quieren ventilador) |
| MCU supervisor | ✅ Ignición y apagado | ✅ Privacidad, IR, presencia | — |
| Aceleradores de IA | ⚠️ Futuro | ✅ Visión | ✅ Objeto de estudio |
| Metodología de medición | ✅ | ✅ | ✅ El proyecto **es** metodología |

> **Este solapamiento es la razón para hacer los tres proyectos en paralelo y no en serie.** El ingeniero que diseñe la etapa de potencia del CarPlay Bridge estará al 60 % del camino de la del Sensor Hub.

---

## 2. Fases del ecosistema

```mermaid
flowchart TB
    F0["FASE 0 — VALIDACIÓN\nExperimentos baratos que responden preguntas binarias\nCoste: < 700 €\nSin diseñar electrónica"]
    F1["FASE 1 — PROTOTIPOS FUNCIONALES\nHardware comprado, software propio\nCada proyecto hace algo útil"]
    F2["FASE 2 — ELECTRÓNICA PROPIA\nPCBs, cajas, integración\nAquí entra de lleno el ingeniero electrónico"]
    F3["FASE 3 — INTEGRACIÓN DEL ECOSISTEMA\nLos proyectos se conectan entre sí"]
    F4["FASE 4 — PRESENCIA FÍSICA\nInstalación de Nexus, cuerpo completo\nLa fase cara"]
    F5["FASE 5 — PRODUCTO\nSólo si hay justificación comercial"]

    F0 --> F1 --> F2 --> F3 --> F4 --> F5
```

### FASE 0 — Validación

**Objetivo:** responder las preguntas que determinan si cada proyecto tiene sentido, gastando lo mínimo.

| Proyecto | Experimentos | Coste | Puerta de salida |
|---|---|---|---|
| CarPlay Bridge | `EXP-101` (¿funciona en nuestro coche?), `EXP-107` (¿alimenta el USB?) | ~105 € | El coche muestra Android Auto desde nuestro dispositivo |
| Nexus | `EXP-201` (latencia), `EXP-210` (Pepper's Ghost) | ~200 € | Conversación < 1 s p95, y decisión sobre display |
| Edge AI | `EXP-301`, `EXP-302` (modelo de rendimiento calibrado) | ~240 € | La fórmula predice el rendimiento dentro del ±30 % |
| **Total** | | **~545 €** | |

> **La Fase 0 completa cuesta menos que un día de ingeniería y elimina la mayor parte de la incertidumbre de los tres proyectos.** Es donde hay que empezar, sin excepción.

### FASE 1 — Prototipos funcionales

**Objetivo:** que cada proyecto haga algo real, con hardware comprado.

| Proyecto | Entregable | Puerta de salida |
|---|---|---|
| CarPlay Bridge | v0.2–v0.3: dispositivo instalado en el coche con etapa de potencia real | Uso diario durante 30 días sin fallos |
| Nexus | NEXUS 1–3: voz + visión + avatar, con periféricos USB | `EXP-212`: uso espontáneo creciente a los 30 días |
| Edge AI | Servidor doméstico funcionando con el modelo elegido | ≥ 30 t/s con el modelo de producción |

### FASE 2 — Electrónica propia

**Objetivo:** convertir prototipos en dispositivos.

| Proyecto | Entregable | Puerta de salida |
|---|---|---|
| CarPlay Bridge | v1.0: CM4 + carrier board propia, caja de aluminio, pre-compliance EMC | Sobrevive a ISO 7637-2 en banco; < 1 mA en reposo |
| Nexus | NEXUS 4: Sensor Hub propio con privacidad por hardware, IR seguro, radar, PoE | 30 días sin intervención; cadena de privacidad verificable |
| Edge AI | Acelerador integrado en el hub | Visión acelerada con margen térmico |

### FASE 3 — Integración del ecosistema

**Objetivo:** que los proyectos dejen de ser independientes.

| Integración | Descripción |
|---|---|
| Nexus en el escritorio y en la sala con memoria compartida | Un solo Nexus, varios terminales |
| El CarPlay Bridge aloja un terminal de Nexus | Nexus por voz en el coche, usando el hardware que ya está instalado |
| El router de modelos coordina edge, servidor y remoto con políticas | |
| Telemetría y diagnóstico unificados | |

### FASE 4 — Presencia física

**Objetivo:** Nexus como entidad presente.

| Hito | Contenido |
|---|---|
| NEXUS 5 | Instalación de display, óptica, estructura, iluminación de la sala |
| NEXUS 6 | Cuerpo completo, gestos, seguimiento de personas |

> ⚠️ **Esta es la fase con el salto de coste más grande (1 500–65 000 USD sólo en display).** No entrar sin haber pasado `EXP-210` y `EXP-212`.

### FASE 5 — Producto

Sólo si aparece una razón comercial. Requiere certificaciones, cadena de suministro, diseño para fabricación y, en el caso de CarPlay/Android Auto, acuerdos con los propietarios de las plataformas.

---

## 3. Roadmap del CarPlay Bridge

```mermaid
flowchart LR
    A["v0.1 · PoC\nPi 4 + imagen de referencia\n¿Funciona?"] --> B["v0.2 · PoC eléctrico\n+ potencia 12 V\n+ ignición"]
    B --> C["v0.3 · Prototipo\n+ MCU supervisor\n+ caja\n+ arranque rápido"]
    C --> D["v1.0 · Engineering prototype\nCM4 + carrier propia\nEMC pre-compliance"]
    D --> E["v2.0 · Prototipo automotriz\nAEC-Q, validación ambiental"]
    E --> F["Producto\nsólo con justificación comercial"]
```

| Versión | Puerta de salida |
|---|---|
| v0.1 | Android Auto en la pantalla del coche desde nuestro dispositivo |
| v0.2 | Arranca y se apaga con el contacto, 500 ciclos sin corrupción |
| v0.3 | Uso diario 30 días; latencia añadida < 50 ms p95 |
| v1.0 | < 1 mA en reposo; sobrevive a transitorios; sin throttling en verano |
| v2.0 | Validación ambiental completa |

**Lo que NO está en este roadmap:** cualquier ruta que implique emular CarPlay. Cerrado por `01_CarPlay_Bridge/02_TECHNICAL_RESEARCH.md` §2.

---

## 4. Roadmap de Nexus

```mermaid
flowchart LR
    N0["NEXUS 0\nNúcleo de software"] --> N1["NEXUS 1\nVoz"] --> N2["NEXUS 2\nVisión"] --> N3["NEXUS 3\nAvatar"] --> N4["NEXUS 4\nSensor Hub propio"] --> N5["NEXUS 5\nPresencia física"] --> N6["NEXUS 6\nCuerpo completo"]
```

| Fase | Puerta de salida | ¿Electrónica? |
|---|---|---|
| NEXUS 0 | Memoria + herramientas fiables por texto | ❌ |
| NEXUS 1 | **Latencia < 1 000 ms p95 + barge-in** | ⚠️ Selección de componentes |
| NEXUS 2 | FAR < 0,1 % / FRR < 5 % en nuestra sala | ⚠️ Cámaras, IR |
| NEXUS 3 | Mirada dirigida < 200 ms, 60 fps estables | ❌ |
| NEXUS 4 | Hub 30 días sin intervención; privacidad verificable | ✅✅ |
| NEXUS 5 | Efecto de presencia validado con personas ajenas | ✅✅ |
| NEXUS 6 | Gestos coherentes con el habla | ✅ |

**Modificación respecto a la propuesta original del brief:** se añade **NEXUS 0** (núcleo de software antes de la voz). El brief empezaba en "asistente de software", pero conviene separar explícitamente la infraestructura cognitiva (memoria, router, agentes) de la interfaz de voz, porque son independientes y la primera es la base de todo lo demás.

---

## 5. Roadmap de Edge AI

```mermaid
flowchart LR
    E1["Experimento con Pi\nCalibrar el modelo\nde rendimiento"] --> E2["Inferencia optimizada\nCuantización, caching,\nselección de modelo"]
    E2 --> E3["Acelerador\nAI HAT+ 2 / Jetson\nVisión + modelos pequeños"]
    E3 --> E4["Nodo de cómputo doméstico\nGPU ≥12 GB, ≥250 GB/s"]
    E4 --> E5["Arquitectura distribuida\nHub + servidor + render + remoto\ncon gestión de energía"]
```

| Etapa | Puerta de salida |
|---|---|
| 1 | El modelo `t/s ≈ BW/tamaño` predice dentro del ±30 % |
| 2 | Se conoce la cuantización óptima con evaluación propia |
| 3 | Se sabe qué puede y qué no puede hacer el hub |
| 4 | ≥ 30 t/s con el modelo conversacional elegido |
| 5 | < 500 kWh/año medidos; reanudación del servidor < 5 s |

---

## 6. Vista integrada

```mermaid
flowchart TB
    subgraph FASE0["FASE 0 — Validación (~545 €)"]
        A1["EXP-101\n¿AA en el coche?"]
        A2["EXP-201\n¿Latencia < 1 s?"]
        A3["EXP-210\n¿Pepper's Ghost aporta?"]
        A4["EXP-301/302\n¿El modelo predice?"]
    end
    subgraph FASE1["FASE 1 — Prototipos funcionales"]
        B1["Bridge v0.2-v0.3"]
        B2["NEXUS 1-3"]
        B3["Servidor de IA"]
    end
    subgraph FASE2["FASE 2 — Electrónica propia"]
        C1["Bridge v1.0\nCM4 + carrier"]
        C2["NEXUS 4\nSensor Hub"]
    end
    subgraph FASE3["FASE 3 — Ecosistema"]
        D1["Nexus multi-terminal"]
        D2["Nexus en el vehículo"]
    end
    subgraph FASE4["FASE 4 — Presencia"]
        E1["NEXUS 5-6"]
    end
    A1 --> B1
    A2 --> B2
    A4 --> B3
    A3 -.-> E1
    B1 --> C1
    B2 --> C2
    B3 --> C2
    C1 --> D2
    C2 --> D1
    D1 --> E1
```

---

## 7. Dependencias críticas

| Dependencia | Qué bloquea si falla |
|---|---|
| `EXP-101` (AA en el coche) | Todo el Proyecto 01 |
| `EXP-201` (latencia conversacional) | NEXUS 1 en adelante |
| `EXP-212` (convivencia 30 días) | Toda la inversión en hardware de Nexus |
| `EXP-210` (Pepper's Ghost) | La estrategia de display de NEXUS 5 |
| `EXP-301/302` (modelo de rendimiento) | El dimensionado del servidor y del hub |
| `EXP-304` (AI HAT+ 2) | Qué puede hacer el Sensor Hub |
| Resolución legal de biometría (U-29) | NEXUS 2 con identificación de terceros |
| Cálculo IEC 62471 del IR (Q-E27) | Encender el iluminador IR |
| Decisión de licencias de software (R-07) | Cualquier ruta comercial del Bridge |

---

## 8. Presupuesto acumulado por fase

| Fase | Material | Etiqueta |
|---|---|---|
| Fase 0 | **~545 €** | `[HIPÓTESIS]` |
| Laboratorio (compartido por los tres proyectos) | **~1 000–2 500 €** | `[HIPÓTESIS]` |
| Fase 1 | ~800–1 500 € + servidor con GPU (`SIN PRECIO FIABLE`) | `[HIPÓTESIS]` |
| Fase 2 | ~1 500–3 000 € (PCBs, componentes, mecánica, series de 5) | `[HIPÓTESIS]` |
| Fase 3 | Incremental, sobre todo software | |
| Fase 4 | **1 500–65 000 USD** sólo en display | `[CONFIRMADO]` los precios de las opciones |
| Fase 5 | `SIN PRECIO FIABLE` | |

> **El salto de coste entre la Fase 3 y la Fase 4 es de dos órdenes de magnitud.** Ese es el punto de decisión más importante de todo el ecosistema, y hay dos experimentos baratos (`EXP-210` y `EXP-212`) diseñados específicamente para informarlo.

---

## 9. Principios que gobiernan el roadmap

| # | Principio |
|---|---|
| 1 | **Experimento barato antes que diseño caro.** Ningún PCB antes de haber respondido las preguntas binarias |
| 2 | **Cada fase deja algo utilizable.** No hay fases que sólo sirvan para llegar a la siguiente |
| 3 | **Comprar antes que diseñar**, hasta que comprar deje de servir |
| 4 | **Medir antes que opinar.** Toda decisión importante tiene un experimento asociado |
| 5 | **Las puertas de fase son numéricas**, no impresiones |
| 6 | **Documentar lo que no sabemos** con la misma claridad que lo que sabemos |
| 7 | **Un prototipo no es un producto.** Una Raspberry Pi puede ser lo correcto en la fase 1 y lo incorrecto en la 5 |
| 8 | **Reutilizar entre proyectos.** La etapa de potencia, el Linux embebido y la metodología son comunes |
