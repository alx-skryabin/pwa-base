import { useContext } from 'react'
import { PWAContext } from '@app/pwa/context.ts'

export const usePWA = () => {
  const context = useContext(PWAContext)
  if (!context) {
    throw new Error('usePWA must be used within a PWAProvider')
  }
  return context
}
