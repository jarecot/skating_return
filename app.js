/* app.js — capa de UI. Depende de: plan.js, coach.js, store.js (en ese orden) */
'use strict';

const { esc } = Store;
const $ = id => document.getElementById(id);
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DAYS_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

/* ---------- Estado (carga segura: nunca deja la app en blanco) ---------- */
const loaded = Store.load();
const state = loaded.state;
const save = () => { if (!Store.save(state)) toast('⚠ No se pudo guardar (almacenamiento lleno o bloqueado). Exporta tu progreso.'); };

/* ---------- Helpers de plan ---------- */
const profile = () => PROFILES[state.profile] || PROFILES.past;
const exerciseKey = name => {
  const n = name.toLowerCase();
  if (n.includes('hockey')) return 'hockey';
  if (n.includes('backward')) return 'backward';
  if (n.includes('transition')) return 'transition';
  if (n.includes('crossover')) return 'crossover';
  if (n.includes('t-stop')) return 'tstop';
  return null;
};
const visibleExercise = (x, wi) => { const k = exerciseKey(x.name); return !k || wi + 1 >= profile().unlocks[k]; };

/** Peldaños de hockey stop que le tocan al usuario en la semana wi (0, 1 o 2 ejercicios), según su nivel. Ver progression.js. */
const hockeyFor = wi => Progression.hockeyStages({ unlock: profile().unlocks.hockey, slotWeeks: HOCKEY_SLOT_WEEKS, week: wi + 1 }).map(i => HOCKEY_STAGES[i]);

/** Ejercicios de un día con su ID estable (semana|día|nombre). El marcador de hockey se sustituye por su peldaño.
 *  El ID depende del NOMBRE del ejercicio: sobrevive a reordenar el plan, a cambiar de calendario y de peldaño. */
function dayEntries(wi, di) {
  const seen = {}, out = [];
  const add = x => { const o = seen[x.name] || 0; seen[x.name] = o + 1; out.push({ x, id: Store.exId(wi, di, x.name, o) }); };
  W[wi].days[di].exs.forEach(x => (x.slot === 'hockey' ? hockeyFor(wi).forEach(add) : add(x)));
  return out;
}

/** Calendario (schedule.js): sesiones activas y qué días del plan hace cada una.
 *  El contenido de un día omitido NO se pierde: se traslada a otra sesión. */
const layout = () => Schedule.layout(state.restDays);
const sessionsPerWeek = () => layout().length;
/** Ejercicios de una sesión, cada uno con el índice de su día ORIGINAL del plan (así su ID no cambia con el modo). */
function sessionExercises(wi, session) {
  const out = [];
  session.sources.forEach(di => dayEntries(wi, di).forEach(({ x, id }) => out.push({ x, di, id })));
  return out;
}
/** Nombre legible de una sesión: si fusiona días, lo dice. */
function sessionTitle(session) {
  const names = session.sources.map(d => Schedule.DAY_NAMES[d]);
  return session.sources.length > 1 ? `${Schedule.DAY_NAMES[session.day]} (+ ${names.filter(n => n !== Schedule.DAY_NAMES[session.day]).join(', ')})` : Schedule.DAY_NAMES[session.day];
}

/* ---------- Escalado de dosis por perfil ---------- */
function scaledDose(dose) {
  const f = profile().factor;
  let d = dose.replace(/(\d+)\s*[–-]\s*(\d+)\s*min/g, (m, a, b) => `${Math.max(1, Math.round(+a * f))}–${Math.max(1, Math.round(+b * f))} min`);
  d = d.replace(/(\d+(?:[.,]\d+)?)\s*min/g, (m, n) => `${Math.max(1, Math.round(parseFloat(n.replace(',', '.')) * f))} min`);
  d = d.replace(/(\d+)\s*×\s*(\d+)\s*(?:rep|reps)/gi, (m, a, b) => `${Math.max(1, Math.round(+a * Math.max(.85, f)))} × ${Math.max(1, Math.round(+b * Math.max(.85, f)))} rep`);
  d = d.replace(/(\d+)\s*×\s*(\d+)\s*s/g, (m, a, b) => `${Math.max(1, Math.round(+a * Math.max(.8, f)))} × ${Math.max(5, Math.round(+b * f))} s`);
  return d;
}
function scaledVolume(vol) {
  const f = profile().factor;
  return vol.replace(/(\d+)–(\d+)\s*min/g, (m, a, b) => `${Math.max(60, Math.round(+a * f))}–${Math.max(75, Math.round(+b * f))} min`);
}
function reduceDose(dose, f) {
  return dose.replace(/(\d+)\s*[–-]\s*(\d+)\s*min/g, (m, a, b) => `${Math.max(1, Math.round(+a * f))}–${Math.max(1, Math.round(+b * f))} min`)
             .replace(/(\d+)\s*×\s*(\d+)/g, (m, a, b) => `${Math.max(1, Math.round(+a * f))} × ${Math.max(1, Math.round(+b * f))}`);
}

