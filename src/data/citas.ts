import { FileParserNotFound } from "node_modules/astro/dist/core/errors/errors-data";

export type CitasDepartment = 'huila' | 'tolima';

export type CitasDepartmentOption = {
  id: CitasDepartment;
  label: string;
  href: string;
};

export const citasDepartmentOptions: CitasDepartmentOption[] = [
  { id: 'huila', label: 'Huila', href: '/citas-huila' },
  { id: 'tolima', label: 'Tolima', href: '/citas-tolima' },
];

export function getCitasHref(department: CitasDepartment): string {
  return department === 'huila' ? '/citas-huila' : '/citas-tolima';
}

export const citasRequestNotice = {
  title: 'Información importante sobre solicitud de citas',
  subtitle: 'EMCOSALUD – Líderes en Salud',
  paragraphs: [
    'Apreciado usuario, recuerde que por este medio se hacen solicitudes de citas, mas no es la asignación inmediata de una cita.',
    'Por lo tanto, tenga en cuenta las fechas. Horario de atención: de lunes a viernes, de 7:00 a.m. a 12:00 m y de 2:00 p.m. a 4:00 p.m. Su cita será atendida en orden de llegada. La respuesta se dará en días hábiles.',
    'Por favor, esté pendiente del correo electrónico que ha suministrado, ya que allí se enviará la información correspondiente a su cita. Revise también la carpeta de spam o correo no deseado. Se recomienda marcar nuestros mensajes como “seguros” o “permitidos” para no perder la información.',
  ],
};

export const citasDirectAccessServices: Record<CitasDepartment, string[]> = {
  huila: [
    'Medicina General',
    'Pediatría',
    'Ginecología',
    'Enfermería',
    'Nutricionista',
    'Medicina Familiar',
    'Medicina Interna',
    'Odontología',
    'Psicología',
    'Higiene Oral',
    'Imagenología',
  ],
  tolima: [
    'Medicina General',
    'Pediatría',
    'Ginecología',
    'Enfermería',
    'Medicina Familiar',
    'Medicina Interna',
    'Odontología',
    'Psicología',
    'Higiene Oral',
  ],
};

export const citasNursingServices = [
  'Planificación Familiar',
  'Control de Gestantes',
  'Toma de Citología – Toma de prueba ADN VPH',
  'Valoración Clínica de Senos',
  'Consejería en lactancia materna',
  'Consulta por curso de Vida (Control de Crecimiento y Desarrollo)',
  'Consulta Preconcepcional',
  'Riesgo Cardiovascular',
];

export const citasCytologyRecommendations = [
  'Evitar tener relaciones sexuales al menos 48 horas antes de la prueba.',
  'No usar duchas vaginales, cremas, óvulos ni medicamentos vaginales por al menos 48 horas.',
  'No estar menstruando.',
];

export const citasGrowthDevelopmentAges = [
  'Primera infancia: 0 a 5 años de edad',
  'Infancia: 6 a 11 años de edad',
  'Consulta del adolescente: 12 a 17 años',
];

export const citasReminders = [
  'No adjuntar historia clínica ni orden médica para los servicios de acceso directo.',
  'Realiza tu solicitud correctamente y en un solo envío.',
  'La atención se asigna en estricto orden de llegada.',
  'Verifica que la información esté completa antes de enviarla.',
];

export const citasFomagNote =
  'Si el servicio que necesitas es "OTRO" diferente a los servicios de acceso directo, debes adjuntar autorización del FOMAG y orden médica. Debes llegar una hora antes a la línea de frente de la sede donde vas a tomar el servicio para facturación, tal como lo exige el FOMAG.';

export const citasDocumentTypes = [
  'CC',
  'TI',
  'RC',
  'PASAPORTE',
  'DOCUMENTO DE EXTRANJERIA',
] as const;

export const citasJornadas = ['Mañana', 'Tarde'] as const;

export const citasSedes: Record<CitasDepartment, string[]> = {
  huila: [
    'NEIVA',
    'NEIVA IMAGENOLOGIA',
    'NEIVA TERAPIAS',
    'GUADALUPE',
    'CAMPOALEGRE',
    'SAN AGUSTIN',
    'GIGANTE',
    'LA PLATA',
    'GARZON',
    'PITALITO',
  ],
  tolima: [
    'IBAGUE',
    'ESPINAL',
    'CHAPARRAL',
    'LIBANO',
    'FRESNO',
    'MARIQUITA',
    'ORTEGA',
    'HONDA',
  ],
};

const serviciosHuila = [
  'MEDICINA GENERAL',
  'ODONTOLOGIA',
  'ENFERMERIA',
  'PSICOLOGIA',
  'NUTRICION',
  'GINECOLOGIA',
  'PEDIATRIA',
  'MEDICINA INTERNA',
  'MEDICINA FAMILIAR',
  'OTRO',
];

const serviciosTolima = [
  "MEDICINA GENERAL", 
  "ODONTOLOGÍA GENERAL", 
  "ENFERMERIA", 
  "PSICOLOGIA", 
  "NUTRICION", 
  "GINECOLOGIA", 
  "MEDICINA FAMILAR", 
  "MEDICINA INTERNA", 
  "PEDIATRIA", 
  
];

