import type { RegionRus } from '@entities/guide'

/** Одна запись в store visits (и в visits.json) */
export interface Visit {
  id: number
  isMagnet: boolean
  regionId: number
  countryId: number
  continentId: number
}

/** Регион с флагом магнитности (композитный тип) */
export interface RegionRusWithMagnet extends RegionRus {
  isMagnet: boolean
}

/** Статистика по посещениям */
export interface VisitsStats {
  total: number
  magnets: number
  byRegion: Map<number, boolean>
  byCountry: Map<number, Visit[]>
}
