from playwright.sync_api import sync_playwright
import os
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
FAKE="window.__bars=[]; window.Android={ setSystemBars(c,d){ window.__bars.push([c,d]); } };"
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/cv_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.add_init_script(FAKE); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    # --- atrás ---
    pg.evaluate("()=>{const all=gymRoutines(); all[0].exercises[0].dbId='Barbell_Bench_Press_-_Medium_Grip'; saveGymRoutines(all)}")
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(600)
    pg.click('.gym-ex-hero'); pg.wait_for_timeout(700)
    print('instrucciones abiertas:', pg.inner_text('#sheet-title'))
    pg.go_back(); pg.wait_for_timeout(600)
    print('atrás del teléfono →', pg.inner_text('#sheet-title'), '| hoja abierta:', pg.evaluate("document.getElementById('sheet').classList.contains('show')"))
    pg.evaluate("openGymExerciseInfo('rc1','x1',()=>openGymWorkout('rc1', keyDate()))"); pg.wait_for_timeout(400)
    pg.click('#sheet-close'); pg.wait_for_timeout(500)
    print('flecha de arriba →', pg.inner_text('#sheet-title'))
    pg.go_back(); pg.wait_for_timeout(500)
    print('atrás en entrenamiento cierra:', not pg.evaluate("document.getElementById('sheet').classList.contains('show')"))
    # --- barras ---
    pg.evaluate("applyTheme('dark')"); pg.wait_for_timeout(200)
    print('barras oscuro:', pg.evaluate("window.__bars.slice(-1)[0]"), pg.evaluate("[...document.querySelectorAll('meta[name=theme-color]')].map(m=>m.content)"))
    pg.evaluate("applyTheme('light')"); print('barras claro:', pg.evaluate("window.__bars.slice(-1)[0]"))
    pg.evaluate("applyTheme('auto')")
    # --- editor: calentamiento y cardio ---
    pg.evaluate("openGymEditor('rc1')"); pg.wait_for_timeout(500)
    pg.click('[data-cv-add="warmup"]'); pg.wait_for_timeout(300)
    row='.cv-ed-list[data-cv-kind="warmup"] .cv-ed'
    pg.fill(row+' [data-cvf="t.time"]','10'); pg.fill(row+' [data-cvf="t.speed"]','5.5'); pg.fill(row+' [data-cvf="t.incline"]','3')
    pg.click('[data-cv-add="cardio"]'); pg.wait_for_timeout(300)
    crow='.cv-ed-list[data-cv-kind="cardio"] .cv-ed'
    pg.fill(crow+' [data-cvf="t.time"]','20'); pg.fill(crow+' [data-cvf="t.res"]','8'); pg.fill(crow+' [data-cvf="t.spm"]','40'); pg.fill(crow+' [data-cvf="note"]','Zona 2')
    pg.evaluate("document.querySelector('.cv-ed-list[data-cv-kind=\"warmup\"]').scrollIntoView({block:'start'})"); shot(pg,'1_editor')
    pg.click('#sheet-save'); pg.wait_for_timeout(600)
    print('rutina guardada:', pg.evaluate("JSON.stringify({w:gymRoutineById('rc1').warmup, c:gymRoutineById('rc1').cardio})"))
    # --- entrenamiento ---
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(600)
    shot(pg,'2_workout_top')
    w=pg.evaluate("gymRoutineById('rc1').warmup[0].id"); cid=pg.evaluate("gymRoutineById('rc1').cardio[0].id")
    pg.fill(f'[data-cv-in="{w}"][data-f="speed"]','6'); pg.click(f'[data-cv-done="{w}"]'); pg.wait_for_timeout(400)
    print('calentamiento registrado:', pg.evaluate("JSON.stringify(gymLogs()[keyDate()].cv)"))
    print('cola de la notificación:', [ (x['n'],x['s'],x['t']) for x in pg.evaluate("gymLiveSnap().queue") if x['ex'].startswith('cv:') ], pg.evaluate("gymLiveSnap().done"), '/', pg.evaluate("gymLiveSnap().total"))
    pg.evaluate("document.querySelector('.cv-card[data-cv-kind=\"cardio\"]').scrollIntoView({block:'center'})"); shot(pg,'3_cardio')
    # desde la notificación: cardio hecho
    pg.evaluate(f"gymLiveApply([{{t:'gym_set',date:keyDate(),rid:'rc1',ex:'cv:{cid}',i:0,rest:0}}])"); pg.wait_for_timeout(500)
    print('cardio desde fuera:', pg.evaluate(f"JSON.stringify(gymLogs()[keyDate()].cv['{cid}'])"))
    print('minutos:', pg.evaluate("cvMinutes(gymRoutineById('rc1'), gymLogs()[keyDate()])"))
    # rutina solo de cardio
    pg.evaluate("()=>{const all=gymRoutines(); all.push({id:'oc',name:'Solo cardio',exercises:[],cardio:[{id:'k1',m:'bici',t:{time:'30',res:'6',rpm:'85'}}]}); saveGymRoutines(all)}")
    pg.evaluate("openGymWorkout('oc', keyDate())"); pg.wait_for_timeout(500); shot(pg,'4_solo')
    print('errs', pg.errs)
