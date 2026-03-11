import { useState, useEffect, useCallback } from 'react'
import { PWAContextType } from '@app/pwa/context.ts'
import { pwaLogger, systemLogger } from '@shared/libs/logger'

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
  const [hasManifest, setHasManifest] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  // Мониторинг онлайн статуса
  useEffect(() => {
    const handleOnline = () => {
      systemLogger.info('Network: online')
      setIsOnline(true)
    }
    const handleOffline = () => {
      systemLogger.info('Network: offline')
      setIsOnline(false)
    }

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
    const isNavStandalone = window.navigator.standalone

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

  // Наличие манифеста (для показа инструкции в браузерах без beforeinstallprompt)
  useEffect(() => {
    const link = document.querySelector('link[rel="manifest"]')
    setHasManifest(!!link?.getAttribute('href'))
  }, [])

  // Отслеживаем событие beforeinstallprompt (Chrome/Edge/Яндекс). Читаем событие, сохранённое до загрузки React (capture-pwa-prompt.js)
  useEffect(() => {
    if (window.__PWA_INSTALL_PROMPT__) {
      pwaLogger.debug('using stored beforeinstallprompt event')
      setInstallEvent(window.__PWA_INSTALL_PROMPT__)
      window.__PWA_INSTALL_PROMPT__ = null
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      pwaLogger.debug('beforeinstallprompt event fired')
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
      pwaLogger.info('PWA was installed')
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
      pwaLogger.warn('No install event available')
      return
    }

    try {
      await installEvent.prompt()
      const choiceResult = await installEvent.userChoice

      pwaLogger.info(`User ${choiceResult.outcome} the install prompt`)

      if (choiceResult.outcome === 'accepted') {
        setInstallEvent(null)
        setIsInstalled(true)
      }
    } catch (error) {
      pwaLogger.error('Error during install prompt:', error)
    }
  }, [installEvent])

  // Установка доступна только когда браузер дал событие beforeinstallprompt (Chrome, Edge, Яндекс).
  const isInstallable = !isInstalled && !!installEvent
  // Показывать инструкцию: приложение не установлено,
  // нативного prompt нет (Firefox, Safari), манифест есть.
  const showInstallInstructions = !isInstalled && !installEvent && hasManifest

  return {
    isOnline,
    isInstallable,
    isInstalled,
    showInstallInstructions,
    promptInstall,
    installEvent,
    openModal,
    setOpenModal,
  }
}
