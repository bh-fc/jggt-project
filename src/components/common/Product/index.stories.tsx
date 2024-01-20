import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'

import Product from '.'

const meta = {
  title: 'Product',
  component: Product,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <div className="w-52">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Product>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultProduct: Story = {
  args: {
    title: '샘플 제품',
    price: 50_000,
    createdAt: '2021-01-01',
    imageUrl: faker.image.dataUri(),
  },
}

export const SoldOutProduct: Story = {
  args: {
    title: '샘플 제품',
    price: 50_000,
    createdAt: '2021-01-01',
    imageUrl: faker.image.dataUri(),
    isSoldOut: true,
  },
}
