/* guide.js — Biblioteca de guías de ejercicios (generado a partir de guide_part1..3.js) */
/* guide_part1.js — Seguridad, base técnica y frenado.
   Campos por ejercicio:
     what   : qué es, en una frase, sin jerga
     steps  : pasos numerados y concretos (qué hacer con pies, rodillas, tronco, mirada)
     mistake: el error más común y cómo notarlo
     ok     : criterio de éxito observable (cuándo puedes pasar al siguiente)
     yt     : consulta de YouTube en español natural
     ytEn   : (opcional) consulta en inglés, solo si en español hay poco contenido fiable
     needs  : material necesario
*/
const GUIDE = {};

GUIDE['Aprender a caer'] = {
  what: 'Practicar caídas controladas en un lugar blando para que, cuando ocurra una caída real, tu cuerpo ya sepa qué hacer.',
  steps: [
    'Ponte todas las protecciones: casco, muñequeras, rodilleras y coderas.',
    'Colócate sobre césped o una alfombra gruesa, con los patines puestos y quieto.',
    'Flexiona las rodillas y baja el cuerpo, como si te fueras a sentar en una silla baja.',
    'Deja que las rodillas toquen el suelo primero y desliza las manos hacia delante sobre las muñequeras.',
    'Mantén los brazos ligeramente flexionados, nunca rígidos, y la cabeza levantada.',
    'Repítelo hasta que agacharte al perder el equilibrio sea un reflejo.'
  ],
  mistake: 'Estirar los brazos rígidos para frenar el golpe. Es la forma más común de lesionarse la muñeca: si notas los codos bloqueados, estás cayendo mal.',
  ok: 'Puedes dejarte caer hacia delante sobre rodillas y muñequeras sin mover los brazos rígidos, 5 veces seguidas.',
  yt: 'patinaje en línea cómo caer correctamente principiantes',
  ytEn: 'inline skating how to fall safely beginner',
  needs: 'Protecciones completas y una superficie blanda.'
};

GUIDE['Levantarse del suelo'] = {
  what: 'Aprender a ponerte de pie con patines puestos sin que las ruedas se te escapen.',
  steps: [
    'Ponte a cuatro apoyos: manos y rodillas en el suelo.',
    'Levanta una rodilla y coloca ese patín con las ruedas planas en el suelo, delante de ti.',
    'Apoya las manos sobre esa rodilla y empuja hacia arriba con la pierna de delante.',
    'Trae el otro pie junto al primero, con los patines en paralelo.',
    'Ya de pie, mantén las rodillas flexionadas y los brazos delante del cuerpo.',
    'Si ruedas, vuelve a cuatro apoyos: no intentes levantarte con las ruedas en movimiento.'
  ],
  mistake: 'Intentar levantarte con los dos patines a la vez o sobre una superficie lisa: las ruedas se escapan. Hazlo sobre césped o junto a una pared.',
  ok: 'Te levantas 3 veces seguidas sin agarrarte a nada y sin que los patines se deslicen.',
  yt: 'patinaje en línea cómo levantarse después de caer',
  ytEn: 'inline skating how to get up after falling',
  needs: 'Superficie con algo de agarre (césped) o una pared cercana.'
};

GUIDE['Postura atlética'] = {
  what: 'La posición base de cualquier patinador: te da equilibrio, control y te protege las rodillas. Todo lo demás se construye sobre ella.',
  steps: [
    'Pies separados al ancho de los hombros, paralelos.',
    'Flexiona los tobillos: las espinillas empujan hacia delante contra la lengüeta de la bota.',
    'Flexiona las rodillas hasta que veas la punta de tus patines mirando hacia abajo.',
    'Mantén la espalda recta y el pecho abierto, sin encorvarte.',
    'Baja las manos y llévalas delante del cuerpo, relajadas, a la altura de la cintura.',
    'Mira al frente (a unos 5–10 metros), no a tus pies.'
  ],
  mistake: 'Doblar la cintura en vez de las rodillas y los tobillos: quedas con el cuerpo inclinado hacia delante y sin equilibrio. Tu trasero debe quedar como si te sentaras.',
  ok: 'Mantienes la postura 30 segundos sin apoyarte y sin que te tiemblen las piernas.',
  yt: 'patinaje en línea postura básica posición de equilibrio principiantes',
  ytEn: 'inline skating basic stance posture',
  needs: 'Patines y protecciones.'
};

GUIDE['Marcha en V'] = {
  what: 'Caminar con patines abriendo los pies en forma de V para acostumbrarte a las ruedas antes de deslizarte.',
  steps: [
    'Adopta la postura atlética con los pies en forma de V (talones juntos, puntas abiertas).',
    'Da pasos cortos levantando un pie y apoyándolo en el suelo, como si caminaras como un pato.',
    'A medida que ganes confianza, alarga el paso y deja que la rueda ruede un poco al apoyar.',
    'Cuando sientas que el patín se desliza, transfiere el peso a ese pie y déjalo rodar un instante.',
    'Alterna un pie y el otro, siempre con las rodillas flexionadas.'
  ],
  mistake: 'Dar pasos largos y rápidos demasiado pronto: pierdes el control. Los pasos deben ser pequeños hasta que rodar te resulte natural.',
  ok: 'Avanzas 10 metros con pasos en V, con deslizamiento breve en cada paso, sin agarrarte a nada.',
  yt: 'patinaje en línea primeros pasos marcha en V como patinar por primera vez',
  ytEn: 'inline skating first steps V walk beginner',
  needs: 'Espacio plano y liso, y una pared o barandilla cercana como apoyo.'
};

GUIDE['One-foot glide'] = {
  what: 'Deslizarte sobre un solo patín. Es la base del equilibrio y de casi todas las habilidades posteriores.',
  steps: [
    'Rueda despacio en línea recta, con la postura atlética.',
    'Deja de empujar y transfiere el peso a un pie, dejando el otro apenas separado del suelo.',
    'Mantén la rodilla del pie de apoyo flexionada y el tronco sobre ese pie.',
    'Mira al frente, brazos abiertos a los lados para compensar.',
    'Cuenta cuántos segundos aguantas antes de volver a apoyar el otro pie.',
    'Repite con el otro pie: un lado casi siempre es más difícil, y es normal.'
  ],
  mistake: 'Levantar el pie libre demasiado alto o echar el cuerpo atrás. El pie libre debe quedar cerca del suelo, listo para volver a apoyarse.',
  ok: 'Deslizas 5 segundos sobre cada pie sin bajar el otro.',
  yt: 'patinaje en línea deslizarse sobre un pie equilibrio principiantes',
  ytEn: 'inline skating one foot glide balance',
  needs: 'Espacio plano y liso, sin tráfico.'
};

GUIDE['One-foot stance'] = {
  what: 'Mantener el equilibrio sobre un pie, sin ruedar. Es el ejercicio previo al deslizamiento sobre un pie.',
  steps: [
    'Ponte junto a una pared o barandilla, con los patines quietos.',
    'Adopta la postura atlética y transfiere el peso a un pie.',
    'Levanta el otro pie unos centímetros del suelo, sin subir la rodilla.',
    'Mantén la posición contando segundos; si te desequilibras, apoya el pie libre.',
    'Repite con el otro pie.'
  ],
  mistake: 'Apoyarte en la pared con todo el peso. Úsala solo para recuperar el equilibrio, no como soporte.',
  ok: 'Mantienes 10 segundos sobre cada pie sin tocar la pared.',
  yt: 'equilibrio sobre un pie con patines ejercicio principiantes',
  ytEn: 'inline skating one foot balance drill',
  needs: 'Una pared o barandilla cerca.'
};

GUIDE['Frenado: gesto sin rodar'] = {
  what: 'Ensayar el movimiento del freno de talón con los patines parados, para que tu cuerpo lo aprenda antes de rodar. Es el freno principal de los patines de fitness.',
  steps: [
    'Ponte sobre césped o una alfombra, con los patines puestos y quietos.',
    'Adopta la postura atlética, rodillas flexionadas.',
    'Adelanta el patín que lleva el freno (el de talón) unos 20–30 cm delante del otro.',
    'Levanta la punta del patín delantero hacia arriba: el talón queda apoyado y la punta sube.',
    'Empuja el talón hacia abajo y hacia delante, como si aplastaras un pedal.',
    'Mantén el patín trasero flexionado y el peso repartido; los brazos, delante del cuerpo.'
  ],
  mistake: 'Poner el peso solo en el pie de delante o inclinar el cuerpo hacia atrás. Tu tronco debe quedar erguido, sobre el pie trasero, con las rodillas flexionadas.',
  ok: 'Repites el gesto 10 veces seguidas con el talón apoyado y la punta hacia arriba, sin desequilibrarte.',
  yt: 'patinaje en línea cómo frenar con el freno de talón principiantes',
  ytEn: 'inline skating heel brake braking technique',
  needs: 'Patines con freno de talón. Si no tienes freno, usa el T-stop.'
};

