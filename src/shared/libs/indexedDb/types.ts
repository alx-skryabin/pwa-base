/** Текущая версия схемы БД. При увеличении в onUpgradeNeeded пересоздаются все store. */
export const DB_VERSION = 8

export interface OpenDbOptions {
  name: string
  version: number
  storeNames: string[]
  /** Вызывается при открытии с новой версией; здесь можно удалить/создать store. */
  onUpgradeNeeded?: (db: IDBDatabase, oldVersion: number, newVersion: number) => void
}
