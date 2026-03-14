import type { ErrorReportPayload } from '../types'

/**
 * Определяет URL для отправки логов ошибок:
 * - VITE_ERROR_REPORT_URL, если задан;
 * - иначе VITE_API_URL + "/logs/errors".
 */
const getReportUrl = (): string | undefined => {
  const url = import.meta.env.VITE_ERROR_REPORT_URL
  if (url && typeof url === 'string' && url.trim() !== '') {
    return url.trim()
  }
  const apiUrl = import.meta.env.VITE_API_URL
  if (apiUrl && typeof apiUrl === 'string') {
    return `${apiUrl.replace(/\/$/, '')}/logs/errors`
  }
  return undefined
}

/**
 * Отправляет отчёт об ошибке на сервер (POST, JSON).
 * Использует sendBeacon при наличии, иначе fetch с keepalive.
 * Не бросает исключений — при сбое сети запрос просто не выполняется.
 */
export function sendErrorToServer(payload: ErrorReportPayload): void {
  const reportUrl = getReportUrl()
  if (!reportUrl) return

  const body = JSON.stringify(payload)

  const sendFetch = () => {
    fetch(reportUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {})
  }

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    /* sendBeacon это специальный метод в JavaScript, который гарантированно отправит данные на сервер
     даже в момент, когда пользователь закрывает страницу или переходит на другой сайт. */

    const sent = navigator.sendBeacon(reportUrl, body)
    if (!sent) {
      sendFetch()
    }
  } else {
    sendFetch()
  }
}
