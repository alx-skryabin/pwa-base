/**
 * Единый источник имён объектных хранилищ (таблиц) IndexedDB.
 * Используется при инициализации БД, в справочниках (guide) и в сессии.
 */

/** Store справочников: заполняются из JSON при первом заходе. */
export const GUIDE_STORE_NAMES = ['continents', 'countries', 'regionsRus'] as const
export type GuideStoreName = (typeof GUIDE_STORE_NAMES)[number]

/** Store сессии: создаются пустыми при первом заходе, заполняются при авторизации, очищаются при выходе. */
export const SESSION_STORE_NAMES = ['user', 'visits'] as const
export type SessionStoreName = (typeof SESSION_STORE_NAMES)[number]

/** Все store БД (справочники + сессия). */
export const ALL_STORE_NAMES = [...GUIDE_STORE_NAMES, ...SESSION_STORE_NAMES] as const

/**
 * Ключ единственной записи в store `user` (keyPath: id).
 * Текущий пользователь хранится как один объект с id = USER_STORE_KEY.
 */
export const USER_STORE_KEY = 1
