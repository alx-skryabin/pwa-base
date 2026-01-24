import React, { useState, useEffect } from 'react';
import { usePWAInstall } from './hooks/usePWAInstall';
import './App.css';

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
  const [showInstallGuide, setShowInstallGuide] = useState<boolean>(false);

  // Мониторинг онлайн статуса
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Автоматически показываем гайд установки через 5 секунд
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallGuide(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  // Функция для ручной установки
  const handleInstall = async () => {
    await promptInstall();
    setShowInstallGuide(false);
  };

  // Функция для проверки критериев PWA
  const checkPWACriteria = () => {
    const criteria = {
      hasServiceWorker: 'serviceWorker' in navigator,
      hasManifest: document.querySelector('link[rel="manifest"]') !== null,
      isHTTPS: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
      hasIcons: document.querySelector('link[rel="icon"]') !== null,
      hasShortName: document.querySelector('meta[name="short_name"]') !== null,
      displayMode: window.matchMedia('(display-mode: standalone)').matches,
    };

    console.log('PWA Criteria Check:', criteria);
    return criteria;
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="header-title">
              <h1>Vite PWA Application</h1>
              <div className="pwa-badges">
                {isInstalled && (
                  <span className="badge installed">📱 Installed</span>
                )}
                {isInstallable && (
                  <span className="badge installable">⬇️ Installable</span>
                )}
                <span className={`badge ${isOnline ? 'online' : 'offline'}`}>
                  {isOnline ? '🟢 Online' : '🔴 Offline'}
                </span>
              </div>
            </div>

            <div className="header-actions">
              {isInstallable && !isInstalled && (
                <button
                  className="btn btn-install"
                  onClick={handleInstall}
                  title="Install App to Home Screen"
                >
                  <span className="btn-icon">📲</span>
                  <span className="btn-text">Install App</span>
                </button>
              )}

              <button
                className="btn btn-info"
                onClick={() => checkPWACriteria()}
                title="Check PWA Status"
              >
                ℹ️ PWA Info
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Баннер с гайдом установки */}
          {showInstallGuide && isInstallable && !isInstalled && (
            <div className="install-guide">
              <div className="guide-content">
                <h3>📲 Install Our App!</h3>
                <p>Get the full experience with offline support and faster loading.</p>
                <div className="guide-actions">
                  <button className="btn btn-primary" onClick={handleInstall}>
                    Install Now
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowInstallGuide(false)}
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
              <button
                className="guide-close"
                onClick={() => setShowInstallGuide(false)}
              >
                ×
              </button>
            </div>
          )}

          <section className="hero">
            <h2>Progressive Web App Demo</h2>
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-label">App Installed: </span>
                <span className="stat-value">{isInstalled ? 'Yes' : 'No'}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Can Install: </span>
                <span className="stat-value">{isInstallable ? 'Yes' : 'No'}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Online: </span>
                <span className="stat-value">{isOnline ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </section>

          <section className="instructions">
            <h3>How to Install This PWA</h3>

            {!isInstallable && !isInstalled && (
              <div className="pwa-requirements">
                <h4>Why install button might not appear:</h4>
                <ul>
                  <li>✅ Site is served over HTTPS (required)</li>
                  <li>✅ Has a valid web app manifest</li>
                  <li>✅ Has a registered service worker</li>
                  <li>✅ Has appropriate icons (192px and 512px)</li>
                  <li>📊 User must visit site at least twice</li>
                  <li>⏱️ There must be 30 seconds between visits</li>
                  <li>👆 User must interact with the site</li>
                </ul>
                <p className="tip">
                  <strong>Tip:</strong> Reload the page after 30 seconds of interaction.
                </p>
              </div>
            )}

            {isInstalled && (
              <div className="installed-message success">
                <h4>🎉 App Successfully Installed!</h4>
                <p>You can now use this app offline and launch it from your home screen.</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    // Действия для уже установленного приложения
                    alert('App is already installed! Try using it offline.');
                  }}
                >
                  Test Offline Mode
                </button>
              </div>
            )}
          </section>

          {/* Секция для разработчиков */}
          <details className="dev-section">
            <summary>Developer Information</summary>
            <div className="dev-content">
              <h4>PWA Status Details:</h4>
              <pre className="status-code">
                {JSON.stringify({
                  displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser',
                  isInstallable,
                  isInstalled,
                  userAgent: navigator.userAgent.substring(0, 100) + '...',
                  platform: navigator.platform,
                }, null, 2)}
              </pre>

              <button
                className="btn btn-small"
                onClick={() => {
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(regs => {
                      console.log('Service Workers:', regs);
                      alert(`${regs.length} service worker(s) registered`);
                    });
                  }
                }}
              >
                Check Service Workers
              </button>
            </div>
          </details>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <p>Built with Vite + React + TypeScript + PWA</p>
            <div className="footer-info">
              <span>Display Mode: {window.matchMedia('(display-mode: standalone)').matches ? 'Standalone' : 'Browser'}</span>
              <span>•</span>
              <span>Status: {isOnline ? 'Online' : 'Offline'}</span>
              <span>•</span>
              <span>PWA: {isInstalled ? 'Installed' : 'Not Installed'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
