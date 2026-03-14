import { SECTION_COLORS } from '../config/constants'
import type { LogSection, LogLevel } from '../core/types'

/**
 * Возвращает стили для консольного вывода
 */
export function getConsoleStyles(section: LogSection, level: LogLevel): string[] {
  const color = SECTION_COLORS[section]
  const levelColor = level === 'error' ? '#ff4444' : '#aaa'

  return [
    `color: ${color}; font-weight: bold;`, // [СЕКЦИЯ]
    `color: ${levelColor}; font-weight: bold;`, // [УРОВЕНЬ]
    'color: #888;', // timestamp
    'color: inherit;', // сообщение
  ]
}
