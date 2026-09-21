/* plan.js — datos del programa (13 semanas). Sin lógica de UI. */
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
const ex=(name,dose,desc,video,notes='',hi=false)=>({name,dose,desc,video,notes,hi});
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
 speed:ex('Aceleración submáxima','6 × 8–10 s','Acelera hasta RPE 6; nunca sprint. Recupera 60–90 s.','inline skating acceleration technique','',true),
 fall:ex('Aprender a caer','5 × 6 rep','Sobre césped o alfombra con protecciones: agáchate, cae hacia delante sobre las protecciones de rodilla y muñeca, y desliza. Nunca extiendas los brazos rígidos.','inline skating how to fall safely beginner'),
 getup:ex('Levantarse del suelo','4 × 3 rep','Apoya manos y rodillas, sube un pie con la rueda plana en el suelo, empuja y ponte de pie. Repítelo hasta que sea automático.','inline skating how to get up after falling'),
 dryStrength:ex('Fuerza en seco','10–12 min','Sentadillas 2 × 12 · zancadas alternas 2 × 8/lado · puente de glúteo 2 × 12 · plancha 2 × 30 s. Sin patines, movimiento lento y controlado.','fuerza piernas gluteos patinaje en seco'),
 dryBalance:ex('Equilibrio en seco','6–8 min','Apoyo unipodal 3 × 30 s/lado sobre superficie estable; progresa con ojos cerrados o sobre cojín. Ideal para trabajar tobillo y cadera.','equilibrio unipodal ejercicios tobillo'),
 stretch:ex('Movilidad y estiramiento','5–8 min','Flexores de cadera, cuádriceps, isquios, gemelos y aductores, 30 s por grupo. Sin rebotes ni dolor.','estiramiento despues de patinar'),
 hockeySlot:{slot:'hockey',name:'Hockey stop',dose:'',desc:'',video:'',notes:'',hi:true},
}
add('Volver a sentir el patín','Readaptación','Equilibrio, postura, marcha y primer contacto con el frenado.', '90–120 min',['Superficie plana','RPE 3–4','Sin pendientes'],[
 day('Lun','Confianza + caídas', [common.fall,common.getup,common.stance,ex('Marcha en V','3 × 2 min','Pasos pequeños hasta conseguir deslizamiento.','inline skating beginner basic stride'),common.glide,ex('Frenado: gesto sin rodar','10 rep','Practica la posición sobre césped/alfombra antes de rodar.','inline skating heel brake braking technique')]),
 day('Mar','Desplazamiento',[common.warm,common.stride,common.aframe,common.tstop]),
 day('Mié','Recuperación técnica',[common.dryBalance,ex('Rodaje muy fácil','15–20 min','RPE 2–3. Busca relajación y simetría.','inline skating easy skating technique'),common.stance,common.glide]),
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
 day('Mié','Endurance',[common.dryStrength,common.warm,ex('Rodaje Z2 subjetivo','30–35 min','RPE 4–5. Habla en frases; reduce si 645 dejó fatiga importante.','inline skating fitness endurance')]),
 day('Jue','Crossover',[ex('Crossover lento','8 × 30 s/lado','Curva grande, pocos cruces y mucha estabilidad.','inline skating crossover beginner'),common.parallel,common.tstop]),
 day('Vie','Agilidad',[common.slalom,common.aframe,common.glide]),
 day('Sáb','Rodaje técnico',[ex('Bloques técnicos','40 min','5 min stride → 5 min carving → 5 min crossover → 5 min fácil, repetir.','inline skating basic workout')])]);
add('Crossover + curvas (descarga)','Descarga + curvas','Semana de descarga: menos volumen para asimilar lo aprendido mientras consolidas giros y crossover.','95–125 min',['Crossover ambos sentidos','Radio de curva consistente','RPE 4–5'],[
 day('Lun','Crossover',[common.warm,ex('Crossovers en círculo','6 × 60 s/lado','Círculo grande; busca ritmo constante.','inline skating crossover turn'),common.carving]),
 day('Mar','Parallel turn',[common.parallel,ex('Radio progresivo','6 ×','Empieza amplio y reduce ligeramente el radio sin aumentar demasiado la velocidad.','inline skating tight parallel turn'),common.tstop]),
 day('Mié','Endurance',[common.dryBalance,common.warm,ex('Rodaje continuo','35–40 min','RPE 4–5; técnica constante.','inline skating fitness endurance')]),
 day('Jue','Agilidad',[common.slalom,common.crossover,ex('Transitions preparación','8 ×','Solo a paso lento. Aprende la orientación antes de añadir velocidad.','inline skating transitions beginner')]),
 day('Vie','Técnica',[common.glide,common.parallel,common.crossover,common.tstop]),
 day('Sáb','Sesión larga fácil',[ex('Rodaje técnico','45–50 min','Cada 10 min incluye 2 min de técnica.','inline skating endurance technique')])]);
