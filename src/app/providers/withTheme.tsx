import React from 'react'
import { ThemeProvider } from '@/shared/libs/theme'

export const withTheme = (component: () => React.ReactNode) => () => (
  <ThemeProvider>{component()}</ThemeProvider>
)
