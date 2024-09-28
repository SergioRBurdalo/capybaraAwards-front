import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Sigue siendo la carpeta de salida
    rollupOptions: {
      input: 'src/index.html'  // Especifica el archivo de entrada "index.html" en la carpeta "src"
    }
  }
});
