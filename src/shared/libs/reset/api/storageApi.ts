/**
 * API для работы с Web Storage (localStorage, sessionStorage)
 */
export const storageApi = {
  /**
   * Очищает localStorage
   */
  clearLocalStorage(): void {
    if (typeof localStorage === 'undefined') return
    localStorage.clear()
  },

  /**
   * Очищает sessionStorage
   */
  clearSessionStorage(): void {
    if (typeof sessionStorage === 'undefined') return
    sessionStorage.clear()
  },

  /**
   * Очищает все storage
   */
  clearAll(): void {
    this.clearLocalStorage()
    this.clearSessionStorage()
  },

  /**
   * Получить размер localStorage в байтах (приблизительно)
   */
  getLocalStorageSize(): number {
    if (typeof localStorage === 'undefined') return 0

    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        const value = localStorage.getItem(key)
        total += (key.length + (value?.length || 0)) * 2 // UTF-16 = 2 bytes per char
      }
    }
    return total
  },
}
