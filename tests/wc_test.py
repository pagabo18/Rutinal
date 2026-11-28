from playwright.sync_api import sync_playwright
import os, json
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
FAKE = """
window.__gl=null; window.__glN=0; window.__acts=[]; window.__pip=false;
window.Android = { setGymLive(j){ window.__gl=JSON.parse(j); window.__glN++; }, consumeWidgetActions(){ const a=JSON.stringify(window.__acts); window.__acts=[]; return a; },
  canPip(){ return true; }, enterPip(){ window.__pip=true; },
  saveState(j){ window.__state=JSON.parse(j); window.__saves=(window.__saves||0)+1; },
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
    pg.wait_for_timeout(1500)
    wc=lambda: pg.evaluate("JSON.stringify(window.__state && window.__state.widget_cardio)")
    print('1 espejo inicial:', wc())
    pg.evaluate("()=>{const l=actLog(); (l[keyDate()]=l[keyDate()]||[]).push({id:'a1',sport:'running',time:1500}); actSave(l);}"); pg.wait_for_timeout(400)
    print('2 tras 25 min de carrera:', wc())
    pg.evaluate("S.set('steps_log',{[keyDate()]:5432})"); pg.wait_for_timeout(400); print('3 pasos a mano:', pg.evaluate("window.__state.widget_cardio.steps"))
    pg.click('.hd-cardio .hd-k'); pg.wait_for_timeout(400); print('4 sin contador no hay interruptor:', pg.locator('#cd-notify').count())
    pg.click('#cd-nat-on'); pg.wait_for_timeout(700); print('  con contador:', pg.locator('#cd-notify').count(), 'encendido', pg.is_checked('#cd-notify'))
    pg.click('#cd-notify'); pg.click('#sheet-save'); pg.wait_for_timeout(500)
    print('5 aviso apagado:', pg.evaluate("JSON.stringify(S.get('cardio_goal'))"), '| espejo notify', pg.evaluate("window.__state.widget_cardio.notify"))
    pg.click('.hd-cardio .hd-k'); pg.wait_for_timeout(400); print('  sigue apagado al reabrir:', pg.is_checked('#cd-notify')); pg.click('#cd-notify'); pg.click('#sheet-save'); pg.wait_for_timeout(500)
    print('6 encendido de nuevo:', pg.evaluate("JSON.stringify(S.get('cardio_goal'))"), pg.evaluate("window.__state.widget_cardio.notify"))
    pg.evaluate("modSet('cardio', false)"); pg.wait_for_timeout(400); print('7 módulo apagado → sin espejo:', wc())
    print('errs', pg.errs)
