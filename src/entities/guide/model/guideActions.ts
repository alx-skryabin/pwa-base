import { runWithDb, getAll, getAllByIndex } from '@shared/libs/indexedDb'
import type { Continent, Country } from './types'
import { CONTINENT_ID_IDX } from '@shared/libs/indexedDb/storeIndexes.ts'

/**
 * Загружает все континенты из IndexedDB.
 */
export async function getContinents(): Promise<Continent[]> {
  console.log('getContinents')
  return runWithDb(db => getAll<Continent>(db, 'continents'))
}

/**
 * Загружает страны континента по индексу continentId (без перебора всего store).
 */
export async function getCountriesByContinent(continentId: number): Promise<Country[]> {
  console.log('getCountriesByContinent')
  return runWithDb(db => getAllByIndex<Country>(db, 'countries', CONTINENT_ID_IDX, continentId))
}
