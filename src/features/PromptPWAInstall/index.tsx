import React, { useEffect, useState } from 'react'
import { usePWA } from '@shared/libs/pwa'
import { OPEN_PWA_PROMPT_DELAY } from '@shared/libs/pwa/config/pwa.ts'
import { Button } from 'antd'
import { ClockCircleOutlined, BellOutlined, DownloadOutlined } from '@ant-design/icons'
import './index.css'

const PromptPWAInstall: React.FC = () => {
  const [isShowBanner, setIsShowBanner] = useState<boolean>(false)
  const { isInstallable, isInstalled, promptInstall } = usePWA()

  // Показываем баннер через 3 с, если приложение можно установить
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => setIsShowBanner(true), OPEN_PWA_PROMPT_DELAY)
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
      <h3>
        <BellOutlined /> Установите приложение
      </h3>
      <small>После установки ярлык добавится на рабочий стол.</small>
      <div className="prompt-pwa_actions">
        <Button icon={<ClockCircleOutlined />} size="large" onClick={() => setIsShowBanner(false)}>
          Позже
        </Button>
        <Button icon={<DownloadOutlined />} size="large" type="primary" onClick={handleInstall}>
          Установить
        </Button>
      </div>
    </div>
  )
}

export default PromptPWAInstall
