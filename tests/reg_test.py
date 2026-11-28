from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
sb.add('gabo','secreta9',True,['coach','nutriologo','fisioterapeuta'],'Gabo')
SEED="localStorage.setItem('rutinal_lang','es');"
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=600): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/v_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    U=ctx2(b,SEED); shot(U,'acceso'); U.click('#auth-new'); U.wait_for_timeout(300)
    U.fill('#reg-name','Carla Ruiz'); U.fill('#reg-user','carla.ruiz'); U.fill('#reg-pass','corta'); U.click('#reg-submit'); U.wait_for_timeout(300); print('corta:',U.inner_text('#reg-msg'))
    U.fill('#reg-pass','unaclave123'); U.fill('#reg-email','carla@example.com'); U.click('#reg-submit'); U.wait_for_timeout(300); print('sin aviso:',U.inner_text('#reg-msg'))
    U.check('#reg-priv'); shot(U,'registro'); U.click('#reg-submit'); U.wait_for_timeout(2500)
    print('entro:',U.evaluate("document.documentElement.classList.contains('auth-ok')"),'perfil',U.evaluate("(authGet()||{}).user"))
    U.evaluate("closeSheet()"); U.wait_for_timeout(300)
    # solicitud de especialista
    U.evaluate("openSpecialistApply()"); U.wait_for_timeout(800); U.check('[data-ap="nutriologo"]'); U.fill('#ap-ced','12'); U.click('#sheet-save'); U.wait_for_timeout(400); print('cedula corta:',U.inner_text('#ap-msg'))
    U.fill('#ap-ced','1234567'); U.fill('#ap-cred','Lic. en Nutrición, UNAM'); shot(U,'solicitud'); U.click('#sheet-save'); U.wait_for_timeout(800); shot(U,'enviada')
    U.evaluate("openSpecialistApply()"); U.wait_for_timeout(800); print('estado:',U.inner_text('#sheet-body')[:80].replace('\n',' '))
    # administrador revisa
    G=ctx2(b,SEED); G.fill('#auth-user','gabo'); G.fill('#auth-pass','secreta9'); G.click('#auth-submit'); G.wait_for_timeout(1500); G.evaluate("closeSheet()"); G.evaluate("openAuthUsers()"); G.wait_for_timeout(1200); shot(G,'admin')
    G.click('[data-app="0"]'); G.wait_for_timeout(500); shot(G,'revision'); G.click('#rv-yes'); G.wait_for_timeout(1200); print('aprobada:',sb.users['carla.ruiz']['specs'], sb.ver.get('carla.ruiz'))
    shot(G,'admin2')
    # la nueva nutrióloga invita a ana; ana ve la insignia
    U.evaluate("authVerify && authVerify(true)"); U.wait_for_timeout(1200); U.evaluate("closeSheet()")
    code=U.evaluate("linkRpc('rutinal_invite_many',{p_roles:['nutriologo']}).then(r=>r.code)")
    A=ctx2(b,SEED); A.fill('#auth-user','ana'); A.fill('#auth-pass','secreta1'); A.click('#auth-submit'); A.wait_for_timeout(1500); A.evaluate("closeSheet()")
    A.evaluate("openLinks()"); A.wait_for_timeout(700); A.fill('#lk-code',code); A.evaluate("syncOn=()=>true"); A.click('#lk-go'); A.wait_for_timeout(1200); print('insignia:',A.inner_text('[data-badge]')); shot(A,'insignia')
    print('errs',U.errs,G.errs,A.errs)
