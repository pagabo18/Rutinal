import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
body=lambda pg: pg.evaluate("document.getElementById('sheet-body').innerText.replace(/\\n+/g,' | ')")
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    I=ctx2(b,"localStorage.setItem('rutinal_lang','%s');"%lang); I.fill('#auth-user','carlos-coach'); I.fill('#auth-pass','secreta2'); I.click('#auth-submit'); I.wait_for_timeout(1200); I.click('[data-who="spec"]'); I.wait_for_timeout(700)
    I.click('#sp-invite'); I.wait_for_timeout(600); (I.click('[data-add="code"]') if I.locator('[data-add="code"]').count() else None); I.wait_for_timeout(400); (I.click('#sheet-save') if (I.locator('#sheet-save').is_visible() and not I.locator('.lk-code').count()) else None); I.wait_for_timeout(600); code=I.inner_text('.lk-code'); I.evaluate("closeSheet()")
    A=new_ctx(b,lang,True); login(A,'ana','secreta1',True)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700); A.evaluate("closeSheet()")
    # --- editor de rutina como plantilla ---
    I.click('nav button[data-tab="sp-templates"]'); I.wait_for_timeout(600); I.click('#tab-sp-templates [data-tp-new="routine"]'); I.wait_for_timeout(300); I.click('#te-new-routine'); I.wait_for_timeout(400)
    print('R1 editor:',I.inner_text('#sheet-title'),'| días ocultos',I.locator('#ge-days').count()==0)
    I.fill('#ge-name','Torso A'); I.evaluate("gymEditorSync(); _gymEdit.exercises.push({id:'n1',name:'Press militar',sets:[{count:3,reps:'10',note:''}],circuit:null}); _gymEdit._open='n1'; gymDrawEditor(true)"); I.wait_for_timeout(300); I.fill('.ge-ex [data-f="sets"]','3x8-10'); I.fill('.ge-ex [data-f="loads"]','30, 30, 32.5'); I.click('#sheet-save'); I.wait_for_timeout(900)
    print('R2 plantilla:',I.evaluate("document.getElementById('tab-sp-templates').innerText.replace(/\\n+/g,' | ')")[:150],'| en mi Gym',I.evaluate("gymRoutines().length"))
    I.click('#tab-sp-templates [data-tp-assign]'); I.wait_for_timeout(600); I.check('[data-as-c="0"]'); I.click('#sheet-save'); I.wait_for_timeout(900)
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(900); print('R3 ana:',A.evaluate("JSON.stringify(gymRoutines().filter(r=>r.assigned).map(r=>[r.name,r.exercises.map(e=>[e.name,e.sets,e.loads])]))"))
    A.evaluate("(()=>{const r=gymRoutines().find(r=>r.assigned);const l=gymLogs();l[keyDate()]={routineId:r.id,ex:{[r.exercises[0].id]:[{kg:'30',reps:'9',done:true}]}};S.set('gym_logs',l);})()")
    I.evaluate("_sp.at=0"); I.click('nav button[data-tab="sp-clients"]'); I.wait_for_timeout(900); I.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); I.wait_for_timeout(900)
    I.click('[data-asg-rt]'); I.wait_for_timeout(400); print('R4 editar copia:',I.inner_text('#sheet-title'),'|',I.inner_text('.gym-editor .lk-d'))
    I.evaluate("gymEditorSync(); _gymEdit.exercises.push({id:'n2',name:'Remo',sets:[{count:4,reps:'10',note:''}],circuit:null}); gymDrawEditor(false)"); I.wait_for_timeout(300); I.click('#sheet-save'); I.wait_for_timeout(1000)
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(900); print('R5 ana tras edición:',A.evaluate("JSON.stringify(gymRoutines().filter(r=>r.assigned).map(r=>r.exercises.map(e=>e.name)))"),'| registro intacto',A.evaluate("JSON.stringify(Object.values(gymLogs()[keyDate()].ex)[0])"),'| mismo id',A.evaluate("gymLogs()[keyDate()].routineId===gymRoutines().find(r=>r.assigned).id"))
    # --- agenda ---
    I.click('#sp-c-appt'); I.wait_for_timeout(700); I.fill('#ap-title','Revisión mensual'); I.fill('#ap-time','23:55'); I.click('#sheet-save'); I.wait_for_timeout(1200)
    print('A1 agenda coach:',body(I)[:260]); I.screenshot(path='/tmp/t/agenda_%s.png'%lang); I.evaluate("closeSheet()")
    I.click('nav button[data-tab="sp-home"]'); I.wait_for_timeout(700); print('A2 inicio coach:',I.evaluate("document.getElementById('tab-sp-home').innerText.replace(/\\n+/g,' | ')")[:330])
    A.evaluate("msgRefresh(true)"); A.wait_for_timeout(1200); A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(400); print('A3 ana Hoy:',A.evaluate("(document.querySelector('[data-hd-agenda]')||{}).innerText||'—'").replace('\n',' | '),'| chat:',A.evaluate("JSON.stringify(Object.values(msgCache().last).map(x=>x.body))")[:90])
    A.click('[data-hd-agenda]'); A.wait_for_timeout(900); A.click('[data-ag-open]'); A.wait_for_timeout(400); A.click('#ap-cancel'); A.wait_for_timeout(1000); print('A4 ana cancela:',body(A)[-110:]); A.evaluate("closeSheet()")
    # --- fotos ---
    A.click('nav button[data-tab="mas"]'); A.click('[data-mas="photos"]'); A.wait_for_timeout(700); print('F1 vacío:',body(A)[-80:])
    A.set_input_files('#ph-file','/tmp/t/foto1.jpg'); A.wait_for_timeout(1500); A.check('#ph-share'); A.set_input_files('#ph-file','/tmp/t/foto2.jpg'); A.wait_for_timeout(1800)
    print('F2 dos fotos:',A.locator('.ph-t').count(),'| compartidas',A.locator('.ph-t i').count(),'| cargadas',A.evaluate("[...document.querySelectorAll('.ph-grid img')].filter(i=>i.naturalWidth>0).length"),'| tamaño subido',A.evaluate("(async()=>{const i=document.querySelector('.ph-grid img');return i.naturalWidth+'x'+i.naturalHeight})()")); A.screenshot(path='/tmp/t/fotos_%s.png'%lang)
    I.evaluate("_sp.at=0"); I.click('nav button[data-tab="sp-clients"]'); I.wait_for_timeout(900)
    if I.locator('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]').count(): I.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); I.wait_for_timeout(900)
    I.click('[data-sp-t="progress"]'); I.wait_for_timeout(1200); print('F3 coach ve:',I.locator('#sp-photos .ph-t').count(),'| cargadas',I.evaluate("[...document.querySelectorAll('#sp-photos img')].filter(i=>i.naturalWidth>0).length"))
    A.click('[data-ph-open="0"]'); A.wait_for_timeout(600); A.click('#pv-del'); A.wait_for_timeout(1200); print('F4 tras borrar:',A.locator('.ph-t').count())
    # --- resumen semanal ---
    A.evaluate("closeSheet()"); A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(500); print('S1 semana:',A.evaluate("[...document.querySelectorAll('.hd-card')].map(c=>c.innerText.replace(/\\n+/g,' | ')).filter(x=>/SEMANA|WEEK/i.test(x)).join('')")); A.screenshot(path='/tmp/t/semana_%s.png'%lang, full_page=True)
    print('errors',I.errs,A.errs); b.close()
