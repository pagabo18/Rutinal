from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.add_init_script("localStorage.setItem('hoy_prog_open','1')"); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
import os; os.makedirs('/tmp/g',exist_ok=True)
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(800)
    info=A.evaluate("""()=>{const r=gymRoutines()[0],ex=r.exercises[0],l=gymLogs(),d=n=>keyDate(new Date(Date.now()-n*864e5));
      l[d(9)]={routineId:r.id,ex:{[ex.id]:[{kg:80,reps:8,done:true}]},done:true,ts:Date.now(),feel:{mood:4,pain:2,rpe:7}};
      l[d(2)]={routineId:r.id,ex:{[ex.id]:[{kg:92.5,reps:5,done:true}]},done:true,ts:Date.now(),feel:{mood:2,pain:6,rpe:9}};
      l[d(1)]={routineId:r.id,ex:{[ex.id]:[{kg:90,reps:5,done:true}]},done:true,ts:Date.now(),feel:{mood:5,pain:8,rpe:8}};saveGymLogs(l);
      const w={};[84,83.8,83.5,83.6,83.2,83.0,82.9].forEach((v,i)=>w[d(6-i)]=v);S.set('weight_log',w);
      const a={};a[d(0)]=[{id:'a1',sport:'running',dist_km:10,time:3120}];a[d(1)]=[{id:'a2',sport:'running',dist_km:6.5,time:2300}];S.set('act_log',a);
      S.set('goals',[
       {id:'g1',type:'weight',target:80,start:86,created:d(30)},
       {id:'g2',type:'pr',exName:ex.name,target:100,start:80,created:d(30)},
       {id:'g3',type:'dist',sport:'running',period:'month',target:60,created:d(30)},
       {id:'g4',type:'mark',sport:'running',dist:10,target:3000,start:3400,created:d(30)},
       {id:'g5',type:'sessions',target:4,created:d(30)},
       {id:'g6',type:'pr',exName:ex.name,target:90,start:80,created:d(30)},
       {id:'g7',type:'custom',title:'Dominadas seguidas',start:4,cur:9,target:15,unit:'reps',created:d(30)}]);
      renderHoyDash();renderMas();return {ex:ex.name,st:goalsAll().map(g=>[g.id,Math.round(goalState(g).pct*100),goalState(g).curText,goalState(g).tgtText])};}""")
    print(info)
    A.evaluate("document.querySelector('[data-hd-goals]').scrollIntoView({block:'center'})"); shot(A,'hoy')
    A.evaluate("openGoals()"); shot(A,'lista'); A.evaluate("document.querySelector('.sheet-body, #sheet-body, .sheet').scrollTop=9999"); 
    print('done',A.evaluate("goalsAll().filter(g=>g.done).map(g=>g.id)"))
    A.locator('.goal').last.scroll_into_view_if_needed(); shot(A,'lista2')
    A.click('#goal-new'); shot(A,'tipos'); A.click('[data-gt="weight"]'); A.wait_for_timeout(300); A.fill('#gl-target','78'); shot(A,'form'); A.click('#sheet-save'); A.wait_for_timeout(500)
    print('n',A.evaluate("goalsAll().length"), A.evaluate("JSON.stringify(goalsAll()[0])"))
    A.locator('.goal').first.click(); A.wait_for_timeout(400); shot(A,'editar'); A.click('#gl-del'); A.wait_for_timeout(400); print('n',A.evaluate("goalsAll().length"))
    A.evaluate("closeSheet()"); A.click('nav button[data-tab="gym"]'); A.wait_for_timeout(700)
    A.evaluate("(document.querySelector('.gym-hist-tags')||document.body).scrollIntoView({block:'center'})"); shot(A,'historial')
    print('tags',A.locator('.gym-hist-tags').count())
    A.click('nav button[data-tab="mas"]'); shot(A,'mas')
    print('errs',A.errs)
