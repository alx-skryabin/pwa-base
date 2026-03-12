import React from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import { useMetaApp } from '@shared/hooks/useMetaApp.ts'
import { useSession } from '@entities/session'
import ModalPWAInstructions from '@features/ButtonPWAInstructions'
import { clearCache, clearPwaCache, fullResetDB } from '@shared/libs/reset'
import { Button } from 'antd'
import { ClearOutlined, DownloadOutlined, StopOutlined } from '@ant-design/icons'

const Dev: React.FC = () => {
  const meta = useMetaApp()
  const { isInstallable, isInstalled, isOnline, promptInstall, showInstallInstructions } = usePWA()
  const { user } = useSession()

  return (
    <div>
      <h2>Develop Page</h2>

      <h3>APP:</h3>
      <div>Name: {meta.name}</div>
      <div>Version: {meta.version}</div>
      <div>Mode: {meta.mode}</div>
      <div>Build time: {meta.releaseTime}</div>
      <div>Author: {meta.author}</div>

      <br />
      <h3>PWA:</h3>
      <div>Network: {isOnline ? '🟢 Online' : '🔴 Offline'}</div>
      <div>PWA support: {isInstallable ? 'Yes' : 'No'}</div>
      <div>Installed: {isInstalled ? 'Yes' : 'No'}</div>
      <div>Show Install Instructions: {showInstallInstructions ? 'Yes' : 'No'}</div>
      <div>
        Display Mode: {window.matchMedia('(display-mode: standalone)').matches ? 'App' : 'Browser'}
      </div>
      <div style={{ marginTop: 10 }}>
        {isInstalled ? (
          <small>📲 Приложение установлено</small>
        ) : isInstallable ? (
          <Button
            size="large"
            icon={<DownloadOutlined />}
            onClick={promptInstall}
            title="Install App to Home Screen"
          >
            Установить
          </Button>
        ) : (
          <ModalPWAInstructions />
        )}
      </div>

      <br />
      <h3>User:</h3>
      <div>Session ID: {user?.name}</div>
      <div>Login: {user?.login}</div>
      <div>Role: {user?.role}</div>

      <br />
      <h3>Cache:</h3>
      <Button
        icon={<ClearOutlined />}
        onClick={() => {
          clearPwaCache().then(() => {
            clearCache()
          })
        }}
        size="large"
        style={{ marginBottom: '0.5rem' }}
      >
        Clear Cache
      </Button>
      <br />
      <Button
        type="primary"
        icon={<StopOutlined />}
        onClick={() => fullResetDB(meta.name)}
        size="large"
        danger
      >
        Full Reset
      </Button>
    </div>
  )
}

export default Dev
