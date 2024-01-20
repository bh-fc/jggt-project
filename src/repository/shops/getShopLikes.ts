import { Like } from '@/types'
import { getMockLikeData } from '@/utils/mock'

type Params = {
  shopId: string
  fromPage?: number
  toPage?: number
}

export async function getShopLikes({
  shopId,
  fromPage = 0,
  toPage = 1,
}: Params): Promise<{ data: Like[] }> {
  const data: Like[] = Array.from({
    length: (toPage - fromPage) * 10,
  }).map(() => getMockLikeData({ createdBy: shopId }))

  return Promise.resolve({ data })
}
