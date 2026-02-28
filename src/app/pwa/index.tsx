import React, { ReactNode } from 'react'
import { usePWAInit } from '@app/pwa/usePWAInit.ts'
import { PWAContext } from '@app/pwa/PWAContext.ts'
import PromptPWAInstall from '@features/PromptPWAInstall'

export const PWAProvider: React.FC = ({ children }: { children: ReactNode }) => {
  const { isOnline, isInstallable, isInstalled, installEvent, promptInstall } = usePWAInit()

  return (
    <PWAContext.Provider
      value={{
        isOnline,
        isInstalled,
        isInstallable,
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
