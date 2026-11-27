#!/usr/bin/env python3
"""Genera assets/web/gym_names_es.js: nombres en español de los ejercicios de gym_db.js.

Los nombres de la base (free-exercise-db) vienen en inglés. Aquí se arman en español con
reglas: movimiento + zona del cuerpo + postura o variante + equipo. Si alguna palabra del
nombre no se reconoce, ese ejercicio se queda sin nombre en español (la app muestra el
inglés) en vez de inventar una traducción a medias.

Uso:  python3 tools/gym_names_es.py            (escribe el archivo)
      python3 tools/gym_names_es.py --report   (además lista los que quedaron sin traducir)
"""
import json, re, subprocess, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(ROOT, 'assets', 'web')

# Movimientos: frase en inglés -> (español, género). Se buscan primero las frases más largas.
MOVES = {
    'bench press': ('press de banca', 'm'), 'military press': ('press militar', 'm'), 'shoulder press': ('press de hombro', 'm'),
    'leg press': ('prensa de pierna', 'f'), 'floor press': ('press en el piso', 'm'), 'push press': ('push press', 'm'),
    'calf press': ('prensa de pantorrilla', 'f'), 'chest press': ('press de pecho', 'm'), 'neck press': ('press al cuello', 'm'),
    'press': ('press', 'm'), 'presses': ('press', 'm'),
    'front squat': ('sentadilla frontal', 'f'), 'front squats': ('sentadilla frontal', 'f'), 'split squat': ('sentadilla dividida', 'f'), 'split squats': ('sentadilla dividida', 'f'),
    'hack squat': ('sentadilla hack', 'f'), 'hack squats': ('sentadilla hack', 'f'), 'sissy squat': ('sentadilla sissy', 'f'), 'olympic squat': ('sentadilla olímpica', 'f'), 'jefferson squats': ('sentadilla Jefferson', 'f'), 'frankenstein squat': ('sentadilla Frankenstein', 'f'), 'goblet squat': ('sentadilla goblet', 'f'), 'overhead squat': ('sentadilla sobre la cabeza', 'f'),
    'jump squat': ('sentadilla con salto', 'f'), 'pistol squat': ('sentadilla pistol', 'f'), 'zercher squats': ('sentadilla Zercher', 'f'),
    'squat': ('sentadilla', 'f'), 'squats': ('sentadilla', 'f'),
    'romanian deadlift': ('peso muerto rumano', 'm'), 'sumo deadlift': ('peso muerto sumo', 'm'), 'stiff-legged deadlift': ('peso muerto con piernas rígidas', 'm'),
    'stiff leg deadlift': ('peso muerto con piernas rígidas', 'm'), 'deadlift': ('peso muerto', 'm'), 'deadlifts': ('peso muerto', 'm'),
    'upright row': ('remo al mentón', 'm'), 'row': ('remo', 'm'), 'rows': ('remo', 'm'),
    'leg curl': ('curl femoral', 'm'), 'leg curls': ('curl femoral', 'm'), 'wrist curl': ('curl de muñeca', 'm'), 'wrist curls': ('curl de muñeca', 'm'),
    'hammer curl': ('curl martillo', 'm'), 'hammer curls': ('curl martillo', 'm'), 'preacher curl': ('curl predicador', 'm'), 'preacher curls': ('curl predicador', 'm'), 'finger curls': ('curl de dedos', 'm'), 'concentration curl': ('curl concentrado', 'm'),
    'concentration curls': ('curl concentrado', 'm'), 'zottman curl': ('curl Zottman', 'm'), 'spider curl': ('curl araña', 'm'), 'drag curl': ('curl de arrastre', 'm'),
    'curl': ('curl', 'm'), 'curls': ('curl', 'm'),
    'leg extension': ('extensión de pierna', 'f'), 'leg extensions': ('extensión de pierna', 'f'), 'triceps extension': ('extensión de tríceps', 'f'), 'triceps extensions': ('extensión de tríceps', 'f'),
    'tricep extension': ('extensión de tríceps', 'f'), 'back extension': ('hiperextensión', 'f'), 'hyperextension': ('hiperextensión', 'f'), 'hyperextensions': ('hiperextensión', 'f'),
    'extension': ('extensión', 'f'), 'extensions': ('extensión', 'f'),
    'side lateral raise': ('elevación lateral', 'f'), 'lateral raise': ('elevación lateral', 'f'), 'lateral raises': ('elevación lateral', 'f'), 'side laterals': ('elevación lateral', 'f'),
    'front raise': ('elevación frontal', 'f'), 'front raises': ('elevación frontal', 'f'), 'calf raise': ('elevación de talones', 'f'), 'calf raises': ('elevación de talones', 'f'),
    'leg raise': ('elevación de piernas', 'f'), 'leg raises': ('elevación de piernas', 'f'), 'knee raise': ('elevación de rodillas', 'f'), 'knee raises': ('elevación de rodillas', 'f'),
    'raise': ('elevación', 'f'), 'raises': ('elevación', 'f'),
    'pulldown': ('jalón', 'm'), 'pulldowns': ('jalón', 'm'), 'lat pulldown': ('jalón al pecho', 'm'),
    'triceps pushdown': ('jalón de tríceps', 'm'), 'pushdown': ('jalón de tríceps', 'm'),
    'pull-up': ('dominada', 'f'), 'pull ups': ('dominada', 'f'), 'pull up': ('dominada', 'f'), 'pull-ups': ('dominada', 'f'), 'pullups': ('dominada', 'f'), 'pullup': ('dominada', 'f'),
    'chin-up': ('dominada supina', 'f'), 'chin-ups': ('dominada supina', 'f'), 'chins': ('dominada supina', 'f'), 'chin': ('dominada supina', 'f'),
    'push-up': ('lagartija', 'f'), 'push-ups': ('lagartija', 'f'), 'pushups': ('lagartija', 'f'), 'pushup': ('lagartija', 'f'), 'push up': ('lagartija', 'f'), 'push ups': ('lagartija', 'f'),
    'fly': ('apertura', 'f'), 'flyes': ('apertura', 'f'), 'flye': ('apertura', 'f'), 'flys': ('apertura', 'f'),
    'crunch': ('crunch', 'm'), 'crunches': ('crunch', 'm'), 'sit-up': ('abdominal', 'm'), 'sit-ups': ('abdominal', 'm'),
    'plank': ('plancha', 'f'), 'side bridge': ('plancha lateral', 'f'),
    'shrug': ('encogimiento de hombros', 'm'), 'shrugs': ('encogimiento de hombros', 'm'),
    'dip': ('fondos', 'm'), 'dips': ('fondos', 'm'),
    'lunge': ('desplante', 'm'), 'lunges': ('desplante', 'm'), 'back lunge': ('desplante hacia atrás', 'm'), 'rear lunge': ('desplante hacia atrás', 'm'), 'reverse lunge': ('desplante hacia atrás', 'm'),
    'triceps kickback': ('patada de tríceps', 'f'), 'tricep kickback': ('patada de tríceps', 'f'), 'glute kickback': ('patada de glúteo', 'f'), 'kickback': ('patada', 'f'), 'kickbacks': ('patada', 'f'),
    'pullover': ('pullover', 'm'), 'face pull': ('face pull', 'm'), 'pull through': ('pull through', 'm'),
    'clean and jerk': ('cargada y envión', 'f'), 'clean and press': ('cargada y press', 'f'), 'clean': ('cargada', 'f'), 'snatch': ('arrancada', 'f'), 'jerk': ('envión', 'm'),
    'swing': ('swing', 'm'), 'swings': ('swing', 'm'), 'windmill': ('molino', 'm'), 'windmills': ('molino', 'm'), 'thruster': ('thruster', 'm'), 'halo': ('halo', 'm'), 'high pull': ('jalón alto', 'm'), 'turkish get-up': ('levantada turca', 'f'),
    'stretch': ('estiramiento', 'm'), 'twist': ('giro', 'm'), 'twists': ('giro', 'm'), 'russian twist': ('giro ruso', 'm'), 'russian twists': ('giro ruso', 'm'), 'side bend': ('flexión lateral', 'f'), 'side bends': ('flexión lateral', 'f'), 'renegade row': ('remo renegado', 'm'), 'leg pull-in': ('encogimiento de piernas', 'm'), 'pull-in': ('encogimiento de piernas', 'm'), 'pronation': ('pronación', 'f'), 'supination': ('supinación', 'f'), 'hip flexion': ('flexión de cadera', 'f'), 'hip lift': ('elevación de cadera', 'f'), 'hip raise': ('elevación de cadera', 'f'), 'leg lift': ('elevación de pierna', 'f'), 'scissor kick': ('patada de tijera', 'f'), 'rack pull': ('peso muerto desde rack', 'm'), 'rack pulls': ('peso muerto desde rack', 'm'), 'wood chop': ('leñador', 'm'),
    'glute bridge': ('puente de glúteo', 'm'), 'bridge': ('puente', 'm'), 'hip thrust': ('hip thrust', 'm'), 'good morning': ('buenos días', 'm'), 'good mornings': ('buenos días', 'm'),
    'step-up': ('subida al cajón', 'f'), 'step ups': ('subida al cajón', 'f'), 'step-ups': ('subida al cajón', 'f'),
    'box jump': ('salto al cajón', 'm'), 'jump': ('salto', 'm'), 'jumps': ('salto', 'm'), 'hops': ('saltos cortos', 'm'), 'hop': ('salto corto', 'm'),
    'rollout': ('rueda abdominal', 'f'), 'ab roller': ('rueda abdominal', 'f'), 'crossover': ('cruce de poleas', 'm'), 'cable crossover': ('cruce de poleas', 'm'),
    'external rotation': ('rotación externa', 'f'), 'internal rotation': ('rotación interna', 'f'), 'rotation': ('rotación', 'f'),
    'arm circles': ('círculos de brazos', 'm'), 'circles': ('círculos', 'm'),
    'thigh abductor': ('abductor', 'm'), 'thigh adductor': ('aductor', 'm'), 'hip abduction': ('abducción de cadera', 'f'), 'hip adduction': ('aducción de cadera', 'f'), 'hip adductions': ('aducción de cadera', 'f'),
    'skullcrusher': ('rompecráneos', 'm'), 'skull crusher': ('rompecráneos', 'm'), 'butterfly': ('pec deck', 'm'), 'mountain climbers': ('escaladores', 'm'),
    'jumping jacks': ('saltos de tijera', 'm'), 'burpee': ('burpee', 'm'), 'superman': ('superman', 'm'), 'bird dog': ('perro de caza', 'm'), 'dead bug': ('bicho muerto', 'm'),
    'flutter kicks': ('patadas de aleteo', 'f'), 'air bike': ('bicicleta abdominal', 'f'), 'jackknife sit-up': ('abdominal en V', 'm'), 'wall sit': ('sentadilla isométrica en pared', 'f'),
    'farmers walk': ('caminata del granjero', 'f'), "farmer's walk": ('caminata del granjero', 'f'), 'inchworm': ('gusano', 'm'), 'muscle up': ('muscle up', 'm'),
    'rope climb': ('subida de cuerda', 'f'), 'rope jumping': ('salto de cuerda', 'm'), 'elliptical trainer': ('elíptica', 'f'), 'stairmaster': ('escaladora', 'f'), 'sprint': ('sprint', 'm'), 'sprints': ('sprint', 'm'),
}
# Zona del cuerpo: se dice después del movimiento («extensión de tríceps»)
BODY = {'triceps': 'de tríceps', 'tricep': 'de tríceps', 'biceps': 'de bíceps', 'bicep': 'de bíceps', 'chest': 'de pecho', 'shoulder': 'de hombro', 'shoulders': 'de hombro',
        'back': 'de espalda', 'lower back': 'de espalda baja', 'upper back': 'de espalda alta', 'middle back': 'de espalda media', 'calf': 'de pantorrilla', 'calves': 'de pantorrilla',
        'hamstring': 'de isquiotibiales', 'hamstrings': 'de isquiotibiales', 'quad': 'de cuádriceps', 'quads': 'de cuádriceps', 'quadriceps': 'de cuádriceps', 'glute': 'de glúteo', 'glutes': 'de glúteo',
        'hip': 'de cadera', 'hips': 'de cadera', 'wrist': 'de muñeca', 'neck': 'de cuello', 'ab': 'de abdomen', 'abs': 'de abdomen', 'abdominal': 'de abdomen', 'oblique': 'de oblicuos', 'obliques': 'de oblicuos',
        'groin': 'de ingle', 'torso': 'de torso', 'elbow': 'de codo', 'upper body': 'del tren superior', 'lower body': 'del tren inferior', 'hip flexor': 'de flexores de cadera', 'hip flexors': 'de flexores de cadera', 'spinal': 'de columna', 'rear delt': 'de deltoides posterior', 'rear-delt': 'de deltoides posterior', 'front deltoid': 'de deltoides frontal', 'lat': 'de dorsal', 'lats': 'de dorsal', 'delt': 'de deltoides', 'deltoid': 'de deltoides', 'knee': 'de rodilla', 'ankle': 'de tobillo', 'forearm': 'de antebrazo',
        'leg': 'de pierna', 'legs': 'de piernas', 'arm': 'de brazo', 'arms': 'de brazos', 'adductor': 'de aductores', 'toe': 'de puntas', 'trap': 'de trapecio', 'traps': 'de trapecio', 'pec': 'de pecho'}
