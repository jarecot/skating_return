const assert = require('assert');
const S = require('../schedule.js');
let passed = 0, failed = 0;
const t = (n, fn) => { try { fn(); passed++; console.log('  ✓', n); } catch (e) { failed++; console.log('  ✗', n, '\n     ', e.message); } };

console.log('\nlayout — ningún día del plan se pierde');
[6, 5, 4, 3].forEach(k => {
  t(`modo ${k} días: los 6 días del plan quedan cubiertos EXACTAMENTE una vez`, () => {
    const all = S.layout(k).flatMap(x => x.sources).sort();
    assert.deepStrictEqual(all, [0, 1, 2, 3, 4, 5]);
  });
  t(`modo ${k} días: hay ${k} sesiones activas`, () => assert.strictEqual(S.layout(k).length, k));
});

console.log('\nmodo Lun–Vie (el que faltaba)');
t('existe la clave 5 con etiqueta que dice Lun a Vie', () => assert.ok(/Lun a Vie/.test(S.MODES[5].label)));
t('activa Lun, Mar, Mié, Jue, Vie', () => assert.deepStrictEqual(S.layout(5).map(x => x.day), [0, 1, 2, 3, 4]));
t('NO entrena sábado', () => assert.ok(!S.layout(5).some(x => x.day === 5)));
t('el contenido del sábado pasa al viernes (no se pierde)', () => assert.deepStrictEqual(S.layout(5).find(x => x.day === 4).sources, [4, 5]));
t('lunes a jueves quedan intactos', () => [0, 1, 2, 3].forEach(d => assert.deepStrictEqual(S.layout(5).find(x => x.day === d).sources, [d])));

console.log('\nmodo 6 días = plan completo, sin fusiones');
t('cada día solo contiene su propio contenido', () => S.layout(6).forEach(x => assert.deepStrictEqual(x.sources, [x.day])));

console.log('\ncompatibilidad con datos guardados en v7.0 (restDays 0/1/2)');
t('0 -> 6 días', () => assert.strictEqual(S.modeKey(0), 6));
t('2 -> 4 días', () => assert.strictEqual(S.modeKey(2), 4));
t('1 (5 días sin viernes) se conserva como modo propio, NO se convierte en Lun–Vie', () => {
  assert.strictEqual(S.modeKey(1), 'legacy5');
  assert.deepStrictEqual(S.layout(1).map(x => x.day), [0, 1, 2, 3, 5]);
});
t('legacy5 sigue sin perder ejercicios', () => assert.deepStrictEqual(S.layout(1).flatMap(x => x.sources).sort(), [0, 1, 2, 3, 4, 5]));
t('valores raros -> 6 días sin lanzar', () => { [undefined, null, 'x', 99, -1].forEach(v => assert.strictEqual(S.modeKey(v), 6)); });

console.log('\nrobustez');
t('sources siempre ordenados', () => S.layout(5).forEach(x => assert.deepStrictEqual(x.sources, [...x.sources].sort((a, b) => a - b))));
t('sin lanzar con totalDays distinto', () => assert.doesNotThrow(() => S.layout(5, 7)));

console.log(`\n${passed} pasan · ${failed} fallan\n`);
process.exit(failed ? 1 : 0);
