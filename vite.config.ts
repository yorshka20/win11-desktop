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
          react: ['react', 'react-dom'],
          'style-vendors': [
            'styled-components',
            '@emotion/styled',
            '@emotion/react',
            '@mui/joy',
            '@mui/styled-engine-sc',
            '@mui/icons-material',
          ],
          interacts: ['re-resizable', 'react-draggable'],
          'common-vendors': ['lodash-es', 'moment'],
        },
      },
    },
  },
});