# Postura o variante: (masculino, femenino)
POS = {'standing': ('de pie',) * 2, 'seated': ('sentado',) * 2, 'lying': ('acostado',) * 2, 'incline': ('inclinado', 'inclinada'), 'decline': ('declinado', 'declinada'),
       'flat': ('plano', 'plana'), 'kneeling': ('de rodillas',) * 2, 'bent over': ('con torso inclinado',) * 2, 'bent-over': ('con torso inclinado',) * 2,
       'one-arm': ('a un brazo',) * 2, 'one arm': ('a un brazo',) * 2, 'single-arm': ('a un brazo',) * 2, 'single arm': ('a un brazo',) * 2, 'two-arm': ('a dos brazos',) * 2, 'two arm': ('a dos brazos',) * 2,
       'single-leg': ('a una pierna',) * 2, 'single leg': ('a una pierna',) * 2, 'one-legged': ('a una pierna',) * 2, 'one leg': ('a una pierna',) * 2, 'one-leg': ('a una pierna',) * 2,
       'alternating': ('alterno', 'alterna'), 'alternate': ('alterno', 'alterna'), 'reverse': ('inverso', 'inversa'), 'reverse grip': ('con agarre inverso',) * 2, 'reverse-grip': ('con agarre inverso',) * 2,
       'close-grip': ('con agarre cerrado',) * 2, 'close grip': ('con agarre cerrado',) * 2, 'wide-grip': ('con agarre abierto',) * 2, 'wide grip': ('con agarre abierto',) * 2,
       'medium grip': ('con agarre medio',) * 2, 'neutral grip': ('con agarre neutro',) * 2, 'underhand': ('con agarre supino',) * 2, 'overhand': ('con agarre prono',) * 2,
       'front': ('frontal',) * 2, 'rear': ('posterior',) * 2, 'side': ('lateral',) * 2, 'lateral': ('lateral',) * 2, 'overhead': ('sobre la cabeza',) * 2,
       'behind the neck': ('tras nuca',) * 2, 'behind the head': ('tras nuca',) * 2, 'behind neck': ('tras nuca',) * 2, 'hanging': ('colgado',) * 2, 'isometric': ('isométrico', 'isométrica'),
       'walking': ('caminando',) * 2, 'sumo': ('sumo',) * 2, 'romanian': ('rumano', 'rumana'), 'palms-up': ('con palmas arriba',) * 2, 'palms up': ('con palmas arriba',) * 2,
       'palms-down': ('con palmas abajo',) * 2, 'palms down': ('con palmas abajo',) * 2, 'high': ('alto', 'alta'), 'low': ('bajo', 'baja'), 'narrow stance': ('con pies juntos',) * 2,
       'wide stance': ('con pies separados',) * 2, 'wide-stance': ('con pies separados',) * 2, 'prone': ('boca abajo',) * 2, 'supine': ('boca arriba',) * 2, 'elevated': ('elevado', 'elevada'),
       'double': ('doble',) * 2, 'power': ('de potencia',) * 2, 'straight-arm': ('con brazos rectos',) * 2, 'straight arm': ('con brazos rectos',) * 2, 'bent-arm': ('con brazos flexionados',) * 2,
       'hammer': ('martillo',) * 2, 'preacher': ('en banco predicador',) * 2, 'arnold': ('Arnold',) * 2, 'hang': ('colgante',) * 2, 'deficit': ('con déficit',) * 2, 'explosive': ('explosivo', 'explosiva'),
       'crossover': ('cruzado', 'cruzada'), 'cross': ('cruzado', 'cruzada'), 'twisting': ('con giro',) * 2, 'full': ('completo', 'completa'), 'half': ('medio', 'media'), 'dynamic': ('dinámico', 'dinámica'),
       'weighted': ('con peso',) * 2, 'assisted': ('asistido', 'asistida'), 'inverted': ('invertido', 'invertida'), 'plyo': ('pliométrico', 'pliométrica'), 'clapping': ('con palmada',) * 2,
       'external': ('externo', 'externa'), 'internal': ('interno', 'interna'), 'upper': ('alto', 'alta'), 'lower': ('bajo', 'baja'), 'inner': ('interno', 'interna'), 'outer': ('externo', 'externa'),
       'reverse band': ('con banda inversa',) * 2, 'to a bench': ('al banco',) * 2, 'powerlifting': ('estilo powerlifting',) * 2, 'wide': ('con agarre abierto',) * 2, 'medium': ('con agarre medio',) * 2, 'mixed grip': ('con agarre mixto',) * 2, 'over a bench': ('sobre un banco',) * 2, 'behind the back': ('por detrás',) * 2, 'palms-in': ('con agarre neutro',) * 2, 'palm-in': ('con agarre neutro',) * 2, 'palms in': ('con agarre neutro',) * 2, 'palms facing in': ('con agarre neutro',) * 2, 'palm-up': ('con palmas arriba',) * 2, 'stiff-legged': ('con piernas rígidas',) * 2, 'stiff leg': ('con piernas rígidas',) * 2, 'pronated grip': ('con agarre prono',) * 2, 'pronated': ('con agarre prono',) * 2, 'supinated': ('con agarre supino',) * 2, 'on knees': ('de rodillas',) * 2, 'cross body': ('cruzado', 'cruzada'), 'cross-body': ('cruzado', 'cruzada'), 'concentration': ('concentrado', 'concentrada'), 'natural': ('natural',) * 2, 'scapular': ('escapular',) * 2, 'backward': ('hacia atrás',) * 2, 'forward': ('hacia adelante',) * 2, 'slow': ('lento', 'lenta'), 'fast': ('rápido', 'rápida'), 'heavy': ('pesado', 'pesada'), 'light': ('ligero', 'ligera')}
