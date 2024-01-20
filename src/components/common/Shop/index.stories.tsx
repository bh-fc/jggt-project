import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'

import Shop from '.'

const meta = {
  title: 'Shop',
  component: Shop,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <div className="border p-2" style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Shop>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultShop: Story = {
  args: {
    name: '상점',
    productCount: 999,
    followerCount: 999,
    type: 'row',
  },
}

export const ImagedShop: Story = {
  args: {
    name: '상점',
    productCount: 999,
    followerCount: 999,
    type: 'row',
    profileImageUrl: faker.image.dataUri(),
  },
}
