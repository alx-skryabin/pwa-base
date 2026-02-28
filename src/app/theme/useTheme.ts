import { useContext } from 'react'
import { ThemeContext } from '@app/theme/ThemeContext.ts'

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a Index')
  }
  return context
}
