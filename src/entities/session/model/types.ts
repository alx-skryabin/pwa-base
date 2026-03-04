export interface SessionUser {
  id: string
  login: string
}

export interface SessionState {
  user: SessionUser | null
  isAuthenticated: boolean
  isInitialized: boolean
}
