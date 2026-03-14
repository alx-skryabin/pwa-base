import type { LoggerConfig, LogLevel, LogSection } from '../core/types'
import { SECTION_COLORS } from './constants'

/**
 * Загружает конфигурацию из переменных окружения
 */
export function loadEnvConfig(): Partial<LoggerConfig> {
  const config: Partial<LoggerConfig> = {}

  if (import.meta.env.VITE_LOGGER_ENABLED !== undefined) {
    config.enabled = import.meta.env.VITE_LOGGER_ENABLED === 'true'
  }

  if (import.meta.env.VITE_LOGGER_MIN_LEVEL) {
    const level = import.meta.env.VITE_LOGGER_MIN_LEVEL as LogLevel
    if (['debug', 'info', 'warn', 'error'].includes(level)) {
      config.minLevel = level
    }
  }

  if (import.meta.env.VITE_LOGGER_ALWAYS_SHOW) {
    const sections = import.meta.env.VITE_LOGGER_ALWAYS_SHOW.split(',')
      .map(s => s.trim().toUpperCase() as LogSection)
      .filter(s => Object.keys(SECTION_COLORS).includes(s))

    if (sections.length > 0) {
      config.alwaysShowSections = sections
    }
  }

  if (import.meta.env.VITE_LOGGER_FORCE_ERRORS !== undefined) {
    config.forceShowErrors = import.meta.env.VITE_LOGGER_FORCE_ERRORS === 'true'
  }

  return config
}
