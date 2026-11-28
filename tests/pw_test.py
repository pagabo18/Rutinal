# Contraseñas fáciles de adivinar: la app las rechaza al crear usuarios, cambiar la propia y crear atletas.
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
sb.add('gabo','secreta9',True,['coach'],'Gabo'); sb.rec_none=True
SEED="localStorage.setItem('rutinal_lang','es');"
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    G=ctx2(b,SEED)
    # 0) acceso: contraseña equivocada, entrar, y la sesión sigue tras recargar
    gate=lambda: G.evaluate("getComputedStyle(document.getElementById('auth-gate')).display")
    G.fill('#auth-user','gabo'); G.fill('#auth-pass','equivocada'); G.click('#auth-submit'); G.wait_for_timeout(700); print('0 contraseña mala →', G.inner_text('#auth-msg'), '| acceso visible:', gate()!='none')
    G.fill('#auth-pass','secreta9'); G.click('#auth-submit'); G.wait_for_timeout(1500); G.evaluate("closeSheet()"); G.evaluate("localStorage.setItem('__rc_ask','gabo')")
    print('  entra:', gate()=='none', '| sesión:', G.evaluate("(authGet()||{}).user"))
    G.reload(); G.wait_for_timeout(1500); G.evaluate("closeSheet()"); print('  tras recargar sigue dentro:', gate()=='none')
    # 1) administrador: usuario nuevo
    G.evaluate("openAuthUsers()"); G.wait_for_timeout(1000); G.click('#usr-new'); G.wait_for_timeout(400)
    gen=G.input_value('#ue-pass'); print('1 generada pasa:', G.evaluate("passWeak(%r,'lucia')"%gen)=='' , len(gen))
    G.fill('#ue-user','lucia'); G.fill('#ue-name','Lucía')
    for pw in ['corta','password1','lucia2026','12345678','Rutinal2026!']:
        G.fill('#ue-pass',pw); G.click('#sheet-save'); G.wait_for_timeout(250); print('  %-13s →'%pw, G.inner_text('#ue-msg')[:60], '| creada:', 'lucia' in sb.users)
    G.fill('#ue-pass','rio-claro-7-lunas'); G.click('#sheet-save'); G.wait_for_timeout(900); print('  buena → creada:', 'lucia' in sb.users)
    # 2) administrador: cambiarle la contraseña a alguien
    G.evaluate("closeSheet()"); G.evaluate("openAuthUsers()"); G.wait_for_timeout(1000); G.locator('[data-usr]').first.click(); G.wait_for_timeout(400)
    who=G.input_value('#ue-user'); old=sb.users[who]['pass']
    G.fill('#ue-pass','qwerty123'); G.click('#sheet-save'); G.wait_for_timeout(300); print('2 cambiar a qwerty123 →', G.inner_text('#ue-msg')[:60], '| sin cambio:', sb.users[who]['pass']==old)
    G.fill('#ue-pass',''); G.click('#sheet-save'); G.wait_for_timeout(700); print('  en blanco (no cambia la contraseña) → sin aviso:', sb.users[who]['pass']==old)
    # 3) cambiar la propia
    G.evaluate("closeSheet()"); G.evaluate("openAuthChangePass()"); G.wait_for_timeout(300)
    for pw in ['gabo1234','teamoteamo']:
        G.fill('#cp-old','secreta9'); G.fill('#cp-new',pw); G.fill('#cp-new2',pw); G.click('#sheet-save'); G.wait_for_timeout(300); print('3 propia %-10s →'%pw, G.inner_text('#cp-msg')[:60], '| sin cambio:', sb.users['gabo']['pass']=='secreta9')
    G.fill('#cp-new','faro-norte-314'); G.fill('#cp-new2','faro-norte-314'); G.click('#sheet-save'); G.wait_for_timeout(900); print('  buena → cambiada:', sb.users['gabo']['pass']=='faro-norte-314')
    # 4) recuperar con código: también se revisa antes de mandar
    A=ctx2(b,SEED); A.click('#auth-forgot'); A.wait_for_timeout(300); A.fill('#rec-user','ana'); A.fill('#rec-code','AAAA-BBBB-CCCC-DDDD'); A.fill('#rec-pass','ana12345'); A.click('#rec-submit'); A.wait_for_timeout(400); print('4 recuperar ana12345 →', A.inner_text('#rec-msg')[:60])
    # 5) especialista que le crea la cuenta a un atleta
    G.evaluate("closeSheet()"); G.wait_for_timeout(300); G.evaluate("spInvite()"); G.wait_for_timeout(900)
    if G.locator('[data-add="new"]').count(): G.click('[data-add="new"]'); G.wait_for_timeout(500)
    G.fill('#ca-user','pedro.gym'); G.fill('#ca-pass','gimnasio2026'); G.click('#sheet-save'); G.wait_for_timeout(300); print('5 atleta gimnasio2026 →', G.inner_text('#ca-msg')[:60], '| creada:', 'pedro.gym' in sb.users)
    print('errs',G.errs,A.errs)
