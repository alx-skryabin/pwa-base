/**
 * Записывает массив записей в store.
 * Каждая запись должна иметь поле id (keyPath).
 */
export function bulkPut<T extends { id: number }>(
  db: IDBDatabase,
  storeName: string,
  items: T[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (items.length === 0) {
      resolve()
      return
    }

    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)

    tx.onerror = () => reject(tx.error)
    tx.oncomplete = () => resolve()

    for (const item of items) {
      store.put(item)
    }
  })
}
