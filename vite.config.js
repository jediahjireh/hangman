import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
// explicitly declare Bootstrap as an external module
build: {
    rollupOptions: {
      external: [
        'bootstrap/dist/css/bootstrap.min.css',
      ],
    },
  },
});
