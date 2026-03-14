import { userApi } from '../api/userApi'
import type { SessionUser } from './types'

export const userModel = {
  /**
   * Находит пользователя по логину и паролю
   */
  findUser(login: string, password: string): SessionUser | null {
    const user = userApi.validateUser(login, password)

    if (!user) return null

    return {
      id: user.login,
      login: user.login,
      name: user.name,
      role: user.role,
    }
  },

  /**
   * Проверяет, существует ли пользователь
   */
  userExists(login: string): boolean {
    return !!userApi.findUserByLogin(login)
  },

  /**
   * Получает роль пользователя
   */
  getUserRole(login: string): number | null {
    const user = userApi.findUserByLogin(login)
    return user?.role ?? null
  },
}
