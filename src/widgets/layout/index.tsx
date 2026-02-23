import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '@widgets/sidebar'
import { Header } from '@widgets/header'
import './layout.css'

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="app-container">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      {/*<main className={`${styles.content} ${!isSidebarOpen ? styles.contentExpanded : ''}`}>*/}

      <main
        className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}
        aria-label="Основной контент"
      >
        {isSidebarOpen && <div className="overlay" onClick={closeSidebar} />}

        <Outlet />
      </main>
    </div>
  )
}
