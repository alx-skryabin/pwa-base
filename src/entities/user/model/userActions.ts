import { runWithDb, getAll, getAllByIndex } from '@shared/libs/indexedDb'
import type { Visit } from './types'
import type { RegionRus } from '@entities/guide'
import { REGIONS_RUS_STORE, VISITS_STORE } from '@shared/libs/indexedDb/storeNames.ts'
import { COUNTRY_ID_IDX } from '@shared/libs/indexedDb/storeIndexes.ts'

export type RegionRusWithMagnet = RegionRus & Pick<Visit, 'isMagnet'>

/**
 * Загружает все регионы РФ из справочника и добавляет флаг isMagnet из store visits (по regionId).
 */
export async function getRegionsJoinVisits(): Promise<RegionRusWithMagnet[]> {
  return runWithDb(async db => {
    const [regions, visits] = await Promise.all([
      getAll<RegionRus>(db, REGIONS_RUS_STORE),
      getAllByIndex<Visit>(db, VISITS_STORE, COUNTRY_ID_IDX, 1),
    ])
    const visitByRegionId = new Map(visits.map(v => [v.regionId, v]))
    return regions.map(region => ({
      ...region,
      isMagnet: visitByRegionId.get(region.id)?.isMagnet ?? false,
    }))
  })
}
