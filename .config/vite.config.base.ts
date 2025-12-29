import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
  },
  resolve: {
    alias: {},
  },
  optimizeDeps: {
    include: [],
  },
});
