import { createContext } from 'react'
import { ThemeContextValue } from '../model/types'

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