/* ---------- Coach (una sola fuente de verdad: coach.js) ---------- */
const assessment = () => Coach.assess(state.logs);

function adaptedExercise(x, adj) {
  let dose = scaledDose(x.dose), note = '';
  if (adj.level === 'red') {
    if (x.hi) return null;                       // alta intensidad marcada explícitamente en plan.js
    dose = reduceDose(dose, adj.factor); note = 'Adaptado por Coach: baja la carga y mantén solo habilidades conocidas.';
  }
  if (adj.level === 'yellow') { dose = reduceDose(dose, adj.factor); note = 'Adaptado por Coach: reduce el volumen; no avances la dificultad.'; }
  if (adj.controlLow && /T-stop/i.test(x.name)) { dose = '8 × cada lado (prioridad)'; note = 'Adaptado por Coach: repetir T-stop hasta recuperar control consistente.'; }
  return { dose, note };
}

/** Próxima sesión: la siguiente sesión ACTIVA después de la última registrada en la semana actual. */
function nextSessionInfo() {
  const adj = assessment(), lay = layout();
  const logs = state.logs.filter(l => Number(l.week) === state.week + 1);
  let idx = 0;
  if (logs.length) {
    const last = Math.max(...logs.map(l => Number(l.day) || 0));
    const found = lay.findIndex(s => s.day > last);
    idx = found === -1 ? lay.length - 1 : found;
  }
  const session = lay[idx];
  const first = W[state.week].days[session.sources[0]];
  return { adj, session, day: { name: sessionTitle(session), goal: session.sources.map(d => W[state.week].days[d].goal).join(' + ') }, di: session.day, first };
}

/* ---------- Progreso ---------- */
function progressWeek(wi) {
  let all = 0, done = 0;
  layout().forEach(s => sessionExercises(wi, s).forEach(({ x, id }) => {
    if (!visibleExercise(x, wi)) return;
    all++; if (state.done[id]) done++;
  }));
  return { all, done, p: all ? done / all * 100 : 0 };
}
const objectiveState = wi => state.weekObjectives[wi] || {};
function objectiveProgress(wi) {
  const o = W[wi].objectives || [], st = objectiveState(wi), done = o.filter((_, i) => !!st[i]).length;
  return { done, total: o.length, p: o.length ? done / o.length * 100 : 0 };
}
function toggleObjective(wi, i) {
  state.weekObjectives[wi] = state.weekObjectives[wi] || {};
  state.weekObjectives[wi][i] = !state.weekObjectives[wi][i];
  save(); render();
}

/* ---------- Render: barra de semanas ---------- */
function renderRail() {
  $('weekRail').innerHTML = W.map((w, i) => {
    const p = progressWeek(i);
    return `<button class="weekBtn ${i === state.week ? 'active' : ''}" data-w="${i}" aria-pressed="${i === state.week}"><span class="num">SEMANA ${i + 1}</span><span class="title">${esc(w.title)}</span><span class="mini">${esc(w.phase)}</span><div class="bar"><i style="width:${p.p}%"></i></div></button>`;
  }).join('');
  document.querySelectorAll('.weekBtn').forEach(b => b.onclick = () => { state.week = +b.dataset.w; save(); render(); });
}


/* ---------- Guía de ejercicio (pasos, error común, criterio y vídeos) ---------- */
const YT_ES = q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

function videoLinks(x, g, rb) {
  const q = (g && g.yt) || x.video;
  let h = `<a class="vid primaryVid" target="_blank" rel="noopener" href="${YT_ES(q)}">▶ Vídeos en español</a>`;
  if (g && g.ytEn) h += `<a class="vid" target="_blank" rel="noopener" href="${YT_ES(g.ytEn)}">▶ En inglés</a>`;
  h += rb ? `<a class="vid" target="_blank" rel="noopener" href="${esc(rb.url)}">🎥 Rollerblade · ${esc(rb.name)}</a>` : `<a class="vid" target="_blank" rel="noopener" href="${RB}">🎥 Rollerblade · Advice</a>`;
  return `<div class="resourceLinks vids">${h}</div>`;
}

