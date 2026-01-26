import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-nojekyll',
      closeBundle() {
        // Copiar .nojekyll a dist para GitHub Pages
        try {
          copyFileSync(
            join(process.cwd(), '.nojekyll'),
            join(process.cwd(), 'dist', '.nojekyll')
          )
          console.log('✓ .nojekyll copiado a dist')
        } catch (error) {
          console.warn('⚠ No se pudo copiar .nojekyll:', error.message)
        }
      }
    }
  ],
  // IMPORTANTE: Cambia esto al nombre EXACTO de tu repositorio en GitHub
  // Si tu repositorio se llama "pepes-toys", cambia a: base: '/pepes-toys/'
  // Si tu repositorio se llama "Pepetoys-website", deja como está
  base: '/Pepetoys-website/',
})

