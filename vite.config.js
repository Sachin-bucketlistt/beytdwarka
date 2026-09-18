import { copyFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { site } from './src/site.config.js'

const rootDir = dirname(fileURLToPath(import.meta.url))

function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const indexPath = resolve(rootDir, 'dist/index.html')
      if (existsSync(indexPath)) {
        copyFileSync(indexPath, resolve(rootDir, 'dist/404.html'))
      }
    },
  }
}

export default defineConfig({
  base: site.base,
  plugins: [react(), githubPagesSpaFallback()],
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
})
