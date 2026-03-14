import { useState, useEffect, useCallback } from 'react'
import { pwaModel } from '../model/pwaModel'
import { pwaLogger, systemLogger } from '@shared/libs/logger'
import type { BeforeInstallPromptEvent, PWAInitResult } from '../model/types'

declare global {
  interface Window {
    __PWA_INSTALL_PROMPT__?: BeforeInstallPromptEvent | null
  }
}

export const usePWAInit = (): PWAInitResult => {
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

  // Отслеживаем display-mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleChange = (e: MediaQueryListEvent) => setIsInstalled(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {}, [])

  // beforeinstallprompt
  useEffect(() => {
    if (window.__PWA_INSTALL_PROMPT__) {
      pwaLogger.debug('Using stored beforeinstallprompt event')
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInstallEvent(window.__PWA_INSTALL_PROMPT__)
      window.__PWA_INSTALL_PROMPT__ = null
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      pwaLogger.debug('beforeinstallprompt event fired')
      setInstallEvent(e as BeforeInstallPromptEvent)
    }

    // Проверка установки
    setIsInstalled(pwaModel.checkIfInstalled())
    // Манифест
    setHasManifest(pwaModel.hasManifest())

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }, [])

  // appinstalled
  useEffect(() => {
    const handleAppInstalled = () => {
      pwaLogger.info('PWA was installed')
      setIsInstalled(true)
      setInstallEvent(null)
    }

    window.addEventListener('appinstalled', handleAppInstalled)
    return () => window.removeEventListener('appinstalled', handleAppInstalled)
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

      if (pwaModel.handleInstallResult(choiceResult.outcome)) {
        setInstallEvent(null)
        setIsInstalled(true)
      }
    } catch (error) {
      pwaLogger.error('Error during install prompt:', error)
    }
  }, [installEvent])

  const isInstallable = !isInstalled && !!installEvent
  const showInstallInstructions = pwaModel.shouldShowInstructions(
    isInstalled,
    !!installEvent,
    hasManifest
  )

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
