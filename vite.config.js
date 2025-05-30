import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // root: default → project root
  base: '/',
  publicDir: resolve(__dirname, 'src/public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  server: { port: 5173 },
});
