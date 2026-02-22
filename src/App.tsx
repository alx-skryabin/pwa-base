import React from 'react'
import ThemeToggle from './components/ThemeToggle/ThemeToggle.tsx'
import { PWAProvider } from './core/pwa/PWAProvider.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'
import './main.css'

const App: React.FC = () => {
  return (
    <div className="app">
      <ThemeProvider>
        <PWAProvider>
          <ThemeToggle />
        </PWAProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
