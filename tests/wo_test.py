import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEED3="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Hipertrofia A',tempo:'3-1-1',createdAt:Date.now()-40*864e5,exercises:[{id:'x1',name:'Press banca',rir:'2',rpe:'8',notes:'Codos a 45°, baja controlado.',sets:[{count:3,reps:'8-10'}]},{id:'x2',name:'Remo',sets:[{count:3,reps:'10'}]},{id:'x3',name:'Curl',sets:[{count:2,reps:'12'}]}]}]));
var sc={};sc[String(new Date().getDay())]='rc1';localStorage.setItem('gym_schedule',JSON.stringify(sc));
var d=new Date();d.setDate(d.getDate()-7);var k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
var lg={};lg[k]={routineId:'rc1',done:true,start:Date.now()-7*864e5,end:Date.now()-7*864e5+40*60000,ex:{x1:[{kg:'60',reps:'10',done:true},{kg:'60',reps:'10',done:true},{kg:'60',reps:'10',done:true}]},exFeel:{x1:{pain:1,rpe:7}},feel:{mood:4,pain:1,rpe:7}};localStorage.setItem('gym_logs',JSON.stringify(lg));}"""%lang
body=lambda pg: pg.evaluate("document.getElementById('sheet-body').innerText.replace(/\\n+/g,' | ')")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.click('[data-hd-start]'); pg.wait_for_timeout(700)
    print('1 abierto:',body(pg)[:420]); pg.screenshot(path='/tmp/t/wo_%s_1.png'%lang)
    # marcar serie 1 con lo de la última vez (placeholder)
    pg.click('.gym-set[data-ex="x1"][data-i="0"] .gym-check'); pg.wait_for_timeout(400)
    print('2 serie 1 (de la última vez):',pg.evaluate("JSON.stringify(gymLogs()[keyDate()].ex.x1)"),'| descanso',pg.inner_text('#gym-rest').replace('\n',' ')[:40])
    pg.click('#gym-rest-x'); pg.wait_for_timeout(200)
    # cambiar a lb
    pg.click('[data-gym-unit="lb"]'); pg.wait_for_timeout(300)
    print('3 en lb:',pg.evaluate("[...document.querySelectorAll('.gym-set[data-ex=\"x1\"] .gym-in[data-f=kg]')].map(i=>i.value+'|'+i.placeholder).join(' , ')"),'| encabezado',pg.inner_text('.gym-set-h').replace('\n',' '),'|',pg.inner_text('.gym-ex.open .gym-chips').replace('\n',' ')[:80],'|',pg.inner_text('.gym-ex.open .gym-last')[:60],'|',pg.inner_text('.gym-ex.open .gym-adv')[:120])
    pg.fill('.gym-set[data-ex="x1"][data-i="1"] .gym-in[data-f=kg]','135'); pg.fill('.gym-set[data-ex="x1"][data-i="1"] .gym-in[data-f=reps]','9'); pg.click('.gym-set[data-ex="x1"][data-i="1"] .gym-check'); pg.wait_for_timeout(300)
    print('4 guardado en kg:',pg.evaluate("JSON.stringify(gymLogs()[keyDate()].ex.x1[1])"),'| se muestra',pg.input_value('.gym-set[data-ex="x1"][data-i="1"] .gym-in[data-f=kg]'))
    pg.screenshot(path='/tmp/t/wo_%s_2.png'%lang)
    # agregar y quitar serie
    pg.click('[data-gym-addset="x1"]'); pg.wait_for_timeout(300); n1=pg.evaluate("document.querySelectorAll('.gym-set[data-ex=\"x1\"]').length"); st1=pg.inner_text('.gym-wo-prog')
    pg.click('[data-gym-rmset="x1"]'); pg.wait_for_timeout(300); n2=pg.evaluate("document.querySelectorAll('.gym-set[data-ex=\"x1\"]').length")
    print('5 agregar/quitar serie:',n1,'→',n2,'| progreso con extra',st1.replace('\n',' '),'| botón quitar visible',pg.evaluate("!!document.querySelector('[data-gym-rmset]')"))
    pg.click('[data-gym-addset="x1"]'); pg.wait_for_timeout(200)
    pg.fill('.gym-set[data-ex="x1"][data-i="3"] .gym-in[data-f=kg]','140'); pg.fill('.gym-set[data-ex="x1"][data-i="3"] .gym-in[data-f=reps]','6'); pg.click('.gym-set[data-ex="x1"][data-i="3"] .gym-check'); pg.wait_for_timeout(300)
    pg.click('#gym-rest-x'); pg.click('[data-gym-toggle="x1"]'); pg.wait_for_timeout(300)
    print('6 con serie extra:',pg.inner_text('[data-ex-card="x1"] .gym-ex-state'),'| dolor/RPE visibles',pg.evaluate("!!document.querySelector('.gym-ex.open .gym-exfeel')"),'| reemplazar',pg.evaluate("!!document.querySelector('.gym-ex.open [data-gym-swap]')"))
    # temporizador inactivo
    pg.click('#gym-rest-idle'); pg.wait_for_timeout(400); print('7 temporizador manual:',pg.inner_text('#gym-rest').replace('\n',' ')[:40]); pg.click('#gym-rest-x')
    pg.evaluate("document.getElementById('sheet-body').scrollTop=99999"); pg.wait_for_timeout(300); pg.screenshot(path='/tmp/t/wo_%s_3.png'%lang)
    # terminar
    pg.click('#gym-finish'); pg.wait_for_timeout(500); print('8 cierre:',body(pg)[:230]); pg.screenshot(path='/tmp/t/wo_%s_4.png'%lang)
    pg.evaluate("closeSheet()"); pg.evaluate("openGymProgress()"); pg.wait_for_timeout(600); print('9 progreso (lb):',body(pg)[:260])
    pg.evaluate("S.set('gym_unit','kg'); closeSheet(); openGymProgress()"); pg.wait_for_timeout(500); print('10 progreso (kg):',body(pg)[:200])
    pg.evaluate("closeSheet(); document.querySelector('nav button[data-tab=\"gym\"]').click()"); pg.wait_for_timeout(500); print('11 pestaña gym:',pg.evaluate("document.getElementById('gym-content').innerText.replace(/\\n+/g,' | ')")[:300])
    print('errors',pg.errs); b.close()