GUIDE['Heel brake + control de velocidad'] = {
  what: 'Frenar rodando con el freno de talón para reducir tu velocidad de forma controlada.',
  steps: [
    'Rueda despacio en línea recta sobre superficie plana, con la postura atlética.',
    'Adelanta el patín con freno, con las rodillas flexionadas.',
    'Levanta la punta de ese patín y empuja el talón hacia abajo y delante.',
    'Aumenta la presión poco a poco, sin brusquedades, hasta detenerte.',
    'Mantén el peso sobre el pie trasero y los brazos delante.',
    'Practica primero en plano, a velocidad muy baja.'
  ],
  mistake: 'Frenar de golpe con todo el peso en el freno: el patín trasero se escapa. La presión debe subir gradualmente.',
  ok: 'Te detienes por completo en menos de 5 metros desde un trote suave, sin perder el equilibrio.',
  yt: 'patinaje en línea frenar con freno de talón paso a paso',
  ytEn: 'inline skating heel brake tutorial',
  needs: 'Patines con freno de talón. Espacio plano y liso.'
};

GUIDE['Frenado de emergencia: preparación'] = {
  what: 'Ensayar cómo detenerte rápido cuando ya llevas algo de velocidad, empezando con velocidad mínima.',
  steps: [
    'Rueda a velocidad mínima en línea recta, con la postura atlética.',
    'Antes de aumentar la presión, comprueba que tienes el equilibrio estable.',
    'Elige tu freno (talón o T-stop) y aplícalo poco a poco.',
    'Si notas que pierdes el control, agáchate y prepárate para caer con rodillas y muñequeras.',
    'Aumenta la velocidad solo cuando el frenado sea consistente.'
  ],
  mistake: 'Aumentar la velocidad antes de dominar el frenado a baja velocidad. La secuencia correcta es: primero controlar, después ir más rápido.',
  ok: 'Te detienes de forma limpia 5 de 5 veces desde velocidad de trote.',
  yt: 'patinaje en línea frenado de emergencia técnica segura',
  ytEn: 'inline skating emergency stop technique',
  needs: 'Espacio plano, amplio y sin tráfico.'
};

GUIDE['T-stop'] = {
  what: 'Un freno donde arrastras un patín por detrás del otro, con las ruedas en perpendicular. Funciona sin necesidad de freno de talón.',
  steps: [
    'Rueda despacio en línea recta y desliza sobre el pie delantero (el de apoyo).',
    'Lleva el otro pie hacia atrás y colócalo en forma de T, perpendicular al pie de apoyo.',
    'Apoya ese patín trasero con solo las ruedas del borde interior tocando el suelo.',
    'Aumenta la presión poco a poco sobre el patín trasero: se frenará al arrastrar.',
    'Mantén la rodilla del pie de apoyo bien flexionada y el tronco erguido.',
    'Mira al frente y suelta la presión al detenerte.'
  ],
  mistake: 'Apoyar todas las ruedas del patín trasero (el patín gira) o arrastrarlo con fuerza excesiva. Debe rozar con el borde interior, de forma progresiva.',
  ok: 'Te detienes desde un trote suave en menos de 4 metros, con cada pie, 3 veces seguidas.',
  yt: 'patinaje en línea cómo hacer el T-stop freno en T paso a paso',
  ytEn: 'inline skating T-stop tutorial beginner',
  needs: 'Espacio plano y liso. Sirve aunque tus patines no tengan freno.'
};

/* guide_part2.js — Desplazamiento, giros, crossover y slalom. */

GUIDE['Calentamiento sobre patines'] = {
  what: 'Preparar tobillos, rodillas y equilibrio antes de la sesión. Reduce el riesgo de lesión y mejora las primeras vueltas.',
  steps: [
    'Ponte los patines y las protecciones; empieza sobre una superficie plana.',
    'Haz 10 círculos con cada tobillo y 10 flexiones lentas de rodilla.',
    'Camina o rueda muy despacio 1–2 minutos en línea recta.',
    'Añade 2–3 minutos de deslizamiento fácil, sin esfuerzo.',
    'Termina con 3–4 giros amplios suaves a cada lado.'
  ],
  mistake: 'Saltarte el calentamiento cuando tienes poco tiempo. Es justo cuando más falta hace: las primeras vueltas son las de mayor riesgo.',
  ok: 'Al terminar notas los tobillos sueltos y el equilibrio estable.',
  yt: 'calentamiento antes de patinar ejercicios patinaje en línea',
  ytEn: 'inline skating warm up routine',
  needs: 'Patines y protecciones.'
};

GUIDE['Basic stride'] = {
  what: 'La zancada básica: empujar hacia un lado con un pie, deslizar sobre el otro y recuperar. Así avanzas rodando sin caminar.',
  steps: [
    'Adopta la postura atlética con los pies en forma de V pequeña.',
    'Empuja con un pie hacia fuera y ligeramente hacia atrás, usando el borde interior de las ruedas.',
    'Transfiere el peso al otro pie y deslízate sobre él unos segundos.',
    'Recupera el pie que empujó, llevándolo debajo de la cadera.',
    'Alterna con el otro pie y repite en ritmo pausado.',
    'Mantén las rodillas flexionadas y los brazos relajados durante todo el movimiento.'
  ],
  mistake: 'Empujar hacia atrás en vez de hacia el lado: las ruedas no agarran y no avanzas. Piensa en empujar la pared con el lado del patín.',
  ok: 'Avanzas 20 metros alternando empujes, con deslizamiento entre cada uno, sin usar los brazos para equilibrarte.',
  yt: 'patinaje en línea cómo patinar zancada básica principiantes',
  ytEn: 'inline skating basic stride beginner',
  needs: 'Espacio plano y liso.'
};

GUIDE['Push & recover'] = {
  what: 'Practicar cada empuje con calma, prestando atención a la recuperación del pie antes de dar el siguiente.',
  steps: [
    'Empieza a ritmo lento con la postura atlética.',
    'Empuja lateralmente con un pie usando el borde interior.',
    'Deja que el patín de apoyo ruede sin forzar (fase de glide).',
    'Recupera el pie del empuje debajo de la cadera antes de apoyarlo.',
    'No empujes de nuevo hasta que el pie recuperado esté colocado.'
  ],
  mistake: 'Empujar con demasiada frecuencia sin dejar rodar: la técnica se acorta y te cansas antes. Deja siempre una fase de deslizamiento.',
  ok: 'Cada empuje va seguido de un deslizamiento visible de 1–2 segundos.',
  yt: 'patinaje en línea empuje y recuperación técnica de la zancada',
  ytEn: 'inline skating push and recover technique',
  needs: 'Espacio plano y liso.'
};

GUIDE['Stride eficiente'] = {
  what: 'Una zancada más larga y con menos pasos: aprovechas cada empuje en vez de dar muchos pasos cortos.',
  steps: [
    'Empieza con la zancada básica a ritmo cómodo.',
    'Alarga el empuje: extiende la pierna de empuje completamente hacia el lado.',
    'Deja rodar mientras dura el deslizamiento antes de volver a empujar.',
    'Recupera el pie debajo del cuerpo, sin arrastrarlo por el suelo.',
    'Reduce el número de pasos para cubrir la misma distancia.'
  ],
  mistake: 'Dar muchos pasos rápidos y cortos sin deslizar. Eso cansa más y no te hace avanzar más.',
  ok: 'Cubres 30 metros con menos pasos que la semana anterior, manteniendo la postura.',
  yt: 'patinaje en línea zancada eficiente técnica de empuje',
  ytEn: 'inline skating efficient stride technique',
  needs: 'Espacio plano y liso.'
};

