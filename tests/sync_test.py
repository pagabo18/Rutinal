import json, sys
from playwright.sync_api import sync_playwright
from fake_sb import FakeSB
sb=FakeSB(); sb.add('ana','secreta1'); sb.add('beto','secreta2')
SEED="""localStorage.setItem('rutinal_lang','es');
if(!localStorage.getItem('__seeded')){localStorage.setItem('__seeded','1');
localStorage.setItem('meal_log',JSON.stringify({'2026-11-20':{breakfast:[{name:'Avena',grams:80,per100g:{kcal:380,protein:13,carbs:67,fat:7}}]},'2026-11-21':{lunch:[{name:'Pollo',grams:150,per100g:{kcal:165,protein:31,carbs:0,fat:3.6}}]}}));
localStorage.setItem('weight_log',JSON.stringify({'2026-11-20':78.2}));
localStorage.setItem('nutri_profile',JSON.stringify({sex:'M',age:30,heightCm:175,weightKg:78,activity:'moderate',goal:'cut'}));}"""
def new_ctx(b,seed=True):
    ctx=b.new_context(viewport={'width':400,'height':860},locale='es'); pg=ctx.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.dialogs=[]; pg.accept=True; pg.on('dialog',lambda d:(pg.dialogs.append(d.message),d.accept() if pg.accept else d.dismiss()))
    pg.route('**/*',sb.handle)
    pg.add_init_script(SEED if seed else "localStorage.setItem('rutinal_lang','es');")
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def login(pg,u,pw):
    pg.fill('#auth-user',u); pg.fill('#auth-pass',pw); pg.click('#auth-submit'); pg.wait_for_timeout(1200)
docs=lambda uid=None: sorted('%s|%s=%s'%(k[1],k[2],'∅' if v['value'] is None else 'ok') for k,v in sb.docs.items() if uid is None or k[0]==uid)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    A=new_ctx(b); login(A,'ana','secreta1')
    print('1 hoja de consentimiento:',A.evaluate("document.getElementById('sheet-title').textContent"), '| docs',len(sb.docs)); A.screenshot(path='/tmp/t/sync_consent.png')
    A.click('#sync-on'); A.wait_for_timeout(1200)
    print('2 primera subida:',docs())
    A.evaluate("(()=>{const w=S.get('weight_log',{}); w['2026-11-22']=77.9; S.set('weight_log',w); const m=S.get('meal_log',{}); delete m['2026-11-20']; S.set('meal_log',m); S.set('habits',[{id:'h1',name:'Leer'}]);})()")
    print('3 pendientes:',A.evaluate("Object.keys(JSON.parse(localStorage.getItem('__sync')).dirty)"))
    sb.calls.clear(); A.wait_for_timeout(5200); print('4 tras subir:',docs(), [c for c in sb.calls if 'user_docs' in c])
    # segundo dispositivo, misma cuenta, vacío
    B=new_ctx(b,seed=False); login(B,'ana','secreta1'); B.click('#sync-on'); B.wait_for_timeout(1200)
    print('5 dispositivo B:',B.evaluate("[Object.keys(S.get('meal_log',{})),S.get('weight_log',{}),S.get('habits',null),S.get('nutri_profile',{}).goal]"))
    B.evaluate("(()=>{const m=S.get('meal_log',{}); m['2026-11-22']={dinner:[{name:'Atún',grams:100,per100g:{kcal:116,protein:26,carbs:0,fat:1}}]}; S.set('meal_log',m); S.del('habits');})()"); B.wait_for_timeout(5200)
    A.evaluate("syncNow()"); A.wait_for_timeout(800)
    print('6 A recibe de B:',A.evaluate("[Object.keys(S.get('meal_log',{})),S.get('habits','(borrado)')]"), '| dirty A',A.evaluate("Object.keys(JSON.parse(localStorage.getItem('__sync')).dirty||{})"))
    # conflicto: ambos cambian el mismo día; B sube primero, A después → gana A
    B.evaluate("(()=>{const w=S.get('weight_log',{}); w['2026-11-22']=70; S.set('weight_log',w)})()"); B.evaluate("syncNow()"); B.wait_for_timeout(600)
    A.evaluate("(()=>{const w=S.get('weight_log',{}); w['2026-11-22']=80; S.set('weight_log',w)})()"); A.evaluate("syncNow()"); A.wait_for_timeout(600); B.evaluate("syncNow()"); B.wait_for_timeout(600)
    print('7 conflicto:',A.evaluate("S.get('weight_log',{})['2026-11-22']"),B.evaluate("S.get('weight_log',{})['2026-11-22']"), sb.docs[('uid-ana','weight_log','2026-11-22')]['value'])
    # sin red: se acumula y sube al volver
    sb.net=False; A.evaluate("(()=>{const w=S.get('weight_log',{}); w['2026-11-23']=79; S.set('weight_log',w)})()"); A.evaluate("syncNow()"); A.wait_for_timeout(500)
    d1=A.evaluate("Object.keys(JSON.parse(localStorage.getItem('__sync')).dirty||{})"); sb.net=True; A.evaluate("syncNow()"); A.wait_for_timeout(600)
    print('8 sin red:',d1,'→',('uid-ana','weight_log','2026-11-23') in sb.docs)
    # otra cuenta en el dispositivo A
    A.evaluate("authEndSession('')"); A.wait_for_timeout(200); A.accept=False; login(A,'beto','secreta2')
    print('9 otra cuenta, cancela:',A.dialogs[-1][:150].replace('\n',' / '),'| gate',A.evaluate("getComputedStyle(document.getElementById('auth-gate')).display"),'| conserva',A.evaluate("Object.keys(S.get('meal_log',{})).length"))
    A.accept=True; login(A,'beto','secreta2'); A.wait_for_timeout(400)
    print('10 otra cuenta, acepta: local',A.evaluate("[Object.keys(S.get('meal_log',{})).length, S.get('weight_log',null), JSON.parse(localStorage.getItem('__sync')).user]"),'| hoja',A.evaluate("document.getElementById('sheet-title').textContent"),'| docs beto',docs('uid-beto'))
    A.click('#sync-later'); A.wait_for_timeout(300); n=len(sb.calls); A.evaluate("(()=>{S.set('weight_log',{'2026-11-22':90})})()"); A.wait_for_timeout(4600)
    print('11 sin consentimiento no sube:',docs('uid-beto'),[c for c in sb.calls[n:] if 'user_docs' in c], A.evaluate("document.getElementById('btn-acct-sync').textContent"))
    # ana vuelve en dispositivo nuevo tras reinstalar: recupera todo
    C=new_ctx(b,seed=False); login(C,'ana','secreta1'); C.click('#sync-on'); C.wait_for_timeout(1200)
    print('12 reinstalación:',C.evaluate("[Object.keys(S.get('meal_log',{})).sort(),S.get('weight_log',{}),S.get('nutri_profile',{}).heightCm]"))
    C.evaluate("document.querySelector('nav button[data-tab=\"comida\"]').click()"); C.wait_for_timeout(500); C.screenshot(path='/tmp/t/sync_c.png')
    print('errors',A.errs,B.errs,C.errs)
    b.close()
