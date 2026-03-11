import React, { PropsWithChildren } from 'react'
import { usePWAInit } from '@app/pwa/usePWAInit.ts'
import { PWAContext } from '@app/pwa/context.ts'
import PromptPWAInstall from '@features/PromptPWAInstall'

export const PWAProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    isOnline,
    isInstallable,
    isInstalled,
    showInstallInstructions,
    installEvent,
    promptInstall,
  } = usePWAInit()

  return (
    <PWAContext.Provider
      value={{
        isOnline,
        isInstalled,
        isInstallable,
        showInstallInstructions,
        promptInstall,
        installEvent,
      }}
    >
      <div className="pwa-container">
        <PromptPWAInstall />
      </div>

      {children}
    </PWAContext.Provider>
  )
}
