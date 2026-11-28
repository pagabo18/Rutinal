from playwright.sync_api import sync_playwright
exec(open('fake_links.py').read())
src=open('wo_test.py').read(); lang='es'
exec(src[src.index('SEED3='):src.index('body=lambda')])
NAMES=["Aductor maquina","Abductor maquina","Sentadilla en smith","Desplante en smith","Press unilateral","Curl sentado maquina","Extension de piernas maquina","Pantorrilla en maquina de pie",
 "Prensa","Peso muerto rumano","Hip thrust","Sentadilla bulgara","Curl femoral acostado","Extension","Curl","Press","Zancadas con mancuernas","Sentadilla hack","Elevacion de talones sentado","Maquina","Smith"]
UP=["Press de banca","Press inclinado con mancuernas","Jalon al pecho","Remo con barra","Curl martillo","Extension de triceps en polea","Elevaciones laterales","Dominadas","Fondos","Face pull","Press militar","Curl predicador","Pec deck","Remo sentado en polea","Encogimientos","Press","Curl","Polea"]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    c=b.new_context(viewport={'width':400,'height':860},locale=lang); pg=c.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.route('**/*',sb.handle); pg.add_init_script(SEED3); pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(600)
    login(pg,'ana','secreta1',False)
    pg.evaluate("loadGymDb()"); pg.wait_for_timeout(1500)
    print('--- Día 2 · Pierna (antes → ahora)')
    for n in NAMES:
        r=pg.evaluate("(n)=>[ (gymSearch(n,1,{oldDict:true})[0]||{}).i||null, gymBestMatch(n,'Pierna Día 2') ]", n); print(f"{n:32} {str(r[0]):34} → {r[1]}")
    print('--- torso, sin contexto y con contexto')
    for n in UP:
        r=pg.evaluate("(n)=>[ (gymSearch(n,1,{oldDict:true})[0]||{}).i||null, gymBestMatch(n), gymBestMatch(n,'Día 1 · Pecho') ]", n); print(f"{n:32} {str(r[0]):34} → {str(r[1]):34} | {r[2]}")
    # reparación de una rutina ya importada
    pg.evaluate("""()=>{const all=gymRoutines(); all.push({id:'pdf2',name:'Día 2 · Pierna',source:'pdf',meta:{musculos:'Pierna'},exercises:[
      {id:'a',name:'Aductor maquina',dbId:'Leverage_Deadlift',sets:[{count:3,reps:'12'}]},{id:'b',name:'Abductor maquina',dbId:'Leverage_Deadlift',sets:[{count:3,reps:'12'}]},
      {id:'c',name:'Sentadilla en smith',dbId:'Smith_Machine_Squat',sets:[{count:3,reps:'10'}]},{id:'d',name:'Desplante en smith',dbId:'Smith_Machine_Squat',sets:[{count:3,reps:'10'}]},
      {id:'e',name:'Press unilateral',dbId:'One_Arm_Floor_Press',sets:[{count:3,reps:'10'}]},{id:'f',name:'Curl sentado maquina',dbId:'Seated_Leg_Curl',sets:[{count:3,reps:'10'}]},
      {id:'g',name:'Extension de piernas maquina',dbId:'Leg_Extensions',sets:[{count:3,reps:'10'}]},{id:'h',name:'Pantorrilla en maquina de pie',dbId:'Standing_Calf_Raises',sets:[{count:3,reps:'10'}]},
      {id:'m',name:'Press unilateral',dbId:'Leg_Press',sets:[{count:3,reps:'10'}]}]}); saveGymRoutines(all); S.set('gym_relink_v',0);}""")
    print('reparados:', pg.evaluate("gymRelinkImported()"), '| otra vez:', pg.evaluate("gymRelinkImported()"))
    print(pg.evaluate("gymRoutineById('pdf2').exercises.map(e=>e.name+' → '+e.dbId).join('\\n')"))
    print('otras rutinas intactas:', pg.evaluate("JSON.stringify(gymRoutines().filter(r=>r.id!=='pdf2').map(r=>r.exercises.map(e=>e.dbId)))")[:200])
    print('errs', errs)
