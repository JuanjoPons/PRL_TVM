import { EpiHazard, ArHazardTarget, EmergencyScenario, ProtocolPuzzle, AchievementBadge } from '../types/prl';

export const EPI_HAZARDS: EpiHazard[] = [
  {
    id: "epi-1",
    zone: {
      ca: "Zona 1: Cabina de Pintura i Polièster",
      es: "Zona 1: Cabina de Pintura y Poliéster"
    },
    title: {
      ca: "Mescla de Resina i Catalitzador MEKP",
      es: "Mezcla de Resina y Catalizador MEKP"
    },
    hazardDescription: {
      ca: "L'operari va a dosificar peròxid de metiletilcetona (MEKP) per a estratificar el casc d'un iot. El líquid és altament corrosiu i desprèn vapors agressius. Risc de cremades químiques oculars greus per esquitxada!",
      es: "El operario va a dosificar peróxido de metiletilcetona (MEKP) para estratificar el casco de un yate. El líquido es altamente corrosivo y desprende vapores agresivos. ¡Riesgo de quemaduras químicas oculares graves por salpicadura!"
    },
    consequence: {
      ca: "Salpicadura de MEKP a la còrnia sense protecció causa lesions oculars irreversibles en segons.",
      es: "Salpicadura de MEKP en la córnea sin protección causa lesiones oculares irreversibles en segundos."
    },
    timeLimitSeconds: 12,
    correctOptionId: "opt-goggles-gloves",
    regulatoryRef: "UNE-EN 166 (Ulleres panoràmiques hermètiques) + UNE-EN 374 (Guants resistència química)",
    options: [
      {
        id: "opt-cotton-mask",
        name: {
          ca: "Guants de cotó comuns i mascareta higiènica de tela",
          es: "Guantes de algodón comunes y mascarilla higiénica de tela"
        },
        category: "Inadequat",
        icon: "HandMetal",
        isCorrect: false,
        why: {
          ca: "El cotó absorbeix el catalitzador concentrat i crema la pell. No protegeix els ulls.",
          es: "El algodón absorbe el catalizador concentrado y quema la piel. No protege los ojos."
        }
      },
      {
        id: "opt-goggles-gloves",
        name: {
          ca: "Ulleres panoràmiques hermètiques (EN 166) + Guants de Nitril/Butil químics + Mascareta vapors ABEK",
          es: "Gafas panorámicas herméticas (EN 166) + Guantes de Nitrilo/Butilo químicos + Mascarilla vapores ABEK"
        },
        category: "EPI Certificat",
        icon: "ShieldAlert",
        isCorrect: true,
        why: {
          ca: "Protecció estanca completa contra esquitxades químiques de peròxids orgànics i vapors d'estirè.",
          es: "Protección estanca completa contra salpicaduras químicas de peróxidos orgánicos y vapores de estireno."
        }
      },
      {
        id: "opt-helmet-only",
        name: {
          ca: "Només casc de seguretat d'obra",
          es: "Solo casco de seguridad de obra"
        },
        category: "Inadequat",
        icon: "HardHat",
        isCorrect: false,
        why: {
          ca: "El casc no protegeix les mucoses oculars ni la respiració de vapors corrosius.",
          es: "El casco no protege las mucosas oculares ni la respiración de vapores corrosivos."
        }
      },
      {
        id: "opt-latex-gloves",
        name: {
          ca: "Guants fins de làtex d'un sol ús",
          es: "Guantes finos de látex de un solo uso"
        },
        category: "Inadequat",
        icon: "Shield",
        isCorrect: false,
        why: {
          ca: "El làtex es degrada i forada en pocs segons davant dissolvents i MEKP.",
          es: "El látex se degrada y agujerea en pocos segundos ante disolventes y MEKP."
        }
      }
    ]
  },
  {
    id: "epi-2",
    zone: {
      ca: "Zona 2: Esplanada del Varader (Travelift)",
      es: "Zona 2: Explanada del Varadero (Travelift)"
    },
    title: {
      ca: "Maniobra d'Itzat d'Embarcació de 18 Tones",
      es: "Maniobra de Izado de Embarcación de 18 Toneladas"
    },
    hazardDescription: {
      ca: "La grua pòrtic Travelift està aixecant un catamarà per situar-lo sobre cavallets. Risc de caiguda d'objectes des de coberta, moviment de cinxes i trànsit de maquinària pesant.",
      es: "La grúa pórtico Travelift está levantando un catamarán para situarlo sobre caballetes. Riesgo de caída de objetos desde cubierta, movimiento de cinchas y tránsito de maquinaria pesada."
    },
    consequence: {
      ca: "Atropellament per maquinària o impacte per trencament d'estris de càrrega.",
      es: "Atropello por maquinaria o impacto por rotura de útiles de carga."
    },
    timeLimitSeconds: 11,
    correctOptionId: "opt-travelift-pack",
    regulatoryRef: "UNE-EN 397 (Cascos seguretat) + UNE-EN ISO 20345 S3 + UNE-EN ISO 20471 (Alta visibilitat)",
    options: [
      {
        id: "opt-travelift-pack",
        name: {
          ca: "Casc amb barboqueig + Armilla d'Alta Visibilitat classe 2 + Calçat S3 puntera d'acer antilliscant",
          es: "Casco con barbuquejo + Chaleco de Alta Visibilidad clase 2 + Calzado S3 puntera de acero antideslizante"
        },
        category: "EPI Certificat",
        icon: "HardHat",
        isCorrect: true,
        why: {
          ca: "Garanteix visibilitat pel gruista, protecció d'impacte cranial i adherència a l'esplanada humida.",
          es: "Garantiza visibilidad para el gruista, protección de impacto craneal y adherencia en explanada húmeda."
        }
      },
      {
        id: "opt-sound-muffs",
        name: {
          ca: "Auriculars de música personals i gorra de sol",
          es: "Auriculares de música personales y gorra de sol"
        },
        category: "Inadequat",
        icon: "Headphones",
        isCorrect: false,
        why: {
          ca: "Impedeix escoltar les alarmes sonores de marxa enrere del Travelift i no protegeix el cap.",
          es: "Impide escuchar las alarmas sonoras de marcha atrás del Travelift y no protege la cabeza."
        }
      },
      {
        id: "opt-boots-only",
        name: {
          ca: "Només botes d'aigua de goma sense puntera",
          es: "Solo botas de agua de goma sin puntera"
        },
        category: "Inadequat",
        icon: "Footprints",
        isCorrect: false,
        why: {
          ca: "No ofereix resistència a aixafament mecànic ni visibilitat per a l'operador del travelift.",
          es: "No ofrece resistencia a aplastamiento mecánico ni visibilidad para el operador del travelift."
        }
      },
      {
        id: "opt-harness-climb",
        name: {
          ca: "Arnès de corda per a escalada de muntanya",
          es: "Arnés de cuerda para escalada de montaña"
        },
        category: "Inadequat",
        icon: "ShieldAlert",
        isCorrect: false,
        why: {
          ca: "A peu de terra sota càrrega suspesa l'important és no situar-se a sota, casc homologat i alta visibilitat.",
          es: "A pie de suelo bajo carga suspendida lo importante es no situarse debajo, casco homologado y alta visibilidad."
        }
      }
    ]
  },
  {
    id: "epi-3",
    zone: {
      ca: "Zona 3: Sentina i Cambra de Motors (Espai Confinat)",
      es: "Zona 3: Sentina y Sala de Motores (Espacio Confinado)"
    },
    title: {
      ca: "Inspecció i Treball en Sentina de Gasoil",
      es: "Inspección y Trabajo en Sentina de Gasóleo"
    },
    hazardDescription: {
      ca: "L'operari ha d'accedir a la sentina inferior per reparar una canonada. Atmosfera deficient en oxigen (<19,5%), acumulació de vapors orgànics d'hidrocarburs i ambient asfixiant.",
      es: "El operario debe acceder a la sentina inferior para reparar una tubería. Atmósfera deficiente en oxígeno (<19,5%), acumulación de vapores orgánicos de hidrocarburos y ambiente asfixiante."
    },
    consequence: {
      ca: "Pèrdua immediata de coneixement per anòxia i asfíxia per inhalació de vapors inflamables.",
      es: "Pérdida inmediata de conocimiento por anoxia y asfixia por inhalación de vapores inflamables."
    },
    timeLimitSeconds: 12,
    correctOptionId: "opt-confined-pack",
    regulatoryRef: "NTP 223 (Espacios confinados) + UNE-EN 137 (Equip de respiració autònom) + UNE-EN 361",
    options: [
      {
        id: "opt-simple-dust-mask",
        name: {
          ca: "Mascareta autofiltrant de pols FFP1",
          es: "Mascarilla autofiltrante de polvo FFP1"
        },
        category: "Inadequat",
        icon: "Shield",
        isCorrect: false,
        why: {
          ca: "Una mascareta de pols no aporta oxigen ni filtra gasos orgànics. Risc mortal per asfíxia.",
          es: "Una mascarilla de polvo no aporta oxígeno ni filtra gases orgánicos. Riesgo mortal por asfixia."
        }
      },
      {
        id: "opt-confined-pack",
        name: {
          ca: "Equip de respiració semiautònom/aportació d'aire + Arnès de rescat EN 361 + Llanterna ATEX + Detector 4 gasos",
          es: "Equipo de respiración semiautónomo/aporte de aire + Arnés de rescate EN 361 + Linterna ATEX + Detector 4 gases"
        },
        category: "EPI Certificat",
        icon: "LifeBuoy",
        isCorrect: true,
        why: {
          ca: "Garanteix respiració segura en atmosfera no respirable, prevenció d'espurnes ATEX i extracció d'emergència.",
          es: "Garantiza respiración segura en atmósfera no respirable, prevención de chispas ATEX y extracción de emergencia."
        }
      },
      {
        id: "opt-scarf",
        name: {
          ca: "Mocador humit a la boca i ulleres de natació",
          es: "Pañuelo húmedo en la boca y gafas de natación"
        },
        category: "Inadequat",
        icon: "HandMetal",
        isCorrect: false,
        why: {
          ca: "Mètode sense cap fonament tècnic que provoca asfíxia en menys de dos minuts.",
          es: "Método sin ningún fundamento técnico que provoca asfixia en menos de dos minutos."
        }
      },
      {
        id: "opt-snorkel",
        name: {
          ca: "Tub de snorkel nàutic curt",
          es: "Tubo de snorkel náutico corto"
        },
        category: "Inadequat",
        icon: "Anchor",
        isCorrect: false,
        why: {
          ca: "L'aire aspirat segueix sent el de la sentina tòxica saturada de gasos.",
          es: "El aire aspirado sigue siendo el de la sentina tóxica saturada de gases."
        }
      }
    ]
  },
  {
    id: "epi-4",
    zone: {
      ca: "Zona 4: Quadre Elèctric de Pantalà (230V / 400V)",
      es: "Zona 4: Cuadro Eléctrico de Pantalán (230V / 400V)"
    },
    title: {
      ca: "Connexió i Manteniment de Presa de Port en Moll",
      es: "Conexión y Mantenimiento de Toma de Puerto en Muelle"
    },
    hazardDescription: {
      ca: "Revisió de l'armari elèctric de pantalà humit amb esquitxades d'aigua de mar salina. Risc d'arc elèctric i electrocució d'alta intensitat per contacte directe.",
      es: "Revisión del armario eléctrico de pantalán húmedo con salpicaduras de agua de mar salina. Riesgo de arco eléctrico y electrocución de alta intensidad por contacto directo."
    },
    consequence: {
      ca: "Fibril·lació ventricular i cremades de tercer grau per pas de corrent elèctric.",
      es: "Fibrilación ventricular y quemaduras de tercer grado por paso de corriente eléctrica."
    },
    timeLimitSeconds: 11,
    correctOptionId: "opt-electric-pack",
    regulatoryRef: "UNE-EN 60903 (Guants aïllants Classe 00/0) + UNE-EN 166 (Pantalla facial contra arc elèctric)",
    options: [
      {
        id: "opt-electric-pack",
        name: {
          ca: "Guants dielèctrics aïllants classe 0 (fins a 1000V) + Pantalla facial antiarc elèctric + Botes dielèctriques",
          es: "Guantes dieléctricos aislantes clase 0 (hasta 1000V) + Pantalla facial antiarco eléctrico + Botas dieléctricas"
        },
        category: "EPI Certificat",
        icon: "Zap",
        isCorrect: true,
        why: {
          ca: "Impedeix la transmissió de corrent elèctric al cos humà i protegeix rostre i ulls de l'arc voltaic.",
          es: "Impide la transmisión de corriente eléctrica al cuerpo humano y protege rostro y ojos del arco voltaico."
        }
      },
      {
        id: "opt-gardening-gloves",
        name: {
          ca: "Guants de jardineria de cautxú fi mullat",
          es: "Guantes de jardinería de caucho fino mojado"
        },
        category: "Inadequat",
        icon: "ShieldAlert",
        isCorrect: false,
        why: {
          ca: "L'aigua i el material prim condueixen l'electricitat directament a les mans.",
          es: "El agua y el material fino conducen la electricidad directamente a las manos."
        }
      },
      {
        id: "opt-cotton-coat",
        name: {
          ca: "Bata de laboratori de cotó i ulleres de sol",
          es: "Bata de laboratorio de algodón y gafas de sol"
        },
        category: "Inadequat",
        icon: "Glasses",
        isCorrect: false,
        why: {
          ca: "No ofereix aïllament dielèctric ni resistència a l'energia d'arc elèctric.",
          es: "No ofrece aislamiento dieléctrico ni resistencia a la energía de arco eléctrico."
        }
      },
      {
        id: "opt-welding-gloves",
        name: {
          ca: "Manoples de soldador de cuir gruixut humitejat",
          es: "Manoplas de soldador de cuero grueso humedecido"
        },
        category: "Inadequat",
        icon: "Flame",
        isCorrect: false,
        why: {
          ca: "El cuir humit amb aigua salina perd qualsevol propietat aïllant elèctrica.",
          es: "El cuero húmedo con agua salina pierde cualquier propiedad aislante eléctrica."
        }
      }
    ]
  },
  {
    id: "epi-5",
    zone: {
      ca: "Zona 5: Pal i Coberta en Dique Seco (Treball en Altura)",
      es: "Zona 5: Mástil y Cubierta en Dique Seco (Trabajo en Altura)"
    },
    title: {
      ca: "Manteniment d'Eixarcia a 6 Metres sobre Cavallets",
      es: "Mantenimiento de Jarcia a 6 Metros sobre Caballetes"
    },
    hazardDescription: {
      ca: "El veler està falcat sobre cavallets al varader. El tècnic ha d'ajustar la cruceta del pal a més de 6 metres d'altura amb vents canviants. Risc de caiguda a diferent nivell sobre formigó!",
      es: "El velero está calzado sobre caballetes en el varadero. El técnico debe ajustar la cruceta del mástil a más de 6 metros de altura con vientos cambiantes. ¡Riesgo de caída a distinto nivel sobre hormigón!"
    },
    consequence: {
      ca: "Traumatismes greus o caiguda mortal sobre el terra de formigó del varader.",
      es: "Traumatismos graves o caída mortal sobre el suelo de hormigón del varadero."
    },
    timeLimitSeconds: 11,
    correctOptionId: "opt-height-pack",
    regulatoryRef: "UNE-EN 361 (Arnès anticaigudes) + UNE-EN 353 (Dispositiu anticaigudes lliscant) + UNE-EN 397",
    options: [
      {
        id: "opt-height-pack",
        name: {
          ca: "Arnès integral anticaigudes EN 361 + Doble cap d'ancoratge amb absorbent d'energia + Guindola nàutica revisada + Casc",
          es: "Arnés integral anticaídas EN 361 + Doble cabo de anclaje con absorbedor de energía + Guíndola náutica revisada + Casco"
        },
        category: "EPI Certificat",
        icon: "ShieldCheck",
        isCorrect: true,
        why: {
          ca: "Deté la caiguda reduint la força d'impacte per sota de 6 kN i assegura el tècnic en tot moment.",
          es: "Detiene la caída reduciendo la fuerza de impacto por debajo de 6 kN y asegura al técnico en todo momento."
        }
      },
      {
        id: "opt-belt-only",
        name: {
          ca: "Cinturó de cuir comú de subjecció lligat amb una corda nàutica vella",
          es: "Cinturón de cuero común de sujeción atado con un cabo náutico viejo"
        },
        category: "Inadequat",
        icon: "ShieldAlert",
        isCorrect: false,
        why: {
          ca: "Un cinturó no és anticaigudes; en cas de caiguda pot provocar fractura de columna o lliscament.",
          es: "Un cinturón no es anticaídas; en caso de caída puede provocar fractura de columna o deslizamiento."
        }
      },
      {
        id: "opt-slippers",
        name: {
          ca: "Espardenyes còmodes per tenir més agilitat al pal",
          es: "Zapatillas cómodas para tener más agilidad en el mástil"
        },
        category: "Inadequat",
        icon: "Footprints",
        isCorrect: false,
        why: {
          ca: "Manca de subjecció al turmell, adherència insuficient i risc de relliscada.",
          es: "Falta de sujeción al tobillo, agarre insuficiente y riesgo de resbalón."
        }
      },
      {
        id: "opt-climbing-net",
        name: {
          ca: "Pujar agafant-se a les drisses sense cap arnès",
          es: "Subir agarrándose a las drizas sin ningún arnés"
        },
        category: "Inadequat",
        icon: "AlertTriangle",
        isCorrect: false,
        why: {
          ca: "Pràctica temerària prohibida per tota la normativa de prevenció de riscos laborals.",
          es: "Práctica temeraria prohibida por toda la normativa de prevención de riesgos laborales."
        }
      }
    ]
  }
];

