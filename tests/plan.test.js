// Integridad del PLAN (no de la lógica). Ejecutar con:  node tests/plan.test.js
const assert = require('assert'), vm = require('vm'), fs = require('fs'), path = require('path');
const R = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
const ctx = {}; vm.runInNewContext(R('plan.js') + R('guide.js') + ';this.W=W;this.PROFILES=PROFILES;this.GUIDE=GUIDE;this.skills=skills;this.HOCKEY_STAGES=HOCKEY_STAGES', ctx);
const { W, PROFILES, GUIDE, HOCKEY_STAGES } = ctx;
let passed = 0, failed = 0;
const t = (n, fn) => { try { fn(); passed++; console.log('  ✓', n); } catch (e) { failed++; console.log('  ✗', n, '\n     ', e.message); } };
// Los nombres del plan = ejercicios sueltos + los 3 peldaños del hockey stop (el marcador no es un ejercicio)
const names = new Set(HOCKEY_STAGES.map(s => s.name)); W.forEach(w => w.days.forEach(d => d.exs.forEach(x => { if (!x.slot) names.add(x.name); })));

console.log('\nguía de ejercicios');
t('los 70 ejercicios del plan tienen guía', () => assert.deepStrictEqual([...names].filter(n => !GUIDE[n]), []));
t('no hay guías huérfanas (nombre que no existe en el plan)', () => assert.deepStrictEqual(Object.keys(GUIDE).filter(n => !names.has(n)), []));
t('cada guía tiene qué es, pasos, error, criterio y consulta', () => new Set(Object.values(GUIDE)).forEach(g => { ['what', 'steps', 'mistake', 'ok', 'yt', 'needs'].forEach(k => assert.ok(g[k] && g[k].length, k + ' en ' + g.what.slice(0, 30))); }));
t('cada guía tiene entre 3 y 8 pasos', () => new Set(Object.values(GUIDE)).forEach(g => assert.ok(g.steps.length >= 3 && g.steps.length <= 8)));
t('NINGUNA consulta principal de YouTube contiene inglés', () => new Set(Object.values(GUIDE)).forEach(g => assert.ok(!/\b(inline|skating|how to|tutorial|beginner|drill|technique|tips)\b/i.test(g.yt), g.yt)));
t('no hay dos ejercicios distintos con la misma consulta', () => { const s = {}; new Set(Object.values(GUIDE)).forEach(g => { (s[g.yt] = s[g.yt] || []).push(1); }); Object.values(s).forEach(v => assert.strictEqual(v.length, 1)); });
t('ningún paso es una frase vacía o demasiado corta (<15 caracteres)', () => new Set(Object.values(GUIDE)).forEach(g => g.steps.forEach(s => assert.ok(s.length >= 15, s))));
t('las guías de frenado nombran QUÉ freno se practica', () => { assert.ok(/freno de talón|talón/i.test(GUIDE['Frenado: gesto sin rodar'].what + GUIDE['Frenado: gesto sin rodar'].steps.join(' '))); });

console.log('\nperfiles');
t('hay 4 perfiles y Ninguna ya no existe', () => { assert.deepStrictEqual(Object.keys(PROFILES).sort(), ['advanced', 'beginner', 'intermediate', 'past']); });
t('Principiante usa los valores más conservadores (factor .72, hockey S13)', () => { assert.strictEqual(PROFILES.beginner.factor, .72); assert.strictEqual(PROFILES.beginner.unlocks.hockey, 13); });
t('el factor de dosis crece con el nivel', () => { const f = ['beginner', 'past', 'intermediate', 'advanced'].map(k => PROFILES[k].factor); assert.deepStrictEqual(f, [...f].sort((a, b) => a - b)); });

// La escalera de hockey stop por nivel se prueba en tests/progression.test.js

console.log(`\n${passed} pasan · ${failed} fallan\n`);
process.exit(failed ? 1 : 0);
