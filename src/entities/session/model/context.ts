import { createContext } from 'react'
import type { SessionState, SessionUser } from './types'

export interface SessionContextValue extends SessionState {
  login: (user: SessionUser) => Promise<void>
  logout: () => void
}

export const SessionContext = createContext<SessionContextValue | null>(null)
