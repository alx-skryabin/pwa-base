import React from 'react'
import { useNavigate } from 'react-router'
import { usePWA } from '@app/pwa/usePWA.ts'
import { useMetaApp } from '@shared/hooks/useMetaApp.ts'
import { useSession } from '@entities/session'
import { NavLink } from 'react-router'
import ThemeToggle from '@features/ThemeToggle'
import PWAInstallInstructions from '@features/PWAInstallInstructions'
import { ROUTES } from '@app/routes/path.ts'
import { DB_VERSION } from '@shared/libs/indexedDb'
import { Button } from 'antd'
import './sidebar.css'

interface SidebarProps {
  isSidebarOpen: boolean
  closeSidebar: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  const navigate = useNavigate()
  const { logout } = useSession()
  const { isInstalled, isInstallable, promptInstall } = usePWA()
  const { version } = useMetaApp()

  const handleLogout = () => {
    logout()
    closeSidebar()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  const menuItems = [
    { path: ROUTES.HOME, icon: '🔔', label: 'Главная' },
    { path: ROUTES.MAP, icon: '📍️', label: 'Карта' },
    { path: ROUTES.DEV, icon: '🔥', label: 'Develop' },
    { path: ROUTES.LOGIN, icon: '👈', label: 'Login' },
    { path: 'wrong', icon: '⛔', label: 'Wrong' },
  ]

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} aria-label="Боковое меню">
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <span>{item.icon} </span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-app">
        {isInstalled ? (
          <small>📲 Приложение установлено</small>
        ) : isInstallable ? (
          <Button icon="📲" onClick={promptInstall} title="Установить приложение">
            Установить
          </Button>
        ) : (
          <PWAInstallInstructions />
        )}
      </div>

      <div className="sidebar-theme">
        <ThemeToggle />
      </div>

      <div className="sidebar-logout">
        <Button onClick={handleLogout} block>
          Выйти
        </Button>
      </div>

      <div className="sidebar-version">
        <span>
          Версия: {version}:::{DB_VERSION}i
        </span>
      </div>
    </aside>
  )
}
