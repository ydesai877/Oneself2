import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves a project site (not a user/org site) at
  // https://ydesai877.github.io/weekly-check/ — a subfolder, not the domain
  // root, and the path is case-sensitive. Vite needs to know that so built
  // asset URLs (JS/CSS) are written as /weekly-check/assets/... instead of
  // /assets/..., otherwise they 404 and the page loads blank. Keep this in
  // sync with the exact, exact-case repo name if you ever rename it.
  base: '/weekly-check/',
})