export const citasServices: Record<string, Record<string, string[]>>= 
{
  huila: {
    DEFAULT: serviciosHuila,
 //Solo si alguna sede tiene servicios adicionales
    NEIVA: [
      ...serviciosHuila,
    ],
    GUADALUPE: [
      'MEDICINA GENERAL',
      'ENFERMERIA',
      'PSICOLOGIA',
      'NUTRICION',
      'GINECOLOGIA',
      'PEDIATRIA',
      'MEDICINA INTERNA',
      'MEDICINA FAMILIAR',
      'OTRO',
    ],
    CAMPOALEGRE: [
      ...serviciosHuila,
    ],
    SAN_AGUSTIN: [
      ...serviciosHuila,
    ],
    GIGANTE: [
      ...serviciosHuila,
    ],
    LA_PLATA: [
      ...serviciosHuila,
    ],
    GARZON: [
      ...serviciosHuila,
    ],
    PITALITO: [
      ...serviciosHuila,
    ],
  },

  tolima: {
    DEFAULT: serviciosTolima,

    IBAGUE: [
      ...serviciosTolima,  
      "FISIOTERAPIA", 
      "TERAPIA RESPIRATORIA", 
      "RADIOLOGÍA SIMPLE", 
      "CIRUGÍA GENERAL", 
      "ORTOPEDIA Y TRAUMATOLOGIA", 
      "PSIQUIATRIA", 
      "REUMATOLOGÍA", 
      "FISIATRÍA", 
      "ENDODONCIA", 
      "CIRUGÍA ORAL", 
      "PERIODONCIA", 
      "ENDOCRINOLOGÍA", 
      "CARDIOLOGIA", 
      "CIRUGÍA DE MANO", 
      "OTRO"
    ],
    ESPINAL: [
      ...serviciosTolima,
      "CIRUGÍA GENERAL", 
      "TOMA DE LABORATORIO", 
      "ORTOPEDIA Y TRAUMATOLOGÍA", 
      "OTRO"
    ],
    CHAPARRAL: [
      ...serviciosTolima,
      "FISIOTERAPIA", 
      "CIRUGÍA GENERAL", 
      "TOMA DE LABORATORIO", 
      "ORTOPEDIA Y TRAUMATOLOGÍA", 
      "OTRO"
    ],

    LIBANO: [
      ...serviciosTolima,
      "FISIOTERAPIA", 
      "CIRUGÍA GENERAL", 
      "TOMA DE LABORATORIO", 
      "OTRO"
    ],
    FRESNO: [
      ...serviciosTolima,
      "TOMA DE LABORATORIO", 
      "OTRO"
    ],
    MARIQUITA: [
      ...serviciosTolima,
      "TOMA DE LABORATORIO", 
      "CIRUGÍA GENERAL", 
      "OTRO"
    ],
    ORTEGA: [
      ...serviciosTolima,
      "TOMA DE LABORATORIO", 
      "OTRO"
    ],
    HONDA: [
      ...serviciosTolima,
      "TOMA DE LABORATORIO", 
      "CIRUGÍA GENERAL", 
      "OTRO"
    ],
  },
};
/*
export const citasServices: Record<CitasDepartment, string[]> = {
  huila: [
    'MEDICINA GENERAL',
    'ODONTOLOGIA',
    'ENFERMERIA',
    'PSICOLOGIA',
    'NUTRICION',
    'GINECOLOGIA',
    'PEDIATRIA',
    'MEDICINA INTERNA',
    'MEDICINA FAMILIAR',
    'OTRO',
  ],
  tolima: [
    'MEDICINA GENERAL',
    'GINECOLOGIA',
    'ODONTOLOGIA GENERAL',
    'ENFERMERIA',
    'PSICOLOGIA',
    'NUTRICION',
    'FISIOTERAPIA',
    'TERAPIA RESPIRATORIA',
    'RADIOLOGIA SIMPLE',
    'CIRUGIA GENERAL',
    'MEDICINA FAMILIAR',
    'MEDICINA INTERNA',
    'ORTOPEDIA Y TRAUMATOLOGIA',
    'PEDIATRIA',
    'PSIQUIATRIA',
    'REUMATOLOGIA',
    'FISIATRIA',
    'ENDODONCIA',
    'CIRUGIA ORAL',
    'PERIODONCIA',
    'ENDOCRINOLOGIA',
    'CARDIOLOGIA',
    'CIRUGIA DE MANO',
    'OTRO',
  ],
};
*/
export const citasEnfermeriaDescriptions = [
  'PLANIFICACION FAMILIAR',
  'CONTROL DE GESTANTES',
  'TOMA DE CITOLOGIA',
  'TOMA DE PRUEBA ADN VPH',
  'VALORACION CLINICA DE SENOS',
  'CONSEJERIA EN LACTANCIA MATERNA',
  'CONSULTA POR CURSO DE VIDA',
  'CONSULTA PRECONCEPCIONAL',
  'RIESGO CARDIOVASCULAR',
];