add('Backwards + transiciones','Orientación','Introducir backwards y transiciones con margen de seguridad.','120–155 min',['Backwards estable','Transiciones lentas','RPE 4–5'],[
 day('Lun','Backwards',[common.warm,common.backward,ex('Backward swizzle','4 × 90 s','Abre/cierra suavemente; no busques velocidad.','inline skating backward swizzle')]),
 day('Mar','Transitions',[ex('Forward → backward','8 rep','Primero caminando/rodando muy lento; mira por encima del hombro.','inline skating forward backward transition'),ex('Backward → forward','8 rep','Espacio amplio y superficie plana.','inline skating transition backward forward')]),
 day('Mié','Endurance',[common.dryStrength,common.warm,ex('Rodaje fácil','40 min','Mayormente forward.','inline skating fitness endurance')]),
 day('Jue','Backwards curvas',[common.backward,ex('Backward A-frame','6 × cada lado','Curvas amplias a velocidad mínima.','inline skating backward A frame turn'),ex('Backward slalom ancho','4 × 60 s','Solo si puedes mirar y mantener trayectoria.','inline skating backward slalom')]),
 day('Vie','Combinación',[common.crossover,common.transition,common.tstop]),
 day('Sáb','Circuito',[ex('Forward → crossover → transition → backward','5 vueltas','Cada vuelta termina con frenado seguro.','inline skating transition crossover backwards')])]);
add('Control de velocidad','Frenado avanzado','Acelerar solo dentro de una zona en la que puedes volver a una velocidad segura.','130–170 min',['RPE moderado 5–6','Frenado automático','Sin pendientes'],[
 day('Lun','Aceleración',[common.warm,common.speed,common.tstop]),
 day('Mar','Curvas',[common.parallel,common.carving,common.crossover]),
 day('Mié','Endurance',[common.dryStrength,common.warm,ex('Rodaje continuo','45 min','RPE 4–5.','inline skating fitness endurance')]),
 day('Jue','T-stop sólido (base del hockey stop)',[common.tstop]),
 day('Vie','Agilidad',[common.slalom,common.crossover,common.transition]),
 day('Sáb','Progresivo',[ex('Rodaje progresivo','45–50 min','10 min fácil → 15 moderado → 5 técnica → 10 fácil.','inline skating endurance progression')])]);
add('Potencia técnica','Empuje','Aumentar calidad del empuje sin convertir la sesión en sprint.','145–185 min',['RPE 5–6','Power stride','Crossover fluido'],[
 day('Lun','Power stride',[ex('Power stride','5 × 3 min','Empuje más largo; recuperación completa del pie.','inline skating power stride','',true),common.glide]),
 day('Mar','Crossover potente',[ex('Crossover con presión','8 × 45 s/lado','Más presión sobre el exterior; mantén el torso estable.','inline skating crossover technique'),common.parallel]),
 day('Mié','Endurance',[common.dryStrength,ex('Rodaje','45 min','RPE 4–5.','inline skating fitness endurance')]),
 day('Jue','Agilidad',[ex('Slalom controlado','6 × 2 min','Aumenta ritmo solo si mantienes trayectoria.','inline skating slalom technique'),common.transition]),
 day('Vie','Frenado',[common.tstop,common.hockeySlot,common.brake]),
 day('Sáb','Intervalos',[ex('6 × 3 min moderado / 2 min fácil','30 min','Bloques moderados RPE 6; nunca sprint.','inline skating interval training','',true)])]);
