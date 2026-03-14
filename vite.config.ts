/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/shared/config/testing/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/main.tsx',
        'src/shared/config/testing/**',
      ],
    },
  },
  plugins: [
    react(),
    ...(process.env.STORYBOOK
      ? []
      : [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
              'favicon.svg',
              'apple-touch-icon.png',
              'masked-icon.svg',
              'capture-pwa-prompt.js',
              'robots.txt',
              '*.svg',
            ],
            workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
              runtimeCaching: [],
            },
            devOptions: {
              enabled: true,
              // Включаем PWA в dev режиме
              type: 'module',
              navigateFallback: 'index.html',
            } as any,
          }),
        ]),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@entities': path.resolve(__dirname, './src/entities'),
    },
  },
})
