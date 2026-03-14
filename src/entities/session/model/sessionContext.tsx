import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { SessionState, SessionUser } from './types'
import type { SessionContextValue } from './context'
import { SessionContext } from './context'
import { authLogger, storeLogger } from '@shared/libs/logger'
import { readCurrentUser, writeToStores, clearStoresList, type UserRecord } from './sessionActions'
import { SESSION_STORE_NAMES, USER_STORE_KEY } from '@shared/libs/indexedDb'
import visitsData from '@shared/assets/data-user/visits.json'
import type { Visit } from '@entities/user'

function toSessionUser(record: UserRecord): SessionUser {
  return {
    id: String(record.id),
    login: record.login,
    name: record.name,
    role: record.role,
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
    let isMounted = true
    readCurrentUser<UserRecord>()
      .then(record => {
        if (!isMounted) return
        const user = record ? toSessionUser(record) : null
        authLogger.info(user ? 'Session recovery from IDB' : 'No session', user)
        setState({
          user,
          isAuthenticated: !!user,
          isInitialized: true,
        })
      })
      .catch(err => {
        if (!isMounted) return
        storeLogger.error('Session read failed', err)
        setState({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        })
      })
    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (user: SessionUser): Promise<void> => {
    authLogger.info('Login')
    const userRecord: UserRecord = {
      id: USER_STORE_KEY,
      login: user.login,
      name: user.name,
      role: user.role,
    }
    const visits = visitsData as Visit[]
    await writeToStores({
      user: [userRecord],
      visits: visits.length ? visits : [],
    })
    setState({
      user,
      isAuthenticated: true,
      isInitialized: true,
    })
  }, [])

  const logout = useCallback(() => {
    authLogger.info('Logout')
    clearStoresList(SESSION_STORE_NAMES)
      .then(() => {
        setState({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        })
      })
      .catch(err => {
        storeLogger.error('Logout clear failed', err)
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
