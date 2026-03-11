import { useEffect, useState } from 'react'
import { startTransition } from 'react'
import { getRegionsJoinVisits, type RegionRusWithMagnet } from './userActions'

/**
 * Загружает регионы РФ из IDB с флагом isMagnet из посещений пользователя.
 * setState в effect обёрнуты в startTransition (ESLint react-compiler).
 */
export function useRegionRusWithMagnet(): {
  data: RegionRusWithMagnet[]
  isLoading: boolean
} {
  const [data, setData] = useState<RegionRusWithMagnet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getRegionsJoinVisits()
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
