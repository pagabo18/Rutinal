from playwright.sync_api import sync_playwright
import base64
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDN="localStorage.setItem('rutinal_lang','es');"
TODAY="""(()=>{const k=(n)=>{const x=new Date(Date.now()-n*864e5);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
 const d0=k(0), d7=k(7);
 localStorage.setItem('gym_routines',JSON.stringify([{id:'rd',name:'Torso A',exercises:[{id:'a',name:'Press banca',sets:[{count:3,reps:'8'}]},{id:'b',name:'Remo con barra',sets:[{count:3,reps:'10'}]},{id:'c',name:'Press militar',sets:[{count:2,reps:'10'}]}],warmup:[{id:'w',m:'cinta',t:{time:'10'}}],cardio:[{id:'k',m:'eliptica',t:{time:'20'}}]}]));
 const L={}; L[d7]={routineId:'rd',done:true,ex:{a:[{kg:'60',reps:'8',done:true}],b:[{kg:'50',reps:'10',done:true}]}};
 L[d0]={routineId:'rd',done:true,start:Date.now()-62*60000,end:Date.now()-5*60000,ex:{a:[{kg:'62.5',reps:'8',done:true,rir:'2'},{kg:'62.5',reps:'8',done:true,rir:'1',pain:3},{kg:'65',reps:'6',done:true,pain:7}],b:[{kg:'50',reps:'10',done:true},{kg:'52.5',reps:'10',done:true},{kg:'52.5',reps:'9',done:true}],c:[{kg:'30',reps:'10',done:true},{kg:'30',reps:'9',done:true}]},
   cv:{w:{done:true,time:'10',speed:'5.8',incline:'4'},k:{done:true,time:'20',res:'9'}},feel:{mood:4,rpe:8,pain:3,note:'Buen día, molestia leve en el hombro'}};
 localStorage.setItem('gym_logs',JSON.stringify(L));
 const M={}; M[d0]={breakfast:[{name:'Avena',grams:80,per100g:{kcal:380,protein:13,carbs:67,fat:7}},{name:'Huevo',grams:120,per100g:{kcal:143,protein:13,carbs:1,fat:10}}],lunch:[{name:'Pollo',grams:180,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}},{name:'Arroz',grams:200,per100g:{kcal:130,protein:2.7,carbs:28,fat:0.3}}],dinner:[{name:'Atún',grams:140,per100g:{kcal:116,protein:26,carbs:0,fat:1}}]};
 localStorage.setItem('meal_log',JSON.stringify(M));
 const H={}; H[d0]=6; localStorage.setItem('hydration_log',JSON.stringify(H));
 const Wt={}; Wt[d0]=78.4; localStorage.setItem('weight_log',JSON.stringify(Wt));
 const A={}; A[d0]=[{id:'r1',sport:'running',dist_km:5,time:1560}]; localStorage.setItem('act_log',JSON.stringify(A));
})();"""
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,n,w=600): pg.wait_for_timeout(w); pg.screenshot(path='/tmp/g/day_%s.png'%n)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); N.click('[data-add="code"]'); N.wait_for_timeout(400); N.click('#sheet-save'); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    A.evaluate(TODAY); A.evaluate("['gym_logs','gym_routines','meal_log','act_log','hydration_log','weight_log'].forEach(k=>{const v=S.get(k); localStorage.removeItem(k); S.set(k,v)})"); A.wait_for_timeout(300); A.evaluate("syncPush()"); A.wait_for_timeout(2500); print('sync on:', A.evaluate("syncOn()"))
    # Hoy: botón
    A.click('nav button[data-tab="hoy"]'); A.wait_for_timeout(600); A.evaluate("renderHoy()"); A.wait_for_timeout(300)
    print('botón en Hoy:', A.locator('#hd-daysum').count())
    A.click('#hd-daysum'); A.wait_for_timeout(700); shot(A,'1_dia')
    A.evaluate("document.querySelector('.dr-sec:nth-of-type(3)')?.scrollIntoView({block:'start'})"); shot(A,'2_dia_comida')
    A.click('[data-ds-mode="gym"]'); A.wait_for_timeout(500); shot(A,'3_gym')
    # imágenes
    for mode in ['gym','day']:
        url=A.evaluate(f"dayImageCanvas(dayData(localDayD(), keyDate(), {{goal: localDayGoal()}}), '{mode}', 'Ana').toDataURL('image/png')")
        open(f'/tmp/g/day_img_{mode}.png','wb').write(base64.b64decode(url.split(',')[1]))
    # enviar al especialista
    A.click('#ds-send'); A.wait_for_timeout(1500); A.click('#ds-send-go'); A.wait_for_timeout(1500); print('envío:', A.inner_text('#ds-msg'))
    A.evaluate("closeSheet()")
    # el especialista lo abre desde el chat
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-notes"]'); N.wait_for_timeout(1200)
    N.click('#tab-sp-notes [data-sp-note]'); N.wait_for_timeout(1500)
    print('tarjeta en chat:', N.locator('.nt-refc').count(), N.inner_text('.nt-refc').replace('\n',' ') if N.locator('.nt-refc').count() else '')
    shot(N,'4_chat_coach')
    N.click('.nt-refc'); N.wait_for_timeout(2000); shot(N,'5_coach_resumen')
    print('coach ve:', N.inner_text('#sheet-body')[:200].replace('\n',' | '))
    print('errs', A.errs, N.errs)
