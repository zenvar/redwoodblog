import type { Meta, StoryObj } from '@storybook/react'

import NewsDetailsPage from './NewsDetailsPage'

const meta: Meta<typeof NewsDetailsPage> = {
  component: NewsDetailsPage,
}

export default meta

type Story = StoryObj<typeof NewsDetailsPage>

export const Primary: Story = {}
