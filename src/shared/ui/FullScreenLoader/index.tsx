import React, { useEffect, useRef, useState } from 'react'
import { Spin } from 'antd'
import './index.css'

interface FullScreenLoaderProps {
  size?: 'small' | 'large'
  text?: string
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ size, text }) => {
  const [percent, setPercent] = useState(-50)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent(v => {
        const nextPercent = v + 5
        return nextPercent > 150 ? -50 : nextPercent
      })
    }, 100)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [percent])

  return (
    <div className="full-screen-loader">
      <Spin percent={percent} size={size ?? 'default'} />
      <span>{text ?? 'Загрузка'}</span>
    </div>
  )
}