add('Resistencia + economía (descarga)','Descarga + base aeróbica','Semana de descarga: mantén la técnica con menos volumen; el objetivo es llegar fresco al bloque de aplicación.','115–150 min',['RPE 4–5','50–60 min continuo','Técnica bajo fatiga'],[
 day('Lun','Economía',[ex('Stride eficiente','5 × 3 min','Menos pasos innecesarios; deja rodar después de cada empuje.','inline skating efficient stride'),common.carving]),
 day('Mar','Curvas',[common.crossover,common.parallel,common.glide]),
 day('Mié','Endurance',[common.dryBalance,ex('Rodaje continuo','50 min','RPE 4–5; si la técnica se rompe, reduce ritmo.','inline skating endurance')]),
 day('Jue','Skills',[common.backward,common.transition,common.tstop]),
 day('Vie','Agilidad',[ex('Slalom + crossover','30 min','5 min slalom → 5 min crossover → 2 min fácil, repetir.','inline skating slalom crossover')]),
 day('Sáb','Rodaje largo',[ex('Rodaje fácil','55–60 min','Ritmo conversacional; no buscar récord.','inline skating long distance beginner')])]);
add('Urban básico','Aplicación','Aprender a leer superficie y entorno sin introducir saltos ni riesgos innecesarios.','140–175 min',['Superficie conocida','Control total','RPE 4–5'],[
 day('Lun','Superficie',[ex('Texturas suaves','15 min','Pequeñas variaciones de pavimento a velocidad baja; rodillas flexionadas.','inline skating rough surface technique'),ex('Juntas/bumps pequeños','10 min','Practica absorber con tobillos y rodillas; no saltar.','inline skating skating over bumps')]),
 day('Mar','Urban',[common.aframe,common.carving,ex('Lectura de obstáculos','10 min','Acércate, evalúa, reduce velocidad y decide; no subas bordillos todavía.','inline skating urban safety')]),
 day('Mié','Endurance',[ex('Rodaje','50 min','Ruta plana conocida.','inline skating endurance')]),
 day('Jue','Skills',[common.backward,common.transition,common.hockeySlot]),
 day('Vie','Control',[ex('Stop-go','20–25 min','Acelera 5 s, estabiliza y frena; 8–10 ciclos.','inline skating stop and go workout')]),
 day('Sáb','Ruta técnica',[ex('Ruta segura','55–60 min','Superficie conocida, sin tráfico y sin pendientes nuevas.','inline skating urban skating safety')])]);
add('Velocidad submáxima','Velocidad','Explorar velocidad sin perder técnica ni margen de frenado.','150–195 min',['RPE 6 máximo','Aceleraciones cortas','Frenado controlado'],[
 day('Lun','Acceleration',[common.warm,ex('6 × 8–10 s','20 min','Aceleración progresiva; 90 s fácil.','inline skating acceleration technique','',true),common.tstop]),
 day('Mar','Technique',[ex('Power stride','15 min','Longitud y recuperación.','inline skating power stride','',true),common.crossover]),
 day('Mié','Endurance',[ex('Rodaje','50–60 min','RPE 4–5.','inline skating endurance')]),
 day('Jue','Braking',[ex('Speed control','15 min','Aumenta solo hasta una velocidad que puedas frenar con margen.','inline skating speed control'),common.hockeySlot]),
 day('Vie','Agility',[common.slalom,common.transition]),
 day('Sáb','Intervals',[ex('8 × 2 min moderado / 2 min fácil','32 min','RPE 6 en bloques moderados.','inline skating interval training','',true)])]);
add('Integración','Performance recreativa','Combinar habilidades en sesiones completas parecidas a un entrenamiento real.','165–210 min',['Técnica bajo fatiga','RPE 4–6','Sesión larga'],[
 day('Lun','Skills circuit',[ex('Circuito 1','25 min','Stride → carving → crossover → stop.','inline skating basic workout'),ex('Circuito 2','15 min','Backward → transition → forward → T-stop.','inline skating transitions backwards')]),
 day('Mar','Endurance',[ex('Rodaje','60 min','RPE 4–5.','inline skating endurance')]),
 day('Mié','Recuperación',[ex('Rodaje muy fácil','25–30 min','RPE 2–3; movilidad sobre ruedas.','inline skating easy skating')]),
 day('Jue','Speed + braking',[ex('10 × 10 s','25 min','Aceleración submáxima, recuperación amplia.','inline skating acceleration','',true),common.tstop,common.hockeySlot]),
 day('Vie','Agility',[ex('Slalom + crossovers','30 min','Bloques de 5 min.','inline skating slalom crossover')]),
 day('Sáb','Sesión larga',[ex('Rodaje','60–65 min','Técnica bajo fatiga; sin perseguir récord.','inline skating endurance')])]);
