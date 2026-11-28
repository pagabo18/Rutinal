from playwright.sync_api import sync_playwright
import os
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
os.makedirs('/tmp/g',exist_ok=True)
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/sr_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.click('nav button[data-tab="gym"]'); pg.wait_for_timeout(700)
    # 1) rutina de natación/running desde el catálogo
    pg.evaluate("openSportRoutines()"); pg.wait_for_timeout(400)
    i=pg.evaluate("SPORT_ROUTINES.findIndex(r=>r.name.startsWith('Running · Series'))"); pg.click('[data-sr-add="%d"]'%i); pg.wait_for_timeout(500)
    rid=pg.evaluate("gymRoutines().slice(-1)[0].id"); print('rutina', pg.evaluate("JSON.stringify(gymRoutines().slice(-1)[0].exercises.map(e=>e.sets))"))
    pg.evaluate("id=>openGymWorkout(id, keyDate(new Date()))", rid); pg.wait_for_timeout(700)
    ex=pg.evaluate("gymRoutines().slice(-1)[0].exercises.map(e=>e.id)")
    r0='.gym-set[data-ex="%s"][data-i="0"]'%ex[1]
    pg.evaluate("s=>{const el=document.querySelector(s); if(el) el.scrollIntoView({block:'center'})}", r0); shot(pg,'0_abierto')
    for e in ex:
        n=pg.locator('.gym-set[data-ex="%s"]'%e).count()
        for k in range(n):
            row='.gym-set[data-ex="%s"][data-i="%d"]'%(e,k)
            if e==ex[1]: pg.fill(row+' [data-f="time"]','1:3%d'%(k%10)); pg.fill(row+' [data-f="rpe"]','8')
            elif e==ex[0]: pg.fill(row+' [data-f="time"]','11:20')
            else: pg.fill(row+' [data-f="time"]','12:05')
            pg.click(row+' .gym-check'); pg.wait_for_timeout(80)
    pg.evaluate("closeRestTimer && closeRestTimer()") if pg.evaluate("typeof closeRestTimer==='function'") else None
    shot(pg,'1_series'); print('sets visibles', pg.locator('.gym-set[data-ex]').count())
    pg.click('#gym-finish'); pg.wait_for_timeout(500); shot(pg,'2_terminar'); pg.click('#gym-fin-save'); pg.wait_for_timeout(700)
    print('actividad', pg.evaluate("JSON.stringify(actLog()[keyDate(new Date())])"))
    # 2) instrucciones en español
    pg.evaluate("""()=>{const all=gymRoutines();all.push({id:'rs',name:'Pierna',exercises:[{id:'q1',name:'Sentadilla',dbId:'Barbell_Squat',sets:[{count:3,reps:'8'}]},{id:'q2',name:'Otro',dbId:'Ab_Roller',sets:[{count:3,reps:'8'}]}]});saveGymRoutines(all)}""")
    pg.evaluate("loadGymDb && loadGymDb()") ; pg.wait_for_timeout(1500)
    pg.evaluate("openGymExerciseInfo('rs','q1')"); pg.wait_for_timeout(900)
    pg.evaluate("document.getElementById('gym-steps-box').scrollIntoView({block:'center'})"); shot(pg,'3_pasos_es')
    print('pasos es:', pg.inner_text('#gym-steps-box')[:160].replace('\n',' | '))
    pg.evaluate("openGymExerciseInfo('rs','q2')"); pg.wait_for_timeout(900); print('sin traducir:', pg.inner_text('#gym-steps-box')[-90:].replace('\n',' | '))
    pg.evaluate("localStorage.setItem('rutinal_lang','en'); i18n.setLang && i18n.setLang('en')"); pg.wait_for_timeout(500)
    pg.evaluate("openGymExerciseInfo('rs','q1')"); pg.wait_for_timeout(900); print('en ingles:', pg.inner_text('#gym-steps-box')[:90].replace('\n',' | '))
    pg.evaluate("localStorage.setItem('rutinal_lang','es'); i18n.setLang && i18n.setLang('es')"); pg.wait_for_timeout(500)
    # 3) récords vistos por el coach
    pg.evaluate("""()=>{const L={},A={},day=n=>keyDate(new Date(Date.now()-n*864e5));
      const R=[{id:'g1',name:'Torso',exercises:[{id:'a',name:'Press banca',dbId:'Barbell_Bench_Press_-_Medium_Grip'},{id:'b',name:'Dominadas'},{id:'c',name:'Sentadilla'}]}];
      [42,35,28,21,14,7,2].forEach((n,j)=>{L[day(n)]={routineId:'g1',done:true,ex:{a:[{kg:String(70+j*2.5),reps:'8',done:true},{kg:String(70+j*2.5),reps:'7',done:true}],b:[{kg:String(5+j),reps:'6',done:true}],c:[{kg:String(100+(j%3)*5),reps:'5',done:true}]}}});
      A[day(10)]=[{id:'x1',sport:'running',dist_km:10,time:3050}];A[day(3)]=[{id:'x2',sport:'running',dist_km:5,time:1410}];A[day(5)]=[{id:'x3',sport:'natacion',dist_m:1500,time:1680}];
      openSheet('Progreso', '<div id="sp-report">'+spRecordsHtml({gym_logs:L,gym_routines:R,act_log:A})+'</div>')}""")
    shot(pg,'4_records',800)
    print('records:', pg.inner_text('.rec-card').replace('\n',' | ')[:400])
    # 4) catálogo del especialista con otros deportes
    pg.evaluate("closeSheet(); openRoutinePlans({spec:true, forClient:null})"); pg.wait_for_timeout(500)
    pg.evaluate("document.querySelector('[data-rp-sport]').scrollIntoView({block:'center'})"); shot(pg,'5_catalogo_coach')
    print('otros deportes:', pg.locator('[data-rp-sport]').count())
    print('errs',pg.errs)
