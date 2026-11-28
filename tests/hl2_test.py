import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEEDA="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
const d=n=>{const x=new Date(Date.now()-n*864e5);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
localStorage.setItem('gym_routines',JSON.stringify([{id:'r1',name:'Pierna A',exercises:[{id:'e1',name:'Sentadilla',sets:[{count:3,reps:'8'}]},{id:'e2',name:'Peso muerto',sets:[{count:2,reps:'5'}]}]}]));
const gl={};[[45,70,2,6],[38,72.5,2,7],[31,75,3,7],[24,75,3,8],[17,77.5,2,7],[10,80,4,8],[5,80,3,8],[2,82.5,6,9]].forEach(([n,kg,pain,rpe])=>{gl[d(n)]={routineId:'r1',done:true,ex:{e1:[{kg:String(kg),reps:'8',done:true},{kg:String(kg),reps:'8',done:true},{kg:String(kg),reps:'7',done:true}],e2:[{kg:String(kg+20),reps:'5',done:true}]},feel:{mood:4,pain:pain,rpe:rpe}}});
localStorage.setItem('gym_logs',JSON.stringify(gl));
const ml={};for(let n=0;n<12;n++){if(n==3||n==8)continue;ml[d(n)]={breakfast:[{name:'Avena',grams:80+n*5,per100g:{kcal:380,protein:13,carbs:67,fat:7}}],lunch:[{name:'Pollo',grams:250,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}},{name:'Arroz',grams:300+n*20,per100g:{kcal:130,protein:2.7,carbs:28,fat:0.3}}],dinner:[{name:'Huevo',grams:200,per100g:{kcal:150,protein:12.5,carbs:1,fat:11}}]}}
localStorage.setItem('meal_log',JSON.stringify(ml));
const sl={};for(let n=0;n<24;n++){if(n==4||n==9)continue;sl[d(n)]=6200+((n*37)%%9)*520;} localStorage.setItem('steps_log',JSON.stringify(sl));
localStorage.setItem('gym_schedule',JSON.stringify({[String(new Date().getDay())]:'r1'}));
localStorage.setItem('goals',JSON.stringify([{id:'g1',type:'weight',target:75,start:80.1,created:d(30)},{id:'g2',type:'sessions',target:4,created:d(20)}]));
localStorage.setItem('habits',JSON.stringify([{id:'h1',name:'Leer 20 min'},{id:'h2',name:'Meditar'},{id:'h3',name:'Creatina'}]));
localStorage.setItem('cardio_goal',JSON.stringify({steps:8000,min:30}));
const al={};[[0,'running',1800],[1,'caminata',2400],[3,'ciclismo',2700],[6,'yoga',3000],[9,'running',1500]].forEach(([n,sp,t])=>{al[d(n)]=[{id:'a'+n,sport:sp,time:t}]}); localStorage.setItem('act_log',JSON.stringify(al));
localStorage.setItem('weight_log',JSON.stringify({[d(30)]:80.1,[d(16)]:79.4,[d(2)]:78.2}));
localStorage.setItem('nutri_profile',JSON.stringify({sex:'M',age:30,heightCm:175,weightKg:78,bodyFatPct:null,activity:'moderate',goal:'cut',macroSplit:'auto',tolerance:'flex',manualKcal:null}));}"""%lang
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def link(S,A,user,pw):
    S.fill('#auth-user',user); S.fill('#auth-pass',pw); S.click('#auth-submit'); S.wait_for_timeout(1200); S.click('[data-who="spec"]'); S.wait_for_timeout(700)
    S.click('#sp-invite'); S.wait_for_timeout(600)
    if S.locator('[data-add="code"]').count(): S.click('[data-add="code"]'); S.wait_for_timeout(400)
    if S.locator('#sheet-save').is_visible() and not S.locator('.lk-code').count(): S.click('#sheet-save'); S.wait_for_timeout(600)
    code=S.inner_text('.lk-code'); S.evaluate("closeSheet()")
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700); A.evaluate("closeSheet()")
    S.evaluate("_sp.at=0"); S.click('nav button[data-tab="sp-clients"]'); S.wait_for_timeout(900); S.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); S.wait_for_timeout(1000); S.click('[data-sp-t="progress"]'); S.wait_for_timeout(400)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(800)
    I=ctx2(b,"localStorage.setItem('rutinal_lang','%s');"%lang); link(I,A,'carlos-coach','secreta2')
    A.evaluate("closeSheet()"); A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(500)
    A.evaluate("()=>{ try{ S.set('phases',[{id:'p1',name:'Definición',type:'cut',start:keyDate(new Date(Date.now()-20*864e5)),end:keyDate(new Date(Date.now()+40*864e5))}]); }catch(e){} msgRefresh && msgRefresh(true); renderHoy(); }"); A.wait_for_timeout(1500); A.evaluate("renderHoy()"); A.wait_for_timeout(400)
    cards=lambda: A.evaluate("[...document.querySelectorAll('#hoy-dash > .hd-card, #hoy-dash > .hd-sum')].map(e=>e.querySelector('.hd-k span')?e.querySelector('.hd-k span').innerText:e.querySelector('b').innerText)")
    rows=lambda: A.evaluate("[...document.querySelectorAll('#hl-list .hl-row')].map(r=>r.dataset.id+(r.classList.contains('off')?'(off)':''))")
    print('1 orden inicial:', cards())
    A.click('#hd-layout'); A.wait_for_timeout(400); print('2 hoja:', A.inner_text('#sheet-title'), rows())
    # flechas: comida hasta arriba
    for _ in range(5): A.click('.hl-row[data-id="comida"] [data-hl-mv="-1"]')
    print('3 comida arriba:', rows()[:3], '| flecha subir deshabilitada:', A.locator('.hl-row[data-id="comida"] [data-hl-mv="-1"]').is_disabled())
    # arrastrar "semana" a la segunda posición
    g=A.locator('.hl-row[data-id="semana"] .hl-grip').bounding_box(); t=A.locator('#hl-list .hl-row').nth(1).bounding_box()
    A.mouse.move(g['x']+g['width']/2, g['y']+g['height']/2); A.mouse.down(); A.mouse.move(g['x']+g['width']/2, t['y']+t['height']/2+60, steps=6); A.mouse.move(g['x']+g['width']/2, t['y']+t['height']/2, steps=6)
    A.wait_for_timeout(150); A.screenshot(path='/tmp/g/hl_drag.png'); A.mouse.up(); A.wait_for_timeout(200)
    print('4 tras arrastrar:', rows()[:4])
    A.click('.hl-row[data-id="objetivos"] [data-hl-on]'); A.click('.hl-row[data-id="fase"] [data-hl-on]'); A.wait_for_timeout(200); A.screenshot(path='/tmp/g/hl_hoja.png')
    A.click('#sheet-save'); A.wait_for_timeout(500)
    print('5 Hoy:', cards(), '| prefs', A.evaluate("JSON.stringify(S.get('app_prefs'))"))
    A.screenshot(path='/tmp/g/hl_hoy.png')
    A.reload(); A.wait_for_timeout(2500); A.evaluate("renderHoy()"); A.wait_for_timeout(300); print('6 tras recargar:', cards()[:4])
    # módulo apagado conserva su lugar; cancelar no guarda; restablecer
    A.evaluate("modSet('cardio', false)"); A.wait_for_timeout(200); A.evaluate("openHoyLayout()"); A.wait_for_timeout(300); print('7 sin cardio en la lista:', 'cardio' in rows(), len(rows()))
    A.click('.hl-row[data-id="gym"] [data-hl-mv="1"]'); A.click('#sheet-close'); A.wait_for_timeout(300); print('  cancelar no guarda:', A.evaluate("JSON.stringify(S.get('app_prefs').hoyOrder.slice(0,4))"))
    A.evaluate("modSet('cardio', true); openHoyLayout()"); A.wait_for_timeout(300); print('  cardio vuelve a su lugar:', rows())
    A.click('#hl-reset'); A.wait_for_timeout(100); A.click('#sheet-save'); A.wait_for_timeout(400); print('8 restablecido:', cards(), '| prefs', A.evaluate("JSON.stringify(S.get('app_prefs'))"))
    A.click('nav button[data-tab="mas"]'); A.wait_for_timeout(300)
    print('errors',A.errs,I.errs); b.close()
