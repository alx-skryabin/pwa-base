import React from 'react'
import { ThemeProvider } from '@app/providers/ThemeProvider.tsx'
import { PWAProvider } from '@app/providers/PWAProvider.tsx'
import { RouterProvider } from 'react-router'
import { router } from '@app/routes'
import './App.css'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <PWAProvider>
          <RouterProvider router={router} />
        </PWAProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
