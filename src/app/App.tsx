import React from 'react'
import { ErrorBoundary } from '@app/error'
import { RouterProvider } from 'react-router'
import { PWAProvider } from '@app/pwa'
import { ThemeProvider } from '@app/theme'
import { AppInitProvider } from '@app/init'
import { SessionProvider } from '@entities/session'
import { router } from '@app/routes'
import { uiLogger } from '@shared/libs/logger'

const App: React.FC = () => {
  uiLogger.debug('Render:', App.name)

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppInitProvider>
          <PWAProvider>
            <SessionProvider>
              <RouterProvider router={router} />
            </SessionProvider>
          </PWAProvider>
        </AppInitProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