GUIDE['Power stride'] = {
  what: 'Una zancada más potente y larga para ganar velocidad de forma controlada. Solo cuando la zancada básica ya es estable.',
  steps: [
    'Parte de una zancada básica cómoda con la postura atlética baja.',
    'Empuja con más fuerza y extiende la pierna por completo hacia el lado.',
    'Deslízate sobre el pie de apoyo el tiempo que dure el impulso.',
    'Recupera el pie completo debajo de la cadera antes de empujar otra vez.',
    'Aumenta la velocidad solo si puedes frenar con margen.'
  ],
  mistake: 'Buscar potencia a costa de la técnica: si pierdes la postura o el control del frenado, baja el ritmo.',
  ok: 'Mantienes una zancada larga y estable durante 30 segundos sin perder la postura.',
  yt: 'patinaje en línea zancada potente técnica de velocidad',
  ytEn: 'inline skating power stride technique',
  needs: 'Espacio amplio y plano, y un freno fiable.'
};

GUIDE['A-frame turn'] = {
  what: 'Un giro básico donde los patines forman una A y te inclinas hacia el lado al que quieres ir. Es el primer giro que se aprende.',
  steps: [
    'Rueda despacio en línea recta con la postura atlética.',
    'Abre los pies en forma de A (talones juntos, puntas separadas).',
    'Inclínate suavemente hacia el lado al que quieres girar.',
    'Mantén el tronco estable y mira hacia la dirección del giro.',
    'Al terminar la curva, vuelve a poner los pies paralelos.',
    'Practica curvas amplias a ambos lados.'
  ],
  mistake: 'Girar solo con los pies sin inclinar el cuerpo, o inclinarte demasiado y perder el equilibrio. La inclinación debe ser gradual.',
  ok: 'Haces una curva amplia a cada lado sin perder el equilibrio ni ir cada vez más despacio.',
  yt: 'patinaje en línea cómo girar en A curvas básicas principiantes',
  ytEn: 'inline skating A-frame turn tutorial',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Backward A-frame'] = {
  what: 'El mismo giro en A, pero rodando hacia atrás. Solo cuando ya controlas el backward básico.',
  steps: [
    'Rueda hacia atrás muy despacio con la postura atlética.',
    'Mira por encima del hombro hacia donde vas.',
    'Abre los pies formando una A al revés (puntas juntas, talones separados).',
    'Inclínate suavemente hacia el lado del giro.',
    'Mantén la velocidad mínima y el tronco estable.'
  ],
  mistake: 'Ir demasiado rápido o girar la cabeza sin control: en marcha atrás ves poco. Empieza siempre muy despacio.',
  ok: 'Haces una curva amplia hacia atrás a cada lado, a velocidad mínima, sin perder el control.',
  yt: 'patinaje en línea curva en A hacia atrás patinar en reversa',
  ytEn: 'inline skating backward A-frame turn',
  needs: 'Espacio amplio, plano y sin gente.'
};

GUIDE['Carving en S'] = {
  what: 'Trazar curvas en forma de S alternando el canto de las ruedas. Te enseña a girar de forma fluida, sin frenar.',
  steps: [
    'Rueda despacio en línea recta con la postura atlética.',
    'Inclina los tobillos y las rodillas hacia un lado, cargando el canto de las ruedas.',
    'Deja que el patín trace una curva suave.',
    'Al terminar la curva, cambia el canto hacia el otro lado y traza la curva contraria.',
    'Mantén el tronco estable y mira al final de la curva.'
  ],
  mistake: 'Girar los hombros para hacer la curva: son los tobillos y las rodillas los que guían. Los hombros quedan quietos.',
  ok: 'Trazas 4 curvas seguidas, a ambos lados, con un ritmo constante y sin perder velocidad.',
  yt: 'patinaje en línea curvas en S carving técnica de giro',
  ytEn: 'inline skating carving S turns technique',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Parallel turn'] = {
  what: 'Un giro con los dos patines paralelos, inclinando el cuerpo. Es más fluido y rápido que el giro en A.',
  steps: [
    'Rueda con los pies paralelos, separados al ancho de los hombros.',
    'Mira hacia la salida de la curva.',
    'Inclina el cuerpo hacia el lado del giro: los tobillos y las rodillas van primero.',
    'Aumenta la presión sobre los cantos del lado exterior progresivamente.',
    'Mantén los hombros alineados y el tronco estable.',
    'Al terminar la curva, vuelve a la posición recta.'
  ],
  mistake: 'Girar los hombros o los brazos para iniciar la curva. La curva la inicia la inclinación de tobillos y rodillas.',
  ok: 'Haces curvas de radio parecido a ambos lados, con los pies siempre paralelos.',
  yt: 'patinaje en línea giro paralelo técnica de curvas',
  ytEn: 'inline skating parallel turn tutorial',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Forward swizzle / lemon'] = {
  what: 'Abrir y cerrar los pies rodando hacia delante, dibujando un limón con las ruedas. Te enseña a usar el borde interior y exterior.',
  steps: [
    'Ponte con los pies juntos y las rodillas flexionadas.',
    'Abre los talones hacia fuera mientras las puntas se mantienen cerca.',
    'Cuando estén separados, cierra los pies empujando con los bordes interiores.',
    'Repite abriendo y cerrando en ritmo constante.',
    'Las rodillas se flexionan al abrir y se estiran al cerrar.'
  ],
  mistake: 'Abrir los pies demasiado: las ruedas se van y pierdes control. Abre poco y con las rodillas flexionadas.',
  ok: 'Avanzas 10 metros abriendo y cerrando los pies de forma continua, sin agarrarte a nada.',
  yt: 'patinaje en línea swizzle limón abrir y cerrar pies hacia delante',
  ytEn: 'inline skating forward swizzle lemon',
  needs: 'Espacio plano y liso.'
};

GUIDE['Crossover preparación'] = {
  what: 'Practicar la transferencia de peso en una curva amplia antes de cruzar los pies. Es el paso previo al crossover.',
  steps: [
    'Rueda en una curva amplia hacia un lado, con la postura atlética.',
    'Inclínate hacia el centro del círculo y carga el pie exterior.',
    'Levanta el pie interior unos centímetros y mantén el equilibrio.',
    'Vuelve a apoyarlo sin cruzarlo todavía.',
    'Alterna la dirección de la curva y repite.'
  ],
  mistake: 'Ir demasiado rápido: en la curva la velocidad aumenta la inclinación necesaria. Rueda despacio.',
  ok: 'Mantienes el equilibrio en la curva levantando el pie interior 3 segundos, a ambos lados.',
  yt: 'patinaje en línea preparación crossover curva transferencia de peso',
  ytEn: 'inline skating crossover preparation drill',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Crossover lento'] = {
  what: 'Cruzar un pie por delante del otro en una curva grande y a poca velocidad. Es la forma de mantener el ritmo en las curvas.',
  steps: [
    'Rueda en una curva grande hacia un lado, inclinado hacia dentro.',
    'Carga el pie exterior y levanta el pie interior.',
    'Cruza el pie exterior por delante del interior y apóyalo en el suelo.',
    'Empuja con el pie interior hacia fuera y recupéralo.',
    'Repite pocos cruces y con mucha estabilidad, sin acelerar.'
  ],
  mistake: 'Cruzar con las piernas rígidas o levantando demasiado el pie. El cruce debe ser un movimiento corto y fluido.',
  ok: 'Haces 3 cruces seguidos a cada lado sin perder el equilibrio ni acelerar.',
  yt: 'patinaje en línea crossover cruzar los pies en curva principiantes',
  ytEn: 'inline skating crossover beginner tutorial',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Crossover forward'] = {
  what: 'El crossover hacia delante en una curva: cruzas el pie exterior sobre el interior para mantener velocidad mientras giras.',
  steps: [
    'Rueda en una curva amplia con la postura atlética.',
    'Inclínate hacia el centro del círculo.',
    'Cruza el pie exterior sobre el interior y apóyalo.',
    'Empuja con el pie interior hacia fuera, recuperándolo por debajo.',
    'Repite de forma continua, controlando el ritmo.'
  ],
  mistake: 'Perder la inclinación del cuerpo: si te enderezas, el crossover se vuelve inestable. Mantén la inclinación durante la curva.',
  ok: 'Completas un círculo entero de crossover a un lado, con ritmo constante.',
  yt: 'patinaje en línea crossover hacia delante técnica curva continua',
  ytEn: 'inline skating forward crossover technique',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Crossovers en círculo'] = {
  what: 'Encadenar crossovers dibujando un círculo grande, buscando un ritmo constante.',
  steps: [
    'Traza mentalmente un círculo grande en el suelo.',
    'Rueda por el círculo con crossovers continuos, inclinado hacia el centro.',
    'Mantén el mismo ritmo en cada cruce.',
    'Da varias vueltas y luego cambia de dirección.',
    'Mira siempre hacia dentro del círculo, no a los pies.'
  ],
  mistake: 'Acelerar en cada vuelta: el círculo se vuelve más grande y pierdes el control. Mantén el ritmo constante.',
  ok: 'Das 3 vueltas seguidas a cada lado con ritmo estable.',
  yt: 'patinaje en línea crossover en círculo ejercicio de práctica',
  ytEn: 'inline skating crossover circle drill',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Crossover con presión'] = {
  what: 'Un crossover donde aplicas más presión sobre el borde exterior para acelerar la curva, con el torso estable.',
  steps: [
    'Empieza con un crossover cómodo en un círculo.',
    'Aumenta la presión sobre el patín exterior durante el cruce.',
    'Mantén el torso estable y los hombros alineados.',
    'Empuja con firmeza con el pie interior.',
    'Reduce la presión si pierdes el control.'
  ],
  mistake: 'Inclinar los hombros en vez del cuerpo entero: pierdes la estabilidad. Los hombros siguen la línea del círculo.',
  ok: 'Mantienes crossovers con presión durante media vuelta sin perder el torso estable.',
  yt: 'patinaje en línea crossover con presión curva rápida técnica',
  ytEn: 'inline skating powerful crossover technique',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Radio progresivo'] = {
  what: 'Empezar con una curva grande y reducirla poco a poco. Te enseña a controlar cuánto cierras el giro.',
  steps: [
    'Traza una curva amplia a velocidad baja.',
    'En cada vuelta, reduce el radio unos 30–50 cm.',
    'Mantén la misma velocidad; no acelerar para compensar.',
    'Detente si pierdes el equilibrio y repite con un radio mayor.'
  ],
  mistake: 'Cerrar el radio de golpe. La reducción debe ser pequeña y gradual.',
  ok: 'Reduces el radio 3 veces seguidas sin perder el equilibrio ni la velocidad.',
  yt: 'patinaje en línea controlar el radio de giro curvas cada vez más cerradas',
  ytEn: 'inline skating tightening turn radius drill',
  needs: 'Espacio amplio, plano y conos o marcas.'
};

