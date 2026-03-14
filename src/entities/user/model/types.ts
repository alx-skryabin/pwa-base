/** Одна запись пользователя в users.json */
export interface UserFromJson {
  login: string
  name: string
  role: number
}

/** users.json: ключ — логин, значение — данные пользователя */
export type UsersMap = Record<string, UserFromJson>

/** Пользователь для сессии (после преобразования) */
export interface SessionUser {
  id: string
  login: string
  name: string
  role: number
}
