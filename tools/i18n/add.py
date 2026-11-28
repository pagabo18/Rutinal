#!/usr/bin/env python3
"""Agrega traducciones nuevas a tr_map.py (las que ya existen se saltan).

Escribe un archivo con las filas, una por línea, separadas por tabulador:

    español<TAB>inglés<TAB>portugués (BR)<TAB>francés

y corre:

    python3 tools/i18n/add.py nuevas.tsv && python3 tools/i18n/gen.py
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
PATH = os.path.join(HERE, 'tr_map.py')
ANCHOR = "# --- Acceso / inicio de sesión ---"

if len(sys.argv) != 2:
    sys.exit(__doc__)
rows = []
for n, line in enumerate(open(sys.argv[1], encoding='utf-8'), 1):
    line = line.rstrip('\n')
    if not line.strip() or line.startswith('#'):
        continue
    parts = line.split('\t')
    if len(parts) != 4:
        sys.exit('Línea %d: se esperaban 4 columnas separadas por tabulador, hay %d' % (n, len(parts)))
    rows.append(tuple(p.strip() for p in parts))

s = open(PATH, encoding='utf-8').read()
have = set(re.findall(r'''^\(["']((?:[^"'\\]|\\.)*)["'],''', s, re.M))
add = [t for t in rows if t[0] not in have]
if ANCHOR not in s:
    sys.exit('No encuentro el ancla en tr_map.py: ' + ANCHOR)
lines = "".join("(%s),\n" % ", ".join('"%s"' % x.replace('\\', '\\\\').replace('"', '\\"') for x in t) for t in add)
open(PATH, 'w', encoding='utf-8').write(s.replace(ANCHOR, lines + ANCHOR, 1))
print('agregadas', len(add), 'de', len(rows))
