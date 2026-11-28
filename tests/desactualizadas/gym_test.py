import sys,json
JSC=r'''
() => {
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const p = n.parentElement;
    if (!p || ['SCRIPT','STYLE'].includes(p.tagName)) continue;
    const v = n.nodeValue.trim();
    if (v) out.push(v);
  }
  document.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(el => {
    ['placeholder','title','aria-label','alt'].forEach(a => { const v = el.getAttribute(a); if (v && v.trim()) out.push(v.trim()); });
  });
  document.querySelectorAll('option').forEach(o => { if (o.textContent.trim()) out.push(o.textContent.trim()); });
  return out;
}
'''
from playwright.sync_api import sync_playwright
LANG=sys.argv[1] if len(sys.argv)>1 else 'es'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox','--proxy-server='+__import__('os').environ.get('HTTPS_PROXY',''),'--proxy-bypass-list=localhost;127.0.0.1'] , ignore_default_args=False)
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2, ignore_https_errors=True)
    ctx.add_init_script(f"if(!localStorage.getItem('__gt')){{localStorage.clear();localStorage.setItem('__gt','1');}} localStorage.setItem('rutinal_lang','{LANG}');")
    pg=ctx.new_page(); errs=[]; dl=[]; seen=set()
    def grab():
        for t in pg.evaluate(JSC): seen.add(t)
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('dialog',lambda d:(dl.append(d.message),d.accept()))
    pg.on('console',lambda m: m.type=='error' and errs.append('console:'+m.text[:150]))
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(700)
    pg.evaluate("()=>document.querySelector('nav button[data-tab=gym]').click()"); pg.wait_for_timeout(500)
    grab(); pg.screenshot(path=f'g_{LANG}_1empty.png')
    pg.set_input_files('#gym-pdf-input','/home/claude/gym-src/dia1.pdf'); 
    pg.wait_for_function("()=>document.querySelector('.gym-editor')", timeout=60000); pg.wait_for_timeout(800)
    grab(); pg.screenshot(path=f'g_{LANG}_2import.png')
    info=pg.evaluate("()=>({name:document.getElementById('ge-name').value, n:_gymEdit.exercises.length, ex:_gymEdit.exercises.map(e=>[e.name,e.dbId,!!e.photo,(e.photo||'').length,e.circuit,gymSetsText(e.sets),e.rir,e.rpe]), tempo:_gymEdit.tempo, meta:_gymEdit.meta})")
    print(json.dumps(info,ensure_ascii=False,indent=0)[:3000])
    # asignar lunes y hoy
    pg.evaluate("()=>{const d=String(new Date().getDay()); document.querySelector('#ge-days .chip[data-d=\"'+d+'\"]').click(); document.querySelector('#ge-days .chip[data-d=\"1\"]').click(); document.getElementById('sheet-save').click();}")
    pg.wait_for_timeout(600)
    grab(); pg.screenshot(path=f'g_{LANG}_3tab.png', full_page=True)
    pg.evaluate("()=>document.getElementById('gym-start').click()"); pg.wait_for_timeout(800)
    # registrar dos series
    pg.evaluate("""()=>{const rows=[...document.querySelectorAll('.gym-set[data-ex]')].slice(0,2);
      rows.forEach((r,i)=>{const [kg,reps]=r.querySelectorAll('.gym-in'); kg.value=String(6+i); kg.dispatchEvent(new Event('input')); reps.value='12'; reps.dispatchEvent(new Event('input')); r.querySelector('.gym-check').click();});}""")
    pg.wait_for_timeout(300)
    grab(); pg.screenshot(path=f'g_{LANG}_4workout.png')
    pg.evaluate("()=>document.getElementById('sheet-body').scrollTop=900"); pg.wait_for_timeout(300)
    grab(); pg.screenshot(path=f'g_{LANG}_5workout2.png')
    print('logs', json.dumps(pg.evaluate("()=>JSON.parse(localStorage.gym_logs)"))[:300])
    # ficha ejercicio
    pg.evaluate("()=>document.querySelectorAll('[data-gym-info]')[2].click()"); pg.wait_for_timeout(1500)
    grab(); pg.screenshot(path=f'g_{LANG}_6info.png')
    # buscador
    pg.evaluate("()=>document.getElementById('gym-link').click()"); pg.wait_for_timeout(800)
    grab(); pg.screenshot(path=f'g_{LANG}_7search.png')
    print('ls bytes', pg.evaluate("()=>localStorage.gym_routines.length"))
    print('errors',[e for e in errs if 'ERR_FAILED' not in e and '404' not in e][:8],'dialogs',dl)
    json.dump(sorted(seen),open(f'gym_texts_{LANG}.json','w'),ensure_ascii=False)
    b.close()
