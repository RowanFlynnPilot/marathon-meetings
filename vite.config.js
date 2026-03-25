import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'marathon-meetings' with your actual GitHub repository name
const REPO_NAME = 'marathon-meetings'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
})
