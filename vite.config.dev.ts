import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss"

export default defineConfig({
  build: {
    emptyOutDir: true,
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://app-test.b18a.io',
        changeOrigin: true,
      },
    }
  },

  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  }
})
