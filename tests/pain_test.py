from playwright.sync_api import sync_playwright
import os
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
os.makedirs('/tmp/g',exist_ok=True)
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/pn_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    dialogs=[]; pg.on('dialog',lambda d:(dialogs.append(d.message), d.accept())); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    # 1) dolor por serie
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(600)
    pg.click('.gym-set[data-ex="x1"][data-i="0"] .gym-check'); pg.wait_for_timeout(400)
    print('pregunta de dolor visible:', pg.locator('.set-pain').count())
    pg.evaluate("document.querySelector('.set-pain').scrollIntoView({block:'center'})"); shot(pg,'1_pregunta')
    pg.click('.set-pain [data-v="2"]'); pg.wait_for_timeout(300)
    pg.click('.gym-set[data-ex="x1"][data-i="1"] .gym-check'); pg.wait_for_timeout(300); pg.click('.set-pain [data-v="7"]'); pg.wait_for_timeout(300)
    pg.click('.gym-set[data-ex="x1"][data-i="2"] .gym-check'); pg.wait_for_timeout(300); pg.click('[data-set-pain-x]'); pg.wait_for_timeout(300)
    print('registro:', pg.evaluate("JSON.stringify(gymLogs()[keyDate()].ex.x1.map(s=>s.pain))"))
    pg.evaluate("openGymWorkout('rc1', keyDate(), 'x1')"); pg.wait_for_timeout(500)
    print('aviso dolor alto:', pg.locator('.set-pain-warn').count())
    pg.evaluate("document.querySelector('.gym-set[data-ex=\"x1\"][data-i=\"0\"]').scrollIntoView({block:'start'})"); shot(pg,'2_series')
    # editar desde el número de serie
    pg.evaluate("openGymWorkout('rc1', keyDate(), 'x1')"); pg.wait_for_timeout(500); pg.click('.gym-set[data-ex="x1"][data-i="2"] [data-set-tags]'); pg.wait_for_timeout(300)
    print('panel técnica + dolor:', pg.locator('.set-tags-pick').count(), pg.locator('.set-pain').count())
    pg.click('.set-pain [data-v="4"]'); pg.wait_for_timeout(300)
    print('editado:', pg.evaluate("gymLogs()[keyDate()].ex.x1[2].pain"))
    pg.evaluate("closeSheet()"); pg.wait_for_timeout(300)
    # 2) rutina que faltó: programada ayer y antier, sin hacer
    pg.evaluate("""()=>{const d1=new Date(Date.now()-864e5), d2=new Date(Date.now()-2*864e5); const sc={}; sc[String(d1.getDay())]='rc1'; sc[String(d2.getDay())]='rc1';
       const l=gymLogs(); delete l[keyDate()]; saveGymLogs(l); S.set('gym_schedule', sc); S.set('gym_sched_since', keyDate(new Date(Date.now()-5*864e5)));}""")
    print('faltas:', pg.evaluate("JSON.stringify(gymMissed().map(x=>[x.name,x.date,x.times]))"))
    pg.click('nav button[data-tab="gym"]'); pg.wait_for_timeout(600); shot(pg,'3_gym')
    pg.click('nav button[data-tab="hoy"]'); pg.wait_for_timeout(600)
    print('tarjeta en Hoy:', pg.locator('#hoy-dash .miss-card').count())
    pg.evaluate("document.querySelector('#hoy-dash .miss-card').scrollIntoView({block:'center'})"); shot(pg,'4_hoy')
    pg.click('#hoy-dash [data-miss-do]'); pg.wait_for_timeout(600); pg.click('.gym-set[data-ex="x1"][data-i="0"] .gym-check'); pg.wait_for_timeout(300)
    pg.evaluate("closeSheet()"); pg.wait_for_timeout(300); pg.evaluate("renderHoy()"); pg.wait_for_timeout(300)
    print('tras hacerla hoy, faltas:', pg.evaluate("gymMissed().length"), '| tarjeta:', pg.locator('#hoy-dash .miss-card').count())
    # omitir
    pg.evaluate("()=>{const l=gymLogs(); delete l[keyDate()]; saveGymLogs(l); renderHoy()}"); pg.wait_for_timeout(300)
    pg.click('#hoy-dash [data-miss-skip]'); pg.wait_for_timeout(300)
    print('tras omitir, faltas:', pg.evaluate("gymMissed().length"), pg.evaluate("JSON.stringify(S.get('gym_missed_skip'))"))
    # conflicto de un entrenamiento por día
    pg.evaluate("()=>{const l=gymLogs(); l[keyDate()]={routineId:'rc1',start:Date.now(),ex:{x1:[{kg:'60',reps:'10',done:true}]}}; saveGymLogs(l); const all=gymRoutines(); all.push({id:'zz',name:'Otra',exercises:[{id:'q',name:'Remo',sets:[{count:3,reps:'10'}]}]}); saveGymRoutines(all); }")
    pg.evaluate("openGymWorkout('zz', keyDate())"); pg.wait_for_timeout(300); print('aviso de reemplazo:', dialogs[-1][:80] if dialogs else None)
    print('errs', pg.errs)
