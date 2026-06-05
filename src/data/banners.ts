export type HeroBanner = {
  src: string;
  alt: string;
  href?: string;
};

/** Banners institucionales (imágenes en /public/images/banners/) */
export const heroBanners: HeroBanner[] = [
  {
    src: '/images/banners/solicita-cita.png',
    alt: 'Solicita tu cita — Somos tu IPS de confianza',
    href: '/citas',
  },
  {
    src: '/images/banners/nuestras-sedes.png',
    alt: 'Nuestras sedes para ti',
    href: '/sedes',
  },
  {
    src: '/images/banners/sedes-huila1.png',
    alt: 'Sedes en el departamento del Huila',
    href: '/sedes',
  },
  {
    src: '/images/banners/sedes-tolima.png',
    alt: 'Sedes en el departamento del Tolima',
    href: '/sedes',
  },
  {
    src: '/images/banners/sede-exclusiva.png',
    alt: 'Nuestra sede exclusiva para ti',
    href: '/sedes',
  },
  {
    src: '/images/banners/fiebre-amarilla.png',
    alt: '¿Qué es la fiebre amarilla? — Vacúnate, las vacunas son gratis',
  },
  {
    src: '/images/banners/calidad-compromiso.png',
    alt: 'Confianza, calidad y compromiso — EMCO Salud',
  },
  {
    src: '/images/banners/violencia-sexual.png',
    alt: 'La violencia sexual no se justifica, se denuncia',
  },
];
