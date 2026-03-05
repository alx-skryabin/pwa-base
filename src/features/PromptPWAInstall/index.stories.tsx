import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { fn } from 'storybook/test'
import { PWAContext } from '@app/pwa/context.ts'
import type { PWAContextType } from '@app/pwa/context.ts'
import PromptPWAInstall from '@features/PromptPWAInstall/index.tsx'

const mockPWAContext: PWAContextType = {
  isOnline: true,
  isInstallable: true,
  isInstalled: false,
  promptInstall: fn(),
  installEvent: null,
}

function withPWAProvider(Story: React.FC, _context: { globals?: Record<string, unknown> }) {
  return (
    <PWAContext.Provider value={mockPWAContext}>
      <Story />
    </PWAContext.Provider>
  )
}

const meta = {
  title: 'Features/PromptPWAInstall',
  component: PromptPWAInstall,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withPWAProvider],
} satisfies Meta<typeof PromptPWAInstall>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Баннер установки PWA.
 * В реальном приложении показывается через ~3 с, если приложение можно установить.
 */
export const Visible: Story = {}

/** В реальном приложении не рендерится, если уже установлено или нельзя установить */
export const HiddenWhenInstalled: Story = {
  decorators: [
    Story => (
      <PWAContext.Provider
        value={{
          ...mockPWAContext,
          isInstalled: true,
        }}
      >
        <Story />
      </PWAContext.Provider>
    ),
  ],
}
