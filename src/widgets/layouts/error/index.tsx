import { ROUTES } from '@app/routes/path.ts'
import { Button } from 'antd'
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons'
import { isLocal } from '@shared/helpers'
import './index.css'

interface ErrorLayoutProps {
  message: string
  isHomeBtn: boolean
}

export const ErrorLayout = ({ message, isHomeBtn }: ErrorLayoutProps) => {
  const handleRetry = () => {
    window.location.reload()
  }

  const handleHome = () => {
    window.location.href = ROUTES.HOME
  }

  return (
    <div className="error-container">
      <div className="error-content" aria-label="Ошибка приложения" role="alert">
        <h1>Что-то пошло не так!</h1>
        {isLocal() ? <p>{message}</p> : <p>Мы уже выясняем причину</p>}

        <Button icon={<ReloadOutlined />} size="large" onClick={handleRetry}>
          Попробовать снова
        </Button>
        {isHomeBtn && (
          <Button icon={<HomeOutlined />} size="large" onClick={handleHome}>
            Вернуться на главную
          </Button>
        )}
      </div>
    </div>
  )
}
