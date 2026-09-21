// Ejecutar con:  node tests/progression.test.js
const assert = require('assert'), vm = require('vm'), fs = require('fs'), path = require('path');
const P = require('../progression.js');
let passed = 0, failed = 0;
const t = (n, fn) => { try { fn(); passed++; console.log('  ✓', n); } catch (e) { failed++; console.log('  ✗', n, '\n     ', e.message); } };
const ctx = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'plan.js'), 'utf8') + ';this.W=W;this.PROFILES=PROFILES;this.HOCKEY_STAGES=HOCKEY_STAGES;this.HOCKEY_SLOT_WEEKS=HOCKEY_SLOT_WEEKS', ctx);
const { W, PROFILES, HOCKEY_STAGES, HOCKEY_SLOT_WEEKS } = ctx;
const [G, A, PR] = ['Gesto hockey stop', 'Hockey stop asistido', 'Hockey stop — progresión'];

console.log('\nhockeyStages — la regla con datos sintéticos');
const S = [7, 9, 10, 11, 13], st = (unlock, week, slotWeeks = S) => P.hockeyStages({ unlock, week, slotWeeks });
t('antes del desbloqueo no se muestra nada', () => assert.deepStrictEqual(st(9, 7), []));
t('en una semana sin sesión de hockey no se muestra nada', () => assert.deepStrictEqual(st(7, 8), []));
t('1ª sesión tras el desbloqueo = gesto', () => assert.deepStrictEqual(st(7, 7), [0]));
t('2ª sesión = asistido', () => assert.deepStrictEqual(st(7, 9), [1]));
t('3ª y siguientes = progresión', () => { assert.deepStrictEqual(st(7, 10), [2]); assert.deepStrictEqual(st(7, 13), [2]); });
t('con UNA sola sesión disponible, gesto y asistido van juntos', () => assert.deepStrictEqual(st(13, 13), [0, 1]));
t('con DOS sesiones: gesto y luego asistido (sin progresión)', () => { assert.deepStrictEqual(st(11, 11), [0]); assert.deepStrictEqual(st(11, 13), [1]); });
t('el desbloqueo en la misma semana de una sesión la incluye', () => assert.deepStrictEqual(st(9, 9), [0]));
t('entradas raras no lanzan y no muestran nada', () => [undefined, null, {}, { unlock: 'x', week: 1, slotWeeks: S }, { unlock: 7, week: 7 }].forEach(o => assert.deepStrictEqual(P.hockeyStages(o), [])));
t('slotWeeks desordenadas dan el mismo resultado', () => assert.deepStrictEqual(st(7, 9, [13, 7, 11, 9, 10]), [1]));

console.log('\nla escalera REAL del plan, nivel por nivel (si cambias un desbloqueo, actualiza esto a propósito)');
const ladder = k => { const o = {}; HOCKEY_SLOT_WEEKS.forEach(w => { const s = P.hockeyStages({ unlock: PROFILES[k].unlocks.hockey, slotWeeks: HOCKEY_SLOT_WEEKS, week: w }); if (s.length) o[w] = s.map(i => HOCKEY_STAGES[i].name); }); return o; };
t('Avanzado (desbloquea S7): S7 gesto · S9 asistido · S10, S11, S13 progresión', () => assert.deepStrictEqual(ladder('advanced'), { 7: [G], 9: [A], 10: [PR], 11: [PR], 13: [PR] }));
t('Intermedio (desbloquea S8): S9 gesto · S10 asistido · S11, S13 progresión', () => assert.deepStrictEqual(ladder('intermediate'), { 9: [G], 10: [A], 11: [PR], 13: [PR] }));
t('Ya patiné antes (desbloquea S9): S9 gesto · S10 asistido · S11, S13 progresión', () => assert.deepStrictEqual(ladder('past'), { 9: [G], 10: [A], 11: [PR], 13: [PR] }));
t('Principiante (desbloquea S13): S13 gesto + asistido juntos', () => assert.deepStrictEqual(ladder('beginner'), { 13: [G, A] }));

console.log('\ninvariantes de seguridad (valen para cualquier plan o nivel futuro)');
Object.keys(PROFILES).forEach(k => {
  const L = ladder(k), u = PROFILES[k].unlocks.hockey, weeks = Object.keys(L).map(Number).sort((a, b) => a - b);
  t(`${k}: ningún ejercicio de hockey aparece antes de S${u}`, () => weeks.forEach(w => assert.ok(w >= u, 'S' + w)));
  t(`${k}: ve el gesto Y el asistido (los 2 ejercicios que se movieron)`, () => { const all = weeks.flatMap(w => L[w]); assert.ok(all.includes(G) && all.includes(A)); });
  t(`${k}: la progresión nunca llega antes de haber visto gesto y asistido`, () => { const seen = new Set(); weeks.forEach(w => { if (L[w].includes(PR)) assert.ok(seen.has(G) && seen.has(A), 'S' + w); L[w].forEach(n => seen.add(n)); }); });
  t(`${k}: el gesto nunca va después del asistido`, () => { const order = weeks.flatMap(w => L[w]); assert.ok(order.indexOf(G) <= order.indexOf(A)); });
});

console.log('\nestructura del plan');
t('la tabla tiene 3 peldaños, en orden, todos de alta intensidad', () => { assert.deepStrictEqual(Array.from(HOCKEY_STAGES, s => s.name), [G, A, PR]); assert.ok(HOCKEY_STAGES.every(s => s.hi === true)); });
t('las sesiones de hockey son S7, S9, S10, S11 y S13', () => assert.deepStrictEqual(Array.from(HOCKEY_SLOT_WEEKS), [7, 9, 10, 11, 13]));
t('ninguna semana tiene dos marcadores', () => W.forEach((w, i) => assert.ok(w.days.reduce((n, d) => n + d.exs.filter(x => x.slot === 'hockey').length, 0) <= 1, 'S' + (i + 1))));
t('no queda ningún ejercicio de hockey suelto en las semanas (solo el marcador)', () => W.forEach(w => w.days.forEach(d => d.exs.forEach(x => { if (/hockey/i.test(x.name)) assert.strictEqual(x.slot, 'hockey', x.name); }))));
t('S6 ya no tiene hockey y su jueves se llama por lo que contiene', () => { const d = W[5].days[3]; assert.ok(!d.exs.some(x => /hockey/i.test(x.name))); assert.ok(!/preparación/.test(d.goal) && /T-stop/.test(d.goal), d.goal); });
t('el desbloqueo más temprano (S7) coincide con la primera sesión de hockey', () => assert.strictEqual(Math.min(...Object.values(PROFILES).map(p => p.unlocks.hockey)), HOCKEY_SLOT_WEEKS[0]));

console.log(`\n${passed} pasan · ${failed} fallan\n`);
process.exit(failed ? 1 : 0);
