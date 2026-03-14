/**
 * Публичное API сущности Visit
 *
 * @example
 * // Использование модели
 * import { visitModel } from '@entities/visit'
 * const regions = await visitModel.getRegionsWithMagnet()
 *
 * @example
 * // Использование хука
 * import { useRegionRusWithMagnet } from '@entities/visit'
 * const { data } = useRegionRusWithMagnet()
 */

// Типы
export type { Visit, RegionRusWithMagnet, VisitsStats } from './model/types'

// Модель (бизнес-логика)
export { visitModel } from './model/visitModel'

// API (для прямого доступа к данным)
export { visitApi } from './api/visitApi'

// Хуки
export { useRegionRusWithMagnet } from './libs/useRegionRusWithMagnet'
