// Типы для разделов логгера
export type LogSection = 'UI' | 'SYSTEM' | 'PWA' | 'API' | 'STORE' | 'LOGS' | 'AUTH' | 'ROUTER'

// Конфигурация цветов для каждого раздела
const SECTION_COLORS: Record<LogSection, string> = {
  UI: '#2196F3', // Синий
  SYSTEM: '#FF9800', // Оранжевый
  PWA: '#4CAF50', // Зеленый
  API: '#9C27B0', // Фиолетовый
  STORE: '#FF5722', // Оранжево-красный
  LOGS: '#a46b56', // Коричневый
  AUTH: '#E91E63', // Розовый
  ROUTER: '#00BCD4', // Голубой
}

// Уровни логирования
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// Приоритеты уровней логирования
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

// Настройки логгера
interface LoggerConfig {
  enabled: boolean
  minLevel: LogLevel
  alwaysShowSections: LogSection[]
  /** Принудительно показывать ошибки, даже если логирование отключено */
  forceShowErrors: boolean
}

// Получение настроек из .env
const getEnvConfig = (): Partial<LoggerConfig> => {
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

  // Настройка принудительного показа ошибок
  if (import.meta.env.VITE_LOGGER_FORCE_ERRORS !== undefined) {
    config.forceShowErrors = import.meta.env.VITE_LOGGER_FORCE_ERRORS === 'true'
  }

  return config
}

// Конфигурация по умолчанию
const DEFAULT_CONFIG: LoggerConfig = {
  enabled: import.meta.env.DEV,
  minLevel: (import.meta.env.VITE_LOGGER_MIN_LEVEL as LogLevel) || 'debug',
  alwaysShowSections: ['LOGS'],
  forceShowErrors: true, // По умолчанию ВСЕГДА показываем ошибки
}

// Базовый класс логгера
class BaseLogger {
  private config: LoggerConfig
  private section: LogSection
  private logHistory: Map<string, number> = new Map()

  constructor(section: LogSection, config: LoggerConfig) {
    this.section = section
    this.config = config
  }

  private isDuplicate(level: LogLevel, message: string): boolean {
    // В production не проверяем дубли
    if (import.meta.env.PROD) return false

    const key = `${this.section}-${level}-${message}`
    const now = Date.now()
    const lastLog = this.logHistory.get(key) || 0

    // Если лог был менее 50мс назад - считаем дублем
    if (now - lastLog < 50) {
      return true
    }

    this.logHistory.set(key, now)

    // Очищаем старые записи (более 1 секунды)
    if (this.logHistory.size > 100) {
      const oneSecondAgo = now - 1000
      for (const [k, time] of this.logHistory.entries()) {
        if (time < oneSecondAgo) {
          this.logHistory.delete(k)
        }
      }
    }

    return false
  }

  // Проверка, нужно ли логировать с учетом уровня
  private shouldLog(level: LogLevel): boolean {
    // 🚨 ERROR всегда показываем, если forceShowErrors = true
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

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toLocaleTimeString('ru-RU', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      // fractionalSecondDigits: 3,
    })

    const levelTag = level.toUpperCase()

    // Порядок: [СЕКЦИЯ] [УРОВЕНЬ] timestamp: сообщение
    return `%c[${this.section}]%c [${levelTag}]%c ${timestamp}:%c ${message}`
  }

  private getStyles(level: LogLevel): string[] {
    const color = SECTION_COLORS[this.section]

    // Базовые стили для всех уровней
    return [
      `color: ${color}; font-weight: bold;`, // [СЕКЦИЯ] - цвет секции
      `color: ${level === 'error' ? '#ff4444' : '#aaa'}; font-weight: bold;`, // [УРОВЕНЬ] - будет заполнено ниже
      'color: #888;', // timestamp - приглушенный серый
      'color: inherit;', // сообщение - стандартный цвет
    ]
  }

  // Основной метод логирования
  private log(level: LogLevel, message: string, ...data: unknown[]): void {
    if (!this.shouldLog(level)) return

    // Проверяем на дубли в разработке из-за StrictMode
    if (import.meta.env.DEV && this.isDuplicate(level, message)) {
      return
    }

    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'
    const formattedMessage = this.formatMessage(level, message)
    const styles = this.getStyles(level)

    if (data.length > 0) {
      console[consoleMethod](formattedMessage, ...styles, ...data)
    } else {
      console[consoleMethod](formattedMessage, ...styles)
    }
  }

  // Публичные методы
  public debug(message: string, ...data: unknown[]): void {
    this.log('debug', message, ...data)
  }

  public info(message: string, ...data: unknown[]): void {
    this.log('info', message, ...data)
  }

  public warn(message: string, ...data: unknown[]): void {
    this.log('warn', message, ...data)
  }

  public error(message: string, ...data: unknown[]): void {
    this.log('error', message, ...data)
  }

  public time(label: string): void {
    if (!this.shouldLog('debug')) return
    console.time(`[${this.section}] [TIME]: ${label}`)
  }

  public timeEnd(label: string): void {
    if (!this.shouldLog('debug')) return
    console.timeEnd(`[${this.section}] [TIME]: ${label}`)
  }

  public group(label: string, collapsed: boolean = false): void {
    if (!this.shouldLog('debug')) return

    const color = SECTION_COLORS[this.section]
    const method = collapsed ? 'groupCollapsed' : 'group'

    console[method](
      `%c[${this.section}]%c ${label}`,
      `color: ${color}; font-weight: bold;`,
      'color: inherit;'
    )
  }

  public groupEnd(): void {
    console.groupEnd()
  }
}

// Фабрика для создания логгеров
class LoggerFactory {
  private static instance: LoggerFactory
  private config: LoggerConfig
  private loggers: Map<LogSection, BaseLogger> = new Map()

  private constructor(config: Partial<LoggerConfig> = {}) {
    const envConfig = getEnvConfig()
    this.config = { ...DEFAULT_CONFIG, ...envConfig, ...config }
  }

  public static getInstance(config?: Partial<LoggerConfig>): LoggerFactory {
    if (!LoggerFactory.instance) {
      LoggerFactory.instance = new LoggerFactory(config)
    } else if (config) {
      LoggerFactory.instance.updateConfig(config)
    }
    return LoggerFactory.instance
  }

  public getLogger(section: LogSection): BaseLogger {
    if (!this.loggers.has(section)) {
      this.loggers.set(section, new BaseLogger(section, this.config))
    }
    return this.loggers.get(section)!
  }

  public updateConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config }
    this.loggers.clear()
  }
}

// Создаем фабрику
const factory = LoggerFactory.getInstance()

// Экспортируем предварительно настроенные логгеры
export const uiLogger = factory.getLogger('UI')
export const systemLogger = factory.getLogger('SYSTEM')
export const pwaLogger = factory.getLogger('PWA')
export const apiLogger = factory.getLogger('API')
export const storeLogger = factory.getLogger('STORE')
export const logsLogger = factory.getLogger('LOGS')
export const authLogger = factory.getLogger('AUTH')
export const routerLogger = factory.getLogger('ROUTER')
