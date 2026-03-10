import type { OpenDbOptions } from './types'
import { openDb } from './openDb'

/**
 * Открывает БД, выполняет callback с db, закрывает в finally.
 * Удобно для разовых операций без ручного open/close.
 */
export async function runWithDb<T>(
  options: OpenDbOptions,
  fn: (db: IDBDatabase) => Promise<T>
): Promise<T> {
  const db = await openDb(options)
  try {
    return await fn(db)
  } finally {
    db.close()
  }
}
