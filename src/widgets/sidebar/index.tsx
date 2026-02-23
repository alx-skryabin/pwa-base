import React from 'react'
import { ROUTES } from '@app/routes'
import { NavLink } from 'react-router'
import ThemeToggle from '@features/ThemeToggle'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const menuItems = [
    { path: ROUTES.HOME, icon: '📋', label: 'Главная' },
    { path: ROUTES.MAP, icon: '🗺️', label: 'Карта' },
    { path: ROUTES.DEV, icon: '📊', label: 'Develop' },
    { path: 'wrong', icon: '▶', label: 'Wrong' },
  ]

  return (
    <aside>
      <div>
        <button onClick={onToggle}>{isOpen ? '◀' : '▶'}</button>
      </div>

      <br />
      <nav>
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            // className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <span>{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div>
        <ThemeToggle />
      </div>
    </aside>
  )
}
