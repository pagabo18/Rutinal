import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEEDC="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Hipertrofia A',createdAt:Date.now(),exercises:[{id:'x1',name:'Press banca',sets:[{count:3,reps:'8-10'}]}]}]));}"""%lang
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
chat=lambda pg: pg.evaluate("document.getElementById('nt-list').innerText.replace(/\\n+/g,' | ')")
dots=lambda pg: pg.evaluate("[...document.querySelectorAll('nav button.has-dot')].map(b=>b.dataset.tab)")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    I=ctx2(b,SEEDC); I.fill('#auth-user','carlos-coach'); I.fill('#auth-pass','secreta2'); I.click('#auth-submit'); I.wait_for_timeout(1200); I.click('[data-who="spec"]'); I.wait_for_timeout(700)
    I.click('#sp-invite'); I.wait_for_timeout(600); (I.click('[data-add="code"]') if I.locator('[data-add="code"]').count() else None); I.wait_for_timeout(400); (I.click('#sheet-save') if (I.locator('#sheet-save').is_visible() and not I.locator('.lk-code').count()) else None); I.wait_for_timeout(600); code=I.inner_text('.lk-code'); I.evaluate("closeSheet()")
    A=new_ctx(b,lang,False); login(A,'ana','secreta1',True)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700); A.evaluate("closeSheet()"); A.wait_for_timeout(300)
    A.evaluate("msgRefresh(true)"); A.wait_for_timeout(700)
    print('1 ana Hoy:',A.inner_text('.hd-chat').replace('\n',' | '))
    # coach asigna rutina → aviso en chat
    I.click('nav button[data-tab="sp-templates"]'); I.wait_for_timeout(600); I.click('#tab-sp-templates [data-tp-new="routine"]'); I.wait_for_timeout(300); I.click('#sheet-save'); I.wait_for_timeout(800)
    I.click('#tab-sp-templates [data-tp-assign]'); I.wait_for_timeout(600); I.check('[data-as-c="0"]'); I.fill('#as-note','Empieza ligero esta semana'); I.click('#sheet-save'); I.wait_for_timeout(900)
    A.evaluate("asgRefresh(true); msgRefresh(true)"); A.wait_for_timeout(900)
    print('2 ana ve no leído:',A.inner_text('.hd-chat').replace('\n',' | '),'| punto en',dots(A))
    A.click('[data-hd-chat="0"]'); A.wait_for_timeout(800); print('3 chat de ana:',chat(A)); A.screenshot(path='/tmp/t/chat_ana1_%s.png'%lang)
    A.click('[data-nt-ref]'); A.wait_for_timeout(500); print('4 toca adjunto →',A.inner_text('#sheet-title')); A.evaluate("closeSheet()"); A.wait_for_timeout(400)
    A.click('[data-hd-chat="0"]'); A.wait_for_timeout(800)
    A.click('#nt-plus'); A.wait_for_timeout(200); print('5 elegir:',A.inner_text('#nt-pick').replace('\n',' | ')); A.click('[data-nt-pick="0"]'); A.wait_for_timeout(200); print('  chip:',A.inner_text('#nt-refchip').replace('\n',' '))
    A.fill('#nt-text','¿El press lo hago con barra o mancuernas?'); A.click('#nt-send'); A.wait_for_timeout(700)
    A.fill('#nt-text','Gracias'); A.click('#nt-send'); A.wait_for_timeout(700); print('6 ana envió:',chat(A)); A.screenshot(path='/tmp/t/chat_ana2_%s.png'%lang)
    A.click('#sheet-close'); A.wait_for_timeout(500); print('7 ana cierra, punto:',dots(A),'| hoja',A.evaluate("document.getElementById('sheet').classList.contains('show')"))
    # coach: no leído y responder
    I.evaluate("msgRefresh(true)"); I.wait_for_timeout(700); print('8 coach punto:',dots(I))
    I.click('nav button[data-tab="sp-notes"]'); I.wait_for_timeout(800); print('9 lista coach:',I.evaluate("document.getElementById('tab-sp-notes').innerText.replace(/\\n+/g,' | ')"),'| no leídos',I.evaluate("document.querySelectorAll('#tab-sp-notes .sp-row.unread').length")); I.screenshot(path='/tmp/t/chat_lista_%s.png'%lang)
    I.click('[data-sp-note="0"]'); I.wait_for_timeout(800); print('10 chat coach:',chat(I)[:300])
    I.fill('#nt-text','Con barra. Baja controlado.'); I.click('#nt-send'); I.wait_for_timeout(700); I.screenshot(path='/tmp/t/chat_coach_%s.png'%lang)
    # ana tiene el chat cerrado; abre y ve la respuesta por sondeo
    A.click('[data-hd-chat="0"]'); A.wait_for_timeout(900); print('11 ana ve respuesta:',chat(A)[-80:])
    I.click('#sheet-close'); I.wait_for_timeout(600); print('12 coach al cerrar: no leídos',I.evaluate("document.querySelectorAll('#tab-sp-notes .sp-row.unread').length"),'punto',dots(I))
    I.click('[data-sp-note="0"]'); I.wait_for_timeout(600); I.click('#nt-plus'); I.wait_for_timeout(700); print('13 + del coach abre:',I.inner_text('#sheet-title'))
    print('errors',I.errs,A.errs); b.close()
