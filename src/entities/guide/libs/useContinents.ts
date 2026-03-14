import { useEffect, useState } from 'react'
import { startTransition } from 'react'
import type { Continent } from '../model/types.ts'
import { guideApi } from '@entities/guide'

/**
 * Загружает список континентов из IDB при монтировании.
 * Обновление state в effect обёрнуто в startTransition, чтобы избежать каскадного ре-рендера (ESLint)
 */
export function useContinents(): { data: Continent[]; isLoading: boolean } {
  const [data, setData] = useState<Continent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    guideApi
      .getContinents()
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
