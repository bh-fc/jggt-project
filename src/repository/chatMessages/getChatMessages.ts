import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { ChatMessage } from '@/types'

type Params = {
  chatRoomId: string
  fromIndex?: number
  toIndex?: number
}

export async function getChatMessages(
  supabase: SupabaseClient,
  { chatRoomId, fromIndex = 0, toIndex = 1 }: Params,
): Promise<{
  data: ChatMessage[]
}> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockChatMessageData } = await import('@/utils/mock')
    const data: ChatMessage[] = Array.from({ length: toIndex - fromIndex }).map(
      (_, idx) =>
        getMockChatMessageData({
          chatRoom: chatRoomId,
          message: `fromIndex: ${fromIndex}, toIndex: ${toIndex}, curIndex: ${idx}`,
        }),
    )
    return { data }
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('chat_room', chatRoomId)
    .range(fromIndex, toIndex)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return { data: camelcaseKeys(data) }
}