export const AR_HAZARDS: ArHazardTarget[] = [
  {
    id: "ar-1",
    name: {
      ca: "Ampolla de MEKP Oberta prop d'Eina Elèctrica",
      es: "Botella de MEKP Abierta junto a Herramienta Eléctrica"
    },
    category: "chemical",
    x: 28,
    y: 36,
    codeDigit: "7",
    description: {
      ca: "S'ha detectat un envàs de catalitzador de peròxid orgànic destapat al costat d'una esmoladora radial que produeix espurnes.",
      es: "Se ha detectado un envase de catalizador de peróxido orgánico destapado junto a una amoladora radial que produce chispas."
    },
    correctActionIndex: 0,
    actions: [
      {
        ca: "Segellar envàs en pañol químic ventilat i separar operacions d'espurna a més de 10 metres",
        es: "Sellar envase en pañol químico ventilado y separar operaciones de chispa a más de 10 metros"
      },
      {
        ca: "Abocar aigua directa sobre l'ampolla oberta",
        es: "Verter agua directa sobre la botella abierta"
      },
      {
        ca: "Ignorar si l'esmoladora té protector de plàstic",
        es: "Ignorar si la amoladora tiene protector de plástico"
      }
    ],
    justification: {
      ca: "Els peròxids orgànics són altament combustibles i reactius a la calor i espurnes d'eines mecàniques.",
      es: "Los peróxidos orgánicos son altamente combustibles y reactivos al calor y chispas de herramientas mecánicas."
    },
    scanned: false
  },
  {
    id: "ar-2",
    name: {
      ca: "Cable 230V Submergit en Bassal d'Aigua Salina al Moll",
      es: "Cable 230V Sumergido en Charco de Agua Salina en Muelle"
    },
    category: "electrical",
    x: 72,
    y: 68,
    codeDigit: "4",
    description: {
      ca: "Allargador elèctric de connexió a pantalà amb l'aïllament desgastat descansant en un toll d'aigua de mar a la zona de trànsit.",
      es: "Alargador eléctrico de conexión a pantalán con el aislamiento desgastado descansando en un charco de agua de mar en la zona de tránsito."
    },
    correctActionIndex: 1,
    actions: [
      {
        ca: "Enrotllar el cable amb les mans nues immediatament",
        es: "Enrollar el cable con las manos desnudas de inmediato"
      },
      {
        ca: "Desconnectar des de la torreta del pantalà, verificar tensió nul·la i retirar el cable danyat",
        es: "Desconectar desde la torreta del pantalán, verificar tensión nula y retirar el cable dañado"
      },
      {
        ca: "Posar un cartró per sobre del bassal per poder caminar",
        es: "Poner un cartón por encima del charco para poder pisar"
      }
    ],
    justification: {
      ca: "L'aigua de mar és un excel·lent conductor elèctric; el contacte pot transmetre descàrregues mortals a tot el moll.",
      es: "El agua de mar es un excelente conductor eléctrico; el contacto puede transmitir descargas mortales a todo el muelle."
    },
    scanned: false
  },
  {
    id: "ar-3",
    name: {
      ca: "Sentina Confinada sense Extracció ATEX ni Mesura d'O2",
      es: "Sentina Confinada sin Extracción ATEX ni Medición de O2"
    },
    category: "confined",
    x: 48,
    y: 52,
    codeDigit: "9",
    description: {
      ca: "Trampilla de la sentina oberta amb operari a l'interior sense detector de gasos, sense ventilació forçada i sense recurs preventiu a coberta.",
      es: "Trampilla de la sentina abierta con operario en el interior sin detector de gases, sin ventilación forzada y sin recurso preventivo en cubierta."
    },
    correctActionIndex: 2,
    actions: [
      {
        ca: "Esperar a veure si l'operari diu que es troba bé",
        es: "Esperar a ver si el operario dice que se encuentra bien"
      },
      {
        ca: "Tancar la trampilla per evitar la sortida d'olors",
        es: "Cerrar la trampilla para evitar la salida de olores"
      },
      {
        ca: "Evacuar l'espai, instal·lar ventilació forçada ATEX, mesurar atmosfera (O2 > 19,5%) i designar recurs preventiu exterior",
        es: "Evacuar el espacio, instalar ventilación forzada ATEX, medir atmósfera (O2 > 19,5%) y designar recurso preventivo exterior"
      }
    ],
    justification: {
      ca: "En espais confinats la falta d'oxigen no avisa i provoca la mort per anòxia sense capacitat de reacció.",
      es: "En espacios confinados la falta de oxígeno no avisa y provoca la muerte por anoxia sin capacidad de reacción."
    },
    scanned: false
  },
  {
    id: "ar-4",
    name: {
      ca: "Bastida a 4m sobre Dique Seco sense Rodapeu ni Barana",
      es: "Andamio a 4m sobre Dique Seco sin Rodapié ni Barandilla"
    },
    category: "fall",
    x: 82,
    y: 28,
    codeDigit: "2",
    description: {
      ca: "Plataforma de treball per al poliment del buc amb taulons solts sense barana de protecció de 90 cm ni rodapé reglamentari.",
      es: "Plataforma de trabajo para el pulido del casco con tablones sueltos sin barandilla de protección de 90 cm ni rodapié reglamentario."
    },
    correctActionIndex: 0,
    actions: [
      {
        ca: "Paralitzar el treball, muntar barana completa amb passamans, llistó intermedi i rodapé, i ancorar línia de vida",
        es: "Paralizar el trabajo, montar barandilla completa con pasamanos, listón intermedio y rodapié, y anclar línea de vida"
      },
      {
        ca: "Continuar treballant amb cura de no acostar-se a la vora",
        es: "Continuar trabajando con cuidado de no acercarse al borde"
      },
      {
        ca: "Lligar els taulons amb cinta d'embalar",
        es: "Atar los tablones con cinta de embalar"
      }
    ],
    justification: {
      ca: "Qualsevol treball a més de 2 metres d'alçària requereix proteccions col·lectives homologades (baranes) o individuals (línia de vida).",
      es: "Cualquier trabajo a más de 2 metros de altura requiere protecciones colectivas homologadas (barandillas) o individuales (línea de vida)."
    },
    scanned: false
  }
];

