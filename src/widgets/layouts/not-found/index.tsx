import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { ROUTES } from '@app/routes/path.ts'
import './index.css'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="not-found-content" aria-label="Страница не найдена" role="alert">
        <h1>Страница не найдена</h1>
        <Button icon={<HomeOutlined />} size="large" onClick={() => navigate(ROUTES.HOME)}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  )
}
