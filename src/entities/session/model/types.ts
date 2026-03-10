/** Данные пользователя из users.json и таблицы user в IndexedDB. */
export interface SessionUser {
  id: string
  login: string
  name: string
  role: number
}

export interface SessionState {
  user: SessionUser | null
  isAuthenticated: boolean
  isInitialized: boolean
}
