import type { NavLink } from '@/data/navigation';

export const laboratorioResultadosUrl =
  'http://emcolab.vpls.emcosalud.net:38080/EclipseWeb/login';

const labPdfBase = 'https://emcosalud.com.co/wp-content/uploads';

export const laboratorioClinicoContent = {
  title: 'Preparación para Exámenes',
  lead:
    'Aquí encontrarás las preparaciones y recomendaciones para realizarte las siguientes tomas o pruebas en laboratorio.',
  intro:
    'Selecciona la prueba que necesites para ver los requisitos y pasos antes de la toma de muestra.',
  disclaimer:
    'Esta información es de carácter general. Consulta siempre las indicaciones específicas de tu médico o del laboratorio donde te atenderás.',
  resultsInfo: {
    title: 'Información importante sobre tus resultados',
    paragraphs: [
      'Los resultados de los laboratorios relacionados estarán disponibles en un tiempo no mayor a 48 horas. Estos serán enviados de forma inmediata, una vez procesados, al correo electrónico registrado.',
      'También podrás consultarlos en el portal de resultados de laboratorio.',
      'Si lo prefieres, puedes solicitarlos de manera presencial en nuestro Laboratorio Clínico. Recuerda que el médico del Grupo Empresarial EMCOSALUD también puede visualizarlos directamente durante la consulta médica.',
    ],
    instructivoPdf: `${labPdfBase}/2026/02/Instructivo-Resultados-de-Laboratorio.pdf`,
  },
  preparaciones: [
    {
      title: 'Toma de muestras de orina',
      description: 'Muestra de orina para análisis físico-químico y microscópico (24 horas).',
      pdfHref: `${labPdfBase}/2025/11/4.-Recomendaciones-Para-Toma-De-Muestras-De-Orina-24-Horas-Proteinas-En-24-Horas-–-Depuracion-De-Creatinina.pdf`,
    },
    {
      title: 'Vitamina D, B12 y Ácido Fólico',
      description: 'Pruebas séricas de vitaminas.',
      pdfHref: `${labPdfBase}/2025/11/17.-Pruebas-de-vitamina-D-B12-o-acido-folico.pdf`,
    },
    {
      title: 'Microalbuminuria en orina espontánea',
      description: 'Cribado de proteinuria temprana.',
      pdfHref: `${labPdfBase}/2025/11/1.-Preparacion-Para-Microalbuminuria-En-Orina-Espontanea.pdf`,
    },
    {
      title: 'Hemograma y Sedimentación',
      description: 'Conteo sanguíneo y velocidad de sedimentación.',
      pdfHref: `${labPdfBase}/2025/11/2.-Preparacion-Hemogramas-Sedimentacion-Glucosa-En-Ayunas-Tsh-Bun-Creatinina-Perfil-Lipidico.pdf`,
    },
    {
      title: 'Antígeno Prostático (PSA)',
      description: 'Marcador prostático en sangre.',
      pdfHref: `${labPdfBase}/2025/11/6.-Recomendaciones-Para-Toma-De-Muestras-De-Antigeno-Prostatico-–-Psa.pdf`,
    },
    {
      title: 'Prolactina',
      description: 'Hormona prolactina en sangre.',
      pdfHref: `${labPdfBase}/2025/11/8.-Recomendaciones-Para-Toma-De-Muestras-De-Prolactina.pdf`,
    },
    {
      title: 'Muestra de uñas (Hongos)',
      description: 'Detección de hongos en uñas (KOH).',
      pdfHref: `${labPdfBase}/2025/11/9.-Recomendaciones-Para-Toma-De-Muestras-De-Unas-Hongos-–-Koh.pdf`,
    },
    {
      title: 'Coprológico (Materia fecal)',
      description: 'Parásitos, sangre oculta y flora.',
      pdfHref: `${labPdfBase}/2025/11/7.-Recomendaciones-Para-Toma-De-Muestras-De-Materia-Fecal-Coprologico-–-Sangre-Oculta-Coprocultivo.pdf`,
    },
    {
      title: 'Toma de muestras de orina (Uroanálisis)',
      description: 'Muestra de orina para análisis físico-químico y microscópico.',
      pdfHref: `${labPdfBase}/2025/11/5.-Recomendaciones-Para-Toma-De-Muestras-De-Orina-Uroanalisis-–-Parcial-De-Orina.pdf`,
    },
    {
      title: 'Glicemia',
      description: 'Glucosa en ayunas o puntual.',
      pdfHref: `${labPdfBase}/2025/11/10.-Recomendaciones-Para-Toma-De-Muestras-De-Glicemia-Glicemia-Pre-Y-Post-–-Test-De-O-‘Sullivan-–-Curvas-De-Glicemia.pdf`,
    },
    {
      title: 'Perfil Lipídico (Colesterol - Triglicéridos)',
      description: 'Colesterol, triglicéridos, HDL y LDL.',
      pdfHref: `${labPdfBase}/2025/11/11.Recomendaciones-Para-Toma-De-Muestras-De-Perfil-Lipidico-Colesterol-–-Trigliceridos-–-Hdl-–-Ldl.pdf`,
    },
    {
      title: 'Hemoclasificación y Rh',
      description: 'Grupo sanguíneo y factor Rh.',
      pdfHref: `${labPdfBase}/2025/11/12.-Hemoclasificacion-y-pruebas-de-grupo-sanguineo-RH.pdf`,
    },
    {
      title: 'Pruebas Hormonales (FSH, LH, Estradiol, TSH, T3 y T4)',
      description: 'Panel hormonal en sangre.',
      pdfHref: `${labPdfBase}/2025/11/13.-Pruebas-hormonales-FSH-LH-Estradiol-Progesterona-Testosterona-Cortisol-T3-T4-TSH.pdf`,
    },
    {
      title: 'Pruebas de Coagulación (TP, TPT, INR, Fibrinógeno)',
      description: 'Estudios de coagulación sanguínea.',
      pdfHref: `${labPdfBase}/2025/11/16.-Pruebas-de-coagulacion-TP-TPT-INR-fibrinogeno.pdf`,
    },
    {
      title: 'Pruebas de Esputo (BK / cultivo)',
      description: 'Baciloscopia o cultivo de secreciones respiratorias.',
      pdfHref: `${labPdfBase}/2025/11/15.-Prueba-de-esputo-para-BK-o-cultivo-de-secreciones-respiratorias.pdf`,
    },
    {
      title: 'Urocultivo (Cultivo de orina)',
      description: 'Detección de infección urinaria.',
      pdfHref: `${labPdfBase}/2025/11/14.-Examen-de-orina-para-cultivo-Urocultivo.pdf`,
    },
  ],
} as const;

/** Menú Laboratorio Clínico — emcosalud.com.co */
export function buildLaboratorioClinicoNavChildren(): NavLink[] {
  return [
    {
      label: 'Consulta de Resultados',
      href: laboratorioResultadosUrl,
      external: true,
    },
    {
      label: 'Preparación para Exámenes',
      href: '/recomendaciones-laboratorio',
    },
  ];
}
