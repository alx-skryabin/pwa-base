import type { NetworkStatus } from './types'

export const pwaModel = {
  /**
   * Проверяет, установлено ли приложение
   */
  checkIfInstalled(): boolean {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isNavStandalone = window.navigator.standalone
    const isUrlStandalone = window.location.href.includes('standalone')

    return isStandalone || isNavStandalone || isUrlStandalone
  },

  /**
   * Проверяет наличие манифеста
   */
  hasManifest(): boolean {
    const link = document.querySelector('link[rel="manifest"]')
    return !!link?.getAttribute('href')
  },

  /**
   * Определяет, нужно ли показывать инструкцию
   */
  shouldShowInstructions(
    isInstalled: boolean,
    hasInstallEvent: boolean,
    hasManifest: boolean
  ): boolean {
    return !isInstalled && !hasInstallEvent && hasManifest
  },

  /**
   * Обрабатывает результат установки
   */
  handleInstallResult(outcome: 'accepted' | 'dismissed'): boolean {
    return outcome === 'accepted'
  },

  /**
   * Получает статус сети
   */
  getNetworkStatus(): NetworkStatus {
    return navigator.onLine ? 'online' : 'offline'
  },
}