GUIDE['Slalom técnico'] = {
  what: 'Pasar entre conos separados, alternando curvas. Entrena la precisión y el control de los cantos.',
  steps: [
    'Coloca 6–8 conos en línea recta, separados unos 3 metros.',
    'Rueda despacio y pasa entre los conos trazando curvas en S.',
    'Inclina tobillos y rodillas hacia cada lado para cambiar de canto.',
    'Mantén los hombros alineados y la mirada al siguiente cono.',
    'Reduce la distancia entre conos solo si mantienes la postura.'
  ],
  mistake: 'Mirar los conos que tienes al lado en lugar del que viene: chocas antes. Mira al cono siguiente.',
  ok: 'Completas el circuito sin tocar ningún cono, con curvas fluidas.',
  yt: 'patinaje en línea slalom entre conos técnica principiantes',
  ytEn: 'inline skating slalom cones beginner',
  needs: '6–8 conos (o botellas/zapatillas) y espacio plano.'
};

GUIDE['Slalom controlado'] = {
  what: 'El mismo slalom, pero aumentando el ritmo poco a poco sin perder la trayectoria.',
  steps: [
    'Empieza con el slalom que ya dominas.',
    'Aumenta el ritmo ligeramente en cada pasada.',
    'Mantén las curvas fluidas y la trayectoria limpia.',
    'Si tocas un cono o pierdes la postura, baja el ritmo.'
  ],
  mistake: 'Acelerar antes de tener las curvas limpias. La velocidad se gana después de la precisión.',
  ok: 'Completas 3 pasadas seguidas sin tocar conos y aumentando un poco el ritmo.',
  yt: 'patinaje en línea slalom velocidad controlada entre conos',
  ytEn: 'inline skating slalom controlled speed',
  needs: 'Conos y espacio plano.'
};

GUIDE['Backward slalom ancho'] = {
  what: 'Slalom hacia atrás con conos muy separados. Solo cuando ya controlas el backward.',
  steps: [
    'Coloca conos separados unos 4–5 metros.',
    'Rueda hacia atrás muy despacio, mirando por encima del hombro.',
    'Curva suavemente entre los conos con giros amplios.',
    'Mantén la postura atlética y la velocidad mínima.'
  ],
  mistake: 'Ir demasiado rápido sin ver el camino. Si no puedes mirar y mantener la trayectoria, no lo hagas todavía.',
  ok: 'Pasas 4 conos hacia atrás sin tocarlos y sin perder el control.',
  yt: 'patinaje en línea slalom hacia atrás patinar en reversa entre conos',
  ytEn: 'inline skating backward slalom',
  needs: 'Conos, espacio amplio y plano, sin gente.'
};

GUIDE['Slalom + crossover'] = {
  what: 'Combinar slalom y crossover en bloques, alternando entre precisión y ritmo.',
  steps: [
    'Haz 5 minutos de slalom con conos.',
    'Pasa a 5 minutos de crossovers en círculo.',
    'Termina con 2 minutos fáciles para recuperar.',
    'Repite el bloque completo según la dosis.'
  ],
  mistake: 'Sacrificar la técnica para cumplir el tiempo. Si la técnica se degrada, reduce el ritmo.',
  ok: 'Completas los bloques manteniendo la técnica en todos.',
  yt: 'patinaje en línea combinar slalom y crossover entrenamiento',
  ytEn: 'inline skating slalom and crossover drill',
  needs: 'Conos y espacio amplio.'
};
GUIDE['Slalom + crossovers'] = GUIDE['Slalom + crossover'];

/* guide_part3.js — Backward, transiciones, hockey stop, terreno, rodajes, circuitos, intervalos y trabajo en seco. */

/* ---------- Backward y transiciones ---------- */
GUIDE['Backward basics'] = {
  what: 'Primeros pasos rodando hacia atrás, con pasos pequeños. Es el punto de partida de todo lo que va en reversa.',
  steps: [
    'Ponte junto a una pared o barandilla, con la postura atlética.',
    'Gira los pies en forma de V invertida (talones separados, puntas juntas).',
    'Da pasos pequeños hacia atrás, empujando con los bordes interiores.',
    'Mira por encima del hombro hacia donde vas; alterna el lado cada pocos metros.',
    'Ve soltando la pared cuando ganes confianza.'
  ],
  mistake: 'Ir mirando solo hacia delante mientras retrocedes. Gira la cabeza y el tronco para ver el camino.',
  ok: 'Retrocedes 5 metros con pasos pequeños, mirando por encima del hombro, sin apoyarte.',
  yt: 'patinaje en línea patinar hacia atrás primeros pasos principiantes',
  ytEn: 'inline skating skating backward beginner',
  needs: 'Superficie plana y una pared cercana.'
};

GUIDE['Backward swizzle'] = {
  what: 'El swizzle hacia atrás: abrir y cerrar los pies rodando en reversa. Es la forma más fácil de avanzar hacia atrás.',
  steps: [
    'Ponte con los pies juntos, rodillas flexionadas y la mirada por encima del hombro.',
    'Abre las puntas hacia fuera mientras los talones se mantienen cerca.',
    'Cuando estén separados, cierra los pies presionando con los bordes interiores.',
    'Repite abriendo y cerrando de forma suave y continua.',
    'No busques velocidad: prioriza el control.'
  ],
  mistake: 'Abrir demasiado los pies: pierdes el control y caes hacia atrás. Abre poco y con las rodillas flexionadas.',
  ok: 'Retrocedes 10 metros con swizzle continuo, sin agarrarte y sin acelerar.',
  yt: 'patinaje en línea swizzle hacia atrás patinar en reversa',
  ytEn: 'inline skating backward swizzle',
  needs: 'Espacio amplio y plano, sin gente.'
};

