import React from 'react'
import { usePWA } from '@shared/libs/pwa'
import logo from '@shared/assets/img/logo.png'
import { NavLink } from 'react-router'
import { ROUTES } from '@app/routes/config/path.ts'
import HamburgerToggle from '@features/HamburgerToggle'
import { WifiOutlined, DisconnectOutlined } from '@ant-design/icons'
import './index.css'

interface HeaderProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { isOnline } = usePWA()

  return (
    <header className="header" aria-label="Шапка сайта">
      <div className="header-container">
        <NavLink
          to={ROUTES.HOME}
          onClick={() => {
            if (isSidebarOpen) toggleSidebar()
          }}
        >
          <div className="logo">
            <img src={logo} alt="Логотип" width="40" height="40" />
            <span>My App</span>
          </div>
        </NavLink>
        <span>
          {isOnline ? <WifiOutlined /> : <DisconnectOutlined />}{' '}
          <small>{isOnline ? 'Online' : 'Offline'}</small>
        </span>

        <HamburgerToggle toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </header>
  )
}
