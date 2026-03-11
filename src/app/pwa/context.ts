import { createContext } from 'react'
import { BeforeInstallPromptEvent } from '@app/pwa/usePWAInit.ts'

export interface PWAContextType {
  isOnline: boolean
  isInstallable: boolean
  isInstalled: boolean
  showInstallInstructions: boolean
  promptInstall: () => Promise<void>
  installEvent: BeforeInstallPromptEvent | null
  openModal: boolean
  setOpenModal: (state: boolean) => void
}

export const PWAContext = createContext<PWAContextType | undefined>(undefined)
