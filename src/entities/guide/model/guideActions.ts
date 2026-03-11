import { runWithDb, getAll, getAllByIndex } from '@shared/libs/indexedDb'
import type { Continent, Country } from './types'
import { CONTINENT_ID_IDX } from '@shared/libs/indexedDb/storeIndexes.ts'
import { CONTINENTS_STORE, COUNTRIES_STORE } from '@shared/libs/indexedDb/storeNames.ts'

/**
 * Загружает все континенты из IndexedDB.
 */
export async function getContinents(): Promise<Continent[]> {
  return runWithDb(db => getAll<Continent>(db, CONTINENTS_STORE))
}

/**
 * Загружает страны континента по индексу continentId (без перебора всего store).
 */
export async function getCountriesByContinent(continentId: number): Promise<Country[]> {
  return runWithDb(db => getAllByIndex<Country>(db, COUNTRIES_STORE, CONTINENT_ID_IDX, continentId))
}
