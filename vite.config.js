import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'  // Correctly import the plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], // Use the plugin in the plugins array
base: 'MovieTracker/',
})
