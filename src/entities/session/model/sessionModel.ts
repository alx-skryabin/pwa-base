import { sessionApi, type UserRecord } from '../api/sessionApi'
import { SESSION_STORE_NAMES, USER_STORE_KEY } from '@shared/libs/indexedDb'
import visitsData from '@shared/assets/data-user/visits.json'
import type { SessionUser } from './types'
import { Visit } from '@entities/visits'

/**
 * Бизнес-логика работы с сессией
 */
export const sessionModel = {
  /**
   * Преобразует запись из БД в пользователя сессии
   */
  toSessionUser(record: UserRecord): SessionUser {
    return {
      id: String(record.id),
      login: record.login,
      name: record.name,
      role: record.role,
    }
  },

  /**
   * Создает запись пользователя для БД
   */
  createUserRecord(user: SessionUser): UserRecord {
    return {
      id: USER_STORE_KEY,
      login: user.login,
      name: user.name,
      role: user.role,
    }
  },

  /**
   * Получает данные для инициализации сессии
   */
  async getInitialSessionData() {
    const record = await sessionApi.readCurrentUser<UserRecord>()
    return record ? this.toSessionUser(record) : null
  },

  /**
   * Подготавливает данные для логина
   */
  prepareLoginData(user: SessionUser) {
    const userRecord = this.createUserRecord(user)
    const visits = visitsData as Visit[]

    return {
      user: [userRecord],
      visits: visits.length ? visits : [],
    }
  },

  /**
   * Очищает данные сессии
   */
  async clearSessionData() {
    await sessionApi.clearStores(SESSION_STORE_NAMES)
  },
}
