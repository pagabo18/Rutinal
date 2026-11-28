import json, sys, time
from playwright.sync_api import sync_playwright
USERS={'gabo':{'pass':'secreta1','role':'admin','active':True,'note':'Administrador','last_login':None,'created_at':'2026-11-22T05:00:00Z'}}
SESS={}
MODE={'net':True}
def backend(fn,a):
    t=a.get('p_token'); me=SESS.get(t); meu=USERS.get(me) if me else None
    if meu and not meu['active']: me=None
    if fn=='rutinal_login':
        u=USERS.get(a['p_user'])
        if not u or u['pass']!=a['p_pass']: return {'ok':False,'error':'invalid'}
        if not u['active']: return {'ok':False,'error':'disabled'}
        tok='t%032d'%len(SESS); SESS[tok]=a['p_user']; u['last_login']='2026-11-22T05:30:00Z'
        return {'ok':True,'token':tok,'user':a['p_user'],'role':u['role']}
    if fn=='rutinal_check': return {'ok':True,'user':me,'role':USERS[me]['role']} if me else {'ok':False}
    if fn=='rutinal_logout': SESS.pop(t,None); return {'ok':True}
    if fn=='rutinal_change_password':
        if not me: return {'ok':False,'error':'session'}
        if USERS[me]['pass']!=a['p_old']: return {'ok':False,'error':'invalid'}
        USERS[me]['pass']=a['p_new']; return {'ok':True}
    if not me or USERS[me]['role']!='admin': return {'ok':False,'error':'forbidden'}
    if fn=='rutinal_admin_list': return {'ok':True,'users':[dict(username=k,role=v['role'],active=v['active'],note=v['note'],created_at=v['created_at'],last_login=v['last_login'],devices=1) for k,v in USERS.items()]}
    if fn=='rutinal_admin_save':
        u=a['p_user']
        if u not in USERS:
            USERS[u]={'pass':a['p_pass'],'role':a['p_role'],'active':a['p_active'],'note':a['p_note'] or None,'last_login':None,'created_at':'2026-11-22T06:00:00Z'}; return {'ok':True,'created':True}
        USERS[u].update(role=a['p_role'],active=a['p_active'],note=a['p_note'] or None)
        if a.get('p_pass'): USERS[u]['pass']=a['p_pass']
        return {'ok':True,'created':False}
    if fn=='rutinal_admin_delete': USERS.pop(a['p_user'],None); return {'ok':True}
