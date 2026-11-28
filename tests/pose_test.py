from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('rep_test.py').read(); lang='es'
exec(src[src.index('SEEDA='):src.index('def ctx2')])
SEEDN="localStorage.setItem('rutinal_lang','es');"
sb.users['nora']['specs']=['coach','nutriologo']
def ctx2(b,seed):
    c=b.new_context(viewport={'width':400,'height':860},locale='es',device_scale_factor=2); pg=c.new_page(); pg.errs=[]; pg.on('pageerror',lambda e:pg.errs.append(str(e)))
    pg.on('dialog',lambda d:d.accept()); pg.route('**/*',sb.handle); pg.add_init_script(seed); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600); return pg
def shot(pg,name,wait=600): pg.wait_for_timeout(wait); pg.screenshot(path='/tmp/g/z_%s.png'%name)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    N=ctx2(b,SEEDN); N.fill('#auth-user','nora'); N.fill('#auth-pass','secreta3'); N.click('#auth-submit'); N.wait_for_timeout(1200); N.click('[data-who="spec"]'); N.wait_for_timeout(700)
    N.click('#sp-invite'); N.wait_for_timeout(600); N.click('[data-add="code"]'); N.wait_for_timeout(400); N.click('#sheet-save'); N.wait_for_timeout(600); code=N.inner_text('.lk-code'); N.evaluate("closeSheet()")
    A=ctx2(b,SEEDA); login(A,'ana','secreta1',True); A.wait_for_timeout(600)
    A.evaluate("openLinks()"); A.wait_for_timeout(500); A.fill('#lk-code',code); A.click('#lk-go'); A.wait_for_timeout(500); A.click('#lk-accept'); A.wait_for_timeout(900); A.evaluate("closeSheet()")
    # fotos de una semana anterior, por la pantalla de Fotos de progreso
    A.evaluate("openPhotos()"); A.wait_for_timeout(900); A.check('#ph-share')
    for pose,f in (('front','f1'),('back','b1')):
        A.click('#ph-pose [data-v="%s"]'%pose)
        with A.expect_file_chooser() as fc: A.click('#ph-add')
        fc.value.set_files('/tmp/g/%s.jpg'%f); A.wait_for_timeout(1800)
    for r in sb.tables['progress_photos']: r['taken_on']='2026-11-09'
    A.evaluate("closeSheet()")
    # check-in con fotos de esta semana
    A.evaluate("openCheckinForm()"); A.wait_for_timeout(1200); A.evaluate("document.getElementById('ck-photos').scrollIntoView({block:'center'})"); shot(A,'ck_vacio')
    for pose,f in (('front','f2'),('side','s1'),('back','b2')):
        with A.expect_file_chooser() as fc: A.click('[data-ck-ph="%s"]'%pose)
        fc.value.set_files('/tmp/g/%s.jpg'%f); A.wait_for_timeout(1800)
    A.evaluate("document.getElementById('ck-photos').scrollIntoView({block:'center'})"); shot(A,'ck_fotos',900)
    print('fotos',[(r['pose'],r['taken_on'],r['shared']) for r in sb.tables['progress_photos']])
    for k in ('energy','hunger','sleep'): A.evaluate("k=>document.querySelector('.ck-ed [data-ck=\"'+k+'\"] .chip[data-v=\"4\"]').click()",k)
    A.click('#sheet-save'); A.wait_for_timeout(1500); A.evaluate("closeSheet()")
    A.evaluate("openPhotos()"); A.wait_for_timeout(1500); shot(A,'comparar',900)
    A.select_option('[data-cmp="a"]','1'); A.wait_for_timeout(500); print('poses comparables',A.locator('[data-cmp-pose]').count())
    # coach
    N.evaluate("closeSheet()"); N.wait_for_timeout(300); N.evaluate("_sp.at=0"); N.click('nav button[data-tab="sp-clients"]'); N.wait_for_timeout(900); N.click('#tab-sp-clients .sp-row:not(.sp-self)[data-sp-open]'); N.wait_for_timeout(1000)
    N.evaluate("_sp.tab='checkins';spOpenClient(_sp.client)"); N.wait_for_timeout(2200); print('coach pares',N.locator('#sp-ck .ph-cmp').count(), N.locator('#sp-ck .ph-cmp figure').count())
    N.evaluate("document.querySelector('#sp-ck .ph-cmp').scrollIntoView({block:'center'})"); shot(N,'coach_ck',900)
    N.evaluate("_sp.tab='progress';spOpenClient(_sp.client)"); N.wait_for_timeout(2200); N.evaluate("document.getElementById('sp-photos').scrollIntoView({block:'start'})"); N.evaluate("window.scrollBy(0,-80)"); shot(N,'coach_fotos',900)
    print('errs',A.errs,N.errs)
