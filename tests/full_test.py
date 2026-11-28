import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); SEED3=None
exec(src[src.index('SEED3='):src.index('body=lambda')].replace('%lang',"%'es'"))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale='es'); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.add_init_script("localStorage.setItem('hoy_prog_open','1')"); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    h0=pg.evaluate("history.length")
    pg.click('[data-hd-start]'); pg.wait_for_timeout(700); pg.screenshot(path='/tmp/t/fs_wo.png')
    r=pg.evaluate("(()=>{const r=document.getElementById('sheet').getBoundingClientRect();return [r.top,r.height,innerHeight]})()"); print('1 hoja cubre:',r,'hist',h0,'→',pg.evaluate("history.length"))
    pg.go_back(); pg.wait_for_timeout(500); print('2 atrás cierra:',pg.evaluate("document.getElementById('sheet').classList.contains('show')"),'| sigue en la app',pg.url[-10:])
    pg.click('[data-hd-weight]'); pg.wait_for_timeout(500); pg.screenshot(path='/tmp/t/fs_peso.png')
    pg.click('#sheet-close'); pg.wait_for_timeout(500); print('3 flecha cierra:',pg.evaluate("document.getElementById('sheet').classList.contains('show')"),'hist',pg.evaluate("history.length"))
    # cerrar y abrir otra en el mismo instante
    pg.click('[data-hd-weight]'); pg.wait_for_timeout(300); pg.evaluate("closeSheet(); openWeightQuick()"); pg.wait_for_timeout(500); print('4 cerrar+abrir seguido queda abierta:',pg.evaluate("document.getElementById('sheet').classList.contains('show')"))
    pg.go_back(); pg.wait_for_timeout(400); print('  atrás cierra:',pg.evaluate("document.getElementById('sheet').classList.contains('show')"))
    pg.click('#fab'); pg.wait_for_timeout(600); pg.screenshot(path='/tmp/t/fs_fab.png'); print('5 fab:',pg.inner_text('#sheet-title'))
    pg.evaluate("closeSheet()"); pg.wait_for_timeout(300)
    pg.evaluate("document.documentElement.setAttribute('data-theme','dark')"); pg.click('[data-hd-start]'); pg.wait_for_timeout(700); pg.screenshot(path='/tmp/t/fs_wo_dark.png'); pg.evaluate("closeSheet()"); pg.wait_for_timeout(300)
    pg.evaluate("document.querySelector('nav button[data-tab=\"comida\"]').click()"); pg.wait_for_timeout(500)
    print('errors',pg.errs); b.close()
