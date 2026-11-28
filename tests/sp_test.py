import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEED2="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Hipertrofia A',exercises:[{id:'x1',name:'Press banca',sets:3,reps:'8-10'},{id:'x2',name:'Remo',sets:3,reps:'10'}]}]));}"""%lang
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
sec=lambda pg,t: pg.evaluate("document.getElementById('tab-%s').innerText.replace(/\\n+/g,' | ')"%t)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    I=ctx2(b,SEED2); I.fill('#auth-user','carlos-coach'); I.fill('#auth-pass','secreta2'); I.click('#auth-submit'); I.wait_for_timeout(1200)
    print('1 al entrar:',I.inner_text('#sheet-title'),'| barra',I.evaluate("getComputedStyle(document.getElementById('mode-bar')).display")); I.screenshot(path='/tmp/t/sp_%s_who.png'%lang)
    I.click('[data-who="spec"]'); I.wait_for_timeout(700)
    print('2 inicio:',sec(I,'sp-home')[:230],'| nav',I.evaluate("[...document.querySelectorAll('nav button')].filter(b=>getComputedStyle(b).display!=='none').map(b=>b.textContent.trim())"))
    I.click('#sp-invite'); I.wait_for_timeout(600); (I.click('[data-add="code"]') if I.locator('[data-add="code"]').count() else None); I.wait_for_timeout(400); (I.click('#sheet-save') if (I.locator('#sheet-save').is_visible() and not I.locator('.lk-code').count()) else None); I.wait_for_timeout(600); code=I.inner_text('.lk-code'); I.evaluate("closeSheet()")
    A=new_ctx(b,lang,True); login(A,'ana','secreta1',True); print('3 ana sin barra:',A.evaluate("getComputedStyle(document.getElementById('mode-bar')).display"))
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700)
    I.evaluate("_sp.at=0"); I.click('nav button[data-tab="sp-home"]'); I.wait_for_timeout(700); print('4 inicio con entrenado:',sec(I,'sp-home')[:300]); I.screenshot(path='/tmp/t/sp_%s_home.png'%lang)
    I.click('nav button[data-tab="sp-clients"]'); I.wait_for_timeout(600); print('5 lista:',sec(I,'sp-clients')[:200]); I.screenshot(path='/tmp/t/sp_%s_roster.png'%lang)
    I.fill('#sp-q','zzz'); I.wait_for_timeout(500); e1=I.inner_text('#sp-list'); I.fill('#sp-q','ana'); I.wait_for_timeout(500); print('6 búsqueda:',e1,'→',I.inner_text('#sp-list').replace('\n',' | ')[:60])
    I.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); I.wait_for_timeout(800); print('7 ficha planes:',sec(I,'sp-clients')[:260]); I.screenshot(path='/tmp/t/sp_%s_client.png'%lang)
    I.click('[data-sp-t="progress"]'); I.wait_for_timeout(300); print('8 progreso:',I.inner_text('#sp-tabbody').replace('\n',' | ')[:200]); I.screenshot(path='/tmp/t/sp_%s_progress.png'%lang)
    I.click('[data-sp-t="logs"]'); I.wait_for_timeout(300); print('9 registros:',I.inner_text('#sp-tabbody').replace('\n',' | ')[:120])
    # plantillas
    I.click('nav button[data-tab="sp-templates"]'); I.wait_for_timeout(600); I.click('#tab-sp-templates [data-tp-new="routine"]'); I.wait_for_timeout(300); I.click('#sheet-save'); I.wait_for_timeout(800)
    print('10 plantillas:',sec(I,'sp-templates')[:200],'| hoja abierta',I.evaluate("document.getElementById('sheet').classList.contains('show')")); I.screenshot(path='/tmp/t/sp_%s_tpl.png'%lang)
    I.click('#tab-sp-templates [data-tp-assign]'); I.wait_for_timeout(600); I.check('[data-as-c="0"]'); I.click('#sheet-save'); I.wait_for_timeout(800)
    I.click('nav button[data-tab="sp-clients"]'); I.wait_for_timeout(900); I.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); I.wait_for_timeout(900); I.click('[data-sp-t="plans"]'); I.wait_for_timeout(300); print('11 asignado en ficha:',I.inner_text('#sp-tabbody').replace('\n',' | ')[:120])
    I.click('#sp-c-assign'); I.wait_for_timeout(600); print('12 asignar desde ficha (hoja):',txt(I)[:110]); I.evaluate("closeSheet()")
    I.click('#sp-c-notes'); I.wait_for_timeout(500); I.fill('#nt-text','Bienvenida'); I.click('#nt-send'); I.wait_for_timeout(600); I.evaluate("closeSheet()")
    I.click('nav button[data-tab="sp-notes"]'); I.wait_for_timeout(700); print('13 notas:',sec(I,'sp-notes')[:160]); I.screenshot(path='/tmp/t/sp_%s_notes.png'%lang)
    # cambiar a entrenado y volver; recargar conserva modo
    I.click('#mode-bar button[data-mode-set=""]'); I.wait_for_timeout(400); n1=I.evaluate("[...document.querySelectorAll('nav button')].filter(b=>getComputedStyle(b).display!=='none').length"); I.click('#mode-bar button[data-mode-set="spec"]'); I.wait_for_timeout(500)
    I.reload(); I.wait_for_timeout(1200); print('14 modos:',n1,'botones de entrenado | tras recargar modo',I.evaluate("document.documentElement.dataset.mode"),'| pestaña',I.evaluate("document.querySelector('nav button.active').dataset.tab"))
    A.evaluate("closeSheet(); asgRefresh(true)"); A.wait_for_timeout(900); print('15 ana recibe:',A.evaluate("document.getElementById('asg-card').innerText.replace(/\\n+/g,' | ')"))
    print('errors',I.errs,A.errs)
    b.close()
