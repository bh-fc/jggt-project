import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Follow } from '@/types'

type Params = {
  shopId: string
  fromPage?: number
  toPage?: number
}

export async function getShopFollowing(
  supabase: SupabaseClient,
  { shopId, fromPage = 0, toPage = 1 }: Params,
): Promise<{ data: Follow[] }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockFollowData } = await import('@/utils/mock')
    const data: Follow[] = Array.from({ length: (toPage - fromPage) * 10 }).map(
      () => getMockFollowData({ createdBy: shopId }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('follows')
    .select('*')
    .eq('created_by', shopId)
    .range((fromPage ?? 0) * 10, (toPage ?? 1) * 10 - 1)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return { data: camelcaseKeys(data, { deep: true }) }
}
