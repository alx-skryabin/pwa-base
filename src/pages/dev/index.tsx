import React from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import { useMetaApp } from '@shared/hooks/useMetaApp.ts'
import { useSession } from '@entities/session'
import { Button } from 'antd'

const Dev: React.FC = () => {
  const meta = useMetaApp()
  const { isInstallable, isInstalled, isOnline, promptInstall } = usePWA()
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
      <div>
        Display Mode: {window.matchMedia('(display-mode: standalone)').matches ? 'App' : 'Browser'}
      </div>
      <div style={{ marginTop: 10 }}>
        {isInstallable && !isInstalled && (
          <Button icon="📲" onClick={promptInstall} title="Install App to Home Screen">
            Install App
          </Button>
        )}
      </div>

      <br />
      <h3>User</h3>
      <div>Session ID: {user?.name}</div>
      <div>Login: {user?.login}</div>
    </div>
  )
}

export default Dev
