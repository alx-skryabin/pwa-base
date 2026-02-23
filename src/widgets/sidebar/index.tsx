import React from 'react'
import { ROUTES } from '@app/routes'
import { NavLink } from 'react-router'
import ThemeToggle from '@features/ThemeToggle'
import './sidebar.css'

interface SidebarProps {
  isSidebarOpen: boolean
  closeSidebar: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  const menuItems = [
    { path: ROUTES.HOME, icon: '📋', label: 'Главная' },
    { path: ROUTES.MAP, icon: '🗺️', label: 'Карта' },
    { path: ROUTES.DEV, icon: '📊', label: 'Develop' },
    { path: 'wrong', icon: '▶', label: 'Wrong' },
  ]

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} aria-label="Боковое меню">
      <nav className="sidebar-nav">
        <h2>Меню</h2>
        <ul>
          {menuItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ThemeToggle />

      <div className="sidebar-footer">
        <span>Версия 1.0.0</span>
      </div>
    </aside>
  )
}
