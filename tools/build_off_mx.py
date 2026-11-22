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

def nutrients_100(p):
    """Nutrimentos por 100 g/ml como dict {id: valor}. Soporta el esquema clásico
    (`nutriments` con claves `<id>_100g`) y el nuevo (`nutrition.aggregated_set`, esquema
    de producto 1003+, valores ya normalizados a g / kJ / kcal)."""
    out = {}
    agg = (p.get('nutrition') or {}).get('aggregated_set') or {}
    if str(agg.get('per') or '').replace(' ', '') in ('100g', '100ml') and agg.get('preparation', 'as_sold') != 'prepared':
        for k, v in (agg.get('nutrients') or {}).items():
            if isinstance(v, dict) and v.get('value') is not None:
                out[k + '_100g'] = v.get('value')
    for k, v in (p.get('nutriments') or {}).items():
        if k.endswith('_100g') and v not in (None, ''):
            out.setdefault(k, v)
    return out

def main():
    cats, cat_idx, rows, seen = [], {}, [], set()
    stats, samples = {}, []
    def skip(why, p=None):
        stats[why] = stats.get(why, 0) + 1
        if p is not None and len(samples) < 3:
            agg = (p.get('nutrition') or {}).get('aggregated_set') or {}
            samples.append({'code': p.get('code'), 'schema_version': p.get('schema_version'),
                            'claves_nutri': sorted(k for k in p if 'nutri' in k)[:20],
                            'nutriments': sorted((p.get('nutriments') or {}).keys())[:12],
                            'agg_per': agg.get('per'), 'agg_prep': agg.get('preparation'),
                            'agg_nutrients': {k: v for k, v in list((agg.get('nutrients') or {}).items())[:4]}})
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            p = json.loads(line)
        except ValueError:
            skip('json_invalido'); continue
        if 'en:mexico' not in (p.get('countries_tags') or []):
            skip('no_mexico'); continue
        code = str(p.get('code') or p.get('_id') or '').strip()
        if not code.isdigit() or len(code) < 8 or code in seen:
            skip('codigo'); continue
        name = (p.get('product_name_es') or p.get('product_name') or p.get('generic_name_es') or p.get('generic_name') or '').strip()
        if not name or len(name) > 90:
            skip('sin_nombre'); continue
        n = nutrients_100(p)
        kcal = num(n, 'energy-kcal_100g', 0)
        if kcal is None:
            kj = num(n, 'energy-kj_100g', 0)
            if kj is None:
                kj = num(n, 'energy_100g', 0)
            kcal = round(kj / 4.184) if kj is not None else None
        prot, carbs, fat = num(n, 'proteins_100g'), num(n, 'carbohydrates_100g'), num(n, 'fat_100g')
        # Solo productos con tabla nutricional utilizable
        if kcal is None or prot is None or carbs is None or fat is None:
            skip('sin_tabla', p); continue
        if kcal > 950 or prot > 100 or carbs > 100 or fat > 100 or (kcal == 0 and (prot > 1 or carbs > 1 or fat > 1)):
            skip('tabla_invalida'); continue
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
    print('build_off_mx: aceptados', len(rows), '· descartados', json.dumps(stats, ensure_ascii=False), file=sys.stderr)
    for sm in samples:
        print('build_off_mx: ejemplo sin tabla', json.dumps(sm, ensure_ascii=False)[:900], file=sys.stderr)

if __name__ == '__main__':
    main()
