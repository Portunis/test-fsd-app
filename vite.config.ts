import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "HackerWeb",
        "short_name": "HackerWeb",
        "start_url": ".",
        "display": "standalone",
        "background_color": "#fff",
        "description": "A readable Hacker News app."
      }
    })

  ],
})
