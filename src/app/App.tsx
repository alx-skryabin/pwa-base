import React from 'react'
import { ThemeProvider } from '@app/providers/ThemeProvider.tsx'
import { PWAProvider } from '@app/providers/PWAProvider.tsx'
import { RouterProvider } from 'react-router'
import { router } from '@app/routes'
import '../main.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <ThemeProvider>
        <PWAProvider>
          <RouterProvider router={router} />
        </PWAProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
