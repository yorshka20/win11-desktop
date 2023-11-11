import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reacts: ['react', 'react-dom'],
          'style-vendors': [
            'styled-components',
            '@emotion/styled',
            '@emotion/react',
            '@mui/joy',
            '@mui/styled-engine-sc',
            '@mui/icons-material',
            '@fontsource/inter',
          ],
          interacts: ['re-resizable', 'react-draggable'],
          'common-vendors': ['lodash-es', 'moment', 'rxjs', 'classnames'],
        },
        chunkFileNames(chunkInfo) {
          if (chunkInfo.facadeModuleId?.includes('/src/assets/')) {
            return `assets/icons/${chunkInfo.name}.js`;
          }

          return `assets/js/${chunkInfo.name}.js`;
        },
        assetFileNames(assetInfo) {
          // icons set
          if (/\.(ico|gif|png|jpe?g|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/icons/${assetInfo.name}`;
          }
          // fonts and others
          if (/\.(woff|woff2)$/.test(assetInfo.name)) {
            return `assets/fonts/${assetInfo.name}`;
          }
          return `assets/${assetInfo.name}`;
        },
      },
    },
  },
});
