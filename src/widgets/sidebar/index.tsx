import React from 'react'
import { useNavigate } from 'react-router'
import { usePWA } from '@shared/libs/pwa'
import { useMetaApp } from '@shared/hooks/useMetaApp/useMetaApp.ts'
import { useSession } from '@entities/session'
import { NavLink } from 'react-router'
import ThemeToggle from '@features/ThemeToggle'
import ButtonPWAInstructions from '@features/ButtonPWAInstructions'
import { ROUTES } from '@app/routes/config/path.ts'
import { DB_VERSION } from '@shared/libs/indexedDb'
import { Button } from 'antd'
import {
  StopOutlined,
  DownloadOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from '@ant-design/icons'
import './index.css'

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
    { path: ROUTES.HOME, icon: <HomeOutlined />, label: 'Главная' },
    { path: ROUTES.MAP, icon: <EnvironmentOutlined />, label: 'Карта' },
    { path: ROUTES.DEV, icon: <GithubOutlined />, label: 'Develop' },
    { path: ROUTES.LOGIN, icon: <LoginOutlined />, label: 'Login' },
    { path: 'wrong', icon: <StopOutlined />, label: '404' },
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
          <Button
            size="large"
            icon={<DownloadOutlined />}
            onClick={promptInstall}
            title="Установить приложение"
          >
            Установить
          </Button>
        ) : (
          <ButtonPWAInstructions />
        )}
      </div>

      <div className="sidebar-theme">
        <ThemeToggle />
      </div>

      <div className="sidebar-logout">
        <Button icon={<LogoutOutlined />} size="large" onClick={handleLogout} block>
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
