/** Публичный API модуля перехвата и отчёта об ошибках */
export { reportError } from './core/reportError.ts'
export { sendErrorToServer } from './api/sendToServer.ts'
export { initGlobalErrorHandlers } from './handlers/initGlobalHandlers.ts'
export type { ErrorReportPayload, ErrorSource } from './types'
