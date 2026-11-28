import sys, datetime
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
dow=(datetime.date.today().weekday()+1)%7
SEED3="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Hipertrofia A',exercises:[{id:'x1',name:'Press banca',sets:[{count:3,reps:'8-10'}]},{id:'x2',name:'Remo',sets:[{count:3,reps:'10'}]},{id:'x3',name:'Curl',sets:[{count:3,reps:'10'}]},{id:'x4',name:'Fondos',sets:[{count:3,reps:'10'}]}]}]));
var sc={};sc[String(new Date().getDay())]='rc1';localStorage.setItem('gym_schedule',JSON.stringify(sc));}"""%lang
dash=lambda pg: pg.evaluate("document.getElementById('hoy-dash').innerText.replace(/\\n+/g,' | ')")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.add_init_script("localStorage.setItem('hoy_prog_open','1')"); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.evaluate("document.querySelector('nav button[data-tab=\"hoy\"]').click()"); pg.wait_for_timeout(400)
    print('1 tablero:',dash(pg)); pg.screenshot(path='/tmp/t/hoy_%s_1.png'%lang)
    pg.click('[data-hd-weight]'); pg.wait_for_timeout(300); print('2 hoja peso:',pg.inner_text('#sheet-title'))
    pg.fill('#wq-v','5'); pg.click('#sheet-save'); pg.wait_for_timeout(200); print('  inválido:',pg.inner_text('#wq-msg'))
    pg.fill('#wq-v','78.4'); pg.click('#sheet-save'); pg.wait_for_timeout(400); print('3 con peso:',dash(pg)[-80:])
    pg.evaluate("(()=>{const w=S.get('weight_log',{});const d=new Date();d.setDate(d.getDate()-5);const k=keyDate(d);w[k]=79.1;S.set('weight_log',w);renderHoyDash();})()"); print('  tendencia:',dash(pg)[-80:])
    pg.click('[data-hd-start]'); pg.wait_for_timeout(600); print('4 empezar abre:',pg.evaluate("(document.querySelector('.gym-ex-head')||{}).innerText||document.title")[:60])
    pg.screenshot(path='/tmp/t/hoy_%s_wo.png'%lang)
    pg.evaluate("(()=>{const l=gymLogs();l[keyDate()]={routineId:'rc1',ex:{x1:[{done:true,w:60,r:8}]}};S.set('gym_logs',l);})()")
    pg.add_init_script("localStorage.setItem('hoy_prog_open','1')"); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(900); print('5 en curso:',dash(pg)[:150])
    pg.evaluate("(()=>{const l=gymLogs();l[keyDate()].done=true;S.set('gym_logs',l);const m=mealLog();m[keyDate()]={breakfast:[{name:'Huevo',grams:200,per100g:{kcal:150,protein:12.5,carbs:1,fat:11}}]};saveMealLog(m);renderHoyDash();})()")
    print('6 completado + comida:',dash(pg)); pg.screenshot(path='/tmp/t/hoy_%s_2.png'%lang); pg.evaluate("document.documentElement.setAttribute('data-theme','dark')"); pg.wait_for_timeout(200); pg.screenshot(path='/tmp/t/hoy_%s_dark.png'%lang)
    pg.click('[data-hd="comida"]'); pg.wait_for_timeout(400); print('7 pestaña:',pg.evaluate("document.querySelector('nav button.active').dataset.tab"))
    print('errors',pg.errs); b.close()
