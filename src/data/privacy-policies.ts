import type { IconName } from '@/data/icons';
import { site } from '@/data/site';

export type PrivacyPolicyItem = {
  icon: IconName;
  badge: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

export const privacyPolicies: PrivacyPolicyItem[] = [
  {
    icon: 'shield-check',
    badge: 'C',
    title: 'Política de uso de cookies',
    description: 'Explica qué cookies usamos, por qué y cómo el usuario puede administrarlas.',
    href: site.legal.cookiesPolicyPdf,
    external: true,
  },
  {
    icon: 'document',
    badge: 'A',
    title: 'Formulario de autorización',
    description: 'Autorización para el tratamiento de datos personales.',
    href: site.legal.authorizationFormPdf,
    external: true,
  },
  {
    icon: 'file-claim',
    badge: 'P',
    title: 'Política de tratamiento de datos',
    description:
      'Describe finalidad, bases legales, derechos del titular y medidas de seguridad.',
    href: site.legal.dataTreatmentPolicyPdf,
    external: true,
  },
];
