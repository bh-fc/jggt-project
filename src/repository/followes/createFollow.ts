import { SupabaseClient } from '@supabase/supabase-js'

export async function createdFollow(
  supabase: SupabaseClient,
  followingShopId: string,
) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase
    .from('follows')
    .insert({ following_shop_id: followingShopId })

  if (error) {
    throw error
  }

  return
}
