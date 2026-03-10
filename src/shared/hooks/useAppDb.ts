import { useMetaApp } from '@shared/hooks/useMetaApp'
import { DB_VERSION } from '@shared/libs/indexedDb'

/**
 * Возвращает имя и версию БД приложения для использования с openDb / runWithDb.
 * Избавляет от повторения dbName и DB_VERSION в каждом вызове.
 */
export function useAppDb(): { dbName: string; version: number } {
  const { name } = useMetaApp()
  return { dbName: name, version: DB_VERSION }
}
