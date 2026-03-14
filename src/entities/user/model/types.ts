/**
 * Типы по данным из @shared/assets/data-user/ (users.json, visits.json).
 */

/** Одна запись пользователя в users.json (значение по ключу-логину). */
interface UserFromJson {
  login: string
  name: string
  role: number
}

/** users.json: ключ — логин, значение — данные пользователя. */
export type UsersMap = Record<string, UserFromJson>

/** Одна запись в store visits (и в visits.json). */
export interface Visit {
  id: number
  isMagnet: boolean
  regionId: number
  countryId: number
  continentId: number
}
