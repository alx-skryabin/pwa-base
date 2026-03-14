import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@app': path.resolve(__dirname, '../src/app'),
          '@processes': path.resolve(__dirname, '../src/processes'),
          '@pages': path.resolve(__dirname, '../src/pages'),
          '@widgets': path.resolve(__dirname, '../src/widgets'),
          '@features': path.resolve(__dirname, '../src/features'),
          '@shared': path.resolve(__dirname, '../src/shared'),
        },
      },
    })
  },
}
export default config
