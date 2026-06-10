import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://emcosalud.com.co',
  redirects: {
    '/huila-medicamentos': '/medicamentos-huila',
    '/tolima-medicamentos': '/medicamentos-tolima',
  },
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(root, './src'),
      },
      dedupe: ['react', 'react-dom'],
    },
    // Evita que optimizeDeps preempaquete react/jsx-dev-runtime en modo producción
    // (causa "jsxDEV is not a function" en desarrollo).
    optimizeDeps: {
      esbuildOptions: {
        define: {
          'process.env.NODE_ENV': '"development"',
        },
      },
    },
  },
});
