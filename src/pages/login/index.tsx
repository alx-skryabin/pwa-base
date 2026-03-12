import React from 'react'
import { LoginOutlined } from '@ant-design/icons'
import { useLocation, Navigate } from 'react-router'
import { useSession } from '@entities/session'
import { useMetaApp } from '@shared/hooks/useMetaApp.ts'
import { ROUTES } from '@app/routes/path'
import ThemeToggle from '@features/ThemeToggle'
import { Form, Input, Button, Card, App } from 'antd'
import type { SessionUser } from '@entities/session'
import type { UsersMap } from '@entities/user'
import { DB_VERSION } from '@shared/libs/indexedDb'
import logo from '@assets/img/logo.png'

import usersData from '@assets/data-user/users.json'

const users = usersData as UsersMap

interface LoginFormValues {
  login: string
  password: string
}

/** Проверка по users.json: пользователь есть и пароль совпадает с логином (имитация). */
function findUser(login: string, password: string): SessionUser | null {
  const u = users[login]
  if (!u || password !== u.login) return null
  return {
    id: u.login,
    login: u.login,
    name: u.name,
    role: u.role,
  }
}

const Login: React.FC = () => {
  const { message } = App.useApp()
  const { login, isAuthenticated } = useSession()
  const { version } = useMetaApp()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.HOME

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const onFinish = async (values: LoginFormValues) => {
    const user = findUser(values.login.trim().toLowerCase(), values.password.toLowerCase())
    if (!user) {
      message.error('Неверный логин или пароль')
      return
    }
    try {
      await login(user)
    } catch {
      message.error('Ошибка входа')
    }
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
      <Form<LoginFormValues> name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input size="large" placeholder="Логин" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password size="large" placeholder="Пароль" autoComplete="off" autoCorrect="no" />
        </Form.Item>
        <Form.Item>
          <Button icon={<LoginOutlined />} size="large" type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        <ThemeToggle />
        <div style={{ fontSize: 12, marginTop: 10 }}>
          Версия: {version}:::{DB_VERSION}i
        </div>
      </div>
    </Card>
  )
}

export default Login
