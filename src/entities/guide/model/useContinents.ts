import { useEffect, useState } from 'react'
import { startTransition } from 'react'
import { getContinents } from './guideActions'
import type { Continent } from './types'

/**
 * Загружает список континентов из IDB при монтировании.
 * Обновление state в effect обёрнуто в startTransition, чтобы избежать каскадного ре-рендера (ESLint)
 */
export function useContinents(): { data: Continent[]; isLoading: boolean } {
  const [data, setData] = useState<Continent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getContinents()
      .then(list => {
        if (isMounted) {
          startTransition(() => setData(list))
        }
      })
      .finally(() => {
        if (isMounted) {
          startTransition(() => setIsLoading(false))
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  return { data, isLoading }
}
