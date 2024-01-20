import { fakerKO as faker } from '@faker-js/faker'

import { Product, Shop } from '@/types'

export function getMockProductData(defaultValue?: Partial<Product>) {
  const data: Product = {
    id: defaultValue?.id ?? faker.string.uuid(),
    title: defaultValue?.title ?? faker.commerce.productName(),
    price:
      defaultValue?.price ?? faker.number.int({ min: 10, max: 1000 }) * 100,
    address: defaultValue?.address ?? faker.location.city(),
    description: defaultValue?.description ?? faker.lorem.sentences(10, '\n'),
    imageUrls:
      defaultValue?.imageUrls ??
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
        faker.image.dataUri(),
      ),
    isChangable: defaultValue?.isChangable ?? faker.datatype.boolean(),
    isUsed: defaultValue?.isUsed ?? faker.datatype.boolean(),
    tags:
      defaultValue?.tags ?? faker.datatype.boolean()
        ? Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
            faker.lorem.word(),
          )
        : null,
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    purchaseBy:
      defaultValue?.purchaseBy ?? faker.datatype.boolean()
        ? faker.string.uuid()
        : null,
  }
  return data
}

export function getMockShopData(defaultValue?: Partial<Shop>) {
  const data: Shop = {
    id: defaultValue?.id ?? faker.string.uuid(),
    name: defaultValue?.name ?? faker.internet.displayName(),
    imageUrl: defaultValue?.imageUrl ?? faker.image.dataUri(),
    introduce: defaultValue?.introduce ?? faker.lorem.sentences(3, '\n'),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

export const timeout = (ms = 3000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
