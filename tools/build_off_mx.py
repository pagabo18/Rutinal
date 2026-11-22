#!/usr/bin/env python3
"""Genera el catálogo compacto de productos de México a partir del volcado JSONL de
Open Food Facts (https://world.openfoodfacts.org/data). Lee productos (una línea JSON
por producto) por stdin y escribe off_mx.json por stdout.

Uso (lo corre .github/workflows/off-catalog.yml):
  curl -sSL https://static.openfoodfacts.org/data/openfoodfacts-products.jsonl.gz \
    | gunzip -c | grep -F '"en:mexico"' | python3 tools/build_off_mx.py > off_mx.json

Formato de salida (compacto, lo lee assets/web/index.html → offMxIndex):
  { v, built, source, license, n, cats: [tag…],
    p: [[code, name, brand, [catIdx…], kcal, prot, carbs, sugars, fat, sat, trans,
         fiber, sodium_g, nutriscore, nova, liquid], …] }
Datos: © colaboradores de Open Food Facts, licencia ODbL 1.0.
"""
import sys, json, time

def num(n, key, digits=1):
    v = n.get(key)
    try:
        v = float(v)
    except (TypeError, ValueError):
        return None
    if v != v or v < 0:
        return None
    return round(v, digits)

def main():
    cats, cat_idx, rows, seen = [], {}, [], set()
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            p = json.loads(line)
        except ValueError:
            continue
        if 'en:mexico' not in (p.get('countries_tags') or []):
            continue
        code = str(p.get('code') or '').strip()
        if not code.isdigit() or len(code) < 8 or code in seen:
            continue
        name = (p.get('product_name_es') or p.get('product_name') or p.get('generic_name_es') or p.get('generic_name') or '').strip()
        if not name or len(name) > 90:
            continue
        n = p.get('nutriments') or {}
        kcal = num(n, 'energy-kcal_100g', 0)
        if kcal is None:
            kj = num(n, 'energy_100g', 0)
            kcal = round(kj / 4.184) if kj else None
        prot, carbs, fat = num(n, 'proteins_100g'), num(n, 'carbohydrates_100g'), num(n, 'fat_100g')
        # Solo productos con tabla nutricional utilizable
        if kcal is None or kcal > 950 or prot is None or carbs is None or fat is None:
            continue
        if kcal == 0 and (prot or carbs or fat):
            continue
        if prot > 100 or carbs > 100 or fat > 100:
            continue
        tags = [t for t in (p.get('categories_hierarchy') or p.get('categories_tags') or []) if isinstance(t, str) and t.startswith('en:')]
        idxs = []
        for t in tags[-4:]:
            if t not in cat_idx:
                cat_idx[t] = len(cats); cats.append(t)
            idxs.append(cat_idx[t])
        ns = str(p.get('nutriscore_grade') or '').lower()
        ns = ns if ns in ('a', 'b', 'c', 'd', 'e') else ''
        nova = p.get('nova_group')
        try:
            nova = int(nova)
        except (TypeError, ValueError):
            nova = None
        brand = (p.get('brands') or '').split(',')[0].strip()[:40]
        liquid = 1 if 'en:beverages' in tags else 0
        seen.add(code)
        try:
            scans = int(p.get('unique_scans_n') or 0)
        except (TypeError, ValueError):
            scans = 0
        rows.append((scans, [code, name, brand, idxs, int(kcal), prot, carbs, num(n, 'sugars_100g'), fat,
                             num(n, 'saturated-fat_100g'), num(n, 'trans-fat_100g'), num(n, 'fiber_100g'),
                             num(n, 'sodium_100g', 3), ns, nova, liquid]))
    rows.sort(key=lambda r: -r[0])  # los más escaneados primero
    out = {
        'v': 1,
        'built': time.strftime('%Y-%m-%d', time.gmtime()),
        'source': 'Open Food Facts — https://world.openfoodfacts.org',
        'license': 'ODbL 1.0 — https://opendatacommons.org/licenses/odbl/1-0/',
        'n': len(rows),
        'cats': cats,
        'p': [r[1] for r in rows],
    }
    json.dump(out, sys.stdout, ensure_ascii=False, separators=(',', ':'))

if __name__ == '__main__':
    main()
