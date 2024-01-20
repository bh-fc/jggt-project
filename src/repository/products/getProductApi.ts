import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

export async function getProductApi(
  productId: string,
): Promise<{ data: Product }> {
  console.log('getProductApi', productId)
  const res = await fetch(`${process.env.BASE_URL}/api/products/${productId}`, {
    next: { tags: ['product'] },
  })
  const data = await res.json()

  return camelcaseKeys(data, { deep: true })
}
