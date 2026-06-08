import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3008,
    host: '0.0.0.0'
  },
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          form: ['react-hook-form', 'zod', '@hookform/resolvers'],
          animation: ['framer-motion', 'react-intersection-observer'],
          swiper: ['swiper']
        }
      }
    },
    assetsInlineLimit: 4096
  }
})