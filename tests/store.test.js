const assert = require('assert');
const S = require('../store.js');
let passed = 0, failed = 0;
const t = (name, fn) => { try { fn(); passed++; console.log('  ✓', name); } catch (e) { failed++; console.log('  ✗', name, '\n     ', e.message); } };
const fake = (initial) => { let d = initial === undefined ? {} : { [S.KEY]: initial }; return { getItem:k=>k in d?d[k]:null, setItem:(k,v)=>{d[k]=String(v)}, _d:d }; };

console.log('\nesc — anti XSS');
t('escapa <img onerror>', () => { const o = S.esc('<img src=x onerror="alert(1)">'); assert.ok(!o.includes('<')); assert.ok(o.includes('&lt;img')); });
t('escapa comillas y &',  () => assert.strictEqual(S.esc(`a&b"c'd`), 'a&amp;b&quot;c&#39;d'));
t('null/undefined -> ""', () => { assert.strictEqual(S.esc(null), ''); assert.strictEqual(S.esc(undefined), ''); });
t('números pasan',        () => assert.strictEqual(S.esc(42), '42'));

console.log('\nload — corrupción y recuperación');
t('sin datos -> estado limpio',        () => { const r = S.load(fake()); assert.strictEqual(r.recovered, false); assert.deepStrictEqual(r.state.logs, []); });
t('JSON corrupto NO lanza',            () => assert.doesNotThrow(() => S.load(fake('{corrupto'))));
t('JSON corrupto -> recovered + copia',() => { const st = fake('{corrupto'); const r = S.load(st); assert.ok(r.recovered); assert.strictEqual(st._d[S.BACKUP_KEY], '{corrupto'); });
t('storage que lanza -> no rompe',     () => { const bad = { getItem(){ throw new Error('denied'); }, setItem(){ throw new Error('denied'); } }; assert.doesNotThrow(() => S.load(bad)); });
t('save con cuota llena devuelve false',() => { const bad = { setItem(){ throw new Error('quota'); } }; assert.strictEqual(S.save(S.defaults(), bad), false); });
t('JSON válido pero tipo erróneo (array)', () => assert.doesNotThrow(() => S.load(fake('[1,2,3]'))));
t('null literal',                      () => assert.doesNotThrow(() => S.load(fake('null'))));

console.log('\nmigrate — datos v6 se conservan');
t('estado v6 sin version se migra',    () => { const v6 = { week:3, done:{'0-0-1':true}, logs:[{date:'2026-01-01',week:1,day:0,min:30,rpe:5,fatigue:2,pain:0,control:4,technique:4,notes:'ok'}], skills:{}, profile:'none', weekObjectives:{} }; const s = S.migrate(v6); assert.strictEqual(s.version, 7); assert.strictEqual(s.week, 3); assert.strictEqual(s.profile, 'beginner'); /* 'none' se unificó con Principiante en v7.1 */ assert.strictEqual(s.logs.length, 1); assert.strictEqual(s.done['0-0-1'], undefined, 'la clave v6 no debe sobrevivir'); assert.strictEqual(Object.keys(s.done).length, 1); });
t('semana fuera de rango se descarta', () => assert.strictEqual(S.migrate({week:99}).week, 0));
t('logs con basura se filtran',        () => assert.strictEqual(S.migrate({logs:[null, 5, 'x', {min:10}]}).logs.length, 1));
t('valores se acotan (rpe 99 -> 10)',  () => assert.strictEqual(S.migrate({logs:[{rpe:99}]}).logs[0].rpe, 10));
t('notas largas se recortan',          () => assert.strictEqual(S.migrate({logs:[{notes:'a'.repeat(9000)}]}).logs[0].notes.length, 2000));

console.log('\nparseImport');
t('JSON inválido -> ok:false',         () => assert.strictEqual(S.parseImport('nope').ok, false));
t('objeto ajeno -> ok:false',          () => assert.strictEqual(S.parseImport('{"foo":1}').ok, false));
t('progreso válido -> ok:true',        () => assert.strictEqual(S.parseImport('{"done":{},"logs":[]}').ok, true));
t('import con payload XSS se conserva como TEXTO (se escapa al pintar)', () => { const r = S.parseImport(JSON.stringify({done:{},logs:[{notes:'<script>x</script>'}]})); assert.ok(r.ok); assert.ok(S.esc(r.state.logs[0].notes).includes('&lt;script')); });
t('__proto__ no contamina',            () => { S.parseImport('{"__proto__":{"polluted":1},"done":{},"logs":[]}'); assert.strictEqual({}.polluted, undefined); });

console.log('\nexId — clave estable');
t('misma entrada -> misma clave',      () => assert.strictEqual(S.exId(0,1,'T-stop'), S.exId(0,1,'T-stop')));
t('acentos y símbolos se normalizan',  () => assert.strictEqual(S.slug('Frenado: gesto sin rodar'), 'frenado-gesto-sin-rodar'));
t('duplicados en un día se distinguen',() => assert.notStrictEqual(S.exId(0,1,'T-stop',0), S.exId(0,1,'T-stop',1)));


