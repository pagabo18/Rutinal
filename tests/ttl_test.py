from playwright.sync_api import sync_playwright
import datetime
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDN="localStorage.setItem('rutinal_lang','es');"
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:(pg.__dict__.setdefault('dlg',[]).append(d.message), d.accept())); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=600): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/x_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); N.click('[data-add="code"]'); N.wait_for_timeout(400); N.click('#sheet-save'); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    # el coach asigna una rutina por 6 horas
    tp={'kind':'routine','name':'Pierna express','payload':{'name':'Pierna express','exercises':[{'id':'e1','name':'Sentadilla','sets':[{'count':3,'reps':'8','note':''}]}]}}
    N.evaluate("tp=>{_sp.at=0;return linkRpc('rutinal_my_links').then(r=>openAssign(tp, spOthers(spClients(r))[0]))}", tp); N.wait_for_timeout(900)
    N.select_option('#as-ttl','6h'); shot(N,'asignar'); N.click('#sheet-save'); N.wait_for_timeout(1500)
    row=[r for r in sb.tables['assignments'] if r['kind']=='routine'][-1]; print('expira', row.get('expires_at'))
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(1200); A.click('nav button[data-tab="gym"]'); A.wait_for_timeout(800)
    print('atleta ve', A.evaluate("gymRoutines().filter(r=>r.assigned).map(r=>r.name+' | '+r.assigned.until)"), '|', A.evaluate("(document.querySelector('.asg-until')||{}).innerText"))
    A.evaluate("(document.querySelector('.asg-until')||document.body).scrollIntoView({block:'center'})"); shot(A,'rutina')
    N.evaluate("_sp.tab='plans';spOpenClient(_sp.client||spOthers(spClients(_links))[0])"); N.wait_for_timeout(1500); shot(N,'plan')
    # vence: sin servidor, la app la retira y no deja abrirla
    rid=A.evaluate("gymRoutines().find(r=>r.assigned).id")
    A.evaluate("id=>{const a=gymRoutines();a.find(r=>r.id===id).assigned.until=new Date(Date.now()-1000).toISOString();S.set('gym_routines',a);const q=JSON.parse(localStorage.getItem('__asg'));q.forEach(x=>{x.expires_at=new Date(Date.now()-1000).toISOString()});localStorage.setItem('__asg',JSON.stringify(q))}", rid)
    A.evaluate("id=>openGymWorkout(id)", rid); A.wait_for_timeout(500)
    print('aviso', getattr(A,'dlg',[]), '| quedan', A.evaluate("gymRoutines().filter(r=>r.assigned).length"))
    print('errs',A.errs,N.errs)
