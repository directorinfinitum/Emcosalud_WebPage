export type SedeDepartment = 'huila' | 'tolima';

export type SedesNavLink = {
  label: string;
  href?: string;
  children?: SedesNavLink[];
};

export type SedeContact = {
  label: string;
  value: string;
  href?: string;
};

export type SedeSchedule = {
  title: string;
  lines: string[];
};

/** Horarios por servicio o grupo de servicios (p. ej. sede Chaparral). */
export type SedeServiceSchedule = {
  service: string;
  lines: string[];
};

export type SedeImage = {
  src: string;
  alt: string;
};

export type SedeLocation = {
  name: string;
  address?: string;
  /** Una o más fotos de la sede (carrusel). */
  images?: SedeImage[];
  mapEmbedUrl?: string;
  /** Enlace para abrir la ubicación en Google Maps. */
  mapsHref?: string;
  whatsappHref?: string;
  appointmentHref?: string;
  contacts: SedeContact[];
  schedules?: SedeSchedule[];
  services?: string[];
};

export type SedeServiceGroup = {
  items: string[];
};

export type SedeProcedureContact = {
  paragraphs: string[];
  email?: SedeContact;
  phone?: SedeContact;
};

export type SedeProcedureSection = {
  title: string;
  items?: string[];
  paragraph?: string;
  alert?: string;
  contact?: SedeProcedureContact;
};

/** Procedimiento FOMAG / ferrocarriles (p. ej. sede Ibagué). */
export type SedeSupplyProcedure = {
  title: string;
  audience: string;
  appliesIntro: string;
  convenios: string[];
  purpose: string;
  sections: SedeProcedureSection[];
};

export type Sede = {
  slug: string;
  name: string;
  department: SedeDepartment;
  headline: string;
  /** Una o varias sedes físicas en el municipio (p. ej. Ibagué). */
  locations?: SedeLocation[];
  contacts?: SedeContact[];
  schedules?: SedeSchedule[];
  services?: string[];
  /** Listado en columnas (p. ej. sede Neiva). */
  serviceGroups?: SedeServiceGroup[];
  servicesHeading?: string;
  servicesIntro?: string;
  supplyProcedure?: SedeSupplyProcedure;
  serviceSchedules?: SedeServiceSchedule[];
};

const neivaServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Apoyo y diagnóstico y complementación terapéutica',
      'Fisioterapia',
      'Fonoaudiología y/o terapia del lenguaje',
      'Radiología',
      'Radiología odontológica',
      'Servicio farmacéutico',
      'Terapia ocupacional',
      'Toma de muestras de cuello uterino y ginecológicas',
      'Toma de muestras de laboratorio clínico',
      'Consulta externa',
      'Anestesia',
      'Cardiología',
      'Cardiología pediátrica',
      'Cirugía de cabeza y cuello',
      'Cirugía de mama y tumores tejidos blandos',
      'Cirugía de mano',
      'Cirugía de tórax',
      'Cirugía general',
      'Cirugía pediátrica',
    ],
  },
  {
    items: [
      'Cirugía plástica y estética',
      'Cirugía vascular',
      'Coloproctología',
      'Dermatología',
      'Dolor y cuidados paliativos',
      'Endocrinología',
      'Endodoncia',
      'Enfermería',
      'Ginecobstetricia',
      'Infectología',
      'Medicina del trabajo y medicina laboral',
      'Medicina familiar',
      'Medicina física y rehabilitación',
      'Medicina general',
      'Medicina interna',
      'Nefrología pediátrica',
      'Neumología',
      'Neurocirugía',
      'Neurología',
      'Neuropediatría',
      'Nutrición y dietética',
      'Odontología general',
      'Oftalmología',
      'Ortopedia y/o traumatología',
      'Otorrinolaringología',
      'Gastro pediatría',
    ],
  },
  {
    items: [
      'Pediatría',
      'Periodoncia',
      'Psicología',
      'Psiquiatría',
      'Reumatología',
      'Seguridad y salud en el trabajo',
      'Urología',
      'Vacunación',
    ],
  },
];

export const sedeDepartments: {
  id: SedeDepartment;
  label: string;
  description: string;
  banner: string;
}[] = [
  {
    id: 'huila',
    label: 'Huila',
    description:
      'Presencia en municipios del departamento con medicina general, especialidades, odontología y programas de promoción y prevención.',
    banner: '/images/banners/sedes-huila.png',
  },
  {
    id: 'tolima',
    label: 'Tolima',
    description:
      'Sedes propias en municipios del Tolima para consulta externa, odontología, laboratorio y dispensación de medicamentos.',
    banner: '/images/banners/sedes-tolima.png',
  },
];

const huilaMunicipalities = [
  'Neiva',
  'Campoalegre',
  'Garzón',
  'Gigante',
  'Guadalupe',
  'La Plata',
  'Pitalito',
  'San Agustín',
] as const;

const tolimaMunicipalities = [
  'Ibagué',
  'Espinal',
  'Chaparral',
  'Líbano',
  'Mariquita',
  'Ortega',
  'Honda',
  'Fresno',
] as const;

export function sedePath(slug: string): string {
  return `/sedes/${slug}`;
}

function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/** Listado base para tarjetas y rutas estáticas. */
export const sedeIndex = [
  ...huilaMunicipalities.map((name) => ({
    slug: slugify(name),
    name,
    department: 'huila' as const,
  })),
  ...tolimaMunicipalities.map((name) => ({
    slug: slugify(name),
    name,
    department: 'tolima' as const,
  })),
];

