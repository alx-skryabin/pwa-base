/**
 * Публичное API модуля темы
 *
 * @example
 * // Использование провайдера
 * import { ThemeProvider } from '@shared/lib/theme'
 *
 * @example
 * // Использование хука
 * import { useTheme } from '@shared/lib/theme'
 * const { isDarkMode, toggleTheme } = useTheme()
 */

export { ThemeProvider } from './ui/ThemeProvider'
export { useTheme } from './libs/useTheme'
export { themeHelpers } from './libs/helpers'
export type { ThemeMode, ThemeContextValue } from './model/types'
