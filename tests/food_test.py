import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEEDF="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
var d=new Date();var k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
var m={};m[k]={breakfast:[{name:'Avena',grams:60,per100g:{kcal:380,protein:13,carbs:67,fat:7}},{name:'Huevo',grams:150,per100g:{kcal:150,protein:12.5,carbs:1,fat:11}}],lunch:[{name:'Pollo',grams:200,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}}]};
localStorage.setItem('meal_log',JSON.stringify(m));
localStorage.setItem('__asg',JSON.stringify([{id:9,kind:'diet',name:'Plan base',role:'nutriologo',author_name:'Nora',created_at:'2026-11-20',payload:{meals:{dinner:[{name:'Salmón',grams:150,per100g:{kcal:200,protein:22,carbs:0,fat:12}},{name:'Camote',grams:200,per100g:{kcal:86,protein:1.6,carbs:20,fat:0.1}}]}}}]));}"""%lang
tab=lambda pg: pg.evaluate("document.getElementById('tab-comida').innerText.replace(/\\n+/g,' | ')")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEEDF); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.wait_for_timeout(800); pg.evaluate("_asgLast=Date.now(); localStorage.setItem('__asg',JSON.stringify([{id:9,kind:'diet',name:'Plan base',role:'nutriologo',author_name:'Nora',created_at:'2026-11-20',payload:{meals:{dinner:[{name:'Salmón',grams:150,per100g:{kcal:200,protein:22,carbs:0,fat:12}},{name:'Camote',grams:200,per100g:{kcal:86,protein:1.6,carbs:20,fat:0.1}}]}}}]))")
    pg.click('nav button[data-tab="comida"]'); pg.wait_for_timeout(600)
    print('1 comida:',tab(pg)[:900]); pg.screenshot(path='/tmp/t/food_%s_1.png'%lang, full_page=True)
    print('2 anillos ocultos:',pg.evaluate("getComputedStyle(document.querySelector('.food-totals')).display"))
    pg.click('#fw-plus'); pg.click('#fw-plus'); pg.wait_for_timeout(200); print('3 agua:',pg.inner_text('#food-water').replace('\n',' | '),'| hábitos',pg.evaluate("hydToday()"))
    pg.click('[data-mc-plan]'); pg.wait_for_timeout(400); print('4 plan registrado:',pg.evaluate("JSON.stringify((mealLog()[keyDate()].dinner||[]).map(x=>x.name))"),'|',pg.inner_text('.ft-card').replace('\n',' | ')[:200])
    pg.click('.mc.mc-none [data-mc-add]'); pg.wait_for_timeout(500); print('5 registrar abre:',pg.inner_text('#sheet-title')); pg.evaluate("closeSheet()"); pg.wait_for_timeout(300)
    pg.click('#food-day-prev'); pg.wait_for_timeout(400); print('6 ayer:',tab(pg)[:330])
    pg.click('#food-day-next'); pg.wait_for_timeout(300)
    pg.click('#food-goals-link'); pg.wait_for_timeout(500); print('7 editar metas →',pg.evaluate("document.querySelector('nav button.active').dataset.tab"),pg.evaluate("document.querySelector('#edit-mode .chip.selected').dataset.v"))
    pg.evaluate("document.documentElement.setAttribute('data-theme','dark')"); pg.click('nav button[data-tab="comida"]'); pg.wait_for_timeout(400); pg.screenshot(path='/tmp/t/food_%s_dark.png'%lang, full_page=True)
    print('errors',pg.errs); b.close()
