/**
 * Тесты модуля логгера (shared/libs/logger).
 * Проверяют: наличие у всех экспортируемых логгеров методов debug/info/warn/error,
 * отсутствие выброса ошибок при вызове. console мокается, чтобы не засорять вывод.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  uiLogger,
  systemLogger,
  pwaLogger,
  apiLogger,
  storeLogger,
  logsLogger,
  authLogger,
  routerLogger,
} from './index'

describe('logger', () => {
  // Глушим console в тестах, чтобы не мешал выводу и не зависел от уровня логирования
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const loggers: [string, typeof uiLogger][] = [
    ['uiLogger', uiLogger],
    ['systemLogger', systemLogger],
    ['pwaLogger', pwaLogger],
    ['apiLogger', apiLogger],
    ['storeLogger', storeLogger],
    ['logsLogger', logsLogger],
    ['authLogger', authLogger],
    ['routerLogger', routerLogger],
  ]

  // Параметризованный тест: у каждого логгера должны быть все четыре метода
  it.each(loggers)('%s has debug, info, warn, error methods', (_, logger) => {
    expect(logger).toHaveProperty('debug')
    expect(logger).toHaveProperty('info')
    expect(logger).toHaveProperty('warn')
    expect(logger).toHaveProperty('error')
    expect(typeof logger.debug).toBe('function')
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.error).toBe('function')
  })

  // Вызовы методов не должны бросать исключения
  it('logger methods do not throw when called', () => {
    expect(() => uiLogger.debug('test')).not.toThrow()
    expect(() => uiLogger.info('test')).not.toThrow()
    expect(() => uiLogger.warn('test')).not.toThrow()
    expect(() => uiLogger.error('test')).not.toThrow()
  })
})
