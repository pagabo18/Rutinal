import json, sys, re
from playwright.sync_api import sync_playwright
USERS={'gabo':{'pass':'secreta1','admin':True,'active':True,'note':'Administrador','specs':[],'name':None,'last':None,'id':'u-gabo'}}
ACC={}; REF={}; MODE={'net':True}; N=[0]
def mint(u):
    N[0]+=1; a='acc%d'%N[0]; r='ref%d'%N[0]; ACC[a]=u; REF[r]=u
    return {'access_token':a,'refresh_token':r,'expires_in':3600,'user':{'id':USERS[u]['id']}}
def run(lang):
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        ctx=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        dialogs=[]; pg.on('dialog',lambda d:(dialogs.append(d.message),d.accept())); calls=[]
        H={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'}
        def J(route,obj,status=200): route.fulfill(status=status,content_type='application/json',body=json.dumps(obj),headers=H)
        def h(route):
            rq=route.request; u=rq.url
            if 'localhost' in u: return route.continue_()
            if 'supabase.co' not in u: return route.abort()
            if rq.method=='OPTIONS': return route.fulfill(status=200,headers=H)
            path=u.split('supabase.co')[1]; calls.append(rq.method+' '+path.split('?')[0]+('?'+path.split('grant_type=')[1] if 'grant_type=' in path else ''))
            if not MODE['net']: return route.abort()
            assert rq.headers.get('apikey','').startswith('sb_publishable_')
            body=json.loads(rq.post_data) if rq.post_data else {}
            tok=(rq.headers.get('authorization') or '').replace('Bearer ','')
            me=ACC.get(tok)
            if 'grant_type=password' in path:
                un=body['email'].split('@')[0]; assert body['email'].endswith('@rutinal.invalid'); U=USERS.get(un)
                if not U or U['pass']!=body['password']: return J(route,{'error_code':'invalid_credentials'},400)
                if not U['active']: return J(route,{'error_code':'user_banned'},400)
                U['last']='2026-11-22T05:30:00Z'; return J(route,mint(un))
            if 'grant_type=refresh_token' in path:
                un=REF.pop(body['refresh_token'],None)
                if not un or un not in USERS or not USERS[un]['active']: return J(route,{'error_code':'refresh_token_not_found'},400)
                return J(route,mint(un))
            if path.startswith('/rest/v1/profiles'):
                if not me or me not in USERS: return J(route,{'message':'JWT expired'},401)
                U=USERS[me]; return J(route,[{'username':me,'display_name':U['name'],'specialties':U['specs'],'is_admin':U['admin'],'active':U['active']}])
            if path.startswith('/auth/v1/logout'): ACC.pop(tok,None); return route.fulfill(status=204,headers=H)
            if path.startswith('/auth/v1/user'):
                if not me: return J(route,{},401)
                if USERS[me]['pass']!=body.get('current_password'): return J(route,{'error_code':'invalid_credentials'},400)
                USERS[me]['pass']=body['password']; return J(route,{'id':USERS[me]['id']})
            if path.startswith('/functions/v1/admin-users'):
                if not me: return J(route,{'ok':False,'error':'session'})
                if not USERS[me]['admin']: return J(route,{'ok':False,'error':'forbidden'})
                a=body['action']
                if a=='list': return J(route,{'ok':True,'users':[dict(username=k,display_name=v['name'],specialties=v['specs'],is_admin=v['admin'],active=v['active'],note=v['note'],created_at='2026-11-22T05:00:00Z',last_login=v['last']) for k,v in USERS.items()]})
                if a=='save':
                    un=body['username']
                    if un not in USERS: USERS[un]={'pass':body['password'],'admin':body['is_admin'],'active':body['active'],'note':body['note'] or None,'specs':body['specialties'],'name':body['display_name'] or None,'last':None,'id':'u-'+un}; return J(route,{'ok':True,'created':True})
                    USERS[un].update(admin=body['is_admin'],active=body['active'],note=body['note'] or None,specs=body['specialties'],name=body['display_name'] or None)
                    if body.get('password'): USERS[un]['pass']=body['password']
                    return J(route,{'ok':True,'created':False})
                if a=='delete': USERS.pop(body['username'],None); return J(route,{'ok':True})
            return J(route,{},404)
        pg.route('**/*',h)
        pg.add_init_script("if(!localStorage.getItem('rutinal_lang')) localStorage.setItem('rutinal_lang','%s');"%lang)
        pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(700)
        vis=lambda: pg.evaluate("({gate:getComputedStyle(document.getElementById('auth-gate')).display, app:getComputedStyle(document.querySelector('nav')).visibility, msg:document.getElementById('auth-msg').textContent})")
        ajustes=lambda: (pg.click('nav button[data-tab="editar"]'), pg.wait_for_timeout(200), pg.click('#edit-mode .chip[data-v="ajustes"]'), pg.wait_for_timeout(300), pg.evaluate("document.getElementById('acct-setting').scrollIntoView({block:'center'})"), pg.wait_for_timeout(150))
        print('1 inicio',vis())
        pg.fill('#auth-user','Gabo'); pg.fill('#auth-pass','mala'); pg.click('#auth-submit'); pg.wait_for_timeout(400); print('2 mala',vis())
        pg.fill('#auth-pass','secreta1'); pg.click('#auth-submit'); pg.wait_for_timeout(600)
        print('3 ok',vis(), pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth'));return [s.user,s.admin,s.specs,!!s.access,!!s.refresh,s.v]})()"))
        ajustes(); print('4 cuenta',pg.evaluate("document.getElementById('acct-setting').innerText.replace(/\\n+/g,' | ')"))
        pg.click('#btn-acct-users'); pg.wait_for_timeout(500); pg.click('#usr-new'); pg.wait_for_timeout(300)
        pg.fill('#ue-user','Carlos-Coach'); pg.fill('#ue-name','Carlos'); pg.check('[data-spec="coach"]'); pg.check('[data-spec="nutriologo"]'); pg.screenshot(path='/tmp/t/a2_%s_new.png'%lang); newpass=pg.input_value('#ue-pass'); pg.click('#sheet-save'); pg.wait_for_timeout(400)
        print('5 creado',pg.inner_text('#sheet-title'),'|',USERS.get('carlos-coach',{}).get('specs')); pg.click('#ue-back'); pg.wait_for_timeout(500)
        print('6 lista',pg.evaluate("[...document.querySelectorAll('.usr-row')].map(e=>e.innerText.replace(/\\n+/g,' | '))")); pg.screenshot(path='/tmp/t/a2_%s_list.png'%lang)
        pg.click('.usr-row[data-usr="0"]'); pg.wait_for_timeout(300); pg.check('[data-spec="fisioterapeuta"]'); pg.click('#sheet-save'); pg.wait_for_timeout(700)
        pg.click('#sheet-close'); pg.wait_for_timeout(200); print('7 yo especialista',pg.evaluate("document.getElementById('acct-user').innerText.replace(/\\n+/g,' | ')"), USERS['gabo']['specs'])
        pg.click('#btn-acct-pass'); pg.wait_for_timeout(300); pg.fill('#cp-old','x'); pg.fill('#cp-new','nueva123'); pg.fill('#cp-new2','nueva123'); pg.click('#sheet-save'); pg.wait_for_timeout(400); m2=pg.inner_text('#cp-msg')
        pg.fill('#cp-old','secreta1'); pg.click('#sheet-save'); pg.wait_for_timeout(600); print('8 pass',m2,'|',USERS['gabo']['pass'],dialogs[-1:])
        calls.clear(); pg.reload(); pg.wait_for_timeout(700); print('9 recarga',vis(),calls)
        # token vencido → renueva solo
        calls.clear(); pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth')); s.exp=Date.now()-1000; localStorage.setItem('__auth',JSON.stringify(s))})()"); pg.reload(); pg.wait_for_timeout(700); print('10 token vencido',vis(),calls)
        # token rechazado (401) → renueva y reintenta
        calls.clear(); ACC.clear(); pg.reload(); pg.wait_for_timeout(800); print('11 token rechazado',vis(),calls)
        MODE['net']=False; pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth')); s.checkedAt=Date.now()-3*864e5; s.exp=0; localStorage.setItem('__auth',JSON.stringify(s))})()"); pg.reload(); pg.wait_for_timeout(700); print('12 sin red 3 días',vis())
        pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth')); s.checkedAt=Date.now()-20*864e5; localStorage.setItem('__auth',JSON.stringify(s))})()"); pg.reload(); pg.wait_for_timeout(700); print('13 sin red 20 días',vis())
        MODE['net']=True; pg.reload(); pg.wait_for_timeout(800); print('14 vuelve la red',vis())
        USERS['gabo']['active']=False; pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth')); s.exp=0; localStorage.setItem('__auth',JSON.stringify(s))})()"); pg.reload(); pg.wait_for_timeout(800); print('15 desactivado',vis(), pg.evaluate("localStorage.getItem('__auth')"))
        pg.fill('#auth-pass','nueva123'); pg.click('#auth-submit'); pg.wait_for_timeout(500); print('16 login desactivado',vis())
        USERS['gabo']['active']=True; pg.fill('#auth-pass','nueva123'); pg.click('#auth-submit'); pg.wait_for_timeout(600); ajustes(); pg.click('#btn-acct-logout'); pg.wait_for_timeout(500); print('17 logout',vis(),dialogs[-1:])
        # usuario normal
        pg.fill('#auth-user','carlos-coach'); pg.fill('#auth-pass',newpass); pg.click('#auth-submit'); pg.wait_for_timeout(600); ajustes()
        print('18 coach',vis(),pg.evaluate("[document.getElementById('acct-user').innerText.replace(/\\n+/g,' | '), getComputedStyle(document.getElementById('btn-acct-users')).display]"))
        # sesión del sistema anterior
        pg.evaluate("localStorage.setItem('__auth',JSON.stringify({user:'gabo',token:'t000',role:'admin',checkedAt:Date.now()}))"); pg.reload(); pg.wait_for_timeout(600); print('19 sesión vieja',vis(),pg.input_value('#auth-user')); pg.screenshot(path='/tmp/t/a2_%s_old.png'%lang)
        print('errors',errs)
        USERS.clear(); USERS['gabo']={'pass':'secreta1','admin':True,'active':True,'note':'Administrador','specs':[],'name':None,'last':None,'id':'u-gabo'}; ACC.clear(); REF.clear()
        b.close()
for l in sys.argv[1:]: run(l)