export const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: "emerg-1",
    code: "ALERTA-QUIM-01",
    title: {
      ca: "Vessament de Catalitzador MEKP a la Taula de Mescles",
      es: "Derrame de Catalizador MEKP en la Mesa de Mezclas"
    },
    location: {
      ca: "Pañol de Resines del Varader",
      es: "Pañol de Resinas del Varadero"
    },
    severity: "critical",
    timeSeconds: 20,
    description: {
      ca: "S'ha trencat un bidó de 5 litres de peròxid de metiletilcetona. El líquid corrosiu flueix cap a la canaleta de desguàs que desemboca a l'aigua del port!",
      es: "¡Se ha roto un bidón de 5 litros de peróxido de metiletilcetona. El líquido corrosivo fluye hacia la canaleta de desagüe que desemboca en el agua del puerto!"
    },
    correctActionIndex: 1,
    actions: [
      {
        label: {
          ca: "Aiguar amb mànega a pressió cap a la mar",
          es: "Manguerazo con agua a presión hacia el mar"
        },
        impact: {
          ca: "Contaminació marítima greu i vaporització tòxica",
          es: "Contaminación marítima grave y vaporización tóxica"
        }
      },
      {
        label: {
          ca: "Confinar amb barreres absorbents inerts (sepiolita), tallar fonts d'ignició i avisar brigada d'emergència",
          es: "Confinar con barreras absorbentes inertes (sepiolita), cortar fuentes de ignición y avisar brigada de emergencia"
        },
        impact: {
          ca: "Absorció controlada i neutralització del perill químic",
          es: "Absorción controlada y neutralización del peligro químico"
        }
      },
      {
        label: {
          ca: "Deixar assecar ventilant només amb finestres",
          es: "Dejar secar ventilando solo con ventanas"
        },
        impact: {
          ca: "Risc d'autoignició i explosió de vapors",
          es: "Riesgo de autoignición y explosión de vapores"
        }
      }
    ],
    justification: {
      ca: "Els peròxids orgànics no s'han d'abocar mai a la xarxa d'aigües. S'han de recollir amb absorbents inerts homologats sense materials combustibles.",
      es: "Los peróxidos orgánicos nunca deben verterse a la red de aguas. Deben recogerse con absorbentes inertes homologados sin materiales combustibles."
    }
  },
  {
    id: "emerg-2",
    code: "ALERTA-CONF-02",
    title: {
      ca: "Operari Desmaiat a la Sentina de Bribatge",
      es: "Operario Desmayado en la Sentina de Achique"
    },
    location: {
      ca: "Sala de Motors de Veler 45 peus",
      es: "Sala de Motores de Velero 45 pies"
    },
    severity: "extreme",
    timeSeconds: 18,
    description: {
      ca: "El recurs preventiu exterior observa que el company no respon des de l'interior de la sentina després d'aplicar pintura antivegetativa. L'atmosfera està saturada de dissolvents.",
      es: "El recurso preventivo exterior observa que el compañero no responde desde el interior de la sentina tras aplicar pintura antiincrustante. La atmósfera está saturada de disolventes."
    },
    correctActionIndex: 0,
    actions: [
      {
        label: {
          ca: "Activar alarma 112, connectar extractor ATEX d'aire net i extreure la víctima des de coberta mitjançant trípode i arnès de rescat",
          es: "Activar alarma 112, conectar extractor ATEX de aire limpio y extraer a la víctima desde cubierta mediante trípode y arnés de rescate"
        },
        impact: {
          ca: "Rescat segur sense provocar una segona víctima per asfíxia",
          es: "Rescate seguro sin provocar una segunda víctima por asfixia"
        }
      },
      {
        label: {
          ca: "Saltar a la sentina a buscar-lo ràpidament aguantant l'aire",
          es: "Saltar a la sentina a buscarlo rápidamente aguantando el aire"
        },
        impact: {
          ca: "Catàstrofe: el rescatador cau inconscient en menys de 30 segons",
          es: "Catástrofe: el rescatador cae inconsciente en menos de 30 segundos"
        }
      },
      {
        label: {
          ca: "Tirar una galleda d'aigua freda a la sentina",
          es: "Tirar un cubo de agua fría a la sentina"
        },
        impact: {
          ca: "Greu empitjorament de la situació",
          es: "Grave empeoramiento de la situación"
        }
      }
    ],
    justification: {
      ca: "El 60% dels morts en espais confinats són persones que intenten rescatar sense equip autònom. El rescat sempre s'efectua des de l'exterior.",
      es: "El 60% de los fallecidos en espacios confinados son personas que intentan rescatar sin equipo autónomo. El rescate siempre se efectúa desde el exterior."
    }
  },
  {
    id: "emerg-3",
    code: "ALERTA-ELEC-03",
    title: {
      ca: "Xispall i Fum al Quadre de Bateries de Liti a Bord",
      es: "Chisporroteo y Humo en el Banco de Baterías de Litio a Bordo"
    },
    location: {
      ca: "Banc de Potència Elèctrica de Catamarà",
      es: "Banco de Potencia Eléctrica de Catamarán"
    },
    severity: "critical",
    timeSeconds: 20,
    description: {
      ca: "Durant la càrrega des del pantalà, un pack de bateries LiFePO4 de 48V comença a emetre un xiulet intens, espurnes i fum blanc espès (embalament tèrmic).",
      es: "Durante la carga desde el pantalán, un pack de baterías LiFePO4 de 48V comienza a emitir un silbido intenso, chispas y humo blanco espeso (embalamiento térmico)."
    },
    correctActionIndex: 2,
    actions: [
      {
        label: {
          ca: "Abocar aigua directa amb un recipient metàl·lic",
          es: "Echar agua directa con un recipiente metálico"
        },
        impact: {
          ca: "Curtcircuit violent i descàrrega elèctrica",
          es: "Cortocircuito violento y descarga eléctrica"
        }
      },
      {
        label: {
          ca: "Cobrir les bateries amb una lona plàstica",
          es: "Cubrir las baterías con una lona plástica"
        },
        impact: {
          ca: "Incendi generalitzat de polietilè",
          es: "Incendio generalizado de polietileno"
        }
      },
      {
        label: {
          ca: "Accionar parada d'emergència del pantalà, seccionar bateries, evacuar espai i emprar extintor de diòxid de carboni (CO2) / agent específic",
          es: "Accionar parada de emergencia del pantalán, seccionar baterías, evacuar espacio y emplear extintor de dióxido de carbono (CO2) / agente específico"
        },
        impact: {
          ca: "Control de l'embalament tèrmic sense danys a persones",
          es: "Control del embalamiento térmico sin daños a personas"
        }
      }
    ],
    justification: {
      ca: "L'aïllament energètic immediat i l'ús d'agents no conductors eviten incendis devastadors a les estructures de fibra de vidre.",
      es: "El aislamiento energético inmediato y el uso de agentes no conductores evitan incendios devastadores en las estructuras de fibra de vidrio."
    }
  }
];

