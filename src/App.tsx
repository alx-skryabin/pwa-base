import React, { useState, useEffect } from 'react'
import { usePWAInstall } from './hooks/usePWAInstall'
import { AppInfo } from './debug/AppInfo.tsx'
import './App.css'

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall()
  const [showInstallGuide, setShowInstallGuide] = useState<boolean>(false)

  // Мониторинг онлайн статуса
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Автоматически показываем гайд установки через 5 секунд
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallGuide(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isInstallable, isInstalled])

  // Функция для ручной установки
  const handleInstall = async () => {
    await promptInstall()
    setShowInstallGuide(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="header-title">
              <h1>Vite PWA Application</h1>
              <div className="pwa-badges">
                {isInstalled && <span className="badge installed">📱 Installed</span>}
                {isInstallable && <span className="badge installable">⬇️ Installable</span>}
                <span className={`badge ${isOnline ? 'online' : 'offline'}`}>
                  {isOnline ? '🟢 Online' : '🔴 Offline'}
                </span>
              </div>
            </div>

            <div className="header-actions">
              {isInstallable && !isInstalled && (
                <button
                  className="btn btn-install"
                  onClick={handleInstall}
                  title="Install App to Home Screen"
                >
                  <span className="btn-icon">📲</span>
                  <span className="btn-text">Install App</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <br />
      </header>

      <main className="app-main">
        <div className="container">
          {/* Баннер с гайдом установки */}
          {showInstallGuide && isInstallable && !isInstalled && (
            <div style={{ border: '1px solid #555' }}>
              <h3>📲 Install Our App!</h3>
              <div>
                <button onClick={handleInstall}>Install Now</button>
                <button onClick={() => setShowInstallGuide(false)}>Maybe Later</button>
                <button onClick={() => setShowInstallGuide(false)}>×</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <br />
        <AppInfo isInstalled={isInstalled} isOnline={isOnline} isInstallable={isInstallable} />
      </footer>
    </div>
  )
}

export default App
