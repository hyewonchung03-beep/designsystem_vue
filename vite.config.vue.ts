import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vue pilot dev server — isolated from vite.config.lib.ts (React library build).
export default defineConfig({
  plugins: [vue()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
});
