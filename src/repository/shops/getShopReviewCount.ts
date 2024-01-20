import { SupabaseClient } from '@supabase/supabase-js'

export async function getShopReviewCount(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{ data: number }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('reviews')
    .select('*, product_id!inner(created_by)', { count: 'exact', head: true })
    .eq('product_id.created_by', shopId)

  if (error) {
    throw error
  }

  return { data: count || 0 }
}
