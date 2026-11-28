import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEEDN="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Fuerza',createdAt:Date.now(),exercises:[{id:'x1',name:'Press',sets:[{count:3,reps:'8'}]}]}]));}"""%lang
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
body=lambda pg: pg.evaluate("document.getElementById('sheet-body').innerText.replace(/\\n+/g,' | ')")
sec=lambda pg,t: pg.evaluate("document.getElementById('tab-%s').innerText.replace(/\\n+/g,' | ')"%t)
sb.users['nora']['specs']=['coach','nutriologo']
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); (N.click('[data-add="code"]') if N.locator('[data-add="code"]').count() else None); N.wait_for_timeout(400); print('1 invitar:',body(N)[:150],'| botón',N.inner_text('#sheet-save')); N.click('#sheet-save'); N.wait_for_timeout(600)
    print('2 código:',body(N)[:40],'|',N.evaluate("[...document.querySelectorAll('#sheet-body .usr-badge')].map(x=>x.innerText).join('+')")); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=new_ctx(b,lang,True); login(A,'ana','secreta1',True)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); print('3 vista previa:',body(A)[:230]); A.click('#lk-accept'); A.wait_for_timeout(900)
    print('4 mis especialistas:',body(A)[:230],'| filas',A.locator('[data-lk-notes]').count()); A.evaluate("closeSheet()"); A.wait_for_timeout(500)
    A.evaluate("msgRefresh(true)"); A.wait_for_timeout(700); print('5 Hoy mensajes:',A.inner_text('.hd-chat').replace('\n',' | '),'| filas',A.locator('[data-hd-chat]').count())
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); print('6 lista:',sec(N,'sp-clients')[:200],'| filas',N.locator('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]').count())
    N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(1000); print('7 ficha:',sec(N,'sp-clients')[:140])
    N.click('[data-sp-t="progress"]'); N.wait_for_timeout(500); t=N.inner_text('#sp-tabbody').replace('\n',' | '); print('8 progreso tiene nutri y gym:','DÍAS CON COMIDAS' in t.upper(), 'ENTRENAMIENTOS' in t.upper())
    N.click('#sp-c-assign'); N.wait_for_timeout(600); print('9 tipos asignables:',N.evaluate("[...document.querySelectorAll('[data-tp-new]')].map(b=>b.dataset.tpNew).join(',')")); N.evaluate("closeSheet()")
    # plantilla de rutina (coach) y metas (nutri) al mismo entrenado
    N.click('nav button[data-tab="sp-templates"]'); N.wait_for_timeout(600); N.click('#tab-sp-templates [data-tp-new="targets"]'); N.wait_for_timeout(300); N.fill('#te-name','Metas'); N.fill('#te-kcal','2100'); N.fill('#te-p','150'); N.click('#sheet-save'); N.wait_for_timeout(800)
    N.click('#tab-sp-templates [data-tp-new="routine"]'); N.wait_for_timeout(300); N.click('#sheet-save'); N.wait_for_timeout(800)
    for i in range(2):
        N.locator('#tab-sp-templates [data-tp-assign]').nth(i).click(); N.wait_for_timeout(600); N.check('[data-as-c="0"]'); N.click('#sheet-save'); N.wait_for_timeout(900)
    print('10 asignaciones por rol:',sorted((r['kind'],r['role']) for r in sb.tables['assignments']))
    A.evaluate("asgRefresh(true); msgRefresh(true)"); A.wait_for_timeout(1000); A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(300); A.click('[data-hd-chat="0"]'); A.wait_for_timeout(900)
    print('11 un solo chat con todo:',A.evaluate("document.getElementById('nt-list').innerText.replace(/\\n+/g,' | ')")[:230],'| insignias',A.evaluate("[...document.querySelectorAll('.chat-sub .usr-badge')].map(x=>x.innerText).join('+')"))
    A.fill('#nt-text','Gracias por los dos planes'); A.click('#nt-send'); A.wait_for_timeout(700); A.screenshot(path='/tmp/t/multi_chat.png'); A.evaluate("closeSheet()")
    N.click('nav button[data-tab="sp-notes"]'); N.wait_for_timeout(900); print('12 mensajes especialista:',sec(N,'sp-notes')[:170],'| filas',N.locator('[data-sp-note]').count()); N.screenshot(path='/tmp/t/multi_lista.png')
    # agregar servicio después: ivan coach ya... usamos nora de nuevo con invitación de un solo rol → no duplica
    print('13 vínculos en servidor:',sorted((l['role'],l['status']) for l in sb.links))
    A.evaluate("openLinks()"); A.wait_for_timeout(600); A.click('[data-lk-stop]'); A.wait_for_timeout(500); print('14 elegir servicio:',body(A)[:200]); A.click('[data-end-role="nutriologo"]'); A.wait_for_timeout(1200)
    print('15 quitó solo nutriólogo:',sorted((l['role'],l['status']) for l in sb.links),'|',body(A)[:90],'| metas asignadas terminadas',[r['status'] for r in sb.tables['assignments'] if r['kind']=='targets'])
    A.evaluate("closeSheet()"); A.wait_for_timeout(300)
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(900); N.click('#sp-c-end'); N.wait_for_timeout(900); print('16 con un servicio termina directo:',sorted((l['role'],l['status']) for l in sb.links))
    # peso en lb en perfil y tendencias
    A.evaluate("S.set('body_unit','lb'); openNutriTrends()"); A.wait_for_timeout(600); print('17 tendencias lb:',A.get_attribute('#trend-weight','placeholder')); A.fill('#trend-weight','171'); A.click('#trend-weight-save'); A.wait_for_timeout(500); print('   guardado kg:',A.evaluate("S.get('weight_log',{})[keyDate()]"),'perfil',A.evaluate("nutriProfile().weightKg"))
    print('errors',N.errs,A.errs); b.close()
