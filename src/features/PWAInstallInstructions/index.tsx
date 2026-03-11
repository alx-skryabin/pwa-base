import React, { useState } from 'react'
import { usePWA } from '@app/pwa/usePWA'
import { Button, Modal } from 'antd'

const PWAInstallInstructions: React.FC = () => {
  const { showInstallInstructions } = usePWA()
  const [open, setOpen] = useState(false)

  if (!showInstallInstructions) return null

  return (
    <>
      <Button onClick={() => setOpen(true)} title="Как установить приложение">
        📲 Как установить
      </Button>
      <Modal
        title="Как установить приложение"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
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
    </>
  )
}

export default PWAInstallInstructions
