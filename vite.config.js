import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Esto se asegura de que todas las rutas sean manejadas por el frontend en Vite
    historyApiFallback: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // Esto puede prevenir problemas con el build
      }
    }
  }
});
