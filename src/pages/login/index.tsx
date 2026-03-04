import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import { useNavigate, useLocation, Navigate } from 'react-router'
import { useSession } from '@entities/session'
import { ROUTES } from '@app/routes/path'
import { apiLogger } from '@shared/libs/logger'

interface LoginFormValues {
  login: string
  password: string
}

const Login: React.FC = () => {
  const { login, isAuthenticated } = useSession()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.HOME

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const onFinish = (values: LoginFormValues) => {
    // Заглушка: после подключения API здесь вызов auth API и затем login(user)
    apiLogger.info('Sending login form')
    login({
      id: '1',
      login: values.login,
    })
    navigate(from, { replace: true })
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
          <Input.Password placeholder="Пароль" />
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
