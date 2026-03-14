/**
 * Возвращает все записи из store, у которых значение в index равно key.
 * Использует IDBIndex.getAll(key) — выборка на стороне БД, без загрузки всего store.
 */
export function getAllByIndex<T = unknown>(
  db: IDBDatabase,
  storeName: string,
  indexName: string,
  key: IDBValidKey
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    const index = store.index(indexName)
    const request = index.getAll(key)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result ?? [])
  })
}
