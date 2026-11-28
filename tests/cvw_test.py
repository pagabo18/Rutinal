from playwright.sync_api import sync_playwright
import os
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
FAKE="window.__bars=[]; window.Android={ setSystemBars(c,d){ window.__bars.push([c,d]); } };"
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/cvw_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.add_init_script(FAKE); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    # --- editor: plantilla de calentamiento ---
    pg.evaluate("openGymEditor('rc1')"); pg.wait_for_timeout(500)
    print('botón en editor:', pg.locator('.cv-ed-list[data-cv-kind="warmup"] [data-cv-tpl]').count(), '| en cardio:', pg.locator('.cv-ed-list[data-cv-kind="cardio"] [data-cv-tpl]').count())
    pg.click('.cv-ed-list [data-cv-tpl]'); pg.wait_for_timeout(500)
    print('catálogo:', pg.inner_text('#sheet-title'), '|', pg.locator('[data-cvw]').count(), 'plantillas'); shot(pg,'1_catalogo')
    pg.click('[data-cvw="1"]'); pg.wait_for_timeout(400)
    print('detalle:', pg.inner_text('#sheet-title'), '|', pg.locator('.cvw-it').count(), 'ejercicios | botones:', pg.locator('#cvw-use').inner_text(), pg.locator('#cvw-add').count()); shot(pg,'2_detalle')
    pg.go_back(); pg.wait_for_timeout(500); print('atrás →', pg.inner_text('#sheet-title'))
    pg.click('[data-cvw="1"]'); pg.wait_for_timeout(300); pg.click('#cvw-use'); pg.wait_for_timeout(500)
    print('de vuelta en editor:', pg.inner_text('#sheet-title'), '| filas:', pg.locator('.cv-ed-list[data-cv-kind="warmup"] .cv-ed').count())
    pg.evaluate("document.querySelector('.cv-ed-list[data-cv-kind=\"warmup\"]').scrollIntoView({block:'start'})"); shot(pg,'3_editor')
    # agregar otra encima (ya hay): debe ofrecer reemplazar o agregar
    pg.click('.cv-ed-list [data-cv-tpl]'); pg.wait_for_timeout(300); pg.click('[data-cvw="11"]'); pg.wait_for_timeout(300)
    print('con calentamiento previo:', pg.locator('#cvw-use').inner_text(), '|', pg.locator('#cvw-add').inner_text())
    pg.click('#cvw-add'); pg.wait_for_timeout(400)
    print('tras agregar:', pg.locator('.cv-ed-list[data-cv-kind="warmup"] .cv-ed').count())
    pg.click('#sheet-save'); pg.wait_for_timeout(600)
    w=pg.evaluate("gymRoutineById('rc1').warmup"); print('guardado:', len(w), [ (x['m'], x.get('name',''), x['t']) for x in w[:3] ])
    print('ids únicos:', len(set(x['id'] for x in w))==len(w), '| ejercicios intactos:', pg.evaluate("gymRoutineById('rc1').exercises.length"))
    # --- entrenamiento: se ven y se marcan ---
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(600); shot(pg,'4_workout')
    print('en entrenamiento:', pg.locator('.cv-card[data-cv-kind="warmup"] .cv-it').count())
    pg.click(f'[data-cv-done="{w[1]["id"]}"]'); pg.wait_for_timeout(300)
    print('marcado:', pg.evaluate(f"JSON.stringify(gymLogs()[keyDate()].cv['{w[1]['id']}'])"))
    # --- entrenamiento: plantilla solo para hoy (rutina sin calentamiento) ---
    pg.evaluate("()=>{const all=gymRoutines(); all.push({id:'r9',name:'Pierna',exercises:[{id:'e9',name:'Sentadilla',sets:[{count:2,reps:'8'}]}]}); saveGymRoutines(all); const L=gymLogs(); delete L[keyDate()]; saveGymLogs(L)}")
    pg.evaluate("openGymWorkout('r9', keyDate())"); pg.wait_for_timeout(600)
    pg.click('[data-cv-pick="warmup"]'); pg.wait_for_timeout(300); shot(pg,'5_pick')
    pg.click('[data-cv-tpl]'); pg.wait_for_timeout(400); pg.click('[data-cvw="4"]'); pg.wait_for_timeout(300); pg.click('#cvw-use'); pg.wait_for_timeout(600)
    lg=pg.evaluate("gymLogs()[keyDate()]"); print('hoy:', pg.inner_text('#sheet-title'), '| extras:', len(lg.get('cvx',[])), set(x['kind'] for x in lg.get('cvx',[])), '| rutina sin cambio:', pg.evaluate("!gymRoutineById('r9').warmup"))
    shot(pg,'6_hoy')
    pg.click('.cv-card[data-cv-kind="warmup"] [data-cv-pick="warmup"]'); pg.wait_for_timeout(300); pg.click('[data-cv-tpl]'); pg.wait_for_timeout(300); pg.click('[data-cvw="11"]'); pg.wait_for_timeout(300)
    print('hoy con extras:', pg.locator('#cvw-use').inner_text()); pg.click('#cvw-use'); pg.wait_for_timeout(500)
    lg=pg.evaluate("gymLogs()[keyDate()]"); print('reemplazado:', len(lg.get('cvx',[])), '| cola viva:', [x['n'] for x in pg.evaluate("gymLiveSnap().queue")][:3] if pg.evaluate("gymLiveSnap().active") else 'inactiva')
    # --- plantillas de rutina: calentamiento según el día ---
    rs=pg.evaluate("rxToRoutines(rxBuildPlan({goal:'hip',level:'int',equip:'gym',mins:60,focus:'',care:[],days:['push','pull','legs'],dows:[1,3,5]}),{goal:'hip',equip:'gym',care:[]},'PPL').map(r=>[r.name,r.warmup.length,r.warmup[1].name])")
    print('PPL gym:', rs)
    print('PPL casa:', pg.evaluate("rxToRoutines(rxBuildPlan({goal:'hip',level:'int',equip:'home',mins:60,focus:'',care:[],days:['push'],dows:[1]}),{goal:'hip',equip:'home',care:[]},'').map(r=>r.warmup.map(x=>x.m).join(','))"))
    print('errs', pg.errs)
