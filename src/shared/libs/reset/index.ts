import { deleteDb } from '@shared/libs/indexedDb'

export const fullResetDB = (dbName: string) => {
  if (window.confirm('Все несинхронизированные данные будут уничтожены!')) {
    deleteDb(dbName).then(() => {
      window.location.reload()
    })
  }
}

export const clearCache = async () => {
  try {
    // Очистка кэша сервис-воркера
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
    }

    // Очистка localStorage и sessionStorage
    localStorage.clear()
    sessionStorage.clear()

    // Перезагрузка страницы
    window.location.reload()
  } catch (error) {
    console.error('Ошибка при очистке кэша:', error)
    alert('Не удалось очистить кэш. Попробуйте сделать это вручную.')
  }
}

export const clearPwaCache = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      await registration.unregister()
    }
  }
}
