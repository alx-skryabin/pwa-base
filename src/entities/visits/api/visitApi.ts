import { runWithDb, getAll, getAllByIndex } from '@shared/libs/indexedDb'
import type { Visit } from '../model/types'
import { guideApi } from '@entities/guide'
import { VISITS_STORE } from '@shared/libs/indexedDb/config/storeNames.ts'
import { COUNTRY_ID_IDX } from '@shared/libs/indexedDb/config/storeIndexes.ts'

export const visitApi = {
  /**
   * Получает все посещения из IndexedDB
   */
  async getVisitsFromDb(): Promise<Visit[]> {
    return runWithDb(db => getAll<Visit>(db, VISITS_STORE))
  },

  /**
   * Получает посещения по стране из IndexedDB
   */
  async getVisitsByCountry(countryId: number): Promise<Visit[]> {
    return runWithDb(db => getAllByIndex<Visit>(db, VISITS_STORE, COUNTRY_ID_IDX, countryId))
  },

  /**
   * Получает регионы и посещения параллельно
   */
  async getRegionsAndVisits() {
    return Promise.all([guideApi.getRegionsRus(), this.getVisitsFromDb()])
  },
}
