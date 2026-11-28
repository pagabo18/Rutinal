import json, sys, random
from playwright.sync_api import sync_playwright
from fake_sb import FakeSB
ROLE_KEYS={'coach':['gym_logs','gym_routines','gym_schedule','weight_log'],'nutriologo':['meal_log','nutri_profile','food_goal_kcal','weight_log','hydration_log','hydration_settings'],'fisioterapeuta':['gym_logs','gym_routines','gym_schedule']}
class SB(FakeSB):
    def __init__(s): super().__init__(); s.links=[]
    def can_read(s,me,uid,key=None):
        myid=s.users[me]['id']
        return any(l['status']=='active' and l['spec']==myid and l['client']==uid and (key is None or key in ROLE_KEYS[l['role']]) for l in s.links)
    def name(s,uid):
        for k,v in s.users.items():
            if v['id']==uid: return v['name'] or k
    def extra(s,route,rq,base,qs,body,me):
        if not base.startswith('/rest/v1/rpc/rutinal_'): return None
        J=lambda o: s.J(route,o) or True
        if not me: return J({'ok':False,'error':'session'})
        myid=s.users[me]['id']; fn=base.rsplit('/',1)[1]
        if fn=='rutinal_invite':
            if body['p_role'] not in s.users[me]['specs']: return J({'ok':False,'error':'forbidden'})
            code=''.join(random.choice('ABCDEFGHJKMNPQRSTUVWXYZ23456789') for _ in range(8)); s.links.append({'id':'l%d'%len(s.links),'spec':myid,'client':None,'role':body['p_role'],'status':'pending','code':code}); return J({'ok':True,'code':code})
        if fn in('rutinal_invite_preview','rutinal_invite_accept'):
            l=next((l for l in s.links if l['code']==body['p_code'].strip().upper() and l['status']=='pending'),None)
            if not l: return J({'ok':False,'error':'bad_code'})
            if l['spec']==myid: return J({'ok':False,'error':'own_code'})
            if fn=='rutinal_invite_preview': return J({'ok':True,'role':l['role'],'specialist':s.name(l['spec']),'keys':ROLE_KEYS[l['role']]})
            l.update(client=myid,status='active',code=None); return J({'ok':True})
        if fn=='rutinal_link_end':
            l=next((l for l in s.links if l['id']==body['p_id'] and myid in (l['spec'],l['client'])),None)
            if not l: return J({'ok':False,'error':'not_found'})
            if l['status']=='pending': s.links.remove(l)
            else: l['status']='ended'
            return J({'ok':True})
        if fn=='rutinal_my_links':
            def summ(l):
                d=[(k,v) for k,v in s.docs.items() if k[0]==l['client'] and k[1] in ROLE_KEYS[l['role']]]
                o={'id':l['id'],'role':l['role'],'status':l['status'],'code':l['code'],'client_id':l['client'],'name':s.name(l['client']) if l['client'] else None,
                   'last_activity':'2026-11-19T10:00:00+00:00' if d else None,'meals7':None,'workouts7':None,'pain7':None}
                if l['role']=='nutriologo': o['meals7']=sum(1 for k,v in d if k[1]=='meal_log' and v['value'])
                else:
                    g=[v['value'] for k,v in d if k[1]=='gym_logs' and v['value']]; o['workouts7']=sum(1 for x in g if x.get('done')); ps=[x['feel']['pain'] for x in g if x.get('feel') and x['feel'].get('pain') is not None]; o['pain7']=max(ps) if ps else None
                return o
            return J({'ok':True,'as_client':[{'id':l['id'],'role':l['role'],'name':s.name(l['spec']),'keys':ROLE_KEYS[l['role']]} for l in s.links if l['client']==myid and l['status']=='active'],
                      'as_specialist':[summ(l) for l in s.links if l['spec']==myid and l['status'] in('pending','active')]})
