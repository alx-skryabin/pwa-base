import type { ResetOptions, ResetType } from '../model/types'

/**
 * Создает опции сброса на основе типа
 */
export function createResetOptions(type: ResetType, dbName?: string): ResetOptions {
  switch (type) {
    case 'full':
      return {
        dbName,
        clearCache: true,
        clearStorage: true,
        unregisterSw: true,
        reload: true,
      }
    case 'all-cache':
      return {
        clearCache: true,
        clearStorage: true,
        unregisterSw: true,
        reload: true,
      }
    case 'db':
      return {
        dbName,
        reload: true,
      }
    case 'cache':
      return {
        clearCache: true,
        reload: true,
      }
    case 'pwa':
      return {
        unregisterSw: true,
        clearCache: true,
        reload: true,
      }
    case 'storage':
      return {
        clearStorage: true,
        reload: true,
      }
    default:
      return {}
  }
}
