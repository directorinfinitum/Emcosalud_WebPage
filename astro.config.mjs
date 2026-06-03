import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://emcosalud.com.co',
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(root, './src'),
      },
    },
  },
});