# Equipo
EQUIP = {'barbell': 'con barra', 'dumbbell': 'con mancuernas', 'dumbbells': 'con mancuernas', 'two-dumbbell': 'con dos mancuernas', 'cable': 'en polea', 'cables': 'en polea', 'kettlebell': 'con kettlebell',
         'kettlebells': 'con kettlebells', 'smith machine': 'en smith', 'smith': 'en smith', 'machine': 'en máquina', 'leverage': 'en máquina', 'band': 'con banda', 'bands': 'con banda', 'resistance band': 'con banda',
         'ez-bar': 'con barra Z', 'ez bar': 'con barra Z', 'e-z curl bar': 'con barra Z', 'medicine ball': 'con balón medicinal', 'exercise ball': 'con pelota', 'stability ball': 'con pelota', 'ball': 'con pelota',
         'rope': 'con cuerda', 'plate': 'con disco', 'sled': 'con trineo', 'chains': 'con cadenas', 'landmine': 'en landmine', 't-bar': 'en barra T', 'box': 'en cajón', 'bench': 'en banco', 'chair': 'en silla',
         'wall': 'en pared', 'floor': 'en el piso', 'bodyweight': 'con peso corporal', 'straps': 'con correas', 'long bar': 'en barra T', 'high-pulley': 'en polea alta', 'physioball': 'con pelota', 'suspended': 'en suspensión', 'treadmill': 'en caminadora', 'bike': 'en bicicleta',
         'low-pulley': 'en polea baja', 'low pulley': 'en polea baja', 'high pulley': 'en polea alta', 'pulley': 'en polea', 'v-bar': 'con barra V', 'bar': 'con barra', 'straight bar': 'con barra recta',
         'rack': 'en rack', 'blocks': 'desde bloques', 'towel': 'con toalla', 'foam roll': 'con rodillo', 'roller': 'con rodillo', 'incline bench': 'en banco inclinado', 'decline bench': 'en banco declinado',
         'flat bench': 'en banco plano', 'preacher bench': 'en banco predicador', 'parallel bars': 'en paralelas', 'rings': 'en anillas', 'trap bar': 'con barra hexagonal', 'hex bar': 'con barra hexagonal',
         }
