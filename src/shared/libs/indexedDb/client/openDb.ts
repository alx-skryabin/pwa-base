import { storeLogger } from '@shared/libs/logger'

export interface OpenDbOptions {
  name: string
  version: number
  storeNames: string[]
  /** Вызывается при открытии с новой версией; здесь можно удалить/создать store. */
  onUpgradeNeeded?: (db: IDBDatabase, oldVersion: number, newVersion: number) => void
}

/**
 * Открывает базу IndexedDB с заданной версией.
 * При version > текущей версии БД вызывается onUpgradeNeeded.
 */
export function openDb(options: OpenDbOptions): Promise<IDBDatabase> {
  const { name, version, storeNames, onUpgradeNeeded } = options

  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not supported'))
      return
    }

    const request = indexedDB.open(name, version)

    request.onerror = () => {
      storeLogger.error('IndexedDB open error:', request.error)
      reject(request.error)
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result
      const oldVersion = event.oldVersion
      const newVersion = event.newVersion ?? version

      storeLogger.info(`IndexedDB upgrade: ${name} ${oldVersion} -> ${newVersion}`)

      if (onUpgradeNeeded) {
        onUpgradeNeeded(db, oldVersion, newVersion)
        return
      }

      for (const storeName of storeNames) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' })
          storeLogger.debug('Created store:', storeName)
        }
      }
    }
  })
}
