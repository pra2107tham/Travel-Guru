import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Proxy API requests to the local backend during development
    }
  },
  build: {
    outDir: 'dist' // Ensure the output directory is set to 'dist'
  }
})
