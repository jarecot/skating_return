const YT=q=>`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const RB='https://www.rollerblade.com/usa/en/rollerblade-tv/Advice';
const RB_LEARN='https://www.rollerblade.com/usa/en/time-to-learn';
const RB_BACK='https://www.rollerblade.com/usa/en/the-rollerblade-experience/urban/danny-s-point-how-to-skate-backwards';
const state=JSON.parse(localStorage.getItem('rts13_v2')||'null')||{week:0,done:{},logs:[],skills:{}};
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
add('Volver a sentir el patín','Readaptación','Equilibrio, postura, marcha y primer contacto con el frenado.', '120–150 min',['Superficie plana','RPE 3–4','Sin pendientes'],[
 day('Lun','Confianza', [common.stance,ex('Marcha en V','3 × 2 min','Pasos pequeños hasta conseguir deslizamiento.','inline skating beginner basic stride'),common.glide,ex('Frenado: gesto sin rodar','10 rep','Practica la posición sobre césped/alfombra antes de rodar.','inline skating heel brake braking technique')]),
 day('Mar','Desplazamiento',[common.warm,common.stride,common.aframe,common.tstop]),
 day('Mié','Recuperación técnica',[ex('Rodaje muy fácil','15–20 min','RPE 2–3. Busca relajación y simetría.','inline skating easy skating technique'),common.stance,common.glide]),
 day('Jue','Frenado',[common.warm,common.brake,common.tstop,ex('Frenado de emergencia: preparación','6 rep','Desde velocidad mínima, adopta postura estable antes de aumentar presión.','inline skating braking posture')]),
 day('Vie','Giros',[common.stride,common.aframe,common.carving,common.tstop]),
 day('Sáb','Integración',[common.warm,ex('Circuito básico','3 × 6 min','Stride → A-frame → frenado → rodaje fácil. Descansa 2 min entre vueltas.','inline skating basic workout'),ex('Rodaje continuo','10–15 min','RPE 3–4, sin perseguir kilómetros.','inline skating beginner endurance')])]);
add('Frenado + estabilidad','Base técnica','Hacer que detenerse sea una habilidad automática antes de subir velocidad.','150–180 min',['T-stop ambos lados','Heel brake si disponible','RPE 3–4'],[
 day('Lun','Frenado',[common.warm,common.tstop,common.brake,ex('Stop-go','8 ×','Rodar 15–20 m y frenar completamente; recupera caminando/rodando.','inline skating stop and go workout')]),
 day('Mar','Equilibrio',[common.glide,ex('One-foot stance','6 × 15 s/lado','Mantén el otro pie cerca del suelo como apoyo de seguridad.','inline skating one foot balance beginner'),common.slalom]),
 day('Mié','Aeróbico fácil',[common.warm,ex('Rodaje continuo','25–30 min','RPE 3–4; puedes hablar en frases completas.','inline skating fitness beginner')]),
 day('Jue','Transferencia',[common.swizzle,common.stride,common.tstop,common.brake]),
 day('Vie','Curvas',[common.parallel,common.aframe,common.carving,common.tstop]),
 day('Sáb','Circuito',[common.warm,ex('Circuito control','4 × 6 min','Slalom → carving → one-foot glide → T-stop. 2 min suaves entre vueltas.','inline skating basic workout')])]);
add('Zancada eficiente','Locomoción','Generar más desplazamiento con menos pasos y menos tensión.','175–205 min',['RPE 4–5','Glide estable','Empuje lateral'],[
 day('Lun','Stride',[common.warm,ex('Push & recover','5 × 3 min','Empuje lateral, recupera debajo del cuerpo y permite una fase de glide.','inline skating push recover technique'),common.glide]),
 day('Mar','Técnica',[common.swizzle,common.carving,ex('Crossover preparación','8 × 30 s','Transferencia de peso en curva amplia antes de buscar velocidad.','inline skating crossover beginner preparation')]),
 day('Mié','Endurance',[common.warm,ex('Rodaje Z2 subjetivo','30–35 min','RPE 4–5. Habla en frases; reduce si 645 dejó fatiga importante.','inline skating fitness endurance')]),
 day('Jue','Crossover',[ex('Crossover lento','8 × 30 s/lado','Curva grande, pocos cruces y mucha estabilidad.','inline skating crossover beginner'),common.parallel,common.tstop]),
 day('Vie','Agilidad',[common.slalom,common.aframe,common.glide]),
 day('Sáb','Rodaje técnico',[ex('Bloques técnicos','40 min','5 min stride → 5 min carving → 5 min crossover → 5 min fácil, repetir.','inline skating basic workout')])]);
add('Crossover + curvas','Curvas','Convertir los giros en una herramienta dinámica y simétrica.','190–225 min',['Crossover ambos sentidos','Radio de curva consistente','RPE 4–5'],[
 day('Lun','Crossover',[common.warm,ex('Crossovers en círculo','6 × 60 s/lado','Círculo grande; busca ritmo constante.','inline skating crossover turn'),common.carving]),
 day('Mar','Parallel turn',[common.parallel,ex('Radio progresivo','6 ×','Empieza amplio y reduce ligeramente el radio sin aumentar demasiado la velocidad.','inline skating tight parallel turn'),common.tstop]),
 day('Mié','Endurance',[common.warm,ex('Rodaje continuo','35–40 min','RPE 4–5; técnica constante.','inline skating fitness endurance')]),
 day('Jue','Agilidad',[common.slalom,common.crossover,ex('Transitions preparación','8 ×','Solo a paso lento. Aprende la orientación antes de añadir velocidad.','inline skating transitions beginner')]),
 day('Vie','Técnica',[common.glide,common.parallel,common.crossover,common.tstop]),
 day('Sáb','Sesión larga fácil',[ex('Rodaje técnico','45–50 min','Cada 10 min incluye 2 min de técnica.','inline skating endurance technique')])]);
add('Backwards + transiciones','Orientación','Introducir backwards y transiciones con margen de seguridad.','200–235 min',['Backwards estable','Transiciones lentas','RPE 4–5'],[
 day('Lun','Backwards',[common.warm,common.backward,ex('Backward swizzle','4 × 90 s','Abre/cierra suavemente; no busques velocidad.','inline skating backward swizzle')]),
 day('Mar','Transitions',[ex('Forward → backward','8 rep','Primero caminando/rodando muy lento; mira por encima del hombro.','inline skating forward backward transition'),ex('Backward → forward','8 rep','Espacio amplio y superficie plana.','inline skating transition backward forward')]),
 day('Mié','Endurance',[common.warm,ex('Rodaje fácil','40 min','Mayormente forward.','inline skating fitness endurance')]),
 day('Jue','Backwards curvas',[common.backward,ex('Backward A-frame','6 × cada lado','Curvas amplias a velocidad mínima.','inline skating backward A frame turn'),ex('Backward slalom ancho','4 × 60 s','Solo si puedes mirar y mantener trayectoria.','inline skating backward slalom')]),
 day('Vie','Combinación',[common.crossover,common.transition,common.tstop]),
 day('Sáb','Circuito',[ex('Forward → crossover → transition → backward','5 vueltas','Cada vuelta termina con frenado seguro.','inline skating transition crossover backwards')])]);
add('Control de velocidad','Frenado avanzado','Acelerar solo dentro de una zona en la que puedes volver a una velocidad segura.','210–250 min',['RPE moderado 5–6','Frenado automático','Sin pendientes'],[
 day('Lun','Aceleración',[common.warm,common.speed,common.tstop]),
 day('Mar','Curvas',[common.parallel,common.carving,common.crossover]),
 day('Mié','Endurance',[common.warm,ex('Rodaje continuo','45 min','RPE 4–5.','inline skating fitness endurance')]),
 day('Jue','Hockey stop preparación',[ex('Gesto hockey stop','8 rep','Practica el pivote de pies sin velocidad.','inline skating hockey stop beginner'),ex('Hockey stop asistido','6 rep','Solo si T-stop es fiable y tienes mucho espacio.','inline skating hockey stop tutorial'),common.tstop]),
 day('Vie','Agilidad',[common.slalom,common.crossover,common.transition]),
 day('Sáb','Progresivo',[ex('Rodaje progresivo','45–50 min','10 min fácil → 15 moderado → 5 técnica → 10 fácil.','inline skating endurance progression')])]);
add('Potencia técnica','Empuje','Aumentar calidad del empuje sin convertir la sesión en sprint.','215–255 min',['RPE 5–6','Power stride','Crossover fluido'],[
 day('Lun','Power stride',[ex('Power stride','5 × 3 min','Empuje más largo; recuperación completa del pie.','inline skating power stride'),common.glide]),
 day('Mar','Crossover potente',[ex('Crossover con presión','8 × 45 s/lado','Más presión sobre el exterior; mantén el torso estable.','inline skating crossover technique'),common.parallel]),
 day('Mié','Endurance',[ex('Rodaje','45 min','RPE 4–5.','inline skating fitness endurance')]),
 day('Jue','Agilidad',[ex('Slalom controlado','6 × 2 min','Aumenta ritmo solo si mantienes trayectoria.','inline skating slalom technique'),common.transition]),
 day('Vie','Frenado',[common.tstop,common.hockey,common.brake]),
 day('Sáb','Intervalos',[ex('6 × 3 min moderado / 2 min fácil','30 min','Bloques moderados RPE 6; nunca sprint.','inline skating interval training')])]);
add('Resistencia + economía','Base aeróbica','Aumentar tiempo sobre ruedas sin degradar técnica.','220–270 min',['RPE 4–5','50–60 min continuo','Técnica bajo fatiga'],[
 day('Lun','Economía',[ex('Stride eficiente','5 × 3 min','Menos pasos innecesarios; deja rodar después de cada empuje.','inline skating efficient stride'),common.carving]),
 day('Mar','Curvas',[common.crossover,common.parallel,common.glide]),
 day('Mié','Endurance',[ex('Rodaje continuo','50 min','RPE 4–5; si la técnica se rompe, reduce ritmo.','inline skating endurance')]),
 day('Jue','Skills',[common.backward,common.transition,common.tstop]),
 day('Vie','Agilidad',[ex('Slalom + crossover','30 min','5 min slalom → 5 min crossover → 2 min fácil, repetir.','inline skating slalom crossover')]),
 day('Sáb','Rodaje largo',[ex('Rodaje fácil','55–60 min','Ritmo conversacional; no buscar récord.','inline skating long distance beginner')])]);
add('Urban básico','Aplicación','Aprender a leer superficie y entorno sin introducir saltos ni riesgos innecesarios.','220–275 min',['Superficie conocida','Control total','RPE 4–5'],[
 day('Lun','Superficie',[ex('Texturas suaves','15 min','Pequeñas variaciones de pavimento a velocidad baja; rodillas flexionadas.','inline skating rough surface technique'),ex('Juntas/bumps pequeños','10 min','Practica absorber con tobillos y rodillas; no saltar.','inline skating skating over bumps')]),
 day('Mar','Urban',[common.aframe,common.carving,ex('Lectura de obstáculos','10 min','Acércate, evalúa, reduce velocidad y decide; no subas bordillos todavía.','inline skating urban safety')]),
 day('Mié','Endurance',[ex('Rodaje','50 min','Ruta plana conocida.','inline skating endurance')]),
 day('Jue','Skills',[common.backward,common.transition,common.hockey]),
 day('Vie','Control',[ex('Stop-go','20–25 min','Acelera 5 s, estabiliza y frena; 8–10 ciclos.','inline skating stop and go workout')]),
 day('Sáb','Ruta técnica',[ex('Ruta segura','55–60 min','Superficie conocida, sin tráfico y sin pendientes nuevas.','inline skating urban skating safety')])]);
add('Velocidad submáxima','Velocidad','Explorar velocidad sin perder técnica ni margen de frenado.','225–280 min',['RPE 6 máximo','Aceleraciones cortas','Frenado controlado'],[
 day('Lun','Acceleration',[common.warm,ex('6 × 8–10 s','20 min','Aceleración progresiva; 90 s fácil.','inline skating acceleration technique'),common.tstop]),
 day('Mar','Technique',[ex('Power stride','15 min','Longitud y recuperación.','inline skating power stride'),common.crossover]),
 day('Mié','Endurance',[ex('Rodaje','50–60 min','RPE 4–5.','inline skating endurance')]),
 day('Jue','Braking',[ex('Speed control','15 min','Aumenta solo hasta una velocidad que puedas frenar con margen.','inline skating speed control'),common.hockey]),
 day('Vie','Agility',[common.slalom,common.transition]),
 day('Sáb','Intervals',[ex('8 × 2 min moderado / 2 min fácil','32 min','RPE 6 en bloques moderados.','inline skating interval training')])]);
add('Integración','Performance recreativa','Combinar habilidades en sesiones completas parecidas a un entrenamiento real.','240–300 min',['Técnica bajo fatiga','RPE 4–6','Sesión larga'],[
 day('Lun','Skills circuit',[ex('Circuito 1','25 min','Stride → carving → crossover → stop.','inline skating basic workout'),ex('Circuito 2','15 min','Backward → transition → forward → T-stop.','inline skating transitions backwards')]),
 day('Mar','Endurance',[ex('Rodaje','60 min','RPE 4–5.','inline skating endurance')]),
 day('Mié','Recuperación',[ex('Rodaje muy fácil','25–30 min','RPE 2–3; movilidad sobre ruedas.','inline skating easy skating')]),
 day('Jue','Speed + braking',[ex('10 × 10 s','25 min','Aceleración submáxima, recuperación amplia.','inline skating acceleration'),common.tstop,common.hockey]),
 day('Vie','Agility',[ex('Slalom + crossovers','30 min','Bloques de 5 min.','inline skating slalom crossover')]),
 day('Sáb','Sesión larga',[ex('Rodaje','60–65 min','Técnica bajo fatiga; sin perseguir récord.','inline skating endurance')])]);
add('Evaluación + consolidación','Testing','Demostrar control. Comparar con semana 1, no perseguir una marca peligrosa.','235–300 min',['Test técnico','60–70 min','Registrar RPE y molestias'],[
 day('Lun','Test técnico',[common.glide,common.tstop,common.parallel]),
 day('Mar','Test agilidad',[common.slalom,common.crossover]),
 day('Mié','Endurance',[ex('Rodaje','60 min','RPE 4–5; técnica constante.','inline skating endurance')]),
 day('Jue','Backwards',[ex('Backward glide','12 min','Control visual y postura.','inline skating backwards'),common.transition]),
 day('Vie','Frenado',[ex('Speed control','15 min','Compara confianza con semana 1.','inline skating speed control'),common.hockey]),
 day('Sáb','Final 13 semanas',[ex('Sesión final técnica','70 min','10 fácil + 40 técnica/rodaje + 10 progresivo + 10 fácil. No buscar récord.','inline skating basic workout')])]);
const resources=[
 ['Serie oficial: Time to Learn','Rollerblade — fundamentos: ajuste, protección, levantarse, stride, A-frame, heel stop.','https://www.rollerblade.com/usa/en/time-to-learn',RB_LEARN],
 ['Biblioteca Rollerblade','Más de 100 vídeos: T-stop, parallel turn, crossover, backwards, hockey stop, speed control, carving y más.','https://www.rollerblade.com/usa/en/rollerblade-tv/Advice',RB],
 ['Backwards','Tutorial oficial de Danny sobre postura, mirada y progresión para patinar hacia atrás.','https://www.rollerblade.com/usa/en/the-rollerblade-experience/urban/danny-s-point-how-to-skate-backwards',RB_BACK],
 ['Basic stride','Vídeos de referencia para la zancada básica y eficiencia.','inline skating basic stride',''],
 ['T-stop','Progresión de frenado en T.','inline skating T stop tutorial',''],
 ['Parallel turn','Técnica de giro paralelo.','inline skating parallel turn',''],
 ['Crossover','Progresión de crossover forward y en curva.','inline skating crossover turn',''],
 ['Hockey stop','Referencia para introducir el hockey stop cuando T-stop ya sea sólido.','inline skating hockey stop tutorial',''],
 ['Slalom','Control de cantos, rodillas y trayectoria.','inline skating slalom technique',''],
 ['Skating over bumps','Cómo absorber pequeñas irregularidades sin perder control.','inline skating skating over bumps','']
];
const skills=[
 ['Postura y equilibrio','Calidad 1–5','Mantener postura durante 60 s sin tensión excesiva.'],['One-foot glide','segundos por lado','Tiempo estable sobre un pie, sin cruzar brazos ni perder línea.'],['T-stop','metros para detener','Desde velocidad moderada, frenar de forma progresiva y repetible.'],['Parallel turn','calidad 1–5','Radio y trayectoria similares en ambos sentidos.'],['Crossover','segundos continuos/lado','Cruces fluidos sin levantarse ni perder línea.'],['Backwards','metros continuos','Trayectoria estable mirando por encima del hombro.'],['Transition','repeticiones limpias','Forward ↔ backward sin perder equilibrio.'],['Slalom','tiempo / circuito','Mantener trayectoria y postura con conos separados.'],['Hockey stop','calidad 1–5','Solo medir si ya es técnicamente seguro.']
];
function progressWeek(wi){let all=0,done=0;W[wi].days.forEach((d,di)=>d.exs.forEach((_,ei)=>{all++;if(state.done[`${wi}-${di}-${ei}`])done++}));return {all,done,p:all?done/all*100:0}}
function renderRail(){weekRail.innerHTML=W.map((w,i)=>{let p=progressWeek(i);return `<button class="weekBtn ${i===state.week?'active':''}" data-w="${i}"><span class="num">SEMANA ${i+1}</span><span class="title">${w.title}</span><span class="mini">${w.phase}</span><div class="bar"><i style="width:${p.p}%"></i></div></button>`}).join('');document.querySelectorAll('.weekBtn').forEach(b=>b.onclick=()=>{state.week=+b.dataset.w;save();render()})}
function renderPlan(){
 const w=W[state.week];
 const p=progressWeek(state.week);
 let html='<div class="weekHero"><div><span class="phaseBadge">'+w.phase+'</span><h2>Semana '+(state.week+1)+' · '+w.title+'</h2><p>'+w.focus+'</p><div class="weekTargets">'+w.targets.map(x=>'<span>'+x+'</span>').join('')+'</div></div><div><strong style="font-size:26px">'+p.done+'/'+p.all+'</strong><div>ejercicios</div><div style="margin-top:5px">'+w.volume+'</div></div></div>';
 html+=w.days.map((d,di)=>{
   const dd=d.exs.filter((_,ei)=>state.done[state.week+'-'+di+'-'+ei]).length;
   let body=d.exs.map((x,ei)=>{
     const k=state.week+'-'+di+'-'+ei, c=!!state.done[k];
     const note=x.notes||'Criterio: termina todas las repeticiones manteniendo postura, control y respiración. Si la técnica se degrada, reduce velocidad o volumen.';
     return '<div class="exercise '+(c?'completed':'')+'" data-ex="'+k+'"><input type="checkbox" '+(c?'checked':'')+'><div><h4>'+x.name+'</h4><p>'+x.desc+'</p><div class="resourceLinks"><a target="_blank" href="'+YT(x.video)+'">▶ Vídeos</a><a target="_blank" href="'+RB+'">🎥 Rollerblade</a><button class="detail">ℹ️ Ver criterio</button></div><div class="exerciseNotes">'+note+'</div></div><div class="dose">'+x.dose+'</div></div>';
   }).join('');
   return '<article class="day"><div class="dayHead" data-day="'+di+'"><div><div class="dayTitle">'+['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'][di]+' · '+d.name+'</div><div class="dayMeta">'+d.goal+'</div></div><div class="dayProgress">'+dd+'/'+d.exs.length+'</div></div><div class="dayBody">'+body+'</div></article>';
 }).join('');
 weekContent.innerHTML=html;
 document.querySelectorAll('.exercise input').forEach(inp=>inp.onchange=()=>{let k=inp.closest('.exercise').dataset.ex;state.done[k]=inp.checked;save();render()});
 document.querySelectorAll('.detail').forEach(b=>b.onclick=()=>b.closest('.exercise').classList.toggle('expanded'));
 document.querySelectorAll('.dayHead').forEach(h=>h.onclick=()=>{let body=h.nextElementSibling;body.style.display=body.style.display==='none'?'block':'none'});
}
function renderSkills(){skillGrid.innerHTML=skills.map((s,i)=>{let v=state.skills[i]||{};return `<article class="skillCard"><div class="skillTop"><div><h3>${s[0]}</h3><p>${s[2]}</p></div><span class="tag">${s[1]}</span></div><div class="skillInput"><label>Semana 1<input data-s="${i}" data-w="1" value="${v[1]||''}" placeholder="—"></label><label>Semana 4<input data-s="${i}" data-w="4" value="${v[4]||''}" placeholder="—"></label><label>Semana 8<input data-s="${i}" data-w="8" value="${v[8]||''}" placeholder="—"></label><label>Semana 13<input data-s="${i}" data-w="13" value="${v[13]||''}" placeholder="—"></label></div></article>`}).join('');document.querySelectorAll('.skillInput input').forEach(x=>x.onchange=()=>{let i=x.dataset.s,w=x.dataset.w;state.skills[i]=state.skills[i]||{};state.skills[i][w]=x.value;save();toast('Prueba guardada')})}
function renderResources(){resourceGrid.innerHTML=resources.map(r=>`<article class="resourceCard"><div class="eyebrow">TÉCNICA</div><h3>${r[0]}</h3><p>${r[1]}</p>${r[3]?`<a target="_blank" href="${r[3]}">Sitio oficial</a>`:''}${r[2].startsWith('http')?`<a target="_blank" href="${r[2]}">Abrir recurso</a>`:`<a target="_blank" href="${YT(r[2])}">Buscar vídeos</a>`}</article>`).join('')}
function renderLogs(){logWeek.innerHTML=W.map((w,i)=>`<option value="${i+1}">Semana ${i+1} · ${w.title}</option>`).join('');logDate.value ||= new Date().toISOString().slice(0,10);logTable.innerHTML=state.logs.length?`<table><thead><tr><th>Fecha</th><th>Sem</th><th>Min</th><th>Km</th><th>RPE</th><th>FC</th><th>Notas</th><th></th></tr></thead><tbody>${state.logs.slice().reverse().map((l,i)=>`<tr><td>${l.date}</td><td>${l.week}</td><td>${l.min}</td><td>${l.km||''}</td><td>${l.rpe||''}</td><td>${l.hr||''}</td><td>${l.notes||''}</td><td><button class="delete" data-del="${state.logs.length-1-i}">×</button></td></tr>`).join('')}</tbody></table>`:'<div class="empty">Todavía no hay sesiones registradas.</div>';document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{state.logs.splice(+b.dataset.del,1);save();renderLogs();toast('Sesión eliminada')})}
function updateHeader(){let all=0,done=0,sessions=0;W.forEach((w,i)=>{let p=progressWeek(i);all+=p.all;done+=p.done;if(p.done>0)sessions++});let pct=all?done/all*100:0;pctEl=document.getElementById('pct');pctEl.textContent=Math.round(pct)+'%';document.querySelector('.ring').style.background=`conic-gradient(var(--red) ${pct*3.6}deg,#f2d9d0 0deg)`;doneCount.textContent=done;weekStat.textContent=`${state.week+1}/13`;phaseStat.textContent=W[state.week].phase;volumeStat.textContent=W[state.week].volume;sessionsStat.textContent=`${sessions}/78`}
function render(){renderRail();renderPlan();renderSkills();renderResources();renderLogs();updateHeader()}
function toast(t){let x=document.getElementById('toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1600)}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.tabPanel').forEach(x=>x.classList.add('hidden'));document.getElementById(b.dataset.tab+'Tab').classList.remove('hidden')});
logForm.onsubmit=e=>{e.preventDefault();state.logs.push({date:logDate.value,week:+logWeek.value,min:+logMin.value,km:+logKm.value,rpe:+logRpe.value,hr:+logHr.value,notes:logNotes.value});save();logForm.reset();logDate.value=new Date().toISOString().slice(0,10);renderLogs();toast('Sesión registrada ✓')};
exportBtn.onclick=()=>{let blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='return-to-skating-progreso.json';a.click();URL.revokeObjectURL(a.href);toast('Progreso exportado')};importBtn.onclick=()=>importFile.click();importFile.onchange=()=>{let f=importFile.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{let x=JSON.parse(r.result);if(!x.done||!x.logs)throw 0;Object.assign(state,x);save();render();toast('Progreso importado ✓')}catch{toast('Archivo no válido')}};r.readAsText(f)};
render();
