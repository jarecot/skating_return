/* ============================================================
   schedule.js — Calendario semanal (funciones puras, sin DOM)
   Decide qué días entrena el usuario y, si un día del plan
   queda fuera, a qué día se mueve su contenido para NO perder
   ejercicios (p. ej. el sábado integrador en el modo Lun–Vie).
   ============================================================ */
(function (root) {
  'use strict';

  const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  /**
   * Cada modo lista los días del PLAN (0=Lun..5=Sáb) que el usuario entrena.
   * `merge` indica adónde se traslada el contenido de un día omitido.
   * Los días con más contenido nuevo (viernes/sábado) nunca se descartan: se fusionan.
   */
  const MODES = {
    6: { label: '6 días · Lun a Sáb',        days: [0, 1, 2, 3, 4, 5], merge: {} },
    5: { label: '5 días · Lun a Vie',        days: [0, 1, 2, 3, 4],    merge: { 5: 4 } },   // sábado -> viernes
    4: { label: '4 días · Lun · Mié · Jue · Sáb', days: [0, 2, 3, 5],  merge: { 1: 0, 4: 3 } }, // martes -> lunes, viernes -> jueves
    3: { label: '3 días · Lun · Mié · Vie',  days: [0, 2, 4],          merge: { 1: 0, 3: 2, 5: 4 } }
  };
  // Compatibilidad con datos v7.0: restDays 0/1/2 = 6/5(sin vie)/4 días
  const LEGACY = { 0: 6, 1: 'legacy5', 2: 4 };

  MODES.legacy5 = { label: '5 días · sin viernes', days: [0, 1, 2, 3, 5], merge: { 4: 3 }, hidden: true };

  /** Normaliza lo guardado (número de días o código antiguo) a una clave de MODES. */
  function modeKey(saved) {
    if (saved === undefined || saved === null) return 6;
    if (Object.prototype.hasOwnProperty.call(MODES, saved) && saved !== 'legacy5') return saved;
    if (Object.prototype.hasOwnProperty.call(LEGACY, saved)) return LEGACY[saved];
    return 6;
  }

  const getMode = saved => MODES[modeKey(saved)];

  /**
   * Devuelve, para cada día ACTIVO, la lista de días del plan cuyo contenido se hace ese día:
   *   [{ day: 4, sources: [4, 5] }]  -> el viernes hace lo del viernes + lo del sábado.
   * Garantiza que todos los días del plan quedan cubiertos exactamente una vez.
   */
  function layout(saved, totalDays) {
    totalDays = totalDays || 6;
    const mode = getMode(saved);
    const map = {};
    mode.days.forEach(d => { map[d] = [d]; });
    for (let d = 0; d < totalDays; d++) {
      if (mode.days.includes(d)) continue;
      let target = mode.merge[d];
      // Por si un modo no declara destino: el día activo anterior más cercano (o el primero).
      if (target === undefined || !mode.days.includes(target)) {
        target = [...mode.days].reverse().find(x => x < d);
        if (target === undefined) target = mode.days[0];
      }
      map[target].push(d);
    }
    return mode.days.map(d => ({ day: d, sources: map[d].sort((a, b) => a - b) }));
  }

  const api = { DAY_NAMES, MODES, modeKey, getMode, layout };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Schedule = api;
})(typeof window !== 'undefined' ? window : globalThis);
