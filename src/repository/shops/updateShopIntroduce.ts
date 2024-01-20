import { SupabaseClient } from '@supabase/supabase-js'

type Params = {
  shopId: string
  introduce: string
}

export async function updateShopIntroduce(
  supabase: SupabaseClient,
  { shopId, introduce }: Params,
) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('shops')
    .update({ introduce })
    .eq('id', shopId)

  if (error) {
    throw error
  }

  return
}
