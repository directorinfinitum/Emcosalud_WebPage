/** Nombres de iconos disponibles en `Icon.astro` */
export type IconName =
  | 'calendar'
  | 'stethoscope'
  | 'document'
  | 'hospital'
  | 'lab'
  | 'chart'
  | 'phone'
  | 'location'
  | 'mail'
  | 'clock'
  | 'heart-pulse'
  | 'shield-check'
  | 'blog'
  | 'users'
  | 'pill'
  | 'file-claim'
  | 'external'
  | 'arrow-right'
  | 'facebook'
  | 'whatsapp'
  | 'youtube'
  | 'instagram'
  | 'building'
  | 'graduation'
  | 'pharmacy';

export type QuickAccessItem = {
  label: string;
  href: string;
  external?: boolean;
  icon: IconName;
  description?: string;
};