function guideHtml(x, g, rb, a) {
  const steps = g.steps.map(s => `<li>${esc(s)}</li>`).join('');
  return `<div class="guide">
    <div class="gBlock"><b>Paso a paso</b><ol>${steps}</ol></div>
    <div class="gBlock warn"><b>⚠ Error común</b><p>${esc(g.mistake)}</p></div>
    <div class="gBlock okBlock"><b>✅ Sabrás que lo dominas cuando…</b><p>${esc(g.ok)}</p></div>
    ${g.needs ? `<div class="gBlock"><b>🎒 Necesitas</b><p>${esc(g.needs)}</p></div>` : ''}
    ${x.notes ? `<div class="gBlock"><b>Nota del plan</b><p>${esc(x.notes)}</p></div>` : ''}
    ${a.note ? `<div class="gBlock coachNote"><b>Coach</b><p>${esc(a.note)}</p></div>` : ''}
    ${videoLinks(x, g, rb)}
  </div>`;
}

/* Respaldo por si algún ejercicio nuevo aún no tiene guía: no se rompe, muestra lo que había. */
function legacyDetail(x, rb, a) {
  const note = x.notes || 'Criterio: termina las repeticiones manteniendo postura, control y respiración. Si la técnica se degrada, reduce velocidad o volumen.';
  return `${videoLinks(x, null, rb)}${esc(note)}${a.note ? `<br><b>Coach:</b> ${esc(a.note)}` : ''}`;
}


/** Opciones del selector de días. El modo antiguo (5 días sin viernes) solo se ofrece a quien ya lo tenía. */
function dayOptions() {
  const cur = Schedule.modeKey(state.restDays);
  const list = [6, 5, 4, 3];
  if (cur === 'legacy5') list.push('legacy5');
  return list.map(k => `<option value="${k}" ${String(k) === String(cur) ? 'selected' : ''}>${esc(Schedule.MODES[k].label)}</option>`).join('');
}