add('Consolidación técnica','Consolidación','Reducir variabilidad y convertir las habilidades principales en patrones fiables antes del test final.','160–200 min',['Calidad > velocidad','Simetría ambos lados','RPE 4–5'],[
 day('Lun','Fundamentos',[common.warm,common.stride,common.glide,common.tstop]),
 day('Mar','Curvas',[common.aframe,common.parallel,common.crossover]),
 day('Mié','Endurance',[ex('Rodaje técnico','50–60 min','RPE 4–5; revisa postura cada 10 min.','inline skating endurance technique')]),
 day('Jue','Orientación',[common.backward,common.transition]),
 day('Vie','Agilidad',[common.slalom,ex('Skating Over Bumps and Tar Snakes','12 min','Practica únicamente sobre irregularidades pequeñas, conocidas y seguras.','inline skating bumps tar snakes')]),
 day('Sáb','Simulación',[ex('Sesión integrada','55–65 min','Combina stride, giros, backwards, transiciones y frenado sin buscar velocidad máxima.','inline skating basic workout')])]);
add('Evaluación final','Testing','Demostrar control y comparar con la semana 1 sin perseguir marcas peligrosas.','145–185 min',['Test técnico','Comparar semanas 1/4/8/13','Registrar RPE, control y molestias'],[
 day('Lun','Test técnico',[common.glide,common.tstop,common.parallel]),
 day('Mar','Test agilidad',[common.slalom,common.crossover]),
 day('Mié','Endurance',[ex('Rodaje','50–60 min','RPE 4–5; técnica constante.','inline skating endurance')]),
 day('Jue','Backwards',[ex('Backward glide','12 min','Control visual y postura.','inline skating backwards'),common.transition]),
 day('Vie','Frenado',[ex('Speed control','15 min','Compara confianza, distancia y control con semana 1.','inline skating speed control'),common.hockeySlot]),
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
 {objective:'Asimilar lo aprendido con menos volumen y consolidar giros y crossover a velocidad baja.',expect:'Es una semana de DESCARGA: entrenas menos a propósito. Es normal sentir que "haces poco"; el cuerpo adapta cuando descansa. Las curvas pueden exigir más control de un lado que del otro.',environment:'🔵 Controlado — curvas amplias en pista/cancha o espacio exterior muy predecible.',level:'Puerta: giro y frenado antes de introducir recorridos urbanos.'},
 {objective:'Introducir desplazamiento hacia atrás y transiciones con amplio margen de seguridad.',expect:'Mirar hacia atrás y cambiar de orientación aumenta la carga cognitiva. Hazlo lento y con espacio libre.',environment:'🔵 Controlado — solo espacio amplio, plano y despejado. Nada de tráfico.',level:'Puerta: transición limpia a velocidad mínima antes de usarla fuera del entorno controlado.'},
 {objective:'Controlar la velocidad sin depender de ganar velocidad primero.',expect:'La velocidad empieza a ser una variable de entrenamiento, pero nunca debe superar tu capacidad de frenado.',environment:'🟡 Exterior controlado — paseo/ciclovía muy tranquila y plana, previamente inspeccionada; preferentemente acompañado.',level:'No usar pendientes ni cruces de tráfico para practicar velocidad.'},
 {objective:'Aumentar la potencia del empuje manteniendo técnica y control.',expect:'Sentirás más demanda muscular, pero no debería convertirse en sprint. Si la postura se rompe, reduce intensidad.',environment:'🟡 Exterior controlado o pista — superficie conocida, plana y con espacio para frenar.',level:'La potencia se añade solo dentro de un margen de frenado cómodo.'},
 {objective:'Mantener la técnica con menos volumen para llegar fresco al bloque de aplicación.',expect:'Es una semana de DESCARGA (~20% menos). Si la fatiga de S5-S7 fue alta, aprovecha para dormir bien y no compensar con sesiones extra.',environment:'🟡 Exterior controlado — recorrido conocido, plano y predecible; evitar tráfico y superficies deterioradas.',level:'Rodaje largo ≠ rodaje urbano complejo.'},
 {objective:'Transferir habilidades a un entorno exterior real de baja complejidad.',expect:'La dificultad cambia por el entorno: juntas, textura, peatones y pequeños cambios de superficie requieren anticipación.',environment:'🟢 Rodaje exterior/urbano sencillo — ciclovía o paseo amplio, tranquilo, plano y previamente recorrido a pie.',level:'Solo si frenado, giros y control son consistentes. Preferible acompañado.'},
 {objective:'Explorar aceleraciones submáximas conservando margen de frenado.',expect:'Las aceleraciones son cortas. No persigas velocidad máxima; termina cada repetición con control completo.',environment:'🟡 Exterior controlado o pista — tramo recto, plano, despejado y con zona suficiente para desacelerar.',level:'No combinar aceleración con tráfico, bajadas o superficies desconocidas.'},
 {objective:'Integrar técnica, resistencia y lectura del entorno en sesiones completas.',expect:'La sesión se parecerá más a una salida recreativa, pero la técnica sigue mandando sobre el ritmo.',environment:'🟢 Rodaje urbano sencillo — recorrido conocido y de baja complejidad; evita cruces conflictivos y pendientes.',level:'Si el entorno obliga a improvisar frenadas, el recorrido es demasiado difícil.'},
 {objective:'Consolidar las habilidades principales y reducir errores antes de evaluar.',expect:'Puede parecer una semana “más fácil”. La intención es convertir movimientos aprendidos en patrones consistentes.',environment:'🟢 Exterior controlado/urbano sencillo según habilidades; vuelve a 🔵 si la técnica fluctúa.',level:'Calidad y simetría > velocidad o kilómetros.'},
 {objective:'Evaluar el progreso sin convertir el test en una competición.',expect:'La mejora puede verse en control, confianza, simetría y menor esfuerzo, aunque la velocidad no cambie.',environment:'🔵 o 🟡 según la prueba — usa el entorno más seguro que permita repetir los tests de forma comparable.',level:'No se desbloquea un entorno más difícil solo por completar el test.'}
];
W.forEach((w,i)=>Object.assign(w,WEEK_GUIDE[i]));
W.forEach((w,i)=>Object.assign(w,WEEK_GUIDE[i]));
const WEEK_OBJECTIVES=[
 ['Mantener postura estable durante 60 s.','Desplazarte 10–15 min a RPE 3–4 sin perder control.','Practicar el gesto de frenado y detenerte de forma controlada a baja velocidad.'],
 ['Realizar T-stop a ambos lados a baja velocidad.','Usar heel brake de forma progresiva si el patín lo permite.','Completar 25–30 min fáciles sin deterioro importante de postura.'],
 ['Mantener glide sobre un pie durante 10–20 m por lado.','Realizar una zancada lateral fluida y simétrica.','Completar 30–35 min a RPE 4–5 conservando técnica.'],
 ['Ejecutar A-frame turn a ambos lados con radio amplio.','Realizar parallel turn básico sin perder trayectoria.','Practicar crossover lento sin aumentar velocidad para compensar.','Respetar la descarga: no añadir sesiones extra.'],
 ['Desplazarte hacia atrás con pasos/swizzle controlados.','Realizar transiciones a velocidad mínima en espacio amplio.','Mantener frenado y orientación sin perder el control.'],
 ['Controlar velocidad y detenerte antes de agotar el espacio.','Completar aceleraciones submáximas sin perder postura.','Realizar una sesión exterior corta solo en recorrido plano y conocido.'],
 ['Mantener power stride sin convertirlo en sprint.','Ejecutar crossover fluido a ambos lados.','Completar 40–50 min con técnica estable.'],
 ['Completar un rodaje de 40–50 min con RPE 4–5 y técnica estable.','Mantener frenado y giros con menos volumen que la semana previa.','Respetar la descarga: llegar a S9 con energía, no con fatiga.'],
 ['Recorrer un circuito exterior sencillo y conocido.','Gestionar cambios de textura menores sin perder postura.','Frenar y girar con anticipación ante peatones/obstáculos previsibles.'],
 ['Completar aceleraciones de 8–10 s a RPE ≤6.','Recuperar velocidad segura antes de cada repetición.','No depender de pendientes para generar velocidad.'],
 ['Integrar stride, giros, frenado y backwards en una sesión.','Completar un rodaje urbano sencillo sin improvisaciones peligrosas.','Mantener técnica durante una sesión larga a RPE 4–6.'],
 ['Repetir habilidades principales con menor variabilidad.','Comparar simetría izquierda/derecha con semanas anteriores.','Llegar al test sin fatiga acumulada innecesaria.'],
 ['Repetir los tests técnicos de semanas 1/4/8/13.','Registrar RPE, control, técnica y molestias.','Identificar qué habilidades están consolidadas y cuáles requieren más práctica.']
];
W.forEach((w,i)=>w.objectives=WEEK_OBJECTIVES[i]);

W.forEach((w,i)=>w.objectives=WEEK_OBJECTIVES[i]);

const PROFILES={
 beginner:{label:'Principiante',desc:'Nunca he patinado o solo sé lo básico y estoy construyendo confianza',factor:.72,unlocks:{tstop:1,crossover:5,backward:7,transition:7,hockey:13}},
 past:{label:'Ya patiné antes',desc:'Tengo experiencia previa, pero estoy retomando',factor:.88,unlocks:{tstop:1,crossover:4,backward:5,transition:5,hockey:9}},
 intermediate:{label:'Intermedio',desc:'Patino con control y freno con seguridad',factor:1,unlocks:{tstop:1,crossover:3,backward:4,transition:4,hockey:8}},
 advanced:{label:'Avanzado',desc:'Tengo técnica sólida y experiencia consistente',factor:1.08,unlocks:{tstop:1,crossover:2,backward:3,transition:3,hockey:7}}
};
const skills=[
 {id:'stance',    name:'Postura y equilibrio', unit:'segundos', better:'up',   max:120, how:'Mantén la postura atlética sin apoyarte ni mover los brazos. Cronometra hasta perder la posición.'},
 {id:'glide',     name:'One-foot glide',       unit:'segundos por lado', better:'up', max:60, how:'Desliza sobre un pie sin cruzar los brazos ni perder línea. Anota el promedio de ambos lados.'},
 {id:'tstop',     name:'T-stop',               unit:'metros para detener', better:'down', max:20, how:'Desde velocidad de trote suave, marca donde empiezas a frenar y mide hasta el reposo completo. Promedio de 3 intentos.'},
 {id:'parallel',  name:'Parallel turn',        unit:'calidad 1–5', better:'up', max:5, how:'Radio y trayectoria similares en ambos sentidos (1 = muy irregular, 5 = idéntico).'},
 {id:'crossover', name:'Crossover',            unit:'segundos continuos por lado', better:'up', max:90, how:'Crossover continuo en círculo amplio sin levantarte ni perder ritmo.'},
 {id:'backwards', name:'Backwards',            unit:'metros continuos', better:'up', max:60, how:'Desplazamiento hacia atrás mirando por encima del hombro, sin detenerte.'},
 {id:'transition',name:'Transition',           unit:'repeticiones limpias de 10', better:'up', max:10, how:'Forward ↔ backward sin perder equilibrio. Cuenta cuántas de 10 salen limpias.'},
 {id:'slalom',    name:'Slalom',               unit:'segundos por circuito', better:'down', max:60, how:'Circuito de 8 conos separados 2 m. Menos tiempo = mejor, siempre que la técnica se mantenga.'},
 {id:'hockey',    name:'Hockey stop',          unit:'calidad 1–5', better:'up', max:5, how:'Solo medir si ya es técnicamente seguro (1 = derrapa sin control, 5 = detención limpia).'}
];
const SKILL_WEEKS=[1,4,8,13];
const FINAL_TESTS=[
 {id:'t_stop',   name:'Frenado T-stop',  unit:'m', how:'Distancia hasta detenerte desde trote suave. Promedio de 3.'},
 {id:'t_slalom', name:'Slalom 8 conos',  unit:'s', how:'Tiempo del circuito con técnica limpia. Mejor de 3 vueltas.'},
 {id:'t_glide',  name:'Glide unipodal',  unit:'s', how:'Segundos estables por pie. Promedio de ambos lados.'},
 {id:'t_rodaje', name:'Rodaje 20 min',   unit:'km', how:'Distancia recorrida a RPE 4–5 sostenido, mismo circuito que la semana 1.'}
];

/* Escalera del hockey stop. Las semanas solo contienen un MARCADOR (common.hockeySlot);
   qué peldaño se muestra depende del nivel del usuario (ver progression.js). */
const HOCKEY_STAGES=[
 ex('Gesto hockey stop','8 rep','Practica el pivote de pies sin velocidad.','inline skating hockey stop beginner','',true),
 ex('Hockey stop asistido','6 rep','Solo si T-stop es fiable y tienes mucho espacio.','inline skating hockey stop tutorial','',true),
 ex('Hockey stop — progresión','6–8 rep','Solo si T-stop es sólido. Practica primero el gesto a velocidad muy baja.','inline skating hockey stop tutorial','',true)
];
const HOCKEY_SLOT_WEEKS=W.map((w,i)=>w.days.some(d=>d.exs.some(x=>x.slot==='hockey'))?i+1:0).filter(Boolean);
