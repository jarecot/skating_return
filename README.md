# Return to Skating — 13 semanas

Aplicación web estática para acompañar un programa progresivo de patinaje inline. Puede utilizarse como guía por principiantes, intermedios o personas que regresan al patinaje.

## Incluye

- 13 semanas de progresión técnica.
- Sesiones detalladas con ejercicios, duración, series/repeticiones y criterios técnicos.
- Seguimiento individual de ejercicios mediante casillas.
- Skill Tracker con puntos de control en semanas 1, 4, 8 y 13.
- Training Log: fecha, semana, duración, distancia, RPE, FC y notas.
- Exportación/importación del progreso en JSON.
- Biblioteca de recursos con títulos oficiales de Rollerblade y enlaces directos cuando existe un vídeo específico.
- Búsquedas complementarias de YouTube.
- Modo claro/oscuro.
- Diseño mobile-first y responsive.
- Sin frameworks ni dependencias.

## Despliegue

Sube `index.html`, `styles.css` y `app.js` a GitHub y conecta el repositorio con Vercel. No requiere build command ni dependencias.

## Datos

El progreso se almacena localmente en el navegador mediante `localStorage`. Utiliza Exportar para crear una copia de seguridad antes de cambiar de dispositivo o navegador.


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
