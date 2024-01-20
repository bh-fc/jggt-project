import { SupabaseClient } from '@supabase/supabase-js'

export async function getMe(
  supabase: SupabaseClient,
): Promise<{ data: { shopId: string | null } }> {
  if (process.env.USE_MOCK_DATA === 'true') {
    return { data: { shopId: 'mock-shop-id' } }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { data: { shopId: user?.id || null } }
}
