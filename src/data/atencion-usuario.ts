import type { NavLink } from '@/data/navigation';

export const atencionUsuarioAssets = {
  derechosDeberesPdf:
    'https://emcosalud.com.co/wp-content/uploads/2025/04/Derechos-y-Deberes.pdf',
  asociacionUsuariosImg:
    'https://emcosalud.com.co/wp-content/uploads/2025/06/asociacion-de-usuarios.png',
  protocoloEnfoqueDiferencialPdf:
    'https://emcosalud.com.co/wp-content/uploads/2025/04/PROTOCOLO-DE-ATENCION-CON-ENFOQUE-DIFERENCIAL-EMCOSALUD.pdf',
  resolucionEnfoqueDiferencialPdf:
    'https://emcosalud.com.co/wp-content/uploads/2025/07/RESOLUCION-005-DE-2025_POLITICA-DE-ATENCION-CON-ENFOQUE-DIFERENCIAL-EN-EMCOSALUD.pdf',
} as const;

export type PromocionCampaign = {
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  detailHref: string;
};

export const promocionCampaigns: PromocionCampaign[] = [
  {
    title: 'Rutas de Atención Integral Cáncer',
    description:
      'Aprende prácticas esenciales para proteger tu salud, con nuestra ruta de atención.',
    image: '/images/promocion/RUTAS-DE-ATENCION-INTEGRAL-CANCER.jpeg',
    imageAlt: 'Rutas de Atención Integral Cáncer — EMCOSALUD',
    detailHref: '/images/promocion/RUTAS-DE-ATENCION-INTEGRAL-CANCER.jpeg',
  },
  {
    title: 'La violencia Sexual no se Justifica, se Denuncia',
    description:
      'Informa y sensibiliza. Habla del tema para romper el silencio y generar conciencia.',
    image: '/images/promocion/FLAYER-VIOLENCIA-SEXUAL-2.jpeg',
    imageAlt: 'La violencia sexual no se justifica, se denuncia — EMCOSALUD',
    detailHref: '/images/promocion/FLAYER-VIOLENCIA-SEXUAL-2.jpeg',
  },
  {
    title: 'Ruta Integral de Atención Alteraciones Nutricionales',
    description:
      'Campañas enfocadas en el control de la desnutrición aguda en menores de 5 años.',
    image: '/images/promocion/Flyer-infografia-de-la-empresa-simple-profesional-multicolor-2.png',
    imageAlt: 'Ruta Integral de Atención Alteraciones Nutricionales — EMCOSALUD',
    detailHref:
      '/images/promocion/Flyer-infografia-de-la-empresa-simple-profesional-multicolor-2.png',
  },
  {
    title: 'Ruta Materno Perinatal',
    description: 'Campañas enfocadas en la atención a la mujer en edad fértil.',
    image: '/images/promocion/RUTA-MATERNO-PERINATAL-1.png',
    imageAlt: 'Ruta Materno Perinatal — EMCOSALUD',
    detailHref: '/images/promocion/RUTA-MATERNO-PERINATAL-1.png',
  },
  {
    title: 'Rutas Integrales de Atención en Salud RIAS',
    image: '/images/promocion/FLAYER-PYM-CICLOS-DE-VIDA_page-0001-scaled.jpg',
    imageAlt: 'Rutas Integrales de Atención en Salud RIAS — EMCOSALUD',
    detailHref: '/images/promocion/FLAYER-PYM-CICLOS-DE-VIDA_page-0001-scaled.jpg',
  },
  {
    title: 'Hipertensión Arterial y Diabetes Mellitus tipo 2',
    image: '/images/promocion/FLYER-RUTA-CARDIOCEREBROVASCULAR-2_page-0001-1.jpg',
    imageAlt: 'Hipertensión Arterial y Diabetes Mellitus tipo 2 — EMCOSALUD',
    detailHref: '/images/promocion/FLYER-RUTA-CARDIOCEREBROVASCULAR-2_page-0001-1.jpg',
  },
  {
    title: 'Rutas de Atención de Salud Mental',
    image:
      '/images/promocion/Flyers-educativos-5-rutas-de-psicologia-SALUD-MENTAL-2_page-0001.jpg',
    imageAlt: 'Rutas de Atención de Salud Mental — EMCOSALUD',
    detailHref:
      '/images/promocion/Flyers-educativos-5-rutas-de-psicologia-SALUD-MENTAL-2.pdf',
  },
];

export const humanizacionIntro = {
  title: 'Humanización',
  lead:
    'En EMCOSALUD entendemos que la atención en salud va más allá del tratamiento de enfermedades: buscamos una experiencia cercana, respetuosa y centrada en la dignidad de cada persona.',
  paragraphs: [
    'La humanización del cuidado comienza desde el primer contacto con el usuario y su familia, a través de una comunicación fluida, cálida y efectiva.',
    'Promovemos un trato empático y personalizado, cuidando el lenguaje verbal y no verbal, que impacta directamente en el bienestar emocional.',
    'Reafirmamos nuestro compromiso con una atención humanizada en todos los procesos de la cooperativa.',
  ],
} as const;

export const politicaEnfoqueDiferencial = {
  title: 'Política con Enfoque Diferencial',
  lead: 'Documentos oficiales que garantizan una atención inclusiva y respetuosa.',
  documents: [
    {
      title: 'Protocolo de Atención con Enfoque Diferencial',
      description:
        'Lineamientos operativos y rutas para la prestación del servicio con enfoque diferencial.',
      href: atencionUsuarioAssets.protocoloEnfoqueDiferencialPdf,
      updated: '2025',
    },
    {
      title: 'Resolución 005 de 2025',
      description:
        'Por la cual se dicta y adopta la Política de Atención con Enfoque Diferencial en EMCOSALUD.',
      href: atencionUsuarioAssets.resolucionEnfoqueDiferencialPdf,
      updated: '2025',
    },
  ],
} as const;

