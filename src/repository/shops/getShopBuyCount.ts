import { SupabaseClient } from '@supabase/supabase-js'

export async function getShopBuyCount(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{ data: number }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: 1000 }
  }

  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('purchase_by', shopId)

  if (error) {
    throw error
  }

  return { data: count || 0 }
}
