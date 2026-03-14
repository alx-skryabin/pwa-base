/**
 * API для работы с Cache API браузера
 */
export const cacheApi = {
  /**
   * Очищает весь кэш браузера (Cache Storage)
   */
  async clearAll(): Promise<void> {
    if (!('caches' in window)) {
      return
    }

    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(name => caches.delete(name)))
  },

  /**
   * Очищает только указанные кэши
   */
  async clearByName(names: string[]): Promise<void> {
    if (!('caches' in window)) {
      return
    }

    await Promise.all(names.map(name => caches.delete(name)))
  },

  /**
   * Получает список всех кэшей
   */
  async getCacheNames(): Promise<string[]> {
    if (!('caches' in window)) {
      return []
    }
    return caches.keys()
  },
}
