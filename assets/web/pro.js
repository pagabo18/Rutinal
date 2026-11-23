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
      + antTrend('Σ pliegues', 'mm', asc.map(x => ({ d: x.d, v: x.c.sum6 != null ? x.c.sum6 : x.c.sumAll })), 1);
  }
  return `<div class="ant-h"><b>${escapeHtml(antDate(row.taken_on))}</b><span>${d.sex === 'F' ? 'Mujer' : 'Hombre'} · <span translate="no">${+d.age || '—'}</span> <span>años</span>${prevRow ? ` · <span>cambios vs.</span> ${escapeHtml(antDate(prevRow.taken_on))}` : ''}</span></div>
    <div class="ant-grid">${comp.join('')}</div>
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
    <details><summary>Otros datos</summary>
      ${one('bfDevice', '% de grasa por bioimpedancia', '%', d.bfDevice)}${one('rhr', 'FC en reposo', 'lpm', d.rhr)}
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
      else if (v !== '') { const n = parseFloat(v.replace(',', '.')); if (isFinite(n)) out[k] = k === 'weight' ? bwStore(n) : n; }
    });
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

// Rutinas prehechas por deporte (se copian a "Mis rutinas" y se editan como cualquier otra).
const SPORT_ROUTINES = [
  { sport: 'box', name: 'Box · Técnica y saco', ex: [['Salto de cuerda', 3, '3 min'], ['Sombra', 3, '3 min'], ['Saco: jab y cross', 4, '3 min'], ['Saco: combinaciones', 4, '3 min'], ['Manoplas o saco libre', 2, '3 min'], ['Plancha', 3, '45 s']] },
  { sport: 'funcional', name: 'Funcional · Circuito de cuerpo completo', ex: [['Sentadilla goblet', 4, '12'], ['Kettlebell swing', 4, '15'], ['Burpees', 4, '10'], ['Remo con mancuerna', 4, '12'], ['Wall ball', 4, '15'], ['Plancha', 4, '40 s']] },
  { sport: 'hyrox', name: 'Hyrox · Media simulación', ex: [['Carrera', 8, '500 m'], ['SkiErg', 1, '500 m'], ['Sled push', 1, '25 m'], ['Sled pull', 1, '25 m'], ['Burpee broad jumps', 1, '40 m'], ['Remo', 1, '500 m'], ['Farmers carry', 1, '100 m'], ['Sandbag lunges', 1, '50 m'], ['Wall balls', 1, '50']] },
  { sport: 'calistenia', name: 'Calistenia · Básicos', ex: [['Dominadas', 4, '6'], ['Fondos en paralelas', 4, '8'], ['Flexiones', 4, '12'], ['Remo invertido', 4, '10'], ['Sentadilla a una pierna asistida', 3, '6'], ['Elevación de piernas colgado', 3, '10'], ['Plancha hollow', 3, '30 s']] },
  { sport: 'escalada', name: 'Escalada · Fuerza de dedos y tracción', ex: [['Calentamiento en vías fáciles', 1, '15 min'], ['Suspensiones en regleta', 6, '10 s'], ['Dominadas', 4, '5'], ['Bloqueos a 90°', 4, '8 s'], ['Boulder de proyecto', 6, '1 intento'], ['Flexiones (antagonistas)', 3, '12'], ['Elevación de piernas colgado', 3, '10']] },
  { sport: 'fisio', name: 'Fisio · Movilidad y activación general', ex: [['Gato-camello', 2, '10'], ['Puente de glúteo', 3, '12'], ['Bird-dog', 3, '8'], ['Clamshell con banda', 3, '12'], ['Rotación torácica', 2, '8'], ['Estiramiento de flexor de cadera', 2, '30 s']], note: 'Ejemplo general. Tu fisioterapeuta indica los ejercicios y la dosis para tu caso.' },
  { sport: 'running', name: 'Running · Técnica y fuerza', ex: [['Skipping', 3, '20 m'], ['Zancadas', 3, '10'], ['Elevación de talones', 3, '15'], ['Peso muerto a una pierna', 3, '8'], ['Plancha lateral', 3, '30 s']] },
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
      exercises: r.ex.map(e => ({ id: uid(), name: e[0], sets: [{ count: e[1], reps: e[2] }] })) });
    saveGymRoutines(all); closeSheet(); try { renderGym(); } catch (e) {}
  }));
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
      <div class="ant-hint">Si quieres que revise tu físico, sube y comparte las fotos de esta semana en Fotos de progreso.</div></details>
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
      <div class="sp-card"><div class="sp-card-n">${mine(row.id) ? 'Agregar otra respuesta' : 'Tu respuesta'}</div>
        <textarea id="ck-reply" rows="4" maxlength="2000" class="ck-reply" placeholder="Qué se queda igual, qué cambia y en qué enfocarse esta semana."></textarea>
        <div class="dp-quick" style="margin-bottom:10px;">${['Todo bien, seguimos igual esta semana.', 'Bajamos un poco las calorías; te actualizo el plan.', 'Subimos el cardio; te digo cuánto.', 'Prioriza el sueño esta semana.'].map(x => `<button data-ck-q="1">${x}</button>`).join('')}</div>
        <button class="sp-act primary" id="ck-send" style="width:100%;">Enviar respuesta</button><p class="auth-msg" id="ck-rmsg"></p></div>
      ${trend}
      ${rows.length > 1 ? `<h3 class="ant-sub">Todas las semanas</h3>${rows.map(r => `<div class="ant-row${r.id === sel ? ' on' : ''}" data-ck-sel="${r.id}"><div><b translate="no">${escapeHtml(ckWeekLabel(r.week_of))}</b><small>${mine(r.id) ? 'Respondido' : 'Sin responder'}</small></div></div>`).join('')}` : ''}`
      : '<div class="sp-empty">Este atleta aún no envía check-ins. Le aparece en Hoy cada semana; al enviarlo te llega un mensaje.</div>';
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

if (typeof module !== 'undefined') module.exports = { wtTrend, ckWeekOf, antCalc, antVal, antParseTakes, antAvg, eqGenerate, eqTotals, EQ_STYLES, EQ_GROUPS, EQ_FOODS };
