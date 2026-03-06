/** Публичный API модуля перехвата и отчёта об ошибках */
export { reportError } from './reportError'
export { sendErrorToServer } from './sendToServer'
export { initGlobalErrorHandlers } from './initGlobalHandlers'
export type { ErrorReportPayload, ErrorSource } from './types'
