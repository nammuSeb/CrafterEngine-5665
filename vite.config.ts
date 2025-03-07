import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          babylon: [
            '@babylonjs/core',
            '@babylonjs/loaders',
            '@babylonjs/materials',
            '@babylonjs/gui'
          ],
          vendor: [
            'react',
            'react-dom',
            'framer-motion',
            'zustand'
          ]
        }
      }
    }
  }
})