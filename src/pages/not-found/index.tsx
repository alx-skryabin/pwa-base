import React from 'react'
import { useNavigate } from 'react-router'
import { Button } from 'antd'
import { ROUTES } from '@app/routes/path.ts'
import './index.css'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="page-404" aria-label="Страница не найдена">
      <h1>Страница не найдена</h1>
      <Button ghost size="large" onClick={() => navigate(ROUTES.HOME)}>
        Вернуться на главную
      </Button>
    </div>
  )
}

export default NotFound
