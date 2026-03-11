import React from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import { useMetaApp } from '@shared/hooks/useMetaApp.ts'
import { useSession } from '@entities/session'
import ModalPWAInstructions from '@features/ButtonPWAInstructions'
import { Button } from 'antd'

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
      <div>Online: {isOnline ? 'Yes' : 'No'}</div>
      <div>PWA support: {isInstallable ? 'Yes' : 'No'}</div>
      <div>Installed: {isInstalled ? 'Yes' : 'No'}</div>
      <div>showInstallInstructions: {showInstallInstructions ? 'Yes' : 'No'}</div>
      <div>
        Display Mode: {window.matchMedia('(display-mode: standalone)').matches ? 'App' : 'Browser'}
      </div>
      <div style={{ marginTop: 10 }}>
        {isInstalled ? (
          <small>📲 Приложение установлено</small>
        ) : isInstallable ? (
          <Button icon="📲" onClick={promptInstall} title="Install App to Home Screen">
            Установить
          </Button>
        ) : (
          <ModalPWAInstructions />
        )}
      </div>

      <br />
      <h3>User</h3>
      <div>Session ID: {user?.name}</div>
      <div>Login: {user?.login}</div>
      <div>Role: {user?.role}</div>
    </div>
  )
}

export default Dev
