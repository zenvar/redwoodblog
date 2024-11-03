import type { Meta, StoryObj } from '@storybook/react'

import NewsPage from './NewsPage'

const meta: Meta<typeof NewsPage> = {
  component: NewsPage,
}

export default meta

type Story = StoryObj<typeof NewsPage>

export const Primary: Story = {}
