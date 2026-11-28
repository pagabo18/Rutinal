import sys,json,os
from playwright.sync_api import sync_playwright
LANG=sys.argv[1] if len(sys.argv)>1 else 'es'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
    ctx.add_init_script(f"localStorage.setItem('rutinal_lang','{LANG}');")
    ctx.add_init_script("""if(!localStorage.getItem('__ft')){localStorage.setItem('__ft','1');
      localStorage.setItem('nutri_profile',JSON.stringify({sex:'M',age:30,heightCm:175,weightKg:78,bodyFatPct:null,activity:'moderate',goal:'cut',macroSplit:'auto',tolerance:'flex',manualKcal:null}));
      const k=new Date(); const key=k.getFullYear()+'-'+String(k.getMonth()+1).padStart(2,'0')+'-'+String(k.getDate()).padStart(2,'0');
      const f=(n,g,p)=>({food_id:n,name:n,grams:g,per100g:p,source:'custom',ts:1});
      localStorage.setItem('meal_log',JSON.stringify({[key]:{breakfast:[f('Avena',80,{kcal:380,protein:13,carbs:67,fat:7,sugars:1,sodium:0.01}),f('Huevo',150,{kcal:143,protein:12.6,carbs:0.7,fat:9.5,sugars:0.4,sodium:0.14})],lunch:[f('Pollo',220,{kcal:165,protein:31,carbs:0,fat:3.6,sodium:0.07}),f('Arroz',200,{kcal:130,protein:2.7,carbs:28,fat:0.3})],dinner:[],snack:[]}}));}""")
    pg=ctx.new_page(); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(700)
    pg.evaluate("()=>document.querySelector('nav button[data-tab=comida]').click()"); pg.wait_for_timeout(400)
    foods={
     'papas':{'name':'Papas fritas','brand':'Sabritas','barcode':'750','source':'off','nova':4,'nutriscore':'d','per100g':{'kcal':536,'protein':6.6,'carbs':53,'fat':34,'fiber':4,'sugars':0.5,'sodium':0.53,'satFat':3.5}},
     'yogur':{'name':'Yogur griego natural','brand':'','source':'off','nutriscore':'a','nova':1,'per100g':{'kcal':59,'protein':10,'carbs':3.6,'fat':0.4,'fiber':0,'sugars':3.2,'sodium':0.036,'satFat':0.1}},
     'refresco':{'name':'Refresco de cola','brand':'','source':'off','nutriscore':'e','nova':4,'per100g':{'kcal':42,'protein':0,'carbs':10.6,'fat':0,'sugars':10.6,'sodium':0.004,'satFat':0}},
    }
    for k,f in foods.items():
        pg.evaluate("(f)=>openPortionEditor(Object.assign({grams:100},f),'snack',-1)", f); pg.wait_for_timeout(500)
        print(k, pg.evaluate("()=>document.getElementById('fit-card').innerText.replace(/\\n+/g,' | ')")[:900])
        pg.evaluate("()=>document.getElementById('sheet-body').scrollTop=9999"); pg.wait_for_timeout(200)
        pg.screenshot(path=f'fit_{LANG}_{k}.png')
        if k=='papas':
            pg.evaluate("()=>document.getElementById('fit-use').click()"); pg.wait_for_timeout(300)
            print('  after use:', pg.evaluate("()=>document.getElementById('portion-grams').value+' g | '+document.getElementById('fit-status').innerText"))
            pg.screenshot(path=f'fit_{LANG}_papas2.png')
    print('errors',errs)
    b.close()
