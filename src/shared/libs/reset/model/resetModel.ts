import { deleteDb } from '@shared/libs/indexedDb'
import { cacheApi } from '../api/cacheApi'
import { storageApi } from '../api/storageApi'
import { swApi } from '../api/swApi'
import { systemLogger } from '@shared/libs/logger'
import type { ResetOptions, ResetResult } from './types'

/**
 * Модель для операций сброса данных
 */
export const resetModel = {
  /**
   * Сброс с настройками
   */
  async reset(options: ResetOptions): Promise<ResetResult> {
    const result: ResetResult = {
      success: true,
      details: {},
      errors: [],
    }

    // Очистка кэша
    if (options.clearCache) {
      try {
        await cacheApi.clearAll()
        result.details.cacheCleared = true
      } catch (error) {
        systemLogger.error('[reset] Failed to clear cache:', error)
        result.success = false
        result.errors.push(`Cache error: ${error}`)
      }
    }

    // Очистка storage
    if (options.clearStorage) {
      try {
        storageApi.clearAll()
        result.details.storageCleared = true
      } catch (error) {
        systemLogger.error('[reset] Failed to clear storage:', error)
        result.success = false
        result.errors.push(`Storage error: ${error}`)
      }
    }

    // Отмена SW
    if (options.unregisterSw) {
      try {
        await swApi.unregisterAll()
        result.details.swUnregistered = true
      } catch (error) {
        systemLogger.error('[reset] Failed to unregister SW:', error)
        result.success = false
        result.errors.push(`SW error: ${error}`)
      }
    }

    // Удаление БД
    if (options.dbName) {
      try {
        await deleteDb(options.dbName)
        result.details.dbDeleted = true
      } catch (error) {
        systemLogger.error('[reset] Failed to delete DB:', error)
        result.success = false
        result.errors.push(`DB error: ${error}`)
      }
    }

    // Перезагрузка
    if (options.reload && result.success) {
      window.location.reload()
    }

    return result
  },

  /**
   * Проверяет, можно ли выполнить операции
   */
  isSupported(): { cache: boolean; sw: boolean; storage: boolean } {
    return {
      cache: 'caches' in window,
      sw: 'serviceWorker' in navigator,
      storage: typeof localStorage !== 'undefined',
    }
  },
}
