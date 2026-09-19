const YT=q=>`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const RB='https://www.rollerblade.com/usa/en/rollerblade-tv/Advice';
const RB_VIDEO={
 'Basic stride':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/basic-stride-2',
 'T-stop':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/t-stop-2',
 'Heel stop':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/heel-stop-2',
 'A Frame Turn':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/a-frame-turn-2',
 'Parallel Turn':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/parallel-turn-2',
 'Cross Over Turn Forward and Backward':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/cross-over-turn-forward-and-backward',
 'Skating Backward':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/skating-backward',
 'Hockey Stop':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/hockey-stop',
 'Controlling Speed':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/controlling-speed',
 'Skating Over Bumps and Tar Snakes':'https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/skating-over-bumps-and-tar-snakes'
};
const RB_NAME={
 'Basic stride':'Basic Stride','T-stop':'T-Stop','Heel stop':'Heel Stop','A-frame turn':'A Frame Turn','Parallel turn':'Parallel Turn','Crossover':'Cross Over Turn Forward and Backward','Crossover forward':'Cross Over Turn Forward and Backward','Backward basics':'Skating Backward','Hockey stop — progresión':'Hockey Stop','Speed control':'Controlling Speed','Skating Over Bumps and Tar Snakes':'Skating Over Bumps and Tar Snakes'
};
function rbFor(exercise){
 const n=exercise.name||'';
 for(const [k,url] of Object.entries(RB_VIDEO)) if(n.toLowerCase().includes(k.toLowerCase())) return {name:k,url};
 for(const [k,name] of Object.entries(RB_NAME)) if(n.toLowerCase().includes(k.toLowerCase())) return {name,url:RB_VIDEO[name]||RB};
 return null;
}

const RB_LEARN='https://www.rollerblade.com/usa/en/time-to-learn';
const RB_BACK='https://www.rollerblade.com/usa/en/the-rollerblade-experience/urban/danny-s-point-how-to-skate-backwards';
const state=JSON.parse(localStorage.getItem('rts13_v2')||'null')||{week:0,done:{},logs:[],skills:{},profile:'past',weekObjectives:{}};
state.profile=state.profile||'past';
state.weekObjectives=state.weekObjectives||{};
const save=()=>localStorage.setItem('rts13_v2',JSON.stringify(state));
const ex=(name,dose,desc,video,notes='')=>({name,dose,desc,video,notes});
const day=(name,goal,exs)=>({name,goal,exs});
const W=[];
function add(title,phase,focus,volume,targets,days){W.push({title,phase,focus,volume,targets,days})}
const common={
 warm:ex('Calentamiento sobre patines','5–7 min','Marcha suave, movilidad de tobillos/rodillas y 2–3 min de deslizamiento fácil.','inline skating warm up beginner'),
 stance:ex('Postura atlética','5 × 30 s','Rodillas y tobillos flexionados, pelvis centrada, mirada al frente y manos relajadas.','inline skating basic stance posture'),
 stride:ex('Basic stride','3 × 4 min','Empuje lateral suave y recuperación del pie debajo de la cadera. Prioriza simetría.','inline skating basic stride'),
 glide:ex('One-foot glide','6 × 10–20 m/lado','Desliza sobre un pie y recupera antes de perder estabilidad.','inline skating one foot glide'),
 aframe:ex('A-frame turn','6 × cada lado','Curvas amplias: inclina progresivamente y mantén el tronco estable.','inline skating A frame turn'),
 tstop:ex('T-stop','8 × cada lado','Empieza a baja velocidad; pie trasero en contacto progresivo. El objetivo es controlar, no arrastrar con fuerza.','inline skating T stop'),
 brake:ex('Heel brake + control de velocidad','8–10 rep','Si tienes freno compatible, practica primero en plano. Rodilla flexionada y freno progresivo.','inline skating heel stop speed control'),
 swizzle:ex('Forward swizzle / lemon','3 × 8 rep','Abre y cierra los pies con rodillas flexionadas para sentir los cantos.','inline skating forward swizzle lemon'),
 carving:ex('Carving en S','6 × 30–45 s','Curvas fluidas sin buscar velocidad; deja que tobillo y rodilla guíen el cambio de canto.','inline skating carving beginner'),
 crossover:ex('Crossover forward','6 × 20–30 s/lado','En curva amplia, cruza el pie exterior sobre el interior. Mantén el ritmo bajo control.','inline skating crossover beginner'),
 parallel:ex('Parallel turn','6 × cada lado','Pies paralelos, presión progresiva y mirada hacia la salida de la curva.','inline skating parallel turn'),
 backward:ex('Backward basics','4 × 2 min','Pasos pequeños y swizzle; mira por encima del hombro dominante.','inline skating backwards beginner'),
 transition:ex('Forward ↔ backward transition','8–10 rep','Practica a velocidad mínima y en espacio amplio.','inline skating forward backward transition'),
 slalom:ex('Slalom técnico','4 × 2 min','Conos separados para que la técnica sea fluida. Reduce distancia solo si mantienes postura.','inline skating beginner slalom'),
 speed:ex('Aceleración submáxima','6 × 8–10 s','Acelera hasta RPE 6; nunca sprint. Recupera 60–90 s.','inline skating acceleration technique'),
 hockey:ex('Hockey stop — progresión','6–8 rep','Solo si T-stop es sólido. Practica primero el gesto a velocidad muy baja.','inline skating hockey stop tutorial'),
}
add('Volver a sentir el patín','Readaptación','Equilibrio, postura, marcha y primer contacto con el frenado.', '90–120 min',['Superficie plana','RPE 3–4','Sin pendientes'],[
 day('Lun','Confianza', [common.stance,ex('Marcha en V','3 × 2 min','Pasos pequeños hasta conseguir deslizamiento.','inline skating beginner basic stride'),common.glide,ex('Frenado: gesto sin rodar','10 rep','Practica la posición sobre césped/alfombra antes de rodar.','inline skating heel brake braking technique')]),
 day('Mar','Desplazamiento',[common.warm,common.stride,common.aframe,common.tstop]),
 day('Mié','Recuperación técnica',[ex('Rodaje muy fácil','15–20 min','RPE 2–3. Busca relajación y simetría.','inline skating easy skating technique'),common.stance,common.glide]),
 day('Jue','Frenado',[common.warm,common.brake,common.tstop,ex('Frenado de emergencia: preparación','6 rep','Desde velocidad mínima, adopta postura estable antes de aumentar presión.','inline skating braking posture')]),
 day('Vie','Giros',[common.stride,common.aframe,common.carving,common.tstop]),
 day('Sáb','Integración',[common.warm,ex('Circuito básico','3 × 6 min','Stride → A-frame → frenado → rodaje fácil. Descansa 2 min entre vueltas.','inline skating basic workout'),ex('Rodaje continuo','10–15 min','RPE 3–4, sin perseguir kilómetros.','inline skating beginner endurance')])]);
add('Frenado + estabilidad','Base técnica','Hacer que detenerse sea una habilidad automática antes de subir velocidad.','105–135 min',['T-stop ambos lados','Heel brake si disponible','RPE 3–4'],[
 day('Lun','Frenado',[common.warm,common.tstop,common.brake,ex('Stop-go','8 ×','Rodar 15–20 m y frenar completamente; recupera caminando/rodando.','inline skating stop and go workout')]),
 day('Mar','Equilibrio',[common.glide,ex('One-foot stance','6 × 15 s/lado','Mantén el otro pie cerca del suelo como apoyo de seguridad.','inline skating one foot balance beginner'),common.slalom]),
 day('Mié','Aeróbico fácil',[common.warm,ex('Rodaje continuo','25–30 min','RPE 3–4; puedes hablar en frases completas.','inline skating fitness beginner')]),
 day('Jue','Transferencia',[common.swizzle,common.stride,common.tstop,common.brake]),
 day('Vie','Curvas',[common.parallel,common.aframe,common.carving,common.tstop]),
 day('Sáb','Circuito',[common.warm,ex('Circuito control','4 × 6 min','Slalom → carving → one-foot glide → T-stop. 2 min suaves entre vueltas.','inline skating basic workout')])]);
add('Zancada eficiente','Locomoción','Generar más desplazamiento con menos pasos y menos tensión.','120–150 min',['RPE 4–5','Glide estable','Empuje lateral'],[
 day('Lun','Stride',[common.warm,ex('Push & recover','5 × 3 min','Empuje lateral, recupera debajo del cuerpo y permite una fase de glide.','inline skating push recover technique'),common.glide]),
 day('Mar','Técnica',[common.swizzle,common.carving,ex('Crossover preparación','8 × 30 s','Transferencia de peso en curva amplia antes de buscar velocidad.','inline skating crossover beginner preparation')]),
 day('Mié','Endurance',[common.warm,ex('Rodaje Z2 subjetivo','30–35 min','RPE 4–5. Habla en frases; reduce si 645 dejó fatiga importante.','inline skating fitness endurance')]),
 day('Jue','Crossover',[ex('Crossover lento','8 × 30 s/lado','Curva grande, pocos cruces y mucha estabilidad.','inline skating crossover beginner'),common.parallel,common.tstop]),
 day('Vie','Agilidad',[common.slalom,common.aframe,common.glide]),
 day('Sáb','Rodaje técnico',[ex('Bloques técnicos','40 min','5 min stride → 5 min carving → 5 min crossover → 5 min fácil, repetir.','inline skating basic workout')])]);
add('Crossover + curvas','Curvas','Convertir los giros en una herramienta dinámica y simétrica.','130–165 min',['Crossover ambos sentidos','Radio de curva consistente','RPE 4–5'],[
 day('Lun','Crossover',[common.warm,ex('Crossovers en círculo','6 × 60 s/lado','Círculo grande; busca ritmo constante.','inline skating crossover turn'),common.carving]),
 day('Mar','Parallel turn',[common.parallel,ex('Radio progresivo','6 ×','Empieza amplio y reduce ligeramente el radio sin aumentar demasiado la velocidad.','inline skating tight parallel turn'),common.tstop]),
 day('Mié','Endurance',[common.warm,ex('Rodaje continuo','35–40 min','RPE 4–5; técnica constante.','inline skating fitness endurance')]),
 day('Jue','Agilidad',[common.slalom,common.crossover,ex('Transitions preparación','8 ×','Solo a paso lento. Aprende la orientación antes de añadir velocidad.','inline skating transitions beginner')]),
 day('Vie','Técnica',[common.glide,common.parallel,common.crossover,common.tstop]),
 day('Sáb','Sesión larga fácil',[ex('Rodaje técnico','45–50 min','Cada 10 min incluye 2 min de técnica.','inline skating endurance technique')])]);
add('Backwards + transiciones','Orientación','Introducir backwards y transiciones con margen de seguridad.','135–175 min',['Backwards estable','Transiciones lentas','RPE 4–5'],[
 day('Lun','Backwards',[common.warm,common.backward,ex('Backward swizzle','4 × 90 s','Abre/cierra suavemente; no busques velocidad.','inline skating backward swizzle')]),
 day('Mar','Transitions',[ex('Forward → backward','8 rep','Primero caminando/rodando muy lento; mira por encima del hombro.','inline skating forward backward transition'),ex('Backward → forward','8 rep','Espacio amplio y superficie plana.','inline skating transition backward forward')]),
 day('Mié','Endurance',[common.warm,ex('Rodaje fácil','40 min','Mayormente forward.','inline skating fitness endurance')]),
 day('Jue','Backwards curvas',[common.backward,ex('Backward A-frame','6 × cada lado','Curvas amplias a velocidad mínima.','inline skating backward A frame turn'),ex('Backward slalom ancho','4 × 60 s','Solo si puedes mirar y mantener trayectoria.','inline skating backward slalom')]),
 day('Vie','Combinación',[common.crossover,common.transition,common.tstop]),
 day('Sáb','Circuito',[ex('Forward → crossover → transition → backward','5 vueltas','Cada vuelta termina con frenado seguro.','inline skating transition crossover backwards')])]);
add('Control de velocidad','Frenado avanzado','Acelerar solo dentro de una zona en la que puedes volver a una velocidad segura.','145–185 min',['RPE moderado 5–6','Frenado automático','Sin pendientes'],[
 day('Lun','Aceleración',[common.warm,common.speed,common.tstop]),
 day('Mar','Curvas',[common.parallel,common.carving,common.crossover]),
 day('Mié','Endurance',[common.warm,ex('Rodaje continuo','45 min','RPE 4–5.','inline skating fitness endurance')]),
 day('Jue','Hockey stop preparación',[ex('Gesto hockey stop','8 rep','Practica el pivote de pies sin velocidad.','inline skating hockey stop beginner'),ex('Hockey stop asistido','6 rep','Solo si T-stop es fiable y tienes mucho espacio.','inline skating hockey stop tutorial'),common.tstop]),
 day('Vie','Agilidad',[common.slalom,common.crossover,common.transition]),
 day('Sáb','Progresivo',[ex('Rodaje progresivo','45–50 min','10 min fácil → 15 moderado → 5 técnica → 10 fácil.','inline skating endurance progression')])]);
add('Potencia técnica','Empuje','Aumentar calidad del empuje sin convertir la sesión en sprint.','150–195 min',['RPE 5–6','Power stride','Crossover fluido'],[
 day('Lun','Power stride',[ex('Power stride','5 × 3 min','Empuje más largo; recuperación completa del pie.','inline skating power stride'),common.glide]),
 day('Mar','Crossover potente',[ex('Crossover con presión','8 × 45 s/lado','Más presión sobre el exterior; mantén el torso estable.','inline skating crossover technique'),common.parallel]),
 day('Mié','Endurance',[ex('Rodaje','45 min','RPE 4–5.','inline skating fitness endurance')]),
 day('Jue','Agilidad',[ex('Slalom controlado','6 × 2 min','Aumenta ritmo solo si mantienes trayectoria.','inline skating slalom technique'),common.transition]),
 day('Vie','Frenado',[common.tstop,common.hockey,common.brake]),
 day('Sáb','Intervalos',[ex('6 × 3 min moderado / 2 min fácil','30 min','Bloques moderados RPE 6; nunca sprint.','inline skating interval training')])]);
add('Resistencia + economía','Base aeróbica','Aumentar tiempo sobre ruedas sin degradar técnica.','155–205 min',['RPE 4–5','50–60 min continuo','Técnica bajo fatiga'],[
 day('Lun','Economía',[ex('Stride eficiente','5 × 3 min','Menos pasos innecesarios; deja rodar después de cada empuje.','inline skating efficient stride'),common.carving]),
 day('Mar','Curvas',[common.crossover,common.parallel,common.glide]),
 day('Mié','Endurance',[ex('Rodaje continuo','50 min','RPE 4–5; si la técnica se rompe, reduce ritmo.','inline skating endurance')]),
 day('Jue','Skills',[common.backward,common.transition,common.tstop]),
 day('Vie','Agilidad',[ex('Slalom + crossover','30 min','5 min slalom → 5 min crossover → 2 min fácil, repetir.','inline skating slalom crossover')]),
 day('Sáb','Rodaje largo',[ex('Rodaje fácil','55–60 min','Ritmo conversacional; no buscar récord.','inline skating long distance beginner')])]);
add('Urban básico','Aplicación','Aprender a leer superficie y entorno sin introducir saltos ni riesgos innecesarios.','160–210 min',['Superficie conocida','Control total','RPE 4–5'],[
 day('Lun','Superficie',[ex('Texturas suaves','15 min','Pequeñas variaciones de pavimento a velocidad baja; rodillas flexionadas.','inline skating rough surface technique'),ex('Juntas/bumps pequeños','10 min','Practica absorber con tobillos y rodillas; no saltar.','inline skating skating over bumps')]),
 day('Mar','Urban',[common.aframe,common.carving,ex('Lectura de obstáculos','10 min','Acércate, evalúa, reduce velocidad y decide; no subas bordillos todavía.','inline skating urban safety')]),
 day('Mié','Endurance',[ex('Rodaje','50 min','Ruta plana conocida.','inline skating endurance')]),
 day('Jue','Skills',[common.backward,common.transition,common.hockey]),
 day('Vie','Control',[ex('Stop-go','20–25 min','Acelera 5 s, estabiliza y frena; 8–10 ciclos.','inline skating stop and go workout')]),
 day('Sáb','Ruta técnica',[ex('Ruta segura','55–60 min','Superficie conocida, sin tráfico y sin pendientes nuevas.','inline skating urban skating safety')])]);
add('Velocidad submáxima','Velocidad','Explorar velocidad sin perder técnica ni margen de frenado.','165–215 min',['RPE 6 máximo','Aceleraciones cortas','Frenado controlado'],[
 day('Lun','Acceleration',[common.warm,ex('6 × 8–10 s','20 min','Aceleración progresiva; 90 s fácil.','inline skating acceleration technique'),common.tstop]),
 day('Mar','Technique',[ex('Power stride','15 min','Longitud y recuperación.','inline skating power stride'),common.crossover]),
 day('Mié','Endurance',[ex('Rodaje','50–60 min','RPE 4–5.','inline skating endurance')]),
 day('Jue','Braking',[ex('Speed control','15 min','Aumenta solo hasta una velocidad que puedas frenar con margen.','inline skating speed control'),common.hockey]),
 day('Vie','Agility',[common.slalom,common.transition]),
 day('Sáb','Intervals',[ex('8 × 2 min moderado / 2 min fácil','32 min','RPE 6 en bloques moderados.','inline skating interval training')])]);
add('Integración','Performance recreativa','Combinar habilidades en sesiones completas parecidas a un entrenamiento real.','175–225 min',['Técnica bajo fatiga','RPE 4–6','Sesión larga'],[
 day('Lun','Skills circuit',[ex('Circuito 1','25 min','Stride → carving → crossover → stop.','inline skating basic workout'),ex('Circuito 2','15 min','Backward → transition → forward → T-stop.','inline skating transitions backwards')]),
 day('Mar','Endurance',[ex('Rodaje','60 min','RPE 4–5.','inline skating endurance')]),
 day('Mié','Recuperación',[ex('Rodaje muy fácil','25–30 min','RPE 2–3; movilidad sobre ruedas.','inline skating easy skating')]),
 day('Jue','Speed + braking',[ex('10 × 10 s','25 min','Aceleración submáxima, recuperación amplia.','inline skating acceleration'),common.tstop,common.hockey]),
 day('Vie','Agility',[ex('Slalom + crossovers','30 min','Bloques de 5 min.','inline skating slalom crossover')]),
 day('Sáb','Sesión larga',[ex('Rodaje','60–65 min','Técnica bajo fatiga; sin perseguir récord.','inline skating endurance')])]);
add('Consolidación técnica','Consolidación','Reducir variabilidad y convertir las habilidades principales en patrones fiables antes del test final.','165–215 min',['Calidad > velocidad','Simetría ambos lados','RPE 4–5'],[
 day('Lun','Fundamentos',[common.warm,common.stride,common.glide,common.tstop]),
 day('Mar','Curvas',[common.aframe,common.parallel,common.crossover]),
 day('Mié','Endurance',[ex('Rodaje técnico','50–60 min','RPE 4–5; revisa postura cada 10 min.','inline skating endurance technique')]),
 day('Jue','Orientación',[common.backward,common.transition]),
 day('Vie','Agilidad',[common.slalom,ex('Skating Over Bumps and Tar Snakes','12 min','Practica únicamente sobre irregularidades pequeñas, conocidas y seguras.','inline skating bumps tar snakes')]),
 day('Sáb','Simulación',[ex('Sesión integrada','55–65 min','Combina stride, giros, backwards, transiciones y frenado sin buscar velocidad máxima.','inline skating basic workout')])]);
add('Evaluación final','Testing','Demostrar control y comparar con la semana 1 sin perseguir marcas peligrosas.','150–200 min',['Test técnico','Comparar semanas 1/4/8/13','Registrar RPE, control y molestias'],[
 day('Lun','Test técnico',[common.glide,common.tstop,common.parallel]),
 day('Mar','Test agilidad',[common.slalom,common.crossover]),
 day('Mié','Endurance',[ex('Rodaje','50–60 min','RPE 4–5; técnica constante.','inline skating endurance')]),
 day('Jue','Backwards',[ex('Backward glide','12 min','Control visual y postura.','inline skating backwards'),common.transition]),
 day('Vie','Frenado',[ex('Speed control','15 min','Compara confianza, distancia y control con semana 1.','inline skating speed control'),common.hockey]),
 day('Sáb','Final 13 semanas',[ex('Sesión final técnica','60–70 min','10 fácil + 35–45 técnica/rodaje + 5–10 progresivo + 10 fácil. No buscar récord.','inline skating basic workout')])]);
const resources=[
 ['New to Inline Skating: Basic stride','Rollerblade · Basic Stride','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/basic-stride-2',RB],
 ['T-Stop','Rollerblade · T-Stop','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/t-stop-2',RB],
 ['Heel Stop','Rollerblade · Heel Stop','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/heel-stop-2',RB],
 ['A Frame Turn','Rollerblade · A Frame Turn','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/a-frame-turn-2',RB],
 ['Parallel Turn','Rollerblade · Parallel Turn','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/parallel-turn-2',RB],
 ['Cross Over Turn Forward and Backward','Rollerblade · Cross Over Turn Forward and Backward','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/cross-over-turn-forward-and-backward',RB],
 ['Skating Backward','Rollerblade · Skating Backward','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/skating-backward',RB],
 ['Hockey Stop','Rollerblade · Hockey Stop','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/hockey-stop',RB],
 ['Controlling Speed','Rollerblade · Controlling Speed','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/controlling-speed',RB],
 ['Skating Over Bumps and Tar Snakes','Rollerblade · Skating Over Bumps and Tar Snakes','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/skating-over-bumps-and-tar-snakes',RB],
 ['New to Inline Skating: A frame turn','Rollerblade · A Frame Turn','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/a-frame-turn-2',RB_LEARN],
 ['New to Inline Skating: Heel stop','Rollerblade · Heel Stop','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice/heel-stop-2',RB_LEARN],
 ['New to Inline Skating: How to put on protective gear','Rollerblade · Protective Gear','https://www.rollerblade.com/usa/en/time-to-learn',RB_LEARN],
 ['Danny’s Point: How to skate backwards','Rollerblade · Backwards progression','https://www.rollerblade.com/usa/en/the-rollerblade-experience/urban/danny-s-point-how-to-skate-backwards',RB_BACK],
 ['YouTube technique search','Búsqueda complementaria por técnica','inline skating beginner technique tutorial','']
];
const WEEK_GUIDE=[
 {objective:'Recuperar equilibrio y confianza básica sobre ruedas.',expect:'Es normal sentir rigidez y necesitar pausas frecuentes. La prioridad es volver a sentir el centro de gravedad, no acumular kilómetros.',environment:'🔵 Controlado — cancha, pista o parqueadero vacío, plano, liso, limpio y sin tráfico.',level:'Base: sin pendientes ni obstáculos móviles.'},
 {objective:'Hacer que el frenado y el control de velocidad sean respuestas confiables.',expect:'El frenado puede sentirse torpe al principio. Repite a baja velocidad hasta que la postura de frenado sea automática.',environment:'🔵 Controlado — superficie perfectamente plana. Todavía no usar calles ni pendientes como zona de aprendizaje.',level:'Puerta: antes de aumentar velocidad debes poder reducirla y detenerte con control.'},
 {objective:'Mejorar la zancada, el glide y la economía del movimiento.',expect:'El reto pasa de “no caer” a desplazarte con menos pasos y menos tensión. La calidad del empuje importa más que la distancia.',environment:'🔵 Controlado — espacio amplio y conocido; exterior solo si está libre de tráfico y obstáculos.',level:'Puerta: mantener trayectoria y frenado sin perder postura.'},
 {objective:'Dominar giros básicos y comenzar el crossover a velocidad baja.',expect:'Las curvas pueden exigir más control de un lado que del otro. La asimetría es normal; trabaja ambos sentidos.',environment:'🔵 Controlado — curvas amplias en pista/cancha o espacio exterior muy predecible.',level:'Puerta: giro y frenado antes de introducir recorridos urbanos.'},
 {objective:'Introducir desplazamiento hacia atrás y transiciones con amplio margen de seguridad.',expect:'Mirar hacia atrás y cambiar de orientación aumenta la carga cognitiva. Hazlo lento y con espacio libre.',environment:'🔵 Controlado — solo espacio amplio, plano y despejado. Nada de tráfico.',level:'Puerta: transición limpia a velocidad mínima antes de usarla fuera del entorno controlado.'},
 {objective:'Controlar la velocidad sin depender de ganar velocidad primero.',expect:'La velocidad empieza a ser una variable de entrenamiento, pero nunca debe superar tu capacidad de frenado.',environment:'🟡 Exterior controlado — paseo/ciclovía muy tranquila y plana, previamente inspeccionada; preferentemente acompañado.',level:'No usar pendientes ni cruces de tráfico para practicar velocidad.'},
 {objective:'Aumentar la potencia del empuje manteniendo técnica y control.',expect:'Sentirás más demanda muscular, pero no debería convertirse en sprint. Si la postura se rompe, reduce intensidad.',environment:'🟡 Exterior controlado o pista — superficie conocida, plana y con espacio para frenar.',level:'La potencia se añade solo dentro de un margen de frenado cómodo.'},
 {objective:'Aumentar el tiempo sobre ruedas sin deteriorar la técnica.',expect:'La fatiga puede hacer que vuelvas a una postura alta o pierdas precisión. Es una señal para bajar ritmo, no para forzar.',environment:'🟡 Exterior controlado — recorrido conocido, plano y predecible; evitar tráfico y superficies deterioradas.',level:'Rodaje largo ≠ rodaje urbano complejo.'},
 {objective:'Transferir habilidades a un entorno exterior real de baja complejidad.',expect:'La dificultad cambia por el entorno: juntas, textura, peatones y pequeños cambios de superficie requieren anticipación.',environment:'🟢 Rodaje exterior/urbano sencillo — ciclovía o paseo amplio, tranquilo, plano y previamente recorrido a pie.',level:'Solo si frenado, giros y control son consistentes. Preferible acompañado.'},
 {objective:'Explorar aceleraciones submáximas conservando margen de frenado.',expect:'Las aceleraciones son cortas. No persigas velocidad máxima; termina cada repetición con control completo.',environment:'🟡 Exterior controlado o pista — tramo recto, plano, despejado y con zona suficiente para desacelerar.',level:'No combinar aceleración con tráfico, bajadas o superficies desconocidas.'},
 {objective:'Integrar técnica, resistencia y lectura del entorno en sesiones completas.',expect:'La sesión se parecerá más a una salida recreativa, pero la técnica sigue mandando sobre el ritmo.',environment:'🟢 Rodaje urbano sencillo — recorrido conocido y de baja complejidad; evita cruces conflictivos y pendientes.',level:'Si el entorno obliga a improvisar frenadas, el recorrido es demasiado difícil.'},
 {objective:'Consolidar las habilidades principales y reducir errores antes de evaluar.',expect:'Puede parecer una semana “más fácil”. La intención es convertir movimientos aprendidos en patrones consistentes.',environment:'🟢 Exterior controlado/urbano sencillo según habilidades; vuelve a 🔵 si la técnica fluctúa.',level:'Calidad y simetría > velocidad o kilómetros.'},
 {objective:'Evaluar el progreso sin convertir el test en una competición.',expect:'La mejora puede verse en control, confianza, simetría y menor esfuerzo, aunque la velocidad no cambie.',environment:'🔵 o 🟡 según la prueba — usa el entorno más seguro que permita repetir los tests de forma comparable.',level:'No se desbloquea un entorno más difícil solo por completar el test.'}
];
W.forEach((w,i)=>Object.assign(w,WEEK_GUIDE[i]));
const WEEK_OBJECTIVES=[
 ['Mantener postura estable durante 60 s.','Desplazarte 10–15 min a RPE 3–4 sin perder control.','Practicar el gesto de frenado y detenerte de forma controlada a baja velocidad.'],
 ['Realizar T-stop a ambos lados a baja velocidad.','Usar heel brake de forma progresiva si el patín lo permite.','Completar 25–30 min fáciles sin deterioro importante de postura.'],
 ['Mantener glide sobre un pie durante 10–20 m por lado.','Realizar una zancada lateral fluida y simétrica.','Completar 30–35 min a RPE 4–5 conservando técnica.'],
 ['Ejecutar A-frame turn a ambos lados con radio amplio.','Realizar parallel turn básico sin perder trayectoria.','Practicar crossover lento sin aumentar velocidad para compensar.'],
 ['Desplazarte hacia atrás con pasos/swizzle controlados.','Realizar transiciones a velocidad mínima en espacio amplio.','Mantener frenado y orientación sin perder el control.'],
 ['Controlar velocidad y detenerte antes de agotar el espacio.','Completar aceleraciones submáximas sin perder postura.','Realizar una sesión exterior corta solo en recorrido plano y conocido.'],
 ['Mantener power stride sin convertirlo en sprint.','Ejecutar crossover fluido a ambos lados.','Completar 40–50 min con técnica estable.'],
 ['Completar 50–60 min con RPE 4–5 sin deterioro marcado.','Mantener frenado y giros después de acumular fatiga.','Reconocer cuándo reducir ritmo por pérdida de técnica.'],
 ['Recorrer un circuito exterior sencillo y conocido.','Gestionar cambios de textura menores sin perder postura.','Frenar y girar con anticipación ante peatones/obstáculos previsibles.'],
 ['Completar aceleraciones de 8–10 s a RPE ≤6.','Recuperar velocidad segura antes de cada repetición.','No depender de pendientes para generar velocidad.'],
 ['Integrar stride, giros, frenado y backwards en una sesión.','Completar un rodaje urbano sencillo sin improvisaciones peligrosas.','Mantener técnica durante una sesión larga a RPE 4–6.'],
 ['Repetir habilidades principales con menor variabilidad.','Comparar simetría izquierda/derecha con semanas anteriores.','Llegar al test sin fatiga acumulada innecesaria.'],
 ['Repetir los tests técnicos de semanas 1/4/8/13.','Registrar RPE, control, técnica y molestias.','Identificar qué habilidades están consolidadas y cuáles requieren más práctica.']
];
W.forEach((w,i)=>w.objectives=WEEK_OBJECTIVES[i]);

const skills=[
 ['Postura y equilibrio','Calidad 1–5','Mantener postura durante 60 s sin tensión excesiva.'],['One-foot glide','segundos por lado','Tiempo estable sobre un pie, sin cruzar brazos ni perder línea.'],['T-stop','metros para detener','Desde velocidad moderada, frenar de forma progresiva y repetible.'],['Parallel turn','calidad 1–5','Radio y trayectoria similares en ambos sentidos.'],['Crossover','segundos continuos/lado','Cruces fluidos sin levantarse ni perder línea.'],['Backwards','metros continuos','Trayectoria estable mirando por encima del hombro.'],['Transition','repeticiones limpias','Forward ↔ backward sin perder equilibrio.'],['Slalom','tiempo / circuito','Mantener trayectoria y postura con conos separados.'],['Hockey stop','calidad 1–5','Solo medir si ya es técnicamente seguro.']
];
const PROFILES={
 none:{label:'Ninguna',desc:'Nunca he patinado',factor:.72,unlocks:{tstop:1,crossover:5,backward:7,transition:7,hockey:13}},
 past:{label:'Ya patiné antes',desc:'Tengo experiencia previa, pero estoy retomando',factor:.88,unlocks:{tstop:1,crossover:4,backward:5,transition:5,hockey:9}},
 beginner:{label:'Principiante',desc:'Sé lo básico y todavía estoy construyendo confianza',factor:.82,unlocks:{tstop:1,crossover:4,backward:6,transition:6,hockey:10}},
 intermediate:{label:'Intermedio',desc:'Patino con control y freno con seguridad',factor:1,unlocks:{tstop:1,crossover:3,backward:4,transition:4,hockey:8}},
 advanced:{label:'Avanzado',desc:'Tengo técnica sólida y experiencia consistente',factor:1.08,unlocks:{tstop:1,crossover:2,backward:3,transition:3,hockey:7}}
};
function profile(){return PROFILES[state.profile]||PROFILES.past}
function exerciseKey(name){
 const n=name.toLowerCase();
 if(n.includes('hockey'))return'hockey'; if(n.includes('backward'))return'backward'; if(n.includes('transition'))return'transition';
 if(n.includes('crossover'))return'crossover'; if(n.includes('t-stop'))return'tstop'; return null;
}
function visibleExercise(x,wi){const k=exerciseKey(x.name);return !k || wi+1>=profile().unlocks[k]}
function scaledDose(dose){
 const f=profile().factor;
 let d=dose.replace(/(\d+)\s*[–-]\s*(\d+)\s*min/g,(m,a,b)=>`${Math.max(1,Math.round(+a*f))}–${Math.max(1,Math.round(+b*f))} min`);
 d=d.replace(/(\d+(?:[.,]\d+)?)\s*min/g,(m,n)=>`${Math.max(1,Math.round(parseFloat(n.replace(',','.'))*f))} min`);
 d=d.replace(/(\d+)\s*×\s*(\d+)\s*(?:rep|reps)/gi,(m,a,b)=>`${Math.max(1,Math.round(+a*Math.max(.85,f)))} × ${Math.max(1,Math.round(+b*Math.max(.85,f)))} rep`);
 d=d.replace(/(\d+)\s*×\s*(\d+)\s*s/g,(m,a,b)=>`${Math.max(1,Math.round(+a*Math.max(.8,f)))} × ${Math.max(5,Math.round(+b*f))} s`);
 return d;
}
function scaledVolume(vol){
 return vol.replace(/(\d+)–(\d+)\s*min/g,(m,a,b)=>`${Math.max(60,Math.round(+a*profile().factor))}–${Math.max(75,Math.round(+b*profile().factor))} min`);
}
function coachAdjustment(){
 const l=state.logs[state.logs.length-1];
 if(!l)return {level:'neutral',factor:1,title:'Sin ajuste todavía',text:'Registra una sesión para que el Coach adapte visualmente la siguiente.'};
 const r=+l.rpe||0,f=+l.fatigue||0,p=+l.pain||0,c=+l.control||0,t=+l.technique||0;
 if(p>=4||r>=9||f>=5||c===1||t===1)return {level:'red',factor:.55,title:'Reducir y recuperar',text:'La siguiente sesión se adapta: ~45% menos carga, sin aceleraciones ni hockey stop y sin habilidades nuevas. Si hay dolor agudo, articular o persistente, detén el entrenamiento y busca valoración profesional.'};
 if(p>=2||r>=7||f>=4||c===2||t===2)return {level:'yellow',factor:.75,title:'Mantener y reducir',text:'La siguiente sesión se adapta: ~25% menos carga. Mantén habilidades conocidas y no desbloquees una habilidad nueva.'};
 if(r&&r<=6&&f&&f<=3&&p<=1&&c>=4&&t>=4)return {level:'green',factor:1.05,title:'Progresión pequeña',text:'La siguiente sesión mantiene el plan y puede aumentar una sola variable en ~5–10%, siempre que la técnica siga limpia.'};
 return {level:'neutral',factor:1,title:'Mantener el plan',text:'Usa la sesión prevista y prioriza calidad. Faltan datos suficientes para una adaptación más agresiva.'};
}
function recommendedSession(){return nextSessionInfo();}
function progressWeek(wi){let all=0,done=0;W[wi].days.forEach((d,di)=>d.exs.forEach((x,ei)=>{if(!visibleExercise(x,wi))return;all++;if(state.done[`${wi}-${di}-${ei}`])done++}));return {all,done,p:all?done/all*100:0}}
function renderRail(){weekRail.innerHTML=W.map((w,i)=>{let p=progressWeek(i);return `<button class="weekBtn ${i===state.week?'active':''}" data-w="${i}"><span class="num">SEMANA ${i+1}</span><span class="title">${w.title}</span><span class="mini">${w.phase}</span><div class="bar"><i style="width:${p.p}%"></i></div></button>`}).join('');document.querySelectorAll('.weekBtn').forEach(b=>b.onclick=()=>{state.week=+b.dataset.w;save();render()})}
function objectiveState(wi){return state.weekObjectives[wi]||{};}
function objectiveProgress(wi){const o=W[wi].objectives||[];const st=objectiveState(wi);const done=o.filter((_,i)=>!!st[i]).length;return {done,total:o.length,p:o.length?done/o.length*100:0};}
function toggleObjective(wi,i){state.weekObjectives[wi]=state.weekObjectives[wi]||{};state.weekObjectives[wi][i]=!state.weekObjectives[wi][i];save();render();}
function adaptedExercise(x,adj){
 let dose=scaledDose(x.dose), name=x.name, note='';
 if(adj.level==='red'){
   if(/Aceleración|Hockey stop|Velocidad/i.test(name)) return null;
   dose=reduceDose(dose,.55); note='Adaptado por Coach: baja la carga y mantén solo habilidades conocidas.';
 }
 if(adj.level==='yellow'){
   dose=reduceDose(dose,.75); note='Adaptado por Coach: reduce el volumen; no avances la dificultad.';
 }
 if(adj.controlLow && /T-stop/i.test(name)) { dose='8 × cada lado (prioridad)'; note='Adaptado por Coach: repetir T-stop hasta recuperar control consistente.'; }
 return {dose,note};
}
function reduceDose(dose,f){return dose.replace(/(\d+)\s*[–-]\s*(\d+)\s*min/g,(m,a,b)=>`${Math.max(1,Math.round(+a*f))}–${Math.max(1,Math.round(+b*f))} min`).replace(/(\d+)\s*×\s*(\d+)/g,(m,a,b)=>`${Math.max(1,Math.round(+a*f))} × ${Math.max(1,Math.round(+b*f))}`);}
function nextSessionInfo(){
 const w=W[state.week], adj=coachAdjustment(); let di=0;
 const logs=state.logs.filter(l=>Number(l.week)===state.week+1);
 if(logs.length) di=Math.min(5,Math.max(...logs.map(l=>Number(l.day)||0))+1);
 const day=w.days[di]||w.days[0];
 const controlLow=logs.length?Number(logs[logs.length-1].control||0)<=2:false;
 return {adj,day,di,controlLow};
}
function renderPlan(){
 const w=W[state.week],p=progressWeek(state.week),rec=recommendedSession(),f=rec.adj.factor,op=objectiveProgress(state.week),obj=objectiveState(state.week);
 let html=`<div class="profileBar"><div><span class="eyebrow">NIVEL DE ENTRADA</span><strong>${profile().label}</strong><small>${profile().desc}</small></div><select id="profileSelect">${Object.entries(PROFILES).map(([k,v])=>`<option value="${k}" ${k===state.profile?'selected':''}>${v.label}</option>`).join('')}</select></div>`;
 html+=`<div class="coach next ${rec.adj.level}"><div class="coachDot"></div><div><span class="eyebrow">PRÓXIMA SESIÓN RECOMENDADA</span><h3>${rec.adj.title}</h3><p>${rec.adj.text}</p><div class="nextSession"><b>${rec.day.name}</b> · ${rec.day.goal} · ${rec.adj.level==='neutral'?'sin ajuste':`carga ${Math.round(f*100)}%`}</div><div class="adaptedNote">El <b>plan base no cambia</b>. Esta tarjeta solo modifica visualmente la próxima sesión a partir de tu último registro.</div></div></div>`;
 html+=`<div class="weekHero"><div><span class="phaseBadge">${w.phase}</span><h2>Semana ${state.week+1} · ${w.title}</h2><p>${w.focus}</p><div class="weekTargets">${w.targets.map(x=>'<span>'+x+'</span>').join('')}</div></div><div><strong style="font-size:26px">${p.done}/${p.all}</strong><div>ejercicios</div><div style="margin-top:5px">${scaledVolume(w.volume)}</div></div></div>`;
 html+=`<section class="weekGuide"><div class="guideMain"><span class="eyebrow">🎯 OBJETIVO DE LA SEMANA</span><h3>${w.objective}</h3><p><b>🧠 Qué esperar:</b> ${w.expect}</p><p><b>🌎 Entorno:</b> ${w.environment}</p><p class="guideLevel"><b>🔐 Criterio:</b> ${w.level}</p></div><div class="objectiveBox"><div><b>Objetivos cumplidos</b><strong>${op.done}/${op.total}</strong></div><div class="bar"><i style="width:${op.p}%"></i></div><div class="objectiveList">${w.objectives.map((x,i)=>`<label><input type="checkbox" data-obj="${i}" ${obj[i]?'checked':''}> <span>${x}</span></label>`).join('')}</div></div></section>`;
 html+=`<div class="environmentBanner"><b>🌎 Entorno de esta semana</b><span>${w.environment}</span></div>`;
 html+=w.days.map((d,di)=>{
   const visible=d.exs.filter(x=>visibleExercise(x,state.week));
   const dd=visible.filter(x=>state.done[state.week+'-'+di+'-'+d.exs.indexOf(x)]).length;
   const isNext=di===rec.di;
   let body=visible.map(x=>{const ei=d.exs.indexOf(x),k=state.week+'-'+di+'-'+ei,c=!!state.done[k];const a=isNext?adaptedExercise(x,{...rec.adj,controlLow:rec.controlLow}):{dose:scaledDose(x.dose),note:''};if(!a)return '<div class="exercise skipped"><div></div><div><h4>'+x.name+'</h4><p>⛔ Retirado temporalmente por el Coach debido a la carga/fatiga registrada.</p></div></div>';const note=x.notes||'Criterio: termina las repeticiones manteniendo postura, control y respiración. Si la técnica se degrada, reduce velocidad o volumen.';const rb=rbFor(x);return '<div class="exercise '+(c?'completed ':'')+(isNext?'nextExercise ':'')+'" data-ex="'+k+'"><input type="checkbox" '+(c?'checked':'')+'><div><h4>'+x.name+(isNext?' <span class="adaptedBadge">SESIÓN RECOMENDADA</span>':'')+'</h4><p>'+x.desc+'</p><div class="resourceLinks"><a target="_blank" rel="noopener" href="'+YT(x.video)+'">▶ YouTube</a>'+(rb?'<a target="_blank" rel="noopener" href="'+rb.url+'">🎥 Rollerblade · '+rb.name+'</a>':'<a target="_blank" rel="noopener" href="'+RB+'">🎥 Rollerblade · Advice</a>')+'<button class="detail">ℹ️ Ver criterio</button></div><div class="exerciseNotes">'+note+(a.note?'<br><b>Coach:</b> '+a.note:'')+'</div></div><div class="dose">'+a.dose+'</div></div>'}).join('');
   return '<article class="day '+(isNext?'recommendedDay':'')+'"><div class="dayHead" data-day="'+di+'"><div><div class="dayTitle">'+['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'][di]+' · '+d.name+(isNext?' · ⭐ siguiente':'')+'</div><div class="dayMeta">'+d.goal+'</div></div><div class="dayProgress">'+dd+'/'+visible.length+'</div></div><div class="dayBody">'+body+'</div></article>';}).join('');
 weekContent.innerHTML=html;
 document.getElementById('profileSelect').onchange=e=>{state.profile=e.target.value;save();render()};
 document.querySelectorAll('[data-obj]').forEach(x=>x.onchange=()=>toggleObjective(state.week,+x.dataset.obj));
 document.querySelectorAll('.exercise input').forEach(inp=>inp.onchange=()=>{let k=inp.closest('.exercise').dataset.ex;state.done[k]=inp.checked;save();render()});
 document.querySelectorAll('.detail').forEach(b=>b.onclick=()=>b.closest('.exercise').classList.toggle('expanded'));
 document.querySelectorAll('.dayHead').forEach(h=>h.onclick=()=>{let body=h.nextElementSibling;body.style.display=body.style.display==='none'?'block':'none'});
}

function renderSkills(){skillGrid.innerHTML=skills.map((s,i)=>{let v=state.skills[i]||{};return `<article class="skillCard"><div class="skillTop"><div><h3>${s[0]}</h3><p>${s[2]}</p></div><span class="tag">${s[1]}</span></div><div class="skillInput"><label>Semana 1<input data-s="${i}" data-w="1" value="${v[1]||''}" placeholder="—"></label><label>Semana 4<input data-s="${i}" data-w="4" value="${v[4]||''}" placeholder="—"></label><label>Semana 8<input data-s="${i}" data-w="8" value="${v[8]||''}" placeholder="—"></label><label>Semana 13<input data-s="${i}" data-w="13" value="${v[13]||''}" placeholder="—"></label></div></article>`}).join('');document.querySelectorAll('.skillInput input').forEach(x=>x.onchange=()=>{let i=x.dataset.s,w=x.dataset.w;state.skills[i]=state.skills[i]||{};state.skills[i][w]=x.value;save();toast('Prueba guardada')})}
function renderResources(){resourceGrid.innerHTML=resources.map(r=>`<article class="resourceCard"><div class="eyebrow">TÉCNICA</div><h3>${r[0]}</h3><p>${r[1]}</p>${r[3]?`<a target="_blank" href="${r[3]}">Sitio oficial</a>`:''}${r[2].startsWith('http')?`<a target="_blank" href="${r[2]}">Abrir recurso</a>`:`<a target="_blank" href="${YT(r[2])}">Buscar vídeos</a>`}</article>`).join('')}
function coach(l){const r=+l.rpe||0,f=+l.fatigue||0,p=+l.pain||0,c=+l.control||0,t=+l.technique||0;if(p>=3||r>=8||f>=5)return {level:'red',icon:'🔴',title:'Recupera / reduce',text:'La próxima sesión debe ser fácil o de descanso. Evita velocidad y habilidades nuevas; si el dolor persiste o empeora, no patines hasta aclararlo.'};if(p>=1||r>=7||f>=4||(c&&c<=2)||(t&&t<=2))return {level:'yellow',icon:'🟡',title:'Mantén / ajusta',text:'Repite el nivel actual y reduce 15–25% el volumen o la velocidad. Prioriza técnica limpia y frenado.'};if(r&&r<=6&&f&&f<=3&&p===0&&c>=4&&t>=4)return {level:'green',icon:'🟢',title:'Puedes progresar',text:'Mantén la siguiente sesión prevista. Progresa solo una variable: tiempo, repeticiones o dificultad técnica.'};return {level:'blue',icon:'🔵',title:'Datos insuficientes',text:'Completa RPE, fatiga, dolor, control y técnica para una recomendación más precisa.'}}
function coachFor(l){
 const r=Number(l.rpe)||0,f=Number(l.fatigue)||0,p=Number(l.pain)||0,c=Number(l.control)||0,t=Number(l.technique)||0;
 if(p>=4 || r>=9 || f>=5 || (c&&c<=2) || (t&&t<=2)) return {level:'red',title:'Rojo · recuperar / modificar',text:'La sesión muestra una señal importante de carga o pérdida de control. Evita progresar en velocidad o dificultad; prioriza recuperación y técnica fácil. Si hay dolor articular, agudo o persistente, detén la actividad y valora atención profesional.'};
 if(p>=2 || r>=7 || f>=4 || (c&&c===3) || (t&&t===3)) return {level:'yellow',title:'Amarillo · mantener / reducir',text:'Mantén la semana actual o reduce 20–30% el volumen de la próxima sesión. No añadas una habilidad nueva hasta recuperar control y técnica.'};
 if((r&&r<=6) && (f&&f<=3) && p<=1 && (c&&c>=4) && (t&&t>=4)) return {level:'green',title:'Verde · progresión disponible',text:'La carga fue bien tolerada y la técnica se mantuvo. Puedes continuar el plan previsto; aumenta solo una variable a la vez: tiempo, dificultad o velocidad.'};
 return {level:'neutral',title:'Datos insuficientes',text:'Completa RPE, fatiga, dolor, control y técnica para recibir una recomendación adaptativa.'};
}
function renderCoach(){
 const el=document.getElementById('coachCard'); if(!el)return;
 if(!state.logs.length){el.innerHTML='<div class="coach neutral"><div class="coachDot"></div><div><b>Coach adaptativo</b><p>Registra una sesión con RPE, fatiga, dolor, control y técnica para obtener una recomendación.</p></div></div>';return;}
 const l=state.logs[state.logs.length-1],c=coachFor(l);
 el.innerHTML=`<div class="coach ${c.level}"><div class="coachDot"></div><div><span class="eyebrow">ÚLTIMA SESIÓN · SEMANA ${l.week}</span><h3>${c.title}</h3><p>${c.text}</p></div></div>`;
}
function renderLogs(){logWeek.innerHTML=W.map((w,i)=>`<option value="${i+1}">Semana ${i+1} · ${w.title}</option>`).join('');logDate.value ||= new Date().toISOString().slice(0,10);renderCoach();logTable.innerHTML=state.logs.length?`<table><thead><tr><th>Fecha</th><th>Sem</th><th>Día</th><th>Min</th><th>Km</th><th>RPE</th><th>Fatiga</th><th>Dolor</th><th>Control</th><th>Técnica</th><th>FC</th><th>Notas</th><th></th></tr></thead><tbody>${state.logs.slice().reverse().map((l,i)=>`<tr><td>${l.date}</td><td>${l.week}</td><td>${["Lun","Mar","Mié","Jue","Vie","Sáb"][l.day??0]}</td><td>${l.min}</td><td>${l.km||''}</td><td>${l.rpe||''}</td><td>${l.fatigue||''}</td><td>${l.pain??''}</td><td>${l.control||''}</td><td>${l.technique||''}</td><td>${l.hr||''}</td><td>${l.notes||''}</td><td><button class="delete" data-del="${state.logs.length-1-i}">×</button></td></tr>`).join('')}</tbody></table>`:'<div class="empty">Todavía no hay sesiones registradas.</div>';document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{state.logs.splice(+b.dataset.del,1);save();renderLogs();toast('Sesión eliminada')})}
function updateHeader(){let all=0,done=0,sessions=0;W.forEach((w,i)=>{let p=progressWeek(i);all+=p.all;done+=p.done;if(p.done>0)sessions++});let pct=all?done/all*100:0;pctEl=document.getElementById('pct');pctEl.textContent=Math.round(pct)+'%';document.querySelector('.ring').style.background=`conic-gradient(var(--red) ${pct*3.6}deg,#f2d9d0 0deg)`;doneCount.textContent=done;weekStat.textContent=`${state.week+1}/${W.length}`;phaseStat.textContent=W[state.week].phase;volumeStat.textContent=scaledVolume(W[state.week].volume);sessionsStat.textContent=`${sessions}/${W.length*6}`}
function render(){renderRail();renderPlan();renderSkills();renderResources();renderLogs();updateHeader()}
function toast(t){let x=document.getElementById('toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1600)}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.tabPanel').forEach(x=>x.classList.add('hidden'));document.getElementById(b.dataset.tab+'Tab').classList.remove('hidden')});
logForm.onsubmit=e=>{e.preventDefault();state.logs.push({date:logDate.value,week:+logWeek.value,day:+logDay.value,min:+logMin.value,km:+logKm.value,rpe:+logRpe.value,hr:+logHr.value,fatigue:+logFatigue.value,pain:+logPain.value,control:+logControl.value,technique:+logTechnique.value,notes:logNotes.value});save();logForm.reset();logDate.value=new Date().toISOString().slice(0,10);renderLogs();toast('Sesión registrada ✓')};
exportBtn.onclick=()=>{let blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='return-to-skating-progreso.json';a.click();URL.revokeObjectURL(a.href);toast('Progreso exportado')};importBtn.onclick=()=>importFile.click();importFile.onchange=()=>{let f=importFile.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{let x=JSON.parse(r.result);if(!x.done||!x.logs)throw 0;Object.assign(state,x);save();render();toast('Progreso importado ✓')}catch{toast('Archivo no válido')}};r.readAsText(f)};
const savedTheme=localStorage.getItem('rts13_theme')||'light';
if(savedTheme==='dark')document.documentElement.classList.add('dark');
const themeBtn=document.getElementById('themeBtn');
if(themeBtn){themeBtn.textContent=savedTheme==='dark'?'☀':'☾';themeBtn.onclick=()=>{const dark=!document.documentElement.classList.contains('dark');document.documentElement.classList.toggle('dark',dark);localStorage.setItem('rts13_theme',dark?'dark':'light');themeBtn.textContent=dark?'☀':'☾';};}
render();