export const PROTOCOL_PUZZLES: ProtocolPuzzle[] = [
  {
    id: "proto-pas",
    title: {
      ca: "Protocol PAS en Accidents Nàutics al Varader",
      es: "Protocolo PAS en Accidentes Náuticos en el Varadero"
    },
    description: {
      ca: "Un operari ha caigut des de la coberta al terra del dique seco. Ordena els passos del protocol fonamental d'actuació de primers auxilis:",
      es: "Un operario ha caído desde la cubierta al suelo del dique seco. Ordena los pasos del protocolo fundamental de actuación de primeros auxilios:"
    },
    regulatoryBasis: {
      ca: "Protocol PAS d'Emergències Sanitàries i Prevenció de Riscos Laborals (NTP 272).",
      es: "Protocolo PAS de Emergencias Sanitarias y Prevención de Riesgos Laborales (NTP 272)."
    },
    steps: [
      {
        id: "pas-1",
        order: 1,
        text: {
          ca: "1. PROTEGIR: Assegurar la zona de l'accident, apartar maquinària en marxa i evitar nous riscos per als rescatadors.",
          es: "1. PROTEGER: Asegurar la zona del accidente, apartar maquinaria en marcha y evitar nuevos riesgos para los rescatadores."
        },
        hint: {
          ca: "Primer la seguretat de l'entorn",
          es: "Primero la seguridad del entorno"
        }
      },
      {
        id: "pas-2",
        order: 2,
        text: {
          ca: "2. AVISAR: Trucar immediatament al 112 i al servei d'emergències del port indicant punt exacte, estat i riscos.",
          es: "2. AVISAR: Llamar inmediatamente al 112 y al servicio de emergencias del puerto indicando punto exacto, estado y riesgos."
        },
        hint: {
          ca: "Activar els serveis mèdics d'urgència",
          es: "Activar los servicios médicos de urgencia"
        }
      },
      {
        id: "pas-3",
        order: 3,
        text: {
          ca: "3. SOCÓRRER: Avaluar consciència i respiració de la víctima, mantenir immòbil l'eix cap-coll-tronc i aplicar primers auxilis.",
          es: "3. SOCORRER: Evaluar consciencia y respiración de la víctima, mantener inmóvil el eje cabeza-cuello-tronco y aplicar primeros auxilios."
        },
        hint: {
          ca: "Atenció a la víctima sense agreujar lesions",
          es: "Atención a la víctima sin agravar lesiones"
        }
      }
    ]
  },
  {
    id: "proto-loto",
    title: {
      ca: "Protocol de Consignació Elèctrica LOTO a Bord (230V / 24V)",
      es: "Protocolo de Consignación Eléctrica LOTO a Bordo (230V / 24V)"
    },
    description: {
      ca: "Abans de reparar el carregador d'inversor i el quadre principal de la nau, ordena la seqüència exacta de bloqueig de seguretat (LOTO):",
      es: "Antes de reparar el cargador inversor y el cuadro principal de la nave, ordena la secuencia exacta de bloqueo de seguridad (LOTO):"
    },
    regulatoryBasis: {
      ca: "RD 614/2001 sobre protecció de la salut i seguretat dels treballadors davant el risc elèctric (5 Regles d'Or).",
      es: "RD 614/2001 sobre protección de la salud y seguridad de los trabajadores frente al riesgo eléctrico (5 Reglas de Oro)."
    },
    steps: [
      {
        id: "loto-1",
        order: 1,
        text: {
          ca: "1. DESCONNEXIÓ: Tallar la presa de port (230V) i obrir els disjuntors i seccionadors generals de bateries.",
          es: "1. DESCONEXIÓN: Cortar la toma de puerto (230V) y abrir los disyuntores y seccionadores generales de baterías."
        },
        hint: {
          ca: "Tall efectiu de totes les fonts de tensió",
          es: "Corte efectivo de todas las fuentes de tensión"
        }
      },
      {
        id: "loto-2",
        order: 2,
        text: {
          ca: "2. ENCLAVAMENT I ETIQUETATGE (LOTO): Col·locar cadenat físic amb clau única i etiqueta de 'Perill: No Accionar - Treballs en Curs'.",
          es: "2. ENCLAVAMIENTO Y ETIQUETADO (LOTO): Colocar candado físico con llave única y etiqueta de 'Peligro: No Accionar - Trabajos en Curso'."
        },
        hint: {
          ca: "Impedir qualsevol reconexió accidental",
          es: "Impedir cualquier reconexión accidental"
        }
      },
      {
        id: "loto-3",
        order: 3,
        text: {
          ca: "3. VERIFICACIÓ D'ABSÈNCIA DE TENSIÓ: Mesurar amb voltímetre calibrat entre totes les fases i terra abans d'iniciar el treball.",
          es: "3. VERIFICACIÓN DE AUSENCIA DE TENSIÓN: Medir con voltímetro calibrado entre todas las fases y tierra antes de iniciar el trabajo."
        },
        hint: {
          ca: "Comprovació instrumental fefaent",
          es: "Comprobación instrumental fehaciente"
        }
      }
    ]
  }
];

