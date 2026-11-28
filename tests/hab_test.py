from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False); pg.wait_for_timeout(800)
    pg.screenshot(path='/tmp/g/hab_1_hoy.png', full_page=False)
    print('en Hoy: bloques', pg.locator('#tab-hoy #today-list').count(), '| imprevisto', pg.locator('#tab-hoy #impr-btn').count(), '| resumen hábitos', 'Hábitos' in pg.inner_text('#hoy-dash'))
    pg.click('nav button[data-tab="habitos"]'); pg.wait_for_timeout(700)
    print('en Hábitos: bloques', pg.locator('#tab-habitos #today-list .block, #tab-habitos #today-list > *').count(), '| imprevisto', pg.locator('#tab-habitos #impr-btn').count(), '| ahora', len(pg.inner_text('#now-wrap')))
    pg.evaluate("document.getElementById('today-list').scrollIntoView({block:'center'})"); pg.wait_for_timeout(300)
    pg.screenshot(path='/tmp/g/hab_2_habitos.png')
    pg.click('#add-block'); pg.wait_for_timeout(500); print('nuevo bloque abre:', pg.inner_text('#sheet-title'))
    pg.evaluate("closeSheet()"); pg.click('#impr-btn'); pg.wait_for_timeout(500); print('imprevisto abre:', pg.inner_text('#sheet-title'))
    print('errs', pg.errs)
