export const medicalServices = [
  'Medicina General',
  'Pediatría',
  'Ginecología',
  'Enfermería',
  'Higiene oral',
  'Medicina familiar',
  'Medicina interna',
  'Odontología',
  'Psicología',
] as const;

export const promotionServices = [
  'Planificación Familiar',
  'Control de Gestantes',
  'Toma de Citología',
  'Valoración Clínica de Senos',
  'Consejería en lactancia materna',
  'Consulta por curso de vida',
  'Consulta Preconcepcional',
  'Riesgo Cardiovascular',
  'Toma de prueba ADN VPH',
] as const;

export const blogPosts = [
  {
    slug: 'dia-internacional-epilepsia',
    title: 'Día Internacional de la Epilepsia',
    date: '2026-02-09',
    excerpt:
      'Conciencia y acompañamiento para personas que viven con epilepsia y sus familias.',
  },
  {
    slug: 'dia-mundial-cancer',
    title: 'Día Mundial Lucha Contra el Cáncer',
    date: '2026-02-04',
    excerpt: 'Prevención, detección temprana y hábitos saludables.',
  },
  {
    slug: 'dia-lepra',
    title: 'Día Mundial de la Lucha Contra la Enfermedad de Hansen',
    date: '2026-01-27',
    excerpt: 'Información y reducción del estigma asociado a la lepra.',
  },
  {
    slug: 'dia-depresion',
    title: 'Día Mundial de la Lucha Contra la Depresión',
    date: '2026-01-13',
    excerpt: 'Salud mental y rutas de atención disponibles.',
  },
] as const;
