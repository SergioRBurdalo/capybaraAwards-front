import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src',  // Define la raíz en la carpeta "src"
  build: {
    outDir: '../dist',  // La salida irá a "../dist" fuera de la carpeta src
    emptyOutDir: true,  // Limpia la carpeta "dist" antes de generar nuevos archivos
  }
});
