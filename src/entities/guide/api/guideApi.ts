import { runWithDb, getAll, getAllByIndex } from '@shared/libs/indexedDb'
import type { Continent, Country, RegionRus } from '../model/types'
import {
  CONTINENTS_STORE,
  COUNTRIES_STORE,
  REGIONS_RUS_STORE,
} from '@shared/libs/indexedDb/config/storeNames.ts'
import { CONTINENT_ID_IDX } from '@shared/libs/indexedDb/config/storeIndexes.ts'

/**
 * API слой для работы с данными guide
 * Содержит только прямые запросы к данным, без бизнес-логики
 */
export const guideApi = {
  /**
   * Загружает все континенты из IndexedDB.
   */
  async getContinents(): Promise<Continent[]> {
    return runWithDb(db => getAll<Continent>(db, CONTINENTS_STORE))
  },

  /**
   * Загружает страны континента по индексу continentId
   */
  async getCountriesByContinent(continentId: number): Promise<Country[]> {
    return runWithDb(db =>
      getAllByIndex<Country>(db, COUNTRIES_STORE, CONTINENT_ID_IDX, continentId)
    )
  },

  /**
   * Загружает страну по ID
   */
  async getCountryById(id: number): Promise<Country | null> {
    return runWithDb(async db => {
      const store = db.transaction(COUNTRIES_STORE, 'readonly').objectStore(COUNTRIES_STORE)
      return new Promise((resolve, reject) => {
        const request = store.get(id)
        request.onsuccess = () => resolve(request.result || null)
        request.onerror = () => reject(request.error)
      })
    })
  },

  /**
   * Загружает все регионы из справочника
   */
  async getRegionsRus(): Promise<RegionRus[]> {
    return runWithDb(db => getAll<RegionRus>(db, REGIONS_RUS_STORE))
  },
}
