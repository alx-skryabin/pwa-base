import { useState, useEffect, useCallback } from 'react'
import { PWAContextType } from '@app/pwa/PWAContext.ts'

export type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export const usePWAInit = (): PWAContextType => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)

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

  // Проверка, установлено ли приложение
  const checkIfInstalled = useCallback(() => {
    // Способ 1: Проверка display-mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches

    // Способ 2: Проверка навигатора
    const isNavStandalone = (window.navigator as any).standalone

    // Способ 3: Проверка по URL
    const isUrlStandalone = window.location.href.includes('standalone')

    return isStandalone || isNavStandalone || isUrlStandalone
  }, [])

  // Проверяем при монтировании
  useEffect(() => {
    setIsInstalled(checkIfInstalled())
  }, [checkIfInstalled])

  // Отслеживаем изменения display-mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)')

    const handleChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches)
    }

    // Современные браузеры
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    }
    // Старые браузеры
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [])

  // Отслеживаем событие beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      console.log('beforeinstallprompt event fired')
      setInstallEvent(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  // Отслеживаем событие appinstalled
  useEffect(() => {
    const handleAppInstalled = () => {
      console.log('PWA was installed')
      setIsInstalled(true)
      setInstallEvent(null)
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!installEvent) {
      console.warn('No install event available')
      return
    }

    try {
      await installEvent.prompt()
      const choiceResult = await installEvent.userChoice

      console.log(`User ${choiceResult.outcome} the install prompt`)

      if (choiceResult.outcome === 'accepted') {
        setInstallEvent(null)
        setIsInstalled(true)
      }
    } catch (error) {
      console.error('Error during install prompt:', error)
    }
  }, [installEvent])

  return {
    isOnline,
    isInstallable: !!installEvent && !isInstalled,
    isInstalled,
    promptInstall,
    installEvent,
  }
}
