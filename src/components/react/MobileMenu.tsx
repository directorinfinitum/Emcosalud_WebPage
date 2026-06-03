import { useEffect, useId, useState } from 'react';
import type { NavItem } from '@/data/navigation';
import Icon, { navIconForLabel } from '@/components/react/Icon';

type Props = {
  items: NavItem[];
};

export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-md border border-slate-200 bg-slate-50"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        <span className="block h-0.5 w-5 rounded-sm bg-brand-blue" />
        <span className="block h-0.5 w-5 rounded-sm bg-brand-blue" />
        <span className="block h-0.5 w-5 rounded-sm bg-brand-blue" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-brand-blue-dark/45"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <nav
        id={panelId}
        className={`fixed right-0 top-[4.5rem] z-50 h-[calc(100dvh-4.5rem)] w-[min(20rem,92vw)] overflow-y-auto border-l border-slate-200 bg-white shadow-brand transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menú principal móvil"
        hidden={!open}
      >
        <ul className="m-0 list-none p-4">
          {items.map((item) => {
            if (item.children?.length) {
              const isExpanded = expanded === item.label;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 border-0 bg-transparent px-2 py-3 text-left text-base font-semibold text-brand-blue"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpanded(isExpanded ? null : item.label)
                    }
                  >
                    {navIconForLabel(item.label) && (
                      <Icon name={navIconForLabel(item.label)!} size={18} />
                    )}
                    {item.label}
                  </button>
                  {isExpanded && (
                    <ul className="m-0 list-none pb-2 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a
                            href={child.href}
                            target={child.external ? '_blank' : undefined}
                            rel={child.external ? 'noopener noreferrer' : undefined}
                            className="flex items-center gap-1.5 py-2 text-sm font-medium text-slate-600 no-underline hover:text-brand-green-dark"
                            onClick={() => setOpen(false)}
                          >
                            {child.external && <Icon name="external" size={14} />}
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.label}>
                <a
                  href={item.href ?? '#'}
                  className="flex items-center gap-2 px-2 py-3 text-base font-semibold text-brand-blue no-underline"
                  onClick={() => setOpen(false)}
                >
                  {navIconForLabel(item.label) && (
                    <Icon name={navIconForLabel(item.label)!} size={18} />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
