/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#053388',
          'blue-dark': '#032454',
          'blue-light': '#0a4cad',
          green: '#45c900',
          'green-dark': '#369e00',
          'green-light': '#5fe024',
        },
      },
      maxWidth: {
        page: '72rem',
      },
      boxShadow: {
        brand: '0 8px 24px rgba(5, 51, 136, 0.12)',
        'brand-sm': '0 1px 2px rgba(5, 51, 136, 0.08)',
      },
    },
  },
  plugins: [],
};
