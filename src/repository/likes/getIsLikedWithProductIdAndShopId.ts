import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  productId: string
  shopId: string
}

export async function getIsLikedWithProductIdAndShopId(
  supabase: SupabaseClient,
  { productId, shopId }: Params,
): Promise<{ data: boolean }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: true }
  }

  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('created_by', shopId)
    .eq('product_id', productId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return { data: !!data }
}