/* ---------- Render: plan ---------- */
function renderPlan() {
  const w = W[state.week], p = progressWeek(state.week), rec = nextSessionInfo(), adj = rec.adj;
  const op = objectiveProgress(state.week), obj = objectiveState(state.week);
  const isDeload = /descarga/i.test(w.phase);
  let html = '';

  html += `<div class="configBar"><label><span class="eyebrow">NIVEL</span><select id="profileSelect" aria-label="Nivel de entrada">${Object.entries(PROFILES).map(([k, v]) => `<option value="${k}" ${k === state.profile ? 'selected' : ''}>${esc(v.label)}</option>`).join('')}</select></label><label><span class="eyebrow">DÍAS / SEMANA</span><select id="restSelect" aria-label="Días de entrenamiento por semana">${dayOptions()}</select></label><small>${esc(profile().desc)}. Los días no activos son descanso.</small></div>`;

  html += `<div class="coach next ${adj.level}" role="status"><div class="coachDot"></div><div><span class="eyebrow">PRÓXIMA SESIÓN RECOMENDADA</span><h3>${esc(adj.title)}</h3><p>${esc(adj.text)}</p><div class="nextSession"><b>${esc(rec.day.name)}</b> · ${esc(rec.day.goal)} · ${adj.empty || adj.level === 'neutral' ? 'sin ajuste' : `carga ${Math.round(adj.factor * 100)}%`}</div><div class="adaptedNote">El <b>plan base no cambia</b>. Esta tarjeta solo modifica visualmente la próxima sesión a partir de tus últimos registros.</div></div></div>`;

  if (isDeload) html += `<div class="deloadBanner" role="note"><b>🌿 Semana de descarga</b><span>Menos volumen a propósito para asimilar lo aprendido. No añadas sesiones extra ni compenses.</span></div>`;

  html += `<div class="weekHero"><div><span class="phaseBadge">${esc(w.phase)}</span><h2>Semana ${state.week + 1} · ${esc(w.title)}</h2><p>${esc(w.focus)}</p><div class="weekTargets">${w.targets.map(x => `<span>${esc(x)}</span>`).join('')}</div></div><div><strong style="font-size:26px">${p.done}/${p.all}</strong><div>ejercicios</div><div style="margin-top:5px">${esc(scaledVolume(w.volume))}</div></div></div>`;

  html += `<section class="weekGuide"><div class="guideMain"><span class="eyebrow">🎯 OBJETIVO DE LA SEMANA</span><h3>${esc(w.objective)}</h3><p><b>🧠 Qué esperar:</b> ${esc(w.expect)}</p><p><b>🌎 Entorno:</b> ${esc(w.environment)}</p><p class="guideLevel"><b>🔐 Criterio:</b> ${esc(w.level)}</p></div><div class="objectiveBox"><div><b>Objetivos cumplidos</b><strong>${op.done}/${op.total}</strong></div><div class="bar"><i style="width:${op.p}%"></i></div><div class="objectiveList">${w.objectives.map((x, i) => `<label><input type="checkbox" data-obj="${i}" ${obj[i] ? 'checked' : ''}> <span>${esc(x)}</span></label>`).join('')}</div></div></section>`;

  html += `<div class="environmentBanner"><b>🌎 Entorno de esta semana</b><span>${esc(w.environment)}</span></div>`;

  /* Días activos. Si el modo fusiona días (p. ej. Lun–Vie), el contenido del día omitido aparece en otra sesión. */
  html += layout().map(session => {
    const items = sessionExercises(state.week, session).filter(({ x }) => visibleExercise(x, state.week));
    const dd = items.filter(({ id }) => state.done[id]).length;
    const isNext = session.day === rec.di;
    const title = `${esc(sessionTitle(session))}${isNext ? ' · ⭐ siguiente' : ''}`;
    const goal = session.sources.map(d => W[state.week].days[d].goal).join(' + ');
    const merged = session.sources.length > 1;
    const body = items.map(({ x, di, id }) => {
      const k = id, c = !!state.done[k];
      const a = isNext ? adaptedExercise(x, adj) : { dose: scaledDose(x.dose), note: '' };
      if (!a) return `<div class="exercise skipped"><div></div><div><h4>${esc(x.name)}</h4><p>⛔ Retirado temporalmente por el Coach debido a la carga/fatiga registrada.</p></div></div>`;
      const g = GUIDE[x.name];
      const cid = 'cb_' + k.replace(/[^a-z0-9]/gi, '_');
      const rb = rbFor(x);
      const summary = g ? g.what : x.desc;                         // siempre visible: qué es, en una frase
      const detail = g ? guideHtml(x, g, rb, a) : legacyDetail(x, rb, a);
      const mergedTag = merged && di !== session.day ? ` <span class="fromDay">de ${esc(Schedule.DAY_NAMES[di])}</span>` : '';
      return `<div class="exercise ${c ? 'completed ' : ''}${isNext ? 'nextExercise ' : ''}" data-ex="${esc(k)}"><input type="checkbox" id="${cid}" aria-label="Completado: ${esc(x.name)}" ${c ? 'checked' : ''}><div><h4>${esc(x.name)}${mergedTag}</h4><p class="exWhat">${esc(summary)}</p><div class="resourceLinks"><button class="detail" type="button" aria-expanded="false">📖 Cómo se hace, errores y vídeos</button></div><div class="exerciseNotes">${detail}</div></div><div class="dose">${esc(a.dose)}</div></div>`;
    }).join('');
    /* <details>/<summary>: teclado y lector de pantalla sin código extra */
    return `<details class="day ${isNext ? 'recommendedDay' : ''}" ${isNext ? 'open' : ''}><summary class="dayHead"><div><div class="dayTitle">${title}</div><div class="dayMeta">${esc(goal)}</div></div><div class="dayProgress">${dd}/${items.length}</div></summary><div class="dayBody">${body}</div></details>`;
  }).join('');

  /* Días sin sesión = descanso. La nota dice exactamente adónde se movió el contenido de cada día libre. */
  const lay = layout();
  const activeSet = new Set(lay.map(s => s.day));
  const freed = Schedule.DAY_NAMES.map((n, i) => ({ n, i })).filter(d => !activeSet.has(d.i));
  if (freed.length) {
    const dest = d => { const s = lay.find(x => x.sources.includes(d.i)); return s ? Schedule.DAY_NAMES[s.day] : null; };
    const moves = freed.map(d => `${d.n} → ${dest(d)}`);
    const list = freed.length === 1 ? freed[0].n : freed.slice(0, -1).map(d => d.n).join(', ') + ' y ' + freed[freed.length - 1].n;
    html += `<div class="restNote" role="note">😴 <b>Descanso:</b> ${esc(list)}. Su contenido se traslada a otra sesión (${esc(moves.join(' · '))}). Cada ejercicio trasladado lleva una etiqueta morada con su día de origen.</div>`;
  }

  $('weekContent').innerHTML = html;
  $('profileSelect').onchange = e => { state.profile = e.target.value; save(); render(); };
  $('restSelect').onchange = e => { const v = e.target.value; state.restDays = v === 'legacy5' ? 1 : Number(v); save(); render(); };
  document.querySelectorAll('[data-obj]').forEach(x => x.onchange = () => toggleObjective(state.week, +x.dataset.obj));
  document.querySelectorAll('.exercise input[type=checkbox]').forEach(inp => inp.onchange = () => {
    const k = inp.closest('.exercise').dataset.ex; state.done[k] = inp.checked; save(); render();
  });
  document.querySelectorAll('.detail').forEach(b => b.onclick = () => {
    const ex = b.closest('.exercise'); const open = ex.classList.toggle('expanded'); b.setAttribute('aria-expanded', open);
  });
}

