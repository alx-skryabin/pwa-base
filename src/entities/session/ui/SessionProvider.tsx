import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SessionContext } from '../model/context'
import { sessionModel } from '../model/sessionModel'
import { sessionApi } from '../api/sessionApi'
import { authLogger, storeLogger } from '@shared/libs/logger'
import type { SessionState, SessionUser } from '../model/types'

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

  // Инициализация сессии
  useEffect(() => {
    let isMounted = true

    const initializeSession = async () => {
      try {
        const user = await sessionModel.getInitialSessionData()

        if (!isMounted) return

        authLogger.info(user ? 'Session recovered' : 'No session', user)
        setState({
          user,
          isAuthenticated: !!user,
          isInitialized: true,
        })
      } catch (err) {
        if (!isMounted) return

        storeLogger.error('Session initialization failed', err)
        setState({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        })
      }
    }

    initializeSession()

    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (user: SessionUser): Promise<void> => {
    try {
      const data = sessionModel.prepareLoginData(user)
      await sessionApi.writeToStores(data)

      setState({
        user,
        isAuthenticated: true,
        isInitialized: true,
      })

      authLogger.info('Login successful', user)
    } catch (error) {
      authLogger.error('Login failed', error)
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    authLogger.info('Logout')

    sessionModel
      .clearSessionData()
      .then(() => {
        setState({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        })
        authLogger.info('Logout successful')
      })
      .catch(err => {
        storeLogger.error('Logout failed', err)
        // Все равно сбрасываем состояние
        setState({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        })
      })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout]
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
