import { SupabaseClient } from '@supabase/supabase-js'

export async function deleteProduct(
  supabase: SupabaseClient,
  productId: string,
) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase.from('products').delete().eq('id', productId)

  if (error) {
    throw error
  }

  return
}
