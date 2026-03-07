import { openDb, bulkPut, count, DB_VERSION } from '@shared/libs/indexedDb'
import { GUIDE_STORE_NAMES, type GuideStoreName, type GuideRecord } from '@entities/guide'
import { storeLogger } from '@shared/libs/logger'

import continentsData from '@assets/guide/guide-continents.json'
import countriesData from '@assets/guide/guide-countries.json'
import regionsData from '@assets/guide/guide-regions.json'

/** Данные для первичного заполнения store; ключи должны совпадать с GUIDE_STORE_NAMES.
 * При добавлении справочника — импорт + запись сюда. */
const GUIDE_DATA: Record<GuideStoreName, GuideRecord[]> = {
  continents: continentsData as GuideRecord[],
  countries: countriesData as GuideRecord[],
  regions: regionsData as GuideRecord[],
}

function createStores(db: IDBDatabase): void {
  for (const storeName of GUIDE_STORE_NAMES) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'id' })
    }
  }
}

/**
 * Создаёт/открывает БД справочников по имени, при апгрейде версии пересоздаёт все store.
 * Пустые store заполняет данными из GUIDE_DATA (JSON). Имя БД обычно берётся из useMetaApp().name.
 */
export async function initGuideDb(name: string): Promise<void> {
  const db = await openDb({
    name: name,
    version: DB_VERSION,
    storeNames: [...GUIDE_STORE_NAMES],
    onUpgradeNeeded(db, oldVersion, newVersion) {
      storeLogger.info(`Guide DB upgrade: ${oldVersion} -> ${newVersion}`)
      // Пересоздаём все store при смене версии
      const names = Array.from(db.objectStoreNames)
      for (const name of names) {
        db.deleteObjectStore(name)
      }
      createStores(db)
    },
  })

  try {
    for (const storeName of GUIDE_STORE_NAMES) {
      const existing = await count(db, storeName)
      if (existing === 0) {
        const items = GUIDE_DATA[storeName]
        if (items?.length) {
          await bulkPut(db, storeName, items)
          storeLogger.info(`Added ${storeName}: ${items.length} records`)
        }
      }
    }
  } finally {
    db.close()
  }
}
