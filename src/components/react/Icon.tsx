import type { IconName } from '@/data/icons';

type Props = {
  name: IconName;
  size?: number;
  className?: string;
};

const paths: Partial<Record<IconName, string>> = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  stethoscope: '<path d="M4.8 10.2a4 4 0 0 0 6.4 0M11 10.2V6a3 3 0 0 1 6 0v8a5 5 0 0 1-10 0V9"/>',
  document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  hospital: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/>',
  blog: '<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  'file-claim': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
};

const navIcons: Record<string, IconName> = {
  Inicio: 'calendar',
  Nosotros: 'users',
  Sedes: 'building',
  Servicios: 'stethoscope',
  Huila: 'building',
  Tolima: 'building',
  Blog: 'blog',
  Contacto: 'mail',
};

export function navIconForLabel(label: string): IconName | undefined {
  return navIcons[label];
}

export default function Icon({ name, size = 20, className = '' }: Props) {
  const inner = paths[name] ?? paths.document;
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <g dangerouslySetInnerHTML={{ __html: inner ?? '' }} />
    </svg>
  );
}
