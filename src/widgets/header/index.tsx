import React from 'react'
import './header.css'

interface HeaderProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="header" aria-label="Шапка сайта">
      <div className="header-container">
        <div className="logo">
          <img src="/logo.svg" alt="Логотип" width="40" height="40" />
          <span>PWA App</span>
        </div>

        {/* Гамбургер для мобильной версии */}
        <button
          className={`hamburger ${isSidebarOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
          aria-label="Открыть меню"
          aria-expanded={isSidebarOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