console.log('\nmigración de claves v6 -> v7 (índice -> nombre)');
t('el mapa cubre los 178 ejercicios de v6', () => assert.strictEqual(Object.keys(S.DONE_V6_TO_V7).length, 178));
t('S1 Lun: el índice 2 (glide) pasa a slug tras insertar 2 ejercicios', () => {
  // v6: 0-0-2 era "One-foot glide". En v7 hay 2 ejercicios nuevos delante (caer, levantarse).
  assert.strictEqual(S.DONE_V6_TO_V7['0-0-2'], '0|0|one-foot-glide');
});
t('S1 Lun: la casilla marcada de glide sigue marcada tras migrar', () => {
  const s = S.migrate({ done: { '0-0-2': true } });
  assert.strictEqual(s.done['0|0|one-foot-glide'], true);
});
t('claves desconocidas de v6 se descartan sin romper', () => assert.doesNotThrow(() => S.migrate({ done: { '99-99-99': true } })));
t('casillas en false no se migran', () => assert.strictEqual(Object.keys(S.migrate({ done: { '0-0-0': false } }).done).length, 0));
t('estado ya v7 conserva sus claves tal cual', () => { const s = S.migrate({ version: 7, done: { '2|1|t-stop': true } }); assert.strictEqual(s.done['2|1|t-stop'], true); });
t('migrar dos veces es idempotente', () => { const a = S.migrate({ done: { '0-0-2': true } }); const b = S.migrate(JSON.parse(JSON.stringify(a))); assert.deepStrictEqual(a.done, b.done); });


console.log('\nload — señal migrated');
t('datos v6 (sin version) -> migrated:true',  () => assert.strictEqual(S.load(fake(JSON.stringify({done:{},logs:[]}))).migrated, true));
t('datos v7 COMPLETOS -> migrated:false',      () => assert.strictEqual(S.load(fake(JSON.stringify(S.defaults()))).migrated, false));
t('datos v7 INCOMPLETOS -> migrated:true (se completan y persisten)', () => assert.strictEqual(S.load(fake(JSON.stringify({version:7,done:{},logs:[]}))).migrated, true));
t('sin datos -> migrated no true',            () => assert.notStrictEqual(S.load(fake()).migrated, true));


console.log('\nperfiles: Ninguna se unifica en Principiante');
t('un usuario con profile "none" guardado pasa a "beginner"', () => assert.strictEqual(S.migrate({ profile: 'none' }).profile, 'beginner'));
t('"beginner" se conserva', () => assert.strictEqual(S.migrate({ profile: 'beginner' }).profile, 'beginner'));
t('"past" e "intermediate" no se tocan', () => { assert.strictEqual(S.migrate({ profile: 'past' }).profile, 'past'); assert.strictEqual(S.migrate({ profile: 'intermediate' }).profile, 'intermediate'); });
t('perfil desconocido cae al valor por defecto, no rompe', () => assert.strictEqual(S.migrate({ profile: 'inventado' }).profile, 'past'));
t('un import con profile "none" también se unifica', () => assert.strictEqual(S.parseImport(JSON.stringify({ done: {}, logs: [], profile: 'none' })).state.profile, 'beginner'));


console.log('\nrestDays: los modos de calendario sobreviven a guardar y recargar');
[6, 5, 4, 3].forEach(k => t('modo ' + k + ' días se conserva tras migrate', () => assert.strictEqual(S.migrate({ restDays: k }).restDays, k)));
t('código antiguo 0 (6 días) se conserva', () => assert.strictEqual(S.migrate({ restDays: 0 }).restDays, 0));
t('código antiguo 1 (5 sin viernes) se conserva, NO se convierte en Lun–Vie', () => assert.strictEqual(S.migrate({ restDays: 1 }).restDays, 1));
t('código antiguo 2 (4 días) se conserva', () => assert.strictEqual(S.migrate({ restDays: 2 }).restDays, 2));
t('valor inválido (99, "x", null) cae a 0 sin romper', () => [99, 'x', null, -1].forEach(v => assert.strictEqual(S.migrate({ restDays: v }).restDays, 0)));
t('ida y vuelta: guardar y cargar conserva Lun–Vie', () => { const st = fake(JSON.stringify({ version: 7, restDays: 5, done: {}, logs: [] })); assert.strictEqual(S.load(st).state.restDays, 5); });


console.log('\nload — migrated detecta CAMBIOS reales, no solo el número de versión');
t('v7.0 con profile "none" -> migrated:true (aunque version ya sea 7)', () => { const r = S.load(fake(JSON.stringify({ version: 7, profile: 'none', done: {}, logs: [] }))); assert.strictEqual(r.migrated, true); assert.strictEqual(r.state.profile, 'beginner'); });
t('datos v7 ya limpios -> migrated:false (no reescribe sin necesidad)', () => { const clean = S.migrate({ version: 7, profile: 'past', done: {}, logs: [] }); assert.strictEqual(S.load(fake(JSON.stringify(clean))).migrated, false); });
t('restDays inválido en disco se corrige y marca migrated', () => assert.strictEqual(S.load(fake(JSON.stringify({ version: 7, restDays: 99, done: {}, logs: [] }))).migrated, true));
t('log con valores fuera de rango se acota y marca migrated', () => assert.strictEqual(S.load(fake(JSON.stringify({ version: 7, done: {}, logs: [{ rpe: 99 }] }))).migrated, true));

console.log(`\n${passed} pasan · ${failed} fallan\n`);
process.exit(failed ? 1 : 0);
