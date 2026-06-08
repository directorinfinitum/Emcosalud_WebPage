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
    headline: 'Garzón',
    contacts: [defaultHuilaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  gigante: {
    slug: 'gigante',
    name: 'Gigante',
    department: 'huila',
    headline: 'Gigante',
    contacts: [defaultHuilaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  guadalupe: {
    slug: 'guadalupe',
    name: 'Guadalupe',
    department: 'huila',
    headline: 'Guadalupe',
    contacts: [defaultHuilaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  'la-plata': {
    slug: 'la-plata',
    name: 'La Plata',
    department: 'huila',
    headline: 'La Plata',
    contacts: [defaultHuilaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
  },
  pitalito: {
    slug: 'pitalito',
    name: 'Pitalito',
    department: 'huila',
    headline: 'Pitalito',
    contacts: [defaultHuilaCitas],
    schedules: [standardAttention, standardCitas],
    services: [...basicServices, 'Terapias'],
  },
  'san-agustin': {
    slug: 'san-agustin',
    name: 'San Agustín',
    department: 'huila',
    headline: 'San Agustín',
    contacts: [defaultHuilaCitas],
    schedules: [standardAttention, standardCitas],
    services: basicServices,
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
