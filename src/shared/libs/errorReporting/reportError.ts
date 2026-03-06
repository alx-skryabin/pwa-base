import { systemLogger } from '@shared/libs/logger'
import { sendErrorToServer } from './sendToServer'
import type { ErrorReportPayload, ErrorSource } from './types'

/** Собирает общий контекст (время, URL, userAgent) для каждого отчёта */
const defaultContext = (): Pick<ErrorReportPayload, 'url' | 'timestamp' | 'userAgent'> => ({
  timestamp: new Date().toISOString(),
  url: typeof window !== 'undefined' ? window.location.href : '',
  userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
})

/**
 * Централизованный отчёт об ошибке:
 * 1) Выводит лог в консоль через systemLogger (секция SYSTEM),
 * 2) Отправляет payload на сервер через sendErrorToServer (только если задан URL).
 *
 * Вызывается из глобальных обработчиков (onerror, unhandledrejection), Error Boundary и errorElement роутера.
 */
export function reportError(
  source: ErrorSource,
  error: unknown,
  extra?: {
    componentStack?: string
    filename?: string
    lineno?: number
    colno?: number
    context?: Record<string, unknown>
  }
): void {
  let message: string
  let stack: string | undefined
  let reason: string | undefined

  if (error instanceof Error) {
    message = error.message
    stack = error.stack
  } else if (typeof error === 'string') {
    message = error
  } else {
    try {
      reason = JSON.stringify(error)
      message = reason
    } catch {
      message = String(error)
    }
  }

  const payload: ErrorReportPayload = {
    type: source,
    message,
    stack,
    ...defaultContext(),
    ...(extra?.componentStack && { componentStack: extra.componentStack }),
    ...(extra?.filename && { filename: extra.filename }),
    ...(extra?.lineno != null && { lineno: extra.lineno }),
    ...(extra?.colno != null && { colno: extra.colno }),
    ...(reason && { reason }),
    ...(extra?.context && { context: extra.context }),
  }

  systemLogger.error(`[${source}]`, error)
  sendErrorToServer(payload)
}
