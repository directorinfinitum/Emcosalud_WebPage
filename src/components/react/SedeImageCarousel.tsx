import { useCallback, useEffect, useState } from 'react';
import type { SedeImage } from '@/data/sedes';

type Props = {
  images: SedeImage[];
  intervalMs?: number;
};

export default function SedeImageCarousel({ images, intervalMs = 5000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

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

  const current = images[active];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-brand"
      aria-label="Galería de la sede"
      aria-roledescription="carrusel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[3/4] w-full max-h-[32rem] sm:aspect-[4/5]">
        {images.map((image, index) => {
          const isActive = index === active;
          return (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${total}`}
              aria-hidden={!isActive}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl font-bold leading-none text-brand-blue shadow-md transition hover:bg-white md:left-3"
            onClick={() => goTo(active - 1)}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-xl font-bold leading-none text-brand-blue shadow-md transition hover:bg-white md:right-3"
            onClick={() => goTo(active + 1)}
            aria-label="Imagen siguiente"
          >
            ›
          </button>

          <div
            className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2"
            role="tablist"
            aria-label="Seleccionar imagen"
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                role="tab"
                className={`h-2 shrink-0 rounded-full transition-all ${
                  index === active
                    ? 'w-7 bg-brand-green'
                    : 'w-2 bg-white/90 hover:bg-white'
                }`}
                onClick={() => goTo(index)}
                aria-label={image.alt}
                aria-selected={index === active}
              />
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {current.alt}
          </p>
        </>
      )}
    </div>
  );
}
