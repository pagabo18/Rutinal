import json, sys, random
from playwright.sync_api import sync_playwright
from fake_sb import FakeSB
ROLE_KEYS={'coach':['gym_logs','gym_routines','gym_schedule','weight_log','act_log','athlete_profile','goals','phases','steps_log','cardio_goal'],'nutriologo':['goals','phases','meal_log','nutri_profile','food_goal_kcal','weight_log','hydration_log','hydration_settings'],'fisioterapeuta':['goals','gym_logs','gym_routines','gym_schedule','act_log','athlete_profile','steps_log','cardio_goal']}
KINDS={'coach':['routine','note','goal','phase'],'fisioterapeuta':['routine','note','goal'],'nutriologo':['diet','targets','note','goal','phase']}
class SB(FakeSB):
    def __init__(s): super().__init__(); s.links=[]; s.tables={}
    def can_read(s,me,uid,key=None):
        myid=s.users[me]['id']
        return any(l['status']=='active' and l['spec']==myid and l['client']==uid and (key is None or key in ROLE_KEYS[l['role']]) for l in s.links)
    def handle(s,route):
        rq=route.request; u=rq.url
        if 'supabase.co/storage/v1/object/' in u:
            if rq.method=='OPTIONS': return route.fulfill(status=200,headers=s.H)
            tok=(rq.headers.get('authorization') or '').replace('Bearer ',''); me=s.acc.get(tok)
            if not me: return route.fulfill(status=401,headers=s.H,body='{}')
            myid=s.users[me]['id']; path=u.split('/storage/v1/object/')[1].split('?')[0]
            if path.startswith('authenticated/'): path=path[len('authenticated/'):]
            bucket=path.split('/')[0]; key=path[len(bucket)+1:]; S=s.__dict__.setdefault('files',{})
            own=key.split('/')[0]==myid
            if rq.method=='POST':
                if not own: return route.fulfill(status=403,headers=s.H,body='{}')
                S[key]=rq.post_data_buffer; return route.fulfill(status=200,headers=s.H,body='{}')
            if rq.method=='DELETE':
                if not own: return route.fulfill(status=403,headers=s.H,body='{}')
                S.pop(key,None); return route.fulfill(status=200,headers=s.H,body='{}')
            ok=own or (bucket=='meals' and any(r['path']==key and any(l['status']=='active' and l['spec']==myid and l['client']==r['user_id'] and l['role']=='nutriologo' for l in s.links) for r in s.tables.get('meal_photos',[]))) or any(r['path']==key and r.get('shared') and any(l['status']=='active' and l['spec']==myid and l['client']==r['user_id'] for l in s.links) for r in s.tables.get('progress_photos',[]))
            if not ok or key not in S: return route.fulfill(status=400,headers=s.H,body='{}')
            h=dict(s.H); h['Content-Type']='image/jpeg'; return route.fulfill(status=200,headers=h,body=S[key])
        return super().handle(route)
    def name(s,uid):
        for k,v in s.users.items():
            if v['id']==uid: return v['name'] or k
    def rest(s,route,rq,base,qs,body,me):
        tbl=base.rsplit('/',1)[1]; myid=s.users[me]['id'] if me else None
        if not me: s.J(route,{'message':'jwt'},401); return True
        T=s.tables.setdefault(tbl,[])
        flt={k:v[0][3:] for k,v in qs.items() if v[0].startswith('eq.')}
        nflt={k:v[0][4:] for k,v in qs.items() if v[0].startswith('neq.')}
        def vis(r):
            if tbl=='templates': return r['owner_id']==myid
            if tbl=='assignments': return r['specialist_id']==myid or (r['client_id']==myid and (not r.get('expires_at') or r['expires_at']>__import__('datetime').datetime.utcnow().isoformat()))
            if tbl=='notes': return any(l['id']==r['link_id'] and myid in (l['spec'],l['client']) for l in s.links)
            if tbl=='appointments': return any(l['id']==r['link_id'] and myid in (l['spec'],l['client']) for l in s.links)
            if tbl=='checkins': return r['client_id']==myid or any(l['status']=='active' and l['spec']==myid and l['client']==r['client_id'] for l in s.links)
            if tbl=='checkin_reviews': return r['client_id']==myid or r['reviewer_id']==myid
            if tbl=='assessments': return r['client_id']==myid or any(l['status']=='active' and l['spec']==myid and l['client']==r['client_id'] for l in s.links)
            if tbl=='meal_photos': return r['user_id']==myid or any(l['status']=='active' and l['spec']==myid and l['client']==r['user_id'] and l['role']=='nutriologo' for l in s.links)
            if tbl=='progress_photos': return r['user_id']==myid or (r.get('shared') and any(l['status']=='active' and l['spec']==myid and l['client']==r['user_id'] for l in s.links))
        sel=[r for r in T if vis(r) and all(str(r.get(k))==v for k,v in flt.items()) and all(str(r.get(k))!=v for k,v in nflt.items())]
        for k,vs in qs.items():
            for v in vs:
                if v.startswith('gte.'): sel=[r for r in sel if str(r.get(k,''))>=v[4:]]
                if v.startswith('lte.'): sel=[r for r in sel if str(r.get(k,''))<=v[4:]]
                if v.startswith('lt.'): sel=[r for r in sel if str(r.get(k,''))<v[3:]]
                if v=='not.is.null': sel=[r for r in sel if r.get(k) is not None]
        if rq.method=='GET': s.J(route,sorted(sel,key=lambda r:(r.get('taken_on','') if tbl in('assessments','progress_photos') else r.get('week_of','') if tbl=='checkins' else '',r['created_at']),reverse='desc' in qs.get('order',[''])[0])); return True
        if rq.method=='POST':
            for r in (body if isinstance(body,list) else [body]):
                r=dict(r); s.n+=1; r['id']='id%d'%s.n; r['created_at']='2026-11-22T10:00:%02d+00:00'%(s.n%60); r.setdefault('status','active')
                if tbl=='templates': r['owner_id']=myid
                if tbl=='meal_photos': r['user_id']=myid
                if tbl=='progress_photos': r['user_id']=myid
                if tbl=='appointments': r['created_by']=myid
                if tbl=='checkins':
                    r['client_id']=myid
                    old=[x for x in T if x['client_id']==myid and x['week_of']==r['week_of']]
                    if old: old[0].update(data=r['data']); continue
                if tbl=='checkin_reviews':
                    r['reviewer_id']=myid
                    if not any(l['status']=='active' and l['spec']==myid and l['client']==r['client_id'] for l in s.links): s.J(route,{'message':'rls'},403); return True
                if tbl=='assessments':
                    r['author_id']=myid
                    if not vis(r): s.J(route,{'message':'rls'},403); return True
                if tbl=='assignments':
                    r['specialist_id']=myid
                    if not any(l['status']=='active' and l['spec']==myid and l['client']==r['client_id'] and l['role']==r['role'] for l in s.links) or r['kind'] not in KINDS[r['role']]: s.J(route,{'message':'rls'},403); return True
                if tbl=='notes':
                    r['author_id']=myid
                    if not any(l['id']==r['link_id'] and l['status']=='active' and myid in (l['spec'],l['client']) for l in s.links): s.J(route,{'message':'rls'},403); return True
                T.append(r)
            route.fulfill(status=201,headers=s.H); return True
        if rq.method=='PATCH':
            for r in sel:
                if tbl=='assignments' and r['specialist_id']==myid: r.update(body)
                if tbl=='templates' and r['owner_id']==myid: r.update(body)
                if tbl=='appointments': r.update(body)
                if tbl=='assessments' and r['author_id']==myid: r.update(body)
                if tbl=='checkins' and r['client_id']==myid: r.update(body)
                if tbl=='progress_photos' and r['user_id']==myid: r.update(body)
            route.fulfill(status=204,headers=s.H); return True
        if rq.method=='DELETE':
            for r in sel: T.remove(r)
            route.fulfill(status=204,headers=s.H); return True
    def extra(s,route,rq,base,qs,body,me):
        if base in('/rest/v1/templates','/rest/v1/assignments','/rest/v1/notes','/rest/v1/appointments','/rest/v1/progress_photos','/rest/v1/meal_photos','/rest/v1/assessments','/rest/v1/checkins','/rest/v1/checkin_reviews'): return s.rest(route,rq,base,qs,body,me)
        if base=='/functions/v1/recover':
            R=s.__dict__.setdefault('rec',{}); Q=s.__dict__.setdefault('asked',set()); un=body.get('username'); U=s.users.get(un)
            if body.get('action')=='request':
                if U: Q.add(un)
                s.J(route,{'ok':True}); return True
            st=R.get(un); code=''.join(c for c in body.get('code','').upper() if c.isalnum())
            if not U or not st or st.get('lock'): s.J(route,{'ok':False,'error':'invalid'}); return True
            if st['code']!=code:
                st['n']=st.get('n',0)+1
                if st['n']>=5: st['lock']=True
                s.J(route,{'ok':False,'error':'invalid'}); return True
            U['pass']=body['password']; R.pop(un); Q.discard(un); s.J(route,{'ok':True}); return True
        if base.startswith('/rest/v1/rpc/rutinal_recovery_') or base.startswith('/rest/v1/rpc/rutinal_admin_reset_'):
            R=s.__dict__.setdefault('rec',{}); Q=s.__dict__.setdefault('asked',set()); fn=base.rsplit('/',1)[1]
            if not me: s.J(route,{'message':'jwt'},401); return True
            if fn=='rutinal_recovery_status': s.J(route,'2026-11-23T10:00:00+00:00' if (me in R or not s.__dict__.get('rec_none')) else None); return True
            if fn=='rutinal_recovery_new':
                c=''.join(random.choice('ABCDEFGHJKLMNPQRSTUVWXYZ23456789') for _ in range(16)); R[me]={'code':c}; s.J(route,'-'.join(c[i:i+4] for i in range(0,16,4))); return True
            if fn=='rutinal_admin_reset_requests': s.J(route,[{'username':u,'created_at':'2026-11-23T10:00:00+00:00'} for u in Q] if s.users[me]['admin'] else []); return True
            if fn=='rutinal_admin_reset_clear': Q.discard(body['p_username']); route.fulfill(status=204,headers=s.H); return True
        if base=='/functions/v1/signup':
            un=body.get('username','')
            if un in s.users: s.J(route,{'ok':False,'error':'taken'}); return True
            if len(body.get('password',''))<8: s.J(route,{'ok':False,'error':'weak'}); return True
            s.add(un,body['password'],name=body.get('display_name') or None); s.__dict__.setdefault('emails',{})[un]=body.get('email') or None
            s.J(route,{'ok':True,'username':un}); return True
        APP=s.__dict__.setdefault('apps',{}); VER=s.__dict__.setdefault('ver',{})
        if base.startswith('/rest/v1/specialist_applications'):
            a_=APP.get(me); s.J(route,[a_] if a_ else []); return True
        if base in('/rest/v1/rpc/rutinal_apply_specialist','/rest/v1/rpc/rutinal_admin_applications','/rest/v1/rpc/rutinal_admin_review','/rest/v1/rpc/rutinal_admin_verifications','/rest/v1/rpc/rutinal_admin_set_verification','/rest/v1/rpc/rutinal_specialist_badge'):
            fn=base.rsplit('/',1)[1]; adm=me and s.users[me]['admin']
            if fn=='rutinal_apply_specialist':
                r=body['p_roles']; c=''.join(ch for ch in (body.get('p_cedula') or '') if ch.isdigit())
                if any(x!='coach' for x in r) and not (6<=len(c)<=10): s.J(route,{'ok':False,'error':'cedula'}); return True
                APP[me]={'username':me,'display_name':s.users[me]['name'],'roles':r,'full_name':body['p_full_name'],'cedula':c or None,'credentials':body.get('p_credentials'),'status':'pending','review_note':None,'created_at':'2026-11-24T10:00:00+00:00'}
                s.J(route,{'ok':True}); return True
            if fn=='rutinal_admin_applications': s.J(route,[a_ for a_ in APP.values() if a_['status']=='pending'] if adm else []); return True
            if fn=='rutinal_admin_review':
                if not adm: s.J(route,{'ok':False,'error':'forbidden'}); return True
                a_=APP[body['p_username']]
                if body['p_approve']:
                    s.users[a_['username']]['specs']=sorted(set(s.users[a_['username']]['specs']+body['p_roles'])); a_['status']='approved'; VER[a_['username']]={'cedula':a_['cedula'],'verified':True}
                else: a_['status']='rejected'; a_['review_note']=body.get('p_note')
                s.J(route,{'ok':True}); return True
            if fn=='rutinal_admin_verifications': s.J(route,{k:dict(VER.get(k,{'cedula':None,'verified':False}),email=s.__dict__.get('emails',{}).get(k)) for k in s.users} if adm else {}); return True
            if fn=='rutinal_admin_set_verification': VER[body['p_username']]={'cedula':body['p_cedula'] or None,'verified':body['p_verified']}; s.J(route,{'ok':True}); return True
            if fn=='rutinal_specialist_badge':
                u=body['p_username']; s.J(route,VER.get(u,{'cedula':None,'verified':False}) if u in s.users and s.users[u]['specs'] else None); return True
        if base=='/functions/v1/athletes' or base in('/rest/v1/rpc/rutinal_my_slots','/rest/v1/rpc/rutinal_my_reserved_invite'):
            if not me: s.J(route,{'ok':False,'error':'session'}); return True
            myid=s.users[me]['id']; LIM=s.__dict__.setdefault('limits',{}); lim=LIM.get(me,5)
            act=len(set(l['client'] for l in s.links if l['spec']==myid and l['status']=='active' and l['client']!=myid))
            pen=len(set(l['client'] for l in s.links if l['spec']==myid and l['status']=='pending' and l['client']))
            if base.endswith('my_slots'): s.J(route,{'used':act,'pending':pen,'limit':lim,'unlimited':s.users[me]['admin']}); return True
            if base.endswith('reserved_invite'):
                l=next((l for l in reversed(s.links) if l['client']==myid and l['status']=='pending' and l['code']),None); s.J(route,l['code'] if l else None); return True
            un=body['username']
            if not s.users[me]['specs']: s.J(route,{'ok':False,'error':'forbidden'}); return True
            if not s.users[me]['admin'] and act+pen>=lim: s.J(route,{'ok':False,'error':'athlete_limit'}); return True
            if un in s.users: s.J(route,{'ok':False,'error':'taken'}); return True
            s.add(un,body['password'],name=body.get('display_name') or None)
            code=''.join(random.choice('ABCDEFGHJKMNPQRSTUVWXYZ23456789') for _ in range(8))
            for r in body['roles']: s.links.append({'id':'l%d'%len(s.links),'spec':myid,'client':s.users[un]['id'],'role':r,'status':'pending','code':code})
            s.J(route,{'ok':True,'username':un}); return True
        if not base.startswith('/rest/v1/rpc/rutinal_'): return None
        J=lambda o: s.J(route,o) or True
        if not me: return J({'ok':False,'error':'session'})
        myid=s.users[me]['id']; fn=base.rsplit('/',1)[1]
        if fn in('rutinal_invite','rutinal_invite_many'):
            roles=body['p_roles'] if fn=='rutinal_invite_many' else [body['p_role']]
            if not roles or any(r not in s.users[me]['specs'] for r in roles): return J({'ok':False,'error':'forbidden'})
            if not s.users[me]['admin'] and len(set(l['client'] for l in s.links if l['spec']==myid and l['status']=='active'))>=s.__dict__.setdefault('limits',{}).get(me,5): s.J(route,{'code':'P0001','message':'athlete_limit'},400); return True
            code=''.join(random.choice('ABCDEFGHJKMNPQRSTUVWXYZ23456789') for _ in range(8))
            for r in roles: s.links.append({'id':'l%d'%len(s.links),'spec':myid,'client':None,'role':r,'status':'pending','code':code})
            return J({'ok':True,'code':code,'roles':roles})
        if fn in('rutinal_invite_preview','rutinal_invite_accept'):
            ls=[l for l in s.links if l['code']==body['p_code'].strip().upper() and l['status']=='pending']
            if not ls: return J({'ok':False,'error':'bad_code'})
            if ls[0]['spec']==myid: return J({'ok':False,'error':'own_code'})
            if fn=='rutinal_invite_preview': return J({'ok':True,'role':ls[0]['role'],'roles':[l['role'] for l in ls],'specialist':s.name(ls[0]['spec']),'username':next((k for k,v in s.users.items() if v['id']==ls[0]['spec']),None),'keys':sorted(set(k for l in ls for k in ROLE_KEYS[l['role']]))})
            sp_=ls[0]['spec']; spn=next(k for k,v in s.users.items() if v['id']==sp_)
            if not s.users[spn]['admin'] and not any(x['status']=='active' and x['spec']==sp_ and x['client']==myid for x in s.links) and len(set(l['client'] for l in s.links if l['spec']==sp_ and l['status']=='active'))>=s.__dict__.setdefault('limits',{}).get(spn,5): s.J(route,{'code':'P0001','message':'athlete_limit'},400); return True
            for l in ls:
                if any(x['status']=='active' and x['spec']==l['spec'] and x['client']==myid and x['role']==l['role'] for x in s.links): s.links.remove(l)
                else: l.update(client=myid,status='active',code=None)
            return J({'ok':True})
        if fn=='rutinal_link_end':
            l=next((l for l in s.links if l['id']==body['p_id'] and myid in (l['spec'],l['client'])),None)
            if not l: return J({'ok':False,'error':'not_found'})
            if l['status']=='pending': s.links.remove(l)
            else:
                l['status']='ended'
                for r in s.tables.get('assignments',[]):
                    if r['specialist_id']==l['spec'] and r['client_id']==l['client'] and r['role']==l['role']: r['status']='ended'
            return J({'ok':True})
        if fn=='rutinal_self_link':
            me=next((v for v in s.users.values() if v['id']==myid),{})
            if not me.get('specs'): return J({'ok':False,'error':'not_specialist'})
            n=0
            for r in ['coach','nutriologo','fisioterapeuta']:
                if not any(l['spec']==myid and l['client']==myid and l['role']==r and l['status']=='active' for l in s.links):
                    s.links.append({'id':'self-'+r+'-'+str(len(s.links)),'spec':myid,'client':myid,'role':r,'status':'active','code':None}); n+=1
            return J({'ok':True,'created':n})
        if fn=='rutinal_my_links':
            def summ(l):
                d=[(k,v) for k,v in s.docs.items() if k[0]==l['client'] and k[1] in ROLE_KEYS[l['role']]]
                o={'id':l['id'],'role':l['role'],'status':l['status'],'code':l['code'],'client_id':l['client'],'name':s.name(l['client']) if l['client'] else None,'username':next((k for k,v in s.users.items() if v['id']==l['client']),None),
                   'last_activity':'2026-11-19T10:00:00+00:00' if d else None,'meals7':None,'workouts7':None,'pain7':None}
                if l['role']=='nutriologo': o['meals7']=sum(1 for k,v in d if k[1]=='meal_log' and v['value'])
                else:
                    g=[v['value'] for k,v in d if k[1]=='gym_logs' and v['value']]; o['workouts7']=sum(1 for x in g if x.get('done')); ps=[x['feel']['pain'] for x in g if x.get('feel') and isinstance(x['feel'].get('pain'),(int,float))]; o['pain7']=max(ps) if ps else None
                return o
            return J({'ok':True,'as_client':[{'id':l['id'],'role':l['role'],'name':s.name(l['spec']),'username':next((k for k,v in s.users.items() if v['id']==l['spec']),None),'keys':ROLE_KEYS[l['role']]} for l in s.links if l['client']==myid and l['status']=='active'],
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
    pg.add_init_script("localStorage.setItem('hoy_prog_open','1')"); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def login(pg,u,pw,sync=None):
    pg.fill('#auth-user',u); pg.fill('#auth-pass',pw); pg.click('#auth-submit'); pg.wait_for_timeout(1200)
    if sync is True: pg.click('#sync-on'); pg.wait_for_timeout(1000)
    elif sync is False: pg.click('#sync-later'); pg.wait_for_timeout(300)
txt=lambda pg: pg.evaluate("document.getElementById('sheet-body').innerText.replace(/\\n+/g,' | ')")
