export const sicofSubtitle =
  'Subsistema de Administración del Riesgo de Corrupción, Opacidad y Fraude';

export const sicofObjective =
  'Es un Subsistema de Administración del Riesgo de Corrupción, Opacidad y Fraude por el cual se logrará prevenir, controlar y mitigar los riesgos de la Empresa Cooperativa de Servicios de Salud Emcosalud.';

export const sicofGeneralConcepts: { title: string; description: string }[] = [
  {
    title: 'Corrupción',
    description:
      'Obtención de un beneficio particular por acción u omisión, en perjuicio de la entidad o de terceros.',
  },
  {
    title: 'Opacidad',
    description:
      'Falta de claridad o transparencia en la gestión de la información y en los procesos institucionales.',
  },
  {
    title: 'Fraude',
    description:
      'Cualquier acto ilegal caracterizado por ser un engaño para obtener un beneficio económico o de otro tipo.',
  },
];

export type SicofSubsystemConcept = {
  title: string;
  description: string;
  accent: 'brand-blue' | 'blue-light' | 'green' | 'green-dark' | 'blue-dark';
};

export const sicofSubsystemConcepts: SicofSubsystemConcept[] = [
  {
    title: 'Administración de Riesgos',
    description:
      'Cultura, procesos y estructuras orientados a la identificación, evaluación y tratamiento del riesgo.',
    accent: 'brand-blue',
  },
  {
    title: 'Análisis del Riesgo',
    description:
      'Proceso para comprender la naturaleza del riesgo y determinar su nivel, a fin de definir tratamientos adecuados.',
    accent: 'blue-light',
  },
  {
    title: 'Canal Anticorrupción',
    description:
      'Herramienta para prevenir y detectar eventos de fraude, corrupción u opacidad en la organización.',
    accent: 'green',
  },
  {
    title: 'Cibercrimen',
    description:
      'Actividades ilícitas para robar, alterar, manipular o destruir información mediante medios digitales.',
    accent: 'blue-dark',
  },
  {
    title: 'Cohecho',
    description: 'Soborno o aceptación de soborno en el ejercicio de funciones públicas o privadas.',
    accent: 'green-dark',
  },
];

export const sicofNormativityIntro =
  'La Superintendencia de Salud publicó la Circular Externa 20211700000005-5 de 2021, modificada y complementada por otras disposiciones del sector. Entre las principales se encuentran:';

export const sicofNormativity: string[] = [
  'Circular Externa 20211700000004-5 de 2021',
  'Circular Externa 018 de 2015',
  'Circular Externa 009 de 2016',
  'Circular Externa 007 de 2017',
  'Circular Externa 003 de 2018',
  'Circular Externa 000003 del 24 de mayo de 2018',
];

export const sicofNav = [
  { id: 'objetivo', label: 'Objetivo' },
  { id: 'conceptos', label: 'Conceptos generales' },
  { id: 'subsistema', label: 'Subsistema SICOF' },
  { id: 'normatividad', label: 'Normatividad' },
];
