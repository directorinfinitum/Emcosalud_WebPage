import { useCallback, useEffect, useState } from 'react';
import type { HeroBanner } from '@/data/banners';

type Props = {
  banners: HeroBanner[];
  intervalMs?: number;
};

export default function BannerCarousel({ banners, intervalMs = 5500 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = banners.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActive(((index % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [total, intervalMs, paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(active - 1);
      if (e.key === 'ArrowRight') goTo(active + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  if (total === 0) return null;

  const current = banners[active];

  return (
    <section
      className="relative w-full overflow-hidden bg-brand-blue-dark"
      aria-label="Carrusel de banners institucionales"
      aria-roledescription="carrusel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Contenedor con proporción fija para que el carrusel tenga altura */}
      <div className="relative aspect-[21/8] w-full min-h-[11rem] sm:min-h-[14rem] md:min-h-[18rem] lg:min-h-[22rem] xl:min-h-[26rem]">
        {banners.map((banner, index) => {
          const isActive = index === active;
          const content = (
            <img
              src={banner.src}
              alt={banner.alt}
              className="h-full w-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          );

          return (
            <div
              key={banner.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${total}`}
              aria-hidden={!isActive}
            >
              {banner.href ? (
                <a
                  href={banner.href}
                  className="block h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green"
                  tabIndex={isActive ? 0 : -1}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl font-bold leading-none text-brand-blue shadow-md transition hover:bg-white md:left-4"
            onClick={() => goTo(active - 1)}
            aria-label="Banner anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-2xl font-bold leading-none text-brand-blue shadow-md transition hover:bg-white md:right-4"
            onClick={() => goTo(active + 1)}
            aria-label="Banner siguiente"
          >
            ›
          </button>

          <div
            className="absolute bottom-3 left-1/2 z-20 flex max-w-[90%] -translate-x-1/2 flex-wrap items-center justify-center gap-2 px-2"
            role="tablist"
            aria-label="Seleccionar banner"
          >
            {banners.map((banner, index) => (
              <button
                key={banner.src}
                type="button"
                role="tab"
                className={`h-2.5 shrink-0 rounded-full transition-all ${
                  index === active
                    ? 'w-8 bg-brand-green'
                    : 'w-2.5 bg-white/80 hover:bg-white'
                }`}
                onClick={() => goTo(index)}
                aria-label={banner.alt}
                aria-selected={index === active}
              />
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {current.alt}
          </p>
        </>
      )}
    </section>
  );
}
