import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  shopId: string
  name: string
}

export async function updateShopName(
  supabase: SupabaseClient,
  { shopId, name }: Params,
) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('shops')
    .update({ name })
    .eq('id', shopId)

  if (error) {
    throw error
  }

  return
}
