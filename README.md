# Return to Skating — 13 semanas · v7.1

Aplicación web estática para acompañar un programa progresivo de patinaje inline. Puede utilizarse como guía por principiantes, intermedios o personas que regresan al patinaje. Funciona **sin conexión** y se puede instalar en el móvil.

## Incluye

- 13 semanas de progresión técnica, con **semanas de descarga (S4 y S8)**.
- Sesiones detalladas con ejercicios, duración, series/repeticiones y criterios técnicos.
- **Aprender a caer** (S1) y **trabajo en seco** de fuerza y equilibrio.
- **Guía paso a paso de cada ejercicio** (70): qué es, pasos numerados, error común, cómo saber que lo dominas y material necesario.
- **Vídeos en español** para cada ejercicio (búsqueda de YouTube en español), más opción en inglés y Rollerblade.
- **3, 4, 5 (Lun a Vie) o 6 días activos por semana**. El contenido de un día libre se traslada a otra sesión: no se pierde ningún ejercicio.
- **4 niveles** de entrada: Principiante, Ya patiné antes, Intermedio y Avanzado.
- **Escalera del hockey stop**: gesto → asistido → progresión, siempre después del desbloqueo de tu nivel.
- Seguimiento individual de ejercicios mediante casillas.
- **Skill Tracker medible**: cada prueba tiene unidad, dirección de mejora y calcula tu progreso.
- **Test final** comparando semana 1 vs semana 13.
- Training Log: fecha, semana, duración, distancia, RPE, FC y notas.
- **Gráfico de tendencia** de control y técnica, y **eficiencia aeróbica** (FC a igual RPE).
- **Coach adaptativo único** que mira las últimas 3 sesiones.
- Exportación/importación del progreso en JSON (validada).
- Modo claro/oscuro (sigue el del sistema), accesible por teclado y lector de pantalla.
- **PWA**: instalable y con uso sin conexión.
- Sin frameworks ni dependencias.

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de la página |
| `styles.css` | Estilos |
| `plan.js` | **Datos** del programa (semanas, ejercicios, skills, perfiles) |
| `guide.js` | **Guías** de los 70 ejercicios (pasos, error común, criterio, vídeos) |
| `schedule.js` | **Calendario**: días activos y traslado de días libres |
| `progression.js` | **Escalera** del hockey stop según el nivel |
| `coach.js` | **Lógica** del Coach (funciones puras, sin DOM) |
| `store.js` | Persistencia segura, migración y escape de HTML |
| `app.js` | Interfaz |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | PWA |
| `tests/` | Pruebas unitarias |

## Despliegue

Sube **todos** los archivos (no solo tres) a GitHub y conecta el repositorio con Vercel. No requiere build command ni dependencias. El service worker solo se activa en `https` o `localhost` (Vercel lo cumple).

Al modificar cualquier archivo, sube el número de `CACHE_VERSION` en `sw.js` para forzar la actualización en los móviles que ya la tengan instalada.

## Pruebas

```
node tests/coach.test.js
node tests/store.test.js
node tests/schedule.test.js
node tests/plan.test.js
node tests/progression.test.js
```

## Datos

El progreso se almacena localmente en el navegador (`localStorage`). Usa Exportar para crear una copia de seguridad antes de cambiar de dispositivo o navegador. Si los datos guardados se dañan, la app arranca limpia y conserva una copia del texto dañado en la clave `rts13_backup`.

**Migración desde v6:** al abrir v7 con datos de v6, tu progreso se convierte automáticamente. Las casillas marcadas se conservan aunque se hayan añadido ejercicios nuevos.

## v7.1 — cambios

- **Vídeos en español**: el botón principal de cada ejercicio busca en YouTube con una consulta en español (además de "En inglés" y Rollerblade).
- **Guía por ejercicio**: cada tarjeta muestra una frase clara y, al desplegarla, pasos, error común y criterio de éxito. Por ejemplo, "Frenado: gesto sin rodar" ahora indica que es el freno de talón y cómo colocar el patín.
- **Lun a Vie**: nueva opción de calendario. También hay modo de 3 días. El sábado (y cualquier día libre) se traslada a otra sesión con una etiqueta de su día de origen.
- **Niveles**: "Ninguna" y "Principiante" se unifican en **Principiante**, con los valores más conservadores (dosis 72 %, hockey stop en la semana 13). Los datos guardados con "Ninguna" se convierten automáticamente.
- **Hockey stop**: "Gesto hockey stop" y "Hockey stop asistido" estaban en la semana 6, antes de que ningún nivel desbloqueara el hockey stop, y nadie los veía nunca. Ahora se muestran después del desbloqueo de cada nivel y en orden (gesto → asistido → progresión).
- Títulos de día sin abreviatura repetida y sin la etiqueta "SESIÓN RECOMENDADA" en cada ejercicio.
- Correcciones internas: el modo de calendario se conserva al recargar, el nivel unificado se persiste, y el progreso cuenta los días trasladados.

