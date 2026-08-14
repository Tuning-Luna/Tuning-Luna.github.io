import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This repository is named `<username>.github.io`, so GitHub Pages treats it
  // as a *user site* and serves it from the root URL `https://<username>.github.io/`.
  // `base: '/'` is therefore correct (the default); the explicit setting documents
  // the intent. For a *project* site this would need to be `/<repo-name>/`.
  base: '/',
})
