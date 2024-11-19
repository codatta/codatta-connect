import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import tailwindcss from "tailwindcss"

export default defineConfig({

  build: {

    lib: {
      entry: path.resolve('./', './lib/main.ts'),
      name: 'xny-connect',
      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    emptyOutDir: true,
  },

  plugins: [react(), dts()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  }
})
