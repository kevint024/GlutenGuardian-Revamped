import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), {
    name: 'cloudflare-spa-fallback',
    closeBundle() {
      // Cloudflare Pages serves 200.html as SPA fallback for unmatched routes
      copyFileSync(
        resolve(__dirname, 'dist/index.html'),
        resolve(__dirname, 'dist/200.html')
      )
    },
  }, cloudflare()],
  server: {
    host: true,
    port: 5173,
  },
})