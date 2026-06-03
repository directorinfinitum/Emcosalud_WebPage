import type { IconName, QuickAccessItem } from './icons';

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  icon?: IconName;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
};

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
    label: 'Sedes',
    children: [
      { label: 'Neiva', href: '/sedes/neiva' },
      { label: 'Ibagué', href: '/sedes/ibague' },
      { label: 'Campoalegre', href: '/sedes/campoalegre' },
      { label: 'Ver todas (Huila)', href: '/sedes#huila' },
      { label: 'Ver todas (Tolima)', href: '/sedes#tolima' },
    ],
  },
  {
    label: 'Servicios',
    children: [
      { label: 'Portafolio de servicios', href: '/servicios' },
      { label: 'Promoción y mantenimiento', href: '/servicios#promocion' },
      { label: 'Medicamentos Huila', href: '/medicamentos-huila' },
      { label: 'Medicamentos Tolima', href: '/medicamentos-tolima' },
    ],
  },
  {
    label: 'Trámites',
    children: [
      { label: 'Solicitar cita', href: '/citas' },
      { label: 'Consulta de documentos', href: '/documentos' },
      { label: 'Citas SOAT', href: '/citas-soat' },
      { label: 'Tramitar PQR', href: '/pqrs' },
    ],
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
    { label: 'Servicios médicos', href: '/servicios' },
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