export const BADGES: AchievementBadge[] = [
  {
    id: "badge-epi-master",
    title: {
      ca: "Mestre dels EPIs",
      es: "Maestro de los EPIs"
    },
    description: {
      ca: "Has completat el recorregut d'EPIs sense cap fallada de temps.",
      es: "Has completado el recorrido de EPIs sin ningún fallo de tiempo."
    },
    icon: "ShieldCheck",
    unlocked: false
  },
  {
    id: "badge-ar-inspector",
    title: {
      ca: "Inspector de Realitat Augmentada",
      es: "Inspector de Realidad Aumentada"
    },
    description: {
      ca: "Has escanejat i neutralitzat tots els perills ocults del varader.",
      es: "Has escaneado y neutralizado todos los peligros ocultos del varadero."
    },
    icon: "Camera",
    unlocked: false
  },
  {
    id: "badge-emergency-commander",
    title: {
      ca: "Comandant d'Emergències",
      es: "Comandante de Emergencias"
    },
    description: {
      ca: "Has resolt totes les situacions crítiques al centre de control.",
      es: "Has resuelto todas las situaciones críticas en el centro de control."
    },
    icon: "Flame",
    unlocked: false
  },
  {
    id: "badge-loto-guardian",
    title: {
      ca: "Guardià LOTO & PAS",
      es: "Guardián LOTO & PAS"
    },
    description: {
      ca: "Seqüència perfecta en els protocols de seguretat elèctrica i sanitària.",
      es: "Secuencia perfecta en los protocolos de seguridad eléctrica y sanitaria."
    },
    icon: "Lock",
    unlocked: false
  },
  {
    id: "badge-arcade-pro",
    title: {
      ca: "Tècnic Nàutic d'Or",
      es: "Técnico Náutico de Oro"
    },
    description: {
      ca: "Has superat la cursa d'habilitats de coberta a l'arcade 2D.",
      es: "Has superado la carrera de habilidades de cubierta en el arcade 2D."
    },
    icon: "Trophy",
    unlocked: false
  }
];