GUIDE['Backward glide'] = {
  what: 'Deslizarte hacia atrás sin empujar, con control visual y postura estable.',
  steps: [
    'Rueda hacia atrás con swizzle suave para coger un poco de impulso.',
    'Deja de empujar y deja que los patines rueden juntos.',
    'Mantén la postura atlética y mira por encima del hombro.',
    'Vuelve a empujar antes de perder el equilibrio.'
  ],
  mistake: 'Inclinar el cuerpo hacia atrás al soltar el impulso. El peso debe quedar centrado, sobre los dos pies.',
  ok: 'Te deslizas hacia atrás 3 segundos con los pies juntos, sin perder la postura.',
  yt: 'patinaje en línea deslizarse hacia atrás equilibrio en reversa',
  ytEn: 'inline skating backward glide',
  needs: 'Espacio amplio y plano, sin gente.'
};

GUIDE['Transitions preparación'] = {
  what: 'Aprender a pasar de ir hacia delante a ir hacia atrás (y al revés), primero sin velocidad. Un pie gira a la vez.',
  steps: [
    'Rueda despacio hacia delante con la postura atlética.',
    'Practica girar los pies 180 grados en el sitio, primero con un pie y luego con el otro, con ayuda de una pared.',
    'Identifica hacia qué lado giras con más facilidad.',
    'Repite hasta que el giro de pies sea automático antes de añadir movimiento.'
  ],
  mistake: 'Intentar la transición con velocidad antes de dominar el giro de pies parados. Aprende primero la orientación.',
  ok: 'Giras los pies 180 grados sin perder el equilibrio, en ambos sentidos.',
  yt: 'patinaje en línea transición de adelante hacia atrás como girar 180 grados',
  ytEn: 'inline skating forward to backward transition',
  needs: 'Espacio plano y una pared o barandilla cercana.'
};

GUIDE['Forward → backward'] = {
  what: 'Pasar de rodar hacia delante a rodar hacia atrás con un giro de 180 grados, a velocidad muy lenta.',
  steps: [
    'Rueda muy despacio hacia delante, con la postura atlética.',
    'Levanta un pie ligeramente y gíralo 90 grados hacia el interior.',
    'Gira el tronco y el otro pie al mismo tiempo hasta quedar mirando hacia atrás.',
    'Al terminar, ya ruedas hacia atrás: mira por encima del hombro.',
    'Empieza caminando o rodando muy lento.'
  ],
  mistake: 'Girar solo la parte superior del cuerpo y dejar los pies atrás. Todo el cuerpo gira junto, desde las caderas.',
  ok: 'Haces el giro completo 5 veces seguidas, sin perder el equilibrio, a velocidad baja.',
  yt: 'patinaje en línea cómo pasar de adelante hacia atrás transición principiantes',
  ytEn: 'inline skating forward to backward tutorial',
  needs: 'Espacio amplio, plano y liso.'
};

GUIDE['Backward → forward'] = {
  what: 'El giro contrario: pasar de ir hacia atrás a ir hacia delante.',
  steps: [
    'Rueda hacia atrás muy despacio, con la postura atlética.',
    'Mira por encima del hombro hacia donde vas.',
    'Gira los pies y las caderas 180 grados hacia el lado más cómodo.',
    'Al terminar, ya ruedas hacia delante: recupera la mirada al frente.',
    'Empieza a muy baja velocidad.'
  ],
  mistake: 'Girar la cabeza sin girar las caderas: la parte de arriba se va y los pies se quedan atrás.',
  ok: 'Haces el giro completo 5 veces seguidas con equilibrio, a velocidad baja.',
  yt: 'patinaje en línea cómo pasar de hacia atrás a hacia delante giro 180',
  ytEn: 'inline skating backward to forward transition',
  needs: 'Espacio amplio, plano y liso.'
};

GUIDE['Forward ↔ backward transition'] = {
  what: 'Cambiar de sentido (adelante y atrás) de forma fluida y repetida, en un espacio amplio.',
  steps: [
    'Empieza a velocidad mínima con la postura atlética.',
    'Haz la transición hacia atrás con el giro de 180 grados.',
    'Rueda unos metros hacia atrás y haz la transición de vuelta.',
    'Repite en ambos sentidos, sin prisa.',
    'Termina con un frenado seguro.'
  ],
  mistake: 'Aumentar la velocidad sin dominar el giro: las transiciones deben ser fluidas a ritmo lento primero.',
  ok: 'Encadenas 5 transiciones seguidas sin perder el equilibrio ni la trayectoria.',
  yt: 'patinaje en línea transiciones adelante atrás fluidas práctica',
  ytEn: 'inline skating forward backward transitions',
  needs: 'Espacio amplio, plano y sin gente.'
};

GUIDE['Forward → crossover → transition → backward'] = {
  what: 'Un circuito que encadena varias habilidades: rodaje, crossover, transición y backward, terminando con un frenado.',
  steps: [
    'Rueda hacia delante con zancada suave.',
    'Haz un par de crossovers en una curva amplia.',
    'Realiza la transición a hacia atrás.',
    'Rueda unos metros hacia atrás.',
    'Termina con un frenado seguro (talón o T-stop).'
  ],
  mistake: 'Encadenarlo todo demasiado rápido. Si una habilidad sale mal, vuelve a esa fase con calma.',
  ok: 'Completas el circuito 3 veces con cada habilidad limpia y el frenado final controlado.',
  yt: 'patinaje en línea circuito combinado crossover transición hacia atrás',
  ytEn: 'inline skating skills circuit forward crossover backward',
  needs: 'Espacio amplio y plano.'
};

/* ---------- Hockey stop (seguridad: solo si T-stop es fiable) ---------- */
GUIDE['Gesto hockey stop'] = {
  what: 'Ensayar el pivote de pies del hockey stop sin velocidad. Es un freno avanzado: ve despacio.',
  steps: [
    'Ponte en un lugar liso, quieto, y junto a una pared si lo necesitas.',
    'Con los pies paralelos, gira los dos patines a la vez 90 grados, como en un pivote.',
    'Los patines quedan de lado respecto a tu dirección; las rodillas flexionadas.',
    'Aprende la sensación de girar sin rodar antes de añadir velocidad.',
    'Practica hacia ambos lados.'
  ],
  mistake: 'Hacerlo con velocidad antes de dominar el gesto: los patines se traban y puedes caer hacia delante.',
  ok: 'Giras los dos patines 90 grados a la vez, a ambos lados, sin perder el equilibrio.',
  yt: 'hockey stop patinaje en línea cómo hacerlo paso a paso principiantes',
  ytEn: 'inline skating hockey stop tutorial',
  needs: 'Superficie lisa y una pared cercana. Solo con T-stop dominado.'
};

GUIDE['Hockey stop asistido'] = {
  what: 'Hockey stop a baja velocidad, con mucho espacio libre. Solo cuando el T-stop es fiable.',
  steps: [
    'Rueda muy despacio en línea recta, con los patines paralelos.',
    'Flexiona las rodillas y mira hacia delante.',
    'Gira los dos patines 90 grados a la vez y presiona los cantos.',
    'Reparte el peso entre los dos pies y mantén el tronco estable.',
    'Deja espacio libre delante por si necesitas deslizarte más.'
  ],
  mistake: 'Intentar detenerte con la parte superior del cuerpo girando. El giro sale de los pies y las caderas.',
  ok: 'Te detienes a baja velocidad 3 veces seguidas, hacia cada lado.',
  yt: 'hockey stop patinaje en línea práctica a baja velocidad',
  ytEn: 'inline skating hockey stop beginner',
  needs: 'Espacio amplio y libre. Solo con T-stop dominado.'
};

GUIDE['Hockey stop — progresión'] = {
  what: 'Ir aumentando la velocidad del hockey stop poco a poco, manteniendo el control.',
  steps: [
    'Empieza a la velocidad que ya dominas.',
    'Aumenta la velocidad un poco solo si el frenado sigue limpio.',
    'Gira los pies a la vez y presiona los cantos con las rodillas flexionadas.',
    'Mantén el tronco estable y la mirada al frente.',
    'Si notas que pierdes el control, vuelve a una velocidad menor.'
  ],
  mistake: 'Subir la velocidad demasiado rápido. Cada aumento debe ir seguido de varios frenados limpios.',
  ok: 'Te detienes 3 veces seguidas con hockey stop limpio a la nueva velocidad.',
  yt: 'hockey stop patinaje en línea progresión a más velocidad',
  ytEn: 'inline skating hockey stop progression',
  needs: 'Espacio amplio y libre. Solo con T-stop sólido.'
};

