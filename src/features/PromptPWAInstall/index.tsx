import React, { useEffect, useState } from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import { Button } from 'antd'
import './index.css'

const PromptPWAInstall: React.FC = () => {
  const [isShowBanner, setIsShowBanner] = useState<boolean>(false)
  const { isInstallable, isInstalled, promptInstall } = usePWA()

  // Автоматически показываем гайд установки через 3 секунд
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setIsShowBanner(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isInstallable, isInstalled])

  const handleInstall = async () => {
    await promptInstall()
    setIsShowBanner(false)
  }

  if (!isShowBanner || !isInstallable || isInstalled) {
    return null
  }

  return (
    <div className="prompt-pwa">
      <h3>📲 Установите приложение</h3>
      <small>После установки ярлык добавится на ваш рабочий экран.</small>
      <div className="prompt-pwa_actions">
        <Button onClick={() => setIsShowBanner(false)}>Позже</Button>
        <Button type="primary" onClick={handleInstall}>
          Установить
        </Button>
      </div>
    </div>
  )
}

export default PromptPWAInstall
