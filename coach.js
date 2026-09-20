/* ============================================================
   coach.js — Motor de Coach ÚNICO (funciones puras, sin DOM)
   Reemplaza a coach(), coachFor() y coachAdjustment() de v6,
   que daban veredictos contradictorios para el mismo registro.
   Umbrales: ver tests/coach.test.js
   ============================================================ */
(function (root) {
  'use strict';

  const num = v => { const n = Number(v); return Number.isFinite(n) ? n : 0; };

  /** Nivel de UNA sesión. Devuelve 'red' | 'yellow' | 'green' | 'neutral'. */
  function levelFor(l) {
    if (!l) return 'neutral';
    const r = num(l.rpe), f = num(l.fatigue), p = num(l.pain),
          c = num(l.control), t = num(l.technique);
    // ROJO: señal fuerte de dolor, esfuerzo máximo, fatiga extrema o pérdida grave de control/técnica
    if (p >= 4 || r >= 9 || f >= 5 || (c && c <= 1) || (t && t <= 1)) return 'red';
    // AMARILLO: molestia moderada, esfuerzo alto, fatiga alta, o control/técnica limitados
    if (p >= 2 || r >= 7 || f >= 4 || (c && c <= 3) || (t && t <= 3)) return 'yellow';
    // VERDE: todo el bloque de datos presente y bueno
    if (r && r <= 6 && f && f <= 3 && p <= 1 && c >= 4 && t >= 4) return 'green';
    return 'neutral';
  }

  const RANK = { neutral: 0, green: 0, yellow: 1, red: 2 };

  /**
   * Nivel efectivo mirando las últimas 3 sesiones (ventana móvil).
   * - Una buena sesión ya NO borra una racha mala.
   * - 2+ sesiones amarillas en las últimas 3 escalan a rojo.
   */
  function effectiveLevel(logs) {
    if (!logs || !logs.length) return { level: 'neutral', streak: false };
    const recent = logs.slice(-3);
    const levels = recent.map(levelFor);
    const last = levels[levels.length - 1];
    if (last === 'red') return { level: 'red', streak: false };
    const yellows = levels.filter(x => x === 'yellow').length;
    if (yellows >= 2) return { level: 'red', streak: true };
    if (last === 'yellow') return { level: 'yellow', streak: false };
    // Última buena, pero hubo amarillo reciente: no subimos a verde todavía
    if (last === 'green' && levels.some(x => x === 'yellow')) return { level: 'neutral', streak: false, recentYellow: true };
    return { level: last, streak: false };
  }

  const COPY = {
    red: {
      icon: '🔴', title: 'Rojo · recuperar / modificar', factor: 0.55,
      text: 'Señal importante de carga, dolor o pérdida de control. La siguiente sesión baja ~45% la carga, sin aceleraciones ni hockey stop y sin habilidades nuevas. Si hay dolor articular, agudo o persistente, detén la actividad y busca valoración profesional.'
    },
    yellow: {
      icon: '🟡', title: 'Amarillo · mantener / reducir', factor: 0.75,
      text: 'La siguiente sesión reduce ~25% la carga. Mantén habilidades ya conocidas y no desbloquees una nueva hasta recuperar control y técnica.'
    },
    green: {
      icon: '🟢', title: 'Verde · progresión disponible', factor: 1.05,
      text: 'La carga se toleró bien y la técnica se mantuvo. Puedes seguir el plan y aumentar UNA sola variable (~5–10%): tiempo, repeticiones o dificultad.'
    },
    neutral: {
      icon: '🔵', title: 'Mantener el plan', factor: 1,
      text: 'Usa la sesión prevista y prioriza calidad. Faltan datos (RPE, fatiga, dolor, control y técnica) para una adaptación más precisa.'
    }
  };

  /** Veredicto completo para el conjunto de sesiones: nivel + textos + factor de carga. */
  function assess(logs) {
    if (!logs || !logs.length) {
      return { level: 'neutral', icon: '🔵', factor: 1, streak: false, empty: true,
        title: 'Sin ajuste todavía',
        text: 'Registra una sesión para que el Coach adapte la siguiente.' };
    }
    const eff = effectiveLevel(logs);
    const c = COPY[eff.level];
    let text = c.text;
    if (eff.streak) {
      // Racha por acumulación (no hay una señal roja aislada): texto propio, sin mencionar dolor o pérdida de control
      text = 'Llevas varias sesiones seguidas en amarillo: es señal de fatiga acumulada. La siguiente sesión baja ~45% la carga, sin aceleraciones ni hockey stop y sin habilidades nuevas. Prioriza sueño y recuperación; si notas molestias, consúltalo con un profesional.';
    }
    if (eff.recentYellow) text = 'Tu última sesión fue buena, pero hubo una amarilla reciente: mantén el plan sin subir carga todavía.';
    const last = logs[logs.length - 1];
    return {
      level: eff.level, icon: c.icon, factor: c.factor, streak: !!eff.streak,
      title: eff.recentYellow ? 'Mantener el plan' : eff.streak ? 'Rojo · fatiga acumulada' : c.title,
      text, controlLow: num(last.control) > 0 && num(last.control) <= 2
    };
  }


  /**
   * Eficiencia aeróbica: compara la FC entre sesiones con el MISMO RPE.
   * (v7.0 usaba FC/RPE, que sube cuando el RPE baja aunque el corazón trabaje menos: conclusión invertida.)
   * Para cada RPE con >=2 sesiones se mide el cambio de FC entre la primera y la última.
   * Devuelve null si no hay evidencia comparable.
   */
  function efficiency(logs) {
    const rows = (logs || []).filter(l => num(l.hr) > 0 && num(l.rpe) > 0);
    const byRpe = {};
    rows.forEach(l => { (byRpe[num(l.rpe)] = byRpe[num(l.rpe)] || []).push(num(l.hr)); });
    const groups = Object.keys(byRpe).map(Number).filter(r => byRpe[r].length >= 2).sort((a, b) => a - b)
      .map(r => { const h = byRpe[r]; return { rpe: r, first: h[0], last: h[h.length - 1], n: h.length, delta: h[h.length - 1] - h[0] }; });
    if (!groups.length) return null;
    // Cambio medio ponderado por nº de comparaciones (n-1), en latidos por minuto
    const w = groups.reduce((s, g) => s + (g.n - 1), 0);
    const avg = groups.reduce((s, g) => s + g.delta * (g.n - 1), 0) / w;
    const trend = Math.abs(avg) < 3 ? 'stable' : avg < 0 ? 'better' : 'worse';
    return { trend, avgDelta: Math.round(avg * 10) / 10, groups };
  }

  const api = { levelFor, effectiveLevel, assess, efficiency, RANK };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Coach = api;
})(typeof window !== 'undefined' ? window : globalThis);
