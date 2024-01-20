export type Product = {
  id: string
  title: string
  price: number
  address: string
  description: string
  imageUrls: string[]
  isChangeable: boolean
  isUsed: boolean
  tags: string[] | null
  createdAt: string
  createdBy: string
  purchaseBy: string | null
}

export type Shop = {
  id: string
  name: string
  imageUrl: string | null
  introduce: string | null
  createdAt: string
}

export type Review = {
  id: string
  productId: string
  contents: string
  createdBy: string
  createdAt: string
}

export type Like = {
  id: string
  productId: string
  createdBy: string
  createdAt: string
}

export type Follow = {
  id: string
  followingShopId: string
  createdBy: string
  createdAt: string
}

export type ChatRoom = {
  id: string
  createdAt: string
  fromShopId: string
  toShopId: string
}

export type ChatMessage = {
  id: string
  createdAt: string
  chatRoom: string
  message: string
  createdBy: string
}