STOP = {'with', 'the', 'a', 'an', 'on', 'of', 'from', 'exercise', 'version', 'in', 'using', 'style', 'for', 'at', 'your', 'attachment', 'handle'}
# Nombres fijos: los que las reglas no arman bien, o los más conocidos con su nombre de gimnasio
FIXED = {
    'Adductor/Groin': 'Estiramiento de aductores e ingle', 'Ankle On The Knee': 'Estiramiento con el tobillo sobre la rodilla',
    'Bicycling': 'Bicicleta', 'Bicycling, Stationary': 'Bicicleta fija', 'Recumbent Bike': 'Bicicleta reclinada', 'Rowing, Stationary': 'Máquina de remo', 'Jogging, Treadmill': 'Trote en caminadora',
    'Running, Treadmill': 'Correr en caminadora', 'Walking, Treadmill': 'Caminar en caminadora', 'Trail Running/Walking': 'Correr o caminar en sendero', 'Step Mill': 'Escaladora de escalones', 'Skating': 'Patinaje', 'Wind Sprints': 'Sprints',
    'Band Pull Apart': 'Aperturas con banda', 'Battling Ropes': 'Cuerdas de batalla', 'Calf Press On The Leg Press Machine': 'Prensa de pantorrilla en la prensa', 'Cat Stretch': 'Estiramiento del gato',
    "Child's Pose": 'Postura del niño', 'Clean Deadlift': 'Peso muerto de cargada', 'Clean Pull': 'Jalón de cargada', 'Snatch Pull': 'Jalón de arrancada', 'Snatch Deadlift': 'Peso muerto de arrancada',
    'Clean Shrug': 'Encogimiento de cargada', 'Snatch Shrug': 'Encogimiento de arrancada', 'Split Jerk': 'Envión en tijera', 'Split Snatch': 'Arrancada en tijera', 'Split Clean': 'Cargada en tijera', 'Squat Jerk': 'Envión en sentadilla',
    'Snatch Balance': 'Balance de arrancada', 'Muscle Snatch': 'Arrancada de fuerza', 'Cross-Body Crunch': 'Crunch cruzado', 'Crunch - Hands Overhead': 'Crunch con manos sobre la cabeza', 'Tuck Crunch': 'Crunch con rodillas al pecho',
    'Cuban Press': 'Press cubano', 'JM Press': 'Press JM', 'Tate Press': 'Press Tate', 'Svend Press': 'Press Svend', 'Pallof Press': 'Press Pallof', 'Pallof Press With Rotation': 'Press Pallof con rotación',
    'Bradford/Rocky Presses': 'Press Bradford', 'Standing Bradford Press': 'Press Bradford de pie', 'Board Press': 'Press de banca con tabla', 'Pin Presses': 'Press de banca desde pines',
    'Donkey Calf Raises': 'Elevación de talones tipo burro', 'Glute Ham Raise': 'Curl nórdico en máquina (glute ham raise)', 'Natural Glute Ham Raise': 'Curl nórdico', 'Floor Glute-Ham Raise': 'Curl nórdico en el piso',
    'Handstand Push-Ups': 'Lagartija en parada de manos', 'Hanging Pike': 'Elevación de piernas colgado en V', 'Hyperextensions (Back Extensions)': 'Hiperextensión', 'Hyperextensions With No Hyperextension Bench': 'Hiperextensión sin banco',
    'Kettlebell Figure 8': 'Ocho con kettlebell', 'Kettlebell Turkish Get-Up (Lunge style)': 'Levantada turca con kettlebell (con desplante)', 'Kettlebell Turkish Get-Up (Squat style)': 'Levantada turca con kettlebell (con sentadilla)',
    'Machine Shoulder (Military) Press': 'Press militar en máquina', 'Monster Walk': 'Caminata del monstruo con banda', 'Plie Dumbbell Squat': 'Sentadilla plié con mancuerna', 'Parallel Bar Dip': 'Fondos en paralelas', 'Ring Dips': 'Fondos en anillas',
    'Side Jackknife': 'Abdominal lateral en V', 'Sled Push': 'Empuje de trineo', 'Prowler Sprint': 'Sprint con trineo', 'Tire Flip': 'Volteo de llanta', 'Sledgehammer Swings': 'Golpes con marro',
    'Standing Cable Wood Chop': 'Leñador en polea', 'Standing Cable Lift': 'Leñador inverso en polea', 'Standing Long Jump': 'Salto de longitud sin carrera', 'Star Jump': 'Salto de estrella', 'Split Jump': 'Salto en tijera',
    'Stomach Vacuum': 'Vacío abdominal', 'Toe Touchers': 'Toques de puntas', 'Alternate Heel Touchers': 'Toques de talón alternos', 'Standing Toe Touches': 'Toques de puntas de pie', 'Upright Barbell Row': 'Remo al mentón con barra',
    'Upright Cable Row': 'Remo al mentón en polea', "World's Greatest Stretch": 'El mejor estiramiento del mundo', 'Push-Ups - Close Triceps Position': 'Lagartija cerrada (tríceps)', 'Push-Ups With Feet Elevated': 'Lagartija con pies elevados',
    'Push-Ups With Feet On An Exercise Ball': 'Lagartija con pies sobre pelota', 'Pushups (Close and Wide Hand Positions)': 'Lagartija (manos juntas y separadas)', 'Push Up to Side Plank': 'Lagartija a plancha lateral',
    'Incline Dumbbell Bench With Palms Facing In': 'Press inclinado con mancuernas con agarre neutro', 'Hammer Grip Incline DB Bench Press': 'Press de banca inclinado con mancuernas con agarre neutro',
    'Butt Lift (Bridge)': 'Puente de glúteo', 'Physioball Hip Bridge': 'Puente de cadera con pelota', 'Bent-Knee Hip Raise': 'Elevación de cadera con rodillas flexionadas', 'Front Squat (Clean Grip)': 'Sentadilla frontal (agarre de cargada)',
    'Front Squats With Two Kettlebells': 'Sentadilla frontal con dos kettlebells', 'Full Range-Of-Motion Lat Pulldown': 'Jalón al pecho con rango completo', 'Gironda Sternum Chins': 'Dominada Gironda al esternón',
    'Reverse Flyes With External Rotation': 'Apertura inversa con rotación externa', 'Side Laterals to Front Raise': 'Elevación lateral a frontal', 'Front Raise And Pullover': 'Elevación frontal y pullover',
    'Seated Leg Tucks': 'Encogimiento de piernas sentado', 'Single Dumbbell Raise': 'Elevación frontal con una mancuerna', 'Standing Front Barbell Raise Over Head': 'Elevación frontal con barra sobre la cabeza',
    'Low Pulley Row To Neck': 'Remo al cuello en polea baja', 'Shotgun Row': 'Remo a un brazo en polea', 'Bodyweight Mid Row': 'Remo medio con peso corporal', 'Incline Bench Pull': 'Remo en banco inclinado',
    'Leverage Iso Row': 'Remo unilateral en máquina', 'Cable Rope Rear-Delt Rows': 'Remo al deltoides posterior en polea con cuerda', 'Barbell Guillotine Bench Press': 'Press de banca guillotina con barra',
    'Barbell Curls Lying Against An Incline': 'Curl con barra acostado en banco inclinado', 'Bent Over Dumbbell Rear Delt Raise With Head On Bench': 'Elevación posterior con mancuernas con la frente en el banco',
    'Bent Over Low-Pulley Side Lateral': 'Elevación lateral con torso inclinado en polea baja', 'Standing Inner-Biceps Curl': 'Curl de bíceps interno de pie', 'Standing One-Arm Dumbbell Curl Over Incline Bench': 'Curl a un brazo con mancuerna sobre banco inclinado',
    'Dumbbell Scaption': 'Elevación en plano escapular con mancuernas', 'Step-up with Knee Raise': 'Subida al cajón con elevación de rodilla', 'Knee Tuck Jump': 'Salto con rodillas al pecho', 'Rocket Jump': 'Salto cohete',
    'Scissors Jump': 'Salto de tijera', 'Frog Hops': 'Saltos de rana', 'Lateral Bound': 'Salto lateral', 'Hurdle Hops': 'Saltos de vallas', 'Freehand Jump Squat': 'Sentadilla con salto sin peso', 'Spider Crawl': 'Gateo de araña',
    'Medicine Ball Chest Pass': 'Pase de pecho con balón medicinal', 'One-Arm Medicine Ball Slam': 'Azote de balón medicinal a un brazo', 'Overhead Slam': 'Azote de balón sobre la cabeza', "Runner's Stretch": 'Estiramiento del corredor',
    "Dancer's Stretch": 'Estiramiento del bailarín', 'Upward Stretch': 'Estiramiento hacia arriba', 'Isometric Chest Squeezes': 'Compresión isométrica de pecho', 'Knee/Hip Raise On Parallel Bars': 'Elevación de rodillas en paralelas',
    'Close-Grip Front Lat Pulldown': 'Jalón al pecho con agarre cerrado', 'Barbell Ab Rollout': 'Rueda abdominal con barra', 'Barbell Ab Rollout - On Knees': 'Rueda abdominal con barra (de rodillas)',
    'Chair Upper Body Stretch': 'Estiramiento del tren superior en silla', 'Cross Body Hammer Curl': 'Curl martillo cruzado', 'Weighted Sissy Squat': 'Sentadilla sissy con peso', 'Scapular Pull-Up': 'Dominada escapular',
    'Rack Pull with Bands': 'Peso muerto desde rack con banda', 'Kettlebell Sumo High Pull': 'Jalón alto sumo con kettlebell', 'T-Bar Row with Handle': 'Remo en barra T', 'Stiff Leg Barbell Good Morning': 'Buenos días con piernas rígidas con barra',
}
# Liberación miofascial con rodillo («Calves-SMR»)
SMR = {'calves': 'pantorrillas', 'hamstring': 'isquiotibiales', 'quadriceps': 'cuádriceps', 'lower back': 'espalda baja', 'neck': 'cuello', 'foot': 'planta del pie', 'latissimus dorsi': 'dorsal',
       'rhomboids': 'romboides', 'piriformis': 'piriforme', 'peroneals': 'peroneos', 'brachialis': 'braquial', 'iliotibial tract': 'banda iliotibial', 'anterior tibialis': 'tibial anterior'}

