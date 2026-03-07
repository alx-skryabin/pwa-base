/// <reference types="vite/client" />

declare module '*.png'
declare module '*.svg'
declare module '*.jpg'
declare module '*.json' {
  const value: unknown
  export default value
}

interface ImportMetaEnv {
  // Логгер
  readonly VITE_LOGGER_ENABLED?: string
  readonly VITE_LOGGER_MIN_LEVEL?: string
  readonly VITE_LOGGER_ALWAYS_SHOW?: string
  readonly VITE_LOGGER_FORCE_ERRORS?: string

  // Другие переменные (добавьте по необходимости)
  readonly VITE_APP_TITLE?: string
  readonly VITE_API_URL?: string
  /** URL для отправки логов ошибок (POST). Если не задан, используется VITE_API_URL + /logs/errors */
  readonly VITE_ERROR_REPORT_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
