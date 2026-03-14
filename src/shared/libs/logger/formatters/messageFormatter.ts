import { formatTime } from './timeFormatter'
import type { LogSection, LogLevel } from '../core/types'

/**
 * Форматирует сообщение для вывода в консоль
 */
export function formatMessage(section: LogSection, level: LogLevel, message: string): string {
  const timestamp = formatTime(new Date())
  const levelTag = level.toUpperCase()

  return `%c[${section}]%c [${levelTag}]%c ${timestamp}:%c ${message}`
}
