import type { LogSection } from '../core/types'

/**
 * Цвета для каждого раздела в консоли
 */
export const SECTION_COLORS: Record<LogSection, string> = {
  UI: '#2196F3', // Синий
  SYSTEM: '#FF9800', // Оранжевый
  PWA: '#4CAF50', // Зеленый
  API: '#9C27B0', // Фиолетовый
  STORE: '#FF5722', // Оранжево-красный
  LOGS: '#a46b56', // Коричневый
  AUTH: '#E91E63', // Розовый
  ROUTER: '#00BCD4', // Голубой
} as const

/**
 * Конфигурация по умолчанию
 */
export const DEFAULT_CONFIG = {
  enabled: import.meta.env.DEV,
  minLevel: 'debug' as const,
  alwaysShowSections: ['LOGS'] as LogSection[],
  forceShowErrors: true,
} as const
