import type { ThemeMode } from '../model/types'
import { THEME } from '@shared/libs/theme/config/theme.ts'

export const themeHelpers = {
  /**
   * Получает CSS класс для темы
   */
  getThemeClass(mode: ThemeMode): string {
    return mode === THEME.DARK ? 'theme__dark' : 'theme__light'
  },

  /**
   * Получает противоположную тему
   */
  getOppositeTheme(mode: ThemeMode): ThemeMode {
    return mode === THEME.DARK ? THEME.LIGHT : THEME.DARK
  },
}
