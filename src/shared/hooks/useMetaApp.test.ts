/**
 * Тесты хука useMetaApp (shared/hooks/useMetaApp).
 * Проверяют: возвращаемый объект содержит version, name, releaseTime, author, mode
 * и что значения имеют ожидаемые типы.
 */
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMetaApp } from './useMetaApp'

describe('useMetaApp', () => {
  it('returns object with version, name, releaseTime, author, mode', () => {
    const { result } = renderHook(() => useMetaApp())
    expect(result.current).toHaveProperty('version')
    expect(result.current).toHaveProperty('name')
    expect(result.current).toHaveProperty('releaseTime')
    expect(result.current).toHaveProperty('author')
    expect(result.current).toHaveProperty('mode')
  })

  it('version, name, mode are non-empty strings', () => {
    const { result } = renderHook(() => useMetaApp())
    expect(typeof result.current.version).toBe('string')
    expect(typeof result.current.name).toBe('string')
    expect(typeof result.current.mode).toBe('string')
    expect(result.current.version.length).toBeGreaterThan(0)
    expect(result.current.name.length).toBeGreaterThan(0)
  })
})