def load_db():
    js = "global.window={};require(%s);process.stdout.write(JSON.stringify(window.GYM_DB.map(e=>[e.i,e.n,e.c])))" % json.dumps(os.path.join(WEB, 'gym_db.js'))
    return json.loads(subprocess.check_output(['node', '-e', js]))

def take(text, table):
    """Saca de `text` las frases de `table` (las más largas primero). Devuelve [(posición, clave)] y el texto restante."""
    found = []
    for k in sorted(table, key=lambda x: -len(x)):
        pat = re.compile(r'(?<![\w-])' + re.escape(k) + r'(?![\w-])')
        while True:
            m = pat.search(text)
            if not m: break
            found.append((m.start(), k)); text = text[:m.start()] + ' ' * (m.end() - m.start()) + text[m.end():]
    return sorted(found), text

def tr_part(text, need_move=True):
    text = ' ' + re.sub(r'[^a-z0-9\' -]', ' ', text.lower()) + ' '
    text = re.sub(r"\bfarmer's\b", 'farmers', text)
    mv, text = take(text, MOVES)
    eq, text = take(text, EQUIP)
    both, text = take(text, dict(POS, **BODY))
    ps = [(i, k) for i, k in both if k in POS and not (k in BODY and len(k.split()) > 1)]
    bd = [(i, k) for i, k in both if (i, k) not in ps]
    rest = [w for w in re.split(r'[\s]+', text.replace(' - ', ' ')) if w and w not in STOP and w != '-']
    if rest: return None
    if need_move and len(mv) != 1: return None
    if not need_move and mv: return None
    g = 'm'; out = []
    if mv:
        es, g = MOVES[mv[0][1]]; out.append(es)
    gi = 0 if g == 'm' else 1
    one = any(k in ('one-arm', 'one arm', 'single-arm', 'single arm') for _, k in ps)
    for _, k in bd:
        if not (mv and (BODY[k].split(' ', 1)[1] in out[0] or (k in ('ab', 'abs', 'abdominal') and 'abdominal' in out[0]))): out.append(BODY[k])
    for _, k in ps: out.append(POS[k][gi])
    for _, k in eq:
        e = EQUIP[k]
        if e == 'con mancuernas' and one: e = 'con mancuerna'
        if e and e not in out and not (e == 'en polea' and any(x.startswith('en polea ') for x in [EQUIP[k2] for _, k2 in eq])): out.append(e)
    # sin repetir palabras («elevación lateral lateral»)
    res = []
    for p in out:
        if p and p not in res and not (res and p in res[0].split(' ')): res.append(p)
    return ' '.join(res)

