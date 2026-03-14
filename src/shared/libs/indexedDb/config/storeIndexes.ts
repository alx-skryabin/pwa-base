/**
 * Единое описание индексов по store. Используется при создании таблиц в createStores.
 * keyPath — путь к полю; для массивов (например searchCodes) задаётся multiEntry: true.
 */

/** Названия индексов **/
export const CONTINENT_ID_IDX = 'continentId' as const
export const SEARCH_CODES_IDX = 'searchCodes' as const
export const REGION_ID_IDX = 'regionId' as const
export const COUNTRY_ID_IDX = 'countryId' as const
export const IS_MAGNET_IDX = 'isMagnet' as const

interface StoreIndexSpec {
  name: string
  keyPath: string | string[]
  unique?: boolean
  multiEntry?: boolean
}

/** Индексы по имени store. При добавлении store с индексами — добавить сюда. */
export const STORE_INDEXES: Record<string, StoreIndexSpec[]> = {
  countries: [{ name: CONTINENT_ID_IDX, keyPath: CONTINENT_ID_IDX, unique: false }],
  regionsRus: [
    { name: SEARCH_CODES_IDX, keyPath: SEARCH_CODES_IDX, unique: false, multiEntry: true },
  ],
  visits: [
    { name: REGION_ID_IDX, keyPath: REGION_ID_IDX, unique: false },
    { name: COUNTRY_ID_IDX, keyPath: COUNTRY_ID_IDX, unique: false },
    { name: CONTINENT_ID_IDX, keyPath: CONTINENT_ID_IDX, unique: false },
    { name: IS_MAGNET_IDX, keyPath: IS_MAGNET_IDX, unique: false },
  ],
}
