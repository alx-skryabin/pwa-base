/**
 * Модуль логирования приложения
 *
 * @example
 * // Базовое использование
 * import { systemLogger } from '@shared/lib/logger'
 * systemLogger.info('App started')
 *
 * @example
 * // Настройка конфигурации
 * import { configureLogger } from '@shared/lib/logger'
 * configureLogger({ enabled: false })
 */

// Основные типы
export type { LogSection, LogLevel, LoggerConfig, ILogger } from './core/types'

// Фабрика и конфигурация
export { LoggerFactory } from './core/LoggerFactory'

// Предустановленные логгеры
export {
  uiLogger,
  systemLogger,
  pwaLogger,
  apiLogger,
  storeLogger,
  logsLogger,
  authLogger,
  routerLogger,
} from './loggers'

// Для обратной совместимости
export { BaseLogger } from './core/BaseLogger'
