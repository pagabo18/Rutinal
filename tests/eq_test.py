from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDA=SEEDA.replace("localStorage.setItem('gym_routines'","var sc={};sc[String(new Date().getDay())]='r1';localStorage.setItem('gym_schedule',JSON.stringify(sc));localStorage.setItem('gym_routines'")
SEEDN="""localStorage.setItem('rutinal_lang','es');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Fuerza A',createdAt:Date.now(),exercises:[{id:'x1',name:'Press banca',sets:[{count:3,reps:'8-10'}],loads:['60','60','62.5']},{id:'x2',name:'Remo con barra',sets:[{count:3,reps:'10'}]}]}]));}"""
sb.users['nora']['specs']=['coach','nutriologo']
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
n=[0]
def shot(pg,name,wait=500):
    pg.wait_for_timeout(wait); n[0]+=1; pg.screenshot(path='/tmp/shots/%02d_%s.png'%(n[0],name))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); shot(N,'acceso'); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); shot(N,'quien_eres_hoy'); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); (N.click('[data-add="code"]') if N.locator('[data-add="code"]').count() else None); N.wait_for_timeout(400); (N.click('#sheet-save') if (N.locator('#sheet-save').is_visible() and not N.locator('.lk-code').count()) else None); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); shot(A,'aceptar_invitacion'); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    # especialista prepara contenido
    N.click('nav button[data-tab="sp-templates"]'); N.wait_for_timeout(700); N.click('#tab-sp-templates [data-tp-new="diet"]'); N.wait_for_timeout(400); N.screenshot(path='/tmp/t/eq_pick.png')
    N.click('#dk-pre'); N.wait_for_timeout(400); N.click('[data-dp-style="prot"]'); N.click('[data-dp-k="1800"]'); N.wait_for_timeout(300); N.screenshot(path='/tmp/t/eq_pre.png')
    N.click('#dp-use'); N.wait_for_timeout(500); N.screenshot(path='/tmp/t/eq_ed.png'); N.evaluate("document.getElementById('sheet-body').scrollTop=420"); N.wait_for_timeout(200); N.screenshot(path='/tmp/t/eq_ed2.png')
    N.click('#sheet-save'); N.wait_for_timeout(1000)
    N.locator('#tab-sp-templates [data-tp-assign]').first.click(); N.wait_for_timeout(600); N.locator('[data-as-c]').last.check(); N.click('#sheet-save'); N.wait_for_timeout(1000); N.screenshot(path='/tmp/t/eq_tpl.png')
    A.evaluate("asgRefresh(true); msgRefresh(true)"); A.wait_for_timeout(1300)
    A.click('nav button[data-tab="comida"]'); A.wait_for_timeout(600); A.evaluate("window.scrollTo(0,560)"); A.wait_for_timeout(300); A.screenshot(path='/tmp/t/eq_food.png')
    A.locator('[data-eq-open^="breakfast:"]').first.click(); A.wait_for_timeout(500); A.screenshot(path='/tmp/t/eq_ex.png')
    A.locator('[data-eq-pick]').first.click(); A.wait_for_timeout(700); A.evaluate("window.scrollTo(0,560)"); A.wait_for_timeout(300); A.screenshot(path='/tmp/t/eq_logged.png')
    print('errs',N.errs,A.errs,'log',A.evaluate("JSON.stringify((mealLog()[keyDate()]||{}).breakfast||[]).slice(-220)")); b.close()
