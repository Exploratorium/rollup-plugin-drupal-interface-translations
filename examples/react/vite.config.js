import react from '@vitejs/plugin-react';
import drupalInterfaceTranslations from 'rollup-plugin-drupal-interface-translations';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'js',
  build: {
    rollupOptions: {
      input: 'js/src/main.jsx',
      plugins: [drupalInterfaceTranslations()],
    },
  },
});
