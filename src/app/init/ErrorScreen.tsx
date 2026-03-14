import React from 'react'
import { useMetaApp } from '@shared/hooks/useMetaApp/useMetaApp.ts'
import { Button, Result } from 'antd'
import { ReloadOutlined, ClearOutlined, StopOutlined } from '@ant-design/icons'
import { clearAllCache, fullResetApp } from '@shared/libs/reset'

/** Экран при ошибке инициализации приложения (например, сбой IndexedDB). */
export const ErrorScreen: React.FC = () => {
  const { name } = useMetaApp()

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
      }}
    >
      <Result
        status="error"
        title="Ошибка загрузки данных"
        subTitle={
          <div>
            <div>Возможно проблема с кэшем приложения.</div>
            <div>Выполните действия поочередно,</div>
            <div>если проблема сохраняется - обратитесь к разработчикам.</div>
          </div>
        }
        extra={[
          <Button
            key="reload"
            size="large"
            style={{ marginBottom: '0.5rem' }}
            icon={<ReloadOutlined />}
            onClick={() => window.location.reload()}
          >
            1. Перезагрузить
          </Button>,
          <Button
            key="cache"
            icon={<ClearOutlined />}
            onClick={() => {
              if (window.confirm('Очистить кэш?')) {
                clearAllCache()
              }
            }}
            size="large"
            style={{ marginBottom: '0.5rem' }}
          >
            2. Очистить КЭШ
          </Button>,
          <Button
            key="reset"
            type="primary"
            icon={<StopOutlined />}
            onClick={() => {
              if (window.confirm('Все несинхронизированные данные будут уничтожены!')) {
                fullResetApp(name)
              }
            }}
            size="large"
            danger
          >
            3. Full Reset
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'left' }}>
          <h4>Инструкция по очистке кэша PWA:</h4>
          <ul style={{ paddingLeft: 10, marginTop: 10 }}>
            <li>
              <p>Откройте настройки браузера</p>
            </li>
            <li>
              <p>Найдите раздел "Приложения" или "Сайты"</p>
            </li>
            <li>
              <p>Удалите данные этого сайта</p>
            </li>
          </ul>
        </div>
      </Result>
    </div>
  )
}
