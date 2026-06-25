import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Travel Scheduler',
        short_name: 'Travel',
        description: 'Trip details and packing lists from your Google Sheet',
        theme_color: '#2563eb',
        background_color: '#f5f7fa',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/travel-scheduler/',
        start_url: '/travel-scheduler/',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg}'],
        runtimeCaching: [
          {
            // Cache Google Sheets data for offline use (stale-while-revalidate)
            urlPattern: /^https:\/\/docs\.google\.com\/spreadsheets/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'sheets-data',
              expiration: { maxAgeSeconds: 60 * 60 * 24 }, // 1 day
            },
          },
        ],
      },
    }),
  ],
  base: '/travel-scheduler/',
})
