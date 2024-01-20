import { SupabaseClient } from '@supabase/supabase-js'

export async function getShopFollowerCount(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{
  data: number
}> {
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_shop_id', shopId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return { data: count || 0 }
}
