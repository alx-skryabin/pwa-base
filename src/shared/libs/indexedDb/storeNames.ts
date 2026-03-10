/**
 * Единый источник имён объектных хранилищ (таблиц) IndexedDB.
 * Используется при инициализации БД, в справочниках (guide) и в сессии.
 */

/** Названия таблиц. **/
export const CONTINENTS_STORE = 'continents' as const
export const COUNTRIES_STORE = 'countries' as const
export const REGIONS_RUS_STORE = 'regionsRus' as const
export const USER_STORE = 'user' as const
export const VISITS_STORE = 'visits' as const

/** Store справочников: заполняются из JSON при первом заходе. */
export const GUIDE_STORE_NAMES = [CONTINENTS_STORE, COUNTRIES_STORE, REGIONS_RUS_STORE] as const
export type GuideStoreName = (typeof GUIDE_STORE_NAMES)[number]

/** Store сессии: создаются пустыми при первом заходе, заполняются при авторизации, очищаются при выходе. */
export const SESSION_STORE_NAMES = [USER_STORE, VISITS_STORE] as const
export type SessionStoreName = (typeof SESSION_STORE_NAMES)[number]

/** Все store БД (справочники + сессия). */
export const ALL_STORE_NAMES = [...GUIDE_STORE_NAMES, ...SESSION_STORE_NAMES] as const

/**
 * Ключ единственной записи в store `user` (keyPath: id).
 * Текущий пользователь хранится как один объект с id = USER_STORE_KEY.
 */
export const USER_STORE_KEY = 1
