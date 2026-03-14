import { storeLogger } from '@shared/libs/logger'

/**
 * Полностью удаляет базу IndexedDB с указанным именем.
 * Используется для принудительного сброса (настройки, отладка).
 * Перед вызовом закройте все соединения с БД.
 */
export function deleteDb(name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      resolve()
      return
    }

    const request = indexedDB.deleteDatabase(name)

    request.onerror = () => {
      storeLogger.error('IndexedDB delete error:', request.error)
      reject(request.error)
    }

    request.onsuccess = () => {
      storeLogger.info('IndexedDB deleted:', name)
      resolve()
    }

    request.onblocked = () => {
      storeLogger.warn('IndexedDB delete blocked (close all connections first)')
    }
  })
}