/* ---------- Skill Tracker medible ---------- */
function skillValue(id, wk) { const v = (state.skillScores[id] || {})[wk]; return v === undefined || v === '' ? null : Number(v); }

/** Mejora entre la primera y la última medición registrada, con signo positivo = mejor. */
function skillDelta(s) {
  const vals = SKILL_WEEKS.map(w => ({ w, v: skillValue(s.id, w) })).filter(x => x.v !== null && Number.isFinite(x.v));
  if (vals.length < 2) return null;
  const first = vals[0], last = vals[vals.length - 1];
  const raw = last.v - first.v;
  const improve = s.better === 'up' ? raw : -raw;
  const pct = first.v ? improve / Math.abs(first.v) * 100 : 0;
  return { first, last, improve, pct };
}

function renderSkills() {
  $('skillGrid').innerHTML = skills.map(s => {
    const d = skillDelta(s);
    let badge = '<span class="tag">Sin datos suficientes</span>';
    if (d) {
      const cls = d.improve > 0 ? 'up' : d.improve < 0 ? 'down' : 'flat';
      const arrow = d.improve > 0 ? '▲' : d.improve < 0 ? '▼' : '=';
      badge = `<span class="tag delta ${cls}" title="Semana ${d.first.w} → semana ${d.last.w}">${arrow} ${d.improve > 0 ? '+' : ''}${d.pct.toFixed(0)}% (S${d.first.w} → S${d.last.w})</span>`;
    }
    const inputs = SKILL_WEEKS.map(wk => {
      const v = skillValue(s.id, wk);
      return `<label>Semana ${wk}<input type="number" inputmode="decimal" min="0" max="${s.max}" step="any" data-s="${esc(s.id)}" data-w="${wk}" value="${v === null ? '' : v}" placeholder="—" aria-label="${esc(s.name)}, semana ${wk} (${esc(s.unit)})"></label>`;
    }).join('');
    return `<article class="skillCard"><div class="skillTop"><div><h3>${esc(s.name)}</h3><p>${esc(s.how)}</p></div><span class="tag">${esc(s.unit)}</span></div><div class="skillInput">${inputs}</div><div class="skillFoot">${badge}<small>${s.better === 'up' ? 'Más es mejor' : 'Menos es mejor'}</small></div></article>`;
  }).join('');
  document.querySelectorAll('.skillInput input').forEach(x => x.onchange = () => {
    const id = x.dataset.s, wk = x.dataset.w, s = skills.find(k => k.id === id);
    let v = x.value === '' ? '' : Math.min(s.max, Math.max(0, Number(x.value)));
    if (v !== '' && !Number.isFinite(v)) v = '';
    state.skillScores[id] = state.skillScores[id] || {}; state.skillScores[id][wk] = v;
    save(); renderSkills(); toast('Prueba guardada');
  });
}

