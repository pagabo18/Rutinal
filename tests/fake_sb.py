import json, re, urllib.parse
class FakeSB:
    """Servidor simulado de Supabase (Auth, profiles, admin-users, user_docs) para playwright."""
    H={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'}
    def __init__(s):
        s.users={}; s.acc={}; s.ref={}; s.n=0; s.net=True; s.docs={}; s.clock=0; s.calls=[]
    def add(s,u,pw,admin=False,specs=None,name=None):
        s.users[u]={'pass':pw,'admin':admin,'active':True,'note':None,'specs':specs or [],'name':name,'last':None,'id':'uid-'+u}
    def mint(s,u):
        s.n+=1; a='acc%d'%s.n; r='ref%d'%s.n; s.acc[a]=u; s.ref[r]=u
        return {'access_token':a,'refresh_token':r,'expires_in':3600,'user':{'id':s.users[u]['id']}}
    def ts(s):
        s.clock+=1; return '2026-11-22T10:%02d:%02d.%06d+00:00'%(s.clock//3600%60, s.clock//60%60*0 + s.clock%60, s.clock)
    def J(s,route,obj,status=200): route.fulfill(status=status,content_type='application/json',body=json.dumps(obj),headers=s.H)
    def handle(s,route):
        rq=route.request; u=rq.url
        if 'localhost' in u: return route.continue_()
        if 'supabase.co' not in u: return route.abort()
        if rq.method=='OPTIONS': return route.fulfill(status=200,headers=s.H)
        path=u.split('supabase.co')[1]; base=path.split('?')[0]; qs=urllib.parse.parse_qs(urllib.parse.urlparse(u).query)
        s.calls.append(rq.method+' '+base+(' '+qs['grant_type'][0] if 'grant_type' in qs else ''))
        if not s.net: return route.abort()
        assert rq.headers.get('apikey','').startswith('sb_publishable_')
        body=json.loads(rq.post_data) if rq.post_data else {}
        tok=(rq.headers.get('authorization') or '').replace('Bearer ',''); me=s.acc.get(tok)
        if me and (me not in s.users): me=None
        J=lambda o,st=200: s.J(route,o,st)
        if qs.get('grant_type')==['password']:
            un=body['email'].split('@')[0]; U=s.users.get(un)
            if not U or U['pass']!=body['password']: return J({'error_code':'invalid_credentials'},400)
            if not U['active']: return J({'error_code':'user_banned'},400)
            U['last']='2026-11-22T05:30:00Z'; return J(s.mint(un))
        if qs.get('grant_type')==['refresh_token']:
            un=s.ref.pop(body['refresh_token'],None)
            if not un or un not in s.users or not s.users[un]['active']: return J({'error_code':'refresh_token_not_found'},400)
            return J(s.mint(un))
        if base=='/rest/v1/profiles':
            if not me: return J({'message':'JWT expired'},401)
            U=s.users[me]; return J([{'username':me,'display_name':U['name'],'specialties':U['specs'],'is_admin':U['admin'],'active':U['active']}])
        if base=='/auth/v1/logout': s.acc.pop(tok,None); return route.fulfill(status=204,headers=s.H)
        if base=='/auth/v1/user':
            if not me: return J({},401)
            if s.users[me]['pass']!=body.get('current_password'): return J({'error_code':'invalid_credentials'},400)
            s.users[me]['pass']=body['password']; return J({'id':s.users[me]['id']})
        if base=='/rest/v1/user_docs':
            if not me: return J({'message':'JWT expired'},401)
            myid=s.users[me]['id']
            if rq.method=='POST':
                assert 'merge-duplicates' in rq.headers.get('prefer','')
                for r in body:
                    if r['user_id']!=myid: return J({'message':'rls'},403)
                    s.docs[(r['user_id'],r['key'],r['sub'])]={'value':r['value'],'updated_at':s.ts()}
                return route.fulfill(status=201,headers=s.H)
            uid=qs['user_id'][0].replace('eq.',''); gt=qs.get('updated_at',[''])[0].replace('gt.','')
            if uid!=myid and not s.can_read(me,uid): rows=[]
            else:
                rows=[{'key':k[1],'sub':k[2],'value':v['value'],'updated_at':v['updated_at']} for k,v in s.docs.items() if k[0]==uid and (uid==myid or s.can_read(me,uid,k[1]))]
            if gt:
                from datetime import datetime
                p=lambda x: datetime.fromisoformat(x.replace('Z','+00:00'))
                rows=[r for r in rows if p(r['updated_at'])>p(gt)]
            rows.sort(key=lambda r:r['updated_at'])
            # el servidor reordena las claves (jsonb)
            return J(json.loads(json.dumps(rows[:500],sort_keys=True)))
        if base=='/functions/v1/admin-users':
            if not me: return J({'ok':False,'error':'session'})
            if not s.users[me]['admin']: return J({'ok':False,'error':'forbidden'})
            a=body['action']
            if a=='list': return J({'ok':True,'users':[dict(username=k,display_name=v['name'],specialties=v['specs'],is_admin=v['admin'],active=v['active'],note=v['note'],created_at='2026-11-22T05:00:00Z',last_login=v['last']) for k,v in s.users.items()]})
            if a=='save':
                un=body['username']
                if un not in s.users: s.add(un,body['password'],body['is_admin'],body['specialties'],body['display_name'] or None); s.users[un]['active']=body['active']; s.users[un]['note']=body['note'] or None; return J({'ok':True,'created':True})
                s.users[un].update(admin=body['is_admin'],active=body['active'],note=body['note'] or None,specs=body['specialties'],name=body['display_name'] or None)
                if body.get('password'): s.users[un]['pass']=body['password']
                return J({'ok':True,'created':False})
            if a=='delete': s.users.pop(body['username'],None); return J({'ok':True})
        r=s.extra(route,rq,base,qs,body,me)
        if r is None: return J({},404)
    def can_read(s,me,uid,key=None): return False
    def extra(s,route,rq,base,qs,body,me): return None
