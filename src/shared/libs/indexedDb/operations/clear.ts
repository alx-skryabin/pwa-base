/**
 * Очищает все записи в указанном store.
 */
export function clear(db: IDBDatabase, storeName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    const request = store.clear()

    request.onerror = () => reject(request.error)
    tx.oncomplete = () => resolve()
  })
}
