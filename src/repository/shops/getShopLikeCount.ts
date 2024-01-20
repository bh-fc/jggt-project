import { SupabaseClient } from '@supabase/supabase-js'

export async function getShopLikeCount(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{ data: number }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('likes')
    .select('*, product: product_id(*)', { count: 'exact', head: true })
    .eq('created_by', shopId)

  if (error) {
    throw error
  }

  return { data: count || 0 }
}
