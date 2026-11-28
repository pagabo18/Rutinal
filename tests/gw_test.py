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
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(900)
    pg.click('.gym-set[data-ex="x1"][data-i="0"] .gym-check'); pg.wait_for_timeout(900)
    pg.evaluate("gymRestStop && gymRestStop()"); pg.wait_for_timeout(400)
    g=gl(pg); it=g['queue'][0]; print('cabeza:', it)
    # ✓ del widget con valores ajustados
    pg.evaluate("a=>window.__acts.push(a)", {'t':'gym_set','date':g['date'],'rid':g['rid'],'ex':it['ex'],'i':it['i'],'rest':0,'vals':True,'kg':'52.5','reps':'9','rir':'14'})
    pg.wait_for_timeout(2200)
    print('registro kg:', pg.evaluate("JSON.stringify(gymLogs()[keyDate()].ex['%s'][%d])" % (it['ex'], it['i'])))
    g=gl(pg); it=g['queue'][0]; print('sigue:', it)
    # sin cambios: el peso guardado no se toca; valores vacíos no pisan
    pg.evaluate("a=>window.__acts.push(a)", {'t':'gym_set','date':g['date'],'rid':g['rid'],'ex':it['ex'],'i':it['i'],'rest':0,'vals':True,'kg':it['kg'],'reps':'','rir':''})
    pg.wait_for_timeout(2200)
    print('sin cambios:', pg.evaluate("JSON.stringify(gymLogs()[keyDate()].ex['%s'][%d])" % (it['ex'], it['i'])))
    # en libras
    pg.evaluate("S.set('gym_unit','lb'); gymLivePush()"); pg.wait_for_timeout(500)
    g=gl(pg); it=g['queue'][0]; print('lb cabeza:', it)
    pg.evaluate("a=>window.__acts.push(a)", {'t':'gym_set','date':g['date'],'rid':g['rid'],'ex':it['ex'],'i':it['i'],'rest':0,'vals':True,'kg':'45','reps':'15','rir':'5'})
    pg.wait_for_timeout(2200)
    print('lb registro:', pg.evaluate("JSON.stringify(gymLogs()[keyDate()].ex['%s'][%d])" % (it['ex'], it['i'])), '| se ve', pg.evaluate("gymDispW(gymLogs()[keyDate()].ex['%s'][%d].kg)" % (it['ex'], it['i'])))
    print('unit:', pg.evaluate("gymLiveVals({vals:true,kg:'abc',reps:'-3',rir:'2.5'},{kg:'20',reps:'8'})"), pg.evaluate("gymLiveVals({kg:'99'},{kg:'20'})"))
    cv=[x for x in gl(pg)['queue'] if str(x['ex']).startswith('cv:')]; print('cardio sin kg:', [('kg' in x) for x in cv][:3])
    print('errs', pg.errs)
