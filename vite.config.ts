import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  appType: 'spa',
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    host: true,
    port: 8080
  }
});