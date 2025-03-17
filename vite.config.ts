import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    lib: {
      entry: 'src/embed.tsx',
      name: 'BoltPlayer',
      fileName: (format) => `embed.${format}.js`,
      formats: ['iife', 'es']
    },
    rollupOptions: {
      output: {
        extend: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'embed.css';
          return assetInfo.name;
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
    cssCodeSplit: false
  }
});