/* ---------- Terreno y entorno ---------- */
GUIDE['Texturas suaves'] = {
  what: 'Rodar sobre pequeñas variaciones de pavimento (asfalto rugoso, baldosas) a baja velocidad, con las rodillas flexionadas.',
  steps: [
    'Elige una zona con pequeñas variaciones de superficie, sin tráfico.',
    'Rueda despacio con la postura atlética, las rodillas bien flexionadas.',
    'Deja que las rodillas y los tobillos absorban las vibraciones.',
    'No te tenses ni levantes el cuerpo al cruzar la textura.'
  ],
  mistake: 'Ponerte rígido al sentir la vibración. Mantén las rodillas flexibles, como amortiguadores.',
  ok: 'Rueda 20 metros sobre textura suave sin bloquear las piernas.',
  yt: 'patinaje en línea patinar sobre pavimento irregular rugoso técnica',
  ytEn: 'inline skating rough pavement technique',
  needs: 'Una zona segura con superficie algo irregular.'
};

GUIDE['Juntas/bumps pequeños'] = {
  what: 'Pasar sobre juntas del pavimento o bultos pequeños absorbiendo el impacto con tobillos y rodillas, sin saltar.',
  steps: [
    'Localiza una junta o bulto pequeño y conocido.',
    'Acércate despacio, con la postura atlética y las rodillas flexionadas.',
    'Justo antes de cruzarlo, flexiona un poco más las rodillas.',
    'Deja que las ruedas rueden por encima y las piernas absorban el golpe.',
    'No saltes ni levantes el cuerpo.'
  ],
  mistake: 'Levantar el cuerpo o ponerte rígido al cruzar. Cuanto más flexionadas las rodillas, mejor absorbes.',
  ok: 'Cruzas una junta pequeña 5 veces seguidas sin perder el equilibrio.',
  yt: 'patinaje en línea cómo pasar baches y juntas del pavimento',
  ytEn: 'inline skating rolling over bumps cracks',
  needs: 'Una zona segura con irregularidades pequeñas y conocidas.'
};

GUIDE['Lectura de obstáculos'] = {
  what: 'Aprender a ver a tiempo lo que hay en el camino y decidir: reducir, esquivar o frenar. No incluye subir bordillos.',
  steps: [
    'Rueda despacio y mira 5–10 metros por delante.',
    'Cuando veas un obstáculo, evalúa su tamaño y tu distancia.',
    'Reduce la velocidad antes de acercarte.',
    'Decide: esquivar con una curva suave o frenar.',
    'Practica con obstáculos seguros como conos o líneas pintadas.'
  ],
  mistake: 'Mirar el obstáculo demasiado tarde, cuando ya estás encima. Mira siempre más lejos que las ruedas.',
  ok: 'Esquivas o te detienes ante 5 obstáculos sin cambios bruscos de trayectoria.',
  yt: 'patinaje en línea ver obstáculos y esquivar en la calle seguridad',
  ytEn: 'inline skating avoiding obstacles street skating',
  needs: 'Conos u objetos seguros y espacio amplio.'
};

GUIDE['Ruta segura'] = {
  what: 'Rodar por un recorrido que ya conoces, sin tráfico ni pendientes nuevas, para consolidar lo aprendido.',
  steps: [
    'Elige un recorrido plano, conocido y sin coches.',
    'Comprueba antes el estado del pavimento.',
    'Calienta 5 minutos y rueda a ritmo cómodo.',
    'Practica la zancada, los giros suaves y el frenado durante el recorrido.',
    'Lleva agua, móvil y avisa a alguien de tu ruta.'
  ],
  mistake: 'Cambiar de ruta sin conocerla. La ruta debe ser conocida para que puedas concentrarte en la técnica.',
  ok: 'Completas la ruta a ritmo cómodo con técnica estable.',
  yt: 'patinaje en línea rutas seguras para principiantes consejos',
  ytEn: 'inline skating safe route tips beginner',
  needs: 'Un recorrido plano y sin tráfico, agua y móvil.'
};

GUIDE['Speed control'] = {
  what: 'Aprender a regular la velocidad para que nunca vayas más rápido de lo que puedes frenar.',
  steps: [
    'Elige un tramo plano y libre.',
    'Rueda a velocidad cómoda y practica un frenado completo.',
    'Aumenta un poco la velocidad y repite el frenado.',
    'Deja de aumentar cuando el frenado deje de ser limpio.',
    'Esa es tu velocidad máxima segura de hoy.'
  ],
  mistake: 'Buscar más velocidad sin comprobar que puedes frenar. Frenar bien es lo que limita cuánto puedes ir.',
  ok: 'Te detienes de forma limpia desde la velocidad más alta que usas ese día.',
  yt: 'patinaje en línea controlar la velocidad frenar con seguridad',
  ytEn: 'inline skating controlling speed',
  needs: 'Espacio plano y libre, y un freno fiable.'
};

GUIDE['Skating Over Bumps and Tar Snakes'] = {
  what: 'Pasar por encima de pequeñas irregularidades del pavimento (como las juntas de alquitrán) de forma controlada.',
  steps: [
    'Localiza una irregularidad pequeña, conocida y segura.',
    'Acércate despacio con la postura atlética y las rodillas flexionadas.',
    'Cruza en línea recta, con los patines paralelos.',
    'Deja que las piernas absorban el golpe sin levantar el cuerpo.',
    'Repite varias veces hasta ganar seguridad.'
  ],
  mistake: 'Cruzar en diagonal o rígido: las ruedas se pueden atascar. Cruza de forma perpendicular y flexible.',
  ok: 'Cruzas irregularidades pequeñas 5 veces seguidas sin perder el equilibrio.',
  yt: 'patinaje en línea cómo pasar por grietas y juntas del pavimento',
  ytEn: 'inline skating over bumps and tar snakes',
  needs: 'Irregularidades pequeñas, conocidas y seguras.'
};

/* ---------- Rodajes y sesiones ---------- */
GUIDE['Rodaje muy fácil'] = {
  what: 'Rodar a un ritmo muy suave (RPE 2–3): puedes hablar con normalidad. Sirve para recuperar y afianzar la técnica.',
  steps: [
    'Rueda a un ritmo en el que puedas mantener una conversación.',
    'Concéntrate en la postura y en que los dos lados sean simétricos.',
    'No busques velocidad ni distancia.',
    'Relaja los hombros y respira con calma.'
  ],
  mistake: 'Ir más fuerte de lo debido “porque te sientes bien”. Este rodaje es de recuperación: si te cuesta hablar, baja el ritmo.',
  ok: 'Terminas sin fatiga y con la técnica limpia.',
  yt: 'patinaje en línea rodaje suave técnica y relajación',
  ytEn: 'inline skating easy skate relaxed technique',
  needs: 'Espacio plano y liso.'
};

GUIDE['Rodaje fácil'] = {
  what: 'Rodar cómodo, mayormente hacia delante, para acumular tiempo de patinaje sin esfuerzo.',
  steps: [
    'Rueda a un ritmo cómodo, con la zancada básica.',
    'Mantén la postura y la respiración estables.',
    'Puedes intercalar giros suaves y algún frenado de práctica.',
    'Termina sintiéndote con energía.'
  ],
  mistake: 'Convertir el rodaje fácil en entrenamiento duro. Mantén el esfuerzo bajo para acumular volumen sin fatiga.',
  ok: 'Completas el tiempo indicado sin fatiga marcada y con la técnica estable.',
  yt: 'patinaje en línea rodaje fácil cómo empezar a rodar',
  ytEn: 'inline skating easy skate for beginners',
  needs: 'Espacio plano y liso.'
};

GUIDE['Rodaje continuo'] = {
  what: 'Rodar sin parar a un ritmo estable (RPE 3–4), sin perseguir kilómetros. Construye resistencia.',
  steps: [
    'Rueda a un ritmo constante y cómodo.',
    'Mantén la zancada larga y relajada.',
    'Si tu técnica se degrada, baja el ritmo.',
    'Respira de forma regular y hidrátate si el rodaje es largo.'
  ],
  mistake: 'Empezar demasiado rápido y quedarte sin energía. Empieza más lento de lo que crees necesario.',
  ok: 'Mantienes el ritmo y la técnica durante todo el tiempo indicado.',
  yt: 'patinaje en línea rodaje continuo resistencia consejos',
  ytEn: 'inline skating endurance skate tips',
  needs: 'Espacio plano y liso. Agua si es largo.'
};