export const citasConsultaporCursodeVida = [
  "CONTROL DE CRECIMIENTO Y DESARROLLO - PRIMERA INFANCIA", 
  "CONTROL DE CRECIMIENTO Y DESARROLLO - INFANCIA", 
  "CONSULTA DEL ADOLESCENTE"
];
export const citasGinecologia = [
  "CONSULTA DE GINECOLOGÍA", 
  "CONTROL DE GESTANTES",
]

export const citasPediatria = [
  "CONSULTA POR PEDIATRÍA", 
  "CONTROL DE CRECIMIENTO Y DESARROLLO - PRIMERA INFANCIA", 
  "CONTROL DE CRECIMIENTO Y DESARROLLO - INFANCIA", 
  "CONSULTA DEL ADOLESCENTE",
]


export const citasDepartmentMeta: Record<
  CitasDepartment,
  { title: string; pageTitle: string; description: string }
> = {
  huila: {
    title: 'Citas Huila',
    pageTitle: 'Citas Huila',
    description:
      'Solicitud de citas médicas en el departamento del Huila — EMCOSALUD. Horario de atención lunes a viernes.',
  },
  tolima: {
    title: 'Citas Tolima',
    pageTitle: 'Citas Tolima',
    description:
      'Solicitud de citas médicas en el departamento del Tolima — EMCOSALUD. Horario de atención lunes a viernes.',
  },
};

export const citasMedicos: Record<string, Record<string, string[]>>= 
{
  NEIVA: {
    MEDICINA_GENERAL: [
      'ANDRADE CARDOSO CESAR AUGUSTO',
      'DURAN LOZANO ISABEL CRISTINA', 
      'POLANIA PEÑA JOSE RICARDO', 
      'ROJAS ARTUNDUAGA OLGA MERCEDES', 
      'PEREZ PEREZ MARLYN ALICIA', 
      'BERMUDEZ DIAZ EDNA JIMENA', 
      'VERGARA GARCIA JHON ALEXANDER', 
      'APARICIO IBARRA LUIS IGNACIO', 
      'TORRES NINCO HECTOR ANDRES', 
      'MOTTA ARDILA NATALIA',
      'MOTTA ARDILA MIGUEL ANGEL',
    ],
    ODONTOLOGIA: [
      'RIVERA ROJAS GERARDO', 
      'AMAYA VARGAS ADRIANA',
    ],
    PEDIATRIA: [
      'CERQUERA JOHN FERNEY', 
      'VASQUEZ MENDEZ CARLOS ENRIQUE',
    ],
    GINECOLOGIA: [
      'CASALLAS FABIAN ALBERTO', 
      'SANMIGUEL TOVAR FRANCISCO JAVIER', 
      'GOMEZ RUBIANO GUSTAVO',
    ],
  },
  IBAGUE: {
    MEDICINA_GENERAL: [
      'DAVID MONTES', 
      'CARLOS ALBERTO CAMPOS', 
      'WILLIAM CARDOSO',
      'ANDRES STIVEN IZQUIERDO', 
      'MARY JULIETH MOLINA', 
      'ANDREA CATALINA NUÑEZ', 
      'SILVIA PATRICIA OJEDA CUELLAR',
      'ANGELA ROCIO OSPINA ROBAYO', 
      'RAFAEL PEÑA', 
      'CAROLINA PEREZ VIÑA', 
      'CARLOS FERNANDO RESTREPO', 
      'WILLIAM ALFREDO SANCHEZ',
      'MIGUEL TORRES', 
      'MARIA DEL PIELAR GOMEZ',
    ],
    GINECOLOGIA: [
      "HERMES FRANCISCO DIAZ", 
      "MANUEL DEL CRISTO IRIARTE", 
      "DUAYT DAVID GUTIERREZ",
    ],
    MEDICINA_INTERNA:[
      "MARCO ANDRES MORENO ALARCON", 
      "MARIA AMGELICA MONROY",
    ],
    MEDICINA_FAMILAR: [
      "GUILLERMO GONZALEZ HERNANDEZ", 
      "DENISA SANCHEZ FONSECA", 
      "ROSA ISABEL TORRES MARCHENA",
    ],
    PEDIATRIA: [
      "DIANA CAROLINA RODRIGUEZ", 
      "JUAN MANUEL JIMENEZ", 
      "GABRIEL ANDRES CAYCEDO"
    ],
    ORTOPEDIA_Y_TRAUMATOLOGIA: [
      "JORGE ERNESTO LOPEZ", 
      "GONZALO ALONZO NUNEZ"
    ],
    CARDIOLOGIA: [
      "JUAN DAVID PARRA", 
      "LUIGI POLIFRONY", 
      "HERNAN BOHORQUEZ", 
      "JHON VEGA"
    ],
    PSIQUIATRIA: [
      "PAULA SOFIA MORENO CASTRO",
      "CESAR AUGUSTO SANDOVAL"
    ],
  },
  LIBANO: {
    MEDICINA_GENERAL: [
      "CARLOS FIDEL SANTAMARIA", 
      "IRAMA GOMEZ LUBO"
    ],
  }
};
