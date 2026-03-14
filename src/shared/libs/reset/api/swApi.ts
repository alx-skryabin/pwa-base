/**
 * API для работы с Service Worker
 */
export const swApi = {
  /**
   * Отменяет регистрацию всех Service Worker
   */
  async unregisterAll(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      return
    }

    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map(reg => reg.unregister()))
  },

  /**
   * Проверяет, активен ли Service Worker
   */
  async isActive(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      return false
    }

    const registration = await navigator.serviceWorker.getRegistration()
    return !!registration?.active
  },
}