GUIDE['Rodaje'] = {
  what: 'Un rodaje a ritmo moderado (RPE 4–5) para consolidar la técnica y la resistencia.',
  steps: [
    'Rueda a un ritmo constante en el que aún puedas decir frases cortas.',
    'Cuida la postura y la simetría entre los dos lados.',
    'Si notas que la técnica empeora, baja el ritmo.',
    'Termina con unos minutos fáciles.'
  ],
  mistake: 'Ir por encima de RPE 5 en un rodaje base. Si no puedes decir frases cortas, estás yendo demasiado fuerte.',
  ok: 'Completas el tiempo con la técnica estable.',
  yt: 'patinaje en línea rodaje base ritmo moderado consejos',
  ytEn: 'inline skating steady skate',
  needs: 'Espacio plano y liso.'
};

GUIDE['Rodaje técnico'] = {
  what: 'Rodar a ritmo cómodo pero incluyendo pequeños bloques de práctica técnica.',
  steps: [
    'Rueda a ritmo cómodo con zancada básica.',
    'Cada 10 minutos, haz 2 minutos centrados en una técnica (giros, frenado o crossover).',
    'Vuelve a rodar cómodo después de cada bloque.',
    'Elige la técnica en la que sientas más necesidad de mejorar.'
  ],
  mistake: 'Practicar la técnica con el cuerpo fatigado: los bloques deben hacerse con calidad, no por cumplir.',
  ok: 'Haces los bloques técnicos con calidad y sin agotarte.',
  yt: 'patinaje en línea entrenamiento técnica mientras rodamos',
  ytEn: 'inline skating technique skate session',
  needs: 'Espacio plano y liso.'
};

GUIDE['Rodaje Z2 subjetivo'] = {
  what: 'Un rodaje a esfuerzo moderado (RPE 4–5) que se guía por sensaciones, no por aparatos. Podrías hablar con frases completas.',
  steps: [
    'Rueda a un ritmo en el que puedas hablar en frases.',
    'No mires el reloj ni el pulso para ajustar: guíate por cómo respiras.',
    'Si la sesión anterior te dejó fatiga importante, reduce el ritmo.',
    'Mantén la zancada larga y relajada.'
  ],
  mistake: 'Ir demasiado rápido. Si no puedes hablar en frases, baja el ritmo.',
  ok: 'Terminas el rodaje pudiendo hablar cómodamente durante todo el tiempo.',
  yt: 'entrenamiento zona 2 patinaje en línea rodaje base sensaciones',
  ytEn: 'inline skating zone 2 endurance training',
  needs: 'Espacio plano y liso.'
};

GUIDE['Rodaje progresivo'] = {
  what: 'Un rodaje que va de fácil a moderado y vuelve a fácil, para entrenar el cambio de ritmo con control.',
  steps: [
    'Empieza con 10 minutos fáciles.',
    'Sube a ritmo moderado durante 15 minutos.',
    'Haz 5 minutos de trabajo técnico.',
    'Termina con 10 minutos fáciles para recuperar.'
  ],
  mistake: 'Subir demasiado el ritmo en la parte moderada. Debe seguir siendo un esfuerzo sostenible.',
  ok: 'Completas todos los bloques con la técnica estable.',
  yt: 'patinaje en línea rodaje progresivo entrenamiento',
  ytEn: 'inline skating progressive skate',
  needs: 'Espacio plano y liso.'
};

GUIDE['Sesión integrada'] = {
  what: 'Una sesión que combina todo lo aprendido: zancada, giros, backward, transiciones y frenado.',
  steps: [
    'Calienta 5–10 minutos.',
    'Alterna bloques cortos de cada habilidad: zancada, giros, backward, transiciones.',
    'Termina cada bloque con un frenado seguro.',
    'No busques la velocidad máxima; prioriza la calidad.',
    'Cierra con rodaje fácil.'
  ],
  mistake: 'Buscar velocidad en vez de calidad. La sesión sirve para comprobar que todo funciona junto.',
  ok: 'Combinas todas las habilidades sin perder el control.',
  yt: 'patinaje en línea sesión completa combinando habilidades',
  ytEn: 'inline skating full skills session',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Sesión final técnica'] = {
  what: 'La sesión de cierre del programa: comprueba tu técnica repitiendo las pruebas de la semana 1.',
  steps: [
    'Calienta 10 minutos fáciles.',
    'Repite las pruebas técnicas: T-stop, slalom, one-foot glide y rodaje.',
    'Anota los resultados en la pestaña Habilidades.',
    'Termina con 10 minutos fáciles.',
    'No busques récords: busca comparar con la semana 1.'
  ],
  mistake: 'Forzar para batir marcas. Repite las condiciones de la semana 1 para que la comparación sea válida.',
  ok: 'Registras tus resultados y los comparas con la semana 1.',
  yt: 'patinaje en línea evaluar mi progreso pruebas técnicas',
  ytEn: 'inline skating skills assessment test',
  needs: 'El mismo lugar y calzado que en la semana 1.'
};

GUIDE['Stop-go'] = {
  what: 'Rodar 15–20 metros y frenar por completo, una y otra vez. Entrena el frenado y el arranque.',
  steps: [
    'Rueda 15–20 metros con zancada suave.',
    'Frena por completo con tu freno de confianza.',
    'Recupera caminando o rodando despacio hasta el punto de partida.',
    'Repite; cada repetición debe terminar en parada total.'
  ],
  mistake: 'Frenar tarde o de forma brusca. Empieza a frenar con margen y presiona de forma progresiva.',
  ok: 'Te detienes por completo en cada repetición, sin perder el equilibrio.',
  yt: 'patinaje en línea ejercicio de frenado y arranque parar y seguir',
  ytEn: 'inline skating stop and go drill',
  needs: 'Espacio plano de 20 metros y un freno fiable.'
};

/* ---------- Circuitos ---------- */
GUIDE['Circuito básico'] = {
  what: 'Un circuito sencillo que encadena zancada, giro en A, frenado y rodaje fácil.',
  steps: [
    'Haz una vuelta de zancada básica.',
    'Traza un giro en A a un lado y otro al otro.',
    'Aplica el frenado que estás practicando.',
    'Rueda fácil para recuperar.',
    'Descansa 2 minutos entre vueltas.'
  ],
  mistake: 'Encadenarlo sin descansar: la calidad baja al cansarte. Respeta los 2 minutos de descanso.',
  ok: 'Completas todas las vueltas con cada habilidad limpia.',
  yt: 'patinaje en línea circuito básico ejercicios para principiantes',
  ytEn: 'inline skating beginner skills circuit',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Circuito control'] = {
  what: 'Un circuito de control: slalom, carving, one-foot glide y T-stop.',
  steps: [
    'Haz una pasada de slalom entre conos.',
    'Continúa con curvas en S (carving).',
    'Practica un one-foot glide en cada lado.',
    'Termina con un T-stop.',
    'Recupera 2 minutos suaves entre vueltas.'
  ],
  mistake: 'Hacerlo sin calidad por ir rápido. El objetivo es el control, no el tiempo.',
  ok: 'Completas todas las vueltas con precisión en cada habilidad.',
  yt: 'patinaje en línea circuito de control slalom carving frenado',
  ytEn: 'inline skating control skills circuit',
  needs: 'Conos y espacio amplio.'
};

