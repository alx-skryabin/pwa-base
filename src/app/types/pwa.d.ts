import type { BeforeInstallPromptEvent } from '@shared/libs/pwa'

declare global {
  interface Window {
    /** Событие beforeinstallprompt, сохранённое до загрузки React (см. index.html) */
    __PWA_INSTALL_PROMPT__?: BeforeInstallPromptEvent | null
  }
}

export {}
