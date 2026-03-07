import React from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import logo from '@assets/img/logo.png'
import { NavLink } from 'react-router'
import { ROUTES } from '@app/routes/path.ts'
import HamburgerToggle from '@features/HamburgerToggle'
import './header.css'

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
            <span>My App {isOnline ? '🟢' : '🔴'}</span>
          </div>
        </NavLink>

        <HamburgerToggle toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
    </header>
  )
}
