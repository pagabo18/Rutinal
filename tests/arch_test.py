from playwright.sync_api import sync_playwright
import os, json
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
FAKE = """
window.__gl=null; window.__glN=0; window.__acts=[]; window.__pip=false;
window.Android = { setGymLive(j){ window.__gl=JSON.parse(j); window.__glN++; }, consumeWidgetActions(){ const a=JSON.stringify(window.__acts); window.__acts=[]; return a; },
  canPip(){ return true; }, enterPip(){ window.__pip=true; } };
"""
os.makedirs('/tmp/g',exist_ok=True)
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/lv_%s.png'%name)
def gl(pg): return pg.evaluate("window.__gl")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.add_init_script(FAKE); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.wait_for_timeout(1800)
    pg.wait_for_timeout(800)
    pg.evaluate("""()=>{ const d=n=>keyDate(new Date(Date.now()-n*864e5));
      S.set('gym_routines',[{id:'ra',name:'Pierna vieja',exercises:[{id:'e1',name:'Sentadilla',sets:[{count:3,reps:'8'}]},{id:'e2',name:'Peso muerto',sets:[{count:3,reps:'5'}]}]},{id:'rb',name:'Sin registros',exercises:[{id:'f1',name:'Remo',sets:[{count:3,reps:'8'}]}]}]);
      const L={}; [9,6,3].forEach((n,i)=>{ L[d(n)]={routineId:'ra',start:1,end:2,done:true,ex:{e1:[{kg:String(80+i*5),reps:'8',done:true},{kg:String(80+i*5),reps:'8',done:true}],e2:[{kg:String(100+i*5),reps:'5',done:true}]}}; }); S.set('gym_logs',L);
      S.set('gym_schedule',{}); renderGym(); }"""); pg.wait_for_timeout(400)
    names=lambda: pg.evaluate("exLogIndex(localDayD()).map(i=>i.name+' x'+i.sessions.length).join(', ')")
    raw=lambda: pg.evaluate("JSON.stringify(gymRoutinesRaw().map(r=>r.name+(r.archived?'(archivada)':'')+':'+r.exercises.map(e=>e.name+(e.gone?'(retirado)':'')).join('/')))")
    print('0 historial:', names(), '| rutinas visibles:', pg.evaluate("gymRoutines().map(r=>r.name).join(', ')"))
    # 1) quitar un ejercicio desde el editor de la rutina
    pg.evaluate("openGymEditor('ra')"); pg.wait_for_timeout(500)
    print('  editor: ejercicios', pg.locator('[data-ge-del]').count() if pg.locator('[data-ge-del]').count() else pg.evaluate("_gymEdit.exercises.length"))
    pg.evaluate("_gymEdit.exercises = _gymEdit.exercises.filter(e=>e.id!=='e2')"); pg.click('#sheet-save'); pg.wait_for_timeout(500)
    print('1 tras quitar Peso muerto:', raw(), '| vigente:', pg.evaluate("gymRoutineById('ra').exercises.map(e=>e.name).join()"), '| historial:', names())
    dk=pg.evaluate("keyDate(new Date(Date.now()-3*864e5))")
    print('  resumen de ese día:', pg.evaluate("(d=>{const g=dayData(localDayD(),d).gym; return g.ex.map(x=>x.name).join('+')+' | saltados '+JSON.stringify(g.skipped)})('%s')"%dk))
    pg.evaluate("()=>{const l=gymLogs(); l[keyDate()]={routineId:'ra',start:Date.now()-6e5,end:Date.now(),done:true,ex:{e1:[{kg:'95',reps:'8',done:true}]}}; S.set('gym_logs',l);}")
    print('  hoy (sin el retirado): saltados', pg.evaluate("JSON.stringify(dayData(localDayD(),keyDate()).gym.skipped)"), 'planeadas', pg.evaluate("dayData(localDayD(),keyDate()).gym.planned"))
    # 2) borrar la rutina completa desde el editor
    pg.evaluate("openGymEditor('ra')"); pg.wait_for_timeout(500); pg.evaluate("document.getElementById('ge-delete').click()"); pg.wait_for_timeout(600)
    print('2 tras borrar la rutina:', raw(), '| visibles:', pg.evaluate("gymRoutines().map(r=>r.name).join(', ')"), '| historial:', names())
    pg.evaluate("renderGym()"); pg.wait_for_timeout(300)
    print('  lista de entrenamientos:', [x.replace('\n',' ') for x in pg.locator('.gym-hist .gym-hist-n').all_inner_texts()][:3], '| tarjetas de rutina:', pg.locator('[data-gym-routine], .gym-routine').count())
    pg.evaluate("document.querySelectorAll('.gym-hist')[1].click()"); pg.wait_for_timeout(700); print('  abrir un día viejo:', pg.inner_text('#sheet-title'), '| series', pg.locator('.gym-set').count()); pg.evaluate("closeSheet()"); pg.wait_for_timeout(300)
    print('  hoy/horario no la usan:', pg.evaluate("JSON.stringify([gymRoutineById('ra'), gymTodayRoutine && gymTodayRoutine()])"))
    # 3) borrar la que no tiene registros: se va de verdad
    pg.evaluate("saveGymRoutines(gymRoutines().filter(r=>r.id!=='rb'))"); print('3 sin registros se borra:', raw())
    # 4) el especialista cambia una rutina asignada (mismo id, ejercicios nuevos)
    pg.evaluate("""()=>{ saveGymRoutines([{id:'as1',name:'Plan coach',assigned:{by:'Carlos',role:'coach',sig:'1'},exercises:[{id:'c1',name:'Press banca',sets:[{count:3,reps:'8'}]}]}]);
      const l=gymLogs(); l[keyDate(new Date(Date.now()-864e5))]={routineId:'as1',done:true,ex:{c1:[{kg:'60',reps:'8',done:true}]}}; S.set('gym_logs',l);
      const rs=gymRoutines(); rs[0]=Object.assign({},rs[0],{exercises:[{id:'c9',name:'Press inclinado',sets:[{count:3,reps:'10'}]}]}); saveGymRoutines(rs); }""")
    print('4 rutina cambiada por el coach:', raw(), '| historial:', names())
    pg.evaluate("saveGymRoutines([])"); print('  y si la retira:', pg.evaluate("gymRoutinesRaw().filter(r=>r.id==='as1').map(r=>r.name+(r.archived?'(archivada)':'')).join()"), '| historial:', names())
    print('errs', pg.errs)
