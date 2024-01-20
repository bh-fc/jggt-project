import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

type Params = {
  query: string
  fromPage?: number
  toPage?: number
}

export async function getProductsByKeyword(
  supabase: SupabaseClient,
  { query, fromPage = 0, toPage = 1 }: Params,
): Promise<{ data: Product[] }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    const data: Product[] = Array.from({
      length: (toPage - fromPage) * 10,
    }).map((_, index) =>
      getMockProductData({
        title: `${query} - ${index}`,
      }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .like('title', `%${query}%`)
    .is('purchase_by', null)
    .range((fromPage ?? 0) * 10, (toPage ?? 1) * 10 - 1)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return { data: camelcaseKeys(data, { deep: true }) }
}
