import { BaseLogger } from './BaseLogger'
import { loadEnvConfig } from '../config/envConfig'
import { DEFAULT_CONFIG } from '../config/constants'
import type { LoggerConfig, LogSection } from './types'

export class LoggerFactory {
  private static instance: LoggerFactory
  private config: LoggerConfig
  private loggers: Map<LogSection, BaseLogger> = new Map()

  private constructor(config: Partial<LoggerConfig> = {}) {
    const envConfig = loadEnvConfig()
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

  public getConfig(): LoggerConfig {
    return { ...this.config }
  }
}
