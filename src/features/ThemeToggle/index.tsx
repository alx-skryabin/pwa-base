import React from 'react'
import { Switch, Space } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@shared/libs/theme/libs/useTheme.ts'

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <Space style={{ transform: 'scale(1.2)' }}>
      <SunOutlined />
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
        style={{ background: isDarkMode ? '#2b5278' : '#dddddd' }}
      />
      <MoonOutlined />
    </Space>
  )
}

export default ThemeToggle
