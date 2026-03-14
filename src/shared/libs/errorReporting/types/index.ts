/** Источник ошибки: глобальный обработчик или React Error Boundary */
export type ErrorSource = 'window.onerror' | 'unhandledrejection' | 'react:app' | 'react:route'

/** Тело запроса при отправке отчёта об ошибке на сервер (POST) */
export interface ErrorReportPayload {
  type: ErrorSource
  message: string
  stack?: string
  /** URL скрипта (для window.onerror) */
  filename?: string
  lineno?: number
  colno?: number
  /** Сериализованный reason (для unhandledrejection) */
  reason?: string
  /** Стек компонентов React (для type === 'react') */
  componentStack?: string
  timestamp: string
  url: string
  userAgent: string
  /** Дополнительный контекст (userId, route и т.д.) */
  context?: Record<string, unknown>
}