/* ---------- Test final (semana 13 vs semana 1) ---------- */
function renderFinalTests() {
  const el = $('finalTests'); if (!el) return;
  const rows = FINAL_TESTS.map(t => {
    const s1 = (state.tests[t.id] || {}).w1 ?? '', s13 = (state.tests[t.id] || {}).w13 ?? '';
    return `<tr><td><b>${esc(t.name)}</b><br><small>${esc(t.how)}</small></td><td><input type="number" step="any" min="0" data-t="${esc(t.id)}" data-k="w1" value="${esc(s1)}" aria-label="${esc(t.name)} semana 1 (${esc(t.unit)})"></td><td><input type="number" step="any" min="0" data-t="${esc(t.id)}" data-k="w13" value="${esc(s13)}" aria-label="${esc(t.name)} semana 13 (${esc(t.unit)})"></td><td>${esc(t.unit)}</td></tr>`;
  }).join('');
  el.innerHTML = `<div class="sectionHead"><span class="eyebrow">TEST FINAL</span><h2>Semana 1 vs semana 13</h2><p>Repite exactamente las mismas pruebas, en el mismo lugar y con el mismo calzado.</p></div><div class="logTable"><table><thead><tr><th>Prueba</th><th>Semana 1</th><th>Semana 13</th><th>Unidad</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  el.querySelectorAll('input').forEach(i => i.onchange = () => {
    const id = i.dataset.t, k = i.dataset.k; state.tests[id] = state.tests[id] || {};
    state.tests[id][k] = i.value === '' ? '' : Number(i.value); save(); toast('Prueba guardada');
  });
}

/* ---------- Recursos ---------- */
function renderResources() {
  $('resourceGrid').innerHTML = resources.map(r => `<article class="resourceCard"><div class="eyebrow">TÉCNICA</div><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p>${r[3] ? `<a target="_blank" rel="noopener" href="${esc(r[3])}">Sitio oficial</a>` : ''}${r[2].startsWith('http') ? `<a target="_blank" rel="noopener" href="${esc(r[2])}">Abrir recurso</a>` : `<a target="_blank" rel="noopener" href="${YT(r[2])}">Buscar vídeos</a>`}</article>`).join('');
}

/* ---------- Registro + Coach ---------- */
function renderCoach() {
  const el = $('coachCard');
  if (!state.logs.length) { el.innerHTML = '<div class="coach neutral"><div class="coachDot"></div><div><b>Coach adaptativo</b><p>Registra una sesión con RPE, fatiga, dolor, control y técnica para obtener una recomendación.</p></div></div>'; return; }
  const a = assessment(), l = state.logs[state.logs.length - 1];
  el.innerHTML = `<div class="coach ${a.level}" role="status"><div class="coachDot"></div><div><span class="eyebrow">${state.logs.length >= 3 ? 'ÚLTIMAS 3 SESIONES' : 'ÚLTIMA SESIÓN'} · SEMANA ${esc(l.week)}</span><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></div></div>`;
}

/* Gráfico de tendencia en SVG puro (sin librerías) */
function renderTrend() {
  const el = $('trendChart'); if (!el) return;
  const logs = state.logs.filter(l => l.control || l.technique);
  if (logs.length < 2) { el.innerHTML = '<div class="empty">El gráfico de tendencia aparece a partir de la segunda sesión con control/técnica registrados.</div>'; return; }
  const W_ = 640, H_ = 220, pad = { l: 34, r: 12, t: 14, b: 26 };
  const iw = W_ - pad.l - pad.r, ih = H_ - pad.t - pad.b;
  const x = i => pad.l + (logs.length === 1 ? iw / 2 : i / (logs.length - 1) * iw);
  const y = v => pad.t + ih - (v / 5) * ih;
  const line = (key, color) => {
    const pts = logs.map((l, i) => l[key] ? `${x(i).toFixed(1)},${y(l[key]).toFixed(1)}` : null).filter(Boolean);
    return pts.length ? `<polyline fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" points="${pts.join(' ')}"/>` + logs.map((l, i) => l[key] ? `<circle cx="${x(i).toFixed(1)}" cy="${y(l[key]).toFixed(1)}" r="3.5" fill="${color}"/>` : '').join('') : '';
  };
  const grid = [1, 2, 3, 4, 5].map(v => `<line x1="${pad.l}" x2="${W_ - pad.r}" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" opacity=".12"/><text x="${pad.l - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="currentColor" opacity=".6">${v}</text>`).join('');
  const dots = logs.map((l, i) => l.pain >= 2 ? `<circle cx="${x(i).toFixed(1)}" cy="${H_ - pad.b + 8}" r="4" fill="var(--c-pain)"><title>Dolor ${l.pain}/5 · ${esc(l.date)}</title></circle>` : '').join('');
  const desc = `Control y técnica en ${logs.length} sesiones. Último control ${logs[logs.length - 1].control || 'sin dato'}, última técnica ${logs[logs.length - 1].technique || 'sin dato'}.`;
  el.innerHTML = `<div class="trendWrap"><div class="trendHead"><b>Tendencia · control y técnica</b><span class="legend"><span><i style="background:var(--c-control)"></i>Control</span><span><i style="background:var(--c-tech)"></i>Técnica</span><span><i style="background:var(--c-pain)"></i>Dolor ≥2</span></span></div><svg viewBox="0 0 ${W_} ${H_}" role="img" aria-label="${esc(desc)}" preserveAspectRatio="xMidYMid meet">${grid}${line('control', 'var(--c-control)')}${line('technique', 'var(--c-tech)')}${dots}<text x="${pad.l}" y="${H_ - 4}" font-size="11" fill="currentColor" opacity=".6">${esc(logs[0].date)}</text><text x="${W_ - pad.r}" y="${H_ - 4}" text-anchor="end" font-size="11" fill="currentColor" opacity=".6">${esc(logs[logs.length - 1].date)}</text></svg></div>`;
}

