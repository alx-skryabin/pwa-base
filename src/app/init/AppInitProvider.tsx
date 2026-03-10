import React, { useEffect, useState } from 'react'
import { initGuideDb } from './initGuideDb'
import { SplashScreen } from './SplashScreen'
import { logsLogger, storeLogger } from '@shared/libs/logger'
import { ErrorScreen } from '@app/init/ErrorScreen.tsx'
import { useMetaApp } from '@shared/hooks/useMetaApp.ts'

interface AppInitProviderProps {
  children: React.ReactNode
}

/** Минимальное время показа splash (мс), чтобы не мелькать при быстрой инициализации. */
const MIN_DELAY = 1000

/**
 * Показывает splash до завершения инициализации (IndexedDB),
 * затем рендерит children (далее SessionProvider решает: login или home).
 */
export const AppInitProvider: React.FC<AppInitProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { name } = useMetaApp()

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const initialize = async () => {
      try {
        // Запускаем инициализацию БД
        const initPromise = initGuideDb(name)

        // Создаем фейковую задержку
        const delayPromise = new Promise<void>(resolve => {
          timeoutId = setTimeout(resolve, MIN_DELAY)
        })

        // Ждем выполнения обеих операций
        logsLogger.time('Loading tables')
        await Promise.all([initPromise, delayPromise])
        logsLogger.timeEnd('Loading tables')

        if (!isMounted) return

        setIsReady(true)
      } catch (err) {
        if (!isMounted) return

        const error = err instanceof Error ? err : new Error(String(err))
        storeLogger.error('Tables idb init failed:', error)
        setError(error)
      }
    }

    initialize()

    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [name])

  if (error) {
    return <ErrorScreen />
  }

  if (!isReady) {
    return <SplashScreen />
  }

  return <>{children}</>
}
