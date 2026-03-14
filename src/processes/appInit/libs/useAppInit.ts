import { useState, useEffect } from 'react'
import { guideSeeder, initDb, setAppDbOptions } from '@shared/libs/indexedDb'
import { logsLogger } from '@shared/libs/logger'
import { reportError } from '@shared/libs/errorReporting'

interface UseAppInitResult {
  isReady: boolean
  error: Error | null
}

const MIN_DELAY = 1000

/**
 * Хук для инициализации приложения
 * Управляет процессом загрузки БД и справочников
 */
export function useAppInit(appName: string): UseAppInitResult {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const initialize = async () => {
      try {
        // Инициализация БД
        logsLogger.time('DB Initialization')
        const initPromise = initDb(appName)

        // Минимальная задержка для UX
        const delayPromise = new Promise<void>(resolve => {
          timeoutId = setTimeout(resolve, MIN_DELAY)
        })

        const db = await initPromise
        await Promise.all([guideSeeder.seed(db), delayPromise])

        logsLogger.timeEnd('DB Initialization')

        if (!isMounted) return

        setAppDbOptions({ name: appName })
        setIsReady(true)
      } catch (err) {
        if (!isMounted) return

        const error = err instanceof Error ? err : new Error(String(err))
        reportError('react:app', error)
        setError(error)
      } finally {
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    initialize()

    return () => {
      isMounted = false
    }
  }, [appName])

  return { isReady, error }
}
