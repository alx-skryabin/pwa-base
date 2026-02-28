import React from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import { useMetaApp } from '@shared/hooks/useMetaApp.ts'
import { NavLink } from 'react-router'
import ThemeToggle from '@features/ThemeToggle'
import { ROUTES } from '@app/routes/path.ts'
import { Button } from 'antd'
import './sidebar.css'

interface SidebarProps {
  isSidebarOpen: boolean
  closeSidebar: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  const { isInstalled, isInstallable, promptInstall } = usePWA()
  const { version } = useMetaApp()

  const menuItems = [
    { path: ROUTES.HOME, icon: '🔔', label: 'Главная' },
    { path: ROUTES.MAP, icon: '📍️', label: 'Карта' },
    { path: ROUTES.DEV, icon: '🔥', label: 'Develop' },
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
        {!isInstalled && isInstallable ? (
          <Button icon="📲" onClick={promptInstall} title="Install App to Home Screen">
            Установить
          </Button>
        ) : (
          <small>📲 Приложение установленно</small>
        )}
      </div>

      <div className="sidebar-theme">
        <ThemeToggle />
      </div>

      <div className="sidebar-version">
        <span>Версия: {version}</span>
      </div>
    </aside>
  )
}
