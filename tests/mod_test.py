from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDA=SEEDA.replace("localStorage.setItem('gym_routines'","var sc={};sc[String(new Date().getDay())]='r1';localStorage.setItem('gym_schedule',JSON.stringify(sc));localStorage.setItem('gym_routines'")
SEEDN="""localStorage.setItem('rutinal_lang','es');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Fuerza A',createdAt:Date.now(),exercises:[{id:'x1',name:'Press banca',sets:[{count:3,reps:'8-10'}],loads:['60','60','62.5']},{id:'x2',name:'Remo con barra',sets:[{count:3,reps:'10'}]}]}]));}"""
sb.users['nora']['specs']=['coach','nutriologo']
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
n=[0]
def shot(pg,name,wait=500):
    pg.wait_for_timeout(wait); n[0]+=1; pg.screenshot(path='/tmp/shots/%02d_%s.png'%(n[0],name))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); shot(N,'acceso'); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); shot(N,'quien_eres_hoy'); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); (N.click('[data-add="code"]') if N.locator('[data-add="code"]').count() else None); N.wait_for_timeout(400); (N.click('#sheet-save') if (N.locator('#sheet-save').is_visible() and not N.locator('.lk-code').count()) else None); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); shot(A,'aceptar_invitacion'); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    # especialista prepara contenido
    N.click('nav button[data-tab="sp-templates"]'); N.wait_for_timeout(600); N.click('#tab-sp-templates [data-tp-new="routine"]'); N.wait_for_timeout(300); N.click('#sheet-save'); N.wait_for_timeout(800)
    N.click('#tab-sp-templates [data-tp-new="diet"]'); N.wait_for_timeout(300); N.click('#dk-menu'); N.wait_for_timeout(400); N.fill('#de-name','Plan definición')
    for meal,q,g in (('breakfast','avena',80),('breakfast','huevo',150),('lunch','pollo',200),('dinner','arroz',150)):
        N.click('[data-de-add="%s"]'%meal); N.wait_for_timeout(200); N.fill('#de-q',q); N.wait_for_timeout(1300); N.click('[data-de-pick="0"]'); N.wait_for_timeout(200)
        i=N.locator('[data-de-g^="%s:"]'%meal).count()-1; N.fill('[data-de-g="%s:%d"]'%(meal,i),str(g))
    shot(N,'esp_editor_dieta'); N.click('#sheet-save'); N.wait_for_timeout(900)
    for i in range(2):
        N.locator('#tab-sp-templates [data-tp-assign]').nth(i).click(); N.wait_for_timeout(600); N.check('[data-as-c="0"]'); N.fill('#as-note','Empieza ligero esta semana' if i==0 else 'Tu plan de esta etapa'); N.click('#sheet-save'); N.wait_for_timeout(900)
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(900)
    N.click('#sp-c-appt'); N.wait_for_timeout(600); N.fill('#ap-title','Revisión mensual'); N.fill('#ap-time','23:55'); N.click('#sheet-save'); N.wait_for_timeout(1200); N.evaluate("closeSheet()")
    N.evaluate("_sp.tab='assess'"); N.evaluate("spOpenClient(_sp.client)"); N.wait_for_timeout(1200)
    def antfill(vals,date):
        N.click('#ant-new'); N.wait_for_timeout(500)
        N.evaluate("document.querySelectorAll('.ant-ed details').forEach(d=>d.open=true)")
        N.evaluate("d=>{document.getElementById('ant-date').value=d}",date)
        for k,v in vals.items(): N.fill('[data-ant="%s"]'%k,str(v))
        N.wait_for_timeout(300)
    b1={'age':30,'weight':82,'height':178,'sk.triceps':'11 12 11','sk.biceps':6,'sk.subscapular':14,'sk.suprailiac':16,'sk.supraspinal':11,'sk.abdominal':21,'sk.chest':9,'sk.axilla':11,'sk.thigh':14,'sk.calf':8,
        'gi.neck':38,'gi.waist':88,'gi.hip':99,'gi.arm':33.5,'gi.armflex':36,'gi.thighg':56,'gi.calfg':37.5,'bd.humerus':7,'bd.femur':9.8,'rhr':62,'bpSys':118,'bpDia':76,'targetBf':12}
    antfill(b1,'2026-09-20'); N.click('#sheet-save'); N.wait_for_timeout(1500)
    b2=dict(b1); b2.update({'weight':80.5,'sk.triceps':'10 10 11','sk.subscapular':12,'sk.suprailiac':14,'sk.abdominal':18,'sk.thigh':12,'gi.waist':85,'gi.arm':34})
    antfill(b2,'2026-10-25'); N.click('#sheet-save'); N.wait_for_timeout(1500)
    b3=dict(b2); b3.update({'weight':79.6,'sk.triceps':'9 10 9','sk.subscapular':11,'sk.suprailiac':12,'sk.abdominal':16,'sk.chest':8,'gi.waist':83,'gi.arm':34.5,'gi.armflex':37})
    antfill(b3,'2026-11-22'); N.evaluate("document.getElementById('sheet-body').scrollTop=330"); N.wait_for_timeout(200); N.screenshot(path='/tmp/shots/x1_esp_eval_captura.png'); N.click('#sheet-save'); N.wait_for_timeout(1500)
    N.evaluate("document.getElementById('sp-assess').scrollIntoView()"); N.wait_for_timeout(300); N.screenshot(path='/tmp/shots/x2_esp_eval_perfil.png')
    N.evaluate("window.scrollBy(0,790)"); N.wait_for_timeout(250); N.screenshot(path='/tmp/shots/x3_esp_eval_metodos.png')
    N.evaluate("window.scrollBy(0,1560)"); N.wait_for_timeout(250); N.screenshot(path='/tmp/shots/x4_esp_eval_energia.png')
    N.evaluate("document.querySelector('.ant-sub').scrollIntoView()"); N.wait_for_timeout(250); N.screenshot(path='/tmp/shots/x5_esp_eval_evolucion.png')
    N.evaluate("window.scrollTo(0,0)")
    N.click('nav button[data-tab="sp-templates"]'); N.wait_for_timeout(700); N.click('#tab-sp-templates [data-tp-new="diet"]'); N.wait_for_timeout(400); N.screenshot(path='/tmp/shots/x6_esp_plan_tipos.png')
    N.click('#dk-pre'); N.wait_for_timeout(400); N.click('[data-dp-style="prot"]'); N.click('[data-dp-k="1800"]'); N.wait_for_timeout(300); N.screenshot(path='/tmp/shots/x7_esp_dietas_prehechas.png')
    N.click('#dp-use'); N.wait_for_timeout(500); N.screenshot(path='/tmp/shots/x8_esp_equivalentes.png'); N.evaluate("closeSheet()"); N.wait_for_timeout(300)
    N.evaluate("_sp.tab='plans'"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(700)
    # entrenado
    A.evaluate("asgRefresh(true); msgRefresh(true); antHoyRefresh(true)"); A.wait_for_timeout(1300)
    A.click('nav button[data-tab="mas"]'); A.wait_for_timeout(400); A.click('[data-mas="ajustes"]'); A.wait_for_timeout(600)
    A.evaluate("document.getElementById('mods-box').scrollIntoView({block:'start'});window.scrollBy(0,-90)"); A.wait_for_timeout(300); A.screenshot(path='/tmp/t/mod1.png')
    for k in ('habitos','pomo','cal','gymSimple'): A.click('[data-mod="%s"]'%k)
    A.wait_for_timeout(300); A.evaluate("window.scrollBy(0,240)"); A.wait_for_timeout(200); A.screenshot(path='/tmp/t/mod2.png')
    nav=A.evaluate("[...document.querySelectorAll('nav button')].filter(b=>b.offsetParent).map(b=>b.dataset.tab).join(',')")
    A.click('nav button[data-tab="mas"]'); A.wait_for_timeout(500); A.screenshot(path='/tmp/t/mod3.png')
    A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(500); A.click('[data-hd-start]'); A.wait_for_timeout(900); A.screenshot(path='/tmp/t/mod4.png')
    A.locator('[data-gym-quick]').first.click(); A.wait_for_timeout(500); A.screenshot(path='/tmp/t/mod5.png')
    lg=A.evaluate("JSON.stringify(Object.values(gymLogs()[keyDate()].ex)[0])")
    A.evaluate("closeSheet()"); A.wait_for_timeout(300); A.evaluate("modSet('comida',false);modSet('cuerpo',false)"); A.wait_for_timeout(500); A.evaluate("window.scrollTo(0,0)"); A.screenshot(path='/tmp/t/mod6.png')
    print('errs',A.errs,'nav',nav,'log',lg[:160]); b.close()
