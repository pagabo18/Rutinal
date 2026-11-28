from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDN="localStorage.setItem('rutinal_lang','es');"
sb.users['nora']['specs']=['coach','nutriologo']
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.add_init_script("localStorage.setItem('hoy_prog_open','1')"); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/p_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); N.click('[data-add="code"]'); N.wait_for_timeout(400); N.click('#sheet-save'); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    # atleta: fase propia por la interfaz + un objetivo propio
    A.evaluate("""()=>{const d=n=>keyDate(new Date(Date.now()-n*864e5));const w={};[84.6,84.5,84.2,84.3,84.0,84.1,83.9,83.8,83.5,83.6,83.2,83.0,82.9,82.8].forEach((v,i)=>w[d(13-i)]=v);S.set('weight_log',w);
      S.set('goals',[{id:'g1',type:'weight',target:80,start:86,created:d(30)}]);}""")
    A.evaluate("openPhases()"); shot(A,'vacio'); A.click('#ph-new'); A.wait_for_timeout(300)
    A.evaluate("d=>{document.getElementById('ph-start').value=d}", A.evaluate("keyDate(new Date(Date.now()-16*864e5))"))
    A.evaluate("d=>{const e=document.getElementById('ph-end');e.value=d;e.dispatchEvent(new Event('change'))}", A.evaluate("keyDate(new Date(Date.now()+67*864e5))"))
    A.fill('#ph-kcal','2100'); A.fill('#ph-p','180'); A.fill('#ph-c','200'); A.fill('#ph-f','60'); A.fill('#ph-rate','-0.7'); shot(A,'form'); A.click('#sheet-save'); A.wait_for_timeout(500)
    A.click('#ph-new'); A.wait_for_timeout(300); A.click('#ph-type [data-v="peak"]'); A.evaluate("d=>{const e=document.getElementById('ph-end');e.value=d}", A.evaluate("keyDate(new Date(Date.now()+74*864e5))")); A.click('#sheet-save'); A.wait_for_timeout(500); shot(A,'lista')
    print('fases',A.evaluate("phasesAll().map(p=>[p.type,p.start,p.end,p.kcal])"), 'targets',A.evaluate("(t=>[t.kcal,t.protein,t.carbs,t.fat,t.phase])(nutriTargetsToday())"))
    # traslape
    A.click('#ph-new'); A.wait_for_timeout(300); A.evaluate("d=>{document.getElementById('ph-start').value=d}", A.evaluate("keyDate()")); A.click('#sheet-save'); A.wait_for_timeout(300); print('traslape:',A.inner_text('#ph-msg'))
    A.evaluate("closeSheet()"); A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(500); A.evaluate("document.querySelector('[data-hd-phase]').scrollIntoView({block:'center'})"); shot(A,'hoy')
    A.click('nav button[data-tab="comida"]'); shot(A,'comida')
    A.evaluate("syncNow()"); A.wait_for_timeout(2500); print('sync',sorted(set(k[1] for k in sb.docs.keys() if k[1] in ('goals','phases'))))
    # coach
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(1000)
    N.evaluate("_sp.tab='progress';spOpenClient(_sp.client)"); N.wait_for_timeout(1200); shot(N,'coach_progreso')
    N.evaluate("_sp.tab='plans';spOpenClient(_sp.client)"); N.wait_for_timeout(1200)
    N.click('#sp-goal-new'); N.wait_for_timeout(300); N.click('[data-gt="pr"]'); N.wait_for_timeout(300); shot(N,'coach_obj'); N.fill('#gl-target','120'); N.click('#sheet-save'); N.wait_for_timeout(1500)
    N.click('#sp-phase-edit'); N.wait_for_timeout(400); N.click('#ph-new'); N.wait_for_timeout(300); N.click('#ph-type [data-v="bulk"]'); N.fill('#ph-name','Volumen limpio'); N.fill('#ph-kcal','3000'); N.fill('#ph-rate','0.3')
    N.evaluate("d=>{document.getElementById('ph-start').value=d}", N.evaluate("keyDate(new Date(Date.now()-3*864e5))")); N.click('#sheet-save'); N.wait_for_timeout(1200)
    N.click('#ph-new'); N.wait_for_timeout(300); N.click('#ph-type [data-v="deload"]'); N.evaluate("()=>{const s=document.getElementById('ph-start').value;document.getElementById('ph-end').value=keyDate(new Date(parseKey(s).getTime()+6*864e5))}"); N.click('#sheet-save'); N.wait_for_timeout(1200); shot(N,'coach_fases')
    N.evaluate("closeSheet()"); N.wait_for_timeout(1800); shot(N,'coach_planes')
    print('asg',[(r['kind'],r['name'],r['role'],len(str(r['payload']))) for r in sb.tables.get('assignments',[])])
    # atleta recibe
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(1500)
    print('A goals',A.evaluate("goalsAll().map(g=>[g.id.slice(0,4),g.type,g.target,g.start,!!g.assigned])"))
    print('A fases',A.evaluate("phasesAll().map(p=>[p.type,p.name||'',!!p.assigned])"),'actual',A.evaluate("phaseName(phaseCurrent())"),'kcal',A.evaluate("nutriTargetsToday().kcal"))
    A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(500); A.evaluate("document.querySelector('[data-hd-phase]').scrollIntoView({block:'start'})"); shot(A,'hoy2')
    A.evaluate("openPhases()"); A.wait_for_timeout(300); A.locator('.goal.phz-now').first.click(); A.wait_for_timeout(300); print('ro save visible',A.is_visible('#sheet-save')); shot(A,'ro')
    A.evaluate("closeSheet()"); A.evaluate("openGoals()"); shot(A,'goals2')
    # el coach quita el objetivo -> desaparece
    for r in sb.tables['assignments']:
        if r['kind']=='goal': r['status']='ended'
    A.evaluate("asgRefresh(true)"); A.wait_for_timeout(1200); print('A goals tras quitar',A.evaluate("goalsAll().length"))
    print('card',A.evaluate("document.querySelectorAll('#asg-card .asg-item').length"))
    A.evaluate("syncNow()"); A.wait_for_timeout(2500)
    N.evaluate("_sp.tab='progress';spOpenClient(_sp.client)"); N.wait_for_timeout(1500); print('coach ve', N.evaluate("[...document.querySelectorAll('#sp-report .sp-card-n')].map(x=>x.innerText)"))
    N.evaluate("document.querySelector('#sp-report .ph-tl').scrollIntoView({block:'start'})"); N.evaluate("window.scrollBy(0,-90)"); shot(N,'coach_prog2')
    print('errs',A.errs,N.errs)
