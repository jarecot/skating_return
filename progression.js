/* ============================================================
   progression.js — Escalera de progresión por nivel (puro, sin DOM)
   Peldaños del hockey stop: 0 = gesto sin rodar · 1 = asistido (baja velocidad) · 2 = progresión.
   Regla: un ejercicio de hockey stop se muestra SOLO después de que el nivel del usuario lo desbloquea,
   y siempre en orden. Con las sesiones de hockey disponibles desde el desbloqueo:
     · 1ª sesión -> gesto · 2ª -> asistido · 3ª y siguientes -> progresión
     · si solo queda UNA sesión (p. ej. Principiante, que desbloquea en la última semana),
       gesto y asistido van JUNTOS en ella para que ninguno se pierda; no hay progresión.
   ============================================================ */
(function (root) {
  'use strict';
  function hockeyStages(o) {
    const unlock = Number(o && o.unlock), week = Number(o && o.week);
    if (!Number.isFinite(unlock) || !Number.isFinite(week)) return [];
    const slots = ((o && o.slotWeeks) || []).map(Number).filter(w => Number.isFinite(w) && w >= unlock).sort((a, b) => a - b);
    const i = slots.indexOf(week);
    if (i === -1) return [];
    if (slots.length === 1) return [0, 1];
    return [Math.min(i, 2)];
  }
  const api = { hockeyStages };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Progression = api;
})(typeof window !== 'undefined' ? window : globalThis);
