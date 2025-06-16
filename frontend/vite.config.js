import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://data-visualization-dashboard-29c2.onrender.com', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
