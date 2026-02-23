import React from 'react'
import { Switch, Space } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTheme } from '@app/providers/ThemeProvider.tsx'

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <Space>
      <SunOutlined style={{ color: isDarkMode ? '#8c8c8c' : '#faad14' }} />
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
        style={{ background: isDarkMode ? '#1890ff' : '#d9d9d9' }}
      />
      <MoonOutlined style={{ color: isDarkMode ? '#1890ff' : '#8c8c8c' }} />
    </Space>
  )
}

export default ThemeToggle
