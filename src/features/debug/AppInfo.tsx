import React from 'react'

export const AppInfo = ({ isOnline, isInstalled, isInstallable }) => {
  return (
    <div>
      <div>
        <strong>Display Mode</strong>:
        {window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser'}
      </div>
      <div>
        <strong>Network</strong>: {isOnline ? 'Online' : 'Offline'}
      </div>
      <div>
        <strong>PWA Installed</strong>: {isInstalled ? 'Installed' : 'Not Installed'}
      </div>
      <div>
        <strong>PWA Installable</strong>: {isInstallable.toString()}
      </div>
      {/*<ul>*/}
      {/*  <li>✅ Site is served over HTTPS (required)</li>*/}
      {/*  <li>✅ Has a valid web app manifest</li>*/}
      {/*  <li>✅ Has a registered service worker</li>*/}
      {/*  <li>✅ Has appropriate icons (192px and 512px)</li>*/}
      {/*  <li>📊 User must visit site at least twice</li>*/}
      {/*  <li>⏱️ There must be 30 seconds between visits</li>*/}
      {/*  <li>👆 User must interact with the site</li>*/}
      {/*</ul>*/}
    </div>
  )
}
