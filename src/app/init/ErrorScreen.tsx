import React from 'react'

/** Экран при ошибке инициализации приложения (например, сбой IndexedDB). */
export const ErrorScreen: React.FC = () => (
  <div
    style={{
      height: '100vh',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
    }}
  >
    <span>Ошибка загрузки приложения.</span>
    <span>Обновите страницу.</span>
  </div>
)
