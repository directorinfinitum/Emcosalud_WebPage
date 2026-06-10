import type { MedicamentosInfographic } from '@/data/medicamentos-huila';

export const medicamentosTolimaIntro =
  'En Tolima Medicamentos encontrarás entrega de medicamentos a domicilio y puntos de dispensación. Seguimos cuidando de ti y tu familia.';

export const medicamentosTolimaPharmaciesIntro =
  'Aquí encontrarás la información de nuestras farmacias que cuentan con dispensación de medicamentos en el departamento del Tolima.';

export const medicamentosTolimaPdfHref = '/documents/dispensacion-medicamentos-tolima.pdf';

export const medicamentosTolimaInfographics: MedicamentosInfographic[] = [
  {
    src: '/images/medicamentos/huila/huila-dispensacion-01.png',
    alt: 'Entrega de medicamentos a domicilio y puntos de dispensación — Tolima',
  },
  {
    src: '/images/medicamentos/tolima/tolima-dispensacion-02-domicilio.png',
    alt: 'Domicilio de medicamentos en el Tolima',
  },
  {
    src: '/images/medicamentos/tolima/tolima-dispensacion-03-presencial.png',
    alt: 'Dispensación presencial de medicamentos en el Tolima',
  },
];
