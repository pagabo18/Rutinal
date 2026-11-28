from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
sb.add('gabo','secreta9',True,['coach'],'Gabo'); sb.rec_none=True
SEED="localStorage.setItem('rutinal_lang','es');"
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/r_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    A=ctx2(b,SEED); A.fill('#auth-user','ana'); A.fill('#auth-pass','secreta1'); shot(A,'gate'); A.click('#auth-submit'); A.wait_for_timeout(7500); print('omitido con otra hoja abierta:',A.evaluate("localStorage.getItem('__rc_ask')")); A.evaluate('closeSheet()'); A.evaluate('recoveryNudge()'); A.wait_for_timeout(900)
    print('nudge abierto:',A.evaluate("document.getElementById('sheet').classList.contains('show') && document.getElementById('sheet-title').textContent")); shot(A,'nudge')
    A.click('#rc-new'); A.wait_for_timeout(700); code=A.inner_text('#rc-code'); print('codigo',len(code),code.count('-')); shot(A,'codigo')
    A.evaluate("closeSheet()"); A.evaluate("openRecoveryCode()"); A.wait_for_timeout(600); shot(A,'estado')
    A.evaluate("closeSheet()"); A.evaluate("document.getElementById('btn-acct-logout').click()"); A.wait_for_timeout(900)
    A.click('#auth-forgot'); A.wait_for_timeout(300); A.fill('#rec-user','ana'); A.fill('#rec-code','AAAA-BBBB-CCCC-DDDD'); A.fill('#rec-pass','nuevaclave1'); A.click('#rec-submit'); A.wait_for_timeout(700); print('mal:',A.inner_text('#rec-msg')); shot(A,'rec_mal')
    A.fill('#rec-code',code.lower().replace('-',' ')); A.click('#rec-submit'); A.wait_for_timeout(700); print('ok:',A.inner_text('#auth-msg'),'| pass',sb.users['ana']['pass'],'| codigo consumido',('ana' not in sb.rec))
    A.fill('#auth-pass','nuevaclave1'); A.click('#auth-submit'); A.wait_for_timeout(1500); print('entra',A.evaluate("document.documentElement.classList.contains('auth-ok')"))
    # sin código: aviso al admin
    B=ctx2(b,SEED); B.click('#auth-forgot'); B.fill('#rec-user','carlos-coach'); B.click('#rec-nocode'); B.wait_for_timeout(800); print('aviso:',B.inner_text('#rec-msg'),sb.asked); shot(B,'aviso')
    G=ctx2(b,SEED); G.fill('#auth-user','gabo'); G.fill('#auth-pass','secreta9'); G.click('#auth-submit'); G.wait_for_timeout(1500); G.evaluate("closeSheet()"); G.evaluate("localStorage.setItem('__rc_ask','gabo')")
    G.evaluate("openAuthUsers()"); G.wait_for_timeout(1200); shot(G,'admin'); print('insignia',G.locator('.usr-badge.off',has_text='Pidió').count())
    G.locator('[data-usr]').first.click(); G.wait_for_timeout(400); G.fill('#ue-pass','temporal123'); G.click('#sheet-save'); G.wait_for_timeout(1200); print('atendido',sb.asked, sb.users['carlos-coach']['pass'])
    print('errs',A.errs,B.errs,G.errs)
