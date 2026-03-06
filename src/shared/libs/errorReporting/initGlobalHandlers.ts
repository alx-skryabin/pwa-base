import { reportError } from './reportError'

/**
 * Регистрирует глобальные обработчики ошибок в браузере:
 * - window.onerror — необработанные синхронные ошибки и ошибки в скриптах;
 * - window.onunhandledrejection — необработанные отклонённые промисы.
 *
 * Вызывать один раз при старте приложения, до рендера React (в main.tsx),
 * чтобы перехватывать ошибки с самого начала загрузки.
 */
export function initGlobalErrorHandlers(): void {
  if (typeof window === 'undefined') return

  window.onerror = (
    message: string | Event,
    source?: string,
    lineno?: number,
    colno?: number,
    error?: Error
  ) => {
    const err = error ?? new Error(typeof message === 'string' ? message : message.type)
    reportError('window.onerror', err, {
      filename: source,
      lineno,
      colno,
    })
    return false
  }

  window.onunhandledrejection = (event: PromiseRejectionEvent) => {
    reportError('unhandledrejection', event.reason, {})
  }
}
