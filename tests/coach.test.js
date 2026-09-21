// Ejecutar con:  node tests/coach.test.js
const assert = require('assert');
const C = require('../coach.js');
let passed = 0, failed = 0;
const t = (name, fn) => { try { fn(); passed++; console.log('  ✓', name); } catch (e) { failed++; console.log('  ✗', name, '\n     ', e.message); } };
const L = (rpe, fatigue, pain, control, technique) => ({ rpe, fatigue, pain, control, technique });

console.log('\nlevelFor — los 6 casos que en v6 daban veredictos contradictorios');
t('dolor 1/5, resto perfecto -> green',        () => assert.strictEqual(C.levelFor(L(5,2,1,5,5)), 'green'));
t('dolor 3/5, resto perfecto -> yellow',       () => assert.strictEqual(C.levelFor(L(5,2,3,5,5)), 'yellow'));
t('control 2/5 -> yellow (antes red/yellow)',  () => assert.strictEqual(C.levelFor(L(5,2,0,2,4)), 'yellow'));
t('control 3/5 -> yellow (antes blue/neutral)',() => assert.strictEqual(C.levelFor(L(5,2,0,3,4)), 'yellow'));
t('RPE 8 -> yellow (antes red/yellow)',        () => assert.strictEqual(C.levelFor(L(8,2,0,4,4)), 'yellow'));
t('dolor 3/5 + control 2/5 -> yellow',         () => assert.strictEqual(C.levelFor(L(5,2,3,2,4)), 'yellow'));

console.log('\nlevelFor — umbrales rojos');
t('dolor 4/5 -> red',      () => assert.strictEqual(C.levelFor(L(5,2,4,4,4)), 'red'));
t('RPE 9 -> red',          () => assert.strictEqual(C.levelFor(L(9,2,0,4,4)), 'red'));
t('fatiga 5/5 -> red',     () => assert.strictEqual(C.levelFor(L(5,5,0,4,4)), 'red'));
t('control 1/5 -> red',    () => assert.strictEqual(C.levelFor(L(5,2,0,1,4)), 'red'));
t('técnica 1/5 -> red',    () => assert.strictEqual(C.levelFor(L(5,2,0,4,1)), 'red'));

console.log('\nlevelFor — datos incompletos y valores raros');
t('sin datos -> neutral',           () => assert.strictEqual(C.levelFor({}), 'neutral'));
t('null -> neutral',                () => assert.strictEqual(C.levelFor(null), 'neutral'));
t('strings numéricos funcionan',    () => assert.strictEqual(C.levelFor({rpe:'5',fatigue:'2',pain:'0',control:'4',technique:'4'}), 'green'));
t('NaN/basura no rompe',            () => assert.doesNotThrow(() => C.levelFor({rpe:'abc',pain:undefined})));
t('solo dolor 4 (resto vacío) -> red', () => assert.strictEqual(C.levelFor({pain:4}), 'red'));

console.log('\nassess — ventana móvil de 3 sesiones');
t('sin logs -> empty, factor 1',    () => { const a = C.assess([]); assert.ok(a.empty); assert.strictEqual(a.factor, 1); });
t('una sesión roja -> red .55',     () => { const a = C.assess([L(5,2,4,4,4)]); assert.strictEqual(a.level,'red'); assert.strictEqual(a.factor,.55); });
t('roja seguida de buena -> yellow o mejor NO borra la roja de hace 2', () => {
  const a = C.assess([L(5,2,4,4,4), L(4,2,0,5,5), L(4,2,0,5,5)]);
  assert.notStrictEqual(a.level, 'red'); // la roja ya salió de la última evaluación efectiva
});
t('2 amarillas en las últimas 3 -> red (racha)', () => {
  const a = C.assess([L(5,2,0,3,4), L(5,2,0,3,4), L(4,2,0,5,5)]);
  assert.strictEqual(a.level, 'red'); assert.ok(a.streak);
});
t('amarilla + verde reciente NO sube a verde', () => {
  const a = C.assess([L(5,2,0,3,4), L(4,2,0,5,5)]);
  assert.notStrictEqual(a.level, 'green');
});
t('3 verdes seguidas -> green 1.05', () => {
  const a = C.assess([L(4,2,0,5,5), L(4,2,0,5,5), L(4,2,0,5,5)]);
  assert.strictEqual(a.level, 'green'); assert.strictEqual(a.factor, 1.05);
});
t('controlLow se activa con control<=2', () => assert.ok(C.assess([L(5,2,0,2,4)]).controlLow));
t('controlLow NO se activa con control 4', () => assert.ok(!C.assess([L(5,2,0,4,4)]).controlLow));
t('una sola fuente de verdad: texto y factor coinciden con el nivel', () => {
  ['red','yellow','green'].forEach(lv => {
    const sample = { red:[L(5,2,4,4,4)], yellow:[L(5,2,3,5,5)], green:[L(4,2,0,5,5),L(4,2,0,5,5),L(4,2,0,5,5)] }[lv];
    const a = C.assess(sample);
    assert.strictEqual(a.level, lv);
    assert.ok(a.title && a.text && a.factor);
  });
});


