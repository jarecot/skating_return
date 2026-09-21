/* ============================================================
   store.js — Persistencia segura + utilidades de saneado
   Resuelve: (a) app en blanco con localStorage corrupto,
             (b) XSS por innerHTML con texto libre,
             (c) sin versionado de esquema,
             (d) importación sin validar.
   ============================================================ */
(function (root) {
  'use strict';

  const KEY = 'rts13_v2';           // se mantiene la clave para NO perder datos de v6
  const BACKUP_KEY = 'rts13_backup';
  const SCHEMA_VERSION = 7;
  const VALID_PROFILES = ['beginner', 'past', 'intermediate', 'advanced'];

  /* Mapa v6 (semana-día-índice) -> v7 (semana|día|slug). Generado comparando ambos planes. */
  const DONE_V6_TO_V7 = {"0-0-0":"0|0|postura-atletica","0-0-1":"0|0|marcha-en-v","0-0-2":"0|0|one-foot-glide","0-0-3":"0|0|frenado-gesto-sin-rodar","0-1-0":"0|1|calentamiento-sobre-patines","0-1-1":"0|1|basic-stride","0-1-2":"0|1|a-frame-turn","0-1-3":"0|1|t-stop","0-2-0":"0|2|rodaje-muy-facil","0-2-1":"0|2|postura-atletica","0-2-2":"0|2|one-foot-glide","0-3-0":"0|3|calentamiento-sobre-patines","0-3-1":"0|3|heel-brake-control-de-velocidad","0-3-2":"0|3|t-stop","0-3-3":"0|3|frenado-de-emergencia-preparacion","0-4-0":"0|4|basic-stride","0-4-1":"0|4|a-frame-turn","0-4-2":"0|4|carving-en-s","0-4-3":"0|4|t-stop","0-5-0":"0|5|calentamiento-sobre-patines","0-5-1":"0|5|circuito-basico","0-5-2":"0|5|rodaje-continuo","1-0-0":"1|0|calentamiento-sobre-patines","1-0-1":"1|0|t-stop","1-0-2":"1|0|heel-brake-control-de-velocidad","1-0-3":"1|0|stop-go","1-1-0":"1|1|one-foot-glide","1-1-1":"1|1|one-foot-stance","1-1-2":"1|1|slalom-tecnico","1-2-0":"1|2|calentamiento-sobre-patines","1-2-1":"1|2|rodaje-continuo","1-3-0":"1|3|forward-swizzle-lemon","1-3-1":"1|3|basic-stride","1-3-2":"1|3|t-stop","1-3-3":"1|3|heel-brake-control-de-velocidad","1-4-0":"1|4|parallel-turn","1-4-1":"1|4|a-frame-turn","1-4-2":"1|4|carving-en-s","1-4-3":"1|4|t-stop","1-5-0":"1|5|calentamiento-sobre-patines","1-5-1":"1|5|circuito-control","2-0-0":"2|0|calentamiento-sobre-patines","2-0-1":"2|0|push-recover","2-0-2":"2|0|one-foot-glide","2-1-0":"2|1|forward-swizzle-lemon","2-1-1":"2|1|carving-en-s","2-1-2":"2|1|crossover-preparacion","2-2-0":"2|2|calentamiento-sobre-patines","2-2-1":"2|2|rodaje-z2-subjetivo","2-3-0":"2|3|crossover-lento","2-3-1":"2|3|parallel-turn","2-3-2":"2|3|t-stop","2-4-0":"2|4|slalom-tecnico","2-4-1":"2|4|a-frame-turn","2-4-2":"2|4|one-foot-glide","2-5-0":"2|5|bloques-tecnicos","3-0-0":"3|0|calentamiento-sobre-patines","3-0-1":"3|0|crossovers-en-circulo","3-0-2":"3|0|carving-en-s","3-1-0":"3|1|parallel-turn","3-1-1":"3|1|radio-progresivo","3-1-2":"3|1|t-stop","3-2-0":"3|2|calentamiento-sobre-patines","3-2-1":"3|2|rodaje-continuo","3-3-0":"3|3|slalom-tecnico","3-3-1":"3|3|crossover-forward","3-3-2":"3|3|transitions-preparacion","3-4-0":"3|4|one-foot-glide","3-4-1":"3|4|parallel-turn","3-4-2":"3|4|crossover-forward","3-4-3":"3|4|t-stop","3-5-0":"3|5|rodaje-tecnico","4-0-0":"4|0|calentamiento-sobre-patines","4-0-1":"4|0|backward-basics","4-0-2":"4|0|backward-swizzle","4-1-0":"4|1|forward-backward","4-1-1":"4|1|backward-forward","4-2-0":"4|2|calentamiento-sobre-patines","4-2-1":"4|2|rodaje-facil","4-3-0":"4|3|backward-basics","4-3-1":"4|3|backward-a-frame","4-3-2":"4|3|backward-slalom-ancho","4-4-0":"4|4|crossover-forward","4-4-1":"4|4|forward-backward-transition","4-4-2":"4|4|t-stop","4-5-0":"4|5|forward-crossover-transition-backward","5-0-0":"5|0|calentamiento-sobre-patines","5-0-1":"5|0|aceleracion-submaxima","5-0-2":"5|0|t-stop","5-1-0":"5|1|parallel-turn","5-1-1":"5|1|carving-en-s","5-1-2":"5|1|crossover-forward","5-2-0":"5|2|calentamiento-sobre-patines","5-2-1":"5|2|rodaje-continuo","5-3-0":"5|3|gesto-hockey-stop","5-3-1":"5|3|hockey-stop-asistido","5-3-2":"5|3|t-stop","5-4-0":"5|4|slalom-tecnico","5-4-1":"5|4|crossover-forward","5-4-2":"5|4|forward-backward-transition","5-5-0":"5|5|rodaje-progresivo","6-0-0":"6|0|power-stride","6-0-1":"6|0|one-foot-glide","6-1-0":"6|1|crossover-con-presion","6-1-1":"6|1|parallel-turn","6-2-0":"6|2|rodaje","6-3-0":"6|3|slalom-controlado","6-3-1":"6|3|forward-backward-transition","6-4-0":"6|4|t-stop","6-4-1":"6|4|hockey-stop-progresion","6-4-2":"6|4|heel-brake-control-de-velocidad","6-5-0":"6|5|6-3-min-moderado-2-min-facil","7-0-0":"7|0|stride-eficiente","7-0-1":"7|0|carving-en-s","7-1-0":"7|1|crossover-forward","7-1-1":"7|1|parallel-turn","7-1-2":"7|1|one-foot-glide","7-2-0":"7|2|rodaje-continuo","7-3-0":"7|3|backward-basics","7-3-1":"7|3|forward-backward-transition","7-3-2":"7|3|t-stop","7-4-0":"7|4|slalom-crossover","7-5-0":"7|5|rodaje-facil","8-0-0":"8|0|texturas-suaves","8-0-1":"8|0|juntas-bumps-pequenos","8-1-0":"8|1|a-frame-turn","8-1-1":"8|1|carving-en-s","8-1-2":"8|1|lectura-de-obstaculos","8-2-0":"8|2|rodaje","8-3-0":"8|3|backward-basics","8-3-1":"8|3|forward-backward-transition","8-3-2":"8|3|hockey-stop-progresion","8-4-0":"8|4|stop-go","8-5-0":"8|5|ruta-segura","9-0-0":"9|0|calentamiento-sobre-patines","9-0-1":"9|0|6-8-10-s","9-0-2":"9|0|t-stop","9-1-0":"9|1|power-stride","9-1-1":"9|1|crossover-forward","9-2-0":"9|2|rodaje","9-3-0":"9|3|speed-control","9-3-1":"9|3|hockey-stop-progresion","9-4-0":"9|4|slalom-tecnico","9-4-1":"9|4|forward-backward-transition","9-5-0":"9|5|8-2-min-moderado-2-min-facil","10-0-0":"10|0|circuito-1","10-0-1":"10|0|circuito-2","10-1-0":"10|1|rodaje","10-2-0":"10|2|rodaje-muy-facil","10-3-0":"10|3|10-10-s","10-3-1":"10|3|t-stop","10-3-2":"10|3|hockey-stop-progresion","10-4-0":"10|4|slalom-crossovers","10-5-0":"10|5|rodaje","11-0-0":"11|0|calentamiento-sobre-patines","11-0-1":"11|0|basic-stride","11-0-2":"11|0|one-foot-glide","11-0-3":"11|0|t-stop","11-1-0":"11|1|a-frame-turn","11-1-1":"11|1|parallel-turn","11-1-2":"11|1|crossover-forward","11-2-0":"11|2|rodaje-tecnico","11-3-0":"11|3|backward-basics","11-3-1":"11|3|forward-backward-transition","11-4-0":"11|4|slalom-tecnico","11-4-1":"11|4|skating-over-bumps-and-tar-snakes","11-5-0":"11|5|sesion-integrada","12-0-0":"12|0|one-foot-glide","12-0-1":"12|0|t-stop","12-0-2":"12|0|parallel-turn","12-1-0":"12|1|slalom-tecnico","12-1-1":"12|1|crossover-forward","12-2-0":"12|2|rodaje","12-3-0":"12|3|backward-glide","12-3-1":"12|3|forward-backward-transition","12-4-0":"12|4|speed-control","12-4-1":"12|4|hockey-stop-progresion","12-5-0":"12|5|sesion-final-tecnica"};

  /** Escapa texto del usuario antes de meterlo en innerHTML. */
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const defaults = () => ({
    version: SCHEMA_VERSION, week: 0, done: {}, logs: [], skills: {}, skillScores: {},
    profile: 'past', weekObjectives: {}, restDays: 0, tests: {}
  });

  const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

  /** Sanea un log individual: fuerza tipos y recorta texto. */
  function cleanLog(l) {
    if (!isObj(l)) return null;
    const n = (v, lo, hi) => { const x = Number(v); return Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : 0; };
    return {
      date: typeof l.date === 'string' ? l.date.slice(0, 10) : '',
      week: n(l.week, 1, 13), day: n(l.day, 0, 5),
      min: n(l.min, 0, 1000), km: n(l.km, 0, 500), rpe: n(l.rpe, 0, 10), hr: n(l.hr, 0, 260),
      fatigue: n(l.fatigue, 0, 5), pain: n(l.pain, 0, 5), control: n(l.control, 0, 5), technique: n(l.technique, 0, 5),
      notes: typeof l.notes === 'string' ? l.notes.slice(0, 2000) : ''
    };
  }

  /** Migra y valida cualquier objeto de estado (v6 o anterior) al esquema actual. */
  function migrate(raw) {
    const s = defaults();
    if (!isObj(raw)) return s;
    if (Number.isInteger(raw.week) && raw.week >= 0 && raw.week <= 12) s.week = raw.week;
    if (isObj(raw.done)) {
      const legacy = !(raw.version >= 7);          // v6 y anteriores usaban índice
      Object.keys(raw.done).forEach(k => {
        if (!raw.done[k]) return;
        if (legacy) { if (DONE_V6_TO_V7[k]) s.done[DONE_V6_TO_V7[k]] = true; }
        else s.done[k] = true;
      });
    }
    if (Array.isArray(raw.logs)) s.logs = raw.logs.map(cleanLog).filter(Boolean);
    if (isObj(raw.skills)) s.skills = raw.skills;
    if (isObj(raw.skillScores)) s.skillScores = raw.skillScores;
    if (typeof raw.profile === 'string') {
      // Ninguna se unificó con Principiante en v7.1. Lista blanca: un valor desconocido no se acepta.
      const p = raw.profile === 'none' ? 'beginner' : raw.profile;
      if (VALID_PROFILES.includes(p)) s.profile = p;
    }
    if (isObj(raw.weekObjectives)) s.weekObjectives = raw.weekObjectives;
    if (isObj(raw.tests)) s.tests = raw.tests;
    if ([0, 1, 2, 3, 4, 5, 6].includes(raw.restDays)) s.restDays = raw.restDays;
    return s;
  }

  /** Carga el estado. NUNCA lanza: si está corrupto, guarda copia y devuelve estado limpio. */
  function load(storage) {
    storage = storage || root.localStorage;
    let text = null;
    try { text = storage.getItem(KEY); } catch (e) { return { state: defaults(), recovered: false, error: 'storage-unavailable' }; }
    if (!text) return { state: defaults(), recovered: false };
    try {
      const parsed = JSON.parse(text);
      const state = migrate(parsed);
      // 'migrated' = la migración cambió algo respecto a lo guardado. Comparar el CONTENIDO (no solo el
      // número de versión) evita que un cambio de datos sin subir de versión se quede sin persistir.
      const migrated = isObj(parsed) && JSON.stringify(state) !== JSON.stringify(parsed);
      return { state, recovered: false, migrated };
    } catch (e) {
      try { storage.setItem(BACKUP_KEY, text); } catch (_) {}   // conserva el texto dañado por si se puede rescatar
      return { state: defaults(), recovered: true, error: 'corrupt' };
    }
  }

  function save(state, storage) {
    storage = storage || root.localStorage;
    try { storage.setItem(KEY, JSON.stringify(state)); return true; }
    catch (e) { return false; }   // cuota llena o modo privado
  }

  /** Valida un archivo importado. Devuelve {ok, state} o {ok:false, reason}. */
  function parseImport(text) {
    let x;
    try { x = JSON.parse(text); } catch (e) { return { ok: false, reason: 'El archivo no es JSON válido.' }; }
    if (!isObj(x)) return { ok: false, reason: 'El archivo no tiene el formato esperado.' };
    if (!isObj(x.done) && !Array.isArray(x.logs)) return { ok: false, reason: 'No parece un archivo de progreso de esta app.' };
    return { ok: true, state: migrate(x) };
  }

  /** Clave estable de ejercicio: semana-día-slug(nombre). Sobrevive a reordenar el array. */
  const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const exId = (wi, di, name, occurrence) => `${wi}|${di}|${slug(name)}${occurrence ? '#' + occurrence : ''}`;

  const api = { VALID_PROFILES, DONE_V6_TO_V7, KEY, BACKUP_KEY, SCHEMA_VERSION, esc, defaults, cleanLog, migrate, load, save, parseImport, slug, exId };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Store = api;
})(typeof window !== 'undefined' ? window : globalThis);
