import { useEffect, useId, useRef, useState } from 'react';
import { citasDepartmentOptions } from '@/data/citas';
import Icon from '@/components/react/Icon';

type Props = {
  className?: string;
};

export default function SolicitarCitaButton({ className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        className="btn btn--primary hidden text-sm lg:inline-flex"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="calendar" size={18} />
        Solicitar cita
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Seleccionar departamento para solicitar cita"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[11.5rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-brand"
        >
          {citasDepartmentOptions.map((option) => (
            <a
              key={option.id}
              href={option.href}
              role="menuitem"
              className="block px-4 py-2.5 text-sm font-semibold text-brand-blue no-underline transition hover:bg-brand-green/10 hover:text-brand-green-dark"
              onClick={() => setOpen(false)}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
