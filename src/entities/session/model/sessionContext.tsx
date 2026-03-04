import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { SessionState, SessionUser } from './types'
import type { SessionContextValue } from './context'
import { SessionContext } from './context'
import { authLogger, storeLogger } from '@shared/libs/logger'

const STORAGE_KEY = 'app_session'

function readSessionFromStorage(): SessionUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as unknown
    if (data && typeof data === 'object' && 'id' in data && 'login' in data) {
      return { id: String((data as SessionUser).id), login: String((data as SessionUser).login) }
    }
    return null
  } catch {
    return null
  }
}

function saveSessionToStorage(user: SessionUser | null): void {
  if (typeof window === 'undefined') return
  if (user) {
    storeLogger.info(STORAGE_KEY, user)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}

const initialState: SessionState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
}

interface SessionProviderProps {
  children: React.ReactNode
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [state, setState] = useState<SessionState>(initialState)

  useEffect(() => {
    const user = readSessionFromStorage()
    authLogger.info(user ? 'Session recovery' : 'Session failed', user)
    queueMicrotask(() => {
      setState({
        user,
        isAuthenticated: !!user,
        isInitialized: true,
      })
    })
  }, [])

  const login = useCallback((user: SessionUser) => {
    authLogger.info('Login successful')
    saveSessionToStorage(user)
    setState({
      user,
      isAuthenticated: true,
      isInitialized: true,
    })
  }, [])

  const logout = useCallback(() => {
    authLogger.info('Logout successful')
    saveSessionToStorage(null)
    setState({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    })
  }, [])

  const value = useMemo<SessionContextValue>(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout]
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
