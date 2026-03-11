import React from 'react'
import { usePWA } from '@app/pwa/usePWA'
import { Button } from 'antd'

const ButtonPWAInstructions: React.FC = () => {
  const { setOpenModal } = usePWA()

  return (
    <Button onClick={() => setOpenModal(true)} title="Как установить приложение">
      📲 Как установить
    </Button>
  )
}

export default ButtonPWAInstructions
