import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
vis=lambda pg: pg.evaluate("[...document.querySelectorAll('nav button')].filter(b=>getComputedStyle(b).display!=='none').sort((a,b)=>(+getComputedStyle(a).order)-(+getComputedStyle(b).order)).map(b=>b.textContent.trim()+(b.classList.contains('active')||b.classList.contains('sub')?'*':''))")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=new_ctx(b,lang,True); login(pg,'ana','secreta1',False)
    print('1 barra:',vis(pg))
    pg.click('nav button[data-tab="mas"]'); pg.wait_for_timeout(400); print('2 más:',pg.evaluate("document.getElementById('tab-mas').innerText.replace(/\\n+/g,' | ')")); pg.screenshot(path='/tmp/t/mas_%s.png'%lang, full_page=True)
    pg.click('[data-mas="pomo"]'); pg.wait_for_timeout(400); print('3 reloj:',pg.evaluate("document.querySelector('main section.active').id"),vis(pg)); pg.screenshot(path='/tmp/t/mas_%s_reloj.png'%lang)
    pg.click('#tab-pomo [data-mas-back]'); pg.wait_for_timeout(300); print('4 regreso:',pg.evaluate("document.querySelector('main section.active').id"))
    pg.click('[data-mas="nutri"]'); pg.wait_for_timeout(400); print('5 nutrición:',pg.evaluate("document.querySelector('main section.active').id"),pg.evaluate("document.querySelector('#edit-mode .chip.selected').dataset.v"))
    pg.click('#tab-editar [data-mas-back]'); pg.wait_for_timeout(300); pg.click('.mas-profile'); pg.wait_for_timeout(400); print('6 perfil → ajustes:',pg.evaluate("document.querySelector('#edit-mode .chip.selected').dataset.v"),'|',pg.inner_text('#acct-user').replace('\n',' | '))
    pg.click('nav button[data-tab="mas"]'); pg.click('[data-mas="links"]'); pg.wait_for_timeout(500); print('7 vínculos:',pg.inner_text('#sheet-title')); pg.evaluate("closeSheet()")
    pg.click('nav button[data-tab="comida"]'); pg.wait_for_timeout(300); pg.click('#food-goals-link'); pg.wait_for_timeout(400); print('8 editar metas desde Comida:',pg.evaluate("document.querySelector('main section.active').id"),vis(pg))
    pg.click('nav button[data-tab="hoy"]'); pg.wait_for_timeout(300); print('9 hoy:',vis(pg))
    pg.set_viewport_size({'width':1200,'height':800}); pg.wait_for_timeout(300); print('10 escritorio:',vis(pg))
    I=new_ctx(b,lang,False); I.fill('#auth-user','carlos-coach'); I.fill('#auth-pass','secreta2'); I.click('#auth-submit'); I.wait_for_timeout(1200); I.click('[data-who="spec"]'); I.wait_for_timeout(600)
    print('11 especialista:',vis(I)); I.click('nav button[data-tab="mas"]'); I.wait_for_timeout(300); print('   más:',I.evaluate("document.querySelector('main section.active').id"),vis(I)); I.screenshot(path='/tmp/t/mas_spec.png')
    print('errors',pg.errs,I.errs); b.close()
