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
    Q=["sentadilla","sentadilla bulgara","press de banca","press banca inclinado mancuernas","peso muerto rumano","jalon al pecho","remo con barra","remo sentado polea","curl martillo","curl femoral","extension de pierna","elevaciones laterales","elevacion de talones","pantorrilla","aductor","abductor","desplantes","zancadas con mancuernas","lagartijas","flexiones","dominadas","fondos","hip thrust","puente de gluteo","plancha","abdominales","crunch en polea","face pull","encogimiento de hombros","press militar","patada de triceps","jalon de triceps","rompecraneos","apertura con mancuernas","pec deck","prensa","gluteo","estiramiento de isquiotibiales","caminadora","leñador","sent","elev lat"]
    for q in Q:
        r=pg.evaluate("(q)=>gymSearch(q,3).map(e=>gymDbName(e))", q); print(f"{q:34} {' | '.join(r)}")
    print('inglés sigue:', pg.evaluate("gymSearch('bench press',2).map(e=>e.n)"), pg.evaluate("gymSearch('lat pulldown',2).map(e=>e.n)"))
    print('vínculo automático igual:', pg.evaluate("['Aductor maquina','Desplante en smith','Press unilateral','Curl sentado maquina'].map(n=>gymBestMatch(n,'Pierna'))"))
    # buscador en pantalla
    pg.evaluate("openGymExercisePicker('', ()=>{}, null)"); pg.wait_for_timeout(600); pg.fill('#gym-q','elevaciones laterales'); pg.wait_for_timeout(900); pg.screenshot(path='/tmp/g/es_buscar.png')
    print('fila 1:', pg.locator('.gym-res').first.inner_text().replace('\n',' | '))
    print('errs', errs)
