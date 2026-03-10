import type { OpenDbOptions } from './types'
import { openDb } from './openDb'
import { getAppDbOptions } from './appDbConfig'
import { ALL_STORE_NAMES } from './storeNames'

/**
 * Открывает БД приложения (опции заданы один раз через setAppDbOptions в AppInitProvider),
 * выполняет callback с db, закрывает в finally. Не нужно передавать options в каждый вызов.
 */
export async function runWithDb<T>(fn: (db: IDBDatabase) => Promise<T>): Promise<T>

/**
 * Открывает БД с явными options (для init и случаев до setAppDbOptions).
 */
export async function runWithDb<T>(
  options: OpenDbOptions,
  fn: (db: IDBDatabase) => Promise<T>
): Promise<T>

export async function runWithDb<T>(
  optionsOrFn: OpenDbOptions | ((db: IDBDatabase) => Promise<T>),
  fn?: (db: IDBDatabase) => Promise<T>
): Promise<T> {
  let options: OpenDbOptions
  let callback: (db: IDBDatabase) => Promise<T>

  if (typeof optionsOrFn === 'function') {
    const app = getAppDbOptions()
    options = {
      name: app.name,
      version: app.version,
      storeNames: [...ALL_STORE_NAMES],
    }
    callback = optionsOrFn
  } else {
    options = optionsOrFn
    callback = fn!
  }

  const db = await openDb(options)
  try {
    return await callback(db)
  } finally {
    db.close()
  }
}
