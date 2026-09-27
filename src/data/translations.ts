import { Language } from '../types/prl';

export const t = {
  ca: {
    appTitle: "PRL Embarcacions Hub",
    appSubtitle: "Manteniment d'Embarcacions de Recreo • Varaderos i Tallers Nàutics",
    navHome: "Tauler Principal",
    points: "Punts",
    combo: "Ratxa",
    notRegistered: "Alumne No Registrat",
    registerTitle: "Identificació de l'Alumne / Alumna",
    registerDesc: "Introdueix les teves dades per avaluar les sessions pràctiques de PRL i enviar la qualificació a",
    namePlaceholder: "Nom i Cognoms (ex: Marc Soler)",
    groupPlaceholder: "Grup / Curs (ex: 1r MER - Matí)",
    saveBtn: "Desar Dades",
    editBtn: "Editar",
    dataSaved: "Dades de l'alumne desades correctament!",
    bannerTag: "Gamificació Nàutica Avançada",
    bannerTitle: "Seguretat i Prevenció en Manteniment Nàutic",
    bannerDesc: "Entrena't en situacions reals de risc en tallers de varader, dique seco i coberta d'embarcacions: riscos químics amb resines i estirè, espais confinats en sentines, maniobres de Travelift i consignació elèctrica LOTO.",
    
    // Stats
    statCompleted: "Reptes Completats",
    statAccuracy: "Precisió Global",
    statPoints: "Puntuació Total",
    statBadges: "Insígnies Obtingudes",
    
    // Game cards
    game1Title: "EPI Hazard Runner: Taller Nàutic",
    game1Tag: "ACCIÓ TEMPORITZADA",
    game1Desc: "Un operari camina pel taller nàutic i s'enfronta a perills imminents. Tria ràpidament l'equip de protecció individual certificat abans que s'esgoti el temps per evitar accidents greus!",
    game1Features: ["Comptador regressiu de tensió", "5 zones de risc real del varader", "Multiplicador de ratxa i penalització"],
    playGame1: "Iniciar Runner d'EPIs",

    game2Title: "Escàner AR: Inspecció de Riscos",
    game2Tag: "REALITAT AUGMENTADA",
    game2Desc: "Inspecciona la drassana mitjançant la teva càmera o visor interactiu. Detecta punts crítics amb el reticle de realitat augmentada, analitza la infracció i aconsegueix el codi de seguretat.",
    game2Features: ["Mode càmera real o simulació nàutica", "HUD hologràfic de detecció", "Desbloqueig de codi de zona segura"],
    playGame2: "Obrir Escàner AR",

    game3Title: "Simulador de Gestió d'Emergències",
    game3Tag: "SALA DE CONTROL",
    game3Desc: "Pren el comandament de la seguretat del varader. Gestiona vessaments químics de MEKP, alertes a sentines i descàrregues elèctriques mantenint els indicadors d'estabilitat en verd.",
    game3Features: ["Indicadors de risc en temps real", "Protocol d'intervenció ràpida", "Presa de decisions sota pressió"],
    playGame3: "Comandar Emergències",

    game4Title: "Puzle i Protocol LOTO / PAS",
    game4Tag: "CONSIGNACIÓ I ORDRE",
    game4Desc: "Ordena les accions pas a pas segons la normativa oficial de seguretat: Protocol PAS (Protegir, Avisar, Socórrer) i consignació elèctrica LOTO en instal·lacions de 230V.",
    game4Features: ["Arrossega i ordena les targetes", "Bloqueig de disjuntors i etiquetatge", "Validació normativa immediata"],
    playGame4: "Muntar Protocols",

    game5Title: "Arcade Varadero: Coberta Segura",
    game5Tag: "MINIJOC ARCADE 2D",
    game5Desc: "Controla al tècnic per la coberta i les bastides del veler. Esquiva chispas i desnivells, recull els EPIs flotants i assegura les línies de vida abans que s'esgoti el torn.",
    game5Features: ["Control interactiu de moviment", "Recollida de fitxes de seguretat", "Esquiva de perills en moviment"],
    playGame5: "Entrar a l'Arcade",

    // General game UI
    exitToDashboard: "Tornar al Menú",
    timeRemaining: "Temps Restant",
    lives: "Vides",
    correctPPE: "EPI Correcte!",
    wrongPPE: "EPI Incorrecte o Temps Esgotat!",
    nextHazard: "Següent Perill",
    finishGame: "Finalitzar i Veure Qualificació",

    // AR Scanner UI
    arLiveCamera: "Càmera en Viu",
    arSimMode: "Simulació de Taller",
    arScannerActive: "ESCÀNER AR NÀUTIC ACTIU",
    arTargetCount: "Perills Localitzats",
    arAimPrompt: "Apunta o fes clic sobre les alertes vermelles per escanejar el perill:",
    arScanBtn: "Analitzar Risc",
    arActionPrompt: "Quina mesura preventiva immediata cal aplicar?",
    arVerified: "Mesura Correcta! Dígit de Seguretat Desbloquejat:",
    arCameraDenied: "No s'ha pogut accedir a la càmera. Hem activat la simulació nàutica d'alta precisió.",

    // Results modal
    resGradeTitle: "Qualificació Oficial d'Avaluació",
    resFinalGrade: "NOTA FINAL",
    resSuccessTitle: "Sessió Pràctica Finalitzada amb Èxit!",
    resSendEmail: "Enviar Qualificació a jpons@centredelamar.com",
    resCopyReport: "Copiar Informe al Portapapers",
    resCopiedToast: "Informe copiat al portapapers! Pots enganxar-lo a qualsevol correu.",
    resEmailSentToast: "S'ha obert el gestor de correu amb l'informe complet preparat per a enviar!",
    resReviewHeader: "Desglossament i Justificació Tècnica de Seguretat",
    correctLabel: "Correcte",
    incorrectLabel: "Errada / Temps",
    pointsEarned: "Punts Obtinguts",
    accuracyLabel: "Precisió",
    studentLabel: "Alumne",
    groupLabel: "Grup",
    dateLabel: "Data i Hora",
    retryBtn: "Tornar a Jugar",

    soundOn: "So Actiu",
    soundMuted: "So Silenciat"
  },
  es: {
    appTitle: "PRL Embarcaciones Hub",
    appSubtitle: "Mantenimiento de Embarcaciones de Recreo • Varaderos y Talleres Náuticos",
    navHome: "Panel Principal",
    points: "Puntos",
    combo: "Racha",
    notRegistered: "Alumno No Registrado",
    registerTitle: "Identificación del Alumno / Alumna",
    registerDesc: "Introduce tus datos para evaluar las sesiones prácticas de PRL y enviar la calificación a",
    namePlaceholder: "Nombre y Apellidos (ej: Marc Soler)",
    groupPlaceholder: "Grupo / Curso (ej: 1º MER - Mañana)",
    saveBtn: "Guardar Datos",
    editBtn: "Editar",
    dataSaved: "¡Datos del alumno guardados correctamente!",
    bannerTag: "Gamificación Náutica Avanzada",
    bannerTitle: "Seguridad y Prevención en Mantenimiento Náutico",
    bannerDesc: "Entrénate en situaciones reales de riesgo en talleres de varadero, dique seco y cubierta de embarcaciones: riesgos químicos con resinas y estireno, espacios confinados en sentinas, maniobras de Travelift y consignación eléctrica LOTO.",
    
    // Stats
    statCompleted: "Retos Completados",
    statAccuracy: "Precisión Global",
    statPoints: "Puntuación Total",
    statBadges: "Insignias Obtenidas",
    
    // Game cards
    game1Title: "EPI Hazard Runner: Taller Náutico",
    game1Tag: "ACCIÓN TEMPORIZADA",
    game1Desc: "Un operario camina por el taller náutico y se enfrenta a peligros inminentes. ¡Elige rápidamente el equipo de protección individual certificado antes de que se agote el tiempo para evitar accidentes graves!",
    game1Features: ["Cuenta atrás de tensión", "5 zonas de riesgo real del varadero", "Multiplicador de racha y penalización"],
    playGame1: "Iniciar Runner de EPIs",

    game2Title: "Escáner AR: Inspección de Riesgos",
    game2Tag: "REALIDAD AUMENTADA",
    game2Desc: "Inspecciona el astillero mediante tu cámara o visor interactivo. Detecta puntos críticos con la retícula de realidad aumentada, analiza la infracción y consigue el código de seguridad.",
    game2Features: ["Modo cámara real o simulación náutica", "HUD holográfico de detección", "Desbloqueo de código de zona segura"],
    playGame2: "Abrir Escáner AR",

    game3Title: "Simulador de Gestión de Emergencias",
    game3Tag: "SALA DE CONTROL",
    game3Desc: "Toma el mando de la seguridad del varadero. Gestiona derrames químicos de MEKP, alertas en sentinas y descargas eléctricas manteniendo los indicadores de estabilidad en verde.",
    game3Features: ["Indicadores de riesgo en tiempo real", "Protocolo de intervención rápida", "Toma de decisiones bajo presión"],
    playGame3: "Comandar Emergencias",

    game4Title: "Puzle y Protocolo LOTO / PAS",
    game4Tag: "CONSIGNACIÓN Y ORDEN",
    game4Desc: "Ordena las acciones paso a paso según la normativa oficial de seguridad: Protocolo PAS (Proteger, Avisar, Socorrer) y consignación eléctrica LOTO en instalaciones de 230V.",
    game4Features: ["Arrastra y ordena las tarjetas", "Bloqueo de disyuntores y etiquetado", "Validación normativa inmediata"],
    playGame4: "Montar Protocolos",

    game5Title: "Arcade Varadero: Cubierta Segura",
    game5Tag: "MINIJUEGO ARCADE 2D",
    game5Desc: "Controla al técnico por la cubierta y los andamios del velero. Esquiva chispas y desniveles, recoge los EPIs flotantes y asegura las líneas de vida antes de que se agote el turno.",
    game5Features: ["Control interactivo de movimiento", "Recogida de fichas de seguridad", "Esquiva de peligros en movimiento"],
    playGame5: "Entrar al Arcade",

    // General game UI
    exitToDashboard: "Volver al Menú",
    timeRemaining: "Tiempo Restante",
    lives: "Vidas",
    correctPPE: "¡EPI Correcto!",
    wrongPPE: "¡EPI Incorrecto o Tiempo Agotado!",
    nextHazard: "Siguiente Peligro",
    finishGame: "Finalizar y Ver Calificación",

    // AR Scanner UI
    arLiveCamera: "Cámara en Vivo",
    arSimMode: "Simulación de Taller",
    arScannerActive: "ESCÁNER AR NÁUTICO ACTIVO",
    arTargetCount: "Peligros Localizados",
    arAimPrompt: "Apunta o haz clic sobre las alertas rojas para escanear el peligro:",
    arScanBtn: "Analizar Riesgo",
    arActionPrompt: "¿Qué medida preventiva inmediata debe aplicarse?",
    arVerified: "¡Medida Correcta! Dígito de Seguridad Desbloqueado:",
    arCameraDenied: "No se pudo acceder a la cámara. Hemos activado la simulación náutica de alta precisión.",

    // Results modal
    resGradeTitle: "Calificación Oficial de Evaluación",
    resFinalGrade: "NOTA FINAL",
    resSuccessTitle: "¡Sesión Práctica Finalizada con Éxito!",
    resSendEmail: "Enviar Calificación a jpons@centredelamar.com",
    resCopyReport: "Copiar Informe al Portapapeles",
    resCopiedToast: "¡Informe copiado al portapapeles! Puedes pegarlo en cualquier correo.",
    resEmailSentToast: "¡Se ha abierto el gestor de correo con el informe completo preparado para enviar!",
    resReviewHeader: "Desglose y Justificación Técnica de Seguridad",
    correctLabel: "Correcto",
    incorrectLabel: "Fallo / Tiempo",
    pointsEarned: "Puntos Obtenidos",
    accuracyLabel: "Precisión",
    studentLabel: "Alumno",
    groupLabel: "Grupo",
    dateLabel: "Fecha y Hora",
    retryBtn: "Volver a Jugar",

    soundOn: "Sonido Activo",
    soundMuted: "Sonido Silenciado"
  }
};
