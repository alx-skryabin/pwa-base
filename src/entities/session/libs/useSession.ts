import { useContext } from 'react'
import { SessionContext } from '../model/context.ts'

/**
 * Хук для доступа к контексту сессии
 * @throws {Error} если используется вне SessionProvider
 */
export function useSession() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }

  return context
}
