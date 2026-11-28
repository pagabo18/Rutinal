import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang='es'
SEEDC="""localStorage.setItem('rutinal_lang','es');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Hipertrofia A',createdAt:Date.now(),exercises:[{id:'x1',name:'Press banca',sets:[{count:3,reps:'8-10'}]},{id:'x2',name:'Remo',sets:[{count:3,reps:'10'}]}]}]));}"""
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
body=lambda pg: pg.evaluate("document.getElementById('sheet-body').innerText.replace(/\\n+/g,' | ')")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    I=ctx2(b,SEEDC); I.fill('#auth-user','carlos-coach'); I.fill('#auth-pass','secreta2'); I.click('#auth-submit'); I.wait_for_timeout(1200)
    I.click('[data-who="spec"]'); I.wait_for_timeout(700)
    # el coach pone cargas en su rutina (editor)
    I.evaluate("closeSheet(); openGymEditor('rc1')"); I.wait_for_timeout(500); I.click('[data-ge-open="x1"]'); I.wait_for_timeout(300)
    I.fill('.ge-ex[data-id="x1"] [data-f="loads"]','60, 60, 62.5'); I.click('[data-ge-close]'); I.wait_for_timeout(300)
    print('1 editor mini:',I.inner_text('.ge-ex[data-id="x1"] .ge-mini-meta')); I.click('#sheet-save'); I.wait_for_timeout(500)
    print('  guardado:',I.evaluate("JSON.stringify(gymRoutines()[0].exercises[0].loads)"))
    I.click('#sp-invite'); I.wait_for_timeout(600); (I.click('[data-add="code"]') if I.locator('[data-add="code"]').count() else None); I.wait_for_timeout(400); (I.click('#sheet-save') if (I.locator('#sheet-save').is_visible() and not I.locator('.lk-code').count()) else None); I.wait_for_timeout(600); code=I.inner_text('.lk-code'); I.evaluate("closeSheet()")
    A=new_ctx(b,lang,False); login(A,'ana','secreta1',True)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700); A.evaluate("closeSheet()")
    # plantilla + asignar
    I.click('nav button[data-tab="sp-templates"]'); I.wait_for_timeout(600); I.click('#tab-sp-templates [data-tp-new="routine"]'); I.wait_for_timeout(300); I.click('#sheet-save'); I.wait_for_timeout(800)
    I.click('#tab-sp-templates [data-tp-assign]'); I.wait_for_timeout(600); I.locator('[data-as-c]').last.check(); I.click('#sheet-save'); I.wait_for_timeout(800)
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(900)
    print('2 ana recibe cargas:',A.evaluate("JSON.stringify(gymRoutines().map(r=>[r.id.slice(0,4),r.exercises.map(e=>e.loads||null)]))"))
    rid=A.evaluate("gymRoutines()[0].id"); A.evaluate("openGymWorkout('%s')"%rid); A.wait_for_timeout(600)
    print('3 pantalla de ana:',A.inner_text('.gym-ex.open .gym-rec').replace('\n',' | '),'| sugeridos',A.evaluate("[...document.querySelectorAll('.gym-ex.open .gym-in[data-f=kg]')].map(i=>i.placeholder).join(',')"))
    A.screenshot(path='/tmp/t/loads_ana.png')
    A.click('.gym-set[data-i="2"] .gym-check'); A.wait_for_timeout(300); print('  marcar serie 3 usa la carga:',A.evaluate("JSON.stringify(gymLogs()[keyDate()].ex.x1[2])")); A.evaluate("closeSheet()")
    # el coach ajusta cargas solo para Ana desde su ficha
    I.evaluate("_sp.at=0"); I.click('nav button[data-tab="sp-clients"]'); I.wait_for_timeout(900); I.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); I.wait_for_timeout(900)
    I.click('[data-asg-loads]'); I.wait_for_timeout(500); print('4 hoja de cargas:',body(I)[:260]); I.screenshot(path='/tmp/t/loads_coach.png')
    I.fill('[data-al="0"]','65, 65, 70'); I.fill('[data-al="1"]','40'); I.click('#sheet-save'); I.wait_for_timeout(900)
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(900)
    print('5 ana tras el cambio:',A.evaluate("JSON.stringify(gymRoutines()[0].exercises.map(e=>e.loads||null))"),'| registro intacto',A.evaluate("JSON.stringify(gymLogs()[keyDate()].ex.x1[2])"))
    print('  plantilla del coach sin cambios:',I.evaluate("JSON.stringify(gymRoutines()[0].exercises.map(e=>e.loads||null))"))
    I.click('[data-asg-loads]'); I.wait_for_timeout(500); I.fill('[data-al="1"]',''); I.click('#sheet-save'); I.wait_for_timeout(900); A.evaluate("asgRefresh(true)"); A.wait_for_timeout(900)
    print('6 quitar carga:',A.evaluate("JSON.stringify(gymRoutines()[0].exercises.map(e=>e.loads||null))"))
    print('errors',I.errs,A.errs); b.close()
