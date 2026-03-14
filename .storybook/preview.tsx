import type { Preview } from '@storybook/react-vite'
import React from 'react'

// Стили canvas (полная ширина)
import './preview.css'
// Глобальные стили приложения (темы и переменные)
import 'antd/dist/reset.css'
import '@app/styles/variables.css'
import '@shared/libs/theme/style/theme.css'
import { ThemeProvider } from '@shared/libs/theme'

const LOCALSTORAGE_NAME = 'theme'

function withTheme(Story: React.FC, context: { globals?: { theme?: string } }) {
  const theme = context.globals?.theme ?? 'dark'
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCALSTORAGE_NAME, theme)
  }
  return (
    <ThemeProvider key={theme}>
      <div
        style={{
          padding: '1.5rem',
          minHeight: '100vh',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Тема приложения',
      toolbar: {
        title: 'Тема',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Светлая' },
          { value: 'dark', title: 'Тёмная' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
