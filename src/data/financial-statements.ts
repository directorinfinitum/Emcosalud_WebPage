export type FinancialStatement = {
  year: number;
  publishedAt: string;
  title: string;
  description: string;
  pdfHref: string;
  thumbnail: string;
};

export const financialStatementsIntro =
  'En cumplimiento a la circular externa 016 de 2016 de la Superintendencia Nacional de Salud se permite compartir los siguientes documentos:';

export const financialStatements: FinancialStatement[] = [
  {
    year: 2025,
    publishedAt: '29 de abril de 2026',
    title: 'Estados financieros EMCOSALUD 2025',
    description: 'Estados financieros EMCOSALUD 2025',
    pdfHref: '/documents/estados-financieros/emcosalud-2025.pdf',
    thumbnail: '/images/estados-financieros/pdf-emco.png',
  },
  {
    year: 2024,
    publishedAt: '30 de abril de 2025',
    title: 'Estados financieros EMCOSALUD 2024',
    description: 'Estados financieros EMCOSALUD 2024',
    pdfHref: '/documents/estados-financieros/emcosalud-2024.pdf',
    thumbnail: '/images/estados-financieros/pdf-emco.png',
  },
];
