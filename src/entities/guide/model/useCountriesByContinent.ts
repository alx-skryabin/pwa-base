import { useEffect, useState } from 'react'
import { startTransition } from 'react'
import { getCountriesByContinent } from './guideActions'
import type { Country } from './types'

/**
 * Загружает страны выбранного континента из IDB. При continentId === null возвращает { data: [], isLoading: false }.
 * Все setState в effect обёрнуты в startTransition, чтобы избежать каскадного ре-рендера (ESLint).
 */
export function useCountriesByContinent(continentId: number | null): {
  data: Country[]
  isLoading: boolean
} {
  const [data, setData] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (continentId === null) {
      startTransition(() => {
        setData([])
        setIsLoading(false)
      })
      return
    }

    let isMounted = true
    startTransition(() => setIsLoading(true))

    getCountriesByContinent(continentId)
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
  }, [continentId])

  return { data, isLoading }
}
