import React from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import { Button } from 'antd'

const Dev: React.FC = () => {
  const { isInstallable, isInstalled, isOnline, promptInstall } = usePWA()
  return (
    <div>
      <h2>Develop Page</h2>
      <div>Online: {isOnline ? 'Yes' : 'No'}</div>
      <div>PWA support: {isInstallable ? 'Yes' : 'No'}</div>
      <div>Installed: {isInstalled ? 'Yes' : 'No'}</div>
      <div>
        <strong>Display Mode</strong>:
        {window.matchMedia('(display-mode: standalone)').matches ? 'app' : 'browser'}
      </div>

      <div style={{ marginTop: 10 }}>
        {isInstallable && !isInstalled && (
          <Button onClick={promptInstall} title="Install App to Home Screen">
            <span>📲</span>
            <span>Install App</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Dev
