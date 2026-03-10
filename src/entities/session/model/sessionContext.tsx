import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { SessionState, SessionUser } from './types'
import type { SessionContextValue } from './context'
import { SessionContext } from './context'
import { authLogger, storeLogger } from '@shared/libs/logger'
import { readCurrentUser, writeToStores, clearStoresList, type UserRecord } from './sessionStorage'
import { SESSION_STORE_NAMES, USER_STORE_KEY } from '@shared/libs/indexedDb'
import { useAppDb } from '@shared/hooks/useAppDb'
import visitsData from '@assets/data-user/visits.json'

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
  const { dbName, version } = useAppDb()
  const dbOptions = useMemo(() => ({ dbName, version }), [dbName, version])

  useEffect(() => {
    readCurrentUser<UserRecord>(dbOptions)
      .then(record => {
        const user = record ? toSessionUser(record) : null
        authLogger.info(user ? 'Session recovery from IDB' : 'No session', user)
        setState({
          user,
          isAuthenticated: !!user,
          isInitialized: true,
        })
      })
      .catch(err => {
        storeLogger.error('Session read failed', err)
        setState({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        })
      })
  }, [dbOptions])

  const login = useCallback(
    async (user: SessionUser): Promise<void> => {
      authLogger.info('Login')
      const userRecord: UserRecord = {
        id: USER_STORE_KEY,
        login: user.login,
        name: user.name,
        role: user.role,
      }
      const visits = visitsData as { id: number; [key: string]: unknown }[]
      await writeToStores(dbOptions, {
        user: [userRecord],
        visits: visits.length ? visits : [],
      })
      setState({
        user,
        isAuthenticated: true,
        isInitialized: true,
      })
    },
    [dbOptions]
  )

  const logout = useCallback(() => {
    authLogger.info('Logout')
    clearStoresList(dbOptions, SESSION_STORE_NAMES)
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
  }, [dbOptions])

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
