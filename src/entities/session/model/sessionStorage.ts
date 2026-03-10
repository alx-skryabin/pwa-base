import {
  get,
  bulkPut,
  runWithDb,
  SESSION_STORE_NAMES,
  USER_STORE_KEY,
  clear,
} from '@shared/libs/indexedDb'
import { storeLogger } from '@shared/libs/logger'

/** Запись в store user: один объект с фиксированным id. */
export interface UserRecord {
  id: number
  login: string
  name: string
  role: number
}

export interface RunWithDbOptions {
  dbName: string
  version: number
}

/**
 * Читает текущего пользователя из store user.
 * Всегда открывает БД со всеми SESSION_STORE_NAMES,
 * чтобы при первом открытии создались все store (в т.ч. visits).
 */
export async function readCurrentUser<T = UserRecord>(
  options: RunWithDbOptions
): Promise<T | undefined> {
  return runWithDb(
    { name: options.dbName, version: options.version, storeNames: [...SESSION_STORE_NAMES] },
    db => get<T>(db, 'user', USER_STORE_KEY)
  )
}

/**
 * Записывает данные в указанные store. data[storeName] — массив записей с полем id.
 * Пишет только в существующие store (если store нет — пропускает, без ошибки).
 */
export async function writeToStores(
  options: RunWithDbOptions,
  data: Record<string, { id: number }[]>
): Promise<void> {
  const storeNames = Object.keys(data)
  if (storeNames.length === 0) return
  await runWithDb(
    { name: options.dbName, version: options.version, storeNames: [...SESSION_STORE_NAMES] },
    async db => {
      for (const [storeName, items] of Object.entries(data)) {
        if (items.length > 0 && db.objectStoreNames.contains(storeName)) {
          await bulkPut(db, storeName, items)
          storeLogger.info(`Added ${storeName}: ${items.length} records`)
        }
      }
    }
  )
}

/**
 * Очищает переданные store. Открывает БД со списком этих store (при отсутствии store просто не создаём лишних).
 */
export async function clearStoresList(
  options: RunWithDbOptions,
  storeNames: readonly string[]
): Promise<void> {
  if (storeNames.length === 0) return
  const list = [...storeNames]
  await runWithDb(
    { name: options.dbName, version: options.version, storeNames: list },
    async db => {
      for (const name of list) {
        if (db.objectStoreNames.contains(name)) {
          await clear(db, name)
          storeLogger.info(`Cleared: ${name}`)
        }
      }
    }
  )
}
