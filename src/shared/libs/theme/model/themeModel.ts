import type { ThemeMode, ThemeState, ThemeStorage } from './types'
import { THEME } from '@shared/libs/theme/config/theme.ts'

/**
 * Бизнес-логика работы с темой
 */
export const themeModel = {
  /**
   * Создает начальное состояние темы
   */
  getInitialState(storage: ThemeStorage): ThemeState {
    const saved = storage.get()
    const mode = saved ?? THEME.DARK

    return {
      mode,
      isDarkMode: mode === THEME.DARK,
    }
  },

  /**
   * Переключает тему
   */
  toggle(currentMode: ThemeMode): ThemeMode {
    return currentMode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
  },

  /**
   * Проверяет, является ли тема темной
   */
  isDarkMode(mode: ThemeMode): boolean {
    return mode === THEME.DARK
  },

  /**
   * Сохраняет тему в storage
   */
  persist(storage: ThemeStorage, mode: ThemeMode): void {
    storage.set(mode)
  },
}
