import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { ChatRoom } from '@/types'

export async function getChatRooms(
  supabase: SupabaseClient,
  shopId: string,
): Promise<{
  data: ChatRoom[]
}> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockChatRoomData } = await import('@/utils/mock')
    const data: ChatRoom[] = Array.from({ length: 1000 }).map((_, idx) =>
      getMockChatRoomData({ id: idx.toString(), toShopId: shopId }),
    )

    return { data }
  }

  const { data, error } = await supabase
    .from('chat_rooms')
    .select('*')
    .or(`from_shop_id.eq.${shopId}, to_shop_id.eq.${shopId}`)

  if (error) {
    console.log(error)
    throw error
  }

  return { data: camelcaseKeys(data, { deep: true }) }
}
