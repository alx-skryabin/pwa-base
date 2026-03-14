import { get, bulkPut, runWithDb, USER_STORE_KEY, clear } from '@shared/libs/indexedDb'
import { storeLogger } from '@shared/libs/logger'
import { USER_STORE } from '@shared/libs/indexedDb/config/storeNames.ts'

/** Запись в store user: один объект с фиксированным id. */
export interface UserRecord {
  id: number
  login: string
  name: string
  role: number
}

/**
 * API слой для работы с данными сессии
 */
export const sessionApi = {
  /**
   * Читает текущего пользователя из store user.
   */
  async readCurrentUser<T = UserRecord>(): Promise<T | undefined> {
    return runWithDb(db => get<T>(db, USER_STORE, USER_STORE_KEY))
  },

  /**
   * Записывает данные в указанные store.
   */
  async writeToStores(data: Record<string, { id: number }[]>): Promise<void> {
    const storeNames = Object.keys(data)
    if (storeNames.length === 0) return

    return runWithDb(async db => {
      for (const [storeName, items] of Object.entries(data)) {
        if (items.length > 0 && db.objectStoreNames.contains(storeName)) {
          await bulkPut(db, storeName, items)
          storeLogger.info(`Added ${storeName}: ${items.length} records`)
        }
      }
    })
  },

  /**
   * Очищает переданные store.
   */
  async clearStores(storeNames: readonly string[]): Promise<void> {
    if (storeNames.length === 0) return

    return runWithDb(async db => {
      for (const name of storeNames) {
        if (db.objectStoreNames.contains(name)) {
          await clear(db, name)
          storeLogger.info(`Cleared: ${name}`)
        }
      }
    })
  },
}
