/** Текущая версия схемы БД. При увеличении в onUpgradeNeeded пересоздаются все store. */
export const DB_VERSION = 6

export type StoreName = string

export interface OpenDbOptions {
  name: string
  version: number
  storeNames: StoreName[]
  /** Вызывается при открытии с новой версией; здесь можно удалить/создать store. */
  onUpgradeNeeded?: (db: IDBDatabase, oldVersion: number, newVersion: number) => void
}
