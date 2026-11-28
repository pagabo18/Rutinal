import json, sys
from playwright.sync_api import sync_playwright
MOCK=open('off_mx_mock.json').read()
V3={"code":"7501011115347","product":{"code":"7501011115347","product_name":"Sabritas Original chips","product_name_es":"Papas Sabritas Original","brands":"Sabritas,PepsiCo","nova_group":4,"nutriscore_grade":"d",
 "categories_tags":["en:snacks","en:salty-snacks","en:appetizers","en:chips-and-fries","en:crisps","en:potato-crisps","es:botanas"],
 "nutriments":{"energy-kcal_100g":536,"proteins_100g":6.6,"carbohydrates_100g":53,"sugars_100g":0.5,"fat_100g":34,"saturated-fat_100g":3.5,"trans-fat_100g":0,"fiber_100g":4,"sodium_100g":0.53}},
 "result":{"id":"product_found"},"status":"success"}
PROFILE="localStorage.setItem('nutri_profile',JSON.stringify({sex:'M',age:30,heightCm:175,weightKg:78,bodyFatPct:null,activity:'moderate',goal:'cut',macroSplit:'auto',tolerance:'flex',manualKcal:null}));"
def run(lang, mode):
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        ctx=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        calls=[]
        def h(route):
            u=route.request.url; calls.append(u.split('?')[0][-60:])
            if 'off_mx.json' in u:
                return route.abort() if mode in('nocat','serving') else route.fulfill(status=200,content_type='application/json',body=MOCK,headers={'access-control-allow-origin':'*'})
            if '/api/v3/product/' in u:
                if mode=='v3down': return route.fulfill(status=503,body='x',headers={'access-control-allow-origin':'*'})
                if mode in('newschema','serving') and '7501011115347' in u:
                    d=json.loads(json.dumps(V3)); nm=d['product'].pop('nutriments')
                    d['product']['nutrition']={'aggregated_set':{'per':'100g' if mode=='newschema' else 'serving','preparation':'as_sold','nutrients':{k[:-5]:{'value':v,'unit':'g'} for k,v in nm.items() if k!='energy-kcal_100g'}}}
                    d['product']['nutrition']['aggregated_set']['nutrients']['energy-kj']={'value':2243,'unit':'kJ'}
                    return route.fulfill(status=200,content_type='application/json',body=json.dumps(d),headers={'access-control-allow-origin':'*'})
                if '7501011115347' in u: return route.fulfill(status=200,content_type='application/json',body=json.dumps(V3),headers={'access-control-allow-origin':'*'})
                return route.fulfill(status=404,content_type='application/json',body=json.dumps({"result":{"id":"product_not_found"},"status":"failure"}),headers={'access-control-allow-origin':'*'})
            if '/api/v2/product/' in u:
                if mode=='serving': return route.fulfill(status=200,content_type='application/json',body=json.dumps({'status':1,'product':V3['product']}),headers={'access-control-allow-origin':'*'})
                return route.fulfill(status=503,body='x',headers={'access-control-allow-origin':'*'})
            if 'openfoodfacts' in u or 'nal.usda.gov' in u: return route.fulfill(status=200,content_type='application/json',body='{"products":[],"foods":[]}',headers={'access-control-allow-origin':'*'})
            return route.continue_()
        pg.route('**/*', lambda r: h(r) if 'localhost' not in r.request.url else r.continue_())
        pg.add_init_script(PROFILE + ("localStorage.setItem('lang','%s');localStorage.setItem('app_lang','%s');"%(lang,lang)))
        pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(700)
        out={}
        out['load']=pg.evaluate("loadOffMx().then(m=>m?m.d.n:null)")
        out['search']=pg.evaluate("['sabritas','yogurt griego','yoghurt griego','coca','papas horn','zzz'].map(q=>q+': '+offMxSearch(q).map(x=>x.name).join(' | '))")
        out['multi']=pg.evaluate("foodSearchMulti('papas horneadas').then(r=>r.slice(0,5).map(x=>x.name+' ['+x.source+(x.mx?'·mx':'')+']'))")
        out['sellos']=pg.evaluate("['7501055300075','7501055300082','7501011115347','7501020540666','7501000111111'].map(c=>{const it=offMxByBarcode(c); return it? it.name+': '+JSON.stringify(nomSellos(it)) : c+': -'})")
        out['bar']=pg.evaluate("offByBarcode('7501011115347').then(p=>p?[p.name,p.brand,p.cats.join(','),JSON.stringify(p.per100g),p.liquid,'noTable' in p]:null)")
        out['bar_unknown']=pg.evaluate("offByBarcode('1234567890123').then(p=>p?p.name:null).catch(e=>'ERR '+e.message)")
        pg.evaluate("window._pendingScanMeal='snack'; handleScannedBarcode('7501011115347')"); pg.wait_for_timeout(3300 if mode=='nocat' else 1200)
        out['card']=pg.evaluate("(()=>{const c=document.querySelector('.fit-card')||document.querySelector('[class*=fit-]'); const s=document.querySelector('.sheet')||document.body; return {sellos:[...document.querySelectorAll('.fit-sello')].map(e=>e.textContent), secs:[...document.querySelectorAll('.fit-sec-k')].map(e=>e.textContent), alts:[...document.querySelectorAll('[data-fit-alt]')].map(e=>e.innerText.replace(/\\n/g,' · ')), note:[...document.querySelectorAll('.fit-note')].map(e=>e.textContent)}})()")
        pg.screenshot(path='/tmp/t/offmx_%s_%s.png'%(lang,mode),full_page=False)
        # scroll sheet to the seals
        pg.evaluate("(()=>{const e=document.querySelector('.fit-sellos'); if(e) e.scrollIntoView({block:'center'})})()"); pg.wait_for_timeout(200)
        pg.screenshot(path='/tmp/t/offmx_%s_%s_b.png'%(lang,mode))
        if mode=='ok':
            # segunda carga sin red: debe salir de IndexedDB
            pg.unroute('**/*'); pg.route('**/*', lambda r: r.abort() if 'localhost' not in r.request.url else r.continue_())
            pg.reload(); pg.wait_for_timeout(700)
            out['idb']=pg.evaluate("loadOffMx().then(m=>m?m.d.n:null)")
            out['offline_bar']=pg.evaluate("offByBarcode('7501000111111').then(p=>p?p.name+' / '+p.brand:null).catch(e=>'ERR '+e.message)")
        print('==',lang,mode); print(json.dumps(out,ensure_ascii=False,indent=1)); print('errors',errs); print('calls',sorted(set(calls)))
        b.close()
for a in sys.argv[1:]:
    l,m=a.split(':'); run(l,m)
