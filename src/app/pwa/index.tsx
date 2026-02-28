import React, { ReactNode, useEffect, useState } from 'react'
import { usePWAInstall } from '@app/pwa/usePWAInstall.ts'
import { ROUTES } from '@app/routes/path.ts'
import { AppInfo } from '@features/debug/AppInfo.tsx'
import { Button } from 'antd'

export const PWAProvider: React.FC = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall()
  const [showInstallGuide, setShowInstallGuide] = useState<boolean>(false)
  const isDevPage = window.location.pathname === ROUTES.DEV

  // todo сделать контекст и хук для использования состояния на любом уровне
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

  // Автоматически показываем гайд установки через 3 секунд
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallGuide(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isInstallable, isInstalled])

  // Функция для ручной установки
  const handleInstall = async () => {
    await promptInstall()
    setShowInstallGuide(false)
  }

  if (!isDevPage) {
    return children
  }

  return (
    <>
      <div className="pwa-container">
        <div>
          <div>
            {isInstalled && <span>📱 Installed</span>}
            {isInstallable && <span>⬇️ Installable</span>}
            <span>{isOnline ? '🟢 Online' : '🔴 Offline'}</span>
          </div>
        </div>

        <div>
          {isInstallable && !isInstalled && (
            <Button onClick={handleInstall} title="Install App to Home Screen">
              <span>📲</span>
              <span>Install App</span>
            </Button>
          )}
        </div>

        {/* Баннер с гайдом установки */}
        {showInstallGuide && isInstallable && !isInstalled && (
          <div style={{ border: '1px solid #555' }}>
            <h3>📲 Install Our App!</h3>
            <div>
              <Button onClick={handleInstall}>Install Now</Button>
              <Button onClick={() => setShowInstallGuide(false)}>Maybe Later</Button>
              <Button onClick={() => setShowInstallGuide(false)}>×</Button>
            </div>
          </div>
        )}

        <AppInfo isInstalled={isInstalled} isOnline={isOnline} isInstallable={isInstallable} />
      </div>

      {children}
    </>
  )
}