const defaultHuilaCitas: SedeContact = {
  label: 'Correo citas',
  value: 'citas.huila@emcosalud.com',
  href: 'mailto:citas.huila@emcosalud.com',
};

const defaultTolimaCitas: SedeContact = {
  label: 'Correo citas',
  value: 'citas.tolima@emcosalud.com',
  href: 'mailto:citas.tolima@emcosalud.com',
};

const standardAttention: SedeSchedule = {
  title: 'Horario de atención',
  lines: ['Lunes a viernes: 6:00 a.m. a 7:00 p.m.', 'Sábado: 7:00 a.m. a 12:00 m.'],
};

const standardCitas: SedeSchedule = {
  title: 'Horario de citas',
  lines: ['Lunes a viernes: 7:00 a.m. a 6:00 p.m.', 'Sábado: 8:00 a.m. a 12:00 m.'],
};

const basicServices = [
  'Medicina general',
  'Odontología',
  'Especialidades básicas y especializadas',
  'Servicio farmacéutico',
  'Programas de promoción y prevención',
  'Toma de muestras de laboratorio',
];

/** Galería sede Neiva — imágenes de emcosalud.com.co/neiva/ */
const neivaSedeImages: SedeImage[] = [
  { src: '/images/sedes/neiva/neiva-03-banner.png', alt: 'Sede exclusiva Neiva' },
  { src: '/images/sedes/neiva/neiva-01-edificio.jpg', alt: 'Fachada sede EMCOSALUD Neiva' },
  { src: '/images/sedes/neiva/neiva-02-instalaciones.jpeg', alt: 'Instalaciones y atención — sede Neiva' },
  { src: '/images/sedes/neiva/neiva-04-atencion.jpg', alt: 'Punto de atención sede Neiva' },
];

/** Galería sede Campoalegre — emcosalud.com.co/campoalegre/ */
const campoalegreSedeImages: SedeImage[] = [
  {
    src: '/images/sedes/campoalegre/campoalegre-01-portafolio.jpg',
    alt: 'Instalaciones sede EMCOSALUD Campoalegre',
  },
];

const campoalegreServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Medicina familiar',
      'Medicina interna',
      'Ginecología',
      'Enfermería',
      'Nutrición',
      'Psicología',
      'Pediatría',
      'Toma de muestras',
    ],
  },
];

/** Galería sede Garzón — emcosalud.com.co/garzon/ */
const garzonSedeImages: SedeImage[] = [
  {
    src: '/images/sedes/garzon/garzon-01-portafolio.jpg',
    alt: 'Instalaciones sede EMCOSALUD Garzón',
  },
];

const garzonServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Cirugía general',
      'Enfermería',
      'Fisioterapia',
      'Fonoaudiología y/o terapia del lenguaje',
      'Ginecobstetricia',
      'Medicina familiar',
    ],
  },
  {
    items: [
      'Medicina general',
      'Medicina interna',
      'Nutrición y dietética',
      'Odontología general',
      'Pediatría',
      'Psicología',
    ],
  },
  {
    items: [
      'Servicio farmacéutico',
      'Ortopedia y/o traumatología',
      'Toma de muestras de cuello uterino y ginecológicas',
      'Toma de muestras de laboratorio clínico',
    ],
  },
];

const giganteSedeImages: SedeImage[] = [
  { src: '/images/sedes/gigante/gigante-01-portafolio.jpg', alt: 'Instalaciones sede EMCOSALUD Gigante' },
];

const giganteServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Ginecología',
      'Pediatría',
      'Medicina familiar',
      'Medicina interna',
      'Nutrición',
      'Psicología',
      'PyP',
    ],
  },
];

const guadalupeSedeImages: SedeImage[] = [
  { src: '/images/sedes/guadalupe/guadalupe-01-portafolio.jpg', alt: 'Instalaciones sede EMCOSALUD Guadalupe' },
];

const guadalupeServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Enfermería',
      'Ginecobstetricia',
      'Medicina familiar',
      'Medicina general',
      'Medicina interna',
      'Nutrición y dietética',
      'Pediatría',
      'Psicología',
      'Servicio farmacéutico',
      'Toma de muestras de cuello uterino y ginecológicas',
    ],
  },
];

const laPlataSedeImages: SedeImage[] = [
  { src: '/images/sedes/la-plata/la-plata-01-sede.jpeg', alt: 'Instalaciones sede EMCOSALUD La Plata' },
];

const laPlataServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Enfermería',
      'Fisioterapia',
      'Ginecobstetricia',
      'Medicina familiar',
      'Medicina general',
    ],
  },
  {
    items: [
      'Medicina interna',
      'Nutrición y dietética',
      'Odontología general',
      'Pediatría',
      'Psicología',
    ],
  },
  {
    items: [
      'Servicio farmacéutico',
      'Terapia respiratoria',
      'Toma de muestras de cuello uterino y ginecológicas',
      'Toma de muestras de laboratorio clínico',
    ],
  },
];

const pitalitoSedeImages: SedeImage[] = [
  { src: '/images/sedes/pitalito/pitalito-01-fachada.png', alt: 'Fachada sede EMCOSALUD Pitalito' },
];

const pitalitoServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Consulta externa',
      'Odontología',
      'Farmacia',
      'Enfermería',
      'Medicina interna',
      'Ginecología',
    ],
  },
  {
    items: [
      'Pediatría',
      'Medicina familiar',
      'Psicología',
      'Nutrición',
      'Toma de muestras',
    ],
  },
];

const sanAgustinSedeImages: SedeImage[] = [
  { src: '/images/sedes/san-agustin/san-agustin-01-sede.jpeg', alt: 'Instalaciones sede EMCOSALUD San Agustín' },
];

const sanAgustinServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Medicina familiar',
      'Farmacia',
      'Enfermería',
      'Psicología',
      'Toma de muestras de laboratorio',
    ],
  },
];

const ibagueHipodromoImages: SedeImage[] = [
  { src: '/images/sedes/ibague/ibague-01-hipodromo.png', alt: 'Sede Hipódromo EMCOSALUD Ibagué' },
];
const ibagueInterlakenImages: SedeImage[] = [
  { src: '/images/sedes/ibague/ibague-02-interlaken.jpg', alt: 'Sede Interlaken EMCOSALUD Ibagué' },
];
const ibagueAsistencialImages: SedeImage[] = [
  { src: '/images/sedes/ibague/ibague-03-asistencial.jpg', alt: 'Sede asistencial EMCOSALUD Ibagué' },
];

const ibagueSupplyProcedure: SedeSupplyProcedure = {
  title:
    'Procedimiento para el acceso a servicios de suministro de medicamentos, dispositivos médicos e insumos',
  audience: 'Usuarios Convenios FOMAG (Magisterio) y Fondo Nacional de Ferrocarriles Nacionales',
  appliesIntro: 'El presente procedimiento aplica para los usuarios afiliados a los siguientes convenios:',
  convenios: [
    'Fondo Nacional de Prestaciones Sociales del Magisterio (FOMAG) – Población del Magisterio.',
    'Fondo Nacional de Ferrocarriles Nacionales de Colombia.',
  ],
  purpose:
    'Con el fin de garantizar un adecuado acceso a los servicios de suministro de medicamentos, dispositivos médicos e insumos prescritos por los profesionales de la red, tenga en cuenta la siguiente información:',
  sections: [
    {
      title: '1. Requisitos para la entrega',
      items: [
        'Presentar fórmula médica vigente expedida por los profesionales de la red autorizada.',
        'La fórmula podrá tener una fecha de expedición no mayor a 30 días; sin embargo, se aceptarán fórmulas con fecha mayor a 30 días cuando el médico tratante haya indicado explícitamente que la prescripción corresponde a tratamiento para 2 o 3 meses.',
        'Acercarse a uno de los puntos de dispensación autorizados relacionados en la página web.',
        'Asistir dentro de los horarios de atención establecidos.',
        'Presentar la fórmula médica original para la validación de derechos y la dispensación conforme a las indicaciones prescritas.',
      ],
    },
    {
      title: '2. Condiciones de dispensación',
      items: [
        'La dispensación de medicamentos se realizará de acuerdo con la Denominación Común Internacional (DCI).',
        'Cuando el médico tratante justifique el uso de un medicamento comercial, esta justificación deberá encontrarse registrada en el formato correspondiente.',
        'En ausencia de dicha justificación, el medicamento será dispensado en su forma genérica.',
      ],
    },
    {
      title: '3. Retiro de medicamentos por un tercero',
      items: [
        'Autorización escrita y firmada por el paciente.',
        'Copia del documento de identidad del paciente.',
        'Copia del documento de identidad de la persona autorizada.',
      ],
      alert:
        'Recuerde que está prohibida cualquier forma de asesoría clínica por parte del personal encargado de la dispensación.',
    },
    {
      title: '4. Envío de medicamentos a domicilio para las sedes de Ibagué',
      contact: {
        paragraphs: [
          'El usuario podrá solicitar el envío de los medicamentos a su domicilio mediante solicitud previa al correo electrónico institucional:',
          'La solicitud será tramitada en un tiempo no mayor a 48 horas hábiles, de acuerdo con las condiciones establecidas para cada convenio.',
          'Para mayor información, puede comunicarse a la línea telefónica indicada.',
        ],
        email: {
          label: 'Correo',
          value: 'domicilios.medicamentos.tolima@emcosalud.com',
          href: 'mailto:domicilios.medicamentos.tolima@emcosalud.com',
        },
        phone: {
          label: 'Teléfono',
          value: '(608) 277 1669',
          href: 'tel:+576082771669',
        },
      },
    },
    {
      title: '5. Medicamentos de radioquimioterapia y uso institucional',
      paragraph:
        'Los medicamentos relacionados con radioquimioterapia o aquellos que deban ser administrados en una IPS serán enviados directamente a la institución prestadora del servicio, con el fin de garantizar la trazabilidad del medicamento, el cumplimiento de la cadena de frío y la mitigación de riesgos asociados a su manejo.',
    },
  ],
};

const tolimaAttentionSchedule: SedeSchedule = {
  title: 'Horario de atención',
  lines: [
    'Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
    'Sábados: 8:00 a.m. a 12:00 m.',
  ],
};
const tolimaSamplesSchedule: SedeSchedule = {
  title: 'Horario de toma de muestras',
  lines: ['Lunes a viernes: 7:00 a.m. a 8:30 a.m.'],
};
const tolimaCitasSchedule: SedeSchedule = {
  title: 'Horario de asignación de citas',
  lines: ['Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.'],
};

