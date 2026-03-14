import { ALL_STORE_NAMES, DB_VERSION, openDb, STORE_INDEXES } from '@shared/libs/indexedDb'
import { storeLogger } from '@shared/libs/logger'

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
        storeLogger.info(`Created store: ${storeName}`)
      }
    }
  }
}

/**
 * Создаёт/открывает БД по имени, при апгрейде версии пересоздаёт все store.
 */
export async function initDb(name: string): Promise<IDBDatabase> {
  return await openDb({
    name,
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
}
