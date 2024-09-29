import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Carpeta de salida
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')  // Especifica el archivo "index.html" dentro de "src"
      }
    }
  }
});