const espinalSedeImages: SedeImage[] = [
  { src: '/images/sedes/espinal/espinal-01-sede.png', alt: 'Sede EMCOSALUD Espinal' },
];
const espinalServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Especialidades médicas',
      'Servicio farmacéutico',
      'Programas de PyP',
    ],
  },
];

const chaparralSedeImages: SedeImage[] = [
  { src: '/images/sedes/chaparral/chaparral-01-sede.png', alt: 'Sede EMCOSALUD Chaparral' },
];
const chaparralServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Enfermería PyP',
      'Pediatría',
      'Ginecología',
      'Ortopedia',
      'Cirugía general',
    ],
  },
  {
    items: [
      'Nutrición',
      'Higiene oral',
      'Medicina familiar',
      'Medicina interna',
      'Psicología',
      'Fisioterapia',
    ],
  },
  {
    items: [
      'Toma de citologías',
      'Toma de muestras de laboratorio',
      'Servicio farmacéutico',
    ],
  },
];

const chaparralServiceSchedules: SedeServiceSchedule[] = [
  {
    service: 'Fisioterapia',
    lines: [
      'Lunes a miércoles: 11:00 a.m. a 5:00 p.m.',
      'Jueves y viernes: 10:00 a.m. a 5:00 p.m.',
      'Sábados: 8:00 a.m. a 12:00 m.',
    ],
  },
  {
    service: 'Medicina general, odontología, farmacia, enfermería y laboratorio',
    lines: [
      'Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
      'Sábados: 8:00 a.m. a 12:00 m.',
    ],
  },
  {
    service: 'Medicina familiar',
    lines: ['Lunes: 7:00 a.m. a 12:00 m.'],
  },
  {
    service: 'Psicología',
    lines: [
      'Lunes: 7:00 a.m. a 12:00 m.',
      'Viernes: 1:00 p.m. a 5:00 p.m.',
    ],
  },
  {
    service: 'Ortopedia',
    lines: ['Miércoles: 2:00 p.m. a 4:00 p.m.'],
  },
  {
    service: 'Nutrición',
    lines: [
      'Martes: 1:00 p.m. a 5:00 p.m.',
      'Viernes: 7:00 a.m. a 12:00 m.',
    ],
  },
  {
    service: 'Cirugía general',
    lines: ['Cada 15 días, jueves: 10:00 a.m. a 1:00 p.m.'],
  },
  {
    service: 'Medicina interna',
    lines: ['Miércoles: 7:00 a.m. a 10:00 a.m.'],
  },
];

const libanoSedeImages: SedeImage[] = [
  { src: '/images/sedes/libano/libano-01-portafolio.jpg', alt: 'Sede EMCOSALUD Líbano' },
];
const libanoServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Ortopedia y traumatología',
      'Cirugía general',
      'Enfermería PyP',
      'Pediatría',
    ],
  },
  {
    items: [
      'Ginecología',
      'Nutrición',
      'Higiene oral',
      'Medicina familiar',
      'Medicina interna',
      'Psicología',
    ],
  },
  {
    items: ['Fisioterapia', 'Toma de citologías', 'Toma de muestras de laboratorio', 'Servicio farmacéutico'],
  },
];

const mariquitaSedeImages: SedeImage[] = [
  { src: '/images/sedes/mariquita/mariquita-01-portafolio.jpg', alt: 'Sede EMCOSALUD Mariquita' },
];
const mariquitaServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Enfermería PyP',
      'Pediatría',
      'Ginecología',
      'Nutrición',
    ],
  },
  {
    items: [
      'Higiene oral',
      'Medicina familiar',
      'Medicina interna',
      'Psicología',
      'Toma de citologías',
      'Toma de muestras de laboratorio',
      'Servicio farmacéutico',
    ],
  },
];

const ortegaSedeImages: SedeImage[] = [
  { src: '/images/sedes/ortega/ortega-01-portafolio.jpg', alt: 'Sede EMCOSALUD Ortega' },
];
const ortegaServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Enfermería PyP',
      'Pediatría',
      'Ginecología',
      'Nutrición',
    ],
  },
  {
    items: [
      'Higiene oral',
      'Medicina familiar',
      'Medicina interna',
      'Psicología',
      'Toma de citologías',
      'Toma de muestras de laboratorio',
      'Servicio farmacéutico',
    ],
  },
];

const hondaSedeImages: SedeImage[] = [
  { src: '/images/sedes/honda/honda-01-sede.jpeg', alt: 'Sede EMCOSALUD Honda' },
];
const hondaServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Enfermería PyP',
      'Pediatría',
      'Ginecología',
      'Cirugía general',
    ],
  },
  {
    items: [
      'Nutrición',
      'Higiene oral',
      'Medicina familiar',
      'Medicina interna',
      'Psicología',
      'Fisioterapia',
    ],
  },
  {
    items: ['Toma de citologías', 'Toma de muestras de laboratorio'],
  },
];

const fresnoSedeImages: SedeImage[] = [
  { src: '/images/sedes/fresno/fresno-01-portafolio.jpg', alt: 'Sede EMCOSALUD Fresno' },
];
const fresnoServiceGroups: SedeServiceGroup[] = [
  {
    items: [
      'Medicina general',
      'Odontología',
      'Enfermería PyM',
      'Pediatría',
      'Ginecología',
      'Nutrición',
    ],
  },
  {
    items: [
      'Higiene oral',
      'Medicina familiar',
      'Medicina interna',
      'Psicología',
      'Toma de citologías',
      'Toma de muestras de laboratorio',
      'Servicio farmacéutico',
    ],
  },
];

