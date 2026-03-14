import { bulkPut, count } from '@shared/libs/indexedDb'
import { GUIDE_STORE_NAMES } from '@shared/libs/indexedDb'
import { storeLogger } from '@shared/libs/logger'
import type { GuideStoreName } from '@shared/libs/indexedDb'
import { GuideRecord } from '@entities/guide'

// Импорты данных
import continentsData from '@shared/assets/data-guides/continents.json'
import countriesData from '@shared/assets/data-guides/countries.json'
import regionsRusData from '@shared/assets/data-guides/regions-rus.json'

/** Данные для первичного заполнения store */
const GUIDE_DATA: Record<GuideStoreName, GuideRecord[]> = {
  continents: continentsData as GuideRecord[],
  countries: countriesData as GuideRecord[],
  regionsRus: regionsRusData as GuideRecord[],
}

export const guideSeeder = {
  /**
   * Заполняет справочники, если они пусты
   */
  async seed(db: IDBDatabase): Promise<void> {
    for (const storeName of GUIDE_STORE_NAMES) {
      const existing = await count(db, storeName)

      if (existing === 0) {
        const items = GUIDE_DATA[storeName]
        if (items?.length) {
          await bulkPut(db, storeName, items)
          storeLogger.info(`Seeded ${storeName}: ${items.length} records`)
        }
      }
    }
  },

  /**
   * Принудительно перезаполняет справочники
   */
  async reseed(db: IDBDatabase): Promise<void> {
    for (const storeName of GUIDE_STORE_NAMES) {
      const items = GUIDE_DATA[storeName]
      if (items?.length) {
        await bulkPut(db, storeName, items)
        storeLogger.info(`Reseeded ${storeName}: ${items.length} records`)
      }
    }
  },
}
