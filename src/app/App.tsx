import React from 'react'
import { RouterProvider } from 'react-router'
import { PWAProvider } from '@app/pwa'
import { ThemeProvider } from '@app/theme'
import { router } from '@app/routes'
import { uiLogger } from '@shared/libs/logger'

const App: React.FC = () => {
  uiLogger.debug('Render:', App.name)

  return (
    <ThemeProvider>
      <PWAProvider>
        <RouterProvider router={router} />
      </PWAProvider>
    </ThemeProvider>
  )
}

export default App
