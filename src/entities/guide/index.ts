/**
 * Публичное API сущности Guide
 *
 * @example
 * // Использование API
 * import { guideApi } from '@entities/guide'
 * const continents = await guideApi.getContinents()
 *
 * @example
 * // Использование хуков
 * import { useContinents } from '@entities/guide'
 * const { data, isLoading } = useContinents()
 */

// Типы
export type { GuideRecord, Continent, Country, RegionRus } from './model/types'

// API слой
export { guideApi } from './api/guideApi'

// Хуки (из lib/)
export { useContinents } from './libs/useContinents'
export { useCountriesByContinent } from './libs/useCountriesByContinent'
