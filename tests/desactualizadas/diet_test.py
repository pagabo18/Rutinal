import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
body=lambda pg: pg.evaluate("document.getElementById('sheet-body').innerText.replace(/\\n+/g,' | ')")
def add(pg,meal,q,grams):
    pg.click('[data-de-add="%s"]'%meal); pg.wait_for_timeout(200); pg.fill('#de-q',q); pg.wait_for_timeout(1300)
    n=pg.locator('[data-de-pick]').count(); first=pg.inner_text('[data-de-pick="0"]').replace('\n',' ') if n else None
    pg.click('[data-de-pick="0"]'); pg.wait_for_timeout(200)
    i=pg.locator('[data-de-g^="%s:"]'%meal).count()-1; pg.fill('[data-de-g="%s:%d"]'%(meal,i),str(grams)); pg.wait_for_timeout(100); return n,first
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,"localStorage.setItem('rutinal_lang','%s');"%lang); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); (N.click('[data-add="code"]') if N.locator('[data-add="code"]').count() else None); N.wait_for_timeout(400); (N.click('#sheet-save') if (N.locator('#sheet-save').is_visible() and not N.locator('.lk-code').count()) else None); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=new_ctx(b,lang,False); login(A,'ana','secreta1',True)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700); A.evaluate("closeSheet()")
    N.click('nav button[data-tab="sp-templates"]'); N.wait_for_timeout(600); N.click('#tab-sp-templates [data-tp-new="diet"]'); N.wait_for_timeout(400)
    print('1 editor vacío:',N.inner_text('#sheet-title'),'|',body(N)[:200])
    N.click('#sheet-save'); N.wait_for_timeout(200); print('2 sin nombre:',N.inner_text('#de-msg'))
    N.fill('#de-name','Plan definición'); print('3 añadir:',add(N,'breakfast','avena',80), add(N,'breakfast','huevo',150), add(N,'lunch','pollo',200))
    print('4 total:',N.inner_text('#de-total').replace('\n',' | '),'| desayuno',N.inner_text('[data-de-k="breakfast"]')); N.screenshot(path='/tmp/t/diet_%s.png'%lang)
    N.click('[data-de-x="breakfast:1"]'); N.wait_for_timeout(200); print('5 quitar huevo → filas desayuno',N.locator('[data-de-g^="breakfast:"]').count())
    N.click('#sheet-save'); N.wait_for_timeout(900); print('6 guardada:',N.evaluate("document.getElementById('tab-sp-templates').innerText.replace(/\\n+/g,' | ')")[:160])
    N.click('#tab-sp-templates [data-tp-edit]'); N.wait_for_timeout(400); print('7 editar:',N.inner_text('#sheet-title'),'| nombre',N.input_value('#de-name'),'| filas',N.locator('[data-de-g]').count())
    add(N,'dinner','arroz',150); N.click('#sheet-save'); N.wait_for_timeout(900); print('8 tras editar:',N.evaluate("document.querySelector('#tab-sp-templates .sp-card-d').innerText"))
    N.click('#tab-sp-templates [data-tp-assign]'); N.wait_for_timeout(600); N.check('[data-as-c="0"]'); N.click('#sheet-save'); N.wait_for_timeout(900)
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(900); A.click('nav button[data-tab="comida"]'); A.wait_for_timeout(500); print('9 ana ve plan:',A.evaluate("[...document.querySelectorAll('.mc-plan')].map(x=>x.innerText.replace(/\\n+/g,' | ')).join(' || ')")[:260])
    # editar la copia de ana
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(900)
    N.click('[data-asg-diet]'); N.wait_for_timeout(400); print('10 editar copia:',N.inner_text('#sheet-title'),'|',body(N)[:90]); N.fill('[data-de-g="lunch:0"]','250'); N.click('#sheet-save'); N.wait_for_timeout(900)
    A.evaluate("asgRefresh(true); msgRefresh(true)"); A.wait_for_timeout(900); A.click('nav button[data-tab="hoy"]'); A.click('nav button[data-tab="comida"]'); A.wait_for_timeout(500)
    print('11 ana tras cambio:',A.evaluate("[...document.querySelectorAll('.mc-plan-l')].map(x=>x.innerText.replace(/\\n+/g,' | ')).join(' || ')")[:200],'| chat:',A.evaluate("JSON.stringify(Object.values(msgCache().last).map(x=>x.body))"))
    print('  plantilla intacta:',N.evaluate("(async()=>{const r=await sbRest('templates?select=payload');return r[0].payload.meals.lunch[0].grams})()"))
    print('errors',N.errs,A.errs); b.close()
