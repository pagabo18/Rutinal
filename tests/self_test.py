from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
SEEDN="localStorage.setItem('rutinal_lang','es');"
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=600): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/self_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','carlos-coach'); N.fill('#auth-pass','secreta2'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(1200)
    shot(N,'1_inicio')
    print('inicio atletas activos:', N.inner_text('.sp-stat-v').split('\n')[0])
    N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(1000)
    print('lista:', N.inner_text('#sp-list').replace('\n',' | ')[:160]); print('conteo:', N.inner_text('#sp-slots'))
    shot(N,'2_lista')
    N.click('#sp-list [data-sp-open]'); N.wait_for_timeout(1200)
    print('botones ficha:', N.locator('#sp-c-notes').count(), N.locator('#sp-c-end').count(), N.locator('#sp-c-assign').inner_text())
    shot(N,'3_ficha')
    N.click('#sp-c-assign'); N.wait_for_timeout(900)
    print('plantillas para mí:', N.inner_text('#sheet-body').replace('\n',' | ')[:260])
    shot(N,'4_asignarme')
    # asignarme una rutina y una dieta directo por la API (como lo haría la plantilla)
    me=N.evaluate("authGet().uid")
    N.evaluate("""async me=>{await sbRest('assignments',{method:'POST',body:{specialist_id:me,client_id:me,role:'coach',kind:'routine',name:'Mi torso',payload:{id:'mt',name:'Mi torso',exercises:[{id:'a',name:'Press banca',sets:[{count:3,reps:'8'}]}]}},headers:{Prefer:'return=minimal'}});}""", me)
    N.evaluate("closeSheet()"); N.click('#mode-bar [data-mode-set=""]')
    N.wait_for_timeout(800); N.evaluate("asgRefresh && asgRefresh(true)"); N.wait_for_timeout(1500)
    print('como atleta, rutina asignada:', N.evaluate("JSON.stringify(gymRoutines().filter(r=>r.assigned).map(r=>[r.name,r.assigned.by]))"))
    print('mis especialistas (sin mí):', N.evaluate("(async()=>{const r=await linkRpc('rutinal_my_links'); return mySpecialists(r).length})()"))
    print('errs', N.errs)
