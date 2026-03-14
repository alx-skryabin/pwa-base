/**
 * Публичное API сущности Session
 *
 * @example
 * // Использование провайдера
 * import { SessionProvider } from '@entities/session'
 *
 * @example
 * // Использование хука
 * import { useSession } from '@entities/session'
 * const { user, login, logout } = useSession()
 */

// Провайдер и контекст
export { SessionProvider } from './ui/SessionProvider'
export { SessionContext } from './model/context'

// Хуки
export { useSession } from './libs/useSession'

// Типы
export type { SessionUser, SessionState } from './model/types'

// API (если нужен прямой доступ)
export { sessionApi } from './api/sessionApi'
export type { UserRecord } from './api/sessionApi'
