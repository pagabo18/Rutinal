import sys,json
from playwright.sync_api import sync_playwright
LANG=sys.argv[1] if len(sys.argv)>1 else 'es'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
    ctx.add_init_script(f"localStorage.setItem('rutinal_lang','{LANG}');")
    ctx.add_init_script(open('seed.js').read())
    pg=ctx.new_page(); errs=[]; dl=[]
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('dialog',lambda d:(dl.append(d.message),d.dismiss()))
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    pg.evaluate("()=>document.querySelector('nav button[data-tab=comida]').click()"); pg.wait_for_timeout(300)
    pg.evaluate("()=>document.getElementById('food-review-link').click()"); pg.wait_for_timeout(400)
    pg.screenshot(path=f'rv_{LANG}_sheet.png')
    for per in ['week','month','year']:
        pg.evaluate(f"()=>document.querySelector('[data-rv-period={per}]').click()"); pg.wait_for_timeout(300)
        pg.evaluate("()=>document.getElementById('rv-generate').click()"); pg.wait_for_timeout(500)
        pg.screenshot(path=f'rv_{LANG}_{per}.png', full_page=False)
        # fuerza captura del documento completo
        h=pg.evaluate("()=>document.getElementById('review-print').scrollHeight")
        pg.set_viewport_size({'width':390,'height':min(h,6000)}); pg.wait_for_timeout(200)
        pg.screenshot(path=f'rv_{LANG}_{per}_full.png')
        pg.set_viewport_size({'width':390,'height':844})
        # ruta Android simulada
        pg.evaluate("()=>{window.Android={printHtml:(n,h)=>{window.__printed={n,h};return true;}};}")
        pg.evaluate("()=>document.getElementById('rp-save').click()"); pg.wait_for_timeout(200)
        pr=pg.evaluate("()=>window.__printed && {n:window.__printed.n, len:window.__printed.h.length, head:window.__printed.h.slice(0,120)}")
        print(per, pr)
        open(f'printed_{LANG}_{per}.html','w').write(pg.evaluate("()=>window.__printed.h"))
        if per=='month':
            open(f'printed_{LANG}.html','w').write(pg.evaluate("()=>window.__printed.h"))
        pg.evaluate("()=>{delete window.Android; document.getElementById('rp-close').click(); document.getElementById('food-review-link').click();}"); pg.wait_for_timeout(300)
    # ruta web: window.print
    pg.evaluate("()=>{window.__pc=0; window.print=()=>{window.__pc++;}; document.querySelector('[data-rv-period=week]').click();}"); pg.wait_for_timeout(200)
    pg.evaluate("()=>document.getElementById('rv-generate').click()"); pg.wait_for_timeout(300)
    pg.evaluate("()=>document.getElementById('rp-save').click()")
    print('print calls', pg.evaluate("()=>window.__pc"), 'errors', errs[:5], 'dialogs', dl)
    b.close()
