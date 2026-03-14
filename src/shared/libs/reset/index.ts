/**
 * Публичное API модуля сброса данных
 *
 * @example
 * // Простой сброс БД
 * import { fullResetDB } from '@shared/lib/reset'
 * fullResetDB('my-db')
 *
 * @example
 * // Комплексный сброс с компонентом подтверждения
 * import { resetModel, ResetConfirmDialog } from '@shared/lib/reset'
 *
 * const handleReset = async () => {
 *   const result = await resetModel.reset({
 *     dbName: 'my-db',
 *     clearCache: true,
 *     reload: true
 *   })
 * }
 */

// Модель (основная логика)
export { resetModel } from './model/resetModel'
export type { ResetOptions, ResetResult, ResetType } from './model/types'

// API (низкоуровневый доступ)
export { cacheApi } from './api/cacheApi'
export { storageApi } from './api/storageApi'
export { swApi } from './api/swApi'

// Вспомогательные функции (для обратной совместимости)
import { resetModel } from './model/resetModel'
import { createResetOptions } from '@shared/libs/reset/libs/helpers.ts'

/**
 * Полный сброс приложения (для обратной совместимости)
 */
export const fullResetApp = async (dbName: string): Promise<void> => {
  await resetModel.reset(createResetOptions('full', dbName))
}

/**
 * Очистка кэша (для обратной совместимости)
 */
export const clearAllCache = resetModel.reset.bind(null, createResetOptions('all-cache'))
