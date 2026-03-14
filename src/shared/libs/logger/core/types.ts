/**
 * Разделы логирования приложения
 */
export type LogSection = 'UI' | 'SYSTEM' | 'PWA' | 'API' | 'STORE' | 'LOGS' | 'AUTH' | 'ROUTER'

/**
 * Уровни логирования
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

/**
 * Конфигурация логгера
 */
export interface LoggerConfig {
  enabled: boolean
  minLevel: LogLevel
  alwaysShowSections: LogSection[]
  forceShowErrors: boolean
}

/**
 * Интерфейс логгера
 */
export interface ILogger {
  debug(message: string, ...data: unknown[]): void
  info(message: string, ...data: unknown[]): void
  warn(message: string, ...data: unknown[]): void
  error(message: string, ...data: unknown[]): void
  time(label: string): void
  timeEnd(label: string): void
  group(label: string, collapsed?: boolean): void
  groupEnd(): void
}

/**
 * Приоритеты уровней логирования
 */
export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
} as const
