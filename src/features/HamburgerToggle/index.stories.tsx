import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import HamburgerToggle from '@features/HamburgerToggle/index.tsx'

const meta = {
  title: 'Features/HamburgerToggle',
  component: HamburgerToggle,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isSidebarOpen: { control: 'boolean', description: 'Открыта ли боковая панель' },
    toggleSidebar: { action: 'toggleSidebar', description: 'Переключение панели' },
  },
} satisfies Meta<typeof HamburgerToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  args: {
    isSidebarOpen: false,
    toggleSidebar: fn(),
  },
}

export const Open: Story = {
  args: {
    isSidebarOpen: true,
    toggleSidebar: fn(),
  },
}
