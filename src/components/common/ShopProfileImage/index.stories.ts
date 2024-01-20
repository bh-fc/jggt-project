import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'

import ShopProfileImage from '.'

const meta = {
  title: 'ShopProfileImage',
  component: ShopProfileImage,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ShopProfileImage>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultShopProfileImage: Story = {
  args: {},
}

export const ImagedShopProfileImage: Story = {
  args: {
    imageUrl: faker.image.dataUri(),
  },
}
