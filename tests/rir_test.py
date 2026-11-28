from playwright.sync_api import sync_playwright
import os
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
os.makedirs('/tmp/g',exist_ok=True)
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/pn_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang,device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    dialogs=[]; pg.on('dialog',lambda d:(dialogs.append(d.message), d.accept())); pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    # 1) dolor por serie
    pg.evaluate("openGymWorkout('rc1', keyDate())"); pg.wait_for_timeout(600)
    inp=pg.locator('.gym-set[data-ex="x1"][data-i="0"] .gym-in.rir'); inp.fill(''); inp.type('12'); pg.wait_for_timeout(300)
    print('campo:', inp.input_value(), '| guardado:', pg.evaluate("JSON.stringify((S.get('gym_logs')||{})[keyDate()].ex.x1[0].rir)"))
    inp.fill(''); inp.type('3'); pg.wait_for_timeout(200); print('normal:', inp.input_value())
    print('errs', errs if 'errs' in dir() else '')
