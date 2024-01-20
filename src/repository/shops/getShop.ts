import { Shop } from '@/types'
import { getMockShopData } from '@/utils/mock'

export async function getShop(shopId: string): Promise<{
  data: Shop
}> {
  const data: Shop = getMockShopData({ id: shopId })

  return Promise.resolve({ data })
}
