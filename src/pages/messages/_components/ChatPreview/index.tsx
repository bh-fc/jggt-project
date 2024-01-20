import Link from 'next/link'
import { useEffect, useState } from 'react'

import ShopProfileImage from '@/components/common/ShopProfileImage'
import Text from '@/components/common/Text'
import { getChatMessages } from '@/repository/chatMessages/getChatMessages'
import { getShop } from '@/repository/shops/getShop'
import { ChatMessage, Shop } from '@/types'

type Props = {
  chatRoomId: string
  shopId: string
}

export default function ChatPreview({ chatRoomId, shopId }: Props) {
  const [shop, setShop] = useState<Shop>()
  const [lastMessage, setLastMessage] = useState<ChatMessage>()

  useEffect(() => {
    ;(async () => {
      const [
        { data: shop },
        {
          data: [lastMessage],
        },
      ] = await Promise.all([
        getShop(shopId),
        getChatMessages({
          chatRoomId,
          fromIndex: 0,
          toIndex: 1,
        }),
      ])
      setShop(shop)
      setLastMessage(lastMessage)
    })()
  }, [chatRoomId, shopId])

  if (!shop || !lastMessage) {
    return null
  }

  return (
    <Link href={`/messages/${chatRoomId}`} prefetch={false}>
      <a className="flex py-3 hover:bg-gray-100">
        <div className="mx-3">
          <ShopProfileImage imageUrl={shop.imageUrl || undefined} />
        </div>
        <div className="flex flex-col mx-3 flex-1 w-0">
          <Text size="lg" weight="bold">
            {shop.name}
          </Text>
          <div className="truncate">
            <Text size="sm" color="grey">
              {lastMessage.message}
            </Text>
          </div>
        </div>
      </a>
    </Link>
  )
}
