import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: './src',
  plugins: [
    vue(),
  ],
});
