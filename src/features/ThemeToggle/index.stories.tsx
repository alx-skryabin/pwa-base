import type { Meta, StoryObj } from '@storybook/react-vite'
import ThemeToggle from '@features/ThemeToggle/index.tsx'

const meta = {
  title: 'Features/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
