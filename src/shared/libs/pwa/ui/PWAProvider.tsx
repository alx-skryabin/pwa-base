import React, { PropsWithChildren } from 'react'
import { PWAContext } from './PWAContext'
import { usePWAInit } from '../libs/usePWAInit'
import PromptPWAInstall from '@features/PromptPWAInstall'
import PWAInstructionsModal from './PWAInstructionsModal'

export const PWAProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const value = usePWAInit()

  return (
    <PWAContext.Provider value={value}>
      <div className="pwa-container">
        <PromptPWAInstall />
        <PWAInstructionsModal />
      </div>
      {children}
    </PWAContext.Provider>
  )
}
