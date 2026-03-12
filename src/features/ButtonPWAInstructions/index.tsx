import React from 'react'
import { usePWA } from '@app/pwa/usePWA'
import { Button } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

const ButtonPWAInstructions: React.FC = () => {
  const { setOpenModal } = usePWA()

  return (
    <Button
      size="large"
      icon={<InfoCircleOutlined />}
      onClick={() => setOpenModal(true)}
      title="Как установить приложение"
    >
      Как установить
    </Button>
  )
}

export default ButtonPWAInstructions
