import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('nutri_profile',JSON.stringify({sex:'M',age:30,heightCm:175,weightKg:78,bodyFatPct:null,activity:'moderate',goal:'cut',macroSplit:'auto',tolerance:'flex',manualKcal:null}));")
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(700)
    res=pg.evaluate("""()=>{
      const mk=(name,k,p,c,f,s,na,sat,fb)=>({name,per100g:{kcal:k,protein:p,carbs:c,fat:f,sugars:s,sodium:na,satFat:sat,fiber:fb||0},nova:4,source:'off'});
      const foods=[mk('Papas fritas Sabritas',536,6.6,53,34,0.5,0.53,3.5,4),mk('Doritos Nacho',500,7,60,25,3,0.7,3.5,4),mk('Chocolate con leche Hershey',535,7.7,59,30,51,0.08,18,3),
        mk('Galletas Oreo',480,5,70,20,38,0.4,6,2),mk('Refresco de cola',42,0,10.6,0,10.6,0.004,0),mk('Jugo de manzana Jumex',46,0,11,0,10,0.01,0),mk('Zucaritas cereal',375,4.5,89,0.6,37,0.47,0.2,2),
        mk('Yogur bebible fresa',80,2.5,13,1.5,12,0.04,1),mk('Salchicha Viena',290,11,3,26,1,0.9,9),mk('Helado de vainilla Holanda',207,3.5,24,11,21,0.08,7),
        mk('Gansito',420,4,60,18,35,0.25,9),mk('Pan blanco Bimbo',265,9,49,3.2,5,0.49,0.7,2.7),mk('Queso amarillo americano',330,18,5,26,3,1.3,16),mk('Gomitas Panditas',340,6,77,0,46,0.03,0),
        mk('Frappé moka',180,3,28,6,25,0.06,4),mk('Maruchan ramen',450,9,60,19,2,1.8,9)];
      const info=fitGoalInfo(), tot=fitDayTotals('snack',-1);
      return foods.map(f=>{const q=fitQuality(f,info.kind); const g=fitSwapGroup(f.name); return f.name+' ['+q.score+'] ('+(g?g.id:'cat:'+foodCatOf(f))+') → '+fitAlternatives(f,info,tot,q.score).map(a=>a.item.name+' '+a.score).join(', ');});
    }""")
    print('\n'.join(res)); print('errors',errs)
    b.close()
