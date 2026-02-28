import React from 'react'
import './index.css'

interface HamburgerToggleProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const HamburgerToggle: React.FC<HamburgerToggleProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
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
  )
}

export default HamburgerToggle
