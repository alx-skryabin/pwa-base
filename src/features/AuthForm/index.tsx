import React from 'react'
import { userModel } from '@entities/user'
import { useSession } from '@entities/session'
import { LoginOutlined } from '@ant-design/icons'
import { App, Button, Form, Input } from 'antd'

interface LoginFormValues {
  login: string
  password: string
}

const AuthForm: React.FC = () => {
  const { message } = App.useApp()
  const { login } = useSession()

  const onFinish = async (values: LoginFormValues) => {
    const user = userModel.findUser(
      values.login.trim().toLowerCase(),
      values.password.toLowerCase()
    )
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
    <Form<LoginFormValues> name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Введите логин' }]}>
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
  )
}

export default AuthForm
