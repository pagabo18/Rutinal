#!/usr/bin/env python3
"""Genera assets/web/i18n_extra.js a partir de tr_map.py.

    python3 tools/i18n/gen.py

tr_map.py es la fuente de las traducciones adicionales (español → inglés,
portugués de Brasil y francés). No edites i18n_extra.js a mano: se sobrescribe.
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import tr_map  # noqa: E402

OUT = os.path.normpath(os.path.join(HERE, '..', '..', 'assets', 'web', 'i18n_extra.js'))


def obj(rows):
    d = {}
    for es, en, pt, fr in rows:
        if es in d and d[es] != {'en': en, 'pt-BR': pt, 'fr': fr}:
            print('DUP', es, file=sys.stderr)
        d[es] = {'en': en, 'pt-BR': pt, 'fr': fr}
    return d


data = {'map': obj(tr_map.MAP), 'tpl': obj(tr_map.TPL), 'ctx': obj(tr_map.CTX)}
js = """// ===== Rutinal i18n: traducciones adicionales =====
// Se carga ANTES de i18n.js, que las fusiona con su mapa base (estas ganan).
// map: texto exacto en español → traducciones
// tpl: plantillas con {{var}}; {{n}}, {{n2}}… son números, el resto es texto
//      (y el texto capturado también se traduce si está en el mapa)
// ctx: claves con contexto, para elementos con data-i18n-ctx="<ctx>"
window.__I18N_EXTRA = """ + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
open(OUT, 'w', encoding='utf-8').write(js)
print(len(data['map']), len(data['tpl']), len(data['ctx']), '->', os.path.relpath(OUT))
