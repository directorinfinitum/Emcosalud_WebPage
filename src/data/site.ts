export const site = {
  name: 'EMCOSALUD',
  tagline: 'Cooperativa de servicios de salud',
  description:
    'Acceso a servicios de salud, promoción y mantenimiento, citas médicas y atención en el sur colombiano.',
  assets: {
    logo: '/images/logo-emcosalud.png',
    logoAlt: 'EMCOSALUD — Cooperativa de servicios de salud',
  },
  phones: {
    huila: {
      label: '(608) 863 2041',
      tel: '+576088632041',
    },
    tolima: {
      label: '(608) 277 1669',
      tel: '+576082771669',
    },
  },
  social: {
    facebook: 'https://www.facebook.com/share/1BWkQzJXhD/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/emcosalud.lideresensalud/',
    youtube: 'https://www.youtube.com/@grupoempresarialemcosalud8869',
    whatsapp: 'https://whatsapp.com/channel/0029VaaGjS23QxS1mwMhoD13',
  },
  external: {
    clinica: 'https://clinicaemcosalud.com',
    emcofarma: 'https://emcofarma.com',
    escuela: 'https://escuelaemcosalud.com',
  },
} as const;

export const brand = {
  blue: '#053388',
  green: '#45c900',
} as const;
