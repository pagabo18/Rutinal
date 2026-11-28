from playwright.sync_api import sync_playwright
import os
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/zm_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.evaluate("()=>{const all=gymRoutines(); all[0].exercises[0].dbId='Barbell_Bench_Press_-_Medium_Grip'; saveGymRoutines(all)}")
    pg.evaluate("loadGymDb()"); pg.wait_for_timeout(1500)
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(800)
    print('foto grande en la tarjeta:', pg.evaluate("document.querySelector('.gym-ex-hero img').getBoundingClientRect().height"))
    pg.evaluate("applyTheme('dark')"); pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(1200); shot(pg,'0_tarjeta')
    pg.evaluate("applyTheme('light')"); pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(1200); shot(pg,'0_tarjeta_claro')
    pg.click('.gym-ex-hero'); pg.wait_for_timeout(700)
    pg.click('.gym-big-media img'); pg.wait_for_timeout(400); print('desde instrucciones:', pg.locator('.imgv.show').count())
    pg.click('.imgv-x'); pg.wait_for_timeout(400); print('cerrar con X:', pg.locator('.imgv').count(), '| hoja:', pg.evaluate("document.getElementById('sheet').classList.contains('show')"))
    # en la lista de reemplazo, tocar la miniatura no elige el ejercicio
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(500)
    pg.click('[data-gym-swap]'); pg.wait_for_timeout(900)
    n=pg.locator('.gym-res img.gym-media').count(); print('resultados con foto:', n)
    if n:
        pg.locator('.gym-res img.gym-media').first.click(); pg.wait_for_timeout(400)
        print('visor desde lista:', pg.locator('.imgv.show').count(), '| sin reemplazar:', pg.evaluate("JSON.stringify((gymLogs()[keyDate()]||{}).swap||{})"))
    print('errs', pg.errs)
