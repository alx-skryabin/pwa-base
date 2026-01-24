import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'robots.txt',
        '*.svg'
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: []
      },
      devOptions: {
        enabled: true, // Включаем PWA в dev режиме
        type: 'module',
        navigateFallback: 'index.html'
      } as any
    })
  ]
})
