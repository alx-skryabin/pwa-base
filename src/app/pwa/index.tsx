import React, { PropsWithChildren } from 'react'
import { usePWAInit } from '@app/pwa/usePWAInit.ts'
import { PWAContext } from '@app/pwa/context.ts'
import PromptPWAInstall from '@features/PromptPWAInstall'
import PWAInstructionsModal from '@app/pwa/modal.tsx'

export const PWAProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const data = usePWAInit()

  return (
    <PWAContext.Provider value={data}>
      <div className="pwa-container">
        <PromptPWAInstall />
        <PWAInstructionsModal />
      </div>

      {children}
    </PWAContext.Provider>
  )
}