/* Eficiencia aeróbica: FC comparada entre sesiones con el MISMO RPE (ver Coach.efficiency) */
function renderEfficiency() {
  const el = $('effCard'); if (!el) return;
  const r = Coach.efficiency(state.logs);
  if (!r) { el.innerHTML = ''; return; }              // sin dos sesiones al mismo RPE no hay evidencia: no se muestra nada
  const sign = n => (n > 0 ? '+' : '') + n;
  const title = { better: 'FC más baja con el mismo esfuerzo', worse: 'FC más alta con el mismo esfuerzo', stable: 'FC estable con el mismo esfuerzo' }[r.trend];
  const txt = {
    better: 'Con la misma sensación de esfuerzo tu corazón late menos: suele indicar mejor eficiencia aeróbica.',
    worse: 'Con la misma sensación de esfuerzo tu corazón late más: puede reflejar fatiga acumulada, calor o poco descanso.',
    stable: 'Con la misma sensación de esfuerzo tu FC se mantiene. Es lo esperable en semanas de consolidación.'
  }[r.trend];
  const detail = r.groups.map(g => `RPE ${g.rpe}: ${g.first} → ${g.last} lpm (${sign(g.delta)})`).join(' · ');
  const lvl = r.trend === 'better' ? 'green' : r.trend === 'worse' ? 'yellow' : 'neutral';
  el.innerHTML = `<div class="coach ${lvl}" role="status"><div class="coachDot"></div><div><span class="eyebrow">EFICIENCIA AERÓBICA</span><h3>${esc(title)} (${sign(r.avgDelta)} lpm)</h3><p>${esc(txt)}</p><p class="effDetail">${esc(detail)}</p><p class="effNote">Indicador orientativo, no un diagnóstico. Solo compara sesiones con igual RPE.</p></div></div>`;
}

function renderLogs() {
  $('logWeek').innerHTML = W.map((w, i) => `<option value="${i + 1}" ${i === state.week ? 'selected' : ''}>Semana ${i + 1} · ${esc(w.title)}</option>`).join('');
  if (!$('logDate').value) $('logDate').value = new Date().toISOString().slice(0, 10);
  renderCoach(); renderTrend(); renderEfficiency();
  const tbl = $('logTable');
  if (!state.logs.length) { tbl.innerHTML = '<div class="empty">Todavía no hay sesiones registradas.</div>'; return; }
  const rows = state.logs.map((l, idx) => ({ l, idx })).reverse().map(({ l, idx }) =>
    `<tr><td>${esc(l.date)}</td><td>${esc(l.week)}</td><td>${DAYS_SHORT[l.day ?? 0] || ''}</td><td>${esc(l.min)}</td><td>${l.km ? esc(l.km) : ''}</td><td>${l.rpe ? esc(l.rpe) : ''}</td><td>${l.fatigue ? esc(l.fatigue) : ''}</td><td>${esc(l.pain ?? '')}</td><td>${l.control ? esc(l.control) : ''}</td><td>${l.technique ? esc(l.technique) : ''}</td><td>${l.hr ? esc(l.hr) : ''}</td><td>${esc(l.notes)}</td><td><button class="delete" data-del="${idx}" aria-label="Eliminar sesión del ${esc(l.date)}">×</button></td></tr>`).join('');
  tbl.innerHTML = `<table><thead><tr><th>Fecha</th><th>Sem</th><th>Día</th><th>Min</th><th>Km</th><th>RPE</th><th>Fatiga</th><th>Dolor</th><th>Control</th><th>Técnica</th><th>FC</th><th>Notas</th><th></th></tr></thead><tbody>${rows}</tbody></table>`;
  document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
    if (!confirm('¿Eliminar esta sesión? No se puede deshacer.')) return;
    state.logs.splice(+b.dataset.del, 1); save(); render(); toast('Sesión eliminada');
  });
}

/* ---------- Cabecera ---------- */
function updateHeader() {
  let all = 0, done = 0;
  W.forEach((_, i) => { const p = progressWeek(i); all += p.all; done += p.done; });
  const pct = all ? done / all * 100 : 0;
  $('pct').textContent = Math.round(pct) + '%';
  document.querySelector('.ring').style.background = `conic-gradient(var(--red) ${pct * 3.6}deg,#f2d9d0 0deg)`;
  $('doneCount').textContent = done;
  $('weekStat').textContent = `${state.week + 1}/${W.length}`;
  $('phaseStat').textContent = W[state.week].phase;
  $('volumeStat').textContent = scaledVolume(W[state.week].volume);
  const sessions = new Set(state.logs.map(l => `${l.week}-${l.day}`)).size;
  $('sessionsStat').textContent = `${sessions}/${W.length * sessionsPerWeek()}`;
}

function render() { renderRail(); renderPlan(); renderSkills(); renderFinalTests(); renderResources(); renderLogs(); updateHeader(); }

function toast(t) {
  const x = $('toast'); x.textContent = t; x.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => x.classList.remove('show'), 2600);
}

