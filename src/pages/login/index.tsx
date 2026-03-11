import React from 'react'
import { Form, Input, Button, Card, App } from 'antd'
import { useLocation, Navigate } from 'react-router'
import { useSession } from '@entities/session'
import { ROUTES } from '@app/routes/path'
import type { SessionUser } from '@entities/session'
import type { UsersMap } from '@entities/user'

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
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.HOME

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const onFinish = async (values: LoginFormValues) => {
    const user = findUser(values.login.trim(), values.password)
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
    <Card title="Войти" size="small">
      <Form<LoginFormValues> name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder="Пароль" autoComplete="off" autoCorrect="no" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Login
