from playwright.sync_api import sync_playwright
import os, json
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
FAKE = """
window.__gl=null; window.__glN=0; window.__acts=[]; window.__pip=false;
window.Android = { setGymLive(j){ window.__gl=JSON.parse(j); window.__glN++; }, consumeWidgetActions(){ const a=JSON.stringify(window.__acts); window.__acts=[]; return a; },
  canPip(){ return true; }, enterPip(){ window.__pip=true; },
  __st:{sensor:true,perm:false,on:false,today:0,days:{},ts:0},
  stepsInfo(){ return JSON.stringify(this.__st); },
  stepsEnable(){ const k=keyDate(), y=keyDate(new Date(Date.now()-864e5)); this.__st={sensor:true,perm:true,on:true,today:9120,days:{[k]:9120,[y]:6400},ts:Date.now()}; setTimeout(()=>window.onNativeSteps(this.__st),150); },
  stepsDisable(){ this.__st=Object.assign({},this.__st,{on:false}); setTimeout(()=>window.onNativeSteps(this.__st),50); } };
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
    pg.wait_for_timeout(1200)
    card=lambda: pg.inner_text('.hd-cardio').replace('\n',' | ')
    print('1 tarjeta:', card())
    pg.click('.hd-cardio .hd-k'); pg.wait_for_timeout(400)
    print('  hoja: botón celular', pg.locator('#cd-nat-on').count(), '| manual', pg.locator('#cd-steps').count())
    pg.fill('#cd-steps','5432'); pg.fill('#cd-g-min','40'); shot(pg,'cd1_hoja'); pg.click('#sheet-save') if pg.locator('#sheet-save').count() else pg.evaluate("document.querySelector('.sheet .btn-primary:last-of-type').click()"); pg.wait_for_timeout(500)
    print('2 tras guardar:', card(), '| log', pg.evaluate("JSON.stringify([S.get('steps_log'),S.get('cardio_goal')])"))
    pg.evaluate("()=>{const l=actLog(); (l[keyDate()]=l[keyDate()]||[]).push({id:'a1',sport:'running',time:1500,dist_km:4}); l[keyDate()].push({id:'a2',sport:'yoga',time:1800}); actSave(l); renderHoyDash();}"); pg.wait_for_timeout(300)
    print('3 con carrera 25 min (yoga no cuenta):', card())
    shot(pg,'cd2_tarjeta')
    pg.click('.hd-cardio .hd-k'); pg.wait_for_timeout(400); pg.click('#cd-nat-on'); pg.wait_for_timeout(700)
    print('4 celular: hoja reabierta sin manual', pg.locator('#cd-steps').count(), '| botón apagar', pg.locator('#cd-nat-off').count(), '| ahora', pg.inner_text('#cd-steps-now'))
    shot(pg,'cd3_hoja_cel'); pg.evaluate("closeSheet()"); pg.wait_for_timeout(300)
    print('  tarjeta:', card(), '| log', pg.evaluate("JSON.stringify(S.get('steps_log'))"))
    pg.evaluate("()=>{const l=actLog(); l[keyDate()].push({id:'a3',sport:'caminata',time:1200}); actSave(l); renderHoyDash();}"); pg.wait_for_timeout(300)
    print('5 metas cumplidas:', card()); shot(pg,'cd4_ok')
    print('6 resumen:', pg.evaluate("JSON.stringify(dayData(localDayD(), keyDate()).steps)"), '|', pg.evaluate("dayKpis(dayData(localDayD(), keyDate())).map(x=>x.join(' ')).join(' ; ')"))
    print('  texto:', [l for l in pg.evaluate("dayReportText(dayData(localDayD(), keyDate()))").split('\n') if 'asos' in l])
    print('7 basura:', pg.evaluate("JSON.stringify(cardioDay({steps_log:{'2026-01-01':'abc'},cardio_goal:{steps:'x',min:-5},act_log:{'2026-01-01':[null,{sport:'running',time:'<b>'}]},gym_logs:{'2026-01-01':{cv:'x'}}},'2026-01-01'))"))
    pg.evaluate("()=>{const p=S.get('app_prefs',{})||{}; p.cardio=false; S.set('app_prefs',p); renderHoyDash();}"); pg.wait_for_timeout(200)
    print('8 módulo apagado:', pg.locator('.hd-cardio').count())
    print('errs', pg.errs)
