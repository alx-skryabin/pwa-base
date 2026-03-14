import { useContext } from 'react'
import { PWAContext } from '../ui/PWAContext'
import type { PWAContextValue } from '../model/types'

export const usePWA = (): PWAContextValue => {
  const context = useContext(PWAContext)

  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider')
  }

  return context
}
