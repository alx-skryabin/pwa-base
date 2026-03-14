import usersData from '@shared/assets/data-user/users.json'
import type { UsersMap } from '../model/types'

export const userApi = {
  /**
   * Получает всех пользователей из JSON
   */
  getUsersMap(): UsersMap {
    return usersData as UsersMap
  },

  /**
   * Ищет пользователя по логину
   */
  findUserByLogin(login: string) {
    const users = this.getUsersMap()
    return users[login]
  },

  /**
   * Проверяет учетные данные пользователя (пароль = логин для демо)
   */
  validateUser(login: string, password: string) {
    const user = this.findUserByLogin(login)
    return user && password === user.login ? user : null
  },
}
