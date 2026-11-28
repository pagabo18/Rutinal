import sys, json
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang='es'
STUB="""localStorage.setItem('rutinal_lang','es');
window.__calls=[]; window.__on=false;
window.Android={chatEnable:j=>{window.__calls.push(['enable',JSON.parse(j)]);window.__on=true},chatDisable:()=>{window.__calls.push(['disable']);window.__on=false},chatEnabled:()=>window.__on,
  chatMeta:j=>window.__calls.push(['meta',JSON.parse(j)]),chatSeen:i=>window.__calls.push(['seen',i])};"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(STUB); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False); pg.wait_for_timeout(900)
    calls=pg.evaluate("window.__calls"); en=[x for x in calls if x[0]=='enable']
    js=pg.evaluate("JSON.parse(localStorage.getItem('__auth'))")
    print('1 al entrar:',[x[0] for x in calls],'| sesión aparte distinta:',bool(en) and en[0][1]['refresh']!=js['refresh'],'| campos',sorted(en[0][1].keys()) if en else None)
    print('  meta:',[x[1] for x in calls if x[0]=='meta'][-1:] )
    pg.click('nav button[data-tab="mas"]'); pg.click('[data-mas="ajustes"]'); pg.wait_for_timeout(400)
    print('2 ajustes:',pg.inner_text('#chat-bg-setting').replace('\n',' | ')[-60:]); pg.screenshot(path='/tmp/t/bg_ajustes.png')
    pg.click('#chat-bg-btn'); pg.wait_for_timeout(300); print('3 desactivar:',pg.inner_text('#chat-bg-status'),'|',pg.inner_text('#chat-bg-btn'),'| flag',pg.evaluate("localStorage.getItem('__chat_bg')"),'| llamadas',[x[0] for x in pg.evaluate("window.__calls")][-1:])
    pg.click('#chat-bg-btn'); pg.wait_for_timeout(300); pg.fill('#cb-pass','mala'); pg.click('#sheet-save'); pg.wait_for_timeout(500); print('4 contraseña mala:',pg.inner_text('#cb-msg'))
    pg.fill('#cb-pass','secreta1'); pg.click('#sheet-save'); pg.wait_for_timeout(700); print('5 activar:',pg.inner_text('#chat-bg-status'),'| flag',pg.evaluate("localStorage.getItem('__chat_bg')"),'| hoja abierta',pg.evaluate("document.getElementById('sheet').classList.contains('show')"))
    pg.evaluate("authEndSession('')"); pg.wait_for_timeout(300); print('6 al cerrar sesión:',[x[0] for x in pg.evaluate("window.__calls")][-1:],'on',pg.evaluate("window.__on"))
    # sin Android (PWA): no aparece
    c2=b.new_context(viewport={'width':400,'height':860},locale=lang); p2=c2.new_page(); p2.errs=[]; p2.on('pageerror',lambda e:p2.errs.append(str(e))); p2.on('dialog',lambda d:d.accept()); p2.route('**/*',sb.handle); p2.add_init_script("localStorage.setItem('rutinal_lang','es');"); p2.goto('http://localhost:8765/index.html'); p2.wait_for_timeout(600)
    login(p2,'ana','secreta1',False); p2.click('nav button[data-tab="mas"]'); p2.click('[data-mas="ajustes"]'); p2.wait_for_timeout(300); print('7 en navegador visible:',p2.evaluate("getComputedStyle(document.getElementById('chat-bg-setting')).display"))
    print('errors',pg.errs,p2.errs); b.close()
