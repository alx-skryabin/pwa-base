import type { ThemeMode, ThemeStorage } from '../model/types'
import { THEME } from '@shared/libs/theme/config/theme.ts'

const STORAGE_KEY = 'theme'

export const themeStorage: ThemeStorage = {
  get: (): ThemeMode | null => {
    if (typeof window === 'undefined') return null

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === THEME.LIGHT || saved === THEME.DARK) {
      return saved
    }
    return null
  },

  set: (mode: ThemeMode): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, mode)
  },
}