export type BoletinIssue = {
  label: string;
  href: string;
};

export const boletinesByYear: Record<string, BoletinIssue[]> = {
  '2024': [
    {
      label: 'Boletín Marzo y Abril',
      href: 'https://emcosalud.com.co/wp-content/uploads/2025/05/Boletin-magisterio-Marzo-y-Abril.pdf',
    },
  ],
  '2025': [
    {
      label: 'Boletín Marzo y Abril',
      href: 'https://emcosalud.com.co/wp-content/uploads/2025/05/Boletin-magisterio-Marzo-y-Abril_compressed.pdf',
    },
    {
      label: 'Boletín Mayo',
      href: 'https://emcosalud.com.co/wp-content/uploads/2025/05/Boletin-magisterio-Mayo.pdf_compressed.pdf',
    },
  ],
  '2026': [
    {
      label: 'Boletín Enero',
      href: 'https://emcosalud.com.co/wp-content/uploads/2026/01/Boletin-Emcosalud-Enero-2026.pdf',
    },
    {
      label: 'Boletín Febrero',
      href: 'https://emcosalud.com.co/wp-content/uploads/2026/02/Boletin-FEBRERO-2026.pdf',
    },
    {
      label: 'Boletín Marzo',
      href: 'https://emcosalud.com.co/wp-content/uploads/2026/03/Boletin-MARZO-2026.pdf',
    },
    {
      label: 'Boletín Abril',
      href: 'https://emcosalud.com.co/wp-content/uploads/2026/05/Boletin-ABRIL-2026.pdf',
    },
    {
      label: 'Boletín Mayo',
      href: 'https://emcosalud.com.co/wp-content/uploads/2026/06/Boletin-de-Mayo-Externo.pdf',
    },
  ],
};

export const mejoremosJuntosContent = {
  title: 'Mejoremos Juntos',
  lead: 'Sistema de Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones (PQRSF).',
  types: [
    {
      emoji: '📩',
      title: 'Petición',
      description: 'Solicitud respetuosa sobre un tema de interés general o personal.',
    },
    {
      emoji: '😠',
      title: 'Queja',
      description: 'Inconformidad por el comportamiento de un funcionario.',
    },
    {
      emoji: '⚠️',
      title: 'Reclamo',
      description: 'Incumplimiento de un derecho del usuario.',
    },
    {
      emoji: '💡',
      title: 'Sugerencia',
      description: 'Propuesta de mejora de servicios o procesos.',
    },
    {
      emoji: '🎉',
      title: 'Felicitación',
      description: 'Agradecimiento o reconocimiento al buen servicio.',
    },
  ],
  regions: [
    {
      name: 'Huila',
      office:
        'Neiva: Calle 8 N. 10-45, piso 2 (Altico). Pitalito: Carrera 5 N. 2-30, piso 3 (Centro).',
      schedule:
        'Neiva: lun–vie 7:30 a.m.–11:00 a.m. y 2:00 p.m.–5:00 p.m. Pitalito: lun–jue 7:00 a.m.–12:00 m. y 2:00 p.m.–6:00 p.m.; vie 7:00 a.m.–12:00 m. y 2:00 p.m.–6:00 p.m.; sáb 8:00 a.m.–10:00 a.m.',
      phone: '608-863 2041 opción 4',
      pqrsHref: '/pqrs',
    },
    {
      name: 'Tolima',
      office: 'Ibagué: Carrera 5 N. 25-26, piso 1 (Barrio Hipódromo).',
      schedule: 'Lun–vie 7:00 a.m.–11:00 a.m. y 2:00 p.m.–5:00 p.m.',
      phone: '608-277 1669 Ext. 5104',
      pqrsHref: '/pqrs',
    },
  ],
} as const;

export const canalesAtencion = {
  title: 'Canales y Puntos de Atención',
  lead: 'Comunícate con EMCOSALUD por teléfono, correo o visita nuestras sedes.',
  channels: [
    {
      title: 'Línea Huila',
      detail: '(608) 863 2041',
      tel: '+576088632041',
      note: 'Opción 4 — Atención al usuario',
    },
    {
      title: 'Línea Tolima',
      detail: '(608) 277 1669',
      tel: '+576082771669',
      note: 'Ext. 4 — Atención al usuario',
    },
  ],
} as const;

/** Menú Atención al Usuario — emcosalud.com.co */
export function buildAtencionUsuarioNavChildren(): NavLink[] {
  return [
    {
      label: 'Promoción y Mantenimiento de la Salud',
      href: '/promocion-y-mantenimiento-de-la-salud',
    },
    {
      label: 'Canales y Puntos de Atención',
      href: '/canales-y-puntos-de-atencion',
    },
    { label: 'Derechos y Deberes', href: '/derechos-y-deberes' },
    { label: 'Humanización', href: '/humanizacion' },
    {
      label: 'Política con Enfoque Diferencial',
      href: '/politica-con-enfoque-diferencial',
    },
    { label: 'Asociación de Usuarios', href: '/asociacion-de-usuarios' },
    {
      label: 'Boletines',
      children: [
        { label: 'Boletín 2024', href: '/boletin-2024' },
        { label: 'Boletín 2025', href: '/boletin-2025' },
        { label: 'Boletín 2026', href: '/boletin-2026' },
      ],
    },
    { label: 'Mejoremos Juntos', href: '/mejoremos-juntos' },
  ];
}
