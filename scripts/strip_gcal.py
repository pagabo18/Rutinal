#!/usr/bin/env python3
"""Remueve UI y lógica de Google Calendar del index.html sin romper el resto.

Estrategia:
1. Remover el bloque HTML #gcal-toggle-wrap (aparece en Hoy)
2. Remover el bloque HTML .setting con id="gcal-setting" (aparece en Ajustes)
3. Remover funciones JS gcalSettings, gcalSetSettings, gcalIsAvailable, gcalHasPermission,
   gcalListCalendars, gcalEventsForDate, gcalToBlock, renderGCal*, mixGCal*, etc.
4. Remover inicializaciones de listeners a los botones (gcal-perm-btn, gcal-open-settings, etc.)
5. Remover llamadas a funciones GCal en otros lugares (renderHoy, mixEventos)
"""
import re
from pathlib import Path

path = Path("assets/web/index.html")
html = path.read_text()

def remove_html_block(src, start_marker_regex, extra_lines=None):
    """Remueve un bloque HTML que empieza con un patrón y cierra su div más externo.
    extra_lines: si es un número, corta ese número de líneas sin balancear divs.
    """
    lines = src.split("\n")
    for i, ln in enumerate(lines):
        if re.search(start_marker_regex, ln):
            # Encontrar el cierre balanceado
            depth = 0
            j = i
            while j < len(lines):
                depth += lines[j].count("<div") - lines[j].count("</div")
                # También contar tags self-closing como <br/> pero no <div .../>
                if depth <= 0 and j > i:
                    break
                j += 1
            # Remover líneas i..j inclusive
            new_lines = lines[:i] + lines[j+1:]
            return "\n".join(new_lines), True
    return src, False

def remove_js_function(src, fn_name):
    """Remueve una función JS 'function name(...) { ... }' con matching de llaves."""
    pattern = re.compile(r"^function\s+" + re.escape(fn_name) + r"\b", re.MULTILINE)
    m = pattern.search(src)
    if not m:
        return src, False
    start = m.start()
    # Encontrar la primera { después del nombre
    brace_start = src.find("{", m.end())
    if brace_start == -1:
        return src, False
    # Balance
    depth = 1
    i = brace_start + 1
    in_str = False
    str_ch = None
    while i < len(src):
        ch = src[i]
        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == str_ch:
                in_str = False
            i += 1
            continue
        if ch in ('"', "'", "`"):
            in_str = True
            str_ch = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                # Consumir el \n siguiente si existe
                end = i + 1
                if end < len(src) and src[end] == "\n":
                    end += 1
                return src[:start] + src[end:], True
        i += 1
    return src, False

# 1. Remover HTML: gcal-toggle-wrap
new_html, ok1 = remove_html_block(html, r'id="gcal-toggle-wrap"')
if ok1:
    print("[OK] Removido #gcal-toggle-wrap")
    html = new_html
else:
    print("[WARN] No se encontró #gcal-toggle-wrap")

# 2. Remover HTML: gcal-setting (contenedor completo)
new_html, ok2 = remove_html_block(html, r'id="gcal-setting"')
if ok2:
    print("[OK] Removido #gcal-setting")
    html = new_html
else:
    print("[WARN] No se encontró #gcal-setting")

# 3. Remover funciones JS relacionadas a GCal
gcal_functions = [
    "gcalSettings",
    "gcalSetSettings",
    "gcalIsAvailable",
    "gcalHasPermission",
    "gcalListCalendars",
    "gcalEventsForDate",
    "gcalToBlock",
]
for fn in gcal_functions:
    html, ok = remove_js_function(html, fn)
    print(f"[{'OK' if ok else 'WARN'}] function {fn}")

# 4. Remover líneas sueltas que referencian elementos GCal o funciones borradas
lines = html.split("\n")
cleaned = []
skip_next = 0
gcal_ref_pattern = re.compile(
    r"gcal-[a-zA-Z0-9_-]+|"
    r"gcalSettings\(|gcalSetSettings\(|gcalIsAvailable\(|gcalHasPermission\(|"
    r"gcalListCalendars\(|gcalEventsForDate\(|gcalToBlock\(|"
    r"requestCalendarPermission|hasCalendarPermission|listCalendars|getGCalEvents|"
    r"openAppSettings|"
    r"gcalPermission\b|"
    r"'gcal_settings'|" 
    r"cat === 'gcal'|type === 'gcal'|"
    r"gcalOn\b"
)
for ln in lines:
    if skip_next > 0:
        skip_next -= 1
        continue
    if gcal_ref_pattern.search(ln):
        # Si la línea es solo una llamada a listener, borrar
        stripped = ln.strip()
        # Casos comunes: 
        #  - const/let/var X = document.getElementById('gcal-...');
        #  - if (btn) btn.onclick = ...;
        #  - document.getElementById('gcal-...').addEventListener(...);
        #  - Líneas con 'gcal' en JS
        continue
    cleaned.append(ln)

html = "\n".join(cleaned)

# 5. Chequeo final: contar refs residuales
refs = re.findall(r'gcal|GCal|requestCalendarPermission|hasCalendarPermission|listCalendars|getGCalEvents', html)
print(f"\n[CHECK] Refs residuales a 'gcal': {len(refs)}")

path.write_text(html)
print(f"[OK] index.html actualizado ({len(html)} bytes)")
