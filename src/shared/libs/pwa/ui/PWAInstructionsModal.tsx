import React, { useEffect } from 'react'
import { usePWA } from '@shared/libs/pwa'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { pwaLogger } from '@shared/libs/logger'
import { OPEN_PWA_PROMPT_DELAY } from '@shared/libs/pwa/config/pwa.ts'

const SESSION_KEY_AGREE = 'read_instructions'

const PWAInstructionsModal: React.FC = () => {
  const { openModal, setOpenModal, showInstallInstructions } = usePWA()

  // Показываем баннер через 3 с, если PWA не поддерживается нативно
  useEffect(() => {
    const isRead = sessionStorage.getItem(SESSION_KEY_AGREE)

    if (showInstallInstructions && isRead !== 'true') {
      const timer = setTimeout(() => setOpenModal(true), OPEN_PWA_PROMPT_DELAY)
      return () => clearTimeout(timer)
    }
  }, [setOpenModal, showInstallInstructions])

  const handleClose = () => {
    setOpenModal(false)
    pwaLogger.debug('Choice remembered:', SESSION_KEY_AGREE)
    sessionStorage.setItem(SESSION_KEY_AGREE, 'true')
  }

  return (
    <Modal
      title="Как установить приложение"
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={[
        <Button size="large" key="close" icon={<CheckCircleOutlined />} onClick={handleClose}>
          Понятно
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p>
          Ваш браузер не показывает встроенную кнопку установки. Добавьте приложение через меню
          браузера:
        </p>
        <div>
          <strong>Firefox (на компьютере)</strong>
          <ul style={{ marginTop: 4, marginBottom: 0 }}>
            <li>Меню (три полоски ⋮) → «Установить» или «Установить приложение»</li>
            <li>Либо иконка «Установить» в адресной строке справа</li>
          </ul>
        </div>
        <div>
          <strong>Firefox (Android)</strong>
          <ul style={{ marginTop: 4, marginBottom: 0 }}>
            <li>Меню (⋮) → «Установить» или «Добавить на главный экран»</li>
          </ul>
        </div>
        <div>
          <strong>Safari (iPhone/iPad)</strong>
          <ul style={{ marginTop: 4, marginBottom: 0 }}>
            <li>Кнопка «Поделиться» → «На экран „Домой“»</li>
          </ul>
        </div>
        <div>
          <strong>Chrome / Яндекс.Браузер</strong>
          <ul style={{ marginTop: 4, marginBottom: 0 }}>
            <li>
              Обычно в этих браузерах появляется наша кнопка «Установить» или иконка в адресной
              строке. Если не видите — обновите страницу или закройте и откройте вкладку.
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}

export default PWAInstructionsModal
