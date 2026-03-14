import { useEffect, useState, startTransition } from 'react'
import { visitModel } from '@entities/visits'
import type { RegionRusWithMagnet } from '../model/types'

/**
 * Хук для загрузки регионов РФ с флагом isMagnet из посещений пользователя.
 *
 * @example
 * const { data, isLoading } = useRegionRusWithMagnet()
 */
export function useRegionRusWithMagnet(): {
  data: RegionRusWithMagnet[]
  isLoading: boolean
} {
  const [data, setData] = useState<RegionRusWithMagnet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const regions = await visitModel.getRegionsWithMagnet()

        if (isMounted) {
          startTransition(() => setData(regions))
        }
      } catch (error) {
        console.error('Failed to load regions with magnets:', error)
      } finally {
        if (isMounted) {
          startTransition(() => setIsLoading(false))
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, isLoading }
}
