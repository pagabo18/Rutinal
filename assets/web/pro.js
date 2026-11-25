// ============================================================
// Rutinal · herramientas profesionales
// 1) Evaluación antropométrica: mediciones, fórmulas y perfil del atleta.
// 2) Sistema de equivalentes y dietas prehechas (más abajo).
// Las fórmulas son estimaciones de campo: sirven para dar seguimiento a la misma
// persona con el mismo método, no sustituyen una valoración clínica.
// ============================================================

// ---------- Cálculo ----------
const ANT_SK = [
  ['triceps', 'Tríceps'], ['biceps', 'Bíceps'], ['subscapular', 'Subescapular'], ['suprailiac', 'Cresta ilíaca (suprailíaco)'],
  ['supraspinal', 'Supraespinal'], ['abdominal', 'Abdominal'], ['chest', 'Pectoral'], ['axilla', 'Axilar medio'],
  ['thigh', 'Muslo anterior'], ['calf', 'Pantorrilla medial'],
];
const ANT_GI = [
  ['neck', 'Cuello'], ['shoulders', 'Hombros'], ['chestg', 'Tórax'], ['arm', 'Brazo relajado'], ['armflex', 'Brazo contraído'],
  ['forearm', 'Antebrazo'], ['waist', 'Cintura'], ['abdomen', 'Abdomen (ombligo)'], ['hip', 'Cadera'], ['thighg', 'Muslo medio'], ['calfg', 'Pantorrilla'],
];
const ANT_BD = [['humerus', 'Húmero (codo)'], ['femur', 'Fémur (rodilla)'], ['wrist', 'Muñeca']];
// Lo que reportan los equipos de bioimpedancia (Tanita, InBody, Omron…). Se capturan tal cual los da el equipo.
// [clave, nombre, unidad, ¿es masa?, decimales]. Las masas se guardan en kg.
const ANT_BIA = [
  ['bfDevice', '% de grasa', '%', 0, 1], ['biaMuscle', 'Masa muscular', 'kg', 1, 1], ['biaWater', 'Agua corporal', '%', 0, 1],
  ['biaVisceral', 'Grasa visceral', 'nivel', 0, 1], ['biaBone', 'Masa ósea', 'kg', 1, 1], ['biaBmr', 'Metabolismo basal', 'kcal', 0, 0],
  ['biaMetAge', 'Edad metabólica', 'años', 0, 0], ['biaPhase', 'Ángulo de fase', '°', 0, 1],
];
const ANT_ACT = [[1.2, 'Sedentario'], [1.375, 'Ligero (1–3 días/sem)'], [1.55, 'Moderado (3–5 días/sem)'], [1.725, 'Intenso (6–7 días/sem)'], [1.9, 'Muy intenso (doble sesión)']];
const ANT_DW = {
  M: [[17, 1.1533, 0.0643], [20, 1.1620, 0.0630], [30, 1.1631, 0.0632], [40, 1.1422, 0.0544], [50, 1.1620, 0.0700], [999, 1.1715, 0.0779]],
  F: [[17, 1.1369, 0.0598], [20, 1.1549, 0.0678], [30, 1.1599, 0.0717], [40, 1.1423, 0.0632], [50, 1.1333, 0.0612], [999, 1.1339, 0.0645]],
};