GUIDE['Bloques técnicos'] = {
  what: 'Bloques de 5 minutos, cada uno centrado en una técnica: zancada, carving y crossover.',
  steps: [
    '5 minutos de zancada con técnica cuidada.',
    '5 minutos de carving (curvas en S).',
    '5 minutos de crossover en círculo.',
    '5 minutos fáciles para recuperar.',
    'Repite el ciclo según la dosis.'
  ],
  mistake: 'Cambiar de bloque sin haber estabilizado la técnica. Dedica los 5 minutos completos a cada uno.',
  ok: 'Completas los bloques manteniendo la técnica en todos.',
  yt: 'patinaje en línea entrenamiento por bloques técnicos zancada curvas',
  ytEn: 'inline skating technique block training',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Circuito 1'] = {
  what: 'Un circuito de integración: zancada, carving, crossover y frenado.',
  steps: [
    'Rueda con zancada suave.',
    'Traza curvas en S (carving).',
    'Haz crossovers en una curva amplia.',
    'Termina con un frenado seguro.',
    'Repite el circuito con calma.'
  ],
  mistake: 'Encadenarlo con prisa. Mantén cada habilidad limpia antes de pasar a la siguiente.',
  ok: 'Completas el circuito 3 veces con técnica estable.',
  yt: 'patinaje en línea circuito de habilidades zancada crossover frenado',
  ytEn: 'inline skating skills circuit crossover stop',
  needs: 'Espacio amplio y plano.'
};

GUIDE['Circuito 2'] = {
  what: 'Un circuito avanzado: backward, transición, forward y T-stop.',
  steps: [
    'Rueda hacia atrás unos metros con swizzle.',
    'Haz la transición a hacia delante.',
    'Rueda hacia delante con zancada suave.',
    'Termina con un T-stop limpio.',
    'Repite con calma.'
  ],
  mistake: 'Ir demasiado rápido en el backward. Mantén la velocidad mínima hasta dominar la transición.',
  ok: 'Completas el circuito 3 veces con el T-stop final limpio.',
  yt: 'patinaje en línea circuito hacia atrás transición y frenado',
  ytEn: 'inline skating backward transition circuit',
  needs: 'Espacio amplio y plano, sin gente.'
};

/* ---------- Intervalos y aceleración (solo con frenado fiable) ---------- */
GUIDE['Aceleración submáxima'] = {
  what: 'Acelerar de forma progresiva hasta un esfuerzo moderado-alto (RPE 6), nunca a sprint. Solo con frenado fiable.',
  steps: [
    'Calienta bien antes de empezar.',
    'Rueda a ritmo cómodo y acelera poco a poco durante varios pasos.',
    'Llega hasta un esfuerzo moderado-alto (RPE 6), no más.',
    'Suelta y recupera 60–90 segundos rodando fácil.',
    'Comprueba antes que puedes frenar con margen.'
  ],
  mistake: 'Sprintar al máximo. Es una aceleración progresiva y controlada, no un esfuerzo total.',
  ok: 'Aceleras con control en cada repetición y recuperas completamente entre ellas.',
  yt: 'patinaje en línea acelerar con control técnica de aceleración',
  ytEn: 'inline skating acceleration technique',
  needs: 'Espacio amplio y plano, un freno fiable y calentamiento previo.'
};

GUIDE['6 × 3 min moderado / 2 min fácil'] = {
  what: 'Seis intervalos de 3 minutos a esfuerzo moderado (RPE 6), con 2 minutos fáciles entre cada uno.',
  steps: [
    'Calienta 10 minutos fáciles.',
    'Rueda 3 minutos a esfuerzo moderado (RPE 6), sin llegar a sprintar.',
    'Rueda 2 minutos fácil para recuperar.',
    'Repite hasta completar 6 bloques.',
    'Termina con rodaje fácil.'
  ],
  mistake: 'Ir demasiado fuerte en los primeros bloques. El ritmo debe poder mantenerse hasta el último.',
  ok: 'Completas los seis bloques con ritmo estable y técnica limpia.',
  yt: 'patinaje en línea entrenamiento de intervalos moderados resistencia',
  ytEn: 'inline skating interval training moderate',
  needs: 'Espacio amplio y plano, reloj y freno fiable.'
};

GUIDE['8 × 2 min moderado / 2 min fácil'] = {
  what: 'Ocho intervalos de 2 minutos a esfuerzo moderado (RPE 6), con 2 minutos fáciles entre cada uno.',
  steps: [
    'Calienta 10 minutos fáciles.',
    'Rueda 2 minutos a esfuerzo moderado (RPE 6).',
    'Rueda 2 minutos fácil para recuperar.',
    'Repite hasta completar 8 bloques.',
    'Termina con rodaje fácil.'
  ],
  mistake: 'Convertir los bloques moderados en esfuerzos máximos. Mantén RPE 6.',
  ok: 'Completas los ocho bloques con ritmo estable.',
  yt: 'patinaje en línea intervalos de dos minutos entrenamiento',
  ytEn: 'inline skating 2 minute intervals',
  needs: 'Espacio amplio y plano, reloj y freno fiable.'
};

GUIDE['6 × 8–10 s'] = {
  what: 'Seis aceleraciones cortas de 8–10 segundos, con 90 segundos fáciles entre cada una. Nunca a sprint total.',
  steps: [
    'Calienta bien antes de empezar.',
    'Acelera progresivamente durante 8–10 segundos.',
    'Suelta y rueda 90 segundos fácil para recuperar.',
    'Repite hasta completar 6 aceleraciones.',
    'Comprueba que puedes frenar con margen.'
  ],
  mistake: 'Sprintar al máximo o acortar la recuperación. La recuperación completa es parte del trabajo.',
  ok: 'Completas las seis aceleraciones con técnica estable y recuperación completa.',
  yt: 'patinaje en línea aceleraciones cortas entrenamiento de velocidad',
  ytEn: 'inline skating short accelerations',
  needs: 'Espacio amplio y plano, reloj y freno fiable.'
};

GUIDE['10 × 10 s'] = {
  what: 'Diez aceleraciones de 10 segundos a esfuerzo submáximo, con recuperación amplia entre cada una.',
  steps: [
    'Calienta bien antes de empezar.',
    'Acelera de forma progresiva durante 10 segundos.',
    'Recupera con rodaje muy fácil hasta sentirte listo.',
    'Repite hasta completar 10 aceleraciones.',
    'Detén la serie si la técnica se degrada.'
  ],
  mistake: 'Recortar la recuperación: acumulas fatiga y pierdes calidad. Recupera lo necesario.',
  ok: 'Completas las diez aceleraciones con la misma calidad de técnica.',
  yt: 'patinaje en línea series de aceleración 10 segundos entrenamiento',
  ytEn: 'inline skating 10 second acceleration',
  needs: 'Espacio amplio y plano, reloj y freno fiable.'
};

/* ---------- Trabajo en seco (sin patines) ---------- */
GUIDE['Equilibrio en seco'] = {
  what: 'Ejercicios de equilibrio sin patines que fortalecen tobillo y cadera, justo lo que sostiene tu postura al rodar.',
  steps: [
    'Ponte descalzo o con calzado plano, junto a una pared.',
    'Apoya el peso en un pie y levanta el otro unos centímetros.',
    'Mantén la posición 30 segundos, con la rodilla ligeramente flexionada.',
    'Repite con el otro pie; haz 3 series por lado.',
    'Para progresar, cierra los ojos o usa un cojín blando.'
  ],
  mistake: 'Bloquear la rodilla del pie de apoyo. Mantén una ligera flexión para que trabaje el tobillo.',
  ok: 'Mantienes 30 segundos por pie, 3 veces, sin apoyarte en la pared.',
  yt: 'ejercicios de equilibrio sobre un pie fortalecer tobillo',
  ytEn: 'single leg balance exercises ankle strength',
  needs: 'Una pared cercana y, si quieres progresar, un cojín.'
};

GUIDE['Fuerza en seco'] = {
  what: 'Un circuito corto de fuerza sin patines (piernas, glúteos y core). Protege las rodillas y mejora tu empuje.',
  steps: [
    'Sentadillas: 2 series de 12, con la espalda recta y las rodillas alineadas con los pies.',
    'Zancadas alternas: 2 series de 8 por lado, paso amplio y bajada controlada.',
    'Puente de glúteo: 2 series de 12, apretando glúteos arriba.',
    'Plancha: 2 series de 30 segundos, cuerpo alineado.',
    'Haz todo lento y con control; descansa 45–60 segundos entre series.'
  ],
  mistake: 'Hacer las sentadillas con las rodillas hacia dentro o rápido y sin control. Rodillas alineadas con los pies y movimiento lento.',
  ok: 'Completas todas las series con buena forma y sin dolor articular.',
  yt: 'rutina de fuerza en casa piernas glúteos y core para patinadores',
  ytEn: 'strength routine legs glutes core for skaters',
  needs: 'Espacio en el suelo; una colchoneta es opcional.'
};