def run(lang):
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        ctx=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.on('dialog',lambda d:(dialogs.append(d.message),d.accept())); dialogs=[]
        calls=[]
        def h(route):
            u=route.request.url
            if 'localhost' in u: return route.continue_()
            if 'supabase.co/rest/v1/rpc/' in u:
                if route.request.method=='OPTIONS': return route.fulfill(status=200,headers={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'})
                fn=u.rsplit('/',1)[1]; calls.append(fn)
                if not MODE['net']: return route.abort()
                assert route.request.headers.get('apikey','').startswith('sb_publishable_')
                return route.fulfill(status=200,content_type='application/json',body=json.dumps(backend(fn,json.loads(route.request.post_data))),headers={'access-control-allow-origin':'*'})
            return route.abort()
        pg.route('**/*',h)
        pg.add_init_script("if(!localStorage.getItem('rutinal_lang')) localStorage.setItem('rutinal_lang','%s');"%lang)
        pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(700)
        vis=lambda: pg.evaluate("({gate:getComputedStyle(document.getElementById('auth-gate')).display, app:getComputedStyle(document.querySelector('nav')).visibility, msg:document.getElementById('auth-msg').textContent})")
        print('1 inicio',vis()); pg.screenshot(path='/tmp/t/auth_%s_1gate.png'%lang)
        pg.fill('#auth-user','Gabo'); pg.fill('#auth-pass','mala'); pg.click('#auth-submit'); pg.wait_for_timeout(400)
        print('2 mala',vis()); pg.screenshot(path='/tmp/t/auth_%s_2err.png'%lang)
        pg.fill('#auth-pass','secreta1'); pg.click('#auth-submit'); pg.wait_for_timeout(500)
        print('3 ok',vis(), pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth'));return [s.user,s.role,s.token.length]})()"))
        pg.click('nav button[data-tab="editar"]'); pg.wait_for_timeout(200); pg.click('#edit-mode .chip[data-v="ajustes"]'); pg.wait_for_timeout(300)
        pg.evaluate("document.getElementById('acct-setting').scrollIntoView({block:'center'})"); pg.wait_for_timeout(200)
        print('4 cuenta',pg.evaluate("[document.getElementById('acct-setting').innerText.replace(/\\n+/g,' | '), getComputedStyle(document.getElementById('btn-acct-users')).display]")); pg.screenshot(path='/tmp/t/auth_%s_3acct.png'%lang)
        pg.click('#btn-acct-users'); pg.wait_for_timeout(500)
        pg.click('#usr-new'); pg.wait_for_timeout(300); pg.screenshot(path='/tmp/t/auth_%s_4new.png'%lang)
        gen=pg.input_value('#ue-pass'); pg.fill('#ue-user','A b'); pg.click('#sheet-save'); pg.wait_for_timeout(200)
        print('5 usuario malo',pg.inner_text('#ue-msg'), '| gen',len(gen))
        pg.fill('#ue-user','Cliente1'); pg.fill('#ue-note','Juan, cliente'); pg.click('#sheet-save'); pg.wait_for_timeout(400)
        print('6 creado',pg.inner_text('#sheet-title'),'|',pg.inner_text('.usr-cred').replace('\n',' / ')); pg.screenshot(path='/tmp/t/auth_%s_5cred.png'%lang)
        pg.click('#ue-back'); pg.wait_for_timeout(500)
        print('7 lista',pg.evaluate("[...document.querySelectorAll('.usr-row')].map(e=>e.innerText.replace(/\\n+/g,' | '))")); pg.screenshot(path='/tmp/t/auth_%s_6list.png'%lang)
        pg.click('.usr-row[data-usr="1"]'); pg.wait_for_timeout(300); pg.uncheck('#ue-active'); pg.screenshot(path='/tmp/t/auth_%s_7edit.png'%lang); pg.click('#sheet-save'); pg.wait_for_timeout(500)
        print('8 desactivado',USERS['cliente1']['active'], pg.evaluate("[...document.querySelectorAll('.usr-row')].map(e=>e.innerText.replace(/\\n+/g,' | '))")[1])
        pg.click('.usr-row[data-usr="0"]'); pg.wait_for_timeout(300); print('9 self',pg.evaluate("[!!document.getElementById('ue-active'),!!document.getElementById('ue-del'),document.getElementById('ue-user').disabled]")); pg.click('#sheet-close'); pg.wait_for_timeout(200)
        pg.click('#btn-acct-pass'); pg.wait_for_timeout(300); pg.fill('#cp-old','x'); pg.fill('#cp-new','nueva123'); pg.fill('#cp-new2','nueva124'); pg.click('#sheet-save'); pg.wait_for_timeout(200); m1=pg.inner_text('#cp-msg')
        pg.fill('#cp-new2','nueva123'); pg.click('#sheet-save'); pg.wait_for_timeout(300); m2=pg.inner_text('#cp-msg'); pg.screenshot(path='/tmp/t/auth_%s_8pass.png'%lang)
        pg.fill('#cp-old','secreta1'); pg.click('#sheet-save'); pg.wait_for_timeout(400)
        print('10 pass',m1,'|',m2,'|',USERS['gabo']['pass'],dialogs[-1:])
        calls.clear(); pg.reload(); pg.wait_for_timeout(700); print('11 recarga',vis(),calls)
        # sin red, verificación reciente
        MODE['net']=False; pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth')); s.checkedAt=Date.now()-3*864e5; localStorage.setItem('__auth',JSON.stringify(s))})()"); pg.reload(); pg.wait_for_timeout(700); print('12 sin red 3 días',vis())
        pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('__auth')); s.checkedAt=Date.now()-20*864e5; localStorage.setItem('__auth',JSON.stringify(s))})()"); pg.reload(); pg.wait_for_timeout(700); print('13 sin red 20 días',vis()); pg.screenshot(path='/tmp/t/auth_%s_9grace.png'%lang)
        MODE['net']=True; pg.reload(); pg.wait_for_timeout(700); print('14 vuelve la red',vis())
        # baja del usuario en servidor
        USERS['gabo']['active']=False; pg.reload(); pg.wait_for_timeout(700); print('15 dado de baja',vis(), pg.input_value('#auth-user'), pg.evaluate("localStorage.getItem('__auth')"))
        USERS['gabo']['active']=True; pg.fill('#auth-pass','nueva123'); pg.click('#auth-submit'); pg.wait_for_timeout(500)
        pg.click('nav button[data-tab="editar"]'); pg.wait_for_timeout(200); pg.click('#edit-mode .chip[data-v="ajustes"]'); pg.wait_for_timeout(300)
        pg.evaluate("document.getElementById('acct-setting').scrollIntoView({block:'center'})"); pg.click('#btn-acct-logout'); pg.wait_for_timeout(500)
        print('16 logout',vis(),dialogs[-1:],len(SESS), pg.evaluate("localStorage.getItem('__auth')"))
        print('errors',errs)
        USERS['gabo']['pass']='secreta1'; USERS.pop('cliente1',None); SESS.clear()
        b.close()
for l in sys.argv[1:]: run(l)
