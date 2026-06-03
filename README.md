# EMCOSALUD — Sitio web (Astro)

Sitio institucional en **Astro 5** + **React** (islands) para reemplazar/migrar [emcosalud.com.co](https://emcosalud.com.co/).

## Paleta de marca

| Color | HEX | Uso |
|-------|-----|-----|
| Azul | `#053388` | PANTONE 287 C — primario, header, textos destacados |
| Verde | `#45c900` | PANTONE 368 C — CTAs, acentos |

Variables CSS en `src/styles/tokens.css`.

## Logo e iconos

- Logo oficial en `public/images/logo-emcosalud.png` (desde emcosalud.com.co). Sustituye ese archivo si tienes versión SVG o fondo transparente.
- Componente `src/components/brand/Logo.astro` — header y footer.
- Iconos SVG en `src/components/icons/Icon.astro` (calendario, teléfono, hospital, documentos, redes, etc.).
- Menú móvil (React) reutiliza iconos en `src/components/react/Icon.tsx`.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## Estructura

```
src/
  components/
    layout/     # Header, Footer (Astro)
    sections/   # Hero, servicios, blog (Astro)
    react/      # MobileMenu (client:load)
  data/         # Navegación, servicios, sitio
  layouts/      # BaseLayout
  pages/        # Rutas estáticas
```

## Estado actual (base)

- Inicio con hero, acceso directo, servicios y blog (datos de ejemplo).
- Menú desktop + **menú móvil React** (`client:load`).
- Rutas placeholder para trámites, sedes, PQR, estados financieros, etc.

## Próximos pasos (con capturas/contenido)

1. Logo e imágenes oficiales en `public/`.
2. Formularios: citas, PQR, contacto (Contact Form 7 → API o servicio propio).
3. Migración de entradas de blog desde WordPress.
4. Secciones de [clinicaemcosalud.com](https://clinicaemcosalud.com) si se unifican en este sitio.

## Stack

- [Astro](https://astro.build)
- [@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)
- TypeScript
