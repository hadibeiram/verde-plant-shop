import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// base: './' makes the built asset paths relative, so the site works whether it
// is hosted at a domain root, in a GitHub Pages project subfolder, or opened
// from the file system. Combined with HashRouter this means the TA can test
// every route (including on refresh) with no server configuration.
//
// viteSingleFile inlines the built JS and CSS straight into index.html. The
// whole app ships as one self-contained file, so a cached copy of the page can
// never point at a script that no longer exists on the server.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
})
