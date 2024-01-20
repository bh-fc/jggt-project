import { Review } from '@/types'
import { getMockReviewData } from '@/utils/mock'

type Params = {
  shopId: string
  fromPage?: number
  toPage?: number
}

export async function getShopReviews({
  shopId,
  fromPage = 0,
  toPage = 1,
}: Params): Promise<{ data: Review[] }> {
  const data: Review[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
    () => getMockReviewData({ createdBy: shopId }),
  )

  return Promise.resolve({ data })
}
