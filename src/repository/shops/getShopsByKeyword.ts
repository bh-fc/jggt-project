import { fakerKO as faker } from '@faker-js/faker'

import { Shop } from '@/types'
import { getMockShopData } from '@/utils/mock'

type Params = {
  query: string
  fromPage?: number
  toPage?: number
}

export async function getShopsByKeyword({
  query,
  fromPage = 0,
  toPage = 1,
}: Params): Promise<{ data: Shop[] }> {
  const data: Shop[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
    () =>
      getMockShopData({
        name: `${query} - ${faker.internet.displayName()}`,
      }),
  )

  return Promise.resolve({ data })
}
