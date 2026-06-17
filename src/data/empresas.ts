import type { NavLink } from '@/data/navigation';

/** Enlaces del grupo empresarial (menú N/Empresas — emcosalud.com.co). */
export const grupoEmpresarialLinks = {
  portal: 'https://portal.emcosalud.org',
  emcofarma: 'https://emcofarma.com',
  laPopular: 'https://portal.emcosalud.org',
  escuela: 'https://escuelaemcosalud.com',
  clinica: 'https://clinicaemcosalud.com',
  emcofarmaPlus: 'https://portal.emcosalud.org',
  distribuciones: 'https://portal.emcosalud.org',
  emcoSas: 'https://portal.emcosalud.org',
} as const;

export function buildNEmpresasNavChildren(): NavLink[] {
  return [
    {
      label: 'Emcosalud',
      children: [
        {
          label: 'Emcofarma',
          href: grupoEmpresarialLinks.emcofarma,
          external: true,
        },
        {
          label: 'La Popular',
          href: grupoEmpresarialLinks.laPopular,
          external: true,
        },
        {
          label: 'Escuela de la salud Emcosalud',
          href: grupoEmpresarialLinks.escuela,
          external: true,
        },
      ],
    },
    {
      label: 'Sociedad Clínica Emcosalud',
      href: grupoEmpresarialLinks.clinica,
      external: true,
    },
    {
      label: 'Emcofarma Plus',
      href: grupoEmpresarialLinks.emcofarmaPlus,
      external: true,
    },
    {
      label: 'Distribuciones Emcosalud',
      href: grupoEmpresarialLinks.distribuciones,
      external: true,
    },
    {
      label: 'Emco S.A.S',
      href: grupoEmpresarialLinks.emcoSas,
      external: true,
    },
  ];
}
