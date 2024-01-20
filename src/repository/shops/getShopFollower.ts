import { Follow } from '@/types'
import { getMockFollowData } from '@/utils/mock'

type Params = {
  shopId: string
  fromPage?: number
  toPage?: number
}

export async function getShopFollower({
  shopId,
  fromPage = 0,
  toPage = 1,
}: Params): Promise<{ data: Follow[] }> {
  const data: Follow[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
    () => getMockFollowData({ followingShopId: shopId }),
  )

  return Promise.resolve({ data })
}
