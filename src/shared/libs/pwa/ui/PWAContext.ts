import { createContext } from 'react'
import type { PWAContextValue } from '../model/types'

export const PWAContext = createContext<PWAContextValue | undefined>(undefined)
