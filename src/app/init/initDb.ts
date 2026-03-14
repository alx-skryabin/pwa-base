import {
  openDb,
  bulkPut,
  count,
  DB_VERSION,
  ALL_STORE_NAMES,
  GUIDE_STORE_NAMES,
} from '@shared/libs/indexedDb'
import { STORE_INDEXES } from '@shared/libs/indexedDb'
import type { GuideStoreName } from '@shared/libs/indexedDb'
import type { GuideRecord } from '@entities/guide'
import { storeLogger } from '@shared/libs/logger'

import continentsData from '@shared/assets/data-guides/continents.json'
import countriesData from '@shared/assets/data-guides/countries.json'
import regionsRusData from '@shared/assets/data-guides/regions-rus.json'

/** Данные для первичного заполнения store; ключи должны совпадать с GUIDE_STORE_NAMES. */
const GUIDE_DATA: Record<GuideStoreName, GuideRecord[]> = {
  continents: continentsData as GuideRecord[],
  countries: countriesData as GuideRecord[],
  regionsRus: regionsRusData as GuideRecord[],
}

function createStores(db: IDBDatabase): void {
  for (const storeName of ALL_STORE_NAMES) {
    if (!db.objectStoreNames.contains(storeName)) {
      const store = db.createObjectStore(storeName, { keyPath: 'id' })
      const indexes = STORE_INDEXES[storeName]
      if (indexes?.length) {
        for (const idx of indexes) {
          store.createIndex(idx.name, idx.keyPath, {
            unique: idx.unique ?? false,
            multiEntry: idx.multiEntry ?? false,
          })
          storeLogger.info(`Created index: ${storeName}.${idx.name}`)
        }
      } else {
        storeLogger.info(`Created: ${storeName}`)
      }
    }
  }
}

/**
 * Создаёт/открывает БД по имени, при апгрейде версии пересоздаёт все store.
 * Пустые store заполняет данными из GUIDE_DATA (JSON).
 */
export async function initDb(name: string): Promise<void> {
  const db = await openDb({
    name: name,
    version: DB_VERSION,
    storeNames: [...ALL_STORE_NAMES],
    onUpgradeNeeded(db, oldVersion, newVersion) {
      storeLogger.info(`DB upgrade: ${oldVersion} -> ${newVersion}`)
      // Пересоздаём все store при смене версии
      const names = Array.from(db.objectStoreNames)
      for (const name of names) {
        db.deleteObjectStore(name)
      }
      createStores(db)
    },
  })

  try {
    // Заполнение справочников
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
