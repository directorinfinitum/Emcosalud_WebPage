import { useEffect, useId, useState } from 'react';
import type { NavItem, NavLink } from '@/data/navigation';
import Icon, { navIconForLabel } from '@/components/react/Icon';

type Props = {
  items: NavItem[];
};

function NavLinksList({
  links,
  depth,
  expandedKeys,
  toggleKey,
  onNavigate,
}: {
  links: NavLink[];
  depth: number;
  expandedKeys: Set<string>;
  toggleKey: (key: string) => void;
  onNavigate: () => void;
}) {
  return (
    <ul className={depth === 0 ? 'm-0 list-none p-4' : 'm-0 list-none pb-2 pl-4'}>
      {links.map((link) => {
        const key = link.href ?? link.label;
        const hasChildren = Boolean(link.children?.length);
        const isExpanded = expandedKeys.has(key);

        if (hasChildren) {
          return (
            <li key={key}>
              <button
                type="button"
                className="flex w-full items-center gap-2 border-0 bg-transparent px-2 py-2.5 text-left text-sm font-semibold text-brand-blue"
                aria-expanded={isExpanded}
                onClick={() => toggleKey(key)}
              >
                {link.label}
              </button>
              {isExpanded && link.children && (
                <NavLinksList
                  links={link.children}
                  depth={depth + 1}
                  expandedKeys={expandedKeys}
                  toggleKey={toggleKey}
                  onNavigate={onNavigate}
                />
              )}
            </li>
          );
        }

        return (
          <li key={key}>
            <a
              href={link.href ?? '#'}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-1.5 py-2 text-sm font-medium text-slate-600 no-underline hover:text-brand-green-dark"
              onClick={onNavigate}
            >
              {link.external && <Icon name="external" size={14} />}
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleKey = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const close = () => {
    setOpen(false);
    setExpandedKeys(new Set());
  };

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
          onClick={close}
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
              const key = item.href ?? item.label;
              const isExpanded = expandedKeys.has(key);
              return (
                <li key={item.label}>
                  <div className="flex items-center">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex flex-1 items-center gap-2 px-2 py-3 text-base font-semibold text-brand-blue no-underline"
                        onClick={close}
                      >
                        {navIconForLabel(item.label) && (
                          <Icon name={navIconForLabel(item.label)!} size={18} />
                        )}
                        {item.label}
                      </a>
                    ) : (
                      <span className="flex flex-1 items-center gap-2 px-2 py-3 text-base font-semibold text-brand-blue">
                        {navIconForLabel(item.label) && (
                          <Icon name={navIconForLabel(item.label)!} size={18} />
                        )}
                        {item.label}
                      </span>
                    )}
                    <button
                      type="button"
                      className="mr-1 rounded border-0 bg-transparent px-2 py-3 text-brand-blue"
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Ocultar' : 'Mostrar'} submenú ${item.label}`}
                      onClick={() => toggleKey(key)}
                    >
                      {isExpanded ? '−' : '+'}
                    </button>
                  </div>
                  {isExpanded && (
                    <NavLinksList
                      links={item.children}
                      depth={1}
                      expandedKeys={expandedKeys}
                      toggleKey={toggleKey}
                      onNavigate={close}
                    />
                  )}
                </li>
              );
            }

            return (
              <li key={item.label}>
                <a
                  href={item.href ?? '#'}
                  className="flex items-center gap-2 px-2 py-3 text-base font-semibold text-brand-blue no-underline"
                  onClick={close}
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
