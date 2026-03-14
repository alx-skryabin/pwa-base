/**
 * Событие установки PWA (beforeinstallprompt)
 */
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

/**
 * Состояние PWA
 */
export interface PWAState {
  isOnline: boolean
  isInstallable: boolean
  isInstalled: boolean
  showInstallInstructions: boolean
  installEvent: BeforeInstallPromptEvent | null
  openModal: boolean
}

/**
 * Контекст PWA
 */
export interface PWAContextValue extends PWAState {
  promptInstall: () => Promise<void>
  setOpenModal: (state: boolean) => void
}

/**
 * Результат хука инициализации
 */
export type PWAInitResult = PWAContextValue

/**
 * Статус сети
 */
export type NetworkStatus = 'online' | 'offline'
