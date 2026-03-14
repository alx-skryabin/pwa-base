import { visitApi } from '../api/visitApi'
import type { Visit, RegionRusWithMagnet, VisitsStats } from './types'
import type { RegionRus } from '@entities/guide'

export const visitModel = {
  /**
   * Объединяет регионы с флагами посещений
   */
  mergeRegionsWithVisits(regions: RegionRus[], visits: Visit[]): RegionRusWithMagnet[] {
    const visitByRegionId = new Map(visits.map(v => [v.regionId, v]))

    return regions.map(region => ({
      ...region,
      isMagnet: visitByRegionId.get(region.id)?.isMagnet ?? false,
    }))
  },

  /**
   * Получает регионы с флагами посещений
   */
  async getRegionsWithMagnet(): Promise<RegionRusWithMagnet[]> {
    const [regions, visits] = await visitApi.getRegionsAndVisits()
    return this.mergeRegionsWithVisits(regions, visits)
  },

  /**
   * Фильтрует регионы по наличию магнитности
   */
  filterMagnetRegions(regions: RegionRusWithMagnet[]): RegionRusWithMagnet[] {
    return regions.filter(r => r.isMagnet)
  },

  /**
   * Получает статистику по посещениям
   */
  getVisitsStats(visits: Visit[]): VisitsStats {
    const byCountry = new Map<number, Visit[]>()

    visits.forEach(visit => {
      if (!byCountry.has(visit.countryId)) {
        byCountry.set(visit.countryId, [])
      }
      byCountry.get(visit.countryId)!.push(visit)
    })

    return {
      total: visits.length,
      magnets: visits.filter(v => v.isMagnet).length,
      byRegion: new Map(visits.map(v => [v.regionId, v.isMagnet])),
      byCountry,
    }
  },

  /**
   * Получает посещения для страны
   */
  getVisitsByCountry(visits: Visit[], countryId: number): Visit[] {
    return visits.filter(v => v.countryId === countryId)
  },
}
