import React from 'react'
import { useLocation, Navigate } from 'react-router'
import { useSession } from '@entities/session'
import { useMetaApp } from '@shared/hooks/useMetaApp/useMetaApp.ts'
import { ROUTES } from '@app/routes/path'
import ThemeToggle from '@features/ThemeToggle'
import { Card } from 'antd'
import { DB_VERSION } from '@shared/libs/indexedDb'
import logo from '@shared/assets/img/logo.png'
import AuthForm from '@features/AuthForm'

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useSession()
  const { version } = useMetaApp()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.HOME

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex' }}>
          <img
            style={{ borderRadius: 10, marginRight: 10 }}
            src={logo}
            alt="Логотип"
            width="30"
            height="30"
          />
          <div style={{ fontSize: 18, fontWeight: 600 }}>My App</div>
        </div>
      }
    >
      <AuthForm />
      <div style={{ textAlign: 'center' }}>
        <ThemeToggle />
        <div style={{ fontSize: 12, marginTop: 10 }}>
          Версия: {version}:::{DB_VERSION}i
        </div>
      </div>
    </Card>
  )
}

export default LoginPage
