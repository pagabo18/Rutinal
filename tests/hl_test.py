from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
FAKE="window.__hl=[]; window.Android={ setHabitsLive(v){ window.__hl.push(v); }, setGymLive(){}, setSystemBars(){} };"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.add_init_script(FAKE); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False); pg.wait_for_timeout(3000)
    print('al arrancar:', pg.evaluate("window.__hl"))
    pg.evaluate("renderAjustes()"); pg.wait_for_timeout(300)
    print('ajuste visible:', pg.evaluate("getComputedStyle(document.getElementById('habits-live-setting')).display"), '| marcado:', pg.evaluate("document.getElementById('habits-live-toggle').checked"))
    pg.evaluate("(()=>{const t=document.getElementById('habits-live-toggle'); t.checked=true; t.dispatchEvent(new Event('change'))})()"); pg.wait_for_timeout(200)
    print('tras activar:', pg.evaluate("window.__hl"), pg.evaluate("S.get('habits_live_on')"))
    print('errs', errs)
