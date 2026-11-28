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
    g=gl(pg); print('inicio activo:', g and g['active'], '| semana:', g and g.get('week'))
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(700)
    print('botón ventana:', pg.locator('#gym-pip').count(), pg.inner_text('#gym-pip').replace('\n',' | ') if pg.locator('#gym-pip').count() else '')
    pg.click('.gym-set[data-ex="x1"][data-i="0"] .gym-check'); pg.wait_for_timeout(900)
    g=gl(pg); print('tras 1a serie: activo', g['active'], 'hechas', g['done'], '/', g['total'], '| descanso', bool(g['rest']), '| sigue', g['queue'][0])
    # botón "Serie hecha" desde la notificación / widget (nativo avanzó y encoló)
    it=g['queue'][0]
    pg.evaluate("a=>window.__acts.push(a)", {'t':'gym_set','date':g['date'],'rid':g['rid'],'ex':it['ex'],'i':it['i'],'rest':0})
    pg.wait_for_timeout(2200)
    g=gl(pg); print('tras serie desde notificación: hechas', g['done'], '| sigue', g['queue'][0]['n'], g['queue'][0]['s'], '| descanso', g['rest'])
    print('registro:', pg.evaluate("JSON.stringify(gymLogs()[keyDate()].ex.x1)"))
    print('fila marcada en pantalla:', pg.locator('.gym-set[data-ex="x1"][data-i="1"].done').count())
    # +30 s y saltar desde fuera
    pg.evaluate("()=>window.__acts.push({t:'gym_rest',end:Date.now()+95000})"); pg.wait_for_timeout(2000)
    print('descanso desde fuera:', pg.evaluate("_gymRest && Math.round((_gymRest.end-Date.now())/1000)"), 's; foto:', gl(pg)['rest'] is not None)
    shot(pg,'1_app')
    pg.evaluate("()=>window.__acts.push({t:'gym_rest',end:0})"); pg.wait_for_timeout(2000)
    print('saltar:', pg.evaluate("_gymRest"), gl(pg)['rest'])
    # ventana flotante de Android: vista compacta
    pg.click('#gym-pip'); print('enterPip llamado:', pg.evaluate("window.__pip"))
    pg.evaluate("gymRestStart(84)"); pg.wait_for_timeout(300)
    pg.set_viewport_size({'width':360,'height':270}); pg.evaluate("gymPip(true)"); shot(pg,'2_pip',1200)
    pg.evaluate("gymPip(false)"); pg.set_viewport_size({'width':400,'height':860}); pg.wait_for_timeout(300)
    # ventana de escritorio (misma tarjeta, con botones)
    pg.evaluate("""()=>{const d=document.createElement('div');d.id='pipdemo';d.style.cssText='position:fixed;inset:0;z-index:100000;background:#888;display:grid;place-items:center';
       d.innerHTML='<div style="width:340px;height:240px;border-radius:10px;overflow:hidden;box-shadow:0 8px 30px #0005">'+gymPipCardHtml(gymLiveSnap(),true)+'</div>';document.body.appendChild(d);
       d.addEventListener('click',ev=>{const b=ev.target.closest('[data-glp]'); if(b) gymLiveDo(b.dataset.glp)})}""")
    shot(pg,'3_escritorio')
    pg.click('#pipdemo [data-glp="done"]'); pg.wait_for_timeout(800)
    print('desde ventana escritorio: hechas', gymd:=gl(pg)['done'] if False else pg.evaluate("gymLiveSnap().done"))
    pg.evaluate("document.getElementById('pipdemo').remove()")
    # terminar → sin entrenamiento activo
    pg.evaluate("closeSheet()"); pg.wait_for_timeout(300)
    pg.evaluate("()=>{const l=gymLogs(); l[keyDate()].end=Date.now(); l[keyDate()].done=true; saveGymLogs(l)}"); pg.wait_for_timeout(900)
    print('al terminar activo:', gl(pg)['active'])
    # ajuste
    pg.evaluate("openTab('mas')") ; pg.wait_for_timeout(300)
    print('errs', pg.errs)
