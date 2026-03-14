import React from 'react'
import { Button, Result } from 'antd'
import { ReloadOutlined, ClearOutlined, StopOutlined } from '@ant-design/icons'
import { clearAllCache, fullResetApp } from '@shared/libs/reset'
import { useMetaApp } from '@shared/hooks/useMetaApp/useMetaApp.ts'

export const ErrorScreen: React.FC = () => {
  const { name } = useMetaApp()

  const handleFullReset = () => {
    if (window.confirm('Все несинхронизированные данные будут уничтожены!')) {
      fullResetApp(name)
    }
  }

  return (
    <div
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Result
        status="error"
        title="Ошибка загрузки данных"
        subTitle={
          <div>
            <p>Возможно проблема с кэшем приложения.</p>
            <p>
              Выполните действия поочередно, если проблема сохраняется - обратитесь к разработчикам.
            </p>
          </div>
        }
        extra={[
          <Button
            key="reload"
            size="large"
            icon={<ReloadOutlined />}
            style={{ marginBottom: '0.5rem' }}
            onClick={() => window.location.reload()}
            block
          >
            1. Перезагрузить
          </Button>,
          <Button
            key="cache"
            icon={<ClearOutlined />}
            style={{ marginBottom: '0.5rem' }}
            onClick={() => window.confirm('Очистить кэш?') && clearAllCache()}
            size="large"
            block
          >
            2. Очистить КЭШ
          </Button>,
          <Button
            key="reset"
            type="primary"
            danger
            icon={<StopOutlined />}
            onClick={handleFullReset}
            size="large"
            block
          >
            3. Full Reset
          </Button>,
        ]}
      >
        <div style={{ textAlign: 'left', marginTop: 16 }}>
          <h4>Инструкция по очистке кэша PWA:</h4>
          <ul>
            <li>Откройте настройки браузера</li>
            <li>Найдите раздел "Приложения" или "Сайты"</li>
            <li>Удалите данные этого сайта</li>
          </ul>
        </div>
      </Result>
    </div>
  )
}
