import React from 'react'
import { Switch, Space } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@app/theme/useTheme.ts'

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <Space>
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
