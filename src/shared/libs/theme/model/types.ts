export type ThemeMode = 'light' | 'dark'

export interface ThemeContextValue {
  isDarkMode: boolean
  mode: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

export interface ThemeState {
  mode: ThemeMode
  isDarkMode: boolean
}

export interface ThemeStorage {
  get: () => ThemeMode | null
  set: (mode: ThemeMode) => void
}
