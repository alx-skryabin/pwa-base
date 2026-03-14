import React from 'react'
import { ErrorBoundary } from '@shared/libs/errorBoundary'
import { ThemeProvider } from '@shared/libs/theme'
import { AppInitProvider } from '@app/init'
import { PWAProvider } from '@app/pwa'
import { SessionProvider } from '@entities/session'
import { RouterProvider } from 'react-router'
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
