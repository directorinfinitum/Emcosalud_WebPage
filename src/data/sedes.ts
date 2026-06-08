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
        name: 'Hipódromo',
        contacts: [
          { label: 'Teléfono fijo', value: '(608) 277 1669', href: 'tel:+576082771669' },
          { label: 'Ext. 1', value: 'Citas generales básicas' },
          { label: 'Ext. 2', value: 'Citas especializadas' },
          { label: 'Ext. 3', value: 'Farmacia' },
          { label: 'Ext. 4', value: 'Atención al usuario' },
          { label: 'Ext. 5', value: 'Laboratorio' },
          defaultTolimaCitas,
        ],
        schedules: [
          {
            title: 'Horarios',
            lines: [
              'Atención sede: 6:00 a.m. a 7:00 p.m.',
              'Asignación de citas: 7:00 a.m. a 5:00 p.m.',
            ],
          },
        ],
        services: [
          'Consulta externa',
          'Medicina general y especializada',
          'Odontología',
        ],
      },
      {
        name: 'Interlaken',
        schedules: [
          {
            title: 'Horarios',
            lines: [
              'Atención sede: 6:00 a.m. a 7:00 p.m.',
              'Asignación de citas: 7:00 a.m. a 5:00 p.m.',
            ],
          },
        ],
        contacts: [defaultTolimaCitas],
        services: [
          'Medicina general y especializada',
          'Odontología',
          'Dispensación FOMAG y Ferrocarriles',
          'Oficinas administrativas',
        ],
      },
      {
        name: 'Sede asistencial (terapias y laboratorio)',
        schedules: [
          {
            title: 'Horarios',
            lines: [
              'Atención: 6:00 a.m. a 7:00 p.m.',
              'Toma de muestras: 6:00 a.m. a 8:30 a.m.',
              'Citas: 7:00 a.m. a 12:00 m. y 2:00 p.m. a 5:00 p.m.',
            ],
          },
        ],
        contacts: [defaultTolimaCitas],
        services: ['Terapias', 'Laboratorio', 'Consulta externa'],
      },
      {
        name: 'Edificio Pijao 3 — Barrio El Carmen',
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
    servicesIntro: 'Somos tu IPS de confianza en el Tolima con varios puntos de atención en Ibagué.',
  },
  espinal: {
    slug: 'espinal',
    name: 'Espinal',
    department: 'tolima',
    headline: 'Espinal',
    contacts: [defaultTolimaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  chaparral: {
    slug: 'chaparral',
    name: 'Chaparral',
    department: 'tolima',
    headline: 'Chaparral',
    contacts: [defaultTolimaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  libano: {
    slug: 'libano',
    name: 'Líbano',
    department: 'tolima',
    headline: 'Líbano',
    contacts: [defaultTolimaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  mariquita: {
    slug: 'mariquita',
    name: 'Mariquita',
    department: 'tolima',
    headline: 'Mariquita',
    contacts: [defaultTolimaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  ortega: {
    slug: 'ortega',
    name: 'Ortega',
    department: 'tolima',
    headline: 'Ortega',
    contacts: [defaultTolimaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  honda: {
    slug: 'honda',
    name: 'Honda',
    department: 'tolima',
    headline: 'Honda',
    contacts: [defaultTolimaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  fresno: {
    slug: 'fresno',
    name: 'Fresno',
    department: 'tolima',
    headline: 'Fresno',
    contacts: [defaultTolimaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
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
