interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent
}

declare global {
  interface Window {
    /** Событие beforeinstallprompt, сохранённое до загрузки React (см. index.html) */
    __PWA_INSTALL_PROMPT__?: BeforeInstallPromptEvent | null
  }
}

export {}
