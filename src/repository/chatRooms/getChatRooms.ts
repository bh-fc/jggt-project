import { ChatRoom } from '@/types'
import { getMockChatRoomData } from '@/utils/mock'

export async function getChatRooms(shopId: string): Promise<{
  data: ChatRoom[]
}> {
  const data: ChatRoom[] = Array.from({ length: 10 }).map(() =>
    getMockChatRoomData({ toShopId: shopId }),
  )

  return Promise.resolve({ data })
}
