import { Product } from '@/types'
import { getMockProductData } from '@/utils/mock'

type Params = {
  shopId: string
  fromPage?: number
  toPage?: number
}

export async function getShopSells({
  shopId,
  fromPage = 0,
  toPage = 1,
}: Params): Promise<{ data: Product[] }> {
  const data: Product[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
    () =>
      getMockProductData({
        createdBy: shopId,
        purchaseBy: 'mock-shopId',
      }),
  )

  return Promise.resolve({ data })
}
