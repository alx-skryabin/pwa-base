import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '@widgets/sidebar'

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/*<main className={`${styles.content} ${!isSidebarOpen ? styles.contentExpanded : ''}`}>*/}
      <main>
        <Outlet /> {/* Здесь будут рендериться страницы */}
      </main>
    </div>
  )
}
