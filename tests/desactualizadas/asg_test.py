import sys
from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
SEED2="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
const d=new Date(),k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
localStorage.setItem('gym_routines',JSON.stringify([{id:'rc1',name:'Hipertrofia A',exercises:[{id:'x1',name:'Press banca',sets:3,reps:'8-10'},{id:'x2',name:'Remo',sets:3,reps:'10'}]}]));
localStorage.setItem('meal_log',JSON.stringify({[k]:{breakfast:[{name:'Avena',grams:80,per100g:{kcal:380,protein:13,carbs:67,fat:7}}],lunch:[{name:'Pollo',grams:150,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}}]}}));}"""%lang
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    I=ctx2(b,SEED2); login(I,'carlos-coach','secreta2',False); N=ctx2(b,SEED2); login(N,'nora','secreta3',False); A=new_ctx(b,lang,True); login(A,'ana','secreta1',True)
    def link(S,role):
        S.evaluate("openLinks()"); S.wait_for_timeout(500); S.click('[data-lk-invite="%s"]'%role); S.wait_for_timeout(400); code=S.inner_text('.lk-code')
        A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700); S.click('#lk-back'); S.wait_for_timeout(500)
    link(I,'coach'); link(N,'nutriologo')
    # coach: plantilla de rutina y asignar
    I.click('#lk-templates'); I.wait_for_timeout(500); print('1 tipos coach:',I.evaluate("[...document.querySelectorAll('[data-tp-new]')].map(b=>b.textContent)"))
    I.click('[data-tp-new="routine"]'); I.wait_for_timeout(300); I.click('#sheet-save'); I.wait_for_timeout(600); print('2 plantilla:',txt(I)[:120])
    I.click('[data-tp-assign]'); I.wait_for_timeout(600); I.check('[data-as-c="0"]'); I.fill('#as-note','Empieza ligero'); I.screenshot(path='/tmp/t/asg_%s_assign.png'%lang); I.click('#sheet-save'); I.wait_for_timeout(700)
    # nutrióloga: plan, metas, indicaciones desde la ficha
    N.click('[data-lk-open="0"]'); N.wait_for_timeout(700); N.click('#cd-assign'); N.wait_for_timeout(500); print('3 tipos nutri:',N.evaluate("[...document.querySelectorAll('[data-tp-new]')].map(b=>b.textContent)"))
    N.click('[data-tp-new="diet"]'); N.wait_for_timeout(300); prev=N.inner_text('#te-prev'); N.fill('#te-name','Definición 1'); N.click('#sheet-save'); N.wait_for_timeout(600)
    N.click('[data-tp-new="targets"]'); N.wait_for_timeout(300); N.fill('#te-name','Metas corte'); N.fill('#te-kcal','1900'); N.fill('#te-p','160'); N.fill('#te-c','180'); N.fill('#te-f','60'); N.click('#sheet-save'); N.wait_for_timeout(600)
    N.click('[data-tp-new="note"]'); N.wait_for_timeout(300); N.fill('#te-name','Hidratación'); N.fill('#te-text','Toma 2.5 L de agua al día.'); N.click('#sheet-save'); N.wait_for_timeout(600)
    for _ in range(3):
        N.evaluate("(()=>{const bs=[...document.querySelectorAll('[data-tp-assign]')]; bs[%d].click()})()"%_); N.wait_for_timeout(500); N.click('#sheet-save'); N.wait_for_timeout(800); N.click('#cd-assign'); N.wait_for_timeout(500)
    N.click('#tp-back'); N.wait_for_timeout(700); print('4 ficha nutri, asignado:',txt(N)[txt(N).find('ASIGN'):][:230] if lang=='es' else ''); N.screenshot(path='/tmp/t/asg_%s_ficha.png'%lang)
    print('   diet prev',prev,'| asignaciones',[(r['kind'],r['name'],r['status']) for r in sb.tables['assignments']])
    # entrenado recibe
    A.evaluate("closeSheet(); asgRefresh(true)"); A.wait_for_timeout(900)
    print('5 tarjeta Hoy:',A.evaluate("document.getElementById('asg-card').innerText.replace(/\\n+/g,' | ')")); A.screenshot(path='/tmp/t/asg_%s_hoy.png'%lang)
    print('6 rutinas del entrenado:',A.evaluate("gymRoutines().map(r=>r.name+(r.assigned?' [asignada por '+r.assigned.by+']':''))"),'| metas:',A.evaluate("(()=>{const t=calcNutriTargets();return [t.kcal,t.protein,t.carbs,t.fat,t.assigned]})()"))
    A.evaluate("openAssignmentView(asgList().find(a=>a.kind==='diet'))"); A.wait_for_timeout(300); A.click('[data-av-log="lunch"]'); A.wait_for_timeout(300)
    print('7 plan → registrar comida de hoy:',A.evaluate("(mealLog()[keyDate()].lunch||[]).map(i=>i.name)"), '|', txt(A)[:150]); A.screenshot(path='/tmp/t/asg_%s_plan.png'%lang)
    A.evaluate("document.querySelector('nav button[data-tab=gym]').click()"); A.evaluate("closeSheet()"); A.wait_for_timeout(500); A.screenshot(path='/tmp/t/asg_%s_gym.png'%lang)
    # notas
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.click('[data-lk-notes]'); A.wait_for_timeout(500); A.fill('#nt-text','Me dolió la rodilla en sentadilla'); A.click('#nt-send'); A.wait_for_timeout(600)
    I.evaluate("openLinks()"); I.wait_for_timeout(500); I.click('[data-lk-open="0"]'); I.wait_for_timeout(700); I.click('#cd-notes'); I.wait_for_timeout(500); I.fill('#nt-text','Baja la carga 10 kg esta semana'); I.click('#nt-send'); I.wait_for_timeout(600)
    print('8 notas (coach):',I.evaluate("[...document.querySelectorAll('.nt')].map(n=>(n.classList.contains('me')?'yo: ':'él: ')+n.childNodes[0].textContent)")); I.screenshot(path='/tmp/t/asg_%s_notes.png'%lang)
    # reemplazo de metas y fin de vínculo
    N.click('#cd-assign'); N.wait_for_timeout(500); N.click('[data-tp-new="targets"]'); N.wait_for_timeout(300); N.fill('#te-name','Metas mantenimiento'); N.fill('#te-kcal','2300'); N.click('#sheet-save'); N.wait_for_timeout(600)
    N.evaluate("document.querySelector('[data-tp-assign]').click()"); N.wait_for_timeout(500); N.click('#sheet-save'); N.wait_for_timeout(800)
    A.evaluate("closeSheet(); asgRefresh(true)"); A.wait_for_timeout(900); print('9 metas reemplazadas:',A.evaluate("calcNutriTargets().kcal"),[(r['name'],r['status']) for r in sb.tables['assignments'] if r['kind']=='targets'])
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.evaluate("[...document.querySelectorAll('[data-lk-end]')][0].click()"); A.wait_for_timeout(800); A.evaluate("closeSheet(); asgRefresh(true)"); A.wait_for_timeout(900)
    print('10 tras terminar con el coach:',A.evaluate("gymRoutines().map(r=>r.name)"),'|',A.evaluate("asgList().map(a=>a.kind)"))
    print('errors',I.errs,N.errs,A.errs)
    b.close()
