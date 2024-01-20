import { faker } from '@faker-js/faker'

import { Review } from '@/types'
import { getMockReviewData } from '@/utils/mock'

export async function getReviewByProductId(productId: string): Promise<{
  data: Review | null
}> {
  const data: Review | null = faker.datatype.boolean()
    ? getMockReviewData({ productId })
    : null
  return Promise.resolve({ data })
}