def translate(name, cat=''):
    if name in FIXED: return FIXED[name]
    m = re.match(r'^(.+)-SMR$', name)
    if m and m.group(1).lower() in SMR: return 'Liberación miofascial de ' + SMR[m.group(1).lower()]
    main, _, var = name.partition(' - ')
    # los estiramientos a veces solo dicen la zona («Seated Hamstring»)
    if cat == 'stretching' and not var:
        b = tr_part(main, need_move=False)
        if b: return 'Estiramiento ' + b
    a = tr_part(main)
    if not a: return None
    if var.strip():
        b = tr_part(var, need_move=False)
        if b is None: return None
        if b: a += ' (' + re.sub(r'^(con|de) ', '', b) + ')'
    return a[0].upper() + a[1:]

def main():
    db = load_db(); out = {}; miss = []
    for i, n, c in db:
        es = translate(n, c)
        if es: out[i] = es
        else: miss.append(n)
    out = dict(sorted(out.items()))
    with open(os.path.join(WEB, 'gym_names_es.js'), 'w', encoding='utf-8') as f:
        f.write('// Nombres en español de los ejercicios de gym_db.js. Generado por tools/gym_names_es.py: no editar a mano.\n')
        f.write('window.GYM_NAMES_ES = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('con nombre en español: %d de %d' % (len(out), len(db)))
    if '--report' in sys.argv:
        print('\n'.join('%s  →  %s' % (n, out[i]) for i, n, c in db if i in out))
        print('--- sin traducir ---'); print('\n'.join(miss))

if __name__ == '__main__': main()