/** Contenido por municipio (alineado con emcosalud.com.co). */
export const sedesBySlug: Record<string, Sede> = {
  neiva: {
    slug: 'neiva',
    name: 'Neiva',
    department: 'huila',
    headline: 'Neiva sede',
    locations: [
      {
        name: 'NEIVA SEDE',
        address: 'Calle 8 # 10-45, Neiva, Huila',
        images: neivaSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=calle+8+%2310-45+neiva&t=m&z=15&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Calle+8+%2310-45+Neiva+Huila',
        whatsappHref: 'https://wa.me/573053353786',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Fijo', value: '(608) 863 2041', href: 'tel:+576088632041' },
          defaultHuilaCitas,
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 6:00 a.m. a 7:00 p.m.',
              'Sábado: 7:00 a.m. a 12:00 m.',
            ],
          },
          {
            title: 'Horario de citas',
            lines: [
              'Lunes a viernes: 7:00 a.m. a 6:00 p.m.',
              'Sábado: 8:00 a.m. a 12:00 m.',
            ],
          },
          {
            title: 'Horario de toma de muestras',
            lines: ['Lunes a viernes: 6:00 a.m. a 8:00 a.m.'],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, subespecialidades y programas de promoción y prevención.',
    serviceGroups: neivaServiceGroups,
  },
  campoalegre: {
    slug: 'campoalegre',
    name: 'Campoalegre',
    department: 'huila',
    headline: 'Campoalegre sede',
    locations: [
      {
        name: 'CAMPOALEGRE SEDE',
        address: 'Carrera 6 # 19-23, Campoalegre, Huila',
        images: campoalegreSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+6+%23+19-23+campoalegre&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+6+%2319-23+Campoalegre+Huila',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono',
            value: '(608) 838 1961 ext. 5812',
            href: 'tel:+576088381961',
          },
          { label: 'Celular', value: '302 438 1142', href: 'tel:+573024381142' },
          {
            label: 'Correo',
            value: 'emcosalud.farmacia.campoalegre@gmail.com',
            href: 'mailto:emcosalud.farmacia.campoalegre@gmail.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
              'Sábados: 8:00 a.m. a 12:00 m.',
            ],
          },
          {
            title: 'Horario de asignación de citas',
            lines: [
              'Lunes a viernes: 8:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
              'Sábados: 8:00 a.m. a 12:00 m.',
            ],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP. Medicina general: lunes a viernes 2:00 a 5:00 p.m.',
    serviceGroups: campoalegreServiceGroups,
  },
  garzon: {
    slug: 'garzon',
    name: 'Garzón',
    department: 'huila',
    headline: 'Garzón sede',
    locations: [
      {
        name: 'GARZÓN SEDE',
        address: 'Calle 9 # 5-95, Garzón, Huila',
        images: garzonSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=calle+9+%23+5+95+Garzon&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Calle+9+%235-95+Garzón+Huila',
        whatsappHref: 'https://wa.me/573158193551',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono',
            value: '320 350 9873 ext. 5831',
            href: 'tel:+573203509873',
          },
          {
            label: 'Correo',
            value: 'garzon@emcosalud.com',
            href: 'mailto:garzon@emcosalud.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 6:30 a.m. a 6:00 p.m.',
              'Sábados: 8:00 a.m. a 11:30 a.m.',
            ],
          },
          {
            title: 'Horario de asignación de citas',
            lines: ['Desde las 7:30 a.m.'],
          },
          {
            title: 'Horario de toma de muestras',
            lines: ['Lunes a viernes: 6:30 a.m. a 9:00 a.m.'],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: garzonServiceGroups,
  },
  gigante: {
    slug: 'gigante',
    name: 'Gigante',
    department: 'huila',
    headline: 'Gigante sede',
    locations: [
      {
        name: 'GIGANTE SEDE',
        address: 'Calle 2 # 6-69, Gigante, Huila',
        images: giganteSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=calle+2+%23+6+69+gigante&t=m&z=17&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Calle+2+%236-69+Gigante+Huila',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono',
            value: '320 350 9873 ext. 5833',
            href: 'tel:+573203509873',
          },
          {
            label: 'Correo citas',
            value: 'care.gigante@gmail.com',
            href: 'mailto:care.gigante@gmail.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 7:00 a.m. a 12:30 m. y 1:00 p.m. a 6:00 p.m.',
              'Sábados: 8:00 a.m. a 12:00 m.',
            ],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: giganteServiceGroups,
  },
  guadalupe: {
    slug: 'guadalupe',
    name: 'Guadalupe',
    department: 'huila',
    headline: 'Guadalupe sede',
    locations: [
      {
        name: 'GUADALUPE SEDE',
        address: 'Carrera 4 # 2-62, Guadalupe, Huila',
        images: guadalupeSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+4+%23+2-62+guadalupe&t=m&z=17&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+4+%232-62+Guadalupe+Huila',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono',
            value: '(608) 863 2041 ext. 5847',
            href: 'tel:+576088632041',
          },
          {
            label: 'Correo citas',
            value: 'guadalupe@emcosalud.com',
            href: 'mailto:guadalupe@emcosalud.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 6:00 a.m. a 6:00 p.m.',
              'Sábados: 8:00 a.m. a 11:30 a.m.',
            ],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: guadalupeServiceGroups,
  },
  'la-plata': {
    slug: 'la-plata',
    name: 'La Plata',
    department: 'huila',
    headline: 'La Plata sede',
    locations: [
      {
        name: 'LA PLATA SEDE',
        address: 'La Plata, Huila',
        images: laPlataSedeImages,
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!4v1768572173594!6m8!1m7!1siQjuwfEaZDUftvdnhDBoYA!2m2!1d2.388692321166709!2d-75.89326941106188!3f315.3053025081399!4f-6.767976537559264!5f0.7820865974627469',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=2.388692,-75.893269',
        whatsappHref: 'https://wa.me/573158193552',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono',
            value: '315 819 3552',
            href: 'tel:+573158193552',
          },
          {
            label: 'Correo',
            value: 'laplata@emcosalud.com',
            href: 'mailto:laplata@emcosalud.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 6:30 a.m. a 6:00 p.m.',
              'Sábados: 8:00 a.m. a 12:00 m.',
            ],
          },
          {
            title: 'Horario de asignación de citas',
            lines: ['Desde las 8:00 a.m.'],
          },
          {
            title: 'Horario de toma de muestras',
            lines: ['Lunes a viernes: 6:30 a.m. a 8:00 a.m.'],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: laPlataServiceGroups,
  },
  pitalito: {
    slug: 'pitalito',
    name: 'Pitalito',
    department: 'huila',
    headline: 'Pitalito sede',
    locations: [
      {
        name: 'PITALITO SEDE',
        address: 'Carrera 5 # 2-30, Pitalito, Huila',
        images: pitalitoSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+5+%23+2-30+pitalito&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+5+%232-30+Pitalito+Huila',
        whatsappHref: 'https://wa.me/573158703108',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono',
            value: '(608) 863 2041 ext. 5842',
            href: 'tel:+576088632041',
          },
          { label: 'Celular', value: '315 870 3108', href: 'tel:+573158703108' },
          {
            label: 'Correo citas',
            value: 'pitalito@emcosalud.com',
            href: 'mailto:pitalito@emcosalud.com',
          },
          {
            label: 'Coordinación',
            value: 'coordinacion.pitalito@emcosalud.com',
            href: 'mailto:coordinacion.pitalito@emcosalud.com',
          },
          {
            label: 'Atención al usuario',
            value: 'atus.pitalito@gmail.com',
            href: 'mailto:atus.pitalito@gmail.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 6:00 p.m.',
              'Sábados: 8:00 a.m. a 12:00 m.',
            ],
          },
        ],
      },
      {
        name: 'Terapias',
        whatsappHref: 'https://wa.me/573144662870',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Celular', value: '314 466 2870', href: 'tel:+573144662870' },
          {
            label: 'Teléfono',
            value: '(608) 863 2041 ext. 5841',
            href: 'tel:+576088632041',
          },
          {
            label: 'Correo citas',
            value: 'emcoterapiaspitalito@gmail.com',
            href: 'mailto:emcoterapiaspitalito@gmail.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
              'Sábados: 8:00 a.m. a 12:00 m.',
            ],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: pitalitoServiceGroups,
  },
  'san-agustin': {
    slug: 'san-agustin',
    name: 'San Agustín',
    department: 'huila',
    headline: 'San Agustín sede',
    locations: [
      {
        name: 'SAN AGUSTÍN SEDE',
        address: 'San Agustín, Huila',
        images: sanAgustinSedeImages,
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!4v1768574429413!6m8!1m7!1sviY2IPlJWkKnCcwxUYqfqQ!2m2!1d1.882389044376133!2d-76.27334712792593!3f337.9309746152079!4f-1.6325617897128666!5f0.7820865974627469',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=1.882389,-76.273347',
        whatsappHref: 'https://wa.me/573102799661',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono fijo',
            value: '(608) 863 2041 ext. 5843',
            href: 'tel:+576088632041',
          },
          { label: 'Celular', value: '310 279 9661', href: 'tel:+573102799661' },
          {
            label: 'Correo',
            value: 'emcosalud.farmacia.sanagustin@gmail.com',
            href: 'mailto:emcosalud.farmacia.sanagustin@gmail.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 6:00 a.m. a 12:00 m. y 2:00 p.m. a 6:00 p.m.',
              'Sábados: 8:00 a.m. a 10:00 a.m.',
            ],
          },
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: sanAgustinServiceGroups,
  },
  ibague: {
    slug: 'ibague',
    name: 'Ibagué',
    department: 'tolima',
    headline: 'Ibagué sedes',
    locations: [
      {
        name: 'HIPÓDROMO',
        address: 'Carrera 5 # 25-26, Ibagué, Tolima',
        images: ibagueHipodromoImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=Carrera+5+%23+25-26+ibague&t=m&z=15&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+5+%2325-26+Ibagué+Tolima',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Fijo', value: '(608) 277 1669', href: 'tel:+576082771669' },
          { label: 'Ext. 1', value: 'Citas generales básicas' },
          { label: 'Ext. 2', value: 'Citas especializadas' },
          { label: 'Ext. 3', value: 'Farmacia' },
          { label: 'Ext. 4', value: 'Atención al usuario' },
          { label: 'Ext. 5', value: 'Laboratorio' },
          defaultTolimaCitas,
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: ['Lunes a viernes: 6:00 a.m. a 7:00 p.m.'],
          },
          {
            title: 'Horario de asignación de citas',
            lines: ['Lunes a viernes: 7:00 a.m. a 5:00 p.m.'],
          },
        ],
        services: [
          'Consulta externa',
          'Medicina general',
          'Medicina especializada',
          'Odontología',
        ],
      },
      {
        name: 'INTERLAKEN',
        address: 'Carrera 8 No. 17-10, Ibagué, Tolima',
        images: ibagueInterlakenImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+8+NO.+17-10+ibague&t=m&z=15&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+8+No.+17-10+Ibagué+Tolima',
        appointmentHref: '/citas',
        contacts: [defaultTolimaCitas],
        schedules: [
          {
            title: 'Horario de atención',
            lines: ['Lunes a viernes: 6:00 a.m. a 7:00 p.m.'],
          },
          {
            title: 'Horario de asignación de citas',
            lines: ['Lunes a viernes: 7:00 a.m. a 5:00 p.m.'],
          },
        ],
        services: [
          'Medicina general',
          'Medicina especializada',
          'Consulta odontología',
          'Dispensación de medicamentos usuarios magisterio y ferrocarriles',
          'Oficinas administrativas',
        ],
      },
      {
        name: 'Sede asistencial (terapias y laboratorio)',
        address: 'Carrera 8 # 18-15, Ibagué, Tolima',
        images: ibagueAsistencialImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+8+%23+18-15+ibague&t=m&z=15&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+8+%2318-15+Ibagué+Tolima',
        appointmentHref: '/citas',
        contacts: [defaultTolimaCitas],
        schedules: [
          {
            title: 'Horario de atención',
            lines: ['Lunes a viernes: 6:00 a.m. a 7:00 p.m.'],
          },
          {
            title: 'Horario de toma de muestras',
            lines: ['Lunes a viernes: 6:00 a.m. a 8:30 a.m.'],
          },
          {
            title: 'Horario de asignación de citas',
            lines: ['Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.'],
          },
        ],
        services: ['Terapias', 'Laboratorio', 'Consulta externa'],
      },
      {
        name: 'Edificio Pijao 3 — Barrio El Carmen',
        address: 'Carrera 5 # 22-38, Ibagué, Tolima',
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+5+22-38+ibague&t=m&z=15&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+5+%2322-38+Ibagué+Tolima',
        contacts: [
          { label: 'Teléfono', value: '(608) 263 7009', href: 'tel:+576082637009' },
          {
            label: 'Correo',
            value: 'domicilios.medicamentos.tolima@emcosalud.com',
            href: 'mailto:domicilios.medicamentos.tolima@emcosalud.com',
          },
        ],
        services: ['Dispensación de medicamentos — usuarios Magisterio (FOMAG)'],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro: 'Varios puntos de atención en Ibagué, capital del Tolima.',
    supplyProcedure: ibagueSupplyProcedure,
  },
  espinal: {
    slug: 'espinal',
    name: 'Espinal',
    department: 'tolima',
    headline: 'Espinal sede',
    locations: [
      {
        name: 'ESPINAL SEDE',
        address: 'Carrera 5 # 11-58, Espinal, Tolima',
        images: espinalSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+5+11-58+espinal&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+5+%2311-58+Espinal+Tolima',
        whatsappHref: 'https://wa.me/573164728801',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Teléfono', value: '316 472 8801', href: 'tel:+573164728801' },
          {
            label: 'Correo citas',
            value: 'espinal@emcosalud.com',
            href: 'mailto:espinal@emcosalud.com',
          },
        ],
        schedules: [tolimaAttentionSchedule, tolimaSamplesSchedule, tolimaCitasSchedule],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: espinalServiceGroups,
  },
  chaparral: {
    slug: 'chaparral',
    name: 'Chaparral',
    department: 'tolima',
    headline: 'Chaparral sede',
    locations: [
      {
        name: 'CHAPARRAL SEDE',
        address: 'Calle 8 # 9-60, Chaparral, Tolima',
        images: chaparralSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=calle+8+%23+9+60+chaparral&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Calle+8+%239-60+Chaparral+Tolima',
        whatsappHref: 'https://wa.me/573164728802',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Teléfono', value: '316 472 8802', href: 'tel:+573164728802' },
          {
            label: 'Correo citas',
            value: 'chaparral@emcosalud.com',
            href: 'mailto:chaparral@emcosalud.com',
          },
        ],
        schedules: [tolimaAttentionSchedule, tolimaSamplesSchedule, tolimaCitasSchedule],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: chaparralServiceGroups,
    serviceSchedules: chaparralServiceSchedules,
  },
  libano: {
    slug: 'libano',
    name: 'Líbano',
    department: 'tolima',
    headline: 'Líbano sede',
    locations: [
      {
        name: 'LÍBANO SEDE',
        address: 'Carrera 9 # 3-18, Líbano, Tolima',
        images: libanoSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=carrera+9+%23+3+18+libano&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+9+%233-18+Líbano+Tolima',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Teléfono', value: '(608) 277 0544', href: 'tel:+576082770544' },
          {
            label: 'Correo citas',
            value: 'sede.libano@emcosalud.com',
            href: 'mailto:sede.libano@emcosalud.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
              'Sábados: 8:00 a.m. a 11:00 a.m.',
            ],
          },
          {
            title: 'Horario de toma de muestras',
            lines: ['Lunes a viernes: 6:00 a.m. a 8:30 a.m.'],
          },
          tolimaCitasSchedule,
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: libanoServiceGroups,
  },
  mariquita: {
    slug: 'mariquita',
    name: 'Mariquita',
    department: 'tolima',
    headline: 'Mariquita sede',
    locations: [
      {
        name: 'MARIQUITA SEDE',
        address: 'Carrera 2a # 6-60, Barrio Santa Lucía, Mariquita, Tolima',
        images: mariquitaSedeImages,
        mapEmbedUrl:
          'https://www.google.com/maps/embed?pb=!4v1768575501626!6m8!1m7!1sixCDy80NdcPAFCOX39Ljlw!2m2!1d5.197326063329605!2d-74.89785706713396!3f210.12465707824302!4f4.691055358375621!5f0.7820865974627469',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Carrera+2a+%236-60+Mariquita+Tolima',
        whatsappHref: 'https://wa.me/573164728805',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Teléfono', value: '316 472 8805', href: 'tel:+573164728805' },
          {
            label: 'Correo citas',
            value: 'mariquita@emcosalud.com',
            href: 'mailto:mariquita@emcosalud.com',
          },
        ],
        schedules: [tolimaAttentionSchedule, tolimaSamplesSchedule, tolimaCitasSchedule],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: mariquitaServiceGroups,
  },
  ortega: {
    slug: 'ortega',
    name: 'Ortega',
    department: 'tolima',
    headline: 'Ortega sede',
    locations: [
      {
        name: 'ORTEGA SEDE',
        address: 'Calle 6 # 3-71, Ortega, Tolima',
        images: ortegaSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=calle+6+%23+3+71+ortega&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Calle+6+%233-71+Ortega+Tolima',
        whatsappHref: 'https://wa.me/573176455702',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Teléfono', value: '317 645 5702', href: 'tel:+573176455702' },
          {
            label: 'Correo citas',
            value: 'sede.ortega@emcosalud.com',
            href: 'mailto:sede.ortega@emcosalud.com',
          },
        ],
        schedules: [
          {
            title: 'Horario de atención',
            lines: [
              'Lunes a viernes: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
              'Sábados: 7:00 a.m. a 11:00 a.m.',
            ],
          },
          tolimaSamplesSchedule,
          tolimaCitasSchedule,
        ],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: ortegaServiceGroups,
  },
  honda: {
    slug: 'honda',
    name: 'Honda',
    department: 'tolima',
    headline: 'Honda sede',
    locations: [
      {
        name: 'HONDA SEDE',
        address: 'Calle 7 # 22a-40, Honda, Tolima',
        images: hondaSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=calle+7+%23+22a+40+honda&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Calle+7+%2322a-40+Honda+Tolima',
        whatsappHref: 'https://wa.me/573224047313',
        appointmentHref: '/citas',
        contacts: [
          { label: 'Teléfono', value: '322 404 7313', href: 'tel:+573224047313' },
          { label: 'Teléfono', value: '322 894 3020', href: 'tel:+573228943020' },
          {
            label: 'Correo citas',
            value: 'sede.honda@emcosalud.com',
            href: 'mailto:sede.honda@emcosalud.com',
          },
        ],
        schedules: [tolimaAttentionSchedule, tolimaSamplesSchedule, tolimaCitasSchedule],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: hondaServiceGroups,
  },
  fresno: {
    slug: 'fresno',
    name: 'Fresno',
    department: 'tolima',
    headline: 'Fresno sede',
    locations: [
      {
        name: 'FRESNO SEDE',
        address: 'Calle 4 # 7-53, Fresno, Tolima',
        images: fresnoSedeImages,
        mapEmbedUrl:
          'https://maps.google.com/maps?q=Cl.+4+%23+7-53,+Fresno,+Tolima&t=m&z=16&output=embed&iwloc=near',
        mapsHref:
          'https://www.google.com/maps/search/?api=1&query=Calle+4+%237-53+Fresno+Tolima',
        appointmentHref: '/citas',
        contacts: [
          {
            label: 'Teléfono',
            value: '320 350 9873 opc. 1 ext. 5941',
            href: 'tel:+573203509873',
          },
          {
            label: 'Correo citas',
            value: 'sede.fresno@emcosalud.com',
            href: 'mailto:sede.fresno@emcosalud.com',
          },
        ],
        schedules: [tolimaAttentionSchedule, tolimaSamplesSchedule, tolimaCitasSchedule],
      },
    ],
    servicesHeading: 'Somos tu IPS de confianza',
    servicesIntro:
      'Medicina de primer nivel, odontología, especialidades básicas, especialidades, servicio farmacéutico y programas de PyP.',
    serviceGroups: fresnoServiceGroups,
  },
};

export function getSede(slug: string): Sede | undefined {
  return sedesBySlug[slug];
}

export function sedesForDepartment(department: SedeDepartment): typeof sedeIndex {
  return sedeIndex.filter((s) => s.department === department);
}

/** Menú Sedes → Huila / Tolima → municipios (como emcosalud.com.co). */
export function buildSedesNavChildren(): SedesNavLink[] {
  return sedeDepartments.map((dept) => ({
    label: dept.label,
    children: sedesForDepartment(dept.id).map((m) => ({
      label: m.name,
      href: sedePath(m.slug),
    })),
  }));
}

export const sedesPageIntro =
  'Encuentra nuestros puntos de atención en el Huila y el Tolima. Selecciona tu municipio para ver horarios, contacto y servicios disponibles.';
