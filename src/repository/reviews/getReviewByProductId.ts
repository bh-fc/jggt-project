import { Review } from '@/types'
import { getMockReviewData } from '@/utils/mock'

export async function getReviewByProductId(productId: string): Promise<{
  data: Review | null
}> {
  const data: Review | null =
    Math.random() > 0.5 ? getMockReviewData({ productId }) : null
  return Promise.resolve({ data })
}
