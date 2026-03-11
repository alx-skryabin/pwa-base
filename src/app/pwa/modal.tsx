import React, { useEffect } from 'react'
import { usePWA } from '@app/pwa/usePWA.ts'
import { Button, Modal } from 'antd'

const PWAInstructionsModal: React.FC = () => {
  const { openModal, setOpenModal, showInstallInstructions } = usePWA()

  // Показываем баннер через 3 с, если PWA не поддерживается нативно
  useEffect(() => {
    if (showInstallInstructions) {
      const timer = setTimeout(() => setOpenModal(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [setOpenModal, showInstallInstructions])

  return (
    <Modal
      title="Как установить приложение"
      open={openModal}
      onCancel={() => setOpenModal(false)}
      footer={[
        <Button key="close" onClick={() => setOpenModal(false)}>
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
