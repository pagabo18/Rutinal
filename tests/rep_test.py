import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEEDA="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
const d=n=>{const x=new Date(Date.now()-n*864e5);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
localStorage.setItem('gym_routines',JSON.stringify([{id:'r1',name:'Pierna A',exercises:[{id:'e1',name:'Sentadilla',sets:[{count:3,reps:'8'}]},{id:'e2',name:'Peso muerto',sets:[{count:2,reps:'5'}]}]}]));
const gl={};[[45,70,2,6],[38,72.5,2,7],[31,75,3,7],[24,75,3,8],[17,77.5,2,7],[10,80,4,8],[5,80,3,8],[2,82.5,6,9]].forEach(([n,kg,pain,rpe])=>{gl[d(n)]={routineId:'r1',done:true,ex:{e1:[{kg:String(kg),reps:'8',done:true},{kg:String(kg),reps:'8',done:true},{kg:String(kg),reps:'7',done:true}],e2:[{kg:String(kg+20),reps:'5',done:true}]},feel:{mood:4,pain:pain,rpe:rpe}}});
localStorage.setItem('gym_logs',JSON.stringify(gl));
const ml={};for(let n=0;n<12;n++){if(n==3||n==8)continue;ml[d(n)]={breakfast:[{name:'Avena',grams:80+n*5,per100g:{kcal:380,protein:13,carbs:67,fat:7}}],lunch:[{name:'Pollo',grams:250,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}},{name:'Arroz',grams:300+n*20,per100g:{kcal:130,protein:2.7,carbs:28,fat:0.3}}],dinner:[{name:'Huevo',grams:200,per100g:{kcal:150,protein:12.5,carbs:1,fat:11}}]}}
localStorage.setItem('meal_log',JSON.stringify(ml));
localStorage.setItem('weight_log',JSON.stringify({[d(30)]:80.1,[d(16)]:79.4,[d(2)]:78.2}));
localStorage.setItem('nutri_profile',JSON.stringify({sex:'M',age:30,heightCm:175,weightKg:78,bodyFatPct:null,activity:'moderate',goal:'cut',macroSplit:'auto',tolerance:'flex',manualKcal:null}));}"""%lang
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def link(S,A,user,pw):
    S.fill('#auth-user',user); S.fill('#auth-pass',pw); S.click('#auth-submit'); S.wait_for_timeout(1200); S.click('[data-who="spec"]'); S.wait_for_timeout(700)
    S.click('#sp-invite'); S.wait_for_timeout(600)
    if S.locator('[data-add="code"]').count(): S.click('[data-add="code"]'); S.wait_for_timeout(400)
    if S.locator('#sheet-save').is_visible() and not S.locator('.lk-code').count(): S.click('#sheet-save'); S.wait_for_timeout(600)
    code=S.inner_text('.lk-code'); S.evaluate("closeSheet()")
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700); A.evaluate("closeSheet()")
    S.evaluate("_sp.at=0"); S.click('nav button[data-tab="sp-clients"]'); S.wait_for_timeout(900); S.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); S.wait_for_timeout(1000); S.click('[data-sp-t="progress"]'); S.wait_for_timeout(400)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(800)
    I=ctx2(b,"localStorage.setItem('rutinal_lang','%s');"%lang); link(I,A,'carlos-coach','secreta2')
    print('COACH:',I.inner_text('#sp-tabbody').replace('\n',' | ')[:900]); I.screenshot(path='/tmp/t/rep_coach_%s.png'%lang, full_page=True)
    I.context.grant_permissions(['clipboard-read','clipboard-write']); I.click('#sp-rep-copy'); I.wait_for_timeout(300); print('COPIA:',repr(I.evaluate("navigator.clipboard.readText()")))
    I.evaluate("window.__p=0; HTMLIFrameElement.prototype.__defineGetter__ && 0"); I.click('#sp-rep-pdf'); I.wait_for_timeout(200)
    print('PDF iframe:',I.evaluate("(()=>{const f=document.getElementById('sp-print-frame'); if(!f) return null; const d=f.contentDocument; return [d.title, d.body.innerText.replace(/\\n+/g,' | ').slice(0,160), d.querySelectorAll('svg').length]})()"))
    N=ctx2(b,"localStorage.setItem('rutinal_lang','%s');"%lang); link(N,A,'nora','secreta3')
    print('NUTRI:',N.inner_text('#sp-tabbody').replace('\n',' | ')[:700]); N.screenshot(path='/tmp/t/rep_nutri_%s.png'%lang, full_page=True)
    print('errors',A.errs,I.errs,N.errs); b.close()
