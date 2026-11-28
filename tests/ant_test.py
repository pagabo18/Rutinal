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
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.add_init_script("localStorage.setItem('hoy_prog_open','1')"); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
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
    def fill(vals,date):
        N.click('#ant-new'); N.wait_for_timeout(500)
        N.evaluate("document.querySelectorAll('.ant-ed details').forEach(d=>d.open=true)")
        N.evaluate("d=>{document.getElementById('ant-date').value=d}",date)
        for k,v in vals.items(): N.fill('[data-ant="%s"]'%k,str(v))
        N.wait_for_timeout(300)
    base={'age':30,'weight':82,'height':178,'sk.triceps':'11 12 11','sk.biceps':6,'sk.subscapular':14,'sk.suprailiac':16,'sk.supraspinal':11,'sk.abdominal':21,'sk.chest':9,'sk.axilla':11,'sk.thigh':14,'sk.calf':8,
          'gi.neck':38,'gi.waist':88,'gi.hip':99,'gi.arm':33.5,'gi.armflex':36,'gi.thighg':56,'gi.calfg':37.5,'bd.humerus':7,'bd.femur':9.8,'rhr':62,'bpSys':118,'bpDia':76,'targetBf':12,'bfDevice':19.8,'biaMuscle':62.1,'biaWater':56.2,'biaVisceral':8,'biaBone':3.2,'biaBmr':1840,'biaMetAge':32}
    fill(base,'2026-09-20'); N.click('#sheet-save'); N.wait_for_timeout(1500)
    b2=dict(base); b2.update({'bfDevice':18.9,'biaMuscle':62.6,'biaVisceral':7,'biaMetAge':30,'weight':80.5,'sk.triceps':'10 10 11','sk.subscapular':12,'sk.suprailiac':14,'sk.abdominal':18,'sk.thigh':12,'gi.waist':85,'gi.arm':34})
    fill(b2,'2026-10-25'); N.click('#sheet-save'); N.wait_for_timeout(1500)
    b3=dict(b2); b3.update({'bfDevice':18.1,'biaMuscle':62.9,'biaVisceral':7,'biaMetAge':29,'biaWater':57.0,'weight':79.6,'sk.triceps':'9 10 9','sk.subscapular':11,'sk.suprailiac':12,'sk.abdominal':16,'sk.chest':8,'gi.waist':83,'gi.arm':34.5,'gi.armflex':37})
    fill(b3,'2026-11-22'); N.fill('#ant-biadev','Tanita BC-545'); N.evaluate("document.getElementById('ant-biadev').scrollIntoView({block:'start'})"); N.wait_for_timeout(300); N.screenshot(path='/tmp/g/bia_ed.png'); N.evaluate("document.getElementById('ant-forms').scrollIntoView()"); N.wait_for_timeout(300); N.screenshot(path='/tmp/t/fm1.png')
    for k in ('bf:jp7','bf:dw','bf:jp3','bf:yuhasz','bmi:bmiNew'): N.check('[data-fm="%s"]'%k)
    N.wait_for_timeout(300); N.evaluate("document.getElementById('ant-forms').scrollIntoView()"); N.screenshot(path='/tmp/t/fm2.png'); N.evaluate("document.getElementById('sheet-body').scrollBy(0,560)"); N.wait_for_timeout(200); N.screenshot(path='/tmp/t/fm3.png'); N.screenshot(path='/tmp/t/ant_editor.png'); N.evaluate("document.getElementById('sheet-body').scrollTop=600"); N.wait_for_timeout(200); N.screenshot(path='/tmp/t/ant_editor2.png')
    N.click('#sheet-save'); N.wait_for_timeout(1500)
    N.evaluate("document.getElementById('sp-assess').scrollIntoView()"); N.wait_for_timeout(300)
    for i in range(6):
        N.screenshot(path='/tmp/t/ant_%d.png'%i); N.evaluate("window.scrollBy(0,780)"); N.wait_for_timeout(250)
    N.evaluate("i18n.setLang && i18n.setLang('en')"); N.wait_for_timeout(900); N.evaluate("window.scrollTo(0,0);document.getElementById('sp-assess').scrollIntoView()"); N.wait_for_timeout(400); N.screenshot(path='/tmp/t/ant_en1.png'); N.evaluate("window.scrollBy(0,780)"); N.wait_for_timeout(300); N.screenshot(path='/tmp/t/ant_en2.png')
    N.evaluate("window.scrollTo(0,0);document.querySelector('#sp-assess .sp-card-n').scrollIntoView({block:'start'})"); N.wait_for_timeout(300)
    print('bia', N.evaluate("[...document.querySelectorAll('#sp-assess .sp-card-n')].map(x=>x.innerText).filter(t=>/Bioimp|Bioimped/i.test(t))"))
    N.evaluate("[...document.querySelectorAll('#sp-assess .sp-card-n')].find(x=>/Bioimp/.test(x.innerText)).scrollIntoView({block:'start'})"); N.evaluate("window.scrollBy(0,-70)"); N.wait_for_timeout(300); N.screenshot(path='/tmp/g/bia_rep.png')
    A.reload(); A.wait_for_timeout(1500); A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(1200); A.evaluate("(document.querySelector('[data-hd-weight],[data-hd-body]')||document.body).scrollIntoView({block:'start'})"); A.wait_for_timeout(400); A.screenshot(path='/tmp/g/bia_hoy.png')
    A.evaluate("openMyAssessments()"); A.wait_for_timeout(1500); A.screenshot(path='/tmp/t/ant_self.png')
    print('errs',N.errs,A.errs, 'rows',len(sb.tables.get('assessments',[]))); b.close()
