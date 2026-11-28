from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
SEED="localStorage.setItem('rutinal_lang','es');"
sb.limits={'nora':2}
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=600): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/l_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEED); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(900)
    N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); N.click('#sp-invite2'); shot(N,'elegir',900)
    N.click('[data-add="new"]'); N.wait_for_timeout(400); N.fill('#ca-name','Luis Pérez'); N.fill('#ca-user','luis.perez'); N.uncheck('[data-ca="fisioterapeuta"]'); shot(N,'form'); N.click('#sheet-save'); N.wait_for_timeout(1200); shot(N,'creada')
    pw=N.inner_text('.usr-cred').split('Contraseña:')[1].strip(); print('creada', 'luis.perez' in sb.users, [ (l['role'],l['status'],l['client']) for l in sb.links])
    N.evaluate("closeSheet()"); N.wait_for_timeout(300); N.evaluate("_sp.at=0;tabRenderers['sp-clients']()"); N.wait_for_timeout(1200); shot(N,'lista')
    # el atleta entra y acepta
    L=ctx2(b,SEED); L.fill('#auth-user','luis.perez'); L.fill('#auth-pass',pw); L.click('#auth-submit'); L.wait_for_timeout(3000); print('primero:', L.evaluate("document.getElementById('sheet-title').textContent")); L.evaluate('closeSheet()'); L.wait_for_timeout(3800)
    print('prompt:', L.evaluate("document.getElementById('sheet').classList.contains('show') && document.getElementById('sheet-title').textContent")); shot(L,'prompt')
    L.click('#rv-ok'); L.wait_for_timeout(2500); print('activo:',[ (l['role'],l['status']) for l in sb.links if l['client']=='uid-luis.perez'], 'sync', L.evaluate("syncOn()"))
    # otro por código y uno más: el tercero choca con el límite (2)
    N.evaluate("_sp.slots=null"); N.click('#sp-invite2'); N.wait_for_timeout(900); N.click('[data-add="new"]'); N.wait_for_timeout(400); N.fill('#ca-user','mario.r'); N.click('#sheet-save'); N.wait_for_timeout(1200); N.evaluate("closeSheet()")
    N.click('#sp-invite2'); N.wait_for_timeout(1200); print('lleno:', N.inner_text('#sheet-body')[:200].replace('\n',' | ')); shot(N,'lleno')
    print('crear igual:', N.evaluate("fetch(SB_URL+'/functions/v1/athletes',{method:'POST',headers:sbHeaders(),body:'{}'}).then(()=>1)"))
    # admin ve límite y quién creó
    sb.add('gabo','secreta9',True,['coach'],'Gabo')
    G=ctx2(b,SEED); G.fill('#auth-user','gabo'); G.fill('#auth-pass','secreta9'); G.click('#auth-submit'); G.wait_for_timeout(1500); G.evaluate("closeSheet()"); G.evaluate("openAuthUsers()"); G.wait_for_timeout(1200); shot(G,'admin')
    print('errs',N.errs,L.errs,G.errs)
