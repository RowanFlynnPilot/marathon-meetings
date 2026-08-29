import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'marathon-meetings' with your actual GitHub repository name
const REPO_NAME = 'marathon-meetings'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
  define: {
    // Stamped into the footer so data staleness is visible at a glance —
    // CI rebuilds on every pipeline run, so build time ≈ data freshness.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
})
