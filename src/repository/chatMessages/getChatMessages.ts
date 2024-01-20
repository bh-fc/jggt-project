import { ChatMessage } from '@/types'
import { getMockChatMessageData } from '@/utils/mock'

type Params = {
  chatRoomId: string
  fromIndex?: number
  toIndex?: number
}

export async function getChatMessages({
  chatRoomId,
  fromIndex = 0,
  toIndex = 1,
}: Params): Promise<{
  data: ChatMessage[]
}> {
  const data: ChatMessage[] = Array.from({ length: toIndex - fromIndex }).map(
    () => getMockChatMessageData({ chatRoom: chatRoomId }),
  )
  return Promise.resolve({ data })
}
