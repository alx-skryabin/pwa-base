import React from 'react'
import { Outlet } from 'react-router'
import './auth-layout.css'

export const AuthLayout: React.FC = () => {
  return (
    <div className="auth-container" aria-label="Экран входа">
      <Outlet />
    </div>
  )
}
