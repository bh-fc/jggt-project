import { fakerKO as faker } from '@faker-js/faker'

import {
  ChatMessage,
  ChatRoom,
  Follow,
  Like,
  Product,
  Review,
  Shop,
} from '@/types'

export function getMockProductData(defaultValue?: Partial<Product>) {
  const data: Product = {
    id: defaultValue?.id ?? faker.string.uuid(),
    title: defaultValue?.title ?? faker.commerce.productName(),
    price:
      defaultValue?.price ?? faker.number.int({ min: 10, max: 1000 }) * 100,
    address: defaultValue?.address ?? '서울특별시 중구',
    description: defaultValue?.description ?? faker.lorem.sentences(10, '\n'),
    imageUrls:
      defaultValue?.imageUrls ??
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
        faker.image.dataUri(),
      ),
    isChangeable: defaultValue?.isChangeable ?? faker.datatype.boolean(),
    isUsed: defaultValue?.isUsed ?? faker.datatype.boolean(),
    tags:
      defaultValue?.tags ??
      (faker.datatype.boolean()
        ? Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
            faker.lorem.word(),
          )
        : null),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    purchaseBy:
      defaultValue?.purchaseBy ??
      (faker.datatype.boolean() ? faker.string.uuid() : null),
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

export function getMockReviewData(defaultValue?: Partial<Review>) {
  const data: Review = {
    id: defaultValue?.id ?? faker.string.uuid(),
    productId: defaultValue?.productId ?? faker.string.uuid(),
    contents: defaultValue?.contents ?? faker.lorem.sentences(3, '\n'),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

export function getMockLikeData(defaultValue?: Partial<Like>) {
  const data: Like = {
    id: defaultValue?.id ?? faker.string.uuid(),
    productId: defaultValue?.productId ?? faker.string.uuid(),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

export function getMockFollowData(defaultValue?: Partial<Follow>) {
  const data: Follow = {
    id: defaultValue?.id ?? faker.string.uuid(),
    followingShopId: defaultValue?.followingShopId ?? faker.string.uuid(),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
  }
  return data
}

export function getMockChatRoomData(defaultValue?: Partial<ChatRoom>) {
  const data: ChatRoom = {
    id: defaultValue?.id ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
    fromShopId: defaultValue?.fromShopId ?? faker.string.uuid(),
    toShopId: defaultValue?.toShopId ?? faker.string.uuid(),
  }
  return data
}

export function getMockChatMessageData(defaultValue?: Partial<ChatMessage>) {
  const data: ChatMessage = {
    id: defaultValue?.id ?? faker.string.uuid(),
    createdAt: defaultValue?.createdAt ?? faker.date.past().toString(),
    chatRoom: defaultValue?.chatRoom ?? faker.string.uuid(),
    message:
      defaultValue?.message ??
      (faker.datatype.boolean()
        ? faker.lorem.sentences(3, '\n')
        : faker.image.dataUri()),
    createdBy: defaultValue?.createdBy ?? faker.string.uuid(),
  }
  return data
}

export function getMockImageDataUri() {
  return faker.image.dataUri()
}

export const timeout = (ms = 3000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