/* ---------- Pestañas accesibles (role=tab, teclado con flechas) ---------- */
const tabs = [...document.querySelectorAll('.tab')];
function selectTab(btn, focus) {
  tabs.forEach(t => { const on = t === btn; t.classList.toggle('active', on); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
  document.querySelectorAll('.tabPanel').forEach(p => p.classList.add('hidden'));
  $(btn.dataset.tab + 'Tab').classList.remove('hidden');
  if (focus) btn.focus();
}
tabs.forEach((b, i) => {
  b.onclick = () => selectTab(b, false);
  b.onkeydown = e => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (k) { e.preventDefault(); selectTab(tabs[(i + k + tabs.length) % tabs.length], true); }
    if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0], true); }
    if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
  };
});
selectTab(tabs[0], false);

/* ---------- Formulario de registro ---------- */
$('logForm').onsubmit = e => {
  e.preventDefault();
  const raw = { date: $('logDate').value, week: +$('logWeek').value, day: +$('logDay').value, min: +$('logMin').value, km: +$('logKm').value, rpe: +$('logRpe').value, hr: +$('logHr').value, fatigue: +$('logFatigue').value, pain: +$('logPain').value, control: +$('logControl').value, technique: +$('logTechnique').value, notes: $('logNotes').value };
  const log = Store.cleanLog(raw);
  state.logs.push(log); save();
  $('logForm').reset(); $('logDate').value = new Date().toISOString().slice(0, 10); $('logWeek').value = String(state.week + 1);
  render();                                   // FIX: v6 solo llamaba renderLogs() y el plan quedaba desactualizado
  toast('Sesión registrada ✓');
};
/* Vista previa del Coach mientras se rellena el formulario */
function previewCoach() {
  const l = { rpe: +$('logRpe').value, fatigue: +$('logFatigue').value, pain: +$('logPain').value, control: +$('logControl').value, technique: +$('logTechnique').value };
  const el = $('coachPreview'); const lv = Coach.levelFor(l);
  const filled = l.rpe || l.fatigue || l.pain || l.control || l.technique;
  if (!filled) { el.textContent = '🟢 El Coach adaptativo usará RPE, fatiga, molestias, control y técnica para orientar la siguiente sesión.'; return; }
  const m = { red: '🔴 Con estos datos el Coach pediría recuperar y reducir carga.', yellow: '🟡 Con estos datos el Coach pediría mantener y reducir algo de carga.', green: '🟢 Con estos datos podrías progresar una variable.', neutral: '🔵 Faltan datos para una recomendación precisa.' };
  el.textContent = m[lv];
}
['logRpe', 'logFatigue', 'logPain', 'logControl', 'logTechnique'].forEach(id => $(id).addEventListener('input', previewCoach));

/* ---------- Exportar / importar (validado) ---------- */
$('exportBtn').onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'return-to-skating-progreso.json'; a.click(); URL.revokeObjectURL(a.href);
  toast('Progreso exportado');
};
$('importBtn').onclick = () => $('importFile').click();
$('importFile').onchange = () => {
  const f = $('importFile').files[0]; if (!f) return;
  if (f.size > 2 * 1024 * 1024) { toast('Archivo demasiado grande'); return; }
  const r = new FileReader();
  r.onload = () => {
    const res = Store.parseImport(r.result);
    if (!res.ok) { toast(res.reason); return; }
    if (state.logs.length && !confirm('Esto reemplazará tu progreso actual. ¿Continuar?')) return;
    Object.keys(state).forEach(k => delete state[k]); Object.assign(state, res.state);
    save(); render(); toast('Progreso importado ✓');
  };
  r.onerror = () => toast('No se pudo leer el archivo');
  r.readAsText(f); $('importFile').value = '';
};

/* ---------- Tema: respeta el sistema si no hay preferencia guardada ---------- */
const themeBtn = $('themeBtn');
function applyTheme(dark) { document.documentElement.classList.toggle('dark', dark); themeBtn.textContent = dark ? '☀' : '☾'; themeBtn.setAttribute('aria-pressed', dark); }
let savedTheme = null; try { savedTheme = localStorage.getItem('rts13_theme'); } catch (_) {}
applyTheme(savedTheme ? savedTheme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
themeBtn.onclick = () => { const dark = !document.documentElement.classList.contains('dark'); applyTheme(dark); try { localStorage.setItem('rts13_theme', dark ? 'dark' : 'light'); } catch (_) {} };

/* ---------- Arranque ---------- */
render();
/* Persistir de inmediato lo migrado: evita re-migrar (y desfases) en cada carga si el usuario solo abre la app */
if (loaded.migrated) save();
if (loaded.recovered) toast('⚠ Tus datos guardados estaban dañados. Se guardó una copia y se inició limpio.');

/* Service worker (offline). Solo en https/localhost. */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
