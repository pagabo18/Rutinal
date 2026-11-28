from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDN="localStorage.setItem('rutinal_lang','es');"
sb.users['nora']['specs']=['coach','nutriologo']
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=500): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/m_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); N.click('[data-add="code"]'); N.wait_for_timeout(400); N.click('#sheet-save'); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    A.click('nav button[data-tab="comida"]'); A.wait_for_timeout(600)
    k0=A.evaluate("dayMealTotals?0:0")
    before=A.evaluate("(()=>{let k=0;const d=mealLog()[foodViewDate]||{};Object.values(d).forEach(a=>a.forEach(it=>k+=calcItemMacros(it).kcal));return k})()")
    A.evaluate("document.getElementById('food-hand-btn').scrollIntoView({block:'center'})"); shot(A,'acciones')
    A.click('#food-hand-btn'); A.wait_for_timeout(300)
    for k,n in (('palm',3),('cup',2),('thumb',1),('fist',2)):
        for _ in range(n): A.click('[data-hp="%s"][data-d="0.5"]'%k)
    A.click('#hp-meal [data-v="dinner"]'); shot(A,'mano'); A.click('#sheet-save'); A.wait_for_timeout(500)
    after=A.evaluate("(()=>{let k=0;const d=mealLog()[foodViewDate]||{};Object.values(d).forEach(a=>a.forEach(it=>k+=calcItemMacros(it).kcal));return k})()")
    print('kcal mano', after-before, 'esperado', 145*1.5+120*1+100*.5+25*1, A.evaluate("(mealLog()[foodViewDate].dinner||[]).map(i=>i.name)"))
    # foto
    with A.expect_file_chooser() as fc: A.locator('[data-mp-add="dinner"]').click()
    fc.value.set_files('/tmp/g/plato.jpg'); A.wait_for_timeout(2500)
    print('sheet?',A.evaluate("[document.getElementById('sheet').classList.contains('show'),document.getElementById('sheet-title').textContent,document.getElementById('mp-msg').textContent]")); A.evaluate('closeSheet()'); A.wait_for_timeout(300)
    A.click('#food-photo-btn'); A.wait_for_timeout(300); shot(A,'elige')
    with A.expect_file_chooser() as fc: A.click('[data-mp-meal="breakfast"]')
    fc.value.set_files('/tmp/g/plato.jpg'); A.wait_for_timeout(2500)
    print('rows',[(r['meal'],r['day'],r['user_id']) for r in sb.tables.get('meal_photos',[])],'files',len(sb.files))
    A.evaluate("document.querySelector('.mc-photos .mp-t').scrollIntoView({block:'center'})"); shot(A,'comida',900)
    A.locator('.mc-photos .mp-t').first.click(); shot(A,'ver',700); A.evaluate("closeSheet()")
    # nutri
    N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(1000)
    N.evaluate("_sp.tab='logs';spOpenClient(_sp.client)"); N.wait_for_timeout(1800); print('nutri ve',N.locator('#sp-mp .ph-t').count()); N.evaluate("document.getElementById('sp-mp').scrollIntoView({block:'start'})"); N.evaluate("window.scrollBy(0,-80)"); shot(N,'nutri',900)
    # borrar
    A.locator('.mc-photos .mp-t').first.click(); A.wait_for_timeout(500); A.click('#mp-del'); A.wait_for_timeout(1200); print('tras borrar',len(sb.tables['meal_photos']),len(sb.files))
    print('errs',A.errs,N.errs)
