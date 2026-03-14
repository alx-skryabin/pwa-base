import type { ILogger, LogSection, LogLevel, LoggerConfig } from './types'
import { LOG_LEVEL_PRIORITY } from './types'
import { formatMessage } from '../formatters/messageFormatter'
import { getConsoleStyles } from '../formatters/styleFormatter'
import { DuplicateDetector } from '../utils/duplicateDetector'
import { SECTION_COLORS } from '../config/constants.ts'

export class BaseLogger implements ILogger {
  private section: LogSection
  private config: LoggerConfig
  private duplicateDetector: DuplicateDetector

  constructor(section: LogSection, config: LoggerConfig) {
    this.section = section
    this.config = config
    this.duplicateDetector = new DuplicateDetector()
  }

  /**
   * Проверяет, нужно ли логировать с учетом уровня
   */
  private shouldLog(level: LogLevel): boolean {
    // Ошибки всегда показываем, если forceShowErrors = true
    if (level === 'error' && this.config.forceShowErrors) {
      return true
    }

    // Всегда показываем специальные секции
    if (this.config.alwaysShowSections.includes(this.section)) {
      return true
    }

    // Если логирование отключено - не показываем (кроме error)
    if (!this.config.enabled) {
      return false
    }

    // Проверяем уровень логирования
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.minLevel]
  }

  private log(level: LogLevel, message: string, ...data: unknown[]): void {
    if (!this.shouldLog(level)) return

    // Проверяем на дубли в разработке
    if (import.meta.env.DEV && this.duplicateDetector.isDuplicate(this.section, level, message)) {
      return
    }

    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'
    const formattedMessage = formatMessage(this.section, level, message)
    const styles = getConsoleStyles(this.section, level)

    if (data.length > 0) {
      console[consoleMethod](formattedMessage, ...styles, ...data)
    } else {
      console[consoleMethod](formattedMessage, ...styles)
    }
  }

  debug(message: string, ...data: unknown[]): void {
    this.log('debug', message, ...data)
  }

  info(message: string, ...data: unknown[]): void {
    this.log('info', message, ...data)
  }

  warn(message: string, ...data: unknown[]): void {
    this.log('warn', message, ...data)
  }

  error(message: string, ...data: unknown[]): void {
    this.log('error', message, ...data)
  }

  time(label: string): void {
    if (!this.shouldLog('debug')) return
    console.time(`[${this.section}] [TIME]: ${label}`)
  }

  timeEnd(label: string): void {
    if (!this.shouldLog('debug')) return
    console.timeEnd(`[${this.section}] [TIME]: ${label}`)
  }

  group(label: string, collapsed: boolean = false): void {
    if (!this.shouldLog('debug')) return

    const color = SECTION_COLORS[this.section]
    const method = collapsed ? 'groupCollapsed' : 'group'

    console[method](
      `%c[${this.section}]%c ${label}`,
      `color: ${color}; font-weight: bold;`,
      'color: inherit;'
    )
  }

  groupEnd(): void {
    console.groupEnd()
  }
}
