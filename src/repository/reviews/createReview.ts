import { SupabaseClient } from '@supabase/supabase-js'
import snakecaseKeys from 'snakecase-keys'

import { Review } from '@/types'

type Params = Omit<Omit<Omit<Review, 'id'>, 'createdBy'>, 'createdAt'>

export async function createReview(supabase: SupabaseClient, params: Params) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return
  }

  const { error } = await supabase.from('reviews').insert(snakecaseKeys(params))

  if (error) {
    throw error
  }

  return
}
