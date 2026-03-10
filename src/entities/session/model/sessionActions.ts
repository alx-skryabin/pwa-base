import { get, bulkPut, runWithDb, USER_STORE_KEY, clear } from '@shared/libs/indexedDb'
import { storeLogger } from '@shared/libs/logger'

/** Запись в store user: один объект с фиксированным id. */
export interface UserRecord {
  id: number
  login: string
  name: string
  role: number
}

/**
 * Читает текущего пользователя из store user. Опции БД заданы при инициализации приложения.
 */
export async function readCurrentUser<T = UserRecord>(): Promise<T | undefined> {
  return runWithDb(db => get<T>(db, 'user', USER_STORE_KEY))
}

/**
 * Записывает данные в указанные store. Пишет только в существующие store.
 */
export async function writeToStores(data: Record<string, { id: number }[]>): Promise<void> {
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
}

/**
 * Очищает переданные store (только существующие).
 */
export async function clearStoresList(storeNames: readonly string[]): Promise<void> {
  if (storeNames.length === 0) return
  const list = [...storeNames]
  return runWithDb(async db => {
    for (const name of list) {
      if (db.objectStoreNames.contains(name)) {
        await clear(db, name)
        storeLogger.info(`Cleared: ${name}`)
      }
    }
  })
}
