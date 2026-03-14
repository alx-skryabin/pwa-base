/**
 * Результат операции сброса
 */
export interface ResetResult {
  success: boolean
  errors: string[]
  details: {
    dbDeleted?: boolean
    cacheCleared?: boolean
    storageCleared?: boolean
    swUnregistered?: boolean
    [key: string]: boolean | undefined // для расширяемости
  }
}

/**
 * Опции для сброса
 */
export interface ResetOptions {
  /** Название БД для удаления */
  dbName?: string
  /** Очищать кэш Cache API */
  clearCache?: boolean
  /** Очищать localStorage/sessionStorage */
  clearStorage?: boolean
  /** Отменять регистрацию Service Worker */
  unregisterSw?: boolean
  /** Перезагружать страницу после сброса */
  reload?: boolean
}

/**
 * Тип операции сброса
 */
export type ResetType = 'full' | 'db' | 'all-cache' | 'cache' | 'pwa' | 'storage'
