import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://travel-guru-api.onrender.com/' // Proxy API requests to the local backend during development
    }
  }
})