sb=SB(); sb.add('ana','secreta1',name='Ana López'); sb.add('carlos-coach','secreta2',specs=['coach'],name='Carlos'); sb.add('nora','secreta3',specs=['nutriologo','fisioterapeuta'],name='Nora')
SEED="""localStorage.setItem('rutinal_lang','%s');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
const d=n=>{const x=new Date(Date.now()-n*864e5);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
localStorage.setItem('meal_log',JSON.stringify({[d(1)]:{breakfast:[{name:'Avena',grams:80,per100g:{kcal:380,protein:13,carbs:67,fat:7}}],lunch:[{name:'Pollo',grams:150,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}},{name:'Arroz',grams:200,per100g:{kcal:130,protein:2.7,carbs:28,fat:0.3}}]},[d(0)]:{dinner:[{name:'Pizza',grams:900,per100g:{kcal:266,protein:11,carbs:33,fat:10}}]}}));
localStorage.setItem('weight_log',JSON.stringify({[d(9)]:79.4,[d(2)]:78.2}));
localStorage.setItem('nutri_profile',JSON.stringify({sex:'M',age:30,heightCm:175,weightKg:78,bodyFatPct:null,activity:'moderate',goal:'cut',macroSplit:'auto',tolerance:'flex',manualKcal:null}));
localStorage.setItem('gym_routines',JSON.stringify([{id:'r1',name:'Pierna A',exercises:[{id:'e1',name:'Sentadilla'},{id:'e2',name:'Peso muerto'}]}]));
localStorage.setItem('gym_logs',JSON.stringify({[d(2)]:{routineId:'r1',done:true,ex:{e1:[{kg:80,reps:8,done:true},{kg:80,reps:7,done:true}],e2:[{kg:100,reps:5,done:true}]},exFeel:{e1:{pain:7,rpe:8}},swap:{e2:{name:'Peso muerto rumano'}},feel:{mood:4,pain:7,rpe:8,note:'Molestia en la rodilla'}}}));}"""
def new_ctx(b,lang,seed):
    ctx=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=ctx.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle)
    pg.add_init_script((SEED%lang) if seed else "localStorage.setItem('rutinal_lang','%s');"%lang)
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def login(pg,u,pw,sync=None):
    pg.fill('#auth-user',u); pg.fill('#auth-pass',pw); pg.click('#auth-submit'); pg.wait_for_timeout(1200)
    if sync is True: pg.click('#sync-on'); pg.wait_for_timeout(1000)
    elif sync is False: pg.click('#sync-later'); pg.wait_for_timeout(300)
txt=lambda pg: pg.evaluate("document.getElementById('sheet-body').innerText.replace(/\\n+/g,' | ')")
lang=sys.argv[1] if len(sys.argv)>1 else 'es'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    I=new_ctx(b,lang,False); login(I,'carlos-coach','secreta2',False); I.evaluate("openLinks()"); I.wait_for_timeout(500)
    print('1 coach vacío:',txt(I)[:230]); I.click('[data-lk-invite="coach"]'); I.wait_for_timeout(400); code=I.inner_text('.lk-code'); I.screenshot(path='/tmp/t/lk_%s_invite.png'%lang); print('2 código',len(code))
    A=new_ctx(b,lang,True); login(A,'ana','secreta1',False); A.evaluate("openLinks()"); A.wait_for_timeout(500)
    A.fill('#lk-code',code.lower()); A.click('#lk-go'); A.wait_for_timeout(400); print('3 sin respaldo:',A.inner_text('#lk-msg'))
    A.evaluate("syncEnable()"); A.wait_for_timeout(1000); A.fill('#lk-code','ZZZZZZZZ'); A.click('#lk-go'); A.wait_for_timeout(400); print('4 código malo:',A.inner_text('#lk-msg'))
    A.fill('#lk-code',code.lower()); A.click('#lk-go'); A.wait_for_timeout(500); print('5 vista previa:',txt(A)); A.screenshot(path='/tmp/t/lk_%s_accept.png'%lang)
    A.click('#lk-accept'); A.wait_for_timeout(700); print('6 ana tras aceptar:',txt(A)[:160])
    # nutrióloga también
    N=new_ctx(b,lang,False); login(N,'nora','secreta3',False); N.evaluate("openLinks()"); N.wait_for_timeout(500); N.click('[data-lk-invite="nutriologo"]'); N.wait_for_timeout(400); code2=N.inner_text('.lk-code')
    A.fill('#lk-code',code2); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(700)
    I.click('#lk-back'); I.wait_for_timeout(600); print('7 coach lista:',txt(I)[:260]); I.screenshot(path='/tmp/t/lk_%s_list.png'%lang)
    I.click('[data-lk-open="0"]'); I.wait_for_timeout(700); I.evaluate("document.querySelectorAll('.cd-day').forEach(d=>d.open=true)"); print('8 ficha coach:',txt(I)); I.screenshot(path='/tmp/t/lk_%s_coach.png'%lang)
    N.click('#lk-back'); N.wait_for_timeout(600); N.click('[data-lk-open="0"]'); N.wait_for_timeout(700); N.evaluate("document.querySelectorAll('.cd-day').forEach(d=>d.open=true)"); print('9 ficha nutrióloga:',txt(N)); N.screenshot(path='/tmp/t/lk_%s_nutri.png'%lang)
    # ana deja de compartir con el coach
    A.click('[data-lk-end="l0"]'); A.wait_for_timeout(700); I.click('#cd-back'); I.wait_for_timeout(600); print('10 coach tras terminar:',txt(I)[:120])
    print('errors',I.errs,A.errs,N.errs)
    b.close()
