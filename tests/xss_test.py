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
def shot(pg,n,w=600): pg.wait_for_timeout(w); pg.screenshot(path='/tmp/g/exl_%s.png'%n)
HIST="""(()=>{const k=(n)=>{const x=new Date(Date.now()-n*864e5);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
 localStorage.setItem('gym_routines',JSON.stringify([{id:'rd',name:'Torso A',exercises:[{id:'a',name:'Press banca',dbId:'Barbell_Bench_Press_-_Medium_Grip',sets:[{count:3,reps:'8'}]},{id:'b',name:'Remo con barra',sets:[{count:3,reps:'10'}]}]}]));
 const L={}; const kg=[55,57.5,57.5,60,60,60,62.5,62.5,65,65], rr=[[8,8,7],[8,8,8],[9,8,8],[8,7,6],[8,8,7],[9,8,8],[8,7,7],[8,8,6],[6,6,5],[7,6,6]], rir=[[3,2,1],[3,2,2],[2,2,1],[2,1,0],[2,2,1],[3,2,1],[2,1,1],[2,1,0],[1,1,0],[2,1,1]];
 kg.forEach((w,i)=>{L[k((9-i)*4)]={routineId:'rd',done:true,ex:{a:rr[i].map((r,j)=>({kg:String(j==2&&i>6?w+2.5:w),reps:String(r),rir:String(rir[i][j]),done:true,pain:(i==8&&j==2)?6:undefined})),b:[0,1,2].map(j=>({kg:String(45+i*1.5),reps:String(10-(j==2?1:0)),rir:String(2-(j==2?1:0)),done:true}))}}});
 localStorage.setItem('gym_logs',JSON.stringify(L));})();"""
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); N.click('[data-add="code"]'); N.wait_for_timeout(400); N.click('#sheet-save'); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    A.evaluate(HIST)
    # datos manipulados por un atleta: HTML donde van números
    A.evaluate("""(()=>{const X='<img src=x onerror="window.__xss=1">'; const L=S.get('gym_logs'); const ks=Object.keys(L).sort(); const lg=L[ks[ks.length-1]];
      lg.feel={pain:X,rpe:X,mood:9,note:X}; lg.exFeel={a:{pain:X,rpe:X}}; lg.ex.a[0].reps='8'+X; lg.ex.a[0].kg='60'+X; lg.ex.a[1].pain='5'; lg.ex.a[1].rir=X; lg.ex.a[1].note=X; lg.exNote={a:X};
      const l2=L[ks[ks.length-2]]; l2.feel={pain:'7',rpe:'8',mood:'4'}; S.set('gym_logs',L); window.__last=ks[ks.length-1];})()""")
    last=A.evaluate("window.__last")
    A.evaluate("['gym_logs','gym_routines'].forEach(k=>{const v=S.get(k); localStorage.removeItem(k); S.set(k,v)})"); A.evaluate("syncPush()"); A.wait_for_timeout(2500)
    chk="({xss: window.__xss||0, imgs: document.querySelectorAll('#sheet-body img[onerror], #tab-sp-clients img[onerror]').length})"
    A.evaluate(f"openDaySummary('{last}',{{mode:'gym'}})"); A.wait_for_timeout(900); print('atleta resumen:', A.evaluate(chk))
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(1200)
    N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(1800)
    print('coach ficha:', N.evaluate(chk))
    for tab in ['progress','logs']:
        if N.locator(f'[data-sp-t="{tab}"]').count(): N.click(f'[data-sp-t="{tab}"]'); N.wait_for_timeout(800); print('coach', tab, N.evaluate(chk))
    N.evaluate("document.querySelectorAll('#tab-sp-clients details').forEach(d=>d.open=true)"); N.wait_for_timeout(300)
    print('registro (día manipulado):', N.locator('#tab-sp-clients details.cd-day').first.inner_text().replace('\n',' | ')[:260])
    print('registro (día normal):', N.locator('#tab-sp-clients details.cd-day').nth(1).inner_text().replace('\n',' | ')[:160])
    link=N.evaluate("spOthers(spClients(_sp.links))[0]")
    N.evaluate(f"spDaySummary(spOthers(spClients(_sp.links))[0], '{last}', 'gym')"); N.wait_for_timeout(1500)
    print('coach resumen:', N.evaluate(chk), '|', N.inner_text('#sheet-body .dr').replace('\n',' | ')[-200:])
    print('pestañas:', N.evaluate("[...document.querySelectorAll('[data-sp-t]')].map(b=>b.dataset.spT)"))
    print('errs', A.errs, N.errs)
