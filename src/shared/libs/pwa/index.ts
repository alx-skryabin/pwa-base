/**
 * Публичное API модуля PWA
 *
 * @example
 * import { PWAProvider, usePWA } from '@shared/lib/pwa'
 *
 * <PWAProvider>
 *   <App />
 * </PWAProvider>
 */

export { PWAProvider } from './ui/PWAProvider'
export { usePWA } from './libs/usePWA'
export type { PWAContextValue, PWAState, BeforeInstallPromptEvent } from './model/types'
