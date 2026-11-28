from playwright.sync_api import sync_playwright
import base64
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDN="localStorage.setItem('rutinal_lang','es');"
TODAY="""(()=>{const k=(n)=>{const x=new Date(Date.now()-n*864e5);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
 const d0=k(0);
 localStorage.setItem('gym_routines',JSON.stringify([{id:'rd',name:'Torso A',exercises:[{id:'a',name:'Press banca',dbId:'Barbell_Bench_Press_-_Medium_Grip',sets:[{count:3,reps:'8'}]},{id:'b',name:'Remo con barra',sets:[{count:3,reps:'10'}]},{id:'c',name:'Press militar',sets:[{count:3,reps:'10'}]},{id:'d',name:'Dominadas',sets:[{count:2,reps:'8'}]},{id:'e',name:'Curl con barra',sets:[{count:2,reps:'12'}]}],warmup:[{id:'w',m:'cinta',t:{time:'10'}}]}]));
 const L={}; const S3=(kg,r)=>r.map(x=>({kg:String(kg),reps:String(x),rir:'2',done:true}));
 L[k(21)]={routineId:'rd',done:true,start:1,end:55*60000,ex:{a:S3(57.5,[8,8,7]),b:S3(50,[10,10,9]),c:S3(32.5,[10,9,8]),d:S3(0,[7,6]),e:S3(25,[12,12])}};
 L[k(14)]={routineId:'rd',done:true,start:1,end:58*60000,ex:{a:S3(60,[8,8,7]),b:S3(50,[10,10,10]),c:S3(32.5,[10,10,8]),d:S3(0,[8,6]),e:S3(25,[12,12])}};
 L[k(7)]={routineId:'rd',done:true,start:1,end:60*60000,ex:{a:S3(60,[8,8,8]),b:S3(52.5,[10,10,9]),c:S3(32.5,[10,10,9]),d:S3(0,[8,7]),e:S3(27.5,[12,11])}};
 L[d0]={routineId:'rd',done:true,start:Date.now()-62*60000,end:Date.now()-5*60000,ex:{a:[{kg:'62.5',reps:'8',done:true,rir:'2'},{kg:'62.5',reps:'8',done:true,rir:'1'},{kg:'65',reps:'6',done:true,rir:'0'}],b:S3(52.5,[10,10,9]),c:[{kg:'30',reps:'10',done:true,rir:'2'},{kg:'30',reps:'9',done:true,rir:'1',pain:6}],d:S3(0,[9,8])},
   cv:{w:{done:true,time:'10',speed:'5.8',incline:'4'}},feel:{mood:4,rpe:8,pain:3,note:'Molestia en el hombro en el press militar'}};
 localStorage.setItem('gym_logs',JSON.stringify(L));
 const M={}; M[d0]={breakfast:[{name:'Avena',grams:80,per100g:{kcal:380,protein:13,carbs:67,fat:7}}],lunch:[{name:'Pollo',grams:180,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}}]};
 localStorage.setItem('meal_log',JSON.stringify(M));
})();"""
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,n,w=600): pg.wait_for_timeout(w); pg.screenshot(path='/tmp/g/sum_%s.png'%n)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); N.click('[data-add="code"]'); N.wait_for_timeout(400); N.click('#sheet-save'); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    A.evaluate(TODAY); A.evaluate("['gym_logs','gym_routines','meal_log','act_log','hydration_log','weight_log'].forEach(k=>{const v=S.get(k); localStorage.removeItem(k); S.set(k,v)})"); A.wait_for_timeout(300); A.evaluate("syncPush()"); A.wait_for_timeout(2500); print('sync on:', A.evaluate("syncOn()"))
    A.evaluate("loadGymDb()"); A.wait_for_timeout(1200)
    dd=A.evaluate("(()=>{const g=dayData(localDayD(), keyDate()).gym; return {cmp:g.cmp, planned:g.planned, sets:g.sets, skipped:g.skipped, pains:g.pains, ex:g.ex.map(x=>[x.name,x.trend,x.dTop,x.dReps,x.pr,x.prTop,dayExDelta(x).txt])}})()")
    print('cmp:', dd['cmp']); print('plan:', dd['sets'],'/',dd['planned'],'sin hacer',dd['skipped'],'dolor',dd['pains']); [print('  ',x) for x in dd['ex']]
    print('titular:', A.evaluate("dayCmpLine(dayData(localDayD(), keyDate()).gym, t)"))
    A.evaluate("applyTheme('dark')"); A.evaluate("openDaySummary(keyDate(),{mode:'gym'})"); A.wait_for_timeout(900); shot(A,'1_cmp_oscuro')
    A.evaluate("applyTheme('light')"); A.evaluate("openDaySummary(keyDate(),{mode:'gym'})"); A.wait_for_timeout(900); shot(A,'1_cmp')
    A.evaluate("document.querySelector('.dr-ex').scrollIntoView({block:'start'})"); shot(A,'2_ejercicios')
    print('bloque:', A.inner_text('.dr-cmp').replace('\n',' | '))
    print('ejercicio 1:', A.locator('.dr-ex').first.inner_text().replace('\n',' | '))
    A.locator('.dr-ex').first.click(); A.wait_for_timeout(900); print('tocar ejercicio →', A.inner_text('#sheet-title')); A.click('#exl-back'); A.wait_for_timeout(600); print('volver →', A.inner_text('#sheet-title'))
    for mode in ['gym','day']:
        url=A.evaluate(f"dayImageCanvas(dayData(localDayD(), keyDate(), {{goal: localDayGoal()}}), '{mode}', 'Ana').toDataURL('image/png')")
        open(f'/tmp/g/sum_img_{mode}.png','wb').write(base64.b64decode(url.split(',')[1]))
    print('texto:', A.evaluate("dayReportText(dayData(localDayD(), keyDate()))").replace('\n',' | ')[:520])
    # enviar con mensaje
    A.evaluate("document.getElementById('ds-send').scrollIntoView({block:'center'})"); A.click('#ds-send'); A.wait_for_timeout(1500)
    print('redactar:', A.inner_text('.ds-compose').replace('\n',' | '))
    A.fill('#ds-note','El hombro me molestó en la segunda serie, ¿bajo el peso?'); shot(A,'3_redactar'); A.click('#ds-send-go'); A.wait_for_timeout(1500); print('envío:', A.inner_text('#ds-msg'))
    A.evaluate("closeSheet()")
    # el especialista lo abre desde el chat
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-notes"]'); N.wait_for_timeout(1200)
    N.click('#tab-sp-notes [data-sp-note]'); N.wait_for_timeout(1500)
    print('chat coach:', N.locator('.nt').last.inner_text().replace('\n',' | ')); shot(N,'4_chat_coach')
    N.click('.nt-refc'); N.wait_for_timeout(2200); shot(N,'5_coach_resumen')
    print('coach ve:', N.inner_text('#sheet-title'), '|', N.inner_text('.dr-cmp').replace('\n',' | ')[:230])
    print('botones coach:', N.locator('#ds-reply').count(), N.locator('#ds-back').count(), N.locator('[data-ds-go]').count())
    N.locator('.dr-ex').first.click(); N.wait_for_timeout(800); print('coach toca ejercicio →', N.inner_text('#sheet-title'), '|', N.inner_text('.exl-who')); N.click('#exl-back'); N.wait_for_timeout(1200)
    N.locator('[data-ds-go]').first.click(); N.wait_for_timeout(1200); print('día anterior:', N.inner_text('.ds-date'), '|', N.inner_text('.dr')[:40].replace('\n',' '))
    N.go_back(); N.wait_for_timeout(1200); print('atrás → chat:', N.locator('#nt-list').count(), N.inner_text('#sheet-title'))
    N.click('.nt-refc'); N.wait_for_timeout(1500); N.click('#ds-reply'); N.wait_for_timeout(1200); print('responder → chat:', N.locator('#nt-list').count())
    # al terminar el entrenamiento se abre el resumen
    A.evaluate("()=>{const L=gymLogs(); const lg=L[keyDate()]; delete lg.end; lg.done=false; saveGymLogs(L)}"); A.evaluate("openGymWorkout('rd', keyDate())"); A.wait_for_timeout(700)
    A.evaluate("document.getElementById('gym-finish')?.click()"); A.wait_for_timeout(700)
    print('terminar:', A.inner_text('#sheet-title')); A.evaluate("document.getElementById('gym-fin-save').click()"); A.wait_for_timeout(900)
    print('tras terminar:', A.inner_text('#sheet-title'), '|', A.locator('.ds-done').count(), '| done:', A.evaluate("gymLogs()[keyDate()].done")); shot(A,'6_terminar')
    print('errs', A.errs, N.errs)
