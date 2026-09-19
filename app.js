
const VIDEO_BASE = "https://www.youtube.com/results?search_query=";
const ROLLERBLADE = "https://www.rollerblade.com/usa/en/rollerblade-tv/Advice";

const E = (name, minutes, desc, search, tags=[]) => ({name,minutes,desc,search,tags});

const weeks = [
{title:"Reacondicionamiento + confianza",focus:"Volver a sentir el patín; postura, equilibrio, marcha y frenado básico.",minutes:"20–35 min",days:[
 [["Lun","Base"],[E("Equipo + chequeo de ajuste",5,"Comprueba cierre, liner, ruedas, ejes y protecciones. Camina unos metros antes de rodar.","inline skate protective gear fit")],[E("Postura atlética sobre patines",5,"Rodillas y tobillos flexionados, tronco relajado, mirada al frente. 5×30 s.","inline skating basic stance posture")],[E("Marcha en V / pasos cortos",8,"Desde parado: pasos alternos pequeños hasta conseguir deslizamiento suave.","inline skating beginner basic stride")],[E("Deslizamiento bilateral",8,"Rodar recto a baja velocidad, pies paralelos y peso centrado.","inline skating basic glide balance")],[E("Frenado de emergencia: gesto sin rodar",5,"Practica la posición de frenado en superficie no rodante antes de hacerlo sobre ruedas.","inline skate heel brake braking technique")]],
 [["Mar","Control"],[E("Calentamiento rodado suave",5,"Círculos amplios y desplazamiento fácil.","inline skating warm up beginner")],[E("A-frame turn",8,"Giros amplios usando presión progresiva sobre el patín exterior.","inline skating A frame turn")],[E("T-stop: preparación",7,"Sin velocidad: coloca el patín trasero perpendicular de forma ligera, buscando contacto progresivo.","inline skating T stop beginner")],[E("T-stop a baja velocidad",8,"5–8 repeticiones por lado, siempre en plano y con mucho margen.","inline skating T stop tutorial")]],
 [["Mié","Recuperación técnica"],[E("Patinaje fácil",12,"Rodar muy suave. Prioriza relajación y simetría.","inline skating easy skating technique")],[E("Balance unipodal asistido",6,"Deslizamientos muy cortos de un pie con el otro cerca del suelo.","inline skating one foot balance beginner")],[E("Movilidad sobre patines",5,"Flexión de tobillo/rodilla y transferencia de peso suave.","inline skating mobility drills")]],
 [["Jue","Frenado"],[E("Postura de frenado",5,"Repite 10 veces la postura sin desplazarte.","inline skating braking posture")],[E("Heel brake",10,"Si tu setup tiene freno compatible, aprende primero esta técnica; no dependas del T-stop.","inline skating heel stop tutorial")],[E("T-stop",10,"Alterna lados; calidad antes que presión.","inline skating T stop tutorial")]],
 [["Vie","Giros"],[E("Basic stride",8,"Zancada lateral suave, empuje pequeño y retorno al centro.","inline skating basic stride tutorial")],[E("A-frame turn",10,"6 giros amplios por cada lado.","inline skating A frame turn")],[E("Carving suave",8,"Curvas en S sin buscar velocidad.","inline skating carving beginner")]],
 [["Sáb","Sesión integrada"],[E("Calentamiento",5,"Marcha y deslizamiento suave.","inline skating warm up")],[E("Circuito control",20,"2 vueltas: basic stride → A-frame → frenado → vuelta suave.","inline skating basic workout")],[E("Rodaje continuo",10,"Ritmo conversacional, sin perseguir kilómetros.","inline skating beginner endurance")]],
 [["Dom","Descanso"],[E("Descanso",0,"Sin patinaje. Caminata ligera opcional y movilidad.","inline skating recovery mobility")]]
]},
{title:"Frenado + estabilidad",focus:"Construir una base que permita aumentar velocidad sin perder control.",minutes:"25–40 min",days:[
 [["Lun","Frenado"],[E("T-stop lado dominante",10,"10 repeticiones progresivas.","inline skating T stop tutorial")],[E("T-stop lado no dominante",10,"10 repeticiones progresivas.","inline skating T stop tutorial")],[E("Heel brake / speed control",10,"Frenar desde velocidad moderada; nunca en pendiente.","inline skating heel stop speed control")]],
 [["Mar","Equilibrio"],[E("One-foot glide",10,"5×10–15 m por lado, progresando solo si el control es limpio.","inline skating one foot glide")],[E("Slalom ancho",12,"Conos separados; giro desde tobillos/rodillas, no solo hombros.","inline skating beginner slalom")],[E("A-frame turn",8,"Curvas más cerradas sin aumentar demasiado la velocidad.","inline skating A frame turn")]],
 [["Mié","Aeróbico fácil"],[E("Rodaje continuo",25,"RPE 3–4/10; técnica relajada.","inline skating fitness beginner")]],
 [["Jue","Transferencia"],[E("Lateral pushes",10,"Empuje lateral controlado; recupera el pie debajo del cuerpo.","inline skating lateral push stride")],[E("Lemon / swizzle",10,"Pies abren y cierran; rodillas flexionadas.","inline skating forward swizzle lemon")],[E("Frenado combinado",10,"Alterna T-stop y heel brake si dispones de freno.","inline skating speed control braking")]],
 [["Vie","Giros"],[E("Parallel turn básico",12,"Pies paralelos, inclinación progresiva y mirada hacia la salida.","inline skating parallel turn")],[E("Carving",12,"S curvas amplias, aumentando amplitud antes que velocidad.","inline skating carving")]],
 [["Sáb","Sesión integrada"],[E("Circuito técnico",30,"Slalom → carving → 1-foot glide → T-stop. 3 vueltas.","inline skating basic workout")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Zancada eficiente",focus:"Aprender a generar desplazamiento sin gastar energía innecesaria.",minutes:"30–45 min",days:[
 [["Lun","Stride"],[E("Push & recover",15,"Empuja lateralmente y recupera el pie debajo de la cadera.","inline skating push recover technique")],[E("Glide phase",10,"Después de cada empuje, deja rodar; evita pasos rápidos innecesarios.","inline skating efficient stride")],[E("One-foot glide",8,"Control de línea y equilibrio.","inline skating one foot glide")]],
 [["Mar","Técnica"],[E("Swizzle",10,"Control de cantos y presión simétrica.","inline skating swizzle")],[E("Crossover preparation",10,"Cruza caminando/lento en curva muy amplia; todavía sin velocidad.","inline skating crossover beginner preparation")],[E("Carving",12,"S curvas con torso estable.","inline skating carving")]],
 [["Mié","Endurance"],[E("Rodaje Z2 subjetivo",30,"RPE 4–5/10; puedes hablar en frases completas.","inline skating fitness endurance")]],
 [["Jue","Crossover"],[E("Cross-over lento",12,"Curva amplia, cruza el pie exterior sobre el interior; 6–10 pasos por lado.","inline skating crossover beginner")],[E("Crossover sin cruzar",8,"Practica la transferencia de peso y balanceo de cadera.","inline skating crossover drills")],[E("Frenado",10,"5 T-stops por lado.","inline skating T stop tutorial")]],
 [["Vie","Agilidad"],[E("Slalom medio",12,"Conos separados aproximadamente 2–3 m.","inline skating slalom beginner")],[E("A-frame + parallel",12,"Alterna ambos tipos de curva.","inline skating parallel turn A frame")]],
 [["Sáb","Sesión integrada"],[E("Rodaje técnico",35,"Bloques de 5 min: stride, carving, crossover, recuperación.","inline skating basic workout")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Crossover + curvas",focus:"Convertir los giros en una herramienta dinámica y estable.",minutes:"30–50 min",days:[
 [["Lun","Crossover"],[E("Crossovers en círculo",15,"Círculo grande; primero lento, luego moderado.","inline skating crossover turn")],[E("Crossover por ambos lados",15,"Misma cantidad de repeticiones en cada sentido.","inline skating crossover both directions")]],
 [["Mar","Curva"],[E("Parallel turn",15,"Reduce gradualmente el radio.","inline skating parallel turn")],[E("Carving rápido",12,"Solo aumenta velocidad si mantienes trayectoria y postura.","inline skating carving")],[E("T-stop",8,"Frenada de control al salir de curva.","inline skating T stop")]],
 [["Mié","Endurance"],[E("Rodaje continuo",35,"RPE 4–5; superficie plana.","inline skating fitness endurance")]],
 [["Jue","Agilidad"],[E("Slalom",15,"Conos 1.5–2.5 m según control.","inline skating slalom")],[E("Transitions: preparación",10,"Practica cambios de orientación a paso lento, sin velocidad.","inline skating transitions beginner")]],
 [["Vie","Técnica"],[E("Crossover + stride",15,"Entradas y salidas de curva.","inline skating crossover stride")],[E("One-foot glide",10,"Control de línea.","inline skating one foot glide")],[E("Speed control",10,"T-stop/heel brake según setup.","inline skating speed control")]],
 [["Sáb","Sesión larga fácil"],[E("Rodaje",45,"Ritmo fácil; cada 10 min haz 1 min de técnica.","inline skating endurance technique")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Transitions + backwards",focus:"Introducir patinaje hacia atrás con prioridad absoluta al control.",minutes:"35–50 min",days:[
 [["Lun","Backwards"],[E("Marcha hacia atrás",10,"En plano, pasos pequeños, mirada por encima del hombro.","inline skating backwards beginner")],[E("Backward swizzle",10,"Abre/cierra ambos pies manteniendo rodillas flexionadas.","inline skating backward swizzle")],[E("Freno de seguridad",8,"Practica cómo salir de backwards a posición segura.","inline skating backwards safety")]],
 [["Mar","Transitions"],[E("Forward → backward",12,"Primero caminando/rodando muy lento.","inline skating forward backward transition")],[E("Backward → forward",12,"Usa espacio amplio y sin obstáculos.","inline skating transition backward forward")]],
 [["Mié","Endurance"],[E("Rodaje fácil",40,"Mayormente forward.","inline skating fitness endurance")]],
 [["Jue","Curvas backward"],[E("Backward A-frame",12,"Curvas amplias a velocidad mínima.","inline skating backward A frame turn")],[E("Backward slalom ancho",10,"Solo si el control es sólido.","inline skating backward slalom")]],
 [["Vie","Combinación"],[E("Crossover forward",12,"Calidad y simetría.","inline skating crossover")],[E("Transition + glide",12,"Cada transición termina en 5–10 s de control.","inline skating transitions")]],
 [["Sáb","Sesión técnica"],[E("Circuito",40,"Forward → crossover → transition → backward → transición → frenado.","inline skating transition crossover backwards")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Control de velocidad",focus:"Aprender a decidir cuándo acelerar y cómo volver a una velocidad segura.",minutes:"35–50 min",days:[
 [["Lun","Speed control"],[E("Aceleración progresiva",12,"3–5 s de aceleración y luego control; no sprint.","inline skating speed control acceleration")],[E("T-stop",12,"Frena desde velocidad moderada.","inline skating T stop")],[E("Heel brake",8,"Si está instalado.","inline skating heel stop")]],
 [["Mar","Turns"],[E("Parallel turn",15,"Entradas a velocidad moderada.","inline skating parallel turn")],[E("Carving",15,"Control de cantos.","inline skating carving")]],
 [["Mié","Endurance"],[E("Rodaje continuo",45,"RPE 4–5.","inline skating fitness endurance")]],
 [["Jue","Hockey stop: preparación"],[E("Pivote de pies sin velocidad",10,"Practica el gesto sobre superficie muy controlada.","inline skating hockey stop beginner")],[E("Hockey stop asistido",10,"Solo si T-stop es automático y tienes espacio.","inline skating hockey stop tutorial")],[E("Frenado seguro",10,"Regresa a T-stop si el hockey stop no es limpio.","inline skating T stop")]],
 [["Vie","Agilidad"],[E("Slalom",15,"Variaciones de separación.","inline skating slalom")],[E("Crossover",15,"Más fluido, no necesariamente más rápido.","inline skating crossover")]],
 [["Sáb","Rodaje progresivo"],[E("40–50 min",45,"Bloques 10 min: fácil → moderado → fácil. Sin pendientes.","inline skating endurance progression")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Potencia técnica",focus:"Más calidad por empuje, manteniendo control y sin convertirlo en sprint.",minutes:"35–55 min",days:[
 [["Lun","Stride"],[E("Power stride",12,"Empuje más largo y lateral, recuperación completa.","inline skating power stride")],[E("One-foot glide",10,"Mantén 2–3 s por lado.","inline skating one foot glide")]],
 [["Mar","Crossover"],[E("Crossover potente",15,"Más presión sobre el exterior; 6–10 pasos por curva.","inline skating crossover technique")],[E("Curva cerrada",10,"Solo dentro de tu zona segura.","inline skating tight parallel turn")]],
 [["Mié","Endurance"],[E("Rodaje",45,"RPE 4–5.","inline skating fitness endurance")]],
 [["Jue","Agilidad"],[E("Slalom rápido controlado",15,"La prioridad sigue siendo la línea.","inline skating slalom technique")],[E("Transitions",12,"Forward/backward a baja velocidad.","inline skating transitions")]],
 [["Vie","Frenado"],[E("T-stop desde moderado",12,"Ambos lados.","inline skating T stop")],[E("Hockey stop",12,"Solo si ya tienes control; no practicar fatigado.","inline skating hockey stop")]],
 [["Sáb","Intervalos técnicos"],[E("6×3 min moderado / 2 min fácil",30,"Moderado = RPE 6, no sprint.","inline skating interval training")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Resistencia + economía",focus:"Aumentar tiempo sobre ruedas sin degradar la técnica.",minutes:"40–60 min",days:[
 [["Lun","Técnica"],[E("Stride eficiente",15,"Cuenta empujes por minuto y busca fluidez, no frecuencia máxima.","inline skating efficient stride")],[E("Carving",12,"Relajación.","inline skating carving")]],
 [["Mar","Curvas"],[E("Crossover continuo",20,"Bloques de 2 min por lado.","inline skating crossover")],[E("Parallel turn",10,"Control de radio.","inline skating parallel turn")]],
 [["Mié","Endurance"],[E("50 min continuo",50,"RPE 4–5; si la técnica se rompe, reduce ritmo.","inline skating endurance")]],
 [["Jue","Skills"],[E("Backwards",12,"Swizzle + glide.","inline skating backwards")],[E("Transitions",12,"Series de 5–8 transiciones limpias.","inline skating transitions")],[E("T-stop",8,"Mantenimiento.","inline skating T stop")]],
 [["Vie","Agilidad"],[E("Slalom + crossover",25,"Circuito de técnica.","inline skating slalom crossover")]],
 [["Sáb","Rodaje largo fácil"],[E("55–60 min",55,"Ritmo conversacional; no buscar récord de distancia.","inline skating long distance beginner")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Urban básico",focus:"Introducir habilidades útiles para superficies urbanas sin saltos grandes ni drops.",minutes:"40–60 min",days:[
 [["Lun","Superficie"],[E("Texturas suaves",12,"Practica sobre pequeñas variaciones de pavimento a velocidad muy baja.","inline skating rough surface technique")],[E("Obstáculos pequeños",10,"Líneas y juntas; rodillas flexionadas.","inline skating skating over bumps")]],
 [["Mar","Urban"],[E("A-frame + carving",15,"Control en espacios reducidos.","inline skating urban turns")],[E("Curb approach sin subir",10,"Aprende a frenar y evaluar antes de cualquier obstáculo.","inline skating curb safety")]],
 [["Mié","Endurance"],[E("45–55 min",50,"Superficie conocida y segura.","inline skating endurance")]],
 [["Jue","Skills"],[E("Backward",12,"Mantenimiento.","inline skating backwards")],[E("Transitions",12,"Mantenimiento.","inline skating transitions")],[E("Hockey stop",10,"Solo si dominado; superficie segura.","inline skating hockey stop")]],
 [["Vie","Control"],[E("Stop-go",20,"Acelera 5 s, estabiliza, frena; 8–10 ciclos.","inline skating stop and go workout")]],
 [["Sáb","Ruta técnica"],[E("50–60 min",55,"Ruta plana conocida; evita tráfico, bajadas y obstáculos no controlados.","inline skating urban skating safety")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Velocidad submáxima",focus:"Explorar velocidad sin perder técnica ni margen de frenado.",minutes:"40–60 min",days:[
 [["Lun","Acceleration"],[E("6×8 s",20,"Aceleración progresiva; 90 s fácil entre repeticiones.","inline skating acceleration technique")],[E("T-stop",10,"Frenado después de cada bloque solo si hay espacio.","inline skating T stop")]],
 [["Mar","Technique"],[E("Power stride",15,"Longitud y recuperación.","inline skating power stride")],[E("Crossover",15,"Curva amplia.","inline skating crossover")]],
 [["Mié","Endurance"],[E("50–60 min",55,"RPE 4–5.","inline skating endurance")]],
 [["Jue","Braking"],[E("Speed control",15,"Aumenta velocidad solo hasta el punto en que puedas frenar con margen.","inline skating speed control")],[E("Hockey stop",12,"Técnica, no potencia máxima.","inline skating hockey stop")]],
 [["Vie","Agility"],[E("Slalom",15,"Velocidad moderada.","inline skating slalom")],[E("Transitions",12,"Solo a velocidad baja/moderada.","inline skating transitions")]],
 [["Sáb","Intervals"],[E("8×2 min moderado / 2 min fácil",32,"RPE 6 en los bloques moderados.","inline skating interval training")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Integración",focus:"Combinar las habilidades en situaciones más parecidas a un entrenamiento real.",minutes:"45–65 min",days:[
 [["Lun","Skills circuit"],[E("Circuito 1",25,"Stride → carving → crossover → stop.","inline skating basic workout")],[E("Circuito 2",15,"Backward → transition → forward → T-stop.","inline skating transitions backwards")]],
 [["Mar","Endurance"],[E("60 min",60,"RPE 4–5, técnica constante.","inline skating endurance")]],
 [["Mié","Técnica ligera"],[E("30 min fácil",30,"Recuperación activa.","inline skating easy skating")]],
 [["Jue","Speed + braking"],[E("10×10 s aceleración",25,"Submáximo, recuperación amplia.","inline skating acceleration")],[E("Frenado",12,"T-stop/hockey stop según nivel.","inline skating braking")]],
 [["Vie","Agility"],[E("Slalom + crossovers",30,"Bloques de 5 min.","inline skating slalom crossover")]],
 [["Sáb","Sesión larga"],[E("60–65 min",60,"Ruta segura y conocida; técnica bajo fatiga.","inline skating endurance")]],
 [["Dom","Descanso"],[E("Descanso",0,"Recuperación.","inline skating recovery")]]
]},
{title:"Evaluación + consolidación",focus:"Demostrar control, no récords. Comparar con semana 1.",minutes:"45–70 min",days:[
 [["Lun","Test técnico"],[E("One-foot glide",10,"Objetivo: control simétrico y trayectoria estable.","inline skating one foot glide")],[E("T-stop ambos lados",10,"Objetivo: frenada progresiva y controlada.","inline skating T stop")],[E("Parallel turns",10,"Objetivo: radio consistente.","inline skating parallel turn")]],
 [["Mar","Test agility"],[E("Slalom",15,"Objetivo: mantener línea y postura.","inline skating slalom")],[E("Crossover",15,"Objetivo: ambos sentidos.","inline skating crossover")]],
 [["Mié","Endurance"],[E("60 min",60,"RPE 4–5; sin degradación marcada.","inline skating endurance")]],
 [["Jue","Backwards"],[E("Backward glide",12,"Control visual y postura.","inline skating backwards")],[E("Transitions",12,"5–10 repeticiones limpias.","inline skating transitions")]],
 [["Vie","Frenado"],[E("Speed control",15,"Compara sensación con semana 1.","inline skating speed control")],[E("Hockey stop",10,"Solo si técnica ya consolidada.","inline skating hockey stop")]],
 [["Sáb","Final 13 semanas"],[E("70 min técnico",70,"10 min fácil + 40 min técnica/rodaje + 10 min progresivo + 10 min fácil. No buscar récord.","inline skating basic workout")]],
 [["Dom","Evaluación"],[E("Autoevaluación",0,"Registra: confianza, frenado, crossover, backwards, distancia, RPE y molestias. Repite los vídeos de referencia que necesites.","inline skating skills assessment")]]
]}
];

let currentWeek = Number(localStorage.getItem("rts_week") || 0);
let completed = JSON.parse(localStorage.getItem("rts_done") || "{}");

function key(w,d,e){return `${w}-${d}-${e}`}
function yt(q){return VIDEO_BASE + encodeURIComponent(q)}
function exerciseHtml(w,d,e,ex){
  const k=key(w,d,e), checked=!!completed[k];
  return `<div class="exercise">
    <input type="checkbox" data-key="${k}" ${checked?"checked":""} aria-label="Marcar ${ex.name} como completado">
    <div>
      <h4>${ex.name}</h4>
      <p>${ex.desc}</p>
      ${ex.tags.map(t=>`<span class="tag">${t}</span>`).join("")}
      <div class="linkrow">
        <a class="link" target="_blank" rel="noopener" href="${yt(ex.search)}">▶ Vídeo / búsqueda guiada</a>
        <a class="link" target="_blank" rel="noopener" href="${ROLLERBLADE}">🎬 Biblioteca Rollerblade</a>
        <button class="link detailBtn" data-week="${w}" data-day="${d}" data-ex="${e}">ℹ Detalle</button>
      </div>
    </div>
    <div class="time">${ex.minutes?ex.minutes+" min":"—"}</div>
  </div>`
}

function renderNav(){
  const nav=document.getElementById("weekNav");
  nav.innerHTML=`<h3>13 semanas</h3>`+weeks.map((w,i)=>`
    <button class="weekBtn ${i===currentWeek?"active":""}" data-week="${i}">
      <strong>Semana ${i+1}</strong>
      <small>${w.title}</small>
    </button>`).join("");
  nav.querySelectorAll(".weekBtn").forEach(b=>b.onclick=()=>{currentWeek=+b.dataset.week;localStorage.setItem("rts_week",currentWeek);render()});
}
function render(){
  renderNav();
  const w=weeks[currentWeek];
  document.getElementById("weekHeader").innerHTML=`<div class="eyebrow">SEMANA ${currentWeek+1}</div><h2>${w.title}</h2><p>${w.focus}</p><div class="checkSummary">Volumen orientativo: ${w.minutes}. 645 queda fuera de este plan y se mantiene según tu programa.</div>`;
  document.getElementById("days").innerHTML=w.days.map((day,d)=>`
    <article class="day card">
      <div class="dayHead" data-collapse="${d}">
        <div><strong>${day[0][0]} · ${day[0][1]}</strong><div class="dayMeta">${day[1]?.name==="Descanso"?"Recuperación":day[1]?.name||"Sesión"}</div></div>
        <span>⌄</span>
      </div>
      <div class="dayBody">
        ${day.slice(1).map((ex,e)=>exerciseHtml(currentWeek,d,e,ex)).join("")}
      </div>
    </article>`).join("");
  bind();
  updateStats();
}
function bind(){
  document.querySelectorAll('input[type="checkbox"]').forEach(c=>c.onchange=()=>{
    completed[c.dataset.key]=c.checked;localStorage.setItem("rts_done",JSON.stringify(completed));updateStats();
  });
  document.querySelectorAll(".detailBtn").forEach(b=>b.onclick=()=>{
    const w=weeks[+b.dataset.week], ex=w.days[+b.dataset.day].slice(1)[+b.dataset.ex];
    document.getElementById("modalContent").innerHTML=`<div class="eyebrow">TÉCNICA</div><h2>${ex.name}</h2><p>${ex.desc}</p><p><strong>Duración:</strong> ${ex.minutes?ex.minutes+" minutos":"según necesidad"}</p><p><strong>Búsqueda recomendada:</strong> ${ex.search}</p><a class="link" target="_blank" rel="noopener" href="${yt(ex.search)}">Abrir vídeos</a>`;
    document.getElementById("modal").classList.remove("hidden");
  });
  document.querySelectorAll(".dayHead").forEach(h=>h.onclick=()=>{
    const body=h.parentElement.querySelector(".dayBody"); body.style.display=body.style.display==="none"?"block":"none";
  });
}
function updateStats(){
  const total=weeks.reduce((n,w)=>n+w.days.reduce((m,d)=>m+Math.max(0,d.length-1),0),0);
  const done=Object.values(completed).filter(Boolean).length;
  document.getElementById("sessionsDone").textContent=`${done}/${total}`;
  document.getElementById("progressPct").textContent=Math.round(done/total*100)+"%";
}
document.getElementById("closeModal").onclick=()=>document.getElementById("modal").classList.add("hidden");
document.getElementById("modal").onclick=e=>{if(e.target.id==="modal")e.currentTarget.classList.add("hidden")};
document.getElementById("resetBtn").onclick=()=>{
  if(confirm("¿Borrar todo el progreso guardado?")){completed={};localStorage.removeItem("rts_done");render();}
};
render();
