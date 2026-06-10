import type { IconName, QuickAccessItem } from './icons';
import { buildSedesNavChildren } from './sedes';

export type NavLink = {
  label: string;
  href?: string;
  external?: boolean;
  icon?: IconName;
  /** Submenú (p. ej. Huila → municipios bajo Sedes). */
  children?: NavLink[];
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
};

/** Servicios → sedes, medicamentos, trámites y citas (como emcosalud.com.co). */
export function buildServiciosNavChildren(): NavLink[] {
  return [
    ...buildSedesNavChildren(),
    {
      label: 'Dis/Medicamentos',
      children: [
        { label: 'Dis/Huila', href: '/medicamentos-huila' },
        { label: 'Dis/Tolima', href: '/medicamentos-tolima' },
      ],
    },
    {
      label: 'Trámites y Servicios',
      children: [
        {
          label: 'Descargar tu Certificado de Retenciones',
          href: '/documentos',
        },
        { label: 'Tramitar PQR', href: '/pqrs' },
      ],
    },
    {
      label: 'Solicita tu Cita',
      children: [
        { label: 'Huila', href: '/citas-huila' },
        { label: 'Tolima', href: '/citas-tolima' },
        { label: 'SOAT', href: '/citas-soat' },
      ],
    },
  ];
}

/** Estructura base alineada con emcosalud.com.co (expandible con secciones de clínica). */
export const mainNavigation: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Nosotros',
    children: [
      { label: 'Quiénes somos', href: '/nosotros' },
      { label: 'Estados financieros', href: '/estados-financieros' },
      { label: 'SARLAFT', href: '/sarlaft' },
      { label: 'SICOF', href: '/sicof' },
    ],
  },
  {
    label: 'Servicios',
    href: '/servicios',
    children: buildServiciosNavChildren(),
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

export const quickAccessLinks: QuickAccessItem[] = [
  {
    label: 'Solicitar cita médica',
    href: '/citas',
    icon: 'calendar',
    description: 'Agenda tu consulta en Huila o Tolima',
  },
  {
    label: 'Portafolio de servicios',
    href: '/servicios',
    icon: 'stethoscope',
    description: 'Medicina general, especialidades y más',
  },
  {
    label: 'Consulta de documentos',
    href: '/documentos',
    icon: 'document',
    description: 'Trámites y certificados en línea',
  },
  {
    label: 'Clínica Emcosalud',
    href: 'https://clinicaemcosalud.com',
    external: true,
    icon: 'hospital',
    description: 'Urgencias, hospitalización y cirugía',
  },
  {
    label: 'Resultados y portales',
    href: '/portales',
    icon: 'lab',
    description: 'Laboratorio e imágenes diagnósticas',
  },
  {
    label: 'Estados financieros',
    href: '/estados-financieros',
    icon: 'chart',
    description: 'Transparencia institucional',
  },
];

export const footerNavigation = {
  institucional: [
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Estados financieros', href: '/estados-financieros' },
    { label: 'SARLAFT', href: '/sarlaft' },
    { label: 'SICOF', href: '/sicof' },
  ],
  servicios: [
    { label: 'Nuestras sedes', href: '/sedes' },
    { label: 'Servicios médicos', href: '/servicios' },
    { label: 'Medicamentos Huila', href: '/medicamentos-huila' },
    { label: 'Medicamentos Tolima', href: '/medicamentos-tolima' },
    { label: 'Citas médicas', href: '/citas' },
    { label: 'PQR', href: '/pqrs' },
    { label: 'Blog', href: '/blog' },
  ],
  enlaces: [
    { label: 'Clínica Emcosalud', href: 'https://clinicaemcosalud.com', external: true },
    { label: 'Emcofarma', href: 'https://emcofarma.com', external: true },
    { label: 'Escuela Emcosalud', href: 'https://escuelaemcosalud.com', external: true },
  ],
} as const;
