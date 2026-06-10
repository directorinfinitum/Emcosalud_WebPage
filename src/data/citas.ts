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
