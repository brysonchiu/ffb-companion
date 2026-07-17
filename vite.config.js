import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Matches the default CRA port
    open: true, // Automatically opens the app in your browser
  },
  build: {
    outDir: 'build', // Mimics CRA's default build folder name instead of Vite's 'dist'
  },
});
