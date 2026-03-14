import React from 'react'
import { PWAProvider } from '@shared/libs/pwa'

export const withPWA = (component: () => React.ReactNode) => () => (
  <PWAProvider>{component()}</PWAProvider>
)