console.log('\ntexto de racha coherente');
t('racha por acumulación NO menciona dolor ni pérdida de control', () => {
  const a = C.assess([L(5,2,0,3,4), L(5,2,0,3,4), L(4,2,0,5,5)]);
  assert.ok(a.streak); assert.ok(!/dolor|pérdida de control/i.test(a.text.replace(/molestias/gi,'')), a.text);
  assert.ok(/acumulada/.test(a.title));
});
t('racha y rojo aislado tienen títulos distintos', () => {
  const streak = C.assess([L(5,2,0,3,4), L(5,2,0,3,4), L(4,2,0,5,5)]);
  const redOne = C.assess([L(5,2,4,4,4)]);
  assert.notStrictEqual(streak.title, redOne.title);
});


console.log('\nefficiency — FC comparada a igual RPE (corrige el bug FC/RPE de v7.0)');
const E = (hr, rpe) => ({ hr, rpe });
t('CASO DE LA CAPTURA: FC baja 128→120 con RPE 4 -> better (v7.0 decía "sube")', () => {
  const r = C.efficiency([E(128,4), E(132,5), E(130,5), E(124,4), E(120,4)]);
  assert.strictEqual(r.trend, 'better'); assert.ok(r.avgDelta < 0, 'avgDelta=' + r.avgDelta);
});
t('el método antiguo (cociente FC/RPE) daba la conclusión INVERTIDA en ese caso', () => {
  // Reproduce el algoritmo de v7.0: media de FC/RPE en la 1ª mitad vs la 2ª mitad
  const rows = [E(128,4), E(132,5), E(130,5), E(124,4), E(120,4)];
  const ratio = l => l.hr / l.rpe, half = Math.floor(rows.length / 2);
  const avg = a => a.reduce((s, l) => s + ratio(l), 0) / a.length;
  const oldDelta = (avg(rows.slice(-half)) - avg(rows.slice(0, half))) / avg(rows.slice(0, half)) * 100;
  assert.ok(oldDelta > 3, 'el método viejo dijo "sube" (+' + oldDelta.toFixed(1) + '%)');   // conclusión errónea
  assert.strictEqual(C.efficiency(rows).trend, 'better');                                    // el método nuevo acierta
});
t('FC sube a igual RPE -> worse', () => assert.strictEqual(C.efficiency([E(120,4), E(126,4), E(132,4)]).trend, 'worse'));
t('FC estable (<3 lpm) -> stable', () => assert.strictEqual(C.efficiency([E(130,5), E(131,5)]).trend, 'stable'));
t('sin dos sesiones al mismo RPE -> null (no inventa conclusión)', () => assert.strictEqual(C.efficiency([E(120,3), E(130,4), E(140,5)]), null));
t('sin datos -> null', () => { assert.strictEqual(C.efficiency([]), null); assert.strictEqual(C.efficiency(null), null); });
t('ignora sesiones sin FC o sin RPE', () => assert.strictEqual(C.efficiency([{hr:0,rpe:4},{hr:130,rpe:0},{hr:130,rpe:4}]), null));
t('RPE distintos NO se mezclan: bajar RPE no se lee como mejora', () => {
  // FC sube de 120→150 solo porque el esfuerzo subió de 3→7: sin igual RPE no hay conclusión
  assert.strictEqual(C.efficiency([E(120,3), E(150,7)]), null);
});
t('promedia varios niveles de RPE', () => {
  const r = C.efficiency([E(130,4), E(120,4), E(150,6), E(146,6)]);
  assert.strictEqual(r.groups.length, 2); assert.strictEqual(r.trend, 'better');
});
t('strings numéricos funcionan', () => assert.strictEqual(C.efficiency([{hr:'130',rpe:'4'},{hr:'120',rpe:'4'}]).trend, 'better'));

console.log(`\n${passed} pasan · ${failed} fallan\n`);
process.exit(failed ? 1 : 0);