**Nota sobre el hockey stop:** cada nivel lo ve por primera vez en la primera sesión de hockey posterior a su desbloqueo. Intermedio desbloquea en S8 pero no hay sesión de hockey en esa semana, así que lo ve desde S9.

## v7 — cambios

**Correcciones**
- El Coach ahora se actualiza al guardar una sesión (antes había que recargar).
- Texto libre escapado: se corrige un XSS por el campo Notas.
- La app ya no queda en blanco con `localStorage` corrupto.
- Un solo motor de Coach (había tres con veredictos contradictorios).
- Progreso identificado por nombre de ejercicio, no por posición.
- La eficiencia aeróbica compara la FC a igual RPE (un cociente FC/RPE daba conclusiones invertidas).

**Programa**
- Semanas de descarga S4 y S8; ninguna semana supera en más de un 10% el máximo ya tolerado.
- Sesión de caídas y de levantarse en la semana 1.
- Fuerza y equilibrio en seco.
- Los ejercicios de alta intensidad se marcan explícitamente (`hi:true`) para que el Coach los retire en rojo.

**Nota sobre el contenido:** las cifras de volumen, la descarga y el trabajo en seco son criterios generales de programación conservadora, no prescripción médica. Ante dolor articular, agudo o persistente, detén la actividad y consulta a un profesional.

## v4
- 13 semanas reales (se añadió una semana de consolidación antes del test final).
- Coach adaptativo según RPE, fatiga, dolor, control y técnica.
- Contraste reforzado en modo oscuro.
- Favicon SVG de patín.
- Enlaces Rollerblade muestran el título oficial del vídeo.
- Encabezado genérico sin referencia a 3×110.


## v5 — revisión técnica y científica

Esta versión revisa la progresión con un criterio conservador de coaching: primero postura/equilibrio y desplazamiento; después frenado y giros; luego backwards, transiciones, crossover y finalmente habilidades dinámicas como hockey stop, velocidad y superficies más complejas. El objetivo no es imponer una cifra universal de minutos —la literatura no establece una receta única para inline skating recreativo— sino evitar saltos de habilidad, intensidad o entorno que no estén respaldados por control técnico.

### Perfiles de experiencia
- **Ninguna:** menor volumen y desbloqueo más tardío de habilidades dinámicas.
- **Ya patiné antes:** retorno progresivo con reducción moderada de carga.
- **Principiante:** base conservadora.
- **Intermedio:** progresión estándar si ya domina frenado y control.
- **Avanzado:** pequeño incremento de volumen, manteniendo las mismas puertas de seguridad.

### Coach adaptativo
La app usa RPE, fatiga, molestias, control y técnica para ajustar visualmente la próxima sesión. Las recomendaciones son deliberadamente conservadoras: una señal importante de dolor o pérdida de control bloquea la progresión técnica y prioriza recuperación.

### Fuentes de referencia
- Sports Medicine Australia — Inline Skating Fact Sheet.
- American Academy/orthopaedic guidance on roller/inline skating injury prevention.
- American Orthopaedic Society for Sports Medicine — Inline Skating Injuries.
- Rollerblade — Time to Learn / Rollerblade TV.
- ACSM — exercise prescription and gradual progression principles.

Estas fuentes apoyan especialmente el aprendizaje inicial de postura, frenado, giro y stride, el uso de protección, la elección de superficies seguras y la progresión gradual. No se presenta ninguna cifra concreta de minutos como una norma oficial de la disciplina.


## v6 — objetivos y entorno
- Cada una de las 13 semanas incluye un objetivo general, expectativas, criterios de salida y tres objetivos marcables.
- Se distingue explícitamente entre rodaje técnico, exterior controlado y rodaje urbano sencillo.
- El entorno recomendado progresa de 🔵 controlado a 🟡 exterior controlado y 🟢 urbano sencillo, pero la habilidad manda sobre el calendario.
- El Coach modifica visualmente la siguiente sesión sin alterar el plan base: puede reducir carga, retirar temporalmente aceleraciones/hockey stop y priorizar T-stop cuando el control registrado es bajo.
- La progresión de entorno se basa en recomendaciones de Rollerblade para empezar en superficies lisas, planas y libres de tráfico/obstáculos y dominar el frenado antes de pendientes; las cifras exactas de volumen siguen siendo decisiones de programación conservadora, no normas oficiales.

### Referencias verificadas
- Rollerblade, Time to Learn: https://www.rollerblade.com/usa/en/time-to-learn
- Rollerblade, Technical Manual: https://www.rollerblade.com/assets/pdf/manual.pdf
- PubMed: In-line skating — use of protective equipment, falling patterns, and injuries: https://pubmed.ncbi.nlm.nih.gov/9641440/
- PubMed: Injury patterns and prophylaxis in inline skating: https://pubmed.ncbi.nlm.nih.gov/15856162/
