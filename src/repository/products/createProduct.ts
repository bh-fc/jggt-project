import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

import { Product } from '@/types'

type Params = Omit<
  Omit<Omit<Omit<Product, 'id'>, 'createdAt'>, 'createdBy'>,
  'purchaseBy'
>

export async function createProduct(
  supabase: SupabaseClient,
  params: Params,
): Promise<{ data: Product }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    return { data: getMockProductData() }
  }

  const { data, error } = await supabase
    .from('products')
    .insert(snakecaseKeys(params))
    .select()
    .single()

  if (error) {
    throw error
  }

  return { data: camelcaseKeys(data, { deep: true }) }
}