// Varias tomas del mismo sitio: promedio de 2, mediana de 3 o más (criterio ISAK).
function antVal(x) {
  if (x == null || x === '') return null;
  const a = (Array.isArray(x) ? x : [x]).map(Number).filter(v => isFinite(v) && v > 0);
  if (!a.length) return null;
  if (a.length === 1) return a[0];
  if (a.length === 2) return (a[0] + a[1]) / 2;
  const s = a.slice().sort((p, q) => p - q), m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function antParseTakes(str) {
  const a = String(str == null ? '' : str).replace(/,/g, '.').split(/[\s\/;]+/).map(parseFloat).filter(v => isFinite(v) && v > 0);
  return a.length ? (a.length === 1 ? a[0] : a) : null;
}
function antTakesText(x) { return x == null ? '' : (Array.isArray(x) ? x.join(' ') : String(x)); }
const antSiri = d => 495 / d - 450;
const antR = (v, n) => (v == null || !isFinite(v)) ? null : Math.round(v * Math.pow(10, n == null ? 1 : n)) / Math.pow(10, n == null ? 1 : n);

function antCalc(d) {
  d = d || {};
  const o = { bf: [], bmr: [], notes: [] };
  const male = d.sex !== 'F', age = +d.age || null, w = +d.weight || null, hcm = +d.height || null, hm = hcm ? hcm / 100 : null;
  const sk = {}, gi = {}, bd = {};
  ANT_SK.forEach(([k]) => { sk[k] = antVal((d.sk || {})[k]); });
  ANT_GI.forEach(([k]) => { gi[k] = antVal((d.gi || {})[k]); });
  ANT_BD.forEach(([k]) => { bd[k] = antVal((d.bd || {})[k]); });
  o.sk = sk; o.gi = gi; o.bd = bd; o.male = male;
  const all = (...ks) => ks.every(k => sk[k] != null), sum = (...ks) => ks.reduce((a, k) => a + sk[k], 0);

  // --- Índices de peso y talla ---
  if (w && hm) {
    o.bmiStd = w / (hm * hm);
    o.bmiNew = 1.3 * w / Math.pow(hm, 2.5); // Trefethen: corrige por estatura
    o.ponderal = w / Math.pow(hm, 3);
    o.bmiList = [{ id: 'bmi', name: 'IMC clásico (Quetelet)', v: o.bmiStd, note: 'kg / m²' }, { id: 'bmiNew', name: 'IMC corregido por talla (Trefethen)', v: o.bmiNew, note: '1.3 × kg / m^2.5' }];
    const bsel = o.bmiList.filter(b => (d.bmiMethods || ['bmi']).includes(b.id));
    o.bmiUsed = bsel.length ? bsel : [o.bmiList[0]];
    o.bmi = o.bmiUsed.reduce((a, b) => a + b.v, 0) / o.bmiUsed.length;
    o.bmiClass = o.bmi < 18.5 ? 'Bajo peso' : o.bmi < 25 ? 'Normal' : o.bmi < 30 ? 'Sobrepeso' : o.bmi < 35 ? 'Obesidad I' : o.bmi < 40 ? 'Obesidad II' : 'Obesidad III';
    o.healthyMin = 18.5 * hm * hm; o.healthyMax = 24.9 * hm * hm;
  }

  // --- % de grasa por método ---
  const add = (id, name, pct, sites) => { if (pct != null && isFinite(pct) && pct > 1 && pct < 70) o.bf.push({ id, name, pct, sites }); };
  if (all('triceps', 'biceps', 'subscapular', 'suprailiac') && age) {
    const row = ANT_DW[male ? 'M' : 'F'].find(r => age < r[0]);
    add('dw', 'Durnin-Womersley (4 pliegues)', antSiri(row[1] - row[2] * Math.log10(sum('triceps', 'biceps', 'subscapular', 'suprailiac'))), 'tríceps, bíceps, subescapular, cresta ilíaca');
  }
  if (all('chest', 'axilla', 'triceps', 'subscapular', 'abdominal', 'suprailiac', 'thigh') && age) {
    const s = sum('chest', 'axilla', 'triceps', 'subscapular', 'abdominal', 'suprailiac', 'thigh');
    const D = male ? 1.112 - 0.00043499 * s + 0.00000055 * s * s - 0.00028826 * age : 1.097 - 0.00046971 * s + 0.00000056 * s * s - 0.00012828 * age;
    add('jp7', 'Jackson-Pollock (7 pliegues)', antSiri(D), 'pectoral, axilar, tríceps, subescapular, abdominal, cresta ilíaca, muslo');
  }
  if (age && male && all('chest', 'abdominal', 'thigh')) {
    const s = sum('chest', 'abdominal', 'thigh');
    add('jp3', 'Jackson-Pollock (3 pliegues)', antSiri(1.10938 - 0.0008267 * s + 0.0000016 * s * s - 0.0002574 * age), 'pectoral, abdominal, muslo');
  }
  if (age && !male && all('triceps', 'suprailiac', 'thigh')) {
    const s = sum('triceps', 'suprailiac', 'thigh');
    add('jp3', 'Jackson-Pollock (3 pliegues)', antSiri(1.0994921 - 0.0009929 * s + 0.0000023 * s * s - 0.0001392 * age), 'tríceps, cresta ilíaca, muslo');
  }
  if (all('triceps', 'subscapular', 'suprailiac', 'abdominal')) {
    const s = sum('triceps', 'subscapular', 'suprailiac', 'abdominal');
    if (male) add('faulkner', 'Faulkner (4 pliegues)', s * 0.153 + 5.783, 'tríceps, subescapular, cresta ilíaca, abdominal');
  }
  if (all('triceps', 'subscapular', 'supraspinal', 'abdominal', 'thigh', 'calf')) {
    const s = sum('triceps', 'subscapular', 'supraspinal', 'abdominal', 'thigh', 'calf');
    add('yuhasz', 'Yuhasz (6 pliegues)', male ? s * 0.1051 + 2.585 : s * 0.1548 + 3.58, 'tríceps, subescapular, supraespinal, abdominal, muslo, pantorrilla');
  }
  if (hcm && gi.neck && gi.waist && (male || gi.hip)) {
    const v = male ? gi.waist - gi.neck : gi.waist + gi.hip - gi.neck;
    if (v > 0) add('navy', 'Perímetros (Marina de EE. UU.)', male
      ? 495 / (1.0324 - 0.19077 * Math.log10(v) + 0.15456 * Math.log10(hcm)) - 450
      : 495 / (1.29579 - 0.35004 * Math.log10(v) + 0.22100 * Math.log10(hcm)) - 450, male ? 'cuello, cintura, talla' : 'cuello, cintura, cadera, talla');
  }
  if (age && all('abdominal', 'triceps', 'thigh', 'suprailiac')) {
    const s = sum('abdominal', 'triceps', 'thigh', 'suprailiac');
    add('jp4', 'Jackson-Pollock (4 pliegues)', male ? 0.29288 * s - 0.0005 * s * s + 0.15845 * age - 5.76377 : 0.29669 * s - 0.00043 * s * s + 0.02963 * age + 1.4072, 'abdominal, tríceps, muslo, cresta ilíaca');
  }
  if (male && all('thigh', 'subscapular')) add('sloan', 'Sloan (2 pliegues)', antSiri(1.1043 - 0.001327 * sk.thigh - 0.00131 * sk.subscapular), 'muslo, subescapular');
  if (!male && all('suprailiac', 'triceps')) add('sloan', 'Sloan (2 pliegues)', antSiri(1.0764 - 0.00081 * sk.suprailiac - 0.00088 * sk.triceps), 'cresta ilíaca, tríceps');
  if (hcm && gi.waist) add('rfm', 'Masa grasa relativa (RFM)', (male ? 64 : 76) - 20 * hcm / gi.waist, 'talla y cintura');
  if (o.bmiStd && age) {
    const b = o.bmiStd, sx = male ? 0 : 1;
    add('cunbae', 'CUN-BAE (IMC, edad y sexo)', -44.988 + 0.503 * age + 10.689 * sx + 3.172 * b - 0.026 * b * b + 0.181 * b * sx - 0.02 * b * age - 0.005 * b * b * sx + 0.00021 * b * b * age, 'sin pliegues; no distingue músculo de grasa');
    add('deurenberg', 'Deurenberg (IMC, edad y sexo)', 1.2 * b + 0.23 * age - 10.8 * (male ? 1 : 0) - 5.4, 'sin pliegues; no distingue músculo de grasa');
  }
  if (+d.bfDevice > 0) add('device', 'Bioimpedancia / equipo', +d.bfDevice, 'medición directa');

  // Método principal: el elegido, o el más completo disponible. El promedio se muestra aparte.
  // % de grasa que se usa: el promedio de las fórmulas que el especialista marcó.
  // Sin selección: la más completa con pliegues (o lo que haya).
  const pref = ['jp7', 'dw', 'jp4', 'jp3', 'yuhasz', 'faulkner', 'sloan', 'navy', 'rfm', 'device', 'cunbae', 'deurenberg'];
  o.bf.sort((x, y) => pref.indexOf(x.id) - pref.indexOf(y.id));
  const chosen = Array.isArray(d.methods) && d.methods.length ? d.methods : (d.method ? [d.method] : null);
  let used = chosen ? o.bf.filter(b => chosen.includes(b.id)) : [];
  if (!used.length) { const m = pref.map(id => o.bf.find(b => b.id === id)).find(Boolean); used = m ? [m] : []; }
  o.bfUsed = used; o.bfAuto = !chosen || !o.bf.some(b => chosen.includes(b.id));
  const SK = ['jp7', 'dw', 'jp4', 'jp3', 'yuhasz', 'faulkner', 'sloan'], skin = o.bf.filter(b => SK.includes(b.id));
  o.bfAvg = skin.length ? skin.reduce((a, b) => a + b.pct, 0) / skin.length : null;
  o.bfAvgAll = o.bf.length ? o.bf.reduce((a, b) => a + b.pct, 0) / o.bf.length : null;
  const pct = used.length ? used.reduce((a, b) => a + b.pct, 0) / used.length : null;
  o.bfMain = !used.length ? null : used.length === 1 ? used[0] : { id: 'avg', name: 'Promedio de ' + used.length + ' fórmulas', pct };
  o.pct = pct;
  if (pct != null) {
    const cuts = male ? [6, 14, 18, 25] : [14, 21, 25, 32];
    o.pctClass = pct < cuts[0] ? 'Grasa esencial' : pct < cuts[1] ? 'Atlético' : pct < cuts[2] ? 'En forma' : pct < cuts[3] ? 'Promedio' : 'Alto';
  }
  if (pct != null && w) {
    o.fm = w * pct / 100; o.ffm = w - o.fm;
    if (hm) { o.fmi = o.fm / (hm * hm); o.ffmi = o.ffm / (hm * hm); o.ffmiN = o.ffmi + 6.1 * (1.8 - hm); }
    const tp = +d.targetBf;
    if (tp > 0 && tp < 60) { o.targetW = o.ffm / (1 - tp / 100); o.targetDiff = o.targetW - w; }
  }

  // --- Sumatorias de pliegues ---
  if (all('triceps', 'subscapular', 'supraspinal', 'abdominal', 'thigh', 'calf')) o.sum6 = sum('triceps', 'subscapular', 'supraspinal', 'abdominal', 'thigh', 'calf');
  if (all('triceps', 'biceps', 'subscapular', 'suprailiac', 'supraspinal', 'abdominal', 'thigh', 'calf')) o.sum8 = sum('triceps', 'biceps', 'subscapular', 'suprailiac', 'supraspinal', 'abdominal', 'thigh', 'calf');
  const got = ANT_SK.filter(([k]) => sk[k] != null);
  if (got.length) { o.sumAll = got.reduce((a, [k]) => a + sk[k], 0); o.sumN = got.length; }

  // --- Distribución de grasa ---
  if (gi.waist) {
    o.waistRisk = gi.waist >= (male ? 102 : 88) ? 'Riesgo alto' : gi.waist >= (male ? 94 : 80) ? 'Riesgo aumentado' : 'Sin riesgo';
    if (gi.hip) { o.whr = gi.waist / gi.hip; o.whrRisk = o.whr >= (male ? 0.90 : 0.85) ? 'Riesgo aumentado' : 'Sin riesgo'; }
    if (hcm) { o.whtr = gi.waist / hcm; o.whtrRisk = o.whtr >= 0.6 ? 'Riesgo alto' : o.whtr >= 0.5 ? 'Riesgo aumentado' : 'Sin riesgo'; }
  }

  // --- Músculo ---
  if (gi.arm && sk.triceps != null) {
    const c = gi.arm - Math.PI * sk.triceps / 10;
    o.armMuscleArea = Math.max(0, c * c / (4 * Math.PI) - (male ? 10 : 6.5)); // Heymsfield, cm²
    o.armMuscleGirth = c;
  }
  if (hm && age && gi.arm && gi.thighg && gi.calfg && sk.triceps != null && sk.thigh != null && sk.calf != null) {
    const ca = gi.arm - Math.PI * sk.triceps / 10, ct = gi.thighg - Math.PI * sk.thigh / 10, cc = gi.calfg - Math.PI * sk.calf / 10;
    o.smm = hm * (0.00744 * ca * ca + 0.00088 * ct * ct + 0.00441 * cc * cc) + 2.4 * (male ? 1 : 0) - 0.048 * age + 7.8; // Lee 2000
    if (w) o.smmPct = o.smm / w * 100;
    o.smmi = o.smm / (hm * hm);
  }

  // --- Somatotipo Heath-Carter ---
  if (hcm && all('triceps', 'subscapular', 'supraspinal')) {
    const x = sum('triceps', 'subscapular', 'supraspinal') * 170.18 / hcm;
    o.endo = -0.7182 + 0.1451 * x - 0.00068 * x * x + 0.0000014 * x * x * x;
  }
  if (hcm && bd.humerus && bd.femur && gi.armflex && gi.calfg && sk.triceps != null && sk.calf != null)
    o.meso = 0.858 * bd.humerus + 0.601 * bd.femur + 0.188 * (gi.armflex - sk.triceps / 10) + 0.161 * (gi.calfg - sk.calf / 10) - 0.131 * hcm + 4.5;
  if (hcm && w) {
    const hwr = hcm / Math.cbrt(w);
    o.ecto = hwr >= 40.75 ? 0.732 * hwr - 28.58 : hwr > 38.25 ? 0.463 * hwr - 17.63 : 0.1;
  }
  [['endo'], ['meso'], ['ecto']].forEach(([k]) => { if (o[k] != null) o[k] = Math.max(0.1, o[k]); });
  if (o.endo != null && o.meso != null && o.ecto != null) {
    const v = { Endomorfo: o.endo, Mesomorfo: o.meso, Ectomorfo: o.ecto };
    const ord = Object.keys(v).sort((a, b) => v[b] - v[a]);
    o.somato = v[ord[0]] - v[ord[1]] < 0.5 ? `${ord[0]}-${ord[1].toLowerCase()}` : (v[ord[1]] - v[ord[2]] < 0.5 ? `${ord[0]} balanceado` : `${ord[0]} con tendencia ${ord[1].toLowerCase().replace(/o$/, 'a')}`);
  }

  // --- Gasto energético ---
  if (w && hcm && age) {
    o.bmr.push({ id: 'mifflin', name: 'Mifflin-St Jeor', kcal: 9.99 * w + 6.25 * hcm - 4.92 * age + (male ? 5 : -161) });
    o.bmr.push({ id: 'hb', name: 'Harris-Benedict (rev. 1984)', kcal: male ? 88.362 + 13.397 * w + 4.799 * hcm - 5.677 * age : 447.593 + 9.247 * w + 3.098 * hcm - 4.330 * age });
  }
  if (o.ffm) {
    o.bmr.push({ id: 'katch', name: 'Katch-McArdle (masa libre de grasa)', kcal: 370 + 21.6 * o.ffm });
    o.bmr.push({ id: 'cunningham', name: 'Cunningham (masa libre de grasa)', kcal: 500 + 22 * o.ffm });
  }
  if (o.bmr.length) {
    o.bmrAvg = o.bmr.reduce((a, b) => a + b.kcal, 0) / o.bmr.length;
    const mainB = o.bmr.find(b => b.id === (o.ffm ? 'katch' : 'mifflin')) || o.bmr[0];
    o.bmrMain = mainB;
    const f = +d.activity || 0;
    if (f >= 1.1 && f <= 2.5) { o.tdee = mainB.kcal * f; o.tdeeAvg = o.bmrAvg * f; o.actF = f; }
  }

  // --- Frecuencia cardiaca ---
  if (age) {
    o.hrMax = 208 - 0.7 * age; // Tanaka
    const rest = +d.rhr || 0;
    o.zones = [[0.5, 0.6, 'Z1 · recuperación'], [0.6, 0.7, 'Z2 · base aeróbica'], [0.7, 0.8, 'Z3 · tempo'], [0.8, 0.9, 'Z4 · umbral'], [0.9, 1, 'Z5 · máximo']]
      .map(([a, b, n]) => rest > 30 ? { n, lo: rest + (o.hrMax - rest) * a, hi: rest + (o.hrMax - rest) * b } : { n, lo: o.hrMax * a, hi: o.hrMax * b });
    o.zonesKarvonen = rest > 30;
  }
  return o;
}

// Promedio de un campo calculado sobre varias evaluaciones (para "promedio de las últimas N").
function antAvg(list, key) {
  const v = list.map(c => c[key]).filter(x => x != null && isFinite(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
}


// ---------- Interfaz ----------
const _ant = { rows: [], clientId: null, name: '', el: null, ctx: {} };
function antN(v, dec, unit) { if (v == null || !isFinite(v)) return '—'; return (+v).toLocaleString(_loc(), { minimumFractionDigits: dec || 0, maximumFractionDigits: dec == null ? 1 : dec }) + (unit ? ' ' + unit : ''); }
function antDelta(now, prev, dec) {
  if (now == null || prev == null || !isFinite(now) || !isFinite(prev)) return '';
  const d = now - prev, r = Math.round(d * Math.pow(10, dec == null ? 1 : dec)) / Math.pow(10, dec == null ? 1 : dec);
  if (!r) return '<i class="ant-d">= <span>sin cambio</span></i>';
  return `<i class="ant-d">${r > 0 ? '▲ +' : '▼ '}${r.toLocaleString(_loc())}</i>`;
}
function antRiskCls(t) { return /alto/i.test(t) ? 'bad' : /aumentado/i.test(t) ? 'warn' : 'ok'; }
function antDate(k) { try { return parseKey(k).toLocaleDateString(_loc(), { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return k; } }
function antWeightOut(kg) { return kg == null ? '—' : bwDisp(kg) + ' ' + bwUnit(); }

async function antRender(clientId, name, el, ctx) {
  Object.assign(_ant, { clientId, name: name || '', el, ctx: ctx || {} });
  el.innerHTML = '<div class="skel" aria-busy="true"><i class="a"></i><i></i><i></i><i class="s"></i></div>';
  try {
    _ant.rows = await sbRest('assessments?select=id,client_id,author_id,taken_on,data,updated_at&client_id=eq.' + encodeURIComponent(clientId) + '&order=taken_on.desc,created_at.desc&limit=60') || [];
  } catch (e) { el.innerHTML = `<p class="auth-msg">${escapeHtml(authErr(e.code))}</p>`; return; }
  if (_ant.el !== el || _ant.clientId !== clientId) return;
  antPaint();
}

function antCard(label, value, sub, delta) {
  return `<div class="ant-c"><span>${label}</span><b translate="no">${value}</b>${sub ? `<small>${sub}</small>` : ''}${delta || ''}</div>`;
}
function antTrend(title, unit, pts, dec) {
  pts = pts.filter(p => p.v != null && isFinite(p.v));
  if (pts.length < 2) return '';
  const vals = pts.map(p => p.v), lo0 = Math.min(...vals), hi0 = Math.max(...vals), pad = Math.max((hi0 - lo0) * 0.15, hi0 * 0.01, 0.5);
  const lo = Math.floor((lo0 - pad) * 10) / 10, hi = Math.ceil((hi0 + pad) * 10) / 10, nn = pts.length - 1;
  const first = vals[0], last = vals[vals.length - 1], avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return `<div class="sp-card"><div class="sp-card-top"><div class="sp-card-n">${title}</div><span class="cd-num" translate="no">${antN(last, dec, unit)}</span></div>
    <div class="sp-card-d"><span>Al inicio</span> <span translate="no">${antN(first, dec)}</span> · <span>Promedio</span> <span translate="no">${antN(avg, dec)}</span> · <span>Cambio</span> <span translate="no">${(last - first > 0 ? '+' : '') + antN(last - first, dec)}</span></div>
    ${gymLineSvg([{ color: '#52525B', pts: pts.map((p, i) => ({ x: i / nn, y: p.v })) }], { min: lo, max: hi, ticks: [lo, hi], h: 110,
      labels: [0, nn].map(i => ({ x: i / nn, t: parseKey(pts[i].d).toLocaleDateString(_loc(), { day: 'numeric', month: 'short' }) })) })}</div>`;
}

function antReportHtml(row, prevRow, all) {
  const d = row.data || {}, c = antCalc(d), pc = prevRow ? antCalc(prevRow.data || {}) : {}, pd = prevRow ? (prevRow.data || {}) : {};
  const lb = bwUnit() === 'lb', kg = v => v == null ? null : (lb ? v * GYM_LB : v), wu = bwUnit();
  const sec = (title, inner) => inner ? `<div class="sp-card"><div class="sp-card-n">${title}</div>${inner}</div>` : '';
  // Composición
  const comp = [
    antCard('Peso', antN(kg(+d.weight || null), 1, wu), '', antDelta(kg(+d.weight || null), kg(+pd.weight || null))),
    antCard('Talla', antN(+d.height || null, 1, 'cm')),
    antCard('IMC', antN(c.bmi, 1), c.bmiClass ? `<span>${c.bmiClass}</span>` : '', antDelta(c.bmi, pc.bmi)),
    antCard('% de grasa', antN(c.pct, 1, '%'), c.pctClass ? `<span>${c.pctClass}</span>` : '', antDelta(c.pct, pc.pct)),
    antCard('Masa grasa', antN(kg(c.fm), 1, wu), '', antDelta(kg(c.fm), kg(pc.fm))),
    antCard('Masa libre de grasa', antN(kg(c.ffm), 1, wu), '', antDelta(kg(c.ffm), kg(pc.ffm))),
    antCard('IMG', antN(c.fmi, 1), '<span>Índice de masa grasa</span>', antDelta(c.fmi, pc.fmi)),
    antCard('IMLG', antN(c.ffmi, 1), c.ffmiN != null ? `<span>Normalizado</span> <span translate="no">${antN(c.ffmiN, 1)}</span>` : '<span>Índice de masa libre de grasa</span>', antDelta(c.ffmi, pc.ffmi)),
  ];
  if (c.smm != null) comp.push(antCard('Masa muscular', antN(kg(c.smm), 1, wu), `<span translate="no">${antN(c.smmPct, 1)} %</span> <span>del peso</span>`, antDelta(kg(c.smm), kg(pc.smm))));
  if (c.sum6 != null || c.sumAll != null) comp.push(antCard(c.sum6 != null ? 'Σ 6 pliegues' : `Σ ${c.sumN} <span>pliegues</span>`, antN(c.sum6 != null ? c.sum6 : c.sumAll, 1, 'mm'), c.sum8 != null ? `<span>Σ 8:</span> <span translate="no">${antN(c.sum8, 1)} mm</span>` : '', antDelta(c.sum6 != null ? c.sum6 : c.sumAll, c.sum6 != null ? pc.sum6 : pc.sumAll)));
  // Métodos de % de grasa
  let methods = '';
  if (c.bf.length) {
    const inU = b => c.bfUsed.some(u => u.id === b.id);
    methods = `<table class="ant-t"><tbody>${c.bf.map(b => `<tr class="${inU(b) ? 'on' : 'off'}"><td><span>${b.name}</span>${inU(b) ? ` <em>${c.bfUsed.length > 1 ? 'incluida' : 'usada'}</em>` : ''}<small>${b.sites}</small></td><td translate="no">${antN(b.pct, 1)} %</td></tr>`).join('')}
      ${c.bfUsed.length > 1 ? `<tr class="avg"><td><span>Promedio de las fórmulas elegidas</span><small><span translate="no">${c.bfUsed.length}</span> <span>fórmulas</span> · <span>es el % de grasa que usa todo el reporte</span></small></td><td translate="no">${antN(c.pct, 1)} %</td></tr>` : ''}
      ${c.bf.length > 1 ? `<tr class="ref"><td><span>Promedio de todas</span></td><td translate="no">${antN(c.bfAvgAll, 1)} %</td></tr><tr class="ref"><td><span>Rango entre fórmulas</span></td><td translate="no">${antN(Math.min(...c.bf.map(b => b.pct)), 1)}–${antN(Math.max(...c.bf.map(b => b.pct)), 1)} %</td></tr>` : ''}</tbody></table>`;
    if (c.bmiList) methods += `<div class="sp-card-n" style="margin-top:14px;">Índices de peso y talla</div><table class="ant-t"><tbody>${c.bmiList.map(b => `<tr class="${c.bmiUsed.some(u => u.id === b.id) ? 'on' : 'off'}"><td><span>${b.name}</span>${c.bmiUsed.some(u => u.id === b.id) ? ` <em>${c.bmiUsed.length > 1 ? 'incluida' : 'usada'}</em>` : ''}<small translate="no">${b.note}</small></td><td translate="no">${antN(b.v, 1)}</td></tr>`).join('')}
      ${c.bmiUsed.length > 1 ? `<tr class="avg"><td><span>Promedio</span></td><td translate="no">${antN(c.bmi, 1)}</td></tr>` : ''}<tr class="ref"><td><span>Índice ponderal</span><small translate="no">kg / m³</small></td><td translate="no">${antN(c.ponderal, 1)}</td></tr></tbody></table>`;
  }
  // Bioimpedancia (lo que dio el equipo)
  const bia = ANT_BIA.filter(([k]) => +d[k] > 0).map(([k, n, u, mass, dec]) => {
    const v = mass ? kg(+d[k]) : +d[k], pv = pd[k] != null ? (mass ? kg(+pd[k]) : +pd[k]) : null;
    let sub = '';
    if (k === 'biaMetAge' && +d.age) { const df = +d[k] - +d.age; sub = df ? `<span translate="no">${df > 0 ? '+' : ''}${df}</span> <span>vs. su edad</span>` : '<span>Igual a su edad</span>'; }
    if (k === 'bfDevice' && c.pct != null && c.bfUsed && !c.bfUsed.some(b => b.id === 'device')) sub = `<span>Pliegues:</span> <span translate="no">${antN(c.pct, 1)} %</span>`;
    return antCard(n, antN(v, dec, mass ? wu : u === 'nivel' ? '' : u), sub, antDelta(v, pv, dec));
  });
  const biaHtml = bia.length ? `<div class="sp-card"><div class="sp-card-n">Bioimpedancia${d.biaDevice ? ` · <span translate="no">${escapeHtml(d.biaDevice)}</span>` : ''}</div><div class="ant-grid" style="margin-top:8px;">${bia.join('')}</div><div class="sp-card-d">Valores del equipo. Cambian con la hidratación, la comida y el ejercicio reciente; compáralos solo entre mediciones en las mismas condiciones.</div>${+d.biaMuscle && c.smm != null ? '<div class="sp-card-d">La masa muscular del equipo incluye más tejido que la masa muscular esquelética calculada con perímetros y pliegues, por eso sale más alta. No se comparan entre sí.</div>' : ''}</div>` : '';
  // Distribución
  const dist = [];
  if (c.gi.waist) dist.push(antCard('Cintura', antN(c.gi.waist, 1, 'cm'), `<span class="ant-r ${antRiskCls(c.waistRisk)}">${c.waistRisk}</span>`, antDelta(c.gi.waist, pc.gi && pc.gi.waist)));
  if (c.whr != null) dist.push(antCard('ICC', antN(c.whr, 2), `<span class="ant-r ${antRiskCls(c.whrRisk)}">${c.whrRisk}</span>`, antDelta(c.whr, pc.whr, 2)));
  if (c.whtr != null) dist.push(antCard('ICT', antN(c.whtr, 2), `<span class="ant-r ${antRiskCls(c.whtrRisk)}">${c.whtrRisk}</span>`, antDelta(c.whtr, pc.whtr, 2)));
  if (c.armMuscleArea != null) dist.push(antCard('Área muscular del brazo', antN(c.armMuscleArea, 1, 'cm²'), '', antDelta(c.armMuscleArea, pc.armMuscleArea)));
  // Somatotipo
  let som = '';
  if (c.endo != null || c.meso != null || c.ecto != null) {
    const bar = (n, v) => v == null ? '' : `<div class="ant-som"><span>${n}</span><div><i style="width:${Math.min(100, v / 8 * 100).toFixed(0)}%"></i></div><b translate="no">${antN(v, 1)}</b></div>`;
    som = bar('Endomorfia', c.endo) + bar('Mesomorfia', c.meso) + bar('Ectomorfia', c.ecto) + (c.somato ? `<div class="sp-card-d"><span>${c.somato}</span></div>` : '<div class="sp-card-d">Para el somatotipo completo faltan diámetros de húmero y fémur, brazo contraído y pantorrilla.</div>');
  }
  // Energía
  let energy = '';
  if (c.bmr.length) {
    energy = `<table class="ant-t"><tbody>${c.bmr.map(b => `<tr class="${c.bmrMain.id === b.id ? 'on' : ''}"><td><span>${b.name}</span>${c.bmrMain.id === b.id ? ' <em>principal</em>' : ''}</td><td translate="no">${antN(b.kcal, 0)} kcal</td></tr>`).join('')}
      <tr class="avg"><td><span>Promedio de las fórmulas</span></td><td translate="no">${antN(c.bmrAvg, 0)} kcal</td></tr>
      ${c.tdee ? `<tr class="avg"><td><span>Gasto total del día</span><small><span>factor de actividad</span> ${c.actF}</small></td><td translate="no">${antN(c.tdee, 0)} kcal</td></tr>` : ''}</tbody></table>`;
  }
  // Objetivo
  let target = '';
  if (c.targetW != null) target = `<div class="sp-card-d" style="font-size:14px;color:var(--text);"><span>Con</span> <b translate="no">${antN(+d.targetBf, 1)} %</b> <span>de grasa y la misma masa libre de grasa pesaría</span> <b translate="no">${antN(kg(c.targetW), 1, wu)}</b> (<span translate="no">${(c.targetDiff > 0 ? '+' : '') + antN(kg(c.targetDiff), 1, wu)}</span>).</div>`;
  if (c.healthyMin) target += `<div class="sp-card-d"><span>Peso con IMC entre 18.5 y 24.9:</span> <span translate="no">${antN(kg(c.healthyMin), 1)}–${antN(kg(c.healthyMax), 1, wu)}</span></div>`;
  // FC
  let hr = '';
  if (c.zones && (+d.rhr || +d.bpSys)) {
    hr = `<div class="sp-card-d">${+d.rhr ? `<span>FC en reposo</span> <b translate="no">${+d.rhr}</b> lpm · ` : ''}<span>FC máxima estimada</span> <b translate="no">${antN(c.hrMax, 0)}</b> lpm${+d.bpSys && +d.bpDia ? ` · <span>Presión arterial</span> <b translate="no">${+d.bpSys}/${+d.bpDia}</b> mmHg` : ''}</div>
      <table class="ant-t"><tbody>${c.zones.map(z => `<tr><td><span>${z.n}</span></td><td translate="no">${antN(z.lo, 0)}–${antN(z.hi, 0)} lpm</td></tr>`).join('')}</tbody></table>
      <div class="sp-card-d">${c.zonesKarvonen ? 'Zonas por reserva de frecuencia cardiaca (Karvonen).' : 'Zonas por porcentaje de la FC máxima. Con la FC en reposo se calculan por reserva.'}</div>`;
  }
  // Mediciones crudas
  const raw = (list, obj, pobj, unit) => { const rows = list.filter(([k]) => obj[k] != null); return rows.length ? `<table class="ant-t"><tbody>${rows.map(([k, n]) => `<tr><td><span>${n}</span></td><td translate="no">${antN(obj[k], 1)} ${unit}${antDelta(obj[k], pobj && pobj[k])}</td></tr>`).join('')}</tbody></table>` : ''; };
  // Evolución
  let evo = '';
  if (all.length > 1) {
    const asc = all.slice().reverse().map(r => ({ d: r.taken_on, c: antCalc(r.data || {}), w: +(r.data || {}).weight || null }));
    evo = antTrend('Peso', wu, asc.map(x => ({ d: x.d, v: kg(x.w) })), 1) + antTrend('% de grasa', '%', asc.map(x => ({ d: x.d, v: x.c.pct })), 1)
      + antTrend('Masa libre de grasa', wu, asc.map(x => ({ d: x.d, v: kg(x.c.ffm) })), 1) + antTrend('Cintura', 'cm', asc.map(x => ({ d: x.d, v: x.c.gi.waist })), 1)
      + antTrend('Σ pliegues', 'mm', asc.map(x => ({ d: x.d, v: x.c.sum6 != null ? x.c.sum6 : x.c.sumAll })), 1)
      + antTrend('Masa muscular (equipo)', wu, all.slice().reverse().map(r => ({ d: r.taken_on, v: +(r.data || {}).biaMuscle ? kg(+(r.data || {}).biaMuscle) : null })), 1)
      + antTrend('Grasa visceral', '', all.slice().reverse().map(r => ({ d: r.taken_on, v: +(r.data || {}).biaVisceral || null })), 1);
  }
  return `<div class="ant-h"><b>${escapeHtml(antDate(row.taken_on))}</b><span>${d.sex === 'F' ? 'Mujer' : 'Hombre'} · <span translate="no">${+d.age || '—'}</span> <span>años</span>${prevRow ? ` · <span>cambios vs.</span> ${escapeHtml(antDate(prevRow.taken_on))}` : ''}</span></div>
    <div class="ant-grid">${comp.join('')}</div>
    ${biaHtml}
    ${sec('% de grasa por fórmula', methods)}
    ${dist.length ? `<div class="ant-grid">${dist.join('')}</div>` : ''}
    ${sec('Somatotipo (Heath-Carter)', som)}
    ${sec('Gasto energético en reposo', energy)}
    ${sec('Peso objetivo', target)}
    ${sec('Frecuencia cardiaca', hr)}
    ${sec('Pliegues', raw(ANT_SK, c.sk, pc.sk, 'mm'))}
    ${sec('Perímetros', raw(ANT_GI, c.gi, pc.gi, 'cm'))}
    ${sec('Diámetros óseos', raw(ANT_BD, c.bd, pc.bd, 'cm'))}
    ${d.notes ? sec('Notas', `<div class="sp-card-d" style="white-space:pre-wrap;color:var(--text);">${escapeHtml(d.notes)}</div>`) : ''}
    ${evo ? `<h3 class="ant-sub">Evolución</h3>${evo}` : ''}
    <div class="ant-foot">Estimaciones de campo. Sirven para comparar a la misma persona con el mismo método y la misma técnica; no sustituyen una valoración clínica.</div>`;
}

function antPaint() {
  const el = _ant.el, rows = _ant.rows, me = (authGet() || {}).uid;
  if (!el) return;
  if (_ant.sel == null || !rows.find(r => r.id === _ant.sel)) _ant.sel = rows[0] ? rows[0].id : null;
  const idx = rows.findIndex(r => r.id === _ant.sel), row = rows[idx], prev = rows[idx + 1] || null;
  el.innerHTML = `<div class="sp-rep-btns"><button class="sp-act primary" id="ant-new">Nueva evaluación</button>${row ? '<button class="sp-act" id="ant-pdf">Guardar PDF</button>' : ''}</div>
    ${row ? `<div id="ant-report">${antReportHtml(row, prev, rows)}</div>` : `<div class="sp-empty">Aún no hay evaluaciones. Registra peso, talla, pliegues y perímetros; la app calcula IMC, % de grasa, masa libre de grasa, índices y gasto energético.</div>`}
    ${rows.length ? `<h3 class="ant-sub">Historial</h3>${rows.map(r => { const c = antCalc(r.data || {}); return `<div class="ant-row${r.id === _ant.sel ? ' on' : ''}" data-ant-sel="${r.id}"><div><b>${escapeHtml(antDate(r.taken_on))}</b><small translate="no">${antWeightOut(+(r.data || {}).weight || null)}${c.pct != null ? ' · ' + antN(c.pct, 1) + ' %' : ''}${c.bmi != null ? ' · IMC ' + antN(c.bmi, 1) : ''}</small></div>
      ${r.author_id === me ? `<span><button class="lk-mini" data-ant-edit="${r.id}">Editar</button><button class="lk-mini" data-ant-del="${r.id}">Eliminar</button></span>` : ''}</div>`; }).join('')}` : ''}`;
  el.querySelector('#ant-new').addEventListener('click', () => antOpenEditor(null));
  const pdf = el.querySelector('#ant-pdf');
  if (pdf) pdf.addEventListener('click', () => {
    const css = `<style>.ant-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0;} .ant-c{border:1px solid #ddd;border-radius:10px;padding:10px;} .ant-c span{font-size:11px;color:#777;} .ant-c>span{display:block;} .ant-c b{font-size:17px;display:block;} .ant-c small{font-size:11px;color:#777;display:block;} .ant-d{font-style:normal;font-size:11px;color:#555;margin-left:6px;}
      .ant-t{width:100%;border-collapse:collapse;margin-top:6px;} .ant-t td{padding:5px 0;border-bottom:1px solid #eee;vertical-align:top;} .ant-t td:last-child{text-align:right;white-space:nowrap;font-weight:600;} .ant-t small{display:block;color:#777;font-size:11px;} .ant-t em{font-style:normal;font-size:10px;border:1px solid #bbb;border-radius:8px;padding:1px 6px;margin-left:4px;} .ant-t tr.avg td{font-weight:700;}
      .ant-h{margin-bottom:6px;} .ant-h b{font-size:16px;margin-right:8px;} .ant-h span{color:#777;} .ant-sub{font-size:15px;margin:16px 0 8px;} .ant-foot{color:#777;font-size:11px;margin-top:12px;} .ant-r{font-weight:600;}
      .ant-som{display:grid;grid-template-columns:100px 1fr 40px;gap:8px;align-items:center;margin-top:6px;} .ant-som div{height:8px;background:#eee;border-radius:4px;overflow:hidden;} .ant-som i{display:block;height:100%;background:#333;}</style>`;
    spPrintReport(`Rutinal - ${_ant.name} - ${row.taken_on}`, `${css}<h1>${escapeHtml(_ant.name)}</h1><div class="sub">Evaluación antropométrica · Rutinal</div>${document.getElementById('ant-report').innerHTML}`);
  });
  el.querySelectorAll('[data-ant-sel]').forEach(b => b.addEventListener('click', e => { if (e.target.closest('button')) return; _ant.sel = b.dataset.antSel; antPaint(); try { el.scrollIntoView({ block: 'start' }); } catch (x) {} }));
  el.querySelectorAll('[data-ant-edit]').forEach(b => b.addEventListener('click', () => antOpenEditor(rows.find(r => r.id === b.dataset.antEdit))));
  el.querySelectorAll('[data-ant-del]').forEach(b => b.addEventListener('click', async () => {
    if (!confirm(t('¿Eliminar esta evaluación?'))) return;
    try { await sbRest('assessments?id=eq.' + encodeURIComponent(b.dataset.antDel), { method: 'DELETE', headers: { Prefer: 'return=minimal' } }); } catch (e) { alert(authErr(e.code)); return; }
    _ant.rows = _ant.rows.filter(r => r.id !== b.dataset.antDel); antPaint();
  }));
}

function antOpenEditor(row) {
  const last = _ant.rows[0] ? (_ant.rows[0].data || {}) : {}, np = (_ant.ctx.D && _ant.ctx.D.nutri_profile) || {}, wl = (_ant.ctx.D && _ant.ctx.D.weight_log) || {};
  const wk = Object.keys(wl).sort().pop();
  const d = row ? JSON.parse(JSON.stringify(row.data || {})) : {
    sex: last.sex || np.sex || 'M', age: last.age || np.age || '', height: last.height || np.heightCm || '', weight: (wk && +wl[wk]) || '',
    activity: last.activity || 1.55, targetBf: last.targetBf || '', method: last.method || '', sk: {}, gi: {}, bd: {} };
  d.sk = d.sk || {}; d.gi = d.gi || {}; d.bd = d.bd || {};
  const fld = (grp, list, unit, ph) => list.map(([k, n]) => `<label class="ant-f"><span>${n}</span><span class="ant-in"><input inputmode="decimal" data-ant="${grp}.${k}" value="${escapeHtml(antTakesText(d[grp][k]))}" placeholder="${ph || ''}" autocomplete="off"><i>${unit}</i></span></label>`).join('');
  const one = (k, n, unit, val, ph) => `<label class="ant-f"><span>${n}</span><span class="ant-in"><input inputmode="decimal" data-ant="${k}" value="${escapeHtml(val == null ? '' : String(val))}" placeholder="${ph || ''}" autocomplete="off"><i>${unit}</i></span></label>`;
  const html = `<div class="ant-ed">
    <div class="sp-sub" style="margin-bottom:10px;"><span>Evaluación de</span> <b translate="no">${escapeHtml(_ant.name)}</b></div>
    <div class="ant-live" id="ant-live"></div>
    <details open><summary>Datos básicos</summary>
      <label class="ant-f"><span>Fecha</span><span class="ant-in"><input type="date" id="ant-date" value="${escapeHtml(row ? row.taken_on : keyDate())}" max="${keyDate()}"></span></label>
      <div class="ant-f"><span>Sexo</span><div class="chips" id="ant-sex"><div class="chip${d.sex !== 'F' ? ' selected' : ''}" data-v="M">Hombre</div><div class="chip${d.sex === 'F' ? ' selected' : ''}" data-v="F">Mujer</div></div></div>
      ${one('age', 'Edad', 'años', d.age)}${one('weight', 'Peso', bwUnit(), d.weight ? bwDisp(d.weight) : '')}${one('height', 'Talla', 'cm', d.height)}
    </details>
    <details open><summary>Pliegues cutáneos <small>mm</small></summary>
      <div class="ant-hint">Lado derecho, con plicómetro. Puedes escribir 2 o 3 tomas separadas por espacio (ej. <span translate="no">12 13 12.5</span>): con dos se promedian y con tres se usa la mediana.</div>
      ${fld('sk', ANT_SK, 'mm')}
    </details>
    <details><summary>Perímetros <small>cm</small></summary>${fld('gi', ANT_GI, 'cm')}</details>
    <details><summary>Diámetros óseos <small>cm</small></summary><div class="ant-hint">Para el somatotipo.</div>${fld('bd', ANT_BD, 'cm')}</details>
    <details open><summary>Fórmulas</summary><div class="ant-hint">Marca las fórmulas que quieres usar. El % de grasa y el IMC del reporte son el promedio de las que marques; si no marcas ninguna se usa la más completa.</div><div id="ant-forms"></div></details>
    <details${ANT_BIA.some(([k]) => d[k] != null) ? ' open' : ''}><summary>Bioimpedancia <small>Tanita, InBody…</small></summary>
      <div class="ant-hint">Copia los valores tal como los da el equipo. Para comparar entre fechas, mide en las mismas condiciones: en ayunas, sin entrenar antes y a la misma hora.</div>
      <label class="ant-f"><span>Equipo</span><span class="ant-in"><input id="ant-biadev" maxlength="40" value="${escapeHtml(d.biaDevice || '')}" placeholder="Tanita BC-545, InBody 270…" autocomplete="off"></span></label>
      ${ANT_BIA.map(([k, n, u, mass]) => one(k, n, mass ? bwUnit() : u, d[k] == null ? '' : mass ? bwDisp(d[k]) : d[k])).join('')}
    </details>
    <details><summary>Otros datos</summary>
      ${one('rhr', 'FC en reposo', 'lpm', d.rhr)}
      <div class="ant-f"><span>Presión arterial</span><span class="ant-in two"><input inputmode="numeric" data-ant="bpSys" value="${escapeHtml(String(d.bpSys || ''))}" placeholder="120"><b>/</b><input inputmode="numeric" data-ant="bpDia" value="${escapeHtml(String(d.bpDia || ''))}" placeholder="80"><i>mmHg</i></span></div>
      <label class="ant-f"><span>Nivel de actividad</span><span class="ant-in"><select id="ant-act">${ANT_ACT.map(([v, n]) => `<option value="${v}"${+d.activity === v ? ' selected' : ''}>${n}</option>`).join('')}</select></span></label>
      ${one('targetBf', '% de grasa objetivo', '%', d.targetBf)}
      <label class="ant-f col"><span>Notas</span><textarea id="ant-notes" rows="3" maxlength="800" placeholder="Condiciones de la medición, observaciones...">${escapeHtml(d.notes || '')}</textarea></label>
    </details>
    <p class="auth-msg" id="ant-msg"></p></div>`;
  const sel = { bf: Array.isArray(d.methods) ? d.methods.slice() : (d.method ? [d.method] : []), bmi: Array.isArray(d.bmiMethods) ? d.bmiMethods.slice() : [] };
  const read = () => {
    const out = { sex: document.querySelector('#ant-sex .chip.selected').dataset.v, sk: {}, gi: {}, bd: {} };
    document.querySelectorAll('.ant-ed [data-ant]').forEach(i => {
      const k = i.dataset.ant, v = i.value.trim();
      if (k.includes('.')) { const [g, f] = k.split('.'); const p = antParseTakes(v); if (p != null) out[g][f] = p; }
      else if (v !== '') { const n = parseFloat(v.replace(',', '.')); if (isFinite(n)) out[k] = (k === 'weight' || ANT_BIA.some(b => b[0] === k && b[3])) ? bwStore(n) : n; }
    });
    const bdv = document.getElementById('ant-biadev').value.trim(); if (bdv) out.biaDevice = bdv;
    out.activity = +document.getElementById('ant-act').value || 1.55;
    if (sel.bf.length) out.methods = sel.bf.slice();
    if (sel.bmi.length) out.bmiMethods = sel.bmi.slice();
    const nt = document.getElementById('ant-notes').value.trim(); if (nt) out.notes = nt;
    return out;
  };
  const live = () => {
    const c = antCalc(read()), lb = bwUnit() === 'lb', kg = v => v == null ? null : (lb ? v * GYM_LB : v);
    document.getElementById('ant-live').innerHTML = [['IMC', antN(c.bmi, 1)], ['% grasa', antN(c.pct, 1)], ['Masa libre de grasa', antN(kg(c.ffm), 1)], ['Σ pliegues', antN(c.sum6 != null ? c.sum6 : c.sumAll, 1)]]
      .map(([n, v]) => `<div><span>${n}</span><b translate="no">${v}</b></div>`).join('') + `<small>${c.bfMain ? `<span>% de grasa:</span> <span>${c.bfMain.id === 'avg' ? 'promedio de las fórmulas marcadas' : c.bfMain.name}</span>` : '<span>Completa los pliegues de alguna fórmula para calcular el % de grasa.</span>'}</small>`;
    const box = document.getElementById('ant-forms');
    if (!box) return;
    const line = (grp, b, val, on, sub) => `<label class="ant-fm${on ? ' on' : ''}"><input type="checkbox" data-fm="${grp}:${b.id}"${on ? ' checked' : ''}><span><b>${b.name}</b><small>${sub}</small></span><em translate="no">${val}</em></label>`;
    box.innerHTML = `<div class="ant-fmh"><span>% de grasa</span><span><button type="button" class="lk-mini" data-fm-all="1">Todas</button> <button type="button" class="lk-mini" data-fm-all="0">Ninguna</button></span></div>
      ${c.bf.length ? c.bf.map(b => line('bf', b, antN(b.pct, 1) + ' %', sel.bf.includes(b.id), b.sites)).join('') : '<div class="ant-hint">Aún no hay datos suficientes para ninguna fórmula.</div>'}
      ${c.bf.length ? `<div class="ant-fmt"><span>${sel.bf.filter(id => c.bf.some(b => b.id === id)).length > 1 ? 'Promedio de las marcadas' : sel.bf.filter(id => c.bf.some(b => b.id === id)).length === 1 ? 'Fórmula marcada' : 'Automático (la más completa)'}</span><b translate="no">${antN(c.pct, 1)} %</b></div>` : ''}
      ${c.bmiList ? `<div class="ant-fmh" style="margin-top:14px;"><span>IMC</span></div>${c.bmiList.map(b => line('bmi', b, antN(b.v, 1), (sel.bmi.length ? sel.bmi : ['bmi']).includes(b.id), b.note)).join('')}<div class="ant-fmt"><span>${c.bmiUsed.length > 1 ? 'Promedio' : 'IMC usado'}</span><b translate="no">${antN(c.bmi, 1)}</b></div>` : ''}`;
    box.querySelectorAll('[data-fm]').forEach(i => i.addEventListener('change', () => {
      const [g, id] = i.dataset.fm.split(':');
      if (g === 'bmi' && !sel.bmi.length) sel.bmi = ['bmi'];
      const arr = sel[g], k = arr.indexOf(id);
      if (i.checked && k < 0) arr.push(id); else if (!i.checked && k >= 0) arr.splice(k, 1);
      live();
    }));
    box.querySelectorAll('[data-fm-all]').forEach(b => b.addEventListener('click', () => { sel.bf = b.dataset.fmAll === '1' ? c.bf.map(x => x.id) : []; live(); }));
  };
  openSheet(row ? 'Editar evaluación' : 'Nueva evaluación', html, async () => {
    const data = read(), msg = document.getElementById('ant-msg'), date = document.getElementById('ant-date').value || keyDate();
    if (!data.weight || !data.height || !data.age) { msg.textContent = t('Captura al menos edad, peso y talla.'); return; }
    if (data.weight < 20 || data.weight > 400 || data.height < 90 || data.height > 250 || data.age < 5 || data.age > 110) { msg.textContent = t('Revisa edad, peso y talla: algún valor está fuera de rango.'); return; }
    const bad = Object.values(data.sk).some(v => antVal(v) > 90) || Object.values(data.gi).some(v => antVal(v) > 250) || Object.values(data.bd).some(v => antVal(v) > 20);
    if (bad) { msg.textContent = t('Revisa las mediciones: pliegues en mm, perímetros y diámetros en cm.'); return; }
    try {
      if (row) await sbRest('assessments?id=eq.' + encodeURIComponent(row.id), { method: 'PATCH', body: { taken_on: date, data }, headers: { Prefer: 'return=minimal' } });
      else await sbRest('assessments', { method: 'POST', body: { client_id: _ant.clientId, taken_on: date, data }, headers: { Prefer: 'return=minimal' } });
    } catch (e) { msg.textContent = authErr(e.code); return; }
    if (!row && _ant.ctx.link) { try { await ntPost(_ant.ctx.link.id, t('Registré tu evaluación de composición corporal.')); } catch (e) {} }
    _ant.sel = null; try { antHoyRefresh(true); } catch (e) {}
    if (_ant.ctx.onSaved) _ant.ctx.onSaved(); else closeSheet();
  });
  document.querySelectorAll('#ant-sex .chip').forEach(c => c.addEventListener('click', () => { document.querySelectorAll('#ant-sex .chip').forEach(x => x.classList.toggle('selected', x === c)); live(); }));
  document.querySelector('.ant-ed').addEventListener('input', e => { if (e.target && e.target.matches && e.target.matches('[data-fm]')) return; live(); });
  live();
}

// Vista del propio atleta (Más → Composición corporal)
function openMyAssessments() {
  const s = authGet() || {};
  if (!s.uid) return;
  openSheet('Composición corporal', '<div id="ant-self"></div>');
  antRender(s.uid, s.name || s.user || '', document.getElementById('ant-self'),
    { D: { nutri_profile: S.get('nutri_profile', null) || {}, weight_log: S.get('weight_log', {}) || {} }, onSaved: openMyAssessments });
}

// Tarjeta de Hoy: última evaluación del atleta y cambio contra la anterior.
let _antHoyAt = 0;
function antHoyCache() { try { const a = JSON.parse(localStorage.getItem('__ant') || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
async function antHoyRefresh(force) {
  const s = authGet();
  if (!s || !s.refresh || !s.uid || navigator.onLine === false) return;
  if (!force && Date.now() - _antHoyAt < 120000) return;
  _antHoyAt = Date.now();
  let rows;
  try { rows = await sbRest('assessments?select=taken_on,data&client_id=eq.' + encodeURIComponent(s.uid) + '&order=taken_on.desc,created_at.desc&limit=2'); } catch (e) { return; }
  const before = localStorage.getItem('__ant') || '[]', now = JSON.stringify(rows || []);
  if (before === now) return;
  try { localStorage.setItem('__ant', now); } catch (e) {}
  try { if (typeof renderHoyDash === 'function') renderHoyDash(); } catch (e) {}
}
function antHoyCard() {
  const rows = antHoyCache();
  if (!rows.length) return '';
  const c = antCalc(rows[0].data || {}), pc = rows[1] ? antCalc(rows[1].data || {}) : null, lb = bwUnit() === 'lb', kg = v => v == null ? null : (lb ? v * GYM_LB : v);
  if (c.pct == null && c.bmi == null) return '';
  const dl = (a, b, dec) => { if (a == null || b == null) return ''; const d = Math.round((a - b) * Math.pow(10, dec)) / Math.pow(10, dec); return d ? `<small translate="no">${d > 0 ? '+' : ''}${d.toLocaleString(_loc())}</small>` : '<small>=</small>'; };
  const cell = (v, l, sub) => `<div class="hd-w"><b translate="no">${v}</b><span>${l}</span>${sub || ''}</div>`;
  return `<div class="hd-card" data-hd-ant="1" style="cursor:pointer;"><div class="hd-k"><span>Composición corporal</span><span class="hd-badge" translate="no">${escapeHtml(antDate(rows[0].taken_on))}</span></div><div class="hd-week">
    ${c.pct != null ? cell(antN(c.pct, 1, '%'), '% de grasa', pc ? dl(c.pct, pc.pct, 1) : '') : ''}
    ${c.ffm != null ? cell(antN(kg(c.ffm), 1, bwUnit()), 'Masa libre de grasa', pc ? dl(kg(c.ffm), kg(pc.ffm), 1) : '') : ''}
    ${c.bmi != null ? cell(antN(c.bmi, 1), 'IMC', pc ? dl(c.bmi, pc.bmi, 1) : '') : ''}
    ${c.gi.waist ? cell(antN(c.gi.waist, 1, 'cm'), 'Cintura', pc && pc.gi ? dl(c.gi.waist, pc.gi.waist, 1) : '') : ''}</div>
    ${pc ? `<div class="hd-d" style="margin-top:8px;"><span>Cambio desde</span> <span translate="no">${escapeHtml(antDate(rows[1].taken_on))}</span></div>` : ''}</div>`;
}

// Tarjeta "Tu cuerpo" de Hoy: peso, tendencia, IMC, composición y medidas en un solo lugar.
function bodyHoyCard() {
  const wl = S.get('weight_log', {}) || {}, ks = Object.keys(wl).sort(), rows = antHoyCache(), np = S.get('nutri_profile', null) || {};
  const lb = bwUnit() === 'lb', kg = v => v == null ? null : (lb ? v * GYM_LB : v);
  const a = rows[0] ? (rows[0].data || {}) : null, c = a ? antCalc(a) : null, pc = rows[1] ? antCalc(rows[1].data || {}) : null;
  const ld = a || {}, pd = rows[1] ? (rows[1].data || {}) : null;
  const last = ks.length ? +wl[ks[ks.length - 1]] : (a && +a.weight) || null;
  const prevW = ks.length > 1 ? +wl[ks[ks.length - 2]] : null;
  const hcm = (a && +a.height) || +np.heightCm || null;
  if (last == null && !c) return `<div class="hd-card" data-hd-weight="1" style="cursor:pointer;"><div class="hd-k"><span>Tu cuerpo</span></div><div class="hd-d" style="margin-top:8px;">Toca para registrar tu peso.</div></div>`;
  const dl = (x, y, dec) => { if (x == null || y == null) return ''; const d = Math.round((x - y) * Math.pow(10, dec)) / Math.pow(10, dec); return d ? `<small translate="no">${d > 0 ? '+' : ''}${d.toLocaleString(_loc())}</small>` : ''; };
  const cell = (v, l, sub) => `<div class="hd-w"><b translate="no">${v}</b><span>${l}</span>${sub || ''}</div>`;
  const cells = [];
  const bmi = last && hcm ? last / Math.pow(hcm / 100, 2) : (c && c.bmi);
  if (bmi) { const cls = bmi < 18.5 ? 'Bajo peso' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Sobrepeso' : 'Obesidad'; cells.push(cell(antN(bmi, 1), 'IMC', `<small>${cls}</small>`)); }
  if (c) {
    if (c.pct != null) cells.push(cell(antN(c.pct, 1, '%'), '% de grasa', pc ? dl(c.pct, pc.pct, 1) : ''));
    if (c.ffm != null) cells.push(cell(antN(kg(c.ffm), 1, bwUnit()), 'Masa libre de grasa', pc ? dl(kg(c.ffm), kg(pc.ffm), 1) : ''));
    if (c.fm != null) cells.push(cell(antN(kg(c.fm), 1, bwUnit()), 'Masa grasa', pc ? dl(kg(c.fm), kg(pc.fm), 1) : ''));
    if (c.smm != null) cells.push(cell(antN(kg(c.smm), 1, bwUnit()), 'Masa muscular', pc ? dl(kg(c.smm), kg(pc.smm), 1) : ''));
    [['waist', 'Cintura'], ['hip', 'Cadera'], ['chestg', 'Tórax'], ['arm', 'Brazo'], ['thighg', 'Muslo'], ['calfg', 'Pantorrilla']].forEach(([k, n]) => { if (c.gi[k]) cells.push(cell(antN(c.gi[k], 1, 'cm'), n, pc && pc.gi ? dl(c.gi[k], pc.gi[k], 1) : '')); });
    if (c.whr != null) cells.push(cell(antN(c.whr, 2), 'Cintura-cadera', ''));
    if (+ld.biaMuscle && c.smm == null) cells.push(cell(antN(kg(+ld.biaMuscle), 1, bwUnit()), 'Masa muscular', pd && +pd.biaMuscle ? dl(kg(+ld.biaMuscle), kg(+pd.biaMuscle), 1) : ''));
    if (+ld.biaVisceral) cells.push(cell(antN(+ld.biaVisceral, 1), 'Grasa visceral', pd && +pd.biaVisceral ? dl(+ld.biaVisceral, +pd.biaVisceral, 1) : ''));
    if (+ld.biaWater) cells.push(cell(antN(+ld.biaWater, 1, '%'), 'Agua corporal', ''));
    if (+ld.biaMetAge) cells.push(cell(antN(+ld.biaMetAge, 0), 'Edad metabólica', ''));
    if (c.bmrMain) cells.push(cell(antN(c.tdee || c.bmrMain.kcal, 0), c.tdee ? 'Gasto diario (kcal)' : 'Gasto en reposo (kcal)', ''));
  }
  if (hcm) cells.push(cell(antN(hcm, 0, 'cm'), 'Talla', ''));
  const tr = wtTrend(wl), ago = ks.length ? Math.round((parseKey(keyDate()) - parseKey(ks[ks.length - 1])) / 864e5) : null;
  return `<div class="hd-card hd-body" data-hd-ant="1" style="cursor:pointer;"><div class="hd-k"><span>Tu cuerpo</span>${rows[0] ? `<span class="hd-badge"><span>Medidas del</span> <span translate="no">${escapeHtml(antDate(rows[0].taken_on))}</span></span>` : ''}</div>
    <div class="hd-row" style="margin-top:6px;"><div>${last != null ? `<div class="hd-big" translate="no">${bwDisp(last)} <small>${bwUnit()}</small>${prevW != null && last !== prevW ? ` <small class="hd-dw">${bwDiff(last - prevW)}</small>` : ''}</div>` : ''}
      <div class="hd-d">${ago == null ? '<span>Sin pesajes todavía</span>' : ago === 0 ? '<span>Peso registrado hoy</span>' : ago === 1 ? '<span>Peso registrado ayer</span>' : `<span>Peso registrado hace</span> <span translate="no">${ago}</span> <span>días</span>`}</div></div>
      <button class="hd-btn ghost" data-hd-weight="1">Registrar peso</button></div>
    ${tr.avg != null && tr.n >= 2 ? `<div class="hd-week" style="margin-top:10px;"><div class="hd-w"><b translate="no">${bwDisp(tr.avg)} ${bwUnit()}</b><span>Promedio 7 días</span></div><div class="hd-w"><b translate="no">${tr.rate != null ? wtRateText(tr) : '—'}</b><span>Ritmo por semana</span></div></div>` : ''}
    ${cells.length ? `<div class="hd-body-g">${cells.join('')}</div>` : ''}
    <div class="hd-d" style="margin-top:10px;">${c ? (pc ? `<span>Cambios desde</span> <span translate="no">${escapeHtml(antDate(rows[1].taken_on))}</span> · ` : '') + '<span>Toca para ver todo</span>' : '<span>Toca para registrar tus medidas y ver % de grasa, masa muscular y más.</span>'}</div></div>`;
}

// ============================================================
// PERSONALIZAR: cada persona enciende o apaga secciones de su perfil de atleta.
// ============================================================
const MOD_LIST = [
  ['gym', 'Gym', 'Rutinas, registro de entrenamiento y progreso'],
  ['comida', 'Comida', 'Registro de alimentos, metas y plan de alimentación'],
  ['habitos', 'Hábitos', 'Hábitos del día, rachas e hidratación'],
  ['pomo', 'Reloj', 'Pomodoro y temporizador'],
  ['cal', 'Calendario', 'Tu día, semana y mes'],
  ['cuerpo', 'Tu cuerpo', 'Peso, medidas y composición corporal'],
  ['checkin', 'Check-in semanal', 'El reporte semanal para tu especialista'],
  ['agenda', 'Agenda', 'Citas con tus especialistas'],
  ['fotos', 'Fotos de progreso', ''],
];
function modPrefs() { const p = S.get('app_prefs', null); return p && typeof p === 'object' ? p : {}; }
function modOn(k) { const p = modPrefs(); return k === 'gymSimple' ? !!p.gymSimple : p[k] !== false; }
function modApply() {
  const h = document.documentElement;
  MOD_LIST.forEach(([k]) => h.classList.toggle('off-' + k, !modOn(k)));
  h.classList.toggle('gym-simple', modOn('gymSimple'));
}
function modSet(k, on) {
  const p = Object.assign({}, modPrefs());
  if (k === 'gymSimple') { if (on) p.gymSimple = true; else delete p.gymSimple; } else if (on) delete p[k]; else p[k] = false;
  S.set('app_prefs', p); modApply();
  try { renderHoyDash(); } catch (e) {} try { if (typeof renderMas === 'function') renderMas(); } catch (e) {}
}
function modRenderSettings() {
  const el = document.getElementById('mods-box'); if (!el) return;
  const sw = (k, t1, t2, on) => `<label class="mod-row"><span><b>${t1}</b>${t2 ? `<small>${t2}</small>` : ''}</span><input type="checkbox" class="mod-sw" data-mod="${k}"${on ? ' checked' : ''}></label>`;
  el.innerHTML = `<div class="mod-hint">Apaga lo que no uses: desaparece del menú y de Hoy. Tus datos no se borran y puedes volver a encenderlo cuando quieras.</div>
    ${MOD_LIST.map(([k, n, d]) => sw(k, n, d, modOn(k))).join('')}
    <div class="setting-label" style="margin-top:16px;">Entrenamiento</div>
    ${sw('gymSimple', 'Solo palomear ejercicios', 'Sin anotar peso ni repeticiones: una palomita por ejercicio', modOn('gymSimple'))}`;
  el.querySelectorAll('[data-mod]').forEach(i => i.addEventListener('change', () => modSet(i.dataset.mod, i.checked)));
}
try { modApply(); } catch (e) {}

// ============================================================
// DEPORTES: perfil de atleta, registro de actividades (cardio y otros) y rutinas por deporte.
// El perfil dice qué deportes practicas; de eso depende qué se te ofrece registrar y qué marcas llenas.
// ============================================================
const ACT_F = {
  time: { n: 'Tiempo', kind: 'time', ph: '45:00' }, dist_km: { n: 'Distancia', u: 'km' }, dist_m: { n: 'Distancia', u: 'm' },
  hr: { n: 'FC media', u: 'lpm' }, hrmax: { n: 'FC máxima', u: 'lpm' }, elev: { n: 'Desnivel', u: 'm' }, power: { n: 'Potencia media', u: 'W' },
  cadence: { n: 'Cadencia', u: 'ppm' }, steps: { n: 'Pasos', u: '' }, rounds: { n: 'Rounds', u: '' }, roundMin: { n: 'Minutos por round', u: 'min' },
  wod: { n: 'Nombre o descripción', kind: 'text', ph: 'Ej. Fran, circuito de 5 estaciones' }, result: { n: 'Resultado', kind: 'text', ph: 'Ej. 6 rondas + 12 reps' },
  grade: { n: 'Grado máximo', kind: 'text', ph: 'Ej. V4, 6b+' }, sends: { n: 'Encadenes', u: '' }, attempts: { n: 'Intentos', u: '' },
  painPre: { n: 'Dolor antes', u: '/10' }, painPost: { n: 'Dolor después', u: '/10' }, kcal: { n: 'Calorías', u: 'kcal' },
  runTime: { n: 'Tiempo total de carrera', kind: 'time', ph: '40:00' },
};
const HYROX_ST = ['SkiErg', 'Sled push', 'Sled pull', 'Burpee broad jumps', 'Remo', 'Farmers carry', 'Sandbag lunges', 'Wall balls'];
const SPORTS = [
  { id: 'fuerza', name: 'Fuerza / Gym', gym: true, prof: [['sq', 'Sentadilla (1RM)', 'kg'], ['bp', 'Press de banca (1RM)', 'kg'], ['dl', 'Peso muerto (1RM)', 'kg'], ['years', 'Años entrenando', '']] },
  { id: 'running', name: 'Running', f: ['dist_km', 'time', 'hr', 'elev', 'cadence'], types: ['Rodaje suave', 'Tempo', 'Series', 'Tirada larga', 'Competencia'], pace: 'km',
    prof: [['k5', 'Marca en 5 km', 'mm:ss'], ['k10', 'Marca en 10 km', 'mm:ss'], ['k21', 'Medio maratón', 'h:mm:ss'], ['k42', 'Maratón', 'h:mm:ss'], ['wk', 'Kilómetros por semana', 'km']] },
  { id: 'ciclismo', name: 'Ciclismo', f: ['dist_km', 'time', 'hr', 'elev', 'power'], types: ['Ruta', 'Montaña', 'Rodillo / spinning', 'Series', 'Competencia'], speed: true,
    prof: [['ftp', 'FTP', 'W'], ['wk', 'Kilómetros por semana', 'km']] },
  { id: 'natacion', name: 'Natación', f: ['dist_m', 'time', 'hr'], types: ['Técnica', 'Aeróbico', 'Series', 'Aguas abiertas', 'Competencia'], opts: [['pool', 'Alberca', ['25 m', '50 m', 'Aguas abiertas']], ['stroke', 'Estilo principal', ['Crol', 'Dorso', 'Pecho', 'Mariposa', 'Combinado']]], pace: '100m',
    prof: [['m100', 'Marca en 100 m', 'mm:ss'], ['m400', 'Marca en 400 m', 'mm:ss'], ['m1500', 'Marca en 1500 m', 'mm:ss'], ['wk', 'Metros por semana', 'm']] },
  { id: 'box', name: 'Box / combate', f: ['rounds', 'roundMin', 'time', 'hr'], types: ['Saco', 'Sombra', 'Manoplas', 'Sparring', 'Técnica', 'Acondicionamiento'], routines: true,
    prof: [['years', 'Años practicando', ''], ['cat', 'Categoría de peso', ''], ['fights', 'Peleas o sparrings al mes', '']] },
  { id: 'funcional', name: 'Funcional / CrossFit', f: ['wod', 'time', 'result', 'hr'], types: ['AMRAP', 'EMOM', 'Por tiempo', 'Chipper', 'Circuito', 'Técnica'], routines: true,
    prof: [['fran', 'Fran', 'mm:ss'], ['murph', 'Murph', 'mm:ss'], ['years', 'Años practicando', '']] },
  { id: 'hyrox', name: 'Hyrox', f: ['time', 'runTime', 'hr'], types: ['Simulación completa', 'Media simulación', 'Estaciones', 'Carrera comprometida', 'Competencia'], opts: [['cat', 'Categoría', ['Open', 'Pro', 'Dobles', 'Relevos']]], hyrox: true, routines: true,
    prof: [['best', 'Mejor tiempo', 'h:mm:ss'], ['cat', 'Categoría', ''], ['next', 'Próxima competencia', 'fecha']] },
  { id: 'calistenia', name: 'Calistenia', f: ['time', 'hr'], types: ['Fuerza', 'Resistencia', 'Skills', 'Movilidad'], routines: true,
    prof: [['pull', 'Dominadas seguidas', 'reps'], ['push', 'Flexiones seguidas', 'reps'], ['dips', 'Fondos seguidos', 'reps'], ['skills', 'Skills que dominas', '']] },
  { id: 'escalada', name: 'Escalada', f: ['time', 'grade', 'sends', 'attempts'], types: ['Boulder', 'Deportiva', 'Cuerda (top rope)', 'Tabla de entrenamiento', 'Roca'], routines: true,
    prof: [['boulder', 'Grado máximo en boulder', ''], ['route', 'Grado máximo en vía', ''], ['years', 'Años escalando', '']] },
  { id: 'fisio', name: 'Fisio / rehabilitación', f: ['time', 'painPre', 'painPost'], types: ['Ejercicios en casa', 'Sesión con fisioterapeuta', 'Movilidad', 'Readaptación'], routines: true,
    prof: [['zone', 'Zona o lesión que trabajas', ''], ['since', 'Desde cuándo', ''], ['limits', 'Movimientos a evitar', '']] },
  { id: 'caminata', name: 'Caminata / senderismo', f: ['dist_km', 'time', 'steps', 'elev', 'hr'], types: ['Paseo', 'Caminata rápida', 'Senderismo'], pace: 'km', prof: [['steps', 'Pasos diarios promedio', '']] },
  { id: 'yoga', name: 'Yoga / movilidad', f: ['time', 'hr'], types: ['Yoga', 'Pilates', 'Movilidad', 'Estiramiento'], prof: [['years', 'Años practicando', '']] },
  { id: 'equipo', name: 'Deporte de equipo', f: ['time', 'dist_km', 'hr'], types: ['Entrenamiento', 'Partido', 'Técnica'], prof: [['which', '¿Cuál deporte?', ''], ['pos', 'Posición', '']] },
  { id: 'otro', name: 'Otro', f: ['wod', 'time', 'dist_km', 'hr'], types: [], prof: [['which', '¿Cuál?', '']] },
];
const SPORT_BY = {}; SPORTS.forEach(x => { SPORT_BY[x.id] = x; });
const SPORT_LEVELS = ['Principiante', 'Intermedio', 'Avanzado', 'Competidor'];
function athProfile() { const p = S.get('athlete_profile', null); return p && typeof p === 'object' ? p : { sports: [], marks: {} }; }
function athSports() { const p = athProfile(); return (p.sports || []).filter(id => SPORT_BY[id]); }
// Deportes que se ofrecen al registrar una actividad: los del perfil; sin perfil, todos.
function actSports() { const mine = athSports().filter(id => !SPORT_BY[id].gym); return (mine.length ? mine : SPORTS.filter(x => !x.gym).map(x => x.id)).map(id => SPORT_BY[id]); }

function actParseTime(v) { // "h:mm:ss", "mm:ss" o minutos → segundos
  v = String(v == null ? '' : v).trim().replace(',', '.'); if (!v) return 0;
  if (v.includes(':')) { const p = v.split(':').map(x => parseFloat(x) || 0); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); }
  const n = parseFloat(v); return isFinite(n) ? Math.round(n * 60) : 0;
}
function actFmtTime(sec) { sec = Math.round(+sec || 0); if (!sec) return ''; const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60; return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(s).padStart(2, '0'); }
function actLog() { const l = S.get('act_log', null); return l && typeof l === 'object' ? l : {}; }
function actSave(l) { S.set('act_log', l); }
function actDerived(a) {
  const sp = SPORT_BY[a.sport] || {}, o = [], t = +a.time || 0;
  if (sp.pace === 'km' && t && +a.dist_km) o.push(['Ritmo', actFmtTime(t / a.dist_km) + ' /km']);
  if (sp.pace === '100m' && t && +a.dist_m) o.push(['Ritmo', actFmtTime(t / (a.dist_m / 100)) + ' /100 m']);
  if (sp.speed && t && +a.dist_km) o.push(['Velocidad', (Math.round(a.dist_km / (t / 3600) * 10) / 10).toLocaleString(_loc()) + ' km/h']);
  return o;
}
function actLine(a) {
  const p = [];
  if (+a.dist_km) p.push((+a.dist_km).toLocaleString(_loc()) + ' km'); if (+a.dist_m) p.push((+a.dist_m).toLocaleString(_loc()) + ' m');
  if (+a.rounds) p.push(a.rounds + ' rounds' + (+a.roundMin ? ' × ' + a.roundMin + ' min' : ''));
  if (+a.time) p.push(actFmtTime(a.time)); actDerived(a).forEach(d => p.push(d[1]));
  if (a.grade) p.push(a.grade); if (a.result) p.push(a.result); if (+a.hr) p.push(a.hr + ' lpm'); if (+a.rpe) p.push('RPE ' + a.rpe);
  return p.join(' · ');
}
// Totales de un rango de días (para Gym, Hoy y el check-in).
function actWeek(days) {
  const l = actLog(), o = { n: 0, sec: 0, km: 0, by: {} };
  for (let i = 0; i < (days || 7); i++) (l[keyDate(new Date(Date.now() - i * 864e5))] || []).forEach(a => {
    o.n++; o.sec += +a.time || 0; const km = (+a.dist_km || 0) + (+a.dist_m || 0) / 1000; o.km += km;
    const b = o.by[a.sport] || (o.by[a.sport] = { n: 0, sec: 0, km: 0 }); b.n++; b.sec += +a.time || 0; b.km += km;
  });
  return o;
}

function openActivityForm(act, date) {
  const list = actSports(), d = act ? JSON.parse(JSON.stringify(act)) : { sport: list[0].id };
  let day = date || keyDate();
  const paint = () => {
    const sp = SPORT_BY[d.sport] || list[0];
    const fld = k => { const F = ACT_F[k]; if (!F) return ''; const v = d[k] == null ? '' : (F.kind === 'time' ? actFmtTime(d[k]) : d[k]);
      return F.kind === 'text' ? `<label class="ant-f col"><span>${F.n}</span><input class="act-tx" data-act="${k}" value="${escapeHtml(String(v))}" placeholder="${F.ph || ''}" maxlength="120"></label>`
        : `<label class="ant-f"><span>${F.n}</span><span class="ant-in"><input inputmode="${F.kind === 'time' ? 'text' : 'decimal'}" data-act="${k}" value="${escapeHtml(String(v))}" placeholder="${F.ph || ''}">${F.u ? `<i>${F.u}</i>` : F.kind === 'time' ? '<i>h:mm:ss</i>' : ''}</span></label>`; };
    document.getElementById('act-body').innerHTML = `
      <div class="ant-f col"><span>Deporte</span><div class="chips act-chips" id="act-sport">${list.map(x => `<div class="chip${x.id === sp.id ? ' selected' : ''}" data-v="${x.id}">${x.name}</div>`).join('')}</div></div>
      ${(sp.types || []).length ? `<div class="ant-f col"><span>Tipo de sesión</span><div class="chips act-chips" id="act-type">${sp.types.map(x => `<div class="chip${d.type === x ? ' selected' : ''}" data-v="${escapeHtml(x)}">${x}</div>`).join('')}</div></div>` : ''}
      ${(sp.opts || []).map(([k, n, vs]) => `<div class="ant-f col"><span>${n}</span><div class="chips act-chips" data-act-opt="${k}">${vs.map(x => `<div class="chip${d[k] === x ? ' selected' : ''}" data-v="${escapeHtml(x)}">${x}</div>`).join('')}</div></div>`).join('')}
      ${(sp.f || []).map(fld).join('')}
      ${sp.hyrox ? `<details${(d.st || []).some(Boolean) ? ' open' : ''}><summary>Tiempo por estación <small>opcional</small></summary>${HYROX_ST.map((n, i) => `<label class="ant-f"><span>${n}</span><span class="ant-in"><input data-act-st="${i}" value="${escapeHtml(actFmtTime((d.st || [])[i]))}" placeholder="4:30"><i>mm:ss</i></span></label>`).join('')}</details>` : ''}
      <div class="ant-f col"><span>Esfuerzo percibido (RPE)</span><div class="chips act-chips" id="act-rpe">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => `<div class="chip${+d.rpe === x ? ' selected' : ''}" data-v="${x}">${x}</div>`).join('')}</div></div>
      ${fld('kcal')}
      <label class="ant-f col"><span>Notas</span><textarea data-act-notes rows="2" maxlength="500" placeholder="Cómo te sentiste, clima, ruta...">${escapeHtml(d.notes || '')}</textarea></label>
      <div class="act-der" id="act-der"></div>`;
    const der = () => { keep(); const x = actDerived(d); document.getElementById('act-der').innerHTML = x.length ? x.map(([n, v]) => `<div><span>${n}</span><b translate="no">${v}</b></div>`).join('') : ''; };
    const one = (id, key, num) => document.querySelectorAll(`#${id} .chip`).forEach(c => c.addEventListener('click', () => { keep(); d[key] = (d[key] == (num ? +c.dataset.v : c.dataset.v)) ? null : (num ? +c.dataset.v : c.dataset.v); paint(); }));
    document.querySelectorAll('#act-sport .chip').forEach(c => c.addEventListener('click', () => { keep(); if (d.sport !== c.dataset.v) { d.sport = c.dataset.v; d.type = null; } paint(); }));
    one('act-type', 'type'); one('act-rpe', 'rpe', true);
    document.querySelectorAll('[data-act-opt]').forEach(g => g.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => { keep(); d[g.dataset.actOpt] = d[g.dataset.actOpt] === c.dataset.v ? null : c.dataset.v; paint(); })));
    document.getElementById('act-body').querySelectorAll('input').forEach(i => i.addEventListener('input', der));
    der();
  };
  const keep = () => {
    document.querySelectorAll('#act-body [data-act]').forEach(i => { const k = i.dataset.act, F = ACT_F[k], v = i.value.trim();
      if (!v) { delete d[k]; return; }
      if (F.kind === 'time') d[k] = actParseTime(v); else if (F.kind === 'text') d[k] = v; else { const n = parseFloat(v.replace(',', '.')); if (isFinite(n) && n >= 0) d[k] = n; } });
    const st = [...document.querySelectorAll('#act-body [data-act-st]')]; if (st.length) { d.st = st.map(i => actParseTime(i.value)); if (!d.st.some(Boolean)) delete d.st; }
    const nt = document.querySelector('#act-body [data-act-notes]'); if (nt) { const v = nt.value.trim(); if (v) d.notes = v; else delete d.notes; }
    const dt = document.getElementById('act-date'); if (dt && dt.value) day = dt.value;
  };
  openSheet(act ? 'Editar actividad' : 'Registrar actividad', `<div class="ant-ed act-ed"><label class="ant-f"><span>Fecha</span><span class="ant-in"><input type="date" id="act-date" value="${escapeHtml(day)}" max="${keyDate()}"></span></label><div id="act-body"></div>
    ${act ? '<button class="btn-secondary" id="act-del" style="width:100%;margin-top:10px;color:#DC2626;">Eliminar actividad</button>' : ''}<p class="auth-msg" id="act-msg"></p></div>`, () => {
    keep();
    const sp = SPORT_BY[d.sport], msg = document.getElementById('act-msg');
    if (!+d.time && +d.rounds && +d.roundMin) d.time = Math.round(d.rounds * d.roundMin * 60);
    if (!+d.time && !+d.dist_km && !+d.dist_m && !+d.rounds && !d.wod) { msg.textContent = t('Anota al menos el tiempo o la distancia.'); return; }
    if (d.time > 86400 || d.dist_km > 1000 || d.dist_m > 100000 || d.hr > 250 || d.painPre > 10 || d.painPost > 10) { msg.textContent = t('Revisa los números: alguno está fuera de rango.'); return; }
    Object.keys(d).forEach(k => { if (d[k] == null || d[k] === '') delete d[k]; });
    const l = actLog();
    if (act && date && l[date]) { l[date] = l[date].filter(x => x.id !== act.id); if (!l[date].length) delete l[date]; }
    d.id = d.id || (typeof uid === 'function' ? uid() : String(Date.now())); d.ts = Date.now();
    (l[day] = l[day] || []).push(d); actSave(l);
    closeSheet(); try { renderGym(); } catch (e) {} try { renderHoyDash(); } catch (e) {}
  });
  const del = document.getElementById('act-del');
  if (del) del.addEventListener('click', () => { if (!confirm(t('¿Eliminar esta actividad?'))) return; const l = actLog(); if (l[date]) { l[date] = l[date].filter(x => x.id !== act.id); if (!l[date].length) delete l[date]; } actSave(l); closeSheet(); try { renderGym(); } catch (e) {} });
  paint();
}

// Sección de actividades dentro de la pestaña Gym.
function actGymHtml() {
  const l = actLog(), w = actWeek(7), days = Object.keys(l).sort().reverse().slice(0, 10), rows = [];
  days.forEach(k => (l[k] || []).slice().reverse().forEach(a => rows.push([k, a])));
  const sum = Object.keys(w.by).map(id => { const b = w.by[id], sp = SPORT_BY[id] || { name: id }; return `<div class="act-sum"><span>${sp.name}</span><b translate="no">${b.km ? (Math.round(b.km * 10) / 10).toLocaleString(_loc()) + ' km' : actFmtTime(b.sec) || b.n}</b><small translate="no">${b.n} ${b.n === 1 ? 'sesión' : 'sesiones'}${b.km && b.sec ? ' · ' + actFmtTime(b.sec) : ''}</small></div>`; }).join('');
  return `<h2>Cardio y otros deportes <span class="gym-h2-btns"><button class="h2-btn" id="act-new">+ Registrar</button></span></h2>
    ${sum ? `<div class="act-sums">${sum}</div><div class="act-cap">Últimos 7 días</div>` : ''}
    ${rows.length ? rows.slice(0, 8).map(([k, a]) => `<div class="act-row" data-act-edit="${k}:${a.id}"><div><b>${(SPORT_BY[a.sport] || { name: a.sport }).name}${a.type ? ` <small>${escapeHtml(a.type)}</small>` : ''}</b><span translate="no">${escapeHtml(actLine(a))}</span></div><em translate="no">${escapeHtml(cdFmtDay(k))}</em></div>`).join('')
      : `<div class="sp-empty" style="margin-bottom:8px;">Registra tus carreras, natación, bici, box o cualquier otra sesión: tiempo, distancia, ritmo y esfuerzo.${athSports().length ? '' : ' Elige tus deportes en Más → Perfil de atleta para ver solo los tuyos.'}</div>`}`;
}
function actMountGym() {
  const el = document.getElementById('gym-acts'); if (!el) return;
  el.innerHTML = actGymHtml();
  document.getElementById('act-new').addEventListener('click', () => openActivityForm(null));
  el.querySelectorAll('[data-act-edit]').forEach(r => r.addEventListener('click', () => { const [k, id] = r.dataset.actEdit.split(':'), a = (actLog()[k] || []).find(x => x.id === id); if (a) openActivityForm(a, k); }));
}

// Perfil de atleta: deportes, nivel y marcas (los campos dependen de los deportes elegidos).
function openAthleteProfile() {
  const p = JSON.parse(JSON.stringify(athProfile())); p.sports = p.sports || []; p.marks = p.marks || {};
  const keep = () => {
    document.querySelectorAll('#ath-body [data-ath-m]').forEach(i => { const [sp, k] = i.dataset.athM.split(':'), v = i.value.trim(); p.marks[sp] = p.marks[sp] || {}; if (v) p.marks[sp][k] = v; else delete p.marks[sp][k]; });
    const g = document.getElementById('ath-goal'); if (g) p.goal = g.value.trim(); const dd = document.getElementById('ath-days'); if (dd) p.days = parseInt(dd.value, 10) || null;
  };
  const paint = () => {
    document.getElementById('ath-body').innerHTML = `
      <div class="ant-hint">Marca todos los deportes que practicas. Según lo que elijas cambian las marcas que llenas aquí y lo que la app te ofrece registrar.</div>
      <div class="chips act-chips" id="ath-sports">${SPORTS.map(x => `<div class="chip${p.sports.includes(x.id) ? ' selected' : ''}" data-v="${x.id}">${x.name}</div>`).join('')}</div>
      <div class="ant-f col" style="margin-top:12px;"><span>Nivel</span><div class="chips act-chips" id="ath-level">${SPORT_LEVELS.map(x => `<div class="chip${p.level === x ? ' selected' : ''}" data-v="${x}">${x}</div>`).join('')}</div></div>
      <label class="ant-f"><span>Días de entrenamiento por semana</span><span class="ant-in"><input inputmode="numeric" id="ath-days" value="${p.days || ''}" placeholder="4"></span></label>
      <label class="ant-f col"><span>Objetivo principal</span><input class="act-tx" id="ath-goal" maxlength="140" value="${escapeHtml(p.goal || '')}" placeholder="Ej. Bajar de 50 min en 10 km, competir en Hyrox en marzo"></label>
      ${p.sports.map(id => SPORT_BY[id]).filter(Boolean).map(sp => `<details open><summary>${sp.name}</summary>${(sp.prof || []).map(([k, n, u]) => `<label class="ant-f"><span>${n}</span><span class="ant-in"><input data-ath-m="${sp.id}:${k}" value="${escapeHtml(((p.marks[sp.id] || {})[k]) || '')}" placeholder="${u && u.includes(':') ? u : ''}">${u && !u.includes(':') && u !== 'fecha' ? `<i>${u}</i>` : ''}</span></label>`).join('')}</details>`).join('')}`;
    document.querySelectorAll('#ath-sports .chip').forEach(c => c.addEventListener('click', () => { keep(); const i = p.sports.indexOf(c.dataset.v); if (i >= 0) p.sports.splice(i, 1); else p.sports.push(c.dataset.v); paint(); }));
    document.querySelectorAll('#ath-level .chip').forEach(c => c.addEventListener('click', () => { keep(); p.level = p.level === c.dataset.v ? null : c.dataset.v; paint(); }));
  };
  openSheet('Perfil de atleta', '<div class="ant-ed act-ed"><div id="ath-body"></div></div>', () => { keep(); S.set('athlete_profile', p); closeSheet(); try { renderMas(); } catch (e) {} try { renderGym(); } catch (e) {} });
  paint();
}
function athSummary() { const s = athSports(); return s.length ? s.map(id => SPORT_BY[id].name).join(' · ') : ''; }

// Lo que ve el especialista de las actividades y el perfil de su atleta (ficha → Progreso).
function actClientHtml(D) {
  const ap = D.athlete_profile || {}, log = D.act_log || {}, sports = (ap.sports || []).filter(id => SPORT_BY[id]);
  let prof = '';
  if (sports.length || ap.goal || ap.level) {
    const marks = sports.map(id => { const sp = SPORT_BY[id], m = (ap.marks || {})[id] || {}, rows = (sp.prof || []).filter(([k]) => m[k]); return rows.length ? `<tr class="ref"><td colspan="2"><b>${sp.name}</b></td></tr>` + rows.map(([k, n, u]) => `<tr><td><span>${n}</span></td><td translate="no">${escapeHtml(m[k])}${u && !u.includes(':') && u !== 'fecha' ? ' ' + u : ''}</td></tr>`).join('') : ''; }).join('');
    prof = `<div class="sp-card"><div class="sp-card-n">Perfil de atleta</div><div class="gym-gs" style="margin:8px 0;">${sports.map(id => `<span class="eq-chip" style="--ec:var(--text-3)">${SPORT_BY[id].name}</span>`).join('')}</div>
      <div class="sp-card-d">${ap.level ? `<span>${ap.level}</span>` : ''}${ap.days ? ` · <span translate="no">${ap.days}</span> <span>días por semana</span>` : ''}</div>${ap.goal ? `<div class="sp-card-d" style="color:var(--text);margin-top:4px;" translate="no">${escapeHtml(ap.goal)}</div>` : ''}
      ${marks ? `<table class="ant-t"><tbody>${marks}</tbody></table>` : ''}</div>`;
  }
  const rows = []; Object.keys(log).sort().reverse().slice(0, 30).forEach(k => (log[k] || []).forEach(a => rows.push([k, a])));
  let acts = '';
  if (rows.length) {
    const wk = { n: 0, sec: 0, km: 0 }; rows.forEach(([k, a]) => { if ((Date.now() - parseKey(k)) / 864e5 < 7) { wk.n++; wk.sec += +a.time || 0; wk.km += (+a.dist_km || 0) + (+a.dist_m || 0) / 1000; } });
    acts = `<div class="sp-card"><div class="sp-card-top"><div class="sp-card-n">Cardio y otros deportes</div><span class="cd-num" translate="no">${wk.n} · ${actFmtTime(wk.sec) || '0:00'}${wk.km ? ' · ' + (Math.round(wk.km * 10) / 10) + ' km' : ''}</span></div><div class="sp-card-d">Últimos 7 días</div>
      <table class="ant-t"><tbody>${rows.slice(0, 12).map(([k, a]) => `<tr><td><span>${(SPORT_BY[a.sport] || { name: a.sport }).name}</span>${a.type ? ` <span style="color:var(--text-3)">· ${escapeHtml(a.type)}</span>` : ''}<small translate="no">${escapeHtml(actLine(a))}${a.notes ? ' — ' + escapeHtml(a.notes) : ''}</small></td><td translate="no">${escapeHtml(cdFmtDay(k))}</td></tr>`).join('')}</tbody></table></div>`;
  }
  return prof + acts;
}

// Rutinas prehechas por deporte (se copian a "Mis rutinas" y se editan como cualquier otra).
const SPORT_ROUTINES = [
  { sport: 'box', name: 'Box · Técnica y saco', ex: [['Salto de cuerda', 3, '3 min'], ['Sombra', 3, '3 min'], ['Saco: jab y cross', 4, '3 min'], ['Saco: combinaciones', 4, '3 min'], ['Manoplas o saco libre', 2, '3 min'], ['Plancha', 3, '45 s']] },
  { sport: 'funcional', name: 'Funcional · Circuito de cuerpo completo', ex: [['Sentadilla goblet', 4, '12'], ['Kettlebell swing', 4, '15'], ['Burpees', 4, '10'], ['Remo con mancuerna', 4, '12'], ['Wall ball', 4, '15'], ['Plancha', 4, '40 s']] },
  { sport: 'hyrox', name: 'Hyrox · Media simulación', ex: [['Carrera', 8, '500 m'], ['SkiErg', 1, '500 m'], ['Sled push', 1, '25 m'], ['Sled pull', 1, '25 m'], ['Burpee broad jumps', 1, '40 m'], ['Remo', 1, '500 m'], ['Farmers carry', 1, '100 m'], ['Sandbag lunges', 1, '50 m'], ['Wall balls', 1, '50']] },
  { sport: 'calistenia', name: 'Calistenia · Básicos', ex: [['Dominadas', 4, '6'], ['Fondos en paralelas', 4, '8'], ['Flexiones', 4, '12'], ['Remo invertido', 4, '10'], ['Sentadilla a una pierna asistida', 3, '6'], ['Elevación de piernas colgado', 3, '10'], ['Plancha hollow', 3, '30 s']] },
  { sport: 'escalada', name: 'Escalada · Fuerza de dedos y tracción', ex: [['Calentamiento en vías fáciles', 1, '15 min'], ['Suspensiones en regleta', 6, '10 s'], ['Dominadas', 4, '5'], ['Bloqueos a 90°', 4, '8 s'], ['Boulder de proyecto', 6, '1 intento'], ['Flexiones (antagonistas)', 3, '12'], ['Elevación de piernas colgado', 3, '10']] },
  { sport: 'fisio', name: 'Fisio · Movilidad y activación general', ex: [['Gato-camello', 2, '10'], ['Puente de glúteo', 3, '12'], ['Bird-dog', 3, '8'], ['Clamshell con banda', 3, '12'], ['Rotación torácica', 2, '8'], ['Estiramiento de flexor de cadera', 2, '30 s']], note: 'Ejemplo general. Tu fisioterapeuta indica los ejercicios y la dosis para tu caso.' },
  { sport: 'running', name: 'Running · Técnica y fuerza', ex: [['Skipping', 3, '20 m'], ['Zancadas', 3, '10'], ['Elevación de talones', 3, '15'], ['Peso muerto a una pierna', 3, '8'], ['Plancha lateral', 3, '30 s']] },
  { sport: 'running', name: 'Running · Series 8×400 m', ex: [['Trote de calentamiento', 1, '2 km'], ['Series a ritmo de 5 km', 8, '400 m'], ['Trote de enfriamiento', 1, '2 km']], note: 'Entre series, 90 s de trote o caminata.' },
  { sport: 'running', name: 'Running · Tempo de 20 min', ex: [['Trote suave', 1, '15 min'], ['Tempo a ritmo cómodo-duro', 1, '20 min'], ['Trote suave', 1, '10 min']] },
  { sport: 'ciclismo', name: 'Ciclismo · Intervalos 5×4 min', ex: [['Rodar suave', 1, '15 min'], ['Intervalo fuerte', 5, '4 min'], ['Vuelta a la calma', 1, '10 min']], note: 'Entre intervalos, 3 min de pedaleo suave.' },
  { sport: 'natacion', name: 'Natación · Aeróbico 1500 m', ex: [['Calentamiento', 1, '300 m'], ['Serie aeróbica', 10, '100 m'], ['Vuelta a la calma', 1, '200 m']], note: 'Descanso de 15 a 20 s entre cada 100 m.' },
  { sport: 'natacion', name: 'Natación · Sesión técnica de 2000 m', ex: [['Calentamiento suave', 1, '400 m'], ['Patada con tabla', 4, '50 m'], ['Técnica: punto muerto', 4, '50 m'], ['Serie principal', 8, '100 m'], ['Vuelta a la calma', 1, '200 m']] },
];
function openSportRoutines() {
  const mine = athSports(), list = SPORT_ROUTINES.slice().sort((a, b) => (mine.includes(b.sport) ? 1 : 0) - (mine.includes(a.sport) ? 1 : 0));
  openSheet('Rutinas por deporte', `<div class="lk-d" style="margin:0 0 10px;">Rutinas base para empezar. Al agregarla queda en Mis rutinas y la puedes editar, programar en tu semana y registrar como cualquier otra.</div>
    ${list.map((r, i) => `<div class="lk-row"><div class="lk-top"><div class="lk-n">${r.name}</div></div><div class="lk-d">${r.ex.map(e => `<span>${e[0]}</span> <span translate="no">${e[1]}×${e[2]}</span>`).join(' · ')}</div>${r.note ? `<div class="lk-d" style="margin-top:6px;">${r.note}</div>` : ''}
      <button class="btn-secondary" data-sr-add="${SPORT_ROUTINES.indexOf(r)}" style="width:100%;margin-top:10px;">Agregar a mis rutinas</button></div>`).join('')}`);
  document.querySelectorAll('[data-sr-add]').forEach(b => b.addEventListener('click', () => {
    const r = SPORT_ROUTINES[+b.dataset.srAdd], all = gymRoutines();
    all.push({ id: uid(), name: r.name, meta: { sport: r.sport }, tempo: '', source: 'manual', createdAt: Date.now(), notes: r.note || '',
      exercises: r.ex.map(e => ({ id: uid(), name: e[0], sets: gymParseSetsText(e[1] + 'x' + e[2]).length ? gymParseSetsText(e[1] + 'x' + e[2]) : [{ count: e[1], reps: e[2], note: '' }] })) });
    saveGymRoutines(all); closeSheet(); try { renderGym(); } catch (e) {}
  }));
}

// ============================================================
// PLANTILLAS DE RUTINA Y ASISTENTE
// Catálogo de ejercicios por patrón de movimiento (con su imagen de free-exercise-db), divisiones clásicas
// (cuerpo completo, torso/pierna «AB», push/pull/legs, Arnold, Weider, PHUL, 5×5, glúteo) y un asistente
// por reglas que arma la semana según objetivo, días, nivel, equipo, tiempo, enfoque y molestias.
// Equipo: G gimnasio · D mancuernas y banco · B peso corporal · K bandas · P barra de dominadas o paralelas. Cuidar: hombro, rodilla, lumbar.
// ============================================================
const RX_EX = {
  squat: [['Sentadilla con barra', 'Barbell_Squat', 'G', 'rodilla lumbar'], ['Prensa de pierna', 'Leg_Press', 'G', ''], ['Sentadilla hack', 'Hack_Squat', 'G', 'rodilla'], ['Sentadilla goblet', 'Goblet_Squat', 'D', ''], ['Sentadilla con mancuernas', 'Dumbbell_Squat', 'D', ''], ['Sentadilla libre', 'Bodyweight_Squat', 'B', '']],
  hinge: [['Peso muerto rumano', 'Romanian_Deadlift', 'G', 'lumbar'], ['Peso muerto convencional', 'Barbell_Deadlift', 'G', 'lumbar'], ['Peso muerto rumano con mancuernas', 'Stiff-Legged_Dumbbell_Deadlift', 'D', 'lumbar'], ['Hiperextensiones', 'Hyperextensions_Back_Extensions', 'G', ''], ['Buenos días con banda', 'Band_Good_Morning', 'K', 'lumbar'], ['Puente de glúteo a una pierna', 'Single_Leg_Glute_Bridge', 'B', '']],
  lunge: [['Sentadilla búlgara', 'Split_Squat_with_Dumbbells', 'D', 'rodilla'], ['Zancadas con mancuernas', 'Dumbbell_Lunges', 'D', 'rodilla'], ['Subidas al cajón', 'Dumbbell_Step_Ups', 'D', ''], ['Zancada caminando', 'Bodyweight_Walking_Lunge', 'B', 'rodilla'], ['Split squat', 'Split_Squats', 'B', 'rodilla']],
  glute: [['Hip thrust con barra', 'Barbell_Hip_Thrust', 'G', ''], ['Puente de glúteo con barra', 'Barbell_Glute_Bridge', 'G', ''], ['Pull-through en polea', 'Pull_Through', 'G', 'lumbar'], ['Puente de glúteo', 'Butt_Lift_Bridge', 'B', '']],
  abduct: [['Abducción en máquina', 'Thigh_Abductor', 'G', ''], ['Patada de glúteo en polea', 'One-Legged_Cable_Kickback', 'G', ''], ['Caminata lateral con banda', 'Monster_Walk', 'K', ''], ['Patada de glúteo', 'Glute_Kickback', 'B', '']],
  quad: [['Extensión de cuádriceps', 'Leg_Extensions', 'G', 'rodilla'], ['Sentadilla en Smith', 'Smith_Machine_Squat', 'G', 'rodilla']],
  ham: [['Curl femoral acostado', 'Lying_Leg_Curls', 'G', ''], ['Curl femoral sentado', 'Seated_Leg_Curl', 'G', ''], ['Curl nórdico', 'Natural_Glute_Ham_Raise', 'B', 'rodilla']],
  calf: [['Pantorrilla de pie', 'Standing_Calf_Raises', 'G', ''], ['Pantorrilla sentado', 'Seated_Calf_Raise', 'G', ''], ['Pantorrilla con mancuerna', 'Calf_Raise_On_A_Dumbbell', 'D', ''], ['Pantorrilla con banda', 'Calf_Raises_-_With_Bands', 'K', '']],
  hpush: [['Press banca con barra', 'Barbell_Bench_Press_-_Medium_Grip', 'G', 'hombro'], ['Press banca con mancuernas', 'Dumbbell_Bench_Press', 'D', ''], ['Press de pecho en máquina', 'Machine_Bench_Press', 'G', ''], ['Fondos para pecho', 'Dips_-_Chest_Version', 'P', 'hombro'], ['Lagartijas', 'Pushups', 'B', ''], ['Press de piso con mancuernas', 'Dumbbell_Floor_Press', 'D', ''], ['Lagartijas inclinadas', 'Incline_Push-Up', 'B', '']],
  ipush: [['Press inclinado con mancuernas', 'Incline_Dumbbell_Press', 'D', ''], ['Press inclinado con barra', 'Barbell_Incline_Bench_Press_-_Medium_Grip', 'G', 'hombro'], ['Press inclinado en máquina', 'Leverage_Incline_Chest_Press', 'G', ''], ['Lagartijas declinadas', 'Decline_Push-Up', 'B', 'hombro']],
  vpush: [['Press militar con barra', 'Standing_Military_Press', 'G', 'hombro lumbar'], ['Press de hombro con mancuernas', 'Dumbbell_Shoulder_Press', 'D', 'hombro'], ['Press de hombro en máquina', 'Machine_Shoulder_Military_Press', 'G', 'hombro'], ['Press Arnold', 'Arnold_Dumbbell_Press', 'D', 'hombro']],
  fly: [['Cruce de poleas', 'Cable_Crossover', 'G', ''], ['Aperturas en máquina', 'Butterfly', 'G', ''], ['Aperturas con mancuernas', 'Dumbbell_Flyes', 'D', 'hombro'], ['Aperturas inclinadas', 'Incline_Dumbbell_Flyes', 'D', 'hombro']],
  vpull: [['Jalón al pecho', 'Wide-Grip_Lat_Pulldown', 'G', ''], ['Dominadas', 'Pullups', 'P', 'hombro'], ['Jalón agarre cerrado', 'Close-Grip_Front_Lat_Pulldown', 'G', ''], ['Dominadas supinas', 'Chin-Up', 'P', 'hombro'], ['Dominadas asistidas con banda', 'Band_Assisted_Pull-Up', 'P', ''], ['Jalón con banda', '', 'K', '']],
  hpull: [['Remo sentado en polea', 'Seated_Cable_Rows', 'G', ''], ['Remo con barra', 'Bent_Over_Barbell_Row', 'G', 'lumbar'], ['Remo con mancuerna a una mano', 'One-Arm_Dumbbell_Row', 'D', ''], ['Remo en máquina', 'Leverage_Iso_Row', 'G', ''], ['Remo en T', 'T-Bar_Row_with_Handle', 'G', 'lumbar'], ['Remo invertido', 'Inverted_Row', 'P', ''], ['Remo con banda', '', 'K', '']],
  pullover: [['Pullover en polea', 'Straight-Arm_Pulldown', 'G', '']],
  lat: [['Elevaciones laterales', 'Side_Lateral_Raise', 'D', ''], ['Elevaciones laterales en polea', 'Cable_Seated_Lateral_Raise', 'G', ''], ['Elevaciones laterales con banda', 'Lateral_Raise_-_With_Bands', 'K', '']],
  rear: [['Face pull', 'Face_Pull', 'G', ''], ['Pájaros con mancuernas', 'Reverse_Flyes', 'D', ''], ['Pájaros en polea', 'Cable_Rear_Delt_Fly', 'G', ''], ['Separación con banda', 'Band_Pull_Apart', 'K', '']],
  bi: [['Curl con barra', 'Barbell_Curl', 'G', ''], ['Curl con mancuernas', 'Dumbbell_Bicep_Curl', 'D', ''], ['Curl martillo', 'Hammer_Curls', 'D', ''], ['Curl predicador', 'Machine_Preacher_Curls', 'G', ''], ['Curl inclinado', 'Incline_Dumbbell_Curl', 'D', '']],
  tri: [['Extensión de tríceps en polea', 'Triceps_Pushdown_-_Rope_Attachment', 'G', ''], ['Extensión sobre la cabeza en polea', 'Cable_Rope_Overhead_Triceps_Extension', 'G', 'hombro'], ['Rompecráneos', 'EZ-Bar_Skullcrusher', 'G', ''], ['Extensión de tríceps con mancuerna', 'Standing_Dumbbell_Triceps_Extension', 'D', 'hombro'], ['Patada de tríceps', 'Tricep_Dumbbell_Kickback', 'D', ''], ['Fondos en banco', 'Bench_Dips', 'B', 'hombro'], ['Lagartijas cerradas', 'Pushups_Close_and_Wide_Hand_Positions', 'B', '']],
  core: [['Plancha', 'Plank', 'B', ''], ['Crunch en polea', 'Cable_Crunch', 'G', ''], ['Elevación de piernas colgado', 'Hanging_Leg_Raise', 'P', ''], ['Pallof press', 'Pallof_Press', 'G', ''], ['Dead bug', 'Dead_Bug', 'B', ''], ['Rueda abdominal', 'Ab_Roller', 'B', 'lumbar']],
};
const RX_COMPOUND = { squat: 1, hinge: 1, lunge: 1, glute: 1, hpush: 1, ipush: 1, vpush: 1, vpull: 1, hpull: 1 };
// Días tipo: patrones en orden de prioridad (si falta tiempo se cortan los últimos). "pat:2" = otra opción del mismo patrón.
const RX_DAYS = {
  fullA: ['Cuerpo completo A', ['squat', 'hpush', 'hpull', 'hinge', 'vpush', 'core', 'bi', 'tri', 'calf']],
  fullB: ['Cuerpo completo B', ['hinge', 'ipush', 'vpull', 'lunge', 'lat', 'core', 'tri', 'bi', 'calf']],
  fullC: ['Cuerpo completo C', ['lunge', 'vpush', 'hpull:2', 'glute', 'hpush:2', 'rear', 'core:2']],
  upperA: ['Torso A', ['hpush', 'hpull', 'vpush', 'vpull', 'lat', 'tri', 'bi', 'rear']],
  upperB: ['Torso B', ['ipush', 'vpull:2', 'hpull:2', 'fly', 'lat', 'bi:2', 'tri:2', 'rear:2']],
  lowerA: ['Pierna A', ['squat', 'hinge', 'lunge', 'ham', 'calf', 'core', 'quad']],
  lowerB: ['Pierna B', ['hinge:2', 'glute', 'lunge:2', 'quad', 'ham:2', 'calf:2', 'core:2']],
  push: ['Push (empuje)', ['hpush', 'ipush', 'vpush', 'lat', 'fly', 'tri', 'tri:2', 'core']],
  pull: ['Pull (tracción)', ['vpull', 'hpull', 'hpull:2', 'rear', 'pullover', 'bi', 'bi:2', 'core:2']],
  legs: ['Legs (pierna)', ['squat', 'hinge', 'lunge', 'quad', 'ham', 'calf', 'core']],
  push2: ['Push B (empuje)', ['ipush:2', 'vpush:2', 'hpush:2', 'lat:2', 'fly:2', 'tri:3', 'tri:4']],
  pull2: ['Pull B (tracción)', ['hpull:3', 'vpull:2', 'hpull:4', 'rear:2', 'pullover', 'bi:3', 'bi:4']],
  legs2: ['Legs B (pierna)', ['hinge:2', 'squat:2', 'glute', 'lunge:2', 'ham:2', 'calf:2', 'core:2']],
  chestBack: ['Pecho y espalda', ['hpush', 'hpull', 'ipush', 'vpull', 'fly', 'pullover', 'core']],
  shArms: ['Hombro y brazo', ['vpush', 'lat', 'rear', 'bi', 'tri', 'bi:2', 'tri:2']],
  chest: ['Pecho', ['hpush', 'ipush', 'fly', 'hpush:2', 'fly:2', 'core']],
  back: ['Espalda', ['vpull', 'hpull', 'hpull:2', 'pullover', 'rear', 'core:2']],
  shoulders: ['Hombro', ['vpush', 'lat', 'rear', 'lat:2', 'vpush:2', 'core']],
  arms: ['Brazo', ['bi', 'tri', 'bi:2', 'tri:2', 'bi:3', 'tri:3', 'core:2']],
  str5A: ['Fuerza A', ['squat', 'hpush', 'hpull:2', 'core']],
  str5B: ['Fuerza B', ['squat', 'vpush', 'hinge:2', 'core:2']],
  gluteA: ['Glúteo y pierna A', ['glute', 'squat', 'hinge', 'abduct', 'lunge', 'calf']],
  gluteB: ['Glúteo y pierna B', ['hinge', 'glute:2', 'lunge:2', 'ham', 'abduct:2', 'core']],
  upperG: ['Torso', ['hpush:2', 'vpull', 'hpull:2', 'vpush:2', 'lat', 'core']],
};
const RX_SPLITS = [
  { id: 'full3', short: 'Full body', name: 'Cuerpo completo · 3 días', desc: 'Ideal para empezar o con poco tiempo. Cada sesión toca todo el cuerpo.', level: 'Principiante', days: ['fullA', 'fullB', 'fullC'], dows: [1, 3, 5], goal: 'hip' },
  { id: 'ab', short: 'AB', name: 'AB · Torso / Pierna · 4 días', desc: 'Alterna torso y pierna. Cada músculo dos veces por semana.', level: 'Intermedio', days: ['upperA', 'lowerA', 'upperB', 'lowerB'], dows: [1, 2, 4, 5], goal: 'hip' },
  { id: 'ppl3', short: 'PPL', name: 'Push Pull Legs · 3 días', desc: 'Empuje, tracción y pierna. Una vez por semana cada día.', level: 'Principiante a intermedio', days: ['push', 'pull', 'legs'], dows: [1, 3, 5], goal: 'hip' },
  { id: 'ppl6', short: 'PPL', name: 'Push Pull Legs · 6 días', desc: 'La versión de alto volumen: cada grupo dos veces por semana con variantes.', level: 'Avanzado', days: ['push', 'pull', 'legs', 'push2', 'pull2', 'legs2'], dows: [1, 2, 3, 4, 5, 6], goal: 'hip' },
  { id: 'arnold', short: 'Arnold', name: 'Arnold · 6 días', desc: 'Pecho y espalda, hombro y brazo, pierna. Dos vueltas por semana.', level: 'Avanzado', days: ['chestBack', 'shArms', 'legs', 'chestBack', 'shArms', 'legs2'], dows: [1, 2, 3, 4, 5, 6], goal: 'hip' },
  { id: 'weider', short: 'Weider', name: 'Weider · 5 días', desc: 'Un grupo muscular por día. Clásico de culturismo.', level: 'Intermedio', days: ['chest', 'back', 'legs', 'shoulders', 'arms'], dows: [1, 2, 3, 4, 5], goal: 'hip' },
  { id: 'phul', short: 'PHUL', name: 'PHUL · 4 días', desc: 'Dos días de fuerza y dos de hipertrofia, torso y pierna.', level: 'Intermedio', days: ['upperA', 'lowerA', 'upperB', 'lowerB'], dows: [1, 2, 4, 5], goal: 'phul' },
  { id: 'str5', short: '5×5', name: 'Fuerza 5×5 · A/B', desc: 'Básicos pesados alternando A y B, tres días por semana.', level: 'Principiante a intermedio', days: ['str5A', 'str5B', 'str5A'], dows: [1, 3, 5], goal: 'str5' },
  { id: 'glute', short: 'Glúteo', name: 'Glúteo y pierna · 3 días', desc: 'Dos días con énfasis en glúteo y uno de torso.', level: 'Principiante a intermedio', days: ['gluteA', 'upperG', 'gluteB'], dows: [1, 3, 5], goal: 'hip' },
  { id: 'home', short: 'Casa', name: 'En casa sin equipo · 3 días', desc: 'Con tu peso corporal y, si tienes, bandas.', level: 'Principiante', days: ['fullA', 'fullB', 'fullC'], dows: [1, 3, 5], goal: 'grasa', equip: 'home' },
];
const RX_GOALS = [['hip', 'Ganar músculo'], ['fuerza', 'Fuerza'], ['grasa', 'Perder grasa'], ['salud', 'Salud y condición']];
const RX_EQUIP = [['gym', 'Gimnasio completo', 'GDBKP'], ['db', 'Mancuernas y banco', 'DBK'], ['bar', 'Casa con barra de dominadas', 'BKP'], ['home', 'Casa sin equipo', 'BK']];
const RX_FOCUS = [['', 'Equilibrado'], ['glute', 'Glúteo y pierna'], ['arms', 'Brazos'], ['shoulders', 'Hombro'], ['back', 'Espalda'], ['chest', 'Pecho']];
const RX_CARE = [['hombro', 'Hombro'], ['rodilla', 'Rodilla'], ['lumbar', 'Espalda baja']];
const RX_DOW_N = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
function rxOptions(pat, cfg) {
  const eq = (RX_EQUIP.find(x => x[0] === cfg.equip) || RX_EQUIP[0])[2];
  return (RX_EX[pat] || []).filter(o => eq.includes(o[2]) && !(cfg.care || []).some(c => (' ' + o[3] + ' ').includes(' ' + c + ' ')));
}
// Prescripción: series, reps, RIR y descanso según objetivo, nivel y si es el ejercicio principal.
function rxDose(cfg, pat, rank, dayKey) {
  const comp = !!RX_COMPOUND[pat], g = cfg.goal, lvl = cfg.level;
  let d;
  if (g === 'str5') d = rank < 3 && comp ? { sets: pat === 'hinge' ? 1 : 5, reps: '5', rir: '2', rest: '3 min' } : { sets: 3, reps: '8-12', rir: '2', rest: '90 s' };
  else if (g === 'phul') { const power = /A$/.test(dayKey); d = power ? (comp ? { sets: 4, reps: '3-5', rir: '2', rest: '3 min' } : { sets: 3, reps: '6-10', rir: '2', rest: '2 min' }) : (comp ? { sets: 3, reps: '8-12', rir: '2', rest: '2 min' } : { sets: 3, reps: '12-15', rir: '1', rest: '90 s' }); }
  else if (g === 'fuerza') d = comp && rank < 2 ? { sets: 5, reps: '3-5', rir: '2', rest: '3 min' } : comp ? { sets: 3, reps: '6-8', rir: '2', rest: '2 min' } : { sets: 2, reps: '10-12', rir: '2', rest: '90 s' };
  else if (g === 'grasa') d = comp ? { sets: 3, reps: '8-12', rir: '2', rest: '90 s' } : { sets: 3, reps: '12-15', rir: '1', rest: '60 s' };
  else if (g === 'salud') d = { sets: 2, reps: '10-15', rir: '3', rest: '60-90 s' };
  else d = comp ? { sets: 3, reps: '6-10', rir: '2', rest: '2 min' } : { sets: 3, reps: '10-15', rir: '1', rest: '90 s' };
  if (lvl === 'beg') { d.sets = Math.min(d.sets, 3); d.rir = String(Math.max(2, +d.rir || 2)); }
  if (lvl === 'adv' && comp && rank < 2 && g !== 'str5') d.sets += 1;
  return d;
}
const RX_FOCUS_ADD = { glute: { lower: ['glute', 'abduct'], full: ['glute'] }, arms: { upper: ['bi', 'tri'], full: ['bi'] }, shoulders: { upper: ['lat', 'rear'], full: ['lat'] }, back: { upper: ['hpull', 'vpull'], full: ['hpull'] }, chest: { upper: ['ipush', 'fly'], full: ['ipush'] } };
function rxKind(dayKey) { return /^(lower|legs|glute)/.test(dayKey) ? 'lower' : /^full/.test(dayKey) ? 'full' : /^str/.test(dayKey) ? 'str' : 'upper'; }
// Arma un día: elige ejercicios por patrón, sin repetir, con su prescripción.
function rxBuildDay(dayKey, cfg, shift) {
  const def = RX_DAYS[dayKey]; let pats = def[1].slice();
  const fa = cfg.focus && RX_FOCUS_ADD[cfg.focus] && RX_FOCUS_ADD[cfg.focus][rxKind(dayKey)];
  if (fa) pats.splice(2, 0, ...fa.map(p => p + ':2'));
  const per = { 30: 4, 45: 5, 60: 6, 75: 7, 90: 8 }[cfg.mins] || 6, used = new Set(), items = [];
  for (const raw of pats) {
    if (items.length >= per) break;
    const [pat, alt] = raw.split(':'), opts = rxOptions(pat, cfg).filter(o => !used.has(o[1]));
    if (!opts.length) continue;
    const o = opts[((+alt || 1) - 1 + (shift || 0)) % opts.length];
    used.add(o[1]); items.push({ pat, opt: o });
  }
  let rank = 0;
  items.forEach(it => { it.dose = rxDose(cfg, it.pat, RX_COMPOUND[it.pat] ? rank++ : 9, dayKey); });
  return { key: dayKey, name: def[0], items };
}
function rxBuildPlan(cfg) {
  const days = cfg.days, shift = cfg.shift || 0;
  return days.map((k, i) => { const d = rxBuildDay(k, cfg, shift + (days.indexOf(k) !== i && cfg.goal !== 'str5' ? 1 : 0)); d.dow = (cfg.dows || [])[i]; return d; });
}
// El asistente elige la división según días y nivel.
function rxSplitFor(cfg) {
  const n = cfg.ndays;
  if (cfg.focus === 'glute' && n === 3) return { days: ['gluteA', 'upperG', 'gluteB'], dows: [1, 3, 5] };
  if (n <= 2) return { days: ['fullA', 'fullB'], dows: [1, 4] };
  if (n === 3) return cfg.level === 'beg' ? { days: ['fullA', 'fullB', 'fullC'], dows: [1, 3, 5] } : { days: ['push', 'pull', 'legs'], dows: [1, 3, 5] };
  if (n === 4) return { days: ['upperA', 'lowerA', 'upperB', 'lowerB'], dows: [1, 2, 4, 5] };
  if (n === 5) return { days: ['upperA', 'lowerA', 'push', 'pull', 'legs'], dows: [1, 2, 3, 5, 6] };
  return { days: ['push', 'pull', 'legs', 'push2', 'pull2', 'legs2'], dows: [1, 2, 3, 4, 5, 6] };
}
function rxGoalName(g) { return (RX_GOALS.find(x => x[0] === g) || [0, g === 'phul' ? 'Fuerza e hipertrofia' : g === 'str5' ? 'Fuerza' : 'Ganar músculo'])[1]; }
function rxToRoutines(plan, cfg, title) {
  const tag = title ? title + ' · ' : '';
  return plan.map(d => {
    // perder grasa: los aislados seguidos van en biseries para ahorrar tiempo
    let circ = 0; const cs = d.items.map(() => null);
    if (cfg.goal === 'grasa') for (let j = 0; j < d.items.length - 1; j++) { if (!RX_COMPOUND[d.items[j].pat] && !RX_COMPOUND[d.items[j + 1].pat] && cs[j] == null) { cs[j] = cs[j + 1] = ++circ; j++; } }
    const exs = d.items.map((it, j) => {
      const c = cs[j];
      return { id: uid(), name: it.opt[0], dbId: !it.opt[1] || (typeof gymDbById === 'function' && window.GYM_DB && !gymDbById(it.opt[1])) ? null : it.opt[1], circuit: c,
        sets: [{ count: it.dose.sets, reps: it.dose.reps, note: '' }], rir: it.dose.rir, rpe: '', tempo: '', rest: it.dose.rest, notes: '' };
    });
    return { id: uid(), name: tag + d.name, tempo: '', source: 'plan', createdAt: Date.now(), _dow: d.dow,
      meta: { objetivo: rxGoalName(cfg.goal), descanso: '', notas: (cfg.goal === 'grasa' ? t('Suma 20–30 min de cardio moderado o 8–10 mil pasos al día.') + ' ' : '') + t('Ajusta el peso para terminar cada serie con el RIR indicado.') + ((cfg.care || []).length ? ' ' + t('Se evitaron ejercicios que suelen molestar en las zonas que marcaste; si hay dolor, consulta a tu fisioterapeuta.') : '') },
      exercises: exs };
  });
}
function rxPreviewHtml(plan) {
  return plan.map((d, i) => `<div class="rx-day"><div class="rx-day-h"><b>${d.name}</b>${d.dow != null ? `<span>${RX_DOW_N[d.dow]}</span>` : ''}</div>
    ${d.items.map((it, j) => `<div class="rx-ex"><div class="rx-ex-n">${escapeHtml(it.opt[0])}</div><div class="rx-ex-d" translate="no">${it.dose.sets}×${escapeHtml(it.dose.reps)} · RIR ${escapeHtml(it.dose.rir)} · ${escapeHtml(it.dose.rest)}</div>
      <button class="rx-swap" data-rx-swap="${i}:${j}" aria-label="Cambiar ejercicio">⇄</button></div>`).join('')}</div>`).join('');
}
// Vista previa común (plantilla o asistente). ctx.spec: guardar como plantillas del especialista.
function rxOpenPreview(title, cfg, ctx) {
  let plan = rxBuildPlan(cfg);
  const paint = () => {
    openSheet(title, `<div class="fit-note" style="margin:0 0 10px;"><span>${rxGoalName(cfg.goal)}</span> · <span translate="no">${plan.length}</span> <span>${plan.length === 1 ? 'día' : 'días'}</span> · <span>${(RX_EQUIP.find(x => x[0] === cfg.equip) || RX_EQUIP[0])[1]}</span>. <span>Toca ⇄ para cambiar un ejercicio por otro del mismo tipo.</span></div>
      ${rxPreviewHtml(plan)}
      ${ctx && ctx.spec ? '' : `<label class="usr-check" style="margin-top:10px;"><input type="checkbox" id="rx-sched" checked><span>Programarla en mi semana</span></label>`}
      <button class="btn-secondary" id="rx-shift" style="width:100%;margin-top:8px;">Otra variante</button>
      <div class="auth-msg" id="rx-msg"></div>`, async () => {
      const rs = rxToRoutines(plan, cfg, ctx && ctx.prefix);
      if (ctx && ctx.spec) {
        const sv = document.getElementById('sheet-save'); if (sv) sv.disabled = true;
        try { await sbRest('templates', { method: 'POST', body: rs.map(r => { const c = Object.assign({}, r); delete c._dow; return { kind: 'routine', name: r.name, payload: c }; }), headers: { Prefer: 'return=minimal' } }); }
        catch (e) { document.getElementById('rx-msg').textContent = authErr(e.code); if (sv) sv.disabled = false; return; }
        if (typeof openTemplates === 'function') openTemplates(ctx.forClient); return;
      }
      const all = gymRoutines(), sch = gymSchedule(), doSched = document.getElementById('rx-sched').checked;
      rs.forEach(r => { const dw = r._dow; delete r._dow; all.push(r); if (doSched && dw != null) sch[String(dw)] = r.id; });
      saveGymRoutines(all); if (doSched) saveGymSchedule(sch);
      closeSheet(); try { renderGym(); } catch (e) {} try { renderHoyDash(); } catch (e) {}
    });
    const sv = document.getElementById('sheet-save'); if (sv) sv.textContent = t(ctx && ctx.spec ? 'Guardar plantillas' : 'Agregar');
    document.getElementById('rx-shift').addEventListener('click', () => { cfg.shift = (cfg.shift || 0) + 1; plan = rxBuildPlan(cfg); paint(); });
    document.querySelectorAll('[data-rx-swap]').forEach(b => b.addEventListener('click', () => {
      const [i, j] = b.dataset.rxSwap.split(':').map(Number), d = plan[i], it = d.items[j];
      const taken = new Set(d.items.map(x => x.opt[1])), opts = rxOptions(it.pat, cfg);
      const k = opts.findIndex(o => o[1] === it.opt[1]);
      for (let n = 1; n <= opts.length; n++) { const o = opts[(k + n) % opts.length]; if (!taken.has(o[1])) { it.opt = o; break; } }
      paint();
    }));
  };
  if (!window.GYM_DB && typeof loadGymDb === 'function') loadGymDb().catch(() => {});
  paint();
}
// Catálogo de plantillas prehechas.
function openRoutinePlans(ctx) {
  openSheet('Plantillas de rutina', `<div class="lk-d" style="margin:0 0 10px;">Divisiones clásicas listas para usar. Eliges tu equipo, revisas los ejercicios y quedan en ${ctx && ctx.spec ? 'tus plantillas para asignarlas' : 'Mis rutinas, programadas en tu semana'}. Después puedes editar todo.</div>
    <label class="auth-field"><span>Equipo</span><select class="auth-in" id="rp-eq">${RX_EQUIP.map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select></label>
    ${RX_SPLITS.map((sp, i) => `<button class="rx-card" data-rp="${i}"><b>${sp.name}</b><span>${sp.desc}</span><small><span>${sp.level}</span> · <span translate="no">${sp.dows.map(d => t(RX_DOW_N[d])).join(' ')}</span></small></button>`).join('')}
    ${ctx && ctx.spec ? `<div class="setting-label" style="margin-top:14px;">Otros deportes</div>${SPORT_ROUTINES.map((r, i) => `<button class="rx-card" data-rp-sport="${i}"><b>${r.name}</b><span>${r.ex.map(e => e[0]).join(' · ')}</span></button>`).join('')}` : '<button class="btn-secondary" id="rp-sport" style="width:100%;margin-top:6px;">Rutinas por deporte</button>'}`);
  document.querySelectorAll('[data-rp-sport]').forEach(b => b.addEventListener('click', async () => {
    const r = SPORT_ROUTINES[+b.dataset.rpSport], payload = { name: r.name, meta: { sport: r.sport }, tempo: '', notes: r.note || '', exercises: r.ex.map(e => ({ id: uid(), name: e[0], sets: gymParseSetsText(e[1] + 'x' + e[2]).length ? gymParseSetsText(e[1] + 'x' + e[2]) : [{ count: e[1], reps: e[2], note: '' }] })) };
    try { await sbRest('templates', { method: 'POST', body: { kind: 'routine', name: r.name, payload }, headers: { Prefer: 'return=minimal' } }); } catch (e) { alert(authErr(e.code)); return; }
    if (typeof openTemplates === 'function') openTemplates(ctx.forClient);
  }));
  document.querySelectorAll('[data-rp]').forEach(b => b.addEventListener('click', () => {
    const sp = RX_SPLITS[+b.dataset.rp], eq = sp.equip || document.getElementById('rp-eq').value;
    const goal = sp.goal === 'hip' && eq === 'home' ? 'grasa' : sp.goal;
    rxOpenPreview(sp.name, { goal, level: /Avanzado/.test(sp.level) ? 'adv' : /^Principiante$/.test(sp.level) ? 'beg' : 'int', equip: eq, mins: 60, focus: '', care: [], days: sp.days, dows: sp.dows }, Object.assign({ prefix: sp.short }, ctx || {}));
  }));
  const sb2 = document.getElementById('rp-sport'); if (sb2) sb2.addEventListener('click', () => openSportRoutines());
}
// Asistente: preguntas cortas y arma la semana.
function openRoutineAssistant(ctx) {
  const st = { goal: 'hip', ndays: 4, level: 'int', equip: 'gym', mins: 60, focus: '', care: [] };
  try { const prof = S.get('athlete_profile', null); if (prof && prof.level) st.level = prof.level === 'principiante' ? 'beg' : prof.level === 'avanzado' || prof.level === 'elite' ? 'adv' : 'int'; } catch (e) {}
  const chips = (key, list, multi) => `<div class="chips small rx-chips" data-rxk="${key}"${multi ? ' data-multi="1"' : ''}>${list.map(([v, n]) => `<button type="button" class="chip${(multi ? st[key].includes(v) : String(st[key]) === String(v)) ? ' selected' : ''}" data-v="${v}">${n}</button>`).join('')}</div>`;
  openSheet('Asistente de rutinas', `<div class="fit-note" style="margin:0 0 12px;">Responde y te armo la semana. Usa reglas de entrenamiento comunes (volumen, repeticiones y descansos según tu objetivo); revísala y ajústala, o pídele a tu coach que la revise.</div>
    <div class="setting-label">Objetivo</div>${chips('goal', RX_GOALS)}
    <div class="setting-label">Días por semana</div>${chips('ndays', [[2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6']])}
    <div class="setting-label">Nivel</div>${chips('level', [['beg', 'Principiante'], ['int', 'Intermedio'], ['adv', 'Avanzado']])}
    <div class="setting-label">Equipo</div>${chips('equip', RX_EQUIP.map(x => [x[0], x[1]]))}
    <div class="setting-label">Tiempo por sesión</div>${chips('mins', [[30, '30 min'], [45, '45 min'], [60, '60 min'], [75, '75 min'], [90, '90 min']])}
    <div class="setting-label">Enfoque</div>${chips('focus', RX_FOCUS)}
    <div class="setting-label">Cuidar (molestias o lesiones)</div>${chips('care', RX_CARE, true)}`, () => {
    const sp = rxSplitFor(st);
    rxOpenPreview(t('Tu rutina'), Object.assign({}, st, { days: sp.days, dows: sp.dows }), Object.assign({ prefix: '' }, ctx || {}));
  });
  const sv = document.getElementById('sheet-save'); if (sv) sv.textContent = t('Armar');
  document.querySelectorAll('.rx-chips .chip').forEach(c => c.addEventListener('click', () => {
    const box = c.parentElement, k = box.dataset.rxk, v = c.dataset.v, num = k === 'ndays' || k === 'mins';
    if (box.dataset.multi) { const i = st[k].indexOf(v); if (i >= 0) st[k].splice(i, 1); else st[k].push(v); c.classList.toggle('selected'); return; }
    st[k] = num ? +v : v; box.querySelectorAll('.chip').forEach(x => x.classList.toggle('selected', x === c));
  }));
}
// Entrada única desde Gym: plantillas, asistente y por deporte.
function openRoutineHub(ctx) {
  openSheet(ctx && ctx.spec ? 'Plantillas de rutina' : 'Nueva rutina', `<div class="goal-types" style="grid-template-columns:1fr;">
    <button data-hub="ai"><b>Asistente</b><span>Dime tu objetivo, días, equipo y tiempo, y te armo la semana con ejercicios, series, RIR y descansos.</span></button>
    <button data-hub="tpl"><b>Plantillas prehechas</b><span>AB torso/pierna, Push Pull Legs, cuerpo completo, Arnold, Weider, PHUL, 5×5 y glúteo.</span></button>
    ${ctx && ctx.spec ? '' : `<button data-hub="sport"><b>Por deporte</b><span>Box, Hyrox, running, natación, calistenia, escalada y más.</span></button>
    <button data-hub="pdf"><b>Importar PDF</b><span>La rutina que te mandó tu coach en PDF.</span></button>
    <button data-hub="new"><b>Desde cero</b><span>Tú eliges cada ejercicio.</span></button>`}
  </div>`);
  document.querySelectorAll('[data-hub]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.hub;
    if (k === 'ai') openRoutineAssistant(ctx); else if (k === 'tpl') openRoutinePlans(ctx); else if (k === 'sport') openSportRoutines();
    else { closeSheet(); const id = k === 'pdf' ? 'gym-import' : 'gym-new'; setTimeout(() => { const x = document.getElementById(id) || document.getElementById(id + '-big'); if (x) x.click(); }, 50); }
  }));
}

// Al terminar una rutina de otro deporte queda registrada como actividad (distancia y tiempo sumados de las series).
function actRoutineTotals(r, lg) {
  let meters = 0, secs = 0, sets = 0;
  (r.exercises || []).forEach(ex => ((lg.ex || {})[ex.id] || []).forEach((st, i) => {
    if (!st || !st.done) return; sets++;
    const unit = String(gymSetNoteForIndex(ex, i) || '').toLowerCase().trim(), v = parseFloat(String(st.reps || gymSetRepsForIndex(ex, i)).replace(',', '.')) || 0;
    if (/^km/.test(unit)) meters += v * 1000; else if (/^m(\b|$|ts|etros)/.test(unit)) meters += v;
    const tt = st.time ? actParseTime(st.time) : null;
    if (tt) secs += tt; else if (/^min/.test(unit)) secs += v * 60; else if (/^(s|seg)/.test(unit)) secs += v;
  }));
  const dur = lg.start && lg.end ? Math.round((lg.end - lg.start) / 1000) : 0;
  if (dur > secs && dur < 6 * 3600) secs = dur;
  return { meters, secs, sets };
}
function actFromRoutine(r, dateKey, lg) {
  const sp = SPORT_BY[r.meta.sport]; if (!sp) return;
  const { meters, secs, sets } = actRoutineTotals(r, lg);
  if (!sets) return;
  const L = actLog(), day = (L[dateKey] || []).filter(a => a.rid !== r.id), f = sp.f || [];
  const a = { id: uid(), sport: sp.id, rid: r.id, src: 'routine', wod: r.name };
  if ((sp.types || []).includes('Series')) a.type = 'Series';
  if (meters) { if (f.includes('dist_m')) a.dist_m = Math.round(meters); else a.dist_km = Math.round(meters / 10) / 100; }
  if (secs) a.time = secs;
  if (lg.feel && lg.feel.rpe != null) a.rpe = lg.feel.rpe;
  day.push(a); L[dateKey] = day; actSave(L);
}
// Récords del atleta para el especialista: fuerza (1RM estimado, mejor serie, tendencia) y deportes (mejores marcas).
function spRecordsHtml(D) {
  const logs = D.gym_logs || {}, routines = Array.isArray(D.gym_routines) ? D.gym_routines : [], U = gymUnit(), by = {};
  const days = Object.keys(logs).sort(), d7 = keyDate(new Date(Date.now() - 7 * 864e5));
  days.forEach(d => {
    const lg = logs[d] || {}, rt = routines.find(x => x.id === lg.routineId) || { exercises: [] };
    if (gymIsSport(rt)) return;
    Object.keys(lg.ex || {}).forEach(exId => {
      const sw = lg.swap && lg.swap[exId], ex = (rt.exercises || []).find(x => x.id === exId) || {}, name = (sw && sw.name) || ex.name; if (!name) return;
      const k = goalNorm(name), done = (lg.ex[exId] || []).filter(x => x && x.done && gymNum(x.kg) > 0 && gymNum(x.reps) > 0); if (!done.length) return;
      const R = by[k] || (by[k] = { name, dbId: (sw && sw.dbId) || ex.dbId, pts: [], best: null, top: null, prDay: null });
      let dayBest = 0, daySet = null;
      done.forEach(x => { const e = gymE1RM(x.kg, x.reps); if (e > dayBest) { dayBest = e; daySet = x; } if (!R.top || gymNum(x.kg) > gymNum(R.top.kg)) R.top = { kg: x.kg, reps: x.reps, d }; });
      R.pts.push({ d, v: dayBest });
      if (!R.best || dayBest > R.best.v) { R.best = { v: dayBest, kg: daySet.kg, reps: daySet.reps, d }; R.prDay = d; }
    });
  });
  const list = Object.values(by).filter(R => R.best).sort((a, b) => (b.prDay > a.prDay ? 1 : b.prDay < a.prDay ? -1 : b.best.v - a.best.v)).slice(0, 12);
  const spark = pts => { const p = pts.slice(-10); if (p.length < 2) return ''; const mn = Math.min(...p.map(x => x.v)), mx = Math.max(...p.map(x => x.v)), r = mx - mn || 1;
    return `<svg class="rec-spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true"><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" points="${p.map((x, i) => `${(i / (p.length - 1) * 100).toFixed(1)},${(26 - (x.v - mn) / r * 24).toFixed(1)}`).join(' ')}"/></svg>`; };
  const fmtD = d => { try { return new Intl.DateTimeFormat(_loc(), { day: 'numeric', month: 'short' }).format(parseKey(d)); } catch (e) { return d; } };
  const str = list.map(R => { const first = R.pts[0].v, ch = first ? Math.round((R.best.v - first) / first * 100) : 0, fresh = R.prDay >= d7;
    return `<div class="rec-row${fresh ? ' fresh' : ''}"><div class="rec-l"><div class="rec-n" translate="no">${escapeHtml(R.name)}</div>
      <div class="rec-d"><span>Mejor serie</span> <span translate="no">${gymFmtKg(R.best.kg)} ${U} × ${escapeHtml(String(R.best.reps))}</span> · <span translate="no">${escapeHtml(fmtD(R.best.d))}</span></div>
      ${fresh ? '<span class="hd-badge ok rec-new">Nuevo récord</span>' : ''}</div>
      <div class="rec-r"><div class="rec-v" translate="no">${gymFmtKg(R.best.v)}<small> ${U}</small></div><div class="rec-k">1RM est.${R.pts.length > 1 && ch ? ` · <b class="${ch < 0 ? 'dn' : 'up'}" translate="no">${ch > 0 ? '+' : ''}${ch}%</b>` : ''}</div>${spark(R.pts)}</div></div>`; }).join('');
  // Deportes: distancia más larga y mejor ritmo por deporte
  const A = D.act_log || {}, sp = {};
  Object.keys(A).forEach(d => (A[d] || []).forEach(a => {
    const S2 = SPORT_BY[a.sport]; if (!S2 || S2.gym) return;
    const km = (+a.dist_km || 0) + (+a.dist_m || 0) / 1000, T = sp[a.sport] || (sp[a.sport] = { n: S2.name, far: null, pace: null, swim: (S2.f || []).includes('dist_m') });
    if (km && (!T.far || km > T.far.km)) T.far = { km, d };
    if (km >= (T.swim ? 0.1 : 1) && +a.time) { const pc = a.time / (T.swim ? km * 10 : km); if (!T.pace || pc < T.pace.v) T.pace = { v: pc, d, km }; }
  }));
  const spRows = Object.values(sp).filter(T => T.far || T.pace).map(T => `<div class="rec-row"><div class="rec-l"><div class="rec-n">${escapeHtml(T.n)}</div>
      ${T.far ? `<div class="rec-d"><span>Más largo</span> <span translate="no">${T.swim ? Math.round(T.far.km * 1000) + ' m' : (Math.round(T.far.km * 10) / 10) + ' km'}</span> · <span translate="no">${escapeHtml(fmtD(T.far.d))}</span></div>` : ''}</div>
      <div class="rec-r">${T.pace ? `<div class="rec-v" translate="no">${actFmtTime(Math.round(T.pace.v))}<small>${T.swim ? ' /100 m' : ' /km'}</small></div><div class="rec-k"><span>Mejor ritmo</span></div>` : ''}</div></div>`).join('');
  if (!str && !spRows) return '';
  return `<div class="sp-card rec-card"><div class="sp-card-top"><div class="sp-card-n">Récords</div><span class="cd-num">${list.filter(R => R.prDay >= d7).length ? `<span translate="no">${list.filter(R => R.prDay >= d7).length}</span> <span>nuevos esta semana</span>` : ''}</span></div>
    ${str}${spRows ? `${str ? '<div class="rec-sep"></div>' : ''}${spRows}` : ''}</div>`;
}

// Rutinas programadas (días fijos) que se quedaron sin hacer en los últimos `days` días.
// No cuenta como falta si esa rutina se hizo ese día o después, si se omitió a propósito
// (skip[fecha]), si la rutina no existía todavía o ya venció, ni antes de `since`.
// Si la misma rutina faltó varias veces, devuelve solo la más reciente con `times`.
function gymMissedFrom(sched, logs, routines, todayKey, opts) {
  opts = opts || {}; sched = sched || {}; logs = logs || {};
  // Por defecto: lo que va de la semana (desde el lunes), y al menos los últimos 2 días
  const days = opts.days || Math.max(2, (new Date(todayKey + 'T00:00:00').getDay() + 6) % 7), since = opts.since || '', skip = opts.skip || {}, now = opts.now || Date.now();
  const byId = {}; (routines || []).forEach(r => { if (r && r.id) byId[r.id] = r; });
  const k = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const did = (dk, rid) => { const lg = logs[dk]; return !!(lg && lg.routineId === rid && (lg.done || Object.keys(lg.ex || {}).some(e => (lg.ex[e] || []).some(x => x && x.done)))); };
  const keys = Object.keys(logs).sort(), out = {};
  for (let n = days; n >= 1; n--) {
    const d = new Date(todayKey + 'T00:00:00'); d.setDate(d.getDate() - n);
    const dk = k(d), rid = sched[String(d.getDay())], r = byId[rid];
    if (!r || dk < since || skip[dk]) continue;
    if (r.createdAt && r.createdAt > d.getTime() + 864e5) continue;
    if (r.assigned && r.assigned.until && Date.parse(r.assigned.until) <= now) continue;
    if (keys.some(x => x >= dk && x <= todayKey && did(x, rid))) continue;
    const prev = out[rid];
    out[rid] = { date: dk, dow: d.getDay(), rid, name: r.name, times: prev ? prev.times + 1 : 1, dates: (prev ? prev.dates : []).concat(dk) };
  }
  return Object.values(out).sort((a, b) => (a.date < b.date ? -1 : 1));
}

// ============================================================
// OBJETIVOS Y LOGROS: metas con avance calculado solo a partir de los registros.
// ============================================================
const GOAL_TYPES = [
  ['weight', 'Peso objetivo', 'Llegar a un peso; avanza con tu promedio de 7 días'],
  ['bodyfat', '% de grasa objetivo', 'Avanza con cada evaluación de composición corporal'],
  ['pr', 'Récord en un ejercicio', 'Levantar cierto peso en un ejercicio de tus rutinas'],
  ['dist', 'Kilómetros acumulados', 'Sumar distancia en un deporte durante un periodo'],
  ['mark', 'Marca de tiempo', 'Hacer una distancia en cierto tiempo'],
  ['sessions', 'Sesiones por semana', 'Entrenamientos y actividades cada semana'],
  ['custom', 'Objetivo libre', 'Cualquier número que tú actualizas'],
];
const GOAL_PERIODS = [['week', 'Esta semana'], ['month', 'Este mes'], ['year', 'Este año'], ['all', 'Desde que lo creé']];
function goalsAll() { const g = S.get('goals', null); return Array.isArray(g) ? g : []; }
function goalsSave(g) { S.set('goals', g); }
function goalNorm(x) { return String(x || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }
// Mayor peso registrado (kg) en un ejercicio, buscándolo por nombre en todas las rutinas.
function goalBestLift(name) {
  const want = goalNorm(name), ids = {}; let best = null;
  gymRoutines().forEach(r => (r.exercises || []).forEach(ex => { if (goalNorm(ex.name) === want) ids[ex.id] = 1; }));
  const logs = gymLogs();
  Object.keys(logs).forEach(k => { const lg = logs[k] || {}; Object.keys(lg.ex || {}).forEach(id => { const sw = lg.swap && lg.swap[id]; if (sw ? goalNorm(sw.name) !== want : !ids[id]) return; (lg.ex[id] || []).forEach(st => { const kg = +st.kg; if (st.done && kg > 0 && (best == null || kg > best)) best = kg; }); }); });
  return best;
}
function goalPeriodStart(g) {
  const now = new Date(); now.setHours(12, 0, 0, 0);
  if (g.period === 'week') return ckWeekOf(now);
  if (g.period === 'month') return keyDate(new Date(now.getFullYear(), now.getMonth(), 1, 12));
  if (g.period === 'year') return keyDate(new Date(now.getFullYear(), 0, 1, 12));
  return g.created || '2000-01-01';
}
// Valor actual, texto y fracción de avance de un objetivo.
function goalState(g) {
  const lb = bwUnit() === 'lb', bw = v => v == null ? '—' : bwDisp(v) + ' ' + bwUnit(), o = { cur: null, pct: 0, curText: '—', tgtText: '', hint: '' };
  const linear = (cur, start, tgt) => { if (cur == null) return 0; if (start == null || start === tgt) return (tgt >= (start == null ? 0 : start) ? cur >= tgt : cur <= tgt) ? 1 : (start == null && tgt ? Math.min(1, cur / tgt) : 0); return Math.max(0, Math.min(1, (cur - start) / (tgt - start))); };
  if (g.type === 'weight') {
    const wl = S.get('weight_log', {}) || {}, tr = wtTrend(wl), ks = Object.keys(wl).sort(); o.cur = tr.avg != null && tr.n >= 2 ? tr.avg : (ks.length ? +wl[ks[ks.length - 1]] : null);
    o.curText = bw(o.cur); o.tgtText = bw(g.target); o.pct = linear(o.cur, g.start, g.target);
    if (o.cur != null) { const left = g.target - o.cur; o.hint = Math.abs(left) < 0.05 ? '' : `${left > 0 ? '+' : ''}${bwDiff(left)} ${bwUnit()}`; }
    if (o.cur != null && g.start != null && ((g.target <= g.start && o.cur <= g.target) || (g.target > g.start && o.cur >= g.target))) o.pct = 1;
  } else if (g.type === 'bodyfat') {
    const r = antHoyCache()[0], c = r ? antCalc(r.data || {}) : null; o.cur = c ? c.pct : null;
    o.curText = o.cur == null ? '—' : antN(o.cur, 1, '%'); o.tgtText = antN(g.target, 1, '%'); o.pct = linear(o.cur, g.start, g.target);
    if (o.cur != null && g.start != null && ((g.target <= g.start && o.cur <= g.target) || (g.target > g.start && o.cur >= g.target))) o.pct = 1;
    if (o.cur == null) o.hint = 'Falta una evaluación de composición corporal';
  } else if (g.type === 'pr') {
    o.cur = goalBestLift(g.exName); const f = v => v == null ? '—' : gymFmtKg(v) + ' ' + gymUnit();
    o.curText = f(o.cur); o.tgtText = f(g.target); o.pct = o.cur == null ? 0 : (o.cur >= g.target ? 1 : linear(o.cur, g.start != null && g.start < g.target ? g.start * 0.9 : null, g.target));
  } else if (g.type === 'dist') {
    const from = goalPeriodStart(g), l = actLog(); let km = 0;
    Object.keys(l).forEach(k => { if (k >= from) (l[k] || []).forEach(a => { if (!g.sport || a.sport === g.sport) km += (+a.dist_km || 0) + (+a.dist_m || 0) / 1000; }); });
    o.cur = km; o.curText = (Math.round(km * 10) / 10).toLocaleString(_loc()) + ' km'; o.tgtText = (+g.target).toLocaleString(_loc()) + ' km'; o.pct = Math.min(1, km / g.target);
  } else if (g.type === 'mark') {
    const l = actLog(); let best = null;
    Object.keys(l).forEach(k => (l[k] || []).forEach(a => { if (a.sport !== g.sport || !+a.time) return; const km = (+a.dist_km || 0) + (+a.dist_m || 0) / 1000; if (km >= g.dist * 0.98 && km <= g.dist * 1.05) { const t2 = a.time * g.dist / km; if (best == null || t2 < best) best = t2; } }));
    o.cur = best; o.curText = best == null ? '—' : actFmtTime(best); o.tgtText = actFmtTime(g.target);
    o.pct = best == null ? 0 : best <= g.target ? 1 : (g.start && g.start > g.target ? Math.max(0, Math.min(1, (g.start - best) / (g.start - g.target))) : Math.max(0, Math.min(.95, g.target / best)));
    if (best == null) o.hint = 'Registra una sesión de esa distancia para medir el avance';
  } else if (g.type === 'sessions') {
    const from = ckWeekOf(), gl = gymLogs(), al = actLog(); let n = 0;
    for (let i = 0; i < 7; i++) { const k = keyDate(new Date(parseKey(from).getTime() + i * 864e5)); if (gl[k] && (gl[k].done || Object.values(gl[k].ex || {}).some(a => a.some(x => x && x.done)))) n++; n += (al[k] || []).length; }
    o.cur = n; o.curText = String(n); o.tgtText = String(g.target); o.pct = Math.min(1, n / g.target); o.hint = 'Se reinicia cada lunes';
  } else {
    o.cur = g.cur == null ? null : +g.cur; const u = g.unit ? ' ' + g.unit : '';
    o.curText = o.cur == null ? '—' : (+o.cur).toLocaleString(_loc()) + u; o.tgtText = (+g.target).toLocaleString(_loc()) + u; o.pct = linear(o.cur, g.start, g.target);
    if (o.cur != null && ((g.start != null && g.target < g.start) ? o.cur <= g.target : o.cur >= g.target)) o.pct = 1;
  }
  return o;
}
// Marca como logrado el objetivo la primera vez que llega al 100% (las sesiones por semana cuentan semanas cumplidas).
function goalsCheck() {
  const all = goalsAll(); let ch = false;
  all.forEach(g => { const st = goalState(g);
    if (g.type === 'sessions') { const wk = ckWeekOf(); if (st.pct >= 1 && !(g.weeks || []).includes(wk)) { g.weeks = (g.weeks || []).concat([wk]); ch = true; } }
    else if (st.pct >= 1 && !g.done) { g.done = keyDate(); ch = true; }
    // Foto del avance: es lo que ve el especialista, sin recalcular con datos parciales
    const sn = { p: Math.round(st.pct * 100), c: st.curText, t: st.tgtText };
    if (!g.snap || g.snap.p !== sn.p || g.snap.c !== sn.c || g.snap.t !== sn.t) { g.snap = sn; ch = true; } });
  if (ch) goalsSave(all);
  return all;
}
function goalTitle(g) {
  if (g.title) return g.title;
  if (g.type === 'weight') return 'Peso objetivo'; if (g.type === 'bodyfat') return '% de grasa objetivo'; if (g.type === 'pr') return g.exName;
  if (g.type === 'dist') return (SPORT_BY[g.sport] || { name: 'Todos los deportes' }).name; if (g.type === 'mark') return `${(SPORT_BY[g.sport] || {}).name || ''} ${g.dist} km`;
  if (g.type === 'sessions') return 'Sesiones por semana'; return 'Objetivo';
}
function goalKicker(g) {
  const tn = (GOAL_TYPES.find(x => x[0] === g.type) || [])[1] || '';
  if (g.type === 'dist') return `${tn} · ${(GOAL_PERIODS.find(x => x[0] === (g.period || 'all')) || [])[1]}`;
  return tn;
}
function goalCardHtml(g, i) {
  const st = goalState(g), done = g.type === 'sessions' ? st.pct >= 1 : !!g.done, pct = Math.round(st.pct * 100);
  return `<div class="goal${done ? ' done' : ''}" data-goal="${i}"><div class="goal-top"><div><div class="goal-k">${goalKicker(g)}</div><div class="goal-t"${g.title || g.type === 'pr' ? ' translate="no"' : ''}>${escapeHtml(goalTitle(g))}</div></div>
      ${done ? `<span class="hd-badge ok">${g.type === 'sessions' ? 'Semana cumplida' : 'Logrado'}</span>` : `<span class="goal-pct" translate="no">${pct}%</span>`}</div>
    <div class="goal-v"><span><span>Ahora</span> <b translate="no">${st.curText}</b></span><span><span>Meta</span> <b translate="no">${st.tgtText}</b></span></div>
    <div class="goal-bar"><i style="width:${pct}%"></i></div>
    <div class="goal-d">${g.done && g.type !== 'sessions' ? `<span>Logrado el</span> <span translate="no">${escapeHtml(antDate(g.done))}</span>` : ''}${g.type === 'sessions' && (g.weeks || []).length ? `<span translate="no">${g.weeks.length}</span> <span>${g.weeks.length === 1 ? 'semana cumplida' : 'semanas cumplidas'}</span> · ` : ''}${!g.done && st.hint ? (/^[+\-−\d]/.test(st.hint) ? `<span>Faltan</span> <span translate="no">${st.hint.replace(/^[+\-−]/, '')}</span>` : `<span>${st.hint}</span>`) : ''}${g.due && !g.done ? ` · <span>Fecha límite</span> <span translate="no">${escapeHtml(antDate(g.due))}</span>` : ''}</div>${g.assigned || g.by ? `<div class="goal-d"><span>De</span> <span translate="no">${escapeHtml((g.assigned && g.assigned.by) || g.by || '')}</span></div>` : ''}</div>`;
}
function goalsSummary() { const a = goalsAll(); if (!a.length) return ''; const d = a.filter(g => g.done).length; return `${a.length - d} ${a.length - d === 1 ? 'activo' : 'activos'} · ${d} ${d === 1 ? 'logrado' : 'logrados'}`; }
function goalsHoyCard() {
  const all = goalsCheck(), act = all.filter(g => !g.done).slice(0, 3);
  if (!act.length) return '';
  return `<div class="hd-card" data-hd-goals="1" style="cursor:pointer;"><div class="hd-k"><span>Objetivos</span><span class="hd-badge" translate="no">${all.filter(g => g.done).length} ${all.filter(g => g.done).length === 1 ? 'logrado' : 'logrados'}</span></div>
    ${act.map(g => { const st = goalState(g), pct = Math.round(st.pct * 100); return `<div class="hd-goal"><div class="goal-v"><span><b${g.title || g.type === 'pr' ? ' translate="no"' : ''}>${escapeHtml(goalTitle(g))}</b></span><span translate="no">${st.curText} / ${st.tgtText}</span></div><div class="goal-bar"><i style="width:${pct}%"></i></div></div>`; }).join('')}</div>`;
}
function openGoals() {
  const all = goalsCheck(), act = all.filter(g => !g.done), done = all.filter(g => g.done);
  openSheet('Objetivos y logros', `<button class="btn-primary" id="goal-new" style="width:100%;margin-bottom:14px;">Nuevo objetivo</button>
    ${act.length ? act.map(g => goalCardHtml(g, all.indexOf(g))).join('') : '<div class="sp-empty">Pon un objetivo y la app mide sola tu avance con lo que registras: peso, levantamientos, kilómetros o sesiones.</div>'}
    ${done.length ? `<h3 class="ant-sub">Logros</h3>${done.map(g => goalCardHtml(g, all.indexOf(g))).join('')}` : ''}`);
  document.getElementById('goal-new').addEventListener('click', () => openGoalTypePicker());
  document.querySelectorAll('[data-goal]').forEach(c => c.addEventListener('click', () => openGoalForm(all[+c.dataset.goal], +c.dataset.goal)));
}
function openGoalTypePicker(ctx) {
  openSheet('Nuevo objetivo', `<div class="goal-types">${GOAL_TYPES.map(([k, n, d]) => `<button data-gt="${k}"><b>${n}</b><span>${d}</span></button>`).join('')}</div>
    <button class="btn-secondary" id="goal-back" style="width:100%;margin-top:12px;">Volver</button>`);
  document.querySelectorAll('[data-gt]').forEach(b => b.addEventListener('click', () => openGoalForm({ type: b.dataset.gt }, -1, ctx)));
  document.getElementById('goal-back').addEventListener('click', () => ctx ? closeSheet() : openGoals());
}
function openGoalForm(g0, idx, ctx) {
  const g = JSON.parse(JSON.stringify(g0)), isNew = idx < 0, lb = bwUnit() === 'lb';
  const exNames = []; (ctx ? ctx.routines || [] : gymRoutines()).forEach(r => (r.exercises || []).forEach(ex => { if (ex.name && !exNames.includes(ex.name)) exNames.push(ex.name); }));
  const sportOpts = (all0) => (all0 ? '<option value="">Todos los deportes</option>' : '') + SPORTS.filter(x => !x.gym).map(x => `<option value="${x.id}"${g.sport === x.id ? ' selected' : ''}>${x.name}</option>`).join('');
  const inp = (id, label, unit, val, ph, mode) => `<label class="ant-f"><span>${label}</span><span class="ant-in"><input id="${id}" inputmode="${mode || 'decimal'}" value="${val == null ? '' : escapeHtml(String(val))}" placeholder="${ph || ''}">${unit ? `<i>${unit}</i>` : ''}</span></label>`;
  let body = '';
  if (g.type === 'weight') body = inp('gl-target', 'Peso al que quieres llegar', bwUnit(), g.target ? bwDisp(g.target) : '');
  else if (g.type === 'bodyfat') body = inp('gl-target', '% de grasa al que quieres llegar', '%', g.target || '');
  else if (g.type === 'pr') body = `<label class="ant-f col"><span>Ejercicio</span>${exNames.length && (!g.exName || exNames.includes(g.exName)) ? `<span class="ant-in"><select id="gl-ex">${exNames.map(n => `<option${g.exName === n ? ' selected' : ''}>${escapeHtml(n)}</option>`).join('')}</select></span>` : '<input class="act-tx" id="gl-ex" placeholder="Nombre del ejercicio" value="' + escapeHtml(g.exName || '') + '">'}</label>` + inp('gl-target', 'Peso que quieres levantar', gymUnit(), g.target ? gymFmtKg(g.target) : '');
  else if (g.type === 'dist') body = `<label class="ant-f"><span>Deporte</span><span class="ant-in"><select id="gl-sport">${sportOpts(true)}</select></span></label>` + inp('gl-target', 'Kilómetros', 'km', g.target || '') + `<label class="ant-f"><span>Periodo</span><span class="ant-in"><select id="gl-period">${GOAL_PERIODS.map(([k, n]) => `<option value="${k}"${(g.period || 'month') === k ? ' selected' : ''}>${n}</option>`).join('')}</select></span></label>`;
  else if (g.type === 'mark') body = `<label class="ant-f"><span>Deporte</span><span class="ant-in"><select id="gl-sport">${sportOpts(false)}</select></span></label>` + inp('gl-dist', 'Distancia', 'km', g.dist || '', '10') + inp('gl-target', 'Tiempo objetivo', 'h:mm:ss', g.target ? actFmtTime(g.target) : '', '50:00', 'text');
  else if (g.type === 'sessions') body = inp('gl-target', 'Sesiones por semana', '', g.target || '', '4', 'numeric');
  else body = `<label class="ant-f col"><span>Nombre del objetivo</span><input class="act-tx" id="gl-title" maxlength="60" value="${escapeHtml(g.title || '')}" placeholder="Ej. Dominadas seguidas"></label>` + inp('gl-start', 'Valor inicial', '', g.start == null ? '' : g.start) + inp('gl-cur', 'Valor actual', '', g.cur == null ? '' : g.cur) + inp('gl-target', 'Meta', '', g.target || '') + `<label class="ant-f"><span>Unidad</span><span class="ant-in"><input id="gl-unit" maxlength="12" value="${escapeHtml(g.unit || '')}" placeholder="reps, min, cm…"></span></label>`;
  const st = isNew || ctx ? null : goalState(g);
  openSheet(isNew ? (GOAL_TYPES.find(x => x[0] === g.type) || [])[1] : 'Editar objetivo', `<div class="ant-ed act-ed">
    ${st ? `<div class="ant-live" style="grid-template-columns:1fr 1fr 1fr;position:static;"><div><span>Ahora</span><b translate="no">${st.curText}</b></div><div><span>Meta</span><b translate="no">${st.tgtText}</b></div><div><span>Avance</span><b translate="no">${Math.round(st.pct * 100)}%</b></div></div>` : ''}
    ${body}
    ${g.type !== 'sessions' ? `<label class="ant-f"><span>Fecha límite (opcional)</span><span class="ant-in"><input type="date" id="gl-due" value="${escapeHtml(g.due || '')}"></span></label>` : ''}
    ${g.assigned ? '<div class="fit-note" style="margin-top:12px;">Este objetivo te lo puso tu especialista; solo él puede quitarlo.</div>' : ''}${!isNew && !g.assigned && !ctx ? '<button class="btn-secondary" id="gl-del" style="width:100%;margin-top:12px;color:#DC2626;">Eliminar objetivo</button>' : ''}<p class="auth-msg" id="gl-msg"></p></div>`, async () => {
    const num = id => { const e = document.getElementById(id); if (!e) return null; const n = parseFloat(String(e.value).replace(',', '.')); return isFinite(n) ? n : null; }, msg = document.getElementById('gl-msg');
    let tgt = g.type === 'mark' ? actParseTime(document.getElementById('gl-target').value) : num('gl-target');
    if (!tgt || tgt <= 0) { msg.textContent = t('Escribe la meta.'); return; }
    if (g.type === 'weight') { tgt = bwStore(tgt); if (tgt < 25 || tgt > 350) { msg.textContent = t('Revisa los números: alguno está fuera de rango.'); return; } }
    if (g.type === 'bodyfat' && (tgt < 3 || tgt > 60)) { msg.textContent = t('Revisa los números: alguno está fuera de rango.'); return; }
    if (g.type === 'pr') { tgt = +gymStoreW(tgt); const e = document.getElementById('gl-ex'); g.exName = (e.value || '').trim(); if (!g.exName) { msg.textContent = t('Elige el ejercicio.'); return; } }
    if (g.type === 'dist') { g.sport = document.getElementById('gl-sport').value || null; g.period = document.getElementById('gl-period').value; }
    if (g.type === 'mark') { g.sport = document.getElementById('gl-sport').value; g.dist = num('gl-dist'); if (!g.dist) { msg.textContent = t('Escribe la distancia.'); return; } }
    if (g.type === 'custom') { g.title = document.getElementById('gl-title').value.trim(); if (!g.title) { msg.textContent = t('Ponle nombre al objetivo.'); return; } g.start = num('gl-start'); g.cur = num('gl-cur'); if (g.cur == null) g.cur = g.start; g.unit = document.getElementById('gl-unit').value.trim(); }
    const due = document.getElementById('gl-due'); if (due) g.due = due.value || null;
    const changed = g.target !== tgt; g.target = tgt;
    if (ctx) { // el especialista lo asigna: viaja solo la definición; el punto de partida se toma en el teléfono del atleta
      const out = { type: g.type, target: g.target, due: g.due || null };
      ['exName', 'sport', 'period', 'dist', 'title', 'unit'].forEach(k => { if (g[k] != null && g[k] !== '') out[k] = g[k]; });
      if (g.type === 'custom') { out.start = g.start; out.cur = g.cur; }
      const sv = document.getElementById('sheet-save'); if (sv) sv.disabled = true;
      try { await ctx.save(out, goalTitle(out)); } catch (e) { msg.textContent = authErr(e.code); } if (sv) sv.disabled = false;
      return;
    }
    if (isNew || changed) { g.done = null; if (g.type !== 'custom') { g.start = null; const s0 = goalState(g).cur; g.start = s0 == null ? null : s0; } }
    if (isNew) { g.id = uid(); g.created = keyDate(); }
    const all = goalsAll(); if (isNew) all.unshift(g); else all[idx] = g;
    goalsSave(all); try { renderHoyDash(); } catch (e) {} try { renderMas(); } catch (e) {}
    openGoals();
  });
  const del = document.getElementById('gl-del');
  if (del) del.addEventListener('click', () => { if (!confirm(t('¿Eliminar este objetivo?'))) return; const all = goalsAll(); all.splice(idx, 1); goalsSave(all); try { renderHoyDash(); } catch (e) {} try { renderMas(); } catch (e) {} openGoals(); });
}

// Objetivos que puso un especialista: se copian a los del atleta y se actualizan si él los cambia.
function asgApplyGoals() {
  const list = asgList().filter(a => a.kind === 'goal'), want = new Map(list.map(a => ['asg_' + a.id, a]));
  let all = goalsAll(), ch = false;
  all = all.filter(g => { if (!g.assigned || want.has(g.id)) return true; ch = true; if (g.done) { g.by = g.assigned.by; delete g.assigned; return true; } return false; });
  want.forEach((a, id) => {
    const sig = asgSig(a), cur = all.find(g => g.id === id), def = JSON.parse(JSON.stringify(a.payload || {}));
    if (cur && cur.assigned && cur.assigned.sig === sig) return;
    const g = Object.assign({}, def, { id, created: cur ? cur.created : keyDate(), assigned: { by: a.author_name || '', role: a.role, sig } });
    if (cur && cur.target === def.target) ['start', 'cur', 'done', 'weeks', 'snap'].forEach(k => { if (cur[k] != null) g[k] = cur[k]; });
    else if (g.type !== 'custom') { g.start = null; const s0 = goalState(g).cur; g.start = s0 == null ? null : s0; }
    if (cur) all[all.indexOf(cur)] = g; else all.unshift(g);
    ch = true;
  });
  if (ch) goalsSave(all);
  return ch;
}
// Vista del especialista: los objetivos del atleta con el avance que su app calculó.
function goalsClientHtml(D) {
  const all = Array.isArray(D.goals) ? D.goals : [];
  if (!all.length) return '';
  const row = g => { const sn = g.snap || { p: g.done ? 100 : 0, c: '—', t: '' }, done = !!g.done || (g.type === 'sessions' && sn.p >= 100);
    return `<div class="hd-goal${done ? ' done' : ''}"><div class="goal-v"><span><b${g.title || g.type === 'pr' ? ' translate="no"' : ''}>${escapeHtml(goalTitle(g))}</b>${g.assigned ? ' <span class="gym-tag">Tuyo</span>' : ''}</span><span translate="no">${escapeHtml(sn.c)} / ${escapeHtml(sn.t)}</span></div><div class="goal-bar"><i style="width:${sn.p}%"></i></div>
      <div class="goal-d"><span>${goalKicker(g)}</span>${g.done ? ` · <span>Logrado el</span> <span translate="no">${escapeHtml(antDate(g.done))}</span>` : ` · <span translate="no">${sn.p}%</span>`}${g.due && !g.done ? ` · <span>Fecha límite</span> <span translate="no">${escapeHtml(antDate(g.due))}</span>` : ''}</div></div>`; };
  return `<div class="sp-card"><div class="sp-card-n">Objetivos</div>${all.filter(g => !g.done).map(row).join('')}${all.filter(g => g.done).map(row).join('')}</div>`;
}

// ============================================================
// FASES DEL PLAN (periodización): volumen, definición, mantenimiento, semana pico…
// Cada fase tiene fechas y, si se quiere, sus propias calorías, macros y ritmo de peso.
// ============================================================
const PHASE_TYPES = [
  ['bulk', 'Volumen', 1], ['cut', 'Definición', -1], ['maintain', 'Mantenimiento', 0], ['recomp', 'Recomposición', 0], ['reverse', 'Dieta inversa', 0],
  ['peak', 'Semana pico', 0], ['deload', 'Descarga', 0], ['comp', 'Competencia', 0], ['off', 'Transición', 0],
];
const PHASE_BY = {}; PHASE_TYPES.forEach(x => { PHASE_BY[x[0]] = x; });
function phasesAll() { const p = S.get('phases', null); return (Array.isArray(p) ? p : []).slice().sort((a, b) => String(a.start).localeCompare(String(b.start))); }
function phasesSave(p) { S.set('phases', p); }
function phaseName(ph) { return ph.name || (PHASE_BY[ph.type] || [])[1] || ''; }
function phaseAt(list, key) { key = key || keyDate(); const hit = list.filter(p => p.start <= key && key <= p.end); return hit.find(p => p.assigned) || hit[0] || null; }
function phaseCurrent(key) { return phaseAt(phasesAll(), key); }
function phaseDays(a, b) { return Math.round((parseKey(b).getTime() - parseKey(a).getTime()) / 864e5); }
function phaseInfo(ph, key) {
  key = key || keyDate(); const total = phaseDays(ph.start, ph.end) + 1, gone = Math.max(0, Math.min(total, phaseDays(ph.start, key) + 1));
  return { total, gone, left: Math.max(0, total - gone), weeks: Math.max(1, Math.ceil(total / 7)), week: Math.max(1, Math.min(Math.ceil(total / 7), Math.ceil(gone / 7))), pct: Math.round(gone / total * 100), state: key < ph.start ? 'next' : key > ph.end ? 'past' : 'now' };
}
// ¿El peso va al ritmo que pide la fase? (ritmo en % del peso por semana)
function phasePace(ph, wlog) {
  if (ph.rate == null || ph.rate === '') return null;
  const tr = wtTrend(wlog || {}); if (tr.rate == null) return null;
  const want = +ph.rate, d = tr.rate - want;
  if (Math.abs(d) <= 0.25) return { cls: 'ok', text: 'En ritmo', rate: tr.rate };
  const slow = want < 0 ? d > 0 : want > 0 ? d < 0 : null;
  return { cls: 'warn', text: slow == null ? 'Fuera de ritmo' : slow ? 'Más lento que el plan' : 'Más rápido que el plan', rate: tr.rate };
}
function phaseRateText(r) { r = +r; return `${r > 0 ? '+' : ''}${(Math.round(r * 100) / 100).toLocaleString(_loc())} %`; }
function phaseDatesText(ph) { const f = { day: 'numeric', month: 'short' }; try { return parseKey(ph.start).toLocaleDateString(_loc(), f) + ' – ' + parseKey(ph.end).toLocaleDateString(_loc(), Object.assign({ year: 'numeric' }, f)); } catch (e) { return ph.start + ' – ' + ph.end; } }
function phaseMacroLine(ph) {
  if (!(+ph.kcal > 0)) return '';
  return `<span translate="no">${(+ph.kcal).toLocaleString(_loc())} kcal</span>${+ph.protein ? ` · <span translate="no" style="color:var(--c-prot)">P ${+ph.protein} g</span>` : ''}${+ph.carbs ? ` · <span translate="no" style="color:var(--c-carb)">C ${+ph.carbs} g</span>` : ''}${+ph.fat ? ` · <span translate="no" style="color:var(--c-fat)">G ${+ph.fat} g</span>` : ''}`;
}
function phaseTimelineHtml(list, key) {
  if (!list.length) return '';
  key = key || keyDate(); const a = list[0].start, b = list.reduce((m, p) => p.end > m ? p.end : m, list[0].end), span = phaseDays(a, b) + 1;
  const pos = k => Math.max(0, Math.min(100, phaseDays(a, k) / span * 100));
  return `<div class="ph-tl">${list.map(p => `<i class="tl-${phaseInfo(p, key).state}" style="left:${pos(p.start)}%;width:${Math.max(1.5, (phaseDays(p.start, p.end) + 1) / span * 100)}%"></i>`).join('')}${key >= a && key <= b ? `<b style="left:${pos(key)}%"></b>` : ''}</div>
    <div class="ph-tl-l"><span translate="no">${escapeHtml(antDate(a))}</span><span translate="no">${escapeHtml(antDate(b))}</span></div>`;
}
function phaseCardHtml(ph, i, key, wlog) {
  const inf = phaseInfo(ph, key), pace = inf.state === 'now' ? phasePace(ph, wlog) : null, mac = phaseMacroLine(ph);
  return `<div class="goal phz phz-${inf.state}" data-ph="${i}"><div class="goal-top"><div><div class="goal-k">${(PHASE_BY[ph.type] || [])[1] || ''}${ph.assigned ? ` · <span>De</span> <span translate="no">${escapeHtml(ph.assigned.by || '')}</span>` : ''}</div><div class="goal-t"${ph.name ? ' translate="no"' : ''}>${escapeHtml(phaseName(ph))}</div></div>
      ${inf.state === 'now' ? '<span class="hd-badge ok">Ahora</span>' : inf.state === 'next' ? '<span class="hd-badge">Próxima</span>' : '<span class="hd-badge">Terminada</span>'}</div>
    <div class="goal-d" translate="no">${escapeHtml(phaseDatesText(ph))} · ${inf.weeks} <span translate="yes">${inf.weeks === 1 ? 'semana' : 'semanas'}</span></div>
    ${inf.state === 'now' ? `<div class="goal-v"><span><span>Semana</span> <b translate="no">${inf.week}</b> <span>de</span> <b translate="no">${inf.weeks}</b></span><span><span>Faltan</span> <b translate="no">${inf.left}</b> <span>${inf.left === 1 ? 'día' : 'días'}</span></span></div><div class="goal-bar"><i style="width:${inf.pct}%"></i></div>` : ''}
    ${mac ? `<div class="goal-d">${mac}</div>` : ''}
    ${ph.rate != null && ph.rate !== '' ? `<div class="goal-d"><span>Ritmo de peso</span>: <span translate="no">${phaseRateText(ph.rate)}</span> <span>por semana</span>${pace ? ` · <span class="gym-tag ${pace.cls === 'ok' ? 'good' : 'warn'}">${pace.text}</span> <span translate="no">(${phaseRateText(pace.rate)})</span>` : ''}</div>` : ''}
    ${ph.note ? `<div class="goal-d" style="color:var(--text-2)" translate="no">${escapeHtml(ph.note)}</div>` : ''}</div>`;
}
function phasesSummary() { const c = phaseCurrent(); if (!c) return ''; const inf = phaseInfo(c); return `${phaseName(c)} · ${t('Semana')} ${inf.week}/${inf.weeks}`; }
function phaseHoyCard() {
  const list = phasesAll(), c = phaseAt(list), key = keyDate();
  if (!c) { const nx = list.find(p => p.start > key); if (!nx) return ''; return `<div class="hd-card" data-hd-phase="1" style="cursor:pointer;"><div class="hd-k"><span>Fase del plan</span><span class="hd-badge">Próxima</span></div><div class="hd-big" style="font-size:20px;"${nx.name ? ' translate="no"' : ''}>${escapeHtml(phaseName(nx))}</div><div class="goal-d"><span>Empieza el</span> <span translate="no">${escapeHtml(antDate(nx.start))}</span></div></div>`; }
  const inf = phaseInfo(c), pace = phasePace(c, S.get('weight_log', {}) || {}), mac = phaseMacroLine(c), nx = list.find(p => p.start > c.end);
  return `<div class="hd-card" data-hd-phase="1" style="cursor:pointer;"><div class="hd-k"><span>Fase del plan</span>${pace ? `<span class="hd-badge ${pace.cls}">${pace.text}</span>` : ''}</div>
    <div class="hd-big" style="font-size:20px;"${c.name ? ' translate="no"' : ''}>${escapeHtml(phaseName(c))}</div>
    <div class="goal-v" style="margin-top:6px;"><span><span>Semana</span> <b translate="no">${inf.week}</b> <span>de</span> <b translate="no">${inf.weeks}</b></span><span><span>Faltan</span> <b translate="no">${inf.left}</b> <span>${inf.left === 1 ? 'día' : 'días'}</span></span></div>
    <div class="goal-bar"><i style="width:${inf.pct}%"></i></div>
    ${mac ? `<div class="goal-d">${mac}</div>` : ''}${nx ? `<div class="goal-d"><span>Sigue</span>: <span${nx.name ? ' translate="no"' : ''}>${escapeHtml(phaseName(nx))}</span> · <span translate="no">${escapeHtml(antDate(nx.start))}</span></div>` : ''}</div>`;
}
// Lista y editor. Sin ctx trabaja sobre las fases propias; con ctx (especialista) sobre el plan que le asigna al atleta.
function openPhases(ctx) {
  const mine = !ctx, list = mine ? phasesAll() : ctx.list.slice().sort((a, b) => String(a.start).localeCompare(String(b.start)));
  const wlog = mine ? (S.get('weight_log', {}) || {}) : (ctx.wlog || {});
  openSheet(mine ? 'Fases del plan' : 'Fases del plan', `<button class="btn-primary" id="ph-new" style="width:100%;margin-bottom:14px;">Nueva fase</button>
    ${list.length ? phaseTimelineHtml(list) + list.map((p, i) => phaseCardHtml(p, i, null, wlog)).join('') : `<div class="sp-empty">${mine ? 'Divide tu plan en etapas con fechas: volumen, definición, mantenimiento, semana pico. Cada fase puede tener sus calorías y su ritmo de peso, y la app cambia sola tus metas cuando toca.' : 'Arma las etapas del plan de tu atleta. Las ve en su app y sus metas de nutrición cambian solas con cada fase.'}</div>`}`);
  document.getElementById('ph-new').addEventListener('click', () => { const last = list[list.length - 1], st = last ? keyDate(new Date(parseKey(last.end).getTime() + 864e5)) : keyDate(); openPhaseForm({ type: 'cut', start: st, end: keyDate(new Date(parseKey(st).getTime() + 83 * 864e5)) }, -1, list, ctx); });
  document.querySelectorAll('[data-ph]').forEach(c => c.addEventListener('click', () => openPhaseForm(list[+c.dataset.ph], +c.dataset.ph, list, ctx)));
}
function openPhaseForm(p0, idx, list, ctx) {
  const ph = JSON.parse(JSON.stringify(p0)), isNew = idx < 0, ro = !ctx && !!ph.assigned;
  const inp = (id, label, unit, val, ph2, mode) => `<label class="ant-f"><span>${label}</span><span class="ant-in"><input id="${id}" inputmode="${mode || 'decimal'}" value="${val == null ? '' : escapeHtml(String(val))}" placeholder="${ph2 || ''}"${ro ? ' disabled' : ''}>${unit ? `<i>${unit}</i>` : ''}</span></label>`;
  openSheet(isNew ? 'Nueva fase' : ro ? 'Fase del plan' : 'Editar fase', `<div class="ant-ed act-ed">
    ${ro ? '<div class="fit-note" style="margin-bottom:12px;">Esta fase la definió tu especialista; solo él puede cambiarla.</div>' : ''}
    <div class="chips small" id="ph-type" style="flex-wrap:wrap;margin-bottom:12px;">${PHASE_TYPES.map(([k, n]) => `<button type="button" class="chip${ph.type === k ? ' selected' : ''}" data-v="${k}"${ro ? ' disabled' : ''}>${n}</button>`).join('')}</div>
    <label class="ant-f col"><span>Nombre (opcional)</span><input class="act-tx" id="ph-name" maxlength="50" value="${escapeHtml(ph.name || '')}" placeholder="Ej. Definición rumbo a la competencia"${ro ? ' disabled' : ''}></label>
    <label class="ant-f"><span>Empieza</span><span class="ant-in"><input type="date" id="ph-start" value="${escapeHtml(ph.start || '')}"${ro ? ' disabled' : ''}></span></label>
    <label class="ant-f"><span>Termina</span><span class="ant-in"><input type="date" id="ph-end" value="${escapeHtml(ph.end || '')}"${ro ? ' disabled' : ''}></span></label>
    <div class="goal-d" id="ph-len" style="margin:0 0 6px;"></div>
    <h3 class="ant-sub">Nutrición de la fase (opcional)</h3>
    ${inp('ph-kcal', 'Calorías por día', 'kcal', ph.kcal || '', '', 'numeric')}${inp('ph-p', 'Proteína', 'g', ph.protein || '', '', 'numeric')}${inp('ph-c', 'Carbohidratos', 'g', ph.carbs || '', '', 'numeric')}${inp('ph-f', 'Grasa', 'g', ph.fat || '', '', 'numeric')}
    <div class="goal-d" style="margin:0 0 6px;">Si pones calorías, mientras dure la fase reemplazan la meta diaria de la pestaña Comida.</div>
    <h3 class="ant-sub">Ritmo de peso (opcional)</h3>
    ${inp('ph-rate', 'Cambio de peso por semana', '%', ph.rate == null ? '' : ph.rate, '-0.7', 'text')}
    <div class="goal-d" style="margin:0 0 6px;">En % de tu peso. Negativo para bajar, positivo para subir. Se compara con tu promedio de 7 días.</div>
    <label class="ant-f col"><span>Notas</span><textarea class="act-tx" id="ph-note" rows="3" maxlength="400"${ro ? ' disabled' : ''}>${escapeHtml(ph.note || '')}</textarea></label>
    ${!isNew && !ro ? '<button class="btn-secondary" id="ph-del" style="width:100%;margin-top:12px;color:#DC2626;">Eliminar fase</button>' : ''}<p class="auth-msg" id="ph-msg"></p></div>`, ro ? null : async () => {
    const msg = document.getElementById('ph-msg'), v = id => document.getElementById(id).value.trim(), n = id => { const x = parseFloat(v(id).replace(',', '.').replace('−', '-')); return isFinite(x) ? x : null; };
    ph.type = (document.querySelector('#ph-type .chip.selected') || {}).dataset ? document.querySelector('#ph-type .chip.selected').dataset.v : ph.type;
    ph.name = v('ph-name'); ph.start = v('ph-start'); ph.end = v('ph-end'); ph.note = v('ph-note');
    if (!ph.start || !ph.end || ph.end < ph.start) { msg.textContent = t('Revisa las fechas: la fase debe terminar después de empezar.'); return; }
    if (list.some((o, i) => i !== idx && !(mineOnly(o)) && o.start <= ph.end && ph.start <= o.end)) { msg.textContent = t('Esas fechas se enciman con otra fase.'); return; }
    ph.kcal = n('ph-kcal'); ph.protein = n('ph-p'); ph.carbs = n('ph-c'); ph.fat = n('ph-f'); ph.rate = n('ph-rate');
    if (ph.kcal != null && (ph.kcal < 800 || ph.kcal > 8000)) { msg.textContent = t('Revisa los números: alguno está fuera de rango.'); return; }
    if (ph.rate != null && Math.abs(ph.rate) > 3) { msg.textContent = t('Revisa los números: alguno está fuera de rango.'); return; }
    ['kcal', 'protein', 'carbs', 'fat', 'rate', 'name', 'note'].forEach(k => { if (ph[k] == null || ph[k] === '') delete ph[k]; });
    if (isNew) ph.id = uid();
    const out = list.slice(); if (isNew) out.push(ph); else out[idx] = ph;
    await phasesCommit(out, ctx, msg);
  });
  function mineOnly(o) { return !ctx && !!o.assigned !== !!ph.assigned; } // las fases propias no chocan con las del especialista (mandan las de él)
  const len = () => { const a = document.getElementById('ph-start').value, b = document.getElementById('ph-end').value, el = document.getElementById('ph-len'); if (!a || !b || b < a) { el.textContent = ''; return; } const d = phaseDays(a, b) + 1; el.innerHTML = `<span translate="no">${Math.ceil(d / 7)}</span> <span>${Math.ceil(d / 7) === 1 ? 'semana' : 'semanas'}</span> · <span translate="no">${d}</span> <span>${d === 1 ? 'día' : 'días'}</span>`; };
  ['ph-start', 'ph-end'].forEach(id => document.getElementById(id).addEventListener('change', len)); len();
  document.querySelectorAll('#ph-type .chip').forEach(c => c.addEventListener('click', () => { document.querySelectorAll('#ph-type .chip').forEach(x => x.classList.toggle('selected', x === c)); }));
  const del = document.getElementById('ph-del');
  if (del) del.addEventListener('click', async () => { if (!confirm(t('¿Eliminar esta fase?'))) return; const out = list.slice(); out.splice(idx, 1); await phasesCommit(out, ctx, document.getElementById('ph-msg')); });
}
async function phasesCommit(out, ctx, msg) {
  if (!ctx) { phasesSave(out); try { renderHoyDash(); } catch (e) {} try { renderMas(); } catch (e) {} try { renderComida(); } catch (e) {} openPhases(); return; }
  const sv = document.getElementById('sheet-save'); if (sv) sv.disabled = true;
  try { await ctx.save(out); ctx.list = out; if (sv) sv.disabled = false; openPhases(ctx); } catch (e) { if (msg) msg.textContent = authErr(e.code); if (sv) sv.disabled = false; }
}
// Fases que definió un especialista: reemplazan a las suyas anteriores en el teléfono del atleta.
function asgApplyPhases() {
  const a = asgList().filter(x => x.kind === 'phase').sort((x, y) => String(y.created_at).localeCompare(String(x.created_at)))[0];
  const all = S.get('phases', null), cur = Array.isArray(all) ? all : [], own = cur.filter(p => !p.assigned), had = cur.filter(p => p.assigned);
  const sig = a ? asgSig(a) : '';
  if (!a) { if (!had.length) return false; phasesSave(own); return true; }
  if (had.length && had.every(p => p.assigned.sig === sig) && had.length === ((a.payload || {}).phases || []).length) return false;
  const inc = ((a.payload || {}).phases || []).map(p => Object.assign({}, p, { id: 'asg_' + (p.id || uid()), assigned: { by: a.author_name || '', role: a.role, sig } }));
  phasesSave(own.concat(inc));
  return true;
}
function asgApplyPro() { let ch = false; try { ch = asgApplyGoals() || ch; } catch (e) {} try { ch = asgApplyPhases() || ch; } catch (e) {} return ch; }
// Metas de nutrición de la fase en curso (si la fase las define).
function phaseTargets() { try { const c = phaseCurrent(); return c && +c.kcal > 0 ? { kcal: +c.kcal, protein: +c.protein || 0, carbs: +c.carbs || 0, fat: +c.fat || 0, name: phaseName(c) } : null; } catch (e) { return null; } }
// Vista del especialista: fase en curso del atleta.
function phaseClientHtml(D) {
  const list = (Array.isArray(D.phases) ? D.phases : []).slice().sort((a, b) => String(a.start).localeCompare(String(b.start)));
  if (!list.length) return '';
  const c = phaseAt(list), wl = D.weight_log || {};
  return `<div class="sp-card"><div class="sp-card-n">Fases del plan</div>${phaseTimelineHtml(list)}${c ? phaseCardHtml(c, 0, null, wl).replace('class="goal phz', 'class="goal phz flat') : '<div class="sp-card-d">Sin fase en curso hoy.</div>'}</div>`;
}
// Botones del especialista en la ficha del atleta: poner objetivo, armar fases, editar lo ya asignado.
function proWireClient(l, asg, D) {
  const s = authGet() || {}, roles = linkRoles(l), back = () => { closeSheet(); _sp.tab = 'plans'; spOpenClient(l); };
  const post = (kind, name, payload) => sbRest('assignments', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: { client_id: l.client_id, role: roles.includes('coach') ? 'coach' : roles[0], kind, name: String(name || kind).slice(0, 80), payload, author_name: s.name || s.user } });
  const patch = (id, name, payload) => sbRest('assignments?id=eq.' + encodeURIComponent(id), { method: 'PATCH', body: { name: String(name).slice(0, 80), payload }, headers: { Prefer: 'return=minimal' } });
  const routines = Array.isArray(D.gym_routines) ? D.gym_routines : [];
  const gb = document.getElementById('sp-goal-new');
  if (gb) gb.addEventListener('click', () => openGoalTypePicker({ routines, save: async (g, name) => { await post('goal', name, g); if (l.id) { try { await ntPost(l.id, t('Te puse un objetivo nuevo.'), { t: 'asg', kind: 'goal', name }); } catch (e) {} } back(); } }));
  document.querySelectorAll('[data-asg-goal]').forEach(b => b.addEventListener('click', () => { const a = asg.find(x => x.id === b.dataset.asgGoal); if (a) openGoalForm(a.payload, 0, { routines, save: async (g, name) => { await patch(a.id, name, g); back(); } }); }));
  const phA = asg.find(x => x.kind === 'phase');
  const openPh = () => { const ctx = { list: phA ? ((phA.payload || {}).phases || []) : [], wlog: D.weight_log || {}, id: phA ? phA.id : null, dirty: false };
    ctx.save = async out => { const payload = { phases: out.map(p => { const c = Object.assign({}, p); delete c.assigned; return c; }) };
      if (ctx.id) await patch(ctx.id, 'Fases del plan', payload);
      else { const r = await sbRest('assignments', { method: 'POST', headers: { Prefer: 'return=representation' }, body: { client_id: l.client_id, role: roles.includes('coach') ? 'coach' : 'nutriologo', kind: 'phase', name: 'Fases del plan', payload, author_name: s.name || s.user } }); ctx.id = r && r[0] && r[0].id; if (!ctx.id) { try { const q = await sbRest('assignments?select=id&client_id=eq.' + encodeURIComponent(l.client_id) + '&specialist_id=eq.' + encodeURIComponent(s.uid) + '&kind=eq.phase&status=eq.active&order=created_at.desc&limit=1'); ctx.id = q && q[0] && q[0].id; } catch (e) {} } if (l.id) { try { await ntPost(l.id, t('Te armé las fases de tu plan.'), { t: 'asg', kind: 'phase', name: 'Fases del plan' }); } catch (e) {} } }
      ctx.dirty = true; };
    openPhases(ctx);
    const obs = setInterval(() => { if (!document.getElementById('sheet').classList.contains('show')) { clearInterval(obs); if (ctx.dirty) { _sp.tab = 'plans'; spOpenClient(l); } } }, 400); };
  const pb = document.getElementById('sp-phase-edit'); if (pb) pb.addEventListener('click', openPh);
  document.querySelectorAll('[data-asg-phase]').forEach(b => b.addEventListener('click', openPh));
}

// ============================================================
// FOTOS DE COMIDAS — bucket privado `meals` + public.meal_photos.
// La foto queda pegada a una comida del día; la ve el nutriólogo del atleta.
// ============================================================
const _mp = { rows: {}, at: {}, urls: {} };
function mpCache(day) { if (_mp.rows[day]) return _mp.rows[day]; try { const a = JSON.parse(localStorage.getItem('__mp') || '{}'); return Array.isArray(a[day]) ? a[day] : []; } catch (e) { return []; } }
function mpStore(day, rows) {
  _mp.rows[day] = rows;
  try { const a = JSON.parse(localStorage.getItem('__mp') || '{}'); a[day] = rows; Object.keys(a).sort().slice(0, -10).forEach(k => delete a[k]); localStorage.setItem('__mp', JSON.stringify(a)); } catch (e) {}
}
async function mpUrl(path) {
  if (_mp.urls[path]) return _mp.urls[path];
  const r = await sbRaw('/storage/v1/object/authenticated/meals/' + path.split('/').map(encodeURIComponent).join('/'));
  return (_mp.urls[path] = URL.createObjectURL(await r.blob()));
}
function mpFill(root) { root.querySelectorAll('img[data-mp-img]').forEach(async im => { try { im.src = await mpUrl(im.dataset.mpImg); } catch (e) { im.alt = '—'; } }); }
function mpMealName(mid) { const m = (typeof MEALS !== 'undefined' ? MEALS : []).find(x => x.id === mid); return m ? m.name : mid; }
// Pinta las miniaturas dentro de cada tarjeta de comida y refresca desde el servidor.
function mpMount() {
  const day = foodViewDate, paint = () => {
    const rows = mpCache(day);
    document.querySelectorAll('#food-meals .mc-photos').forEach(box => {
      const mine = rows.filter(r => r.meal === box.dataset.mp);
      box.innerHTML = mine.map(r => `<button class="mp-t" data-mp-open="${r.id}"><img data-mp-img="${escapeHtml(r.path)}" alt=""></button>`).join('');
      box.style.display = mine.length ? '' : 'none';
      box.querySelectorAll('[data-mp-open]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); mpOpen(rows.find(r => r.id === b.dataset.mpOpen), true); }));
      mpFill(box);
    });
  };
  paint();
  document.querySelectorAll('#food-meals [data-mp-add]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); mpPick(b.dataset.mpAdd); }));
  const s = authGet();
  if (!s || !s.uid || navigator.onLine === false || Date.now() - (_mp.at[day] || 0) < 60000) return;
  _mp.at[day] = Date.now();
  sbRest('meal_photos?select=id,path,day,meal,note&user_id=eq.' + encodeURIComponent(s.uid) + '&day=eq.' + day + '&order=created_at.asc').then(rows => {
    rows = rows || []; if (JSON.stringify(rows) === JSON.stringify(mpCache(day))) return; mpStore(day, rows); if (foodViewDate === day) paint();
  }).catch(() => {});
}
function mpToast(msg) { const el = document.getElementById('mp-msg'); if (el) { el.textContent = msg; el.style.display = msg ? '' : 'none'; } }
// Elegir o tomar la foto y subirla. Sin mid pregunta primero a qué comida va.
function mpPick(mid) {
  const s = authGet();
  if (!s || !s.uid) { alert(t('Inicia sesión para guardar fotos.')); return; }
  if (navigator.onLine === false) { alert(t('Necesitas conexión para subir la foto.')); return; }
  if (!mid) {
    openSheet('Foto del plato', `<p class="fit-note" style="margin:0 0 12px;">La foto queda guardada en esa comida del día. Tu nutriólogo la ve junto con lo que registras.</p>
      <div class="goal-types">${MEALS.map(m => `<button data-mp-meal="${m.id}"><b>${m.name}</b></button>`).join('')}</div>`);
    document.querySelectorAll('[data-mp-meal]').forEach(b => b.addEventListener('click', () => { closeSheet(); mpPick(b.dataset.mpMeal); }));
    return;
  }
  let file = document.getElementById('mp-file');
  if (!file) { file = document.createElement('input'); file.type = 'file'; file.accept = 'image/*'; file.id = 'mp-file'; file.style.display = 'none'; document.body.appendChild(file); }
  file.value = '';
  file.onchange = async () => {
    const f = file.files && file.files[0]; if (!f) return;
    const day = foodViewDate; mpToast(t('Subiendo…'));
    try {
      const blob = await photoShrink(f), path = s.uid + '/' + day + '-' + uid() + '.jpg';
      await sbRaw('/storage/v1/object/meals/' + path, { method: 'POST', headers: { 'Content-Type': 'image/jpeg' }, body: blob });
      await sbRest('meal_photos', { method: 'POST', body: { path, day, meal: mid }, headers: { Prefer: 'return=minimal' } });
      try { _mp.urls[path] = URL.createObjectURL(blob); } catch (e) {}
      const rows = await sbRest('meal_photos?select=id,path,day,meal,note&user_id=eq.' + encodeURIComponent(s.uid) + '&day=eq.' + day + '&order=created_at.asc') || [];
      mpStore(day, rows); _mp.at[day] = Date.now(); mpToast('');
      try { renderComida(); } catch (e) {}
    } catch (e) { mpToast(e && e.code ? authErr(e.code) : t('No se pudo leer la imagen.')); setTimeout(() => mpToast(''), 4000); }
  };
  file.click();
}
function mpOpen(r, own) {
  if (!r) return;
  openSheet(mpMealName(r.meal), `<div class="ph-view"><img data-mp-img="${escapeHtml(r.path)}" alt="">
    <div class="goal-d" style="margin:10px 0;" translate="no">${escapeHtml(antDate(r.day))}</div>
    ${own ? '<button class="btn-secondary" id="mp-del" style="width:100%;color:#DC2626;">Eliminar foto</button>' : ''}<div class="auth-msg" id="mp-vmsg"></div></div>`);
  mpFill(document.getElementById('sheet-body'));
  const del = document.getElementById('mp-del');
  if (del) del.addEventListener('click', async () => {
    if (!confirm(t('¿Eliminar esta foto?'))) return;
    try {
      await sbRaw('/storage/v1/object/meals/' + r.path.split('/').map(encodeURIComponent).join('/'), { method: 'DELETE' });
      await sbRest('meal_photos?id=eq.' + encodeURIComponent(r.id), { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
    } catch (e) { document.getElementById('mp-vmsg').textContent = authErr(e.code); return; }
    mpStore(r.day, mpCache(r.day).filter(x => x.id !== r.id)); closeSheet(); try { renderComida(); } catch (e) {}
  });
}
// Vista del nutriólogo: fotos de comidas del atleta, por día.
async function mpRenderFor(l, el) {
  let rows = [];
  try { rows = await sbRest('meal_photos?select=id,path,day,meal&user_id=eq.' + encodeURIComponent(l.client_id) + '&order=day.desc,created_at.asc&limit=60') || []; } catch (e) { return; }
  if (!el.isConnected) return;
  if (!rows.length) { el.innerHTML = '<div class="sp-card"><div class="sp-card-n">Fotos de comidas</div><div class="sp-card-d">Todavía no sube fotos de sus comidas.</div></div>'; return; }
  const days = []; rows.forEach(r => { let d = days.find(x => x.k === r.day); if (!d) days.push(d = { k: r.day, rows: [] }); d.rows.push(r); });
  el.innerHTML = `<div class="sp-card"><div class="sp-card-n">Fotos de comidas</div>${days.map(d => `<div class="lk-h" style="margin-top:12px;" translate="no">${escapeHtml(cdFmtDay(d.k))}</div>
    <div class="ph-grid mp-grid">${d.rows.map(r => `<button class="ph-t" data-mp-open="${r.id}"><img data-mp-img="${escapeHtml(r.path)}" alt=""><span>${mpMealName(r.meal)}</span></button>`).join('')}</div>`).join('')}</div>`;
  el.querySelectorAll('[data-mp-open]').forEach(b => b.addEventListener('click', () => mpOpen(rows.find(r => r.id === b.dataset.mpOpen), false)));
  mpFill(el);
}

// ============================================================
// PORCIONES CON LA MANO — estimar sin báscula.
// Valores aproximados por porción (método de la mano; referencia: Precision Nutrition).
// ============================================================
const HAND_P = [
  ['palm', 'Palma', 'Proteína: carne, pollo, pescado, huevo', { kcal: 145, protein: 24, carbs: 2, fat: 4.5 }, 'var(--c-prot)'],
  ['cup', 'Puñado', 'Carbohidrato: arroz, pasta, frijol, fruta', { kcal: 120, protein: 3, carbs: 25, fat: 1 }, 'var(--c-carb)'],
  ['thumb', 'Pulgar', 'Grasa: aceite, aguacate, nueces, queso', { kcal: 100, protein: 2, carbs: 2, fat: 9 }, 'var(--c-fat)'],
  ['fist', 'Puño', 'Verdura', { kcal: 25, protein: 1.5, carbs: 5, fat: 0 }, 'var(--text-3)'],
];
function handTotals(q) { const o = { kcal: 0, protein: 0, carbs: 0, fat: 0 }; HAND_P.forEach(([k, , , m]) => { const n = +q[k] || 0; o.kcal += m.kcal * n; o.protein += m.protein * n; o.carbs += m.carbs * n; o.fat += m.fat * n; }); return o; }
function openHandPortions(mid0) {
  const h = new Date().getHours(); let mid = mid0 || (h < 11 ? 'breakfast' : h < 17 ? 'lunch' : h < 22 ? 'dinner' : 'snack');
  const q = { palm: 0, cup: 0, thumb: 0, fist: 0 };
  openSheet('Porciones con la mano', `<p class="fit-note" style="margin:0 0 12px;">Para cuando no hay báscula: usa tu mano como medida. Es una estimación, no un pesaje.</p>
    <div class="chips small" id="hp-meal" style="margin-bottom:12px;flex-wrap:wrap;">${MEALS.map(m => `<button type="button" class="chip${m.id === mid ? ' selected' : ''}" data-v="${m.id}">${m.name}</button>`).join('')}</div>
    ${HAND_P.map(([k, n, d, m, c]) => `<div class="hp-row"><i style="background:${c}"></i><div class="hp-t"><b>${n}</b><span>${d}</span></div>
      <div class="hp-st"><button type="button" data-hp="${k}" data-d="-0.5" aria-label="−">−</button><b id="hp-${k}" translate="no">0</b><button type="button" data-hp="${k}" data-d="0.5" aria-label="+">+</button></div></div>`).join('')}
    <div class="ant-live" style="grid-template-columns:repeat(4,1fr);position:static;margin-top:14px;"><div><span>kcal</span><b id="hp-k" translate="no">0</b></div><div><span>Proteína</span><b id="hp-p" translate="no">0 g</b></div><div><span>Carbos</span><b id="hp-c" translate="no">0 g</b></div><div><span>Grasa</span><b id="hp-f" translate="no">0 g</b></div></div>
    <p class="auth-msg" id="hp-msg"></p>`, () => {
    if (!HAND_P.some(([k]) => q[k] > 0)) { document.getElementById('hp-msg').textContent = t('Agrega al menos una porción.'); return; }
    const log = mealLog(), d = log[foodViewDate] = log[foodViewDate] || {};
    HAND_P.forEach(([k, n, , m]) => { if (!(q[k] > 0)) return;
      d[mid] = (d[mid] || []).concat([{ id: uid(), name: `${t(n)} × ${q[k].toLocaleString(_loc())}`, grams: 100, hand: k, portion: t('Porción con la mano'),
        per100g: { kcal: m.kcal * q[k], protein: m.protein * q[k], carbs: m.carbs * q[k], fat: m.fat * q[k] } }]); });
    saveMealLog(log); closeSheet(); try { renderComida(); } catch (e) {} try { renderHoyDash(); } catch (e) {}
  });
  const paint = () => { HAND_P.forEach(([k]) => { document.getElementById('hp-' + k).textContent = q[k].toLocaleString(_loc()); }); const tt = handTotals(q);
    document.getElementById('hp-k').textContent = Math.round(tt.kcal); document.getElementById('hp-p').textContent = Math.round(tt.protein) + ' g'; document.getElementById('hp-c').textContent = Math.round(tt.carbs) + ' g'; document.getElementById('hp-f').textContent = Math.round(tt.fat) + ' g'; };
  document.querySelectorAll('[data-hp]').forEach(b => b.addEventListener('click', () => { q[b.dataset.hp] = Math.max(0, Math.min(10, q[b.dataset.hp] + (+b.dataset.d))); paint(); }));
  document.querySelectorAll('#hp-meal .chip').forEach(c => c.addEventListener('click', () => { mid = c.dataset.v; document.querySelectorAll('#hp-meal .chip').forEach(x => x.classList.toggle('selected', x === c)); }));
}

// ============================================================
// FOTOS DE PROGRESO POR POSE — comparar lado a lado y adjuntarlas al check-in.
// ============================================================
const POSES = [['front', 'Frente'], ['side', 'Perfil'], ['back', 'Espalda'], ['free', 'Libre']];
const POSE_N = {}; POSES.forEach(x => { POSE_N[x[0]] = x[1]; });
function poseChipsHtml(cur) { return `<div class="chips small" id="ph-pose" style="margin:0 0 10px;flex-wrap:wrap;">${POSES.map(([k, n]) => `<button type="button" class="chip${k === cur ? ' selected' : ''}" data-v="${k}">${n}</button>`).join('')}</div>`; }
// Comparador: elige pose y dos fechas. rows viene de más reciente a más antigua.
function poseCompareMount(box, rows) {
  if (!box) return;
  const byPose = k => rows.filter(r => (r.pose || 'free') === k), avail = POSES.map(x => x[0]).filter(k => byPose(k).length >= 2);
  if (!avail.length) { box.innerHTML = rows.length >= 2 ? '' : ''; if (rows.length) box.innerHTML = '<div class="fit-note" style="margin:12px 0 0;">Para comparar, sube al menos dos fotos de la misma pose en fechas distintas.</div>'; return; }
  let pose = avail[0], a = null, b = null;
  const paint = () => {
    const list = byPose(pose); if (!a || !list.includes(a)) a = list[list.length - 1]; if (!b || !list.includes(b)) b = list[0];
    const opt = sel => list.map((r, i) => `<option value="${i}"${r === sel ? ' selected' : ''}>${escapeHtml(photoDay(r.taken_on))}</option>`).join('');
    box.innerHTML = `<div class="lk-h">Comparar</div>
      <div class="chips small" style="margin:0 0 8px;flex-wrap:wrap;">${avail.map(k => `<button type="button" class="chip${k === pose ? ' selected' : ''}" data-cmp-pose="${k}">${POSE_N[k]}</button>`).join('')}</div>
      <div class="ph-cmp"><figure><img data-ph="${escapeHtml(a.path)}" alt=""></figure><figure><img data-ph="${escapeHtml(b.path)}" alt=""></figure></div>
      <div class="ph-cmp" style="margin-top:6px;"><select class="ph-sel" data-cmp="a" translate="no">${opt(a)}</select><select class="ph-sel" data-cmp="b" translate="no">${opt(b)}</select></div>`;
    photoFill(box);
    box.querySelectorAll('[data-cmp-pose]').forEach(c => c.addEventListener('click', () => { pose = c.dataset.cmpPose; a = b = null; paint(); }));
    box.querySelectorAll('[data-cmp]').forEach(sl => sl.addEventListener('change', () => { if (sl.dataset.cmp === 'a') a = list[+sl.value]; else b = list[+sl.value]; paint(); }));
  };
  paint();
}
function ckWeekEnd(wk) { return keyDate(new Date(parseKey(wk).getTime() + 6 * 864e5)); }
// Dentro del check-in: una casilla por pose con la foto de esa semana, o un "+" para tomarla.
async function ckPhotosMount(el, wk) {
  if (!el) return;
  const s = authGet() || {}; let rows = [];
  try { rows = await sbRest('progress_photos?select=id,path,taken_on,pose,shared&user_id=eq.' + encodeURIComponent(s.uid) + '&taken_on=gte.' + wk + '&taken_on=lte.' + ckWeekEnd(wk) + '&order=created_at.desc') || []; } catch (e) { el.innerHTML = ''; return; }
  if (!el.isConnected) return;
  el.innerHTML = `<div class="ck-ph">${POSES.slice(0, 3).map(([k, n]) => { const r = rows.find(x => x.pose === k);
    return r ? `<figure><img data-ph="${escapeHtml(r.path)}" alt=""><figcaption>${n}${r.shared ? '' : ' · <span>sin compartir</span>'}</figcaption></figure>` : `<button type="button" data-ck-ph="${k}"><b>+</b><span>${n}</span></button>`; }).join('')}</div>
    <div class="ant-hint" id="ck-ph-msg">Las fotos que subas aquí se comparten con tus especialistas. Mismo lugar, misma luz y misma distancia cada semana.</div>
    <input type="file" id="ck-ph-file" accept="image/*" style="display:none;">`;
  photoFill(el);
  const file = el.querySelector('#ck-ph-file'), msg = el.querySelector('#ck-ph-msg'); let pose = null;
  el.querySelectorAll('[data-ck-ph]').forEach(b => b.addEventListener('click', () => { pose = b.dataset.ckPh; file.value = ''; file.click(); }));
  file.addEventListener('change', async () => {
    const f = file.files && file.files[0]; if (!f || !pose) return;
    msg.textContent = t('Subiendo…');
    try {
      const blob = await photoShrink(f), path = s.uid + '/' + keyDate() + '-' + uid() + '.jpg', day = keyDate() > ckWeekEnd(wk) ? ckWeekEnd(wk) : keyDate();
      await sbRaw('/storage/v1/object/progress/' + path, { method: 'POST', headers: { 'Content-Type': 'image/jpeg' }, body: blob });
      await sbRest('progress_photos', { method: 'POST', body: { path, taken_on: day, shared: true, pose }, headers: { Prefer: 'return=minimal' } });
    } catch (e) { msg.textContent = e && e.code ? authErr(e.code) : t('No se pudo leer la imagen.'); return; }
    ckPhotosMount(el, wk);
  });
}
// Revisión del especialista: fotos de esa semana por pose, junto a la anterior de la misma pose.
function ckPhotosReviewHtml(photos, wk) {
  const end = ckWeekEnd(wk), out = [];
  POSES.slice(0, 3).forEach(([k, n]) => {
    const cur = photos.find(p => p.pose === k && p.taken_on >= wk && p.taken_on <= end); if (!cur) return;
    const prev = photos.find(p => p.pose === k && p.taken_on < wk);
    out.push(`<div class="lk-h" style="margin-top:10px;">${n}</div><div class="ph-cmp">${prev ? `<figure><img data-ph="${escapeHtml(prev.path)}" alt=""><figcaption translate="no">${escapeHtml(photoDay(prev.taken_on))}</figcaption></figure>` : ''}<figure><img data-ph="${escapeHtml(cur.path)}" alt=""><figcaption translate="no">${escapeHtml(photoDay(cur.taken_on))}</figcaption></figure></div>`);
  });
  return out.length ? `<div class="sp-card"><div class="sp-card-n">Fotos de la semana</div>${out.join('')}</div>` : '';
}

// ============================================================
// TIEMPO REAL — Supabase Realtime (canal Phoenix por WebSocket, sin librería).
// Avisa al instante de mensajes nuevos (notes) y de lo que asigna un especialista (assignments);
// la app vuelve a pedir los datos con las funciones de siempre. Si el canal falla, sigue la revisión periódica.
// ============================================================
const RT = { ws: null, ref: 1, hb: null, retry: 0, tok: null, timer: null, deb: {} };
function rtSend(topic, event, payload) { try { if (RT.ws && RT.ws.readyState === 1) RT.ws.send(JSON.stringify({ topic, event, payload: payload || {}, ref: String(RT.ref++) })); } catch (e) {} }
function rtSoon(key, fn) { clearTimeout(RT.deb[key]); RT.deb[key] = setTimeout(() => { try { fn(); } catch (e) {} }, 400); }
function rtStop() { clearInterval(RT.hb); clearTimeout(RT.timer); RT.hb = null; if (RT.ws) { try { RT.ws.onclose = null; RT.ws.close(); } catch (e) {} } RT.ws = null; }
async function rtStart() {
  const s = authGet();
  if (!s || !s.uid || !s.refresh || !('WebSocket' in window) || navigator.onLine === false) return;
  if (RT.ws && RT.ws.readyState <= 1) return;
  let tok; try { tok = await authToken(); } catch (e) { return; }
  RT.tok = tok;
  const ws = new WebSocket(SB_URL.replace(/^http/, 'ws') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(SB_KEY) + '&vsn=1.0.0');
  RT.ws = ws;
  ws.onopen = () => {
    RT.retry = 0;
    rtSend('realtime:rutinal-' + s.uid, 'phx_join', { access_token: tok, config: { broadcast: { self: false }, presence: { key: '' }, private: false, postgres_changes: [
      { event: 'INSERT', schema: 'public', table: 'notes' },
      { event: '*', schema: 'public', table: 'assignments', filter: 'client_id=eq.' + s.uid },
    ] } });
    clearInterval(RT.hb);
    RT.hb = setInterval(async () => {
      rtSend('phoenix', 'heartbeat', {});
      // el token de sesión dura poco: al renovarse se le pasa al canal
      try { const t2 = await authToken(); if (t2 !== RT.tok) { RT.tok = t2; rtSend('realtime:rutinal-' + s.uid, 'access_token', { access_token: t2 }); } } catch (e) {}
    }, 25000);
  };
  ws.onmessage = ev => {
    let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
    if (m.event !== 'postgres_changes') return;
    const tbl = m.payload && m.payload.data && m.payload.data.table;
    if (tbl === 'notes') rtSoon('n', () => { msgRefresh(true); if (typeof _ntReload === 'function') _ntReload(); });
    if (tbl === 'assignments') rtSoon('a', () => asgRefresh(true));
  };
  ws.onclose = () => {
    clearInterval(RT.hb); RT.ws = null;
    if (!authLogged()) return;
    RT.retry = Math.min(RT.retry + 1, 6);
    clearTimeout(RT.timer); RT.timer = setTimeout(rtStart, Math.min(60000, 1500 * Math.pow(2, RT.retry)));
  };
  ws.onerror = () => { try { ws.close(); } catch (e) {} };
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && authLogged()) { if (!RT.ws) rtStart(); msgRefresh(true); asgRefresh(true); } });
  window.addEventListener('online', () => { if (authLogged()) rtStart(); });
}

// ============================================================
// PESO CON TENDENCIA Y CHECK-IN SEMANAL
// El peso de un día engaña; lo que se decide es con el promedio de 7 días y su ritmo de cambio.
// El check-in es el reporte semanal del atleta: datos automáticos + cómo se sintió; el especialista responde.
// ============================================================
function wtTrend(log, endKey) {
  log = log || {};
  const end = endKey ? parseKey(endKey) : new Date(), avg = (from, to) => {
    const v = []; for (let i = from; i < to; i++) { const k = keyDate(new Date(end.getTime() - i * 864e5)); if (+log[k] > 0) v.push(+log[k]); }
    return v.length ? { avg: v.reduce((a, b) => a + b, 0) / v.length, n: v.length } : { avg: null, n: 0 };
  };
  const a = avg(0, 7), b = avg(7, 14), o = { avg: a.avg, n: a.n, prevAvg: b.avg, prevN: b.n, diff: null, rate: null };
  if (a.avg != null && b.avg != null) { o.diff = a.avg - b.avg; o.rate = o.diff / b.avg * 100; }
  return o;
}
function wtRateText(tr) { return tr.rate == null ? '' : `${tr.rate > 0 ? '+' : ''}${(Math.round(tr.rate * 100) / 100).toLocaleString(_loc())} %`; }
// Tarjeta de peso de Hoy: último peso, promedio de 7 días y ritmo semanal.
function wtHoyExtra() {
  const tr = wtTrend(S.get('weight_log', {}) || {});
  if (tr.avg == null || tr.n < 2) return '';
  return `<div class="hd-week" style="margin-top:10px;"><div class="hd-w"><b translate="no">${bwDisp(tr.avg)} ${bwUnit()}</b><span>Promedio 7 días</span><small><span translate="no">${tr.n}</span> <span>${tr.n === 1 ? 'registro' : 'registros'}</span></small></div>
    ${tr.rate != null ? `<div class="hd-w"><b translate="no">${wtRateText(tr)}</b><span>Ritmo por semana</span><small translate="no">${bwDiff(tr.diff)} ${bwUnit()}</small></div>` : '<div class="hd-w"><b>—</b><span>Ritmo por semana</span><small>Falta la semana anterior</small></div>'}</div>`;
}

const CK_SCALES = [['energy', 'Energía'], ['hunger', 'Hambre'], ['sleep', 'Calidad de sueño'], ['stress', 'Estrés'], ['digestion', 'Digestión'], ['recovery', 'Recuperación muscular'], ['mood', 'Ánimo y motivación']];
const CK_TEXTS = [['wins', '¿Qué salió bien?'], ['hard', '¿Qué te costó?'], ['questions', 'Dudas o comentarios para tu especialista']];
function ckWeekOf(d) { const x = new Date(d || Date.now()); x.setHours(12, 0, 0, 0); const wd = (x.getDay() + 6) % 7; return keyDate(new Date(x.getTime() - wd * 864e5)); }
function ckWeekLabel(k) { try { const a = parseKey(k), b = new Date(a.getTime() + 6 * 864e5), f = { day: 'numeric', month: 'short' }; return a.toLocaleDateString(_loc(), f) + ' – ' + b.toLocaleDateString(_loc(), f); } catch (e) { return k; } }
// Lo que la app ya sabe de la semana del atleta (se guarda como foto del momento).
function ckAuto() {
  const o = {}, ks = []; for (let i = 0; i < 7; i++) ks.push(keyDate(new Date(Date.now() - i * 864e5)));
  try { const tr = wtTrend(S.get('weight_log', {}) || {}); if (tr.avg != null) { o.wAvg = Math.round(tr.avg * 100) / 100; o.wN = tr.n; } if (tr.prevAvg != null) o.wPrev = Math.round(tr.prevAvg * 100) / 100; if (tr.rate != null) o.wRate = Math.round(tr.rate * 100) / 100; } catch (e) {}
  try { const gl = gymLogs(); o.workouts = ks.filter(k => gl[k] && (gl[k].done || Object.values(gl[k].ex || {}).some(a => a.some(x => x && x.done)))).length; o.planned = Object.keys(gymSchedule()).length;
    const ps = ks.map(k => gl[k] && gl[k].feel && gl[k].feel.pain).filter(v => v != null && isFinite(+v)); if (ps.length) o.painMax = Math.max(...ps.map(Number)); } catch (e) {}
  try { const aw = actWeek(7); if (aw.n) { o.acts = aw.n; o.actMin = Math.round(aw.sec / 60); if (aw.km) o.actKm = Math.round(aw.km * 10) / 10; } } catch (e) {}
  try { const mt = ks.map(k => dayMealTotals(k)).filter(Boolean), g = fitGoalInfo().t || {}; o.mealDays = mt.length;
    if (mt.length) { o.kcalAvg = Math.round(mt.reduce((a, b) => a + b.kcal, 0) / mt.length); o.protAvg = Math.round(mt.reduce((a, b) => a + (b.protein || 0), 0) / mt.length); }
    if (g.kcal) o.kcalGoal = Math.round(g.kcal); if (g.protein) o.protGoal = Math.round(g.protein); } catch (e) {}
  return o;
}
function ckCache() { try { const a = JSON.parse(localStorage.getItem('__ck') || '{}'); return { rows: a.rows || [], reviews: a.reviews || [] }; } catch (e) { return { rows: [], reviews: [] }; } }
let _ckAt = 0;
async function ckRefresh(force) {
  const s = authGet();
  if (!s || !s.refresh || !s.uid || navigator.onLine === false) return;
  if (!force && Date.now() - _ckAt < 120000) return;
  _ckAt = Date.now();
  let rows, reviews;
  try {
    rows = await sbRest('checkins?select=id,week_of,data,created_at,updated_at&client_id=eq.' + encodeURIComponent(s.uid) + '&order=week_of.desc&limit=12') || [];
    reviews = rows.length ? await sbRest('checkin_reviews?select=id,checkin_id,reviewer_id,body,created_at&client_id=eq.' + encodeURIComponent(s.uid) + '&order=created_at.asc&limit=60') || [] : [];
  } catch (e) { return; }
  const now = JSON.stringify({ rows, reviews });
  if ((localStorage.getItem('__ck') || '') === now) return;
  try { localStorage.setItem('__ck', now); } catch (e) {}
  try { if (typeof renderHoyDash === 'function') renderHoyDash(); } catch (e) {}
}
function ckHasSpecialist() { try { return ((msgCache().links) || []).length > 0; } catch (e) { return false; } }
function ckHoyCard() {
  const c = ckCache(), wk = ckWeekOf(), cur = c.rows.find(r => r.week_of === wk);
  if (!cur && !ckHasSpecialist()) return '';
  if (!cur) return `<div class="hd-card hd-ck"><div class="hd-k"><span>Check-in semanal</span><span class="hd-badge plan">Pendiente</span></div>
    <div class="hd-row"><div class="hd-d"><span>Semana del</span> <span translate="no">${escapeHtml(ckWeekLabel(wk))}</span>. <span>Cuéntale a tu especialista cómo te fue.</span></div><button class="hd-btn" data-hd-ck="new">Hacer check-in</button></div></div>`;
  const rv = c.reviews.filter(r => r.checkin_id === cur.id), last = rv[rv.length - 1];
  return `<div class="hd-card hd-ck" data-hd-ck="view" style="cursor:pointer;"><div class="hd-k"><span>Check-in semanal</span><span class="hd-badge ${last ? 'ok' : ''}">${last ? 'Respondido' : 'Enviado'}</span></div>
    ${last ? `<div class="hd-d" style="margin-top:8px;color:var(--text);white-space:pre-wrap;" translate="no">${escapeHtml(last.body.length > 180 ? last.body.slice(0, 180) + '…' : last.body)}</div>` : '<div class="hd-d" style="margin-top:8px;">Tu especialista aún no lo revisa. Puedes editarlo mientras tanto.</div>'}</div>`;
}
function ckWireHoy(el) {
  el.querySelectorAll('[data-hd-ck]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); const c = ckCache(), cur = c.rows.find(r => r.week_of === ckWeekOf()); if (b.dataset.hdCk === 'new' || !cur) openCheckinForm(null); else openMyCheckins(); }));
}

function ckScaleBar(v) { return `<span class="ck-bar">${[1, 2, 3, 4, 5].map(i => `<i class="${v >= i ? 'on' : ''}"></i>`).join('')}</span>`; }
// Vista de un check-in (compartida entre atleta y especialista). prev = el de la semana anterior, si existe.
function ckViewHtml(row, prev, reviews, names) {
  const d = row.data || {}, a = d.auto || {}, pd = prev ? (prev.data || {}) : {}, pa = pd.auto || {};
  const lb = bwUnit() === 'lb', kg = v => v == null ? null : (lb ? v * GYM_LB : v);
  const dl = (x, y) => (x == null || y == null) ? '' : ` <i class="ant-d">${x - y > 0 ? '▲' : x - y < 0 ? '▼' : '='} ${x - y ? Math.abs(Math.round((x - y) * 10) / 10) : ''}</i>`;
  const cells = [];
  if (a.wAvg != null) cells.push(antCard('Peso promedio', antN(kg(a.wAvg), 1, bwUnit()), `<span translate="no">${a.wN}</span> <span>${a.wN === 1 ? 'registro' : 'registros'}</span>${a.wRate != null ? ` · <span translate="no">${a.wRate > 0 ? '+' : ''}${a.wRate} %</span> <span>por semana</span>` : ''}`));
  if (a.workouts != null) cells.push(antCard('Entrenamientos', a.planned ? `${a.workouts}/${a.planned}` : String(a.workouts), a.painMax != null ? `<span>Dolor máximo</span> <span translate="no">${a.painMax}/10</span>` : ''));
  if (a.acts) cells.push(antCard('Cardio y otros deportes', `${a.acts} ${a.acts === 1 ? 'sesión' : 'sesiones'}`, `${a.actKm ? `<span translate="no">${a.actKm} km</span> · ` : ''}<span translate="no">${a.actMin} min</span>`));
  if (a.mealDays != null) cells.push(antCard('Días con comidas', `${a.mealDays}/7`, a.kcalAvg ? `<span translate="no">${a.kcalAvg} kcal</span>${a.kcalGoal ? ` · <span translate="no">${Math.round(a.kcalAvg / a.kcalGoal * 100)}%</span> <span>de la meta</span>` : ''}` : ''));
  if (a.protAvg) cells.push(antCard('Proteína promedio', `${a.protAvg} g`, a.protGoal ? `<span translate="no">${Math.round(a.protAvg / a.protGoal * 100)}%</span> <span>de la meta</span>` : ''));
  if (d.dietAdh != null) cells.push(antCard('Cumplimiento de dieta', d.dietAdh + ' %', '', dl(d.dietAdh, pd.dietAdh)));
  if (d.trainAdh != null) cells.push(antCard('Cumplimiento de entreno', d.trainAdh + ' %', '', dl(d.trainAdh, pd.trainAdh)));
  if (d.sleepH) cells.push(antCard('Horas de sueño', antN(d.sleepH, 1, 'h'), '', dl(d.sleepH, pd.sleepH)));
  if (d.steps) cells.push(antCard('Pasos por día', (+d.steps).toLocaleString(_loc()), '', ''));
  if (d.cardioMin) cells.push(antCard('Cardio en la semana', d.cardioMin + ' min', '', dl(d.cardioMin, pd.cardioMin)));
  if (d.waist) cells.push(antCard('Cintura', antN(d.waist, 1, 'cm'), '', dl(d.waist, pd.waist)));
  const scales = CK_SCALES.filter(([k]) => d[k]).map(([k, n]) => `<div class="ck-sc"><span>${n}</span>${ckScaleBar(+d[k])}<b translate="no">${d[k]}/5</b>${pd[k] ? dl(+d[k], +pd[k]) : ''}</div>`).join('');
  const texts = CK_TEXTS.filter(([k]) => d[k]).map(([k, n]) => `<div class="ck-tx"><span>${n}</span><p translate="no">${escapeHtml(d[k])}</p></div>`).join('');
  const rv = (reviews || []).map(r => `<div class="ck-rv"><span><b translate="no">${escapeHtml((names && (names[r.reviewer_id] || names._)) || '')}</b> <span translate="no">${escapeHtml(cdFmtDay(String(r.created_at).slice(0, 10)))}</span></span><p translate="no">${escapeHtml(r.body)}</p></div>`).join('');
  return `${cells.length ? `<div class="ant-grid">${cells.join('')}</div>` : ''}${scales ? `<div class="sp-card"><div class="sp-card-n">Cómo se sintió</div>${scales}</div>` : ''}${texts ? `<div class="sp-card">${texts}</div>` : ''}${rv ? `<div class="sp-card"><div class="sp-card-n">Respuesta</div>${rv}</div>` : ''}`;
}

function openCheckinForm(row) {
  const wk = row ? row.week_of : ckWeekOf(), d = row ? JSON.parse(JSON.stringify(row.data || {})) : {}, auto = ckAuto();
  const lb = bwUnit() === 'lb', kg = v => v == null ? null : (lb ? v * GYM_LB : v);
  const chips = (k, vals, cur, suf) => `<div class="chips ck-chips" data-ck="${k}">${vals.map(v => `<div class="chip${+cur === v ? ' selected' : ''}" data-v="${v}">${v}${suf || ''}</div>`).join('')}</div>`;
  const num = (k, n, unit, ph) => `<label class="ant-f"><span>${n}</span><span class="ant-in"><input inputmode="decimal" data-ckn="${k}" value="${d[k] == null ? '' : escapeHtml(String(d[k]))}" placeholder="${ph || ''}"><i>${unit}</i></span></label>`;
  const autoRows = [];
  if (auto.wAvg != null) autoRows.push(['Peso promedio de 7 días', `${antN(kg(auto.wAvg), 1, bwUnit())} (${auto.wN})${auto.wRate != null ? ` · ${auto.wRate > 0 ? '+' : ''}${auto.wRate} %` : ''}`]);
  else autoRows.push(['Peso promedio de 7 días', '—']);
  autoRows.push(['Entrenamientos', auto.planned ? `${auto.workouts || 0}/${auto.planned}` : String(auto.workouts || 0)]);
  if (auto.acts) autoRows.push(['Cardio y otros deportes', `${auto.acts} · ${auto.actKm ? auto.actKm + ' km · ' : ''}${auto.actMin} min`]);
  autoRows.push(['Días con comidas', `${auto.mealDays || 0}/7${auto.kcalAvg ? ` · ${auto.kcalAvg} kcal` : ''}`]);
  openSheet('Check-in semanal', `<div class="ant-ed ck-ed">
    <div class="sp-sub" style="margin-bottom:10px;"><span>Semana del</span> <b translate="no">${escapeHtml(ckWeekLabel(wk))}</b></div>
    <details open><summary>Lo que ya registraste</summary><div class="ant-hint">Se toma de tus registros de los últimos 7 días y se envía junto con tus respuestas.</div>
      ${autoRows.map(([n, v]) => `<div class="ant-f"><span>${n}</span><b translate="no" style="text-align:right;">${v}</b></div>`).join('')}
      ${auto.wN != null && auto.wN < 3 ? '<div class="ant-hint" style="padding-top:8px;">Con al menos 3 pesajes en la semana el promedio es más confiable.</div>' : ''}</details>
    <details open><summary>¿Cómo te sentiste? <small>1 = muy mal · 5 = muy bien</small></summary><div class="ant-hint">En hambre y estrés, 5 significa mucho.</div>
      ${CK_SCALES.map(([k, n]) => `<div class="ant-f col"><span>${n}</span>${chips(k, [1, 2, 3, 4, 5], d[k])}</div>`).join('')}</details>
    <details open><summary>Cumplimiento</summary>
      <div class="ant-f col"><span>Dieta</span>${chips('dietAdh', [50, 60, 70, 80, 90, 100], d.dietAdh, '%')}</div>
      <div class="ant-f col"><span>Entrenamiento</span>${chips('trainAdh', [50, 60, 70, 80, 90, 100], d.trainAdh, '%')}</div>
      ${num('sleepH', 'Horas de sueño por noche', 'h', '7.5')}${num('steps', 'Pasos por día (promedio)', '', '8000')}${num('cardioMin', 'Cardio en la semana', 'min', '90')}${num('waist', 'Cintura', 'cm')}</details>
    <details open><summary>En tus palabras</summary>
      ${CK_TEXTS.map(([k, n]) => `<label class="ant-f col"><span>${n}</span><textarea data-ckt="${k}" rows="2" maxlength="700">${escapeHtml(d[k] || '')}</textarea></label>`).join('')}
</details>
    <details open><summary>Fotos de la semana <small>opcional</small></summary><div id="ck-photos"><div class="skel" aria-busy="true"><i class="s"></i></div></div></details>
    <p class="auth-msg" id="ck-msg"></p></div>`, async () => {
    const out = { auto }, msg = document.getElementById('ck-msg');
    document.querySelectorAll('.ck-ed [data-ck]').forEach(g => { const c = g.querySelector('.chip.selected'); if (c) out[g.dataset.ck] = +c.dataset.v; });
    document.querySelectorAll('.ck-ed [data-ckn]').forEach(i => { const n = parseFloat(i.value.replace(',', '.')); if (isFinite(n) && n > 0) out[i.dataset.ckn] = n; });
    document.querySelectorAll('.ck-ed [data-ckt]').forEach(i => { const v = i.value.trim(); if (v) out[i.dataset.ckt] = v; });
    if (CK_SCALES.filter(([k]) => out[k]).length < 3) { msg.textContent = t('Responde al menos tres de las escalas de cómo te sentiste.'); return; }
    if (out.sleepH > 16 || out.steps > 100000 || out.cardioMin > 3000 || out.waist > 250) { msg.textContent = t('Revisa los números: alguno está fuera de rango.'); return; }
    try {
      if (row) await sbRest('checkins?id=eq.' + encodeURIComponent(row.id), { method: 'PATCH', body: { data: out }, headers: { Prefer: 'return=minimal' } });
      else await sbRest('checkins?on_conflict=client_id,week_of', { method: 'POST', body: { week_of: wk, data: out }, headers: { Prefer: 'resolution=merge-duplicates,return=minimal' } });
    } catch (e) { msg.textContent = authErr(e.code); return; }
    if (!row) { try { const mc = msgCache(); for (const l of (mc.links || [])) await ntPost(l.id, t('Envié mi check-in de la semana.')); } catch (e) {} }
    await ckRefresh(true); try { renderHoyDash(); } catch (e) {}
    openMyCheckins();
  });
  ckPhotosMount(document.getElementById('ck-photos'), wk);
  document.querySelectorAll('.ck-ed .ck-chips .chip').forEach(c => c.addEventListener('click', () => { const was = c.classList.contains('selected'); c.parentNode.querySelectorAll('.chip').forEach(x => x.classList.remove('selected')); if (!was) c.classList.add('selected'); }));
}

async function openMyCheckins() {
  openSheet('Check-ins', '<div class="skel" aria-busy="true"><i class="a"></i><i></i><i></i><i class="s"></i></div>');
  await ckRefresh(true);
  const c = ckCache(), wk = ckWeekOf(), cur = c.rows.find(r => r.week_of === wk), names = {};
  try { const ls = msgCache().links || []; names._ = ls.length === 1 ? ls[0].name : t('Tu especialista'); } catch (e) {}
  if (!_ckSel || !c.rows.find(r => r.id === _ckSel)) _ckSel = c.rows[0] ? c.rows[0].id : null;
  const i = c.rows.findIndex(r => r.id === _ckSel), row = c.rows[i], prev = c.rows[i + 1];
  const reviewed = id => c.reviews.some(r => r.checkin_id === id);
  openSheet('Check-ins', `${!cur ? '<button class="btn-primary" id="ck-new" style="width:100%;margin-bottom:12px;">Hacer el check-in de esta semana</button>' : ''}
    ${row ? `<div class="ant-h"><b translate="no">${escapeHtml(ckWeekLabel(row.week_of))}</b><span>${reviewed(row.id) ? 'Respondido' : 'Enviado · sin respuesta todavía'}</span></div>${ckViewHtml(row, prev, c.reviews.filter(r => r.checkin_id === row.id), names)}
      ${!reviewed(row.id) ? '<button class="btn-secondary" id="ck-edit" style="width:100%;margin-top:4px;">Editar este check-in</button>' : ''}` : '<div class="sp-empty">Aún no has enviado ningún check-in. Es el reporte semanal con el que tu especialista ajusta tu plan.</div>'}
    ${c.rows.length > 1 ? `<h3 class="ant-sub">Semanas anteriores</h3>${c.rows.map(r => `<div class="ant-row${r.id === _ckSel ? ' on' : ''}" data-ck-sel="${r.id}"><div><b translate="no">${escapeHtml(ckWeekLabel(r.week_of))}</b><small>${reviewed(r.id) ? 'Respondido' : 'Sin respuesta'}</small></div></div>`).join('')}` : ''}`);
  const nb = document.getElementById('ck-new'); if (nb) nb.addEventListener('click', () => openCheckinForm(null));
  const eb = document.getElementById('ck-edit'); if (eb) eb.addEventListener('click', () => openCheckinForm(row));
  document.querySelectorAll('[data-ck-sel]').forEach(b => b.addEventListener('click', () => { _ckSel = b.dataset.ckSel; openMyCheckins(); }));
}
let _ckSel = null;

// ---- Especialista ----
// Check-ins de todos sus atletas que aún no ha respondido (para Inicio).
async function ckPendingForSpecialist() {
  const me = (authGet() || {}).uid; if (!me) return [];
  try {
    const rows = await sbRest('checkins?select=id,client_id,week_of,created_at&client_id=neq.' + encodeURIComponent(me) + '&order=created_at.desc&limit=120') || [];
    if (!rows.length) return [];
    const rv = await sbRest('checkin_reviews?select=checkin_id&reviewer_id=eq.' + encodeURIComponent(me) + '&limit=500') || [], done = {};
    rv.forEach(r => { done[r.checkin_id] = 1; });
    return rows.filter(r => !done[r.id]);
  } catch (e) { return []; }
}
async function ckRenderFor(l, el) {
  el.innerHTML = '<div class="skel" aria-busy="true"><i class="a"></i><i></i><i></i><i class="s"></i></div>';
  const me = (authGet() || {}).uid; let rows = [], reviews = [];
  try {
    rows = await sbRest('checkins?select=id,week_of,data,created_at,updated_at&client_id=eq.' + encodeURIComponent(l.client_id) + '&order=week_of.desc&limit=26') || [];
    reviews = rows.length ? await sbRest('checkin_reviews?select=id,checkin_id,reviewer_id,body,created_at&client_id=eq.' + encodeURIComponent(l.client_id) + '&order=created_at.asc&limit=200') || [] : [];
  } catch (e) { el.innerHTML = `<p class="auth-msg">${escapeHtml(authErr(e.code))}</p>`; return; }
  if (!document.body.contains(el)) return;
  const names = {}; names[me] = t('Tú');
  let photos = [];
  if (rows.length) { try { photos = await sbRest('progress_photos?select=id,path,taken_on,pose&user_id=eq.' + encodeURIComponent(l.client_id) + '&pose=not.is.null&order=taken_on.desc,created_at.desc&limit=120') || []; } catch (e) {} }
  if (!document.body.contains(el)) return;
  let sel = rows[0] ? rows[0].id : null;
  const paint = () => {
    const i = rows.findIndex(r => r.id === sel), row = rows[i], prev = rows[i + 1];
    const mine = id => reviews.some(r => r.checkin_id === id && r.reviewer_id === me);
    // Tendencia de las escalas en las últimas semanas
    let trend = '';
    if (rows.length > 1) {
      const asc = rows.slice(0, 8).reverse();
      trend = `<div class="sp-card"><div class="sp-card-n">Últimas semanas</div><div class="ck-tr"><div class="ck-trh"><span></span>${asc.map(r => `<span translate="no">${parseKey(r.week_of).toLocaleDateString(_loc(), { day: 'numeric', month: 'numeric' })}</span>`).join('')}</div>
        ${[['wAvg', 'Peso', r => { const v = ((r.data || {}).auto || {}).wAvg; return v == null ? '·' : bwDisp(v); }], ['dietAdh', 'Dieta %', r => (r.data || {}).dietAdh || '·'], ['trainAdh', 'Entreno %', r => (r.data || {}).trainAdh || '·']].concat(CK_SCALES.map(([k, n]) => [k, n, r => (r.data || {})[k] || '·']))
          .map(([k, n, f]) => `<div class="ck-trr"><span>${n}</span>${asc.map(r => `<b translate="no" class="${CK_SCALES.some(x => x[0] === k) && (r.data || {})[k] ? 'v' + (r.data || {})[k] : ''}">${f(r)}</b>`).join('')}</div>`).join('')}</div></div>`;
    }
    el.innerHTML = row ? `<div class="ant-h"><b translate="no">${escapeHtml(ckWeekLabel(row.week_of))}</b><span>${mine(row.id) ? 'Ya respondiste' : 'Sin responder'} · <span>enviado</span> <span translate="no">${escapeHtml(cdFmtDay(String(row.created_at).slice(0, 10)))}</span></span></div>
      ${ckViewHtml(row, prev, reviews.filter(r => r.checkin_id === row.id), names)}
      ${ckPhotosReviewHtml(photos, row.week_of)}
      <div class="sp-card"><div class="sp-card-n">${mine(row.id) ? 'Agregar otra respuesta' : 'Tu respuesta'}</div>
        <textarea id="ck-reply" rows="4" maxlength="2000" class="ck-reply" placeholder="Qué se queda igual, qué cambia y en qué enfocarse esta semana."></textarea>
        <div class="dp-quick" style="margin-bottom:10px;">${['Todo bien, seguimos igual esta semana.', 'Bajamos un poco las calorías; te actualizo el plan.', 'Subimos el cardio; te digo cuánto.', 'Prioriza el sueño esta semana.'].map(x => `<button data-ck-q="1">${x}</button>`).join('')}</div>
        <button class="sp-act primary" id="ck-send" style="width:100%;">Enviar respuesta</button><p class="auth-msg" id="ck-rmsg"></p></div>
      ${trend}
      ${rows.length > 1 ? `<h3 class="ant-sub">Todas las semanas</h3>${rows.map(r => `<div class="ant-row${r.id === sel ? ' on' : ''}" data-ck-sel="${r.id}"><div><b translate="no">${escapeHtml(ckWeekLabel(r.week_of))}</b><small>${mine(r.id) ? 'Respondido' : 'Sin responder'}</small></div></div>`).join('')}` : ''}`
      : '<div class="sp-empty">Este atleta aún no envía check-ins. Le aparece en Hoy cada semana; al enviarlo te llega un mensaje.</div>';
    try { photoFill(el); } catch (e) {}
    el.querySelectorAll('[data-ck-sel]').forEach(b => b.addEventListener('click', () => { sel = b.dataset.ckSel; paint(); try { el.scrollIntoView({ block: 'start' }); } catch (e) {} }));
    el.querySelectorAll('[data-ck-q]').forEach(b => b.addEventListener('click', () => { const ta = document.getElementById('ck-reply'); ta.value = (ta.value ? ta.value.trim() + ' ' : '') + b.textContent; ta.focus(); }));
    const sb = document.getElementById('ck-send');
    if (sb) sb.addEventListener('click', async () => {
      const body = document.getElementById('ck-reply').value.trim(), msg = document.getElementById('ck-rmsg');
      if (!body) { msg.textContent = t('Escribe tu respuesta.'); return; }
      sb.disabled = true;
      try {
        await sbRest('checkin_reviews', { method: 'POST', body: { checkin_id: row.id, client_id: l.client_id, body }, headers: { Prefer: 'return=minimal' } });
        reviews.push({ id: 'n' + Date.now(), checkin_id: row.id, reviewer_id: me, body, created_at: new Date().toISOString() });
        try { await ntPost(l.id, t('Respondí tu check-in:') + ' ' + body); } catch (e) {}
      } catch (e) { msg.textContent = authErr(e.code); sb.disabled = false; return; }
      _sp.ckPend = null; paint();
    });
  };
  paint();
}

// ============================================================
// SISTEMA DE EQUIVALENTES Y DIETAS PREHECHAS
// Aporte promedio por equivalente según el Sistema Mexicano de Alimentos Equivalentes (SMAE).
// Un plan por equivalentes guarda cuántos equivalentes de cada grupo tocan en cada comida;
// el atleta elige el alimento que quiera dentro del grupo.
// ============================================================
const EQ_GROUPS = [
  { id: 'ver',  name: 'Verduras',                      short: 'Verduras',        kcal: 25,  p: 2, f: 0, c: 4,  m: 'n' },
  { id: 'fru',  name: 'Frutas',                        short: 'Frutas',          kcal: 60,  p: 0, f: 0, c: 15, m: 'c' },
  { id: 'cer',  name: 'Cereales sin grasa',            short: 'Cereales',        kcal: 70,  p: 2, f: 0, c: 15, m: 'c' },
  { id: 'cerg', name: 'Cereales con grasa',            short: 'Cereales c/grasa', kcal: 115, p: 2, f: 5, c: 15, m: 'c' },
  { id: 'leg',  name: 'Leguminosas',                   short: 'Leguminosas',     kcal: 120, p: 8, f: 1, c: 20, m: 'p' },
  { id: 'aoa0', name: 'Origen animal · muy bajo en grasa', short: 'AOA muy magro', kcal: 40,  p: 7, f: 1, c: 0,  m: 'p' },
  { id: 'aoa1', name: 'Origen animal · bajo en grasa', short: 'AOA magro',       kcal: 55,  p: 7, f: 3, c: 0,  m: 'p' },
  { id: 'aoa2', name: 'Origen animal · moderado en grasa', short: 'AOA moderado', kcal: 75,  p: 7, f: 5, c: 0,  m: 'p' },
  { id: 'aoa3', name: 'Origen animal · alto en grasa', short: 'AOA alto',        kcal: 100, p: 7, f: 8, c: 0,  m: 'p' },
  { id: 'lec0', name: 'Leche descremada',              short: 'Leche descr.',    kcal: 95,  p: 9, f: 2, c: 12, m: 'p' },
  { id: 'lec1', name: 'Leche semidescremada',          short: 'Leche semi',      kcal: 110, p: 9, f: 4, c: 12, m: 'p' },
  { id: 'lec2', name: 'Leche entera',                  short: 'Leche entera',    kcal: 150, p: 9, f: 8, c: 12, m: 'p' },
  { id: 'lec3', name: 'Leche con azúcar',              short: 'Leche c/azúcar',  kcal: 200, p: 8, f: 5, c: 30, m: 'c' },
  { id: 'gra',  name: 'Grasas sin proteína',           short: 'Grasas',          kcal: 45,  p: 0, f: 5, c: 0,  m: 'f' },
  { id: 'grap', name: 'Grasas con proteína',           short: 'Grasas c/prot.',  kcal: 70,  p: 3, f: 5, c: 3,  m: 'f' },
  { id: 'azu',  name: 'Azúcares sin grasa',            short: 'Azúcares',        kcal: 40,  p: 0, f: 0, c: 10, m: 'c' },
  { id: 'azug', name: 'Azúcares con grasa',            short: 'Azúcares c/grasa', kcal: 85,  p: 0, f: 5, c: 10, m: 'c' },
];
const EQ_BY = {}; EQ_GROUPS.forEach(g => { EQ_BY[g.id] = g; });
const EQ_COLOR = { p: 'var(--c-prot)', c: 'var(--c-carb)', f: 'var(--c-fat)', n: '#16A34A' };
// Porciones de referencia: 1 equivalente de cada alimento.
const EQ_FOODS = {
  ver: [['Brócoli cocido', '½ taza'], ['Calabacita cocida', '½ taza'], ['Chayote cocido', '½ taza'], ['Ejotes cocidos', '½ taza'], ['Espinaca cruda', '2 tazas'], ['Jitomate', '1 pieza'], ['Lechuga', '3 tazas'], ['Nopal cocido', '1 taza'], ['Pepino', '1¼ taza'], ['Zanahoria rallada', '½ taza'], ['Champiñones crudos', '1 taza'], ['Jícama picada', '½ taza'], ['Coliflor cocida', '¾ taza'], ['Apio crudo', '1½ taza'], ['Acelga cocida', '½ taza'], ['Espárragos', '6 piezas']],
  fru: [['Manzana', '1 pieza'], ['Plátano', '½ pieza'], ['Naranja', '2 piezas'], ['Mandarina', '2 piezas'], ['Papaya picada', '1 taza'], ['Melón picado', '1 taza'], ['Sandía picada', '1 taza'], ['Fresas', '1 taza'], ['Uvas', '1 taza'], ['Mango', '½ pieza'], ['Piña picada', '¾ taza'], ['Pera', '½ pieza'], ['Guayaba', '3 piezas'], ['Durazno', '2 piezas'], ['Kiwi', '1½ pieza'], ['Toronja', '1 pieza'], ['Zarzamoras', '¾ taza'], ['Jugo de naranja natural', '½ taza']],
  cer: [['Tortilla de maíz', '1 pieza'], ['Arroz cocido', '¼ taza'], ['Pasta cocida', '⅓ taza'], ['Pan de caja (blanco o integral)', '1 rebanada'], ['Avena en hojuelas', '⅓ taza'], ['Bolillo sin migajón', '⅓ pieza'], ['Papa cocida', '½ pieza'], ['Elote desgranado', '½ taza'], ['Palomitas naturales', '2½ tazas'], ['Galletas marías', '5 piezas'], ['Amaranto tostado', '¼ taza'], ['Bagel', '⅓ pieza'], ['Pan árabe (pita)', '½ pieza']],
  cerg: [['Tortilla de harina', '1 pieza'], ['Hot cake', '¾ pieza'], ['Pan dulce', '⅓ pieza'], ['Granola', '3 cucharadas'], ['Tamal', '¼ pieza'], ['Barra de granola', '½ pieza']],
  leg: [['Frijoles cocidos', '½ taza'], ['Lentejas cocidas', '½ taza'], ['Garbanzos cocidos', '½ taza'], ['Habas cocidas', '½ taza'], ['Alubias cocidas', '½ taza'], ['Frijoles refritos', '⅓ taza'], ['Soya texturizada hidratada', '½ taza'], ['Edamame', '½ taza']],
  aoa0: [['Pechuga de pollo sin piel', '30 g'], ['Atún en agua', '30 g'], ['Claras de huevo', '2 piezas'], ['Filete de pescado blanco', '40 g'], ['Camarón cocido', '5 piezas'], ['Queso cottage', '3 cucharadas'], ['Pechuga de pavo', '1½ rebanada'], ['Bistec de res magro', '30 g']],
  aoa1: [['Queso panela', '40 g'], ['Jamón de pavo', '2 rebanadas'], ['Salmón', '30 g'], ['Carne molida de res magra', '30 g'], ['Lomo de cerdo', '40 g'], ['Queso fresco', '40 g'], ['Requesón', '3 cucharadas']],
  aoa2: [['Huevo entero', '1 pieza'], ['Queso Oaxaca', '30 g'], ['Queso mozzarella', '30 g'], ['Carne molida de res regular', '30 g'], ['Salchicha de pavo', '1 pieza']],
  aoa3: [['Queso manchego', '25 g'], ['Chorizo', '15 g'], ['Queso amarillo', '2 rebanadas'], ['Salchicha de cerdo', '1 pieza']],
  lec0: [['Leche descremada', '1 taza'], ['Yogur natural descremado', '¾ taza'], ['Leche en polvo descremada', '4 cucharadas'], ['Leche evaporada descremada', '½ taza']],
  lec1: [['Leche semidescremada', '1 taza'], ['Yogur natural semidescremado', '¾ taza']],
  lec2: [['Leche entera', '1 taza'], ['Yogur natural entero', '1 taza'], ['Leche evaporada', '½ taza']],
  lec3: [['Yogur de frutas', '1 taza'], ['Leche con chocolate', '1 taza'], ['Yogur para beber', '240 ml']],
  gra: [['Aceite (oliva, canola, aguacate)', '1 cucharadita'], ['Aguacate', '⅓ pieza'], ['Mayonesa', '1 cucharadita'], ['Crema', '1 cucharada'], ['Mantequilla', '1½ cucharadita'], ['Aceitunas', '5 piezas'], ['Queso crema', '1 cucharada'], ['Guacamole', '2 cucharadas']],
  grap: [['Almendras', '10 piezas'], ['Nuez', '7 mitades'], ['Cacahuates', '14 piezas'], ['Pistaches', '18 piezas'], ['Crema de cacahuate', '2 cucharaditas'], ['Pepitas', '1½ cucharada'], ['Ajonjolí', '4 cucharaditas'], ['Chía', '2 cucharadas']],
  azu: [['Azúcar', '2 cucharaditas'], ['Miel', '2 cucharaditas'], ['Mermelada', '2½ cucharaditas'], ['Cajeta', '1½ cucharadita'], ['Gelatina', '⅓ taza'], ['Jugo industrializado', '⅓ taza']],
  azug: [['Chocolate con leche', '15 g'], ['Helado de crema', '¼ taza']],
};
const EQ_MEALS = [['breakfast', 'Desayuno', 'Des'], ['lunch', 'Comida', 'Com'], ['dinner', 'Cena', 'Cena'], ['snack', 'Colaciones', 'Col']];
const EQ_STYLES = [
  { id: 'bal',  name: 'Equilibrada',            p: 20, c: 50, f: 30, d: 'Reparto clásico para mantener o bajar de peso sin extremos.' },
  { id: 'prot', name: 'Alta en proteína',       p: 30, c: 40, f: 30, d: 'Para definición o recomposición con entrenamiento de fuerza.' },
  { id: 'vol',  name: 'Volumen',                p: 20, c: 55, f: 25, d: 'Más carbohidrato para subir masa muscular y rendir en el entrenamiento.' },
  { id: 'lowc', name: 'Baja en carbohidratos',  p: 30, c: 25, f: 45, d: 'Menos cereales y fruta, más grasa y proteína.' },
];

function eqNum(v) { const n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(n) && n > 0 ? Math.round(n * 2) / 2 : 0; }
function eqFmt(n) { const w = Math.floor(n), h = n - w >= 0.5; return (w || !h ? String(w) : '') + (h ? '½' : ''); }
function eqMealTotals(m) {
  const o = { kcal: 0, p: 0, c: 0, f: 0 };
  Object.keys(m || {}).forEach(g => { const G = EQ_BY[g], n = +m[g] || 0; if (!G || !n) return; o.kcal += G.kcal * n; o.p += G.p * n; o.c += G.c * n; o.f += G.f * n; });
  return o;
}
function eqTotals(eq) {
  const o = { kcal: 0, p: 0, c: 0, f: 0, by: {} };
  EQ_MEALS.forEach(([mid]) => { const m = (eq || {})[mid] || {}, t = eqMealTotals(m); o.kcal += t.kcal; o.p += t.p; o.c += t.c; o.f += t.f; Object.keys(m).forEach(g => { if (+m[g]) o.by[g] = (o.by[g] || 0) + (+m[g]); }); });
  return o;
}
function eqIsPlan(p) { return !!(p && p.eq && typeof p.eq === 'object'); }

// Reparte un total (en medios equivalentes) entre comidas según pesos.
function eqSplit(total, weights) {
  const units = Math.round(total * 2), sum = weights.reduce((a, b) => a + b, 0) || 1;
  const raw = weights.map(w => units * w / sum), base = raw.map(Math.floor);
  let left = units - base.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { base[i]++; left--; } });
  return base.map(u => u / 2);
}
// Genera un plan por equivalentes para una meta de calorías y un reparto de macros.
function eqGenerate(kcal, pPct, cPct, fPct) {
  const K = Math.max(900, Math.min(6000, +kcal || 2000));
  const P = K * pPct / 100 / 4, C = K * cPct / 100 / 4, F = K * fPct / 100 / 9;
  const lowC = cPct < 35;
  const tot = {};
  tot.ver = K < 1500 ? 3 : K < 2300 ? 4 : 5;
  tot.fru = lowC ? (K < 2000 ? 1 : 2) : (K < 1400 ? 2 : K < 2000 ? 3 : K < 2800 ? 4 : 5);
  tot.lec0 = K < 1500 ? 1 : 2;
  tot.leg = lowC ? (K < 2200 ? 0.5 : 1) : (K < 1500 ? 1 : K < 2600 ? 1.5 : 2);
  const half = v => Math.max(0, Math.round(v * 2) / 2);
  tot.cer = half((C - 4 * tot.ver - 15 * tot.fru - 12 * tot.lec0 - 20 * tot.leg) / 15);
  const pLeft = P - (2 * tot.ver + 2 * tot.cer + 8 * tot.leg + 9 * tot.lec0);
  // Con mucha grasa disponible se usan cortes moderados; si no, magros.
  const aoa = half(pLeft / 7), fatRoom = F - (2 * tot.lec0 + 1 * tot.leg);
  let aId = 'aoa1';
  if (fatRoom - 3 * aoa > 55) aId = 'aoa2'; else if (fatRoom - 3 * aoa < 12) aId = 'aoa0';
  tot[aId] = aoa;
  const fLeft = fatRoom - EQ_BY[aId].f * aoa;
  const nuts = fLeft >= 25 ? (K >= 2600 ? 2 : 1) : (fLeft >= 12 ? 1 : 0);
  if (nuts) tot.grap = nuts;
  tot.gra = half((fLeft - 5 * nuts) / 5);
  const W = { ver: [0.5, 2, 1.5, 0], fru: [1.5, 0.5, 0.5, 1.5], cer: [3, 4, 3, 0.5], leg: [0.5, 3, 1, 0], lec0: [2, 0, 0.5, 1.5], gra: [1, 2, 1.5, 0], grap: [0.5, 0, 0, 2] };
  W[aId] = [2.5, 4.5, 3, 0];
  const eq = {}; EQ_MEALS.forEach(([mid]) => { eq[mid] = {}; });
  Object.keys(tot).forEach(g => { if (!tot[g]) return; eqSplit(tot[g], W[g] || [1, 1, 1, 1]).forEach((n, i) => { if (n) eq[EQ_MEALS[i][0]][g] = n; }); });
  return eq;
}

function eqChips(m) {
  return EQ_GROUPS.filter(g => +(m || {})[g.id]).map(g => `<span class="eq-chip" style="--ec:${EQ_COLOR[g.m]}"><b translate="no">${eqFmt(+m[g.id])}</b> <span>${g.short}</span></span>`).join('');
}
function eqSummaryHtml(eq) {
  const t = eqTotals(eq), k = t.kcal || 1;
  return `<span translate="no">${Math.round(t.kcal)} kcal</span> · <span>por equivalentes</span> · <span translate="no">P ${Math.round(t.p * 4 / k * 100)}% · C ${Math.round(t.c * 4 / k * 100)}% · G ${Math.round(t.f * 9 / k * 100)}%</span>`;
}

// Lista de intercambios de un grupo. onPick(nombre, porción) si se puede registrar.
function openEqExchange(gid, n, mealName, onPick, back) {
  const g = EQ_BY[gid]; if (!g) return;
  openSheet(g.name, `<div class="eq-ex-h"><b translate="no">${eqFmt(n)}</b> <span>${n <= 1 ? 'equivalente' : 'equivalentes'}</span>${mealName ? ` · <span>${mealName}</span>` : ''}</div>
    <div class="lk-d" style="margin:0 0 10px;"><span>Cada equivalente aporta cerca de</span> <span translate="no">${g.kcal} kcal · P ${g.p} g · C ${g.c} g · G ${g.f} g</span>. <span>Elige cualquiera de la lista; puedes combinar.</span></div>
    ${(EQ_FOODS[gid] || []).map(([name, por], i) => `<div class="eq-food"><div><b>${name}</b><small><span>1 equivalente =</span> <span>${por}</span></small></div>${onPick ? `<button class="lk-mini" data-eq-pick="${i}">Registrar</button>` : ''}</div>`).join('')}
    <div class="ant-foot">Porciones de referencia del Sistema Mexicano de Alimentos Equivalentes. Tu nutriólogo puede indicarte otras.</div>
    ${back ? '<button class="btn-secondary" id="eq-back" style="width:100%;margin-top:12px;">Volver</button>' : ''}`);
  document.querySelectorAll('[data-eq-pick]').forEach(b => b.addEventListener('click', () => { const f = EQ_FOODS[gid][+b.dataset.eqPick]; onPick(f[0], f[1]); }));
  const bk = document.getElementById('eq-back'); if (bk) bk.addEventListener('click', back);
}
// Registra n equivalentes de un alimento en una comida del día.
function eqLogItem(mid, gid, n, name, portion) {
  const g = EQ_BY[gid], day = keyDate(), log = mealLog(), d = log[day] = log[day] || {};
  d[mid] = (d[mid] || []).concat([{ id: (typeof uid === 'function' ? uid() : String(Date.now())), name, grams: 100, eq: gid, portion: `${eqFmt(n)} eq · ${portion}`,
    per100g: { kcal: g.kcal * n, protein: g.p * n, carbs: g.c * n, fat: g.f * n } }]);
  saveMealLog(log);
}

// Plan por equivalentes de una comida (vista del atleta): chips que abren la lista de intercambios.
function eqMealPlanHtml(m, mid) {
  const t = eqMealTotals(m);
  return `<div class="mc-plan eq"><div class="mc-plan-h"><span>Plan por equivalentes</span><span translate="no">${Math.round(t.kcal)} kcal</span></div>
    <div class="eq-chips">${EQ_GROUPS.filter(g => +(m || {})[g.id]).map(g => `<button class="eq-chip" data-eq-open="${mid}:${g.id}" style="--ec:${EQ_COLOR[g.m]}"><b translate="no">${eqFmt(+m[g.id])}</b> <span>${g.short}</span></button>`).join('')}</div>
    <div class="eq-tip">Toca un grupo para ver qué puedes comer y registrarlo.</div></div>`;
}
function eqWireMeal(root, plan, after) {
  root.querySelectorAll('[data-eq-open]').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const [mid, gid] = b.dataset.eqOpen.split(':'), n = +(((plan.payload || {}).eq || {})[mid] || {})[gid] || 0;
    const ml = (EQ_MEALS.find(x => x[0] === mid) || [])[1];
    openEqExchange(gid, n, ml, (name, por) => { eqLogItem(mid, gid, n, name, por); closeSheet(); if (after) after(); });
  }));
}

// Editor del plan por equivalentes (cuadro dietosintético).
// target: { tpl } plantilla; { asg, link } copia asignada; { preset } punto de partida generado.
function openEqEditor(target, forClient) {
  target = target || {};
  const src = target.asg || target.tpl || null, sp = (src && src.payload) || target.preset || {};
  const st = { name: src ? src.name || '' : (target.preset ? target.preset.name || '' : ''), eq: {}, goal: Object.assign({ kcal: 2000, p: 20, c: 50, f: 30 }, sp.goal || {}), note: sp.note || '' };
  EQ_MEALS.forEach(([mid]) => { st.eq[mid] = Object.assign({}, (sp.eq || {})[mid] || {}); });
  const used = () => { const t = eqTotals(st.eq); return EQ_GROUPS.filter(g => t.by[g.id] || ['ver', 'fru', 'cer', 'leg', 'aoa1', 'lec0', 'gra', 'grap'].includes(g.id) || st.show && st.show[g.id]); };
  const paint = () => {
    const t = eqTotals(st.eq), G = st.goal, k = t.kcal || 1;
    const gP = G.kcal * G.p / 400, gC = G.kcal * G.c / 400, gF = G.kcal * G.f / 900;
    const adq = (v, g) => g ? Math.round(v / g * 100) : 0, cls = a => a >= 95 && a <= 105 ? 'ok' : a >= 90 && a <= 110 ? 'warn' : 'bad';
    const row = (n, v, g, unit, col) => { const a = adq(v, g); return `<div class="eq-sum-r" style="--mc:${col}"><span><i class="ft-dot"></i><span>${n}</span></span><b translate="no">${Math.round(v)} / ${Math.round(g)} ${unit}</b><em class="${cls(a)}" translate="no">${a}%</em></div>`; };
    const groups = used();
    document.getElementById('eq-body').innerHTML = `<div class="eq-sum">${row('Calorías', t.kcal, G.kcal, 'kcal', 'var(--text)')}${row('Proteína', t.p, gP, 'g', 'var(--c-prot)')}${row('Carbos', t.c, gC, 'g', 'var(--c-carb)')}${row('Grasa', t.f, gF, 'g', 'var(--c-fat)')}
        <small><span>Reparto real:</span> <span translate="no">P ${Math.round(t.p * 4 / k * 100)}% · C ${Math.round(t.c * 4 / k * 100)}% · G ${Math.round(t.f * 9 / k * 100)}%</span> · <span>adecuación ideal: 95–105%</span></small></div>
      <div class="eq-grid"><div class="eq-gh"><span>Grupo</span>${EQ_MEALS.map(m => `<span>${m[2]}</span>`).join('')}<span>Total</span></div>
      ${groups.map(g => `<div class="eq-gr" style="--ec:${EQ_COLOR[g.m]}"><button class="eq-gn" data-eq-info="${g.id}"><i></i><span>${g.short}</span></button>${EQ_MEALS.map(([mid]) => `<input inputmode="decimal" data-eq="${mid}:${g.id}" value="${st.eq[mid][g.id] ? String(st.eq[mid][g.id]) : ''}" placeholder="0">`).join('')}<b translate="no">${eqFmt(t.by[g.id] || 0)}</b></div>`).join('')}</div>
      ${groups.length < EQ_GROUPS.length ? `<label class="auth-field" style="margin-top:10px;"><span>Agregar otro grupo</span><select class="auth-in" id="eq-more"><option value="">Elige…</option>${EQ_GROUPS.filter(g => !groups.includes(g)).map(g => `<option value="${g.id}">${g.name}</option>`).join('')}</select></label>` : ''}
      <div class="eq-meals">${EQ_MEALS.map(([mid, lab]) => { const mt = eqMealTotals(st.eq[mid]); return `<div><span>${lab}</span><b translate="no">${Math.round(mt.kcal)} kcal</b><small translate="no">${t.kcal ? Math.round(mt.kcal / t.kcal * 100) : 0}%</small></div>`; }).join('')}</div>`;
    document.querySelectorAll('#eq-body [data-eq]').forEach(i => i.addEventListener('change', () => { const [mid, g] = i.dataset.eq.split(':'), v = eqNum(i.value); if (v) st.eq[mid][g] = v; else delete st.eq[mid][g]; paint(); }));
    document.querySelectorAll('#eq-body [data-eq-info]').forEach(b => b.addEventListener('click', () => { keep(); openEqExchange(b.dataset.eqInfo, 1, '', null, () => openEqEditor({ tpl: target.tpl, asg: target.asg, link: target.link, preset: { name: st.name, eq: st.eq, goal: st.goal, note: st.note } }, forClient)); }));
    const more = document.getElementById('eq-more'); if (more) more.addEventListener('change', () => { if (more.value) { st.show = st.show || {}; st.show[more.value] = 1; paint(); } });
  };
  const keep = () => { st.name = document.getElementById('eq-name').value.trim(); st.note = document.getElementById('eq-note').value.trim(); ['kcal', 'p', 'c', 'f'].forEach(k => { const v = parseFloat(document.getElementById('eq-g-' + k).value); if (isFinite(v)) st.goal[k] = v; }); };
  openSheet(src ? 'Editar plan por equivalentes' : 'Plan por equivalentes', `<div class="eq-ed">
    ${target.asg ? `<div class="lk-d" style="margin:0 0 10px;"><span>Plan de</span> <b translate="no">${escapeHtml((target.link || {}).name || '')}</b> · <span>los cambios solo aplican a esta persona</span></div>` : ''}
    <label class="auth-field"><span>Nombre del plan</span><input class="auth-in" id="eq-name" maxlength="60" value="${escapeHtml(st.name)}" placeholder="Ej. Definición 1800 kcal"></label>
    <div class="eq-goal"><label><span>Meta kcal</span><input inputmode="numeric" id="eq-g-kcal" value="${st.goal.kcal}"></label><label><span>% Proteína</span><input inputmode="numeric" id="eq-g-p" value="${st.goal.p}"></label><label><span>% Carbos</span><input inputmode="numeric" id="eq-g-c" value="${st.goal.c}"></label><label><span>% Grasa</span><input inputmode="numeric" id="eq-g-f" value="${st.goal.f}"></label></div>
    <button class="btn-secondary" id="eq-auto" style="width:100%;margin:4px 0 12px;">Calcular equivalentes para esta meta</button>
    <div id="eq-body"></div>
    <label class="auth-field" style="margin-top:12px;"><span>Indicaciones para el atleta (opcional)</span><textarea class="auth-in" id="eq-note" rows="3" maxlength="600" placeholder="Ej. 2 litros de agua, verduras libres...">${escapeHtml(st.note)}</textarea></label>
    <p class="auth-msg" id="eq-msg"></p></div>`, async () => {
    keep();
    const msg = document.getElementById('eq-msg'), t = eqTotals(st.eq);
    if (!st.name) { msg.textContent = window.t ? window.t('Ponle nombre al plan.') : 'Ponle nombre al plan.'; return; }
    if (!t.kcal) { msg.textContent = window.t ? window.t('Agrega al menos un equivalente.') : 'Agrega al menos un equivalente.'; return; }
    if (Math.round(st.goal.p + st.goal.c + st.goal.f) !== 100) { msg.textContent = window.t ? window.t('Los porcentajes de macros deben sumar 100.') : 'Los porcentajes de macros deben sumar 100.'; return; }
    const payload = { eq: st.eq, goal: st.goal }; if (st.note) payload.note = st.note;
    try {
      if (target.asg) {
        await sbRest('assignments?id=eq.' + encodeURIComponent(target.asg.id), { method: 'PATCH', body: { name: st.name, payload }, headers: { Prefer: 'return=minimal' } });
        try { await ntPost(target.link.id, window.t ? window.t('Actualicé tu plan de alimentación.') : 'Actualicé tu plan de alimentación.', { t: 'asg', kind: 'diet', name: st.name }); } catch (e) {}
      } else if (target.tpl) await sbRest('templates?id=eq.' + encodeURIComponent(target.tpl.id), { method: 'PATCH', body: { name: st.name, payload }, headers: { Prefer: 'return=minimal' } });
      else await sbRest('templates', { method: 'POST', body: { kind: 'diet', name: st.name, payload }, headers: { Prefer: 'return=minimal' } });
    } catch (e) { msg.textContent = authErr(e.code); return; }
    if (target.asg) { closeSheet(); spOpenClient(target.link); } else tplDone(forClient);
  });
  document.getElementById('eq-auto').addEventListener('click', () => {
    keep();
    if (Math.round(st.goal.p + st.goal.c + st.goal.f) !== 100) { document.getElementById('eq-msg').textContent = 'Los porcentajes de macros deben sumar 100.'; return; }
    document.getElementById('eq-msg').textContent = '';
    st.eq = eqGenerate(st.goal.kcal, st.goal.p, st.goal.c, st.goal.f); paint();
  });
  ['kcal', 'p', 'c', 'f'].forEach(k => document.getElementById('eq-g-' + k).addEventListener('change', () => { keep(); paint(); }));
  paint();
}

// Dietas prehechas: estilo + calorías → plan por equivalentes listo para ajustar.
function openDietPresets(forClient, kcalHint) {
  const st = { style: 'bal', kcal: Math.round((+kcalHint || 2000) / 50) * 50 };
  const paint = () => {
    const S0 = EQ_STYLES.find(x => x.id === st.style), eq = eqGenerate(st.kcal, S0.p, S0.c, S0.f), t = eqTotals(eq);
    document.getElementById('dp-prev').innerHTML = `<div class="lk-row"><div class="lk-top"><div class="lk-n">${S0.name} · <span translate="no">${st.kcal} kcal</span></div></div>
      <div class="lk-d">${eqSummaryHtml(eq)}</div><div class="lk-d" translate="no">P ${Math.round(t.p)} g · C ${Math.round(t.c)} g · G ${Math.round(t.f)} g</div>
      ${EQ_MEALS.map(([mid, lab]) => `<div class="eq-pm"><span>${lab}</span><div class="eq-chips">${eqChips(eq[mid])}</div></div>`).join('')}</div>`;
    document.querySelectorAll('[data-dp-style]').forEach(b => b.classList.toggle('on', b.dataset.dpStyle === st.style));
    document.getElementById('dp-kv').textContent = st.kcal + ' kcal';
  };
  openSheet('Dietas prehechas', `<div class="lk-d" style="margin:0 0 10px;">Elige el tipo de plan y las calorías. Se arma con el sistema de equivalentes y lo puedes ajustar antes de guardarlo.</div>
    <div class="dp-styles">${EQ_STYLES.map(x => `<button data-dp-style="${x.id}"><b>${x.name}</b><small translate="no">P ${x.p}% · C ${x.c}% · G ${x.f}%</small><span>${x.d}</span></button>`).join('')}</div>
    <div class="dp-k"><div class="dp-kh"><span>Calorías del día</span><b id="dp-kv" translate="no"></b></div><input type="range" id="dp-kcal" min="1200" max="4000" step="50" value="${st.kcal}">
      <div class="dp-quick">${[1200, 1500, 1800, 2000, 2200, 2500, 2800, 3200].map(k => `<button data-dp-k="${k}" translate="no">${k}</button>`).join('')}</div></div>
    <div id="dp-prev"></div>
    <button class="btn-primary" id="dp-use" style="width:100%;margin-top:6px;">Usar y ajustar</button>`);
  document.querySelectorAll('[data-dp-style]').forEach(b => b.addEventListener('click', () => { st.style = b.dataset.dpStyle; paint(); }));
  const rng = document.getElementById('dp-kcal');
  rng.addEventListener('input', () => { st.kcal = +rng.value; paint(); });
  document.querySelectorAll('[data-dp-k]').forEach(b => b.addEventListener('click', () => { st.kcal = +b.dataset.dpK; rng.value = st.kcal; paint(); }));
  document.getElementById('dp-use').addEventListener('click', () => {
    const S0 = EQ_STYLES.find(x => x.id === st.style);
    openEqEditor({ preset: { name: `${S0.name} ${st.kcal} kcal`, eq: eqGenerate(st.kcal, S0.p, S0.c, S0.f), goal: { kcal: st.kcal, p: S0.p, c: S0.c, f: S0.f } } }, forClient);
  });
  paint();
}
// Elegir cómo crear un plan de alimentación.
function openDietKindPicker(forClient) {
  openSheet('Plan de alimentación', `<div class="dp-styles one">
      <button id="dk-pre"><b>Dieta prehecha</b><span>Elige tipo y calorías; se arma sola con equivalentes y la ajustas.</span></button>
      <button id="dk-eq"><b>Por equivalentes</b><span>Tú defines cuántos equivalentes de cada grupo van en cada comida.</span></button>
      <button id="dk-menu"><b>Menú con alimentos y gramos</b><span>Un menú fijo, alimento por alimento.</span></button></div>`);
  document.getElementById('dk-pre').addEventListener('click', () => openDietPresets(forClient));
  document.getElementById('dk-eq').addEventListener('click', () => openEqEditor({}, forClient));
  document.getElementById('dk-menu').addEventListener('click', () => openDietEditor({}, forClient));
}

if (typeof module !== 'undefined') module.exports = { gymMissedFrom, rxBuildPlan, rxSplitFor, rxToRoutines, RX_SPLITS, RX_DAYS, RX_EX, handTotals, wtTrend, ckWeekOf, antCalc, antVal, antParseTakes, antAvg, eqGenerate, eqTotals, EQ_STYLES, EQ_GROUPS, EQ_FOODS };
