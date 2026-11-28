from playwright.sync_api import sync_playwright
import os
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
FAKE="window.__bars=[]; window.Android={ setSystemBars(c,d){ window.__bars.push([c,d]); } };"
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/nt_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.add_init_script(FAKE); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(700)
    print('pista:', pg.locator('.gym-set-hint').count(), '| comentario ejercicio:', pg.locator('[data-ex-note="x1"]').count())
    row='.gym-set[data-ex="x1"][data-i="0"]'
    pg.fill(row+' [data-f="kg"]','60'); pg.fill(row+' [data-f="reps"]','8'); pg.click(row+' .gym-check'); pg.wait_for_timeout(500)
    pg.evaluate("document.querySelector('[data-set-pain-x]')?.click()"); pg.wait_for_timeout(300)
    pg.click(row+' .gym-set-target'); pg.wait_for_timeout(400)
    print('campo de la serie:', pg.locator('[data-set-note="x1:0"]').count())
    pg.fill('[data-set-note="x1:0"]','Usé la barra corta, la otra estaba ocupada'); pg.wait_for_timeout(200)
    print('foco se mantiene:', pg.evaluate("document.activeElement && document.activeElement.dataset.setNote"))
    pg.screenshot(path='/tmp/g/nt_1_serie.png')
    pg.click(row+' .gym-set-target'); pg.wait_for_timeout(400)
    print('nota visible:', pg.locator(row+' + .set-note').inner_text() if pg.locator('.set-note').count() else None)
    pg.fill('[data-ex-note="x1"]','Sentí el hombro derecho raro al bajar'); pg.wait_for_timeout(300)
    pg.evaluate("document.querySelector('[data-ex-note=\"x1\"]').scrollIntoView({block:'center'})"); pg.wait_for_timeout(300); pg.screenshot(path='/tmp/g/nt_2_ejercicio.png')
    lg=pg.evaluate("gymLogs()[keyDate()]"); print('guardado:', lg['ex']['x1'][0].get('note'), '|', lg.get('exNote'))
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(600); print('al reabrir:', pg.input_value('[data-ex-note="x1"]'))
    pg.evaluate("openDaySummary(keyDate(),{mode:'gym'})"); pg.wait_for_timeout(900)
    print('resumen:', [x.replace('\n',' ') for x in pg.locator('.dr-cm').all_inner_texts()])
    pg.evaluate("document.querySelector('.dr-cm').scrollIntoView({block:'center'})"); pg.wait_for_timeout(300); pg.screenshot(path='/tmp/g/nt_3_resumen.png')
    print('texto:', pg.evaluate("dayReportText(dayData(localDayD(), keyDate()))").replace('\n',' | ')[:300])
    print('registro:', pg.evaluate("exLogIndex(localDayD())[0].sessions.slice(-1)[0].note"), '|', pg.evaluate("exLogIndex(localDayD())[0].sessions.slice(-1)[0].sets[0].note"))
    pg.evaluate("dayImageCanvas(dayData(localDayD(), keyDate()), 'gym', 'Ana')")
    # borrar el comentario
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(500); pg.fill('[data-ex-note="x1"]',''); pg.wait_for_timeout(200)
    print('borrado:', pg.evaluate("JSON.stringify(gymLogs()[keyDate()].exNote)"))
    print('errs', pg.errs)
