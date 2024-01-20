import Link from 'next/link'
import { useEffect, useState } from 'react'

import ShopProfileImage from '@/components/common/ShopProfileImage'
import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getChatMessages } from '@/repository/chatMessages/getChatMessages'
import { getShop } from '@/repository/shops/getShop'
import { ChatMessage, Shop } from '@/types'
import { checkIsImage } from '@/utils/image'

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
    return (
      <div className="flex justify-center items-center h-20 shrink-0">
        <Spinner />
      </div>
    )
  }

  return (
    <Link href={`/messages/${chatRoomId}`} prefetch={false} shallow>
      <a className="flex py-3 hover:bg-gray-100 h-20 shrink-0">
        <div className="mx-3">
          <ShopProfileImage imageUrl={shop.imageUrl || undefined} />
        </div>
        <div className="flex flex-col mx-3 flex-1 w-0">
          <Text size="lg" weight="bold">
            {shop.name}
          </Text>
          <div className="truncate">
            <Text size="sm" color="grey">
              {checkIsImage(lastMessage.message)
                ? '[이미지]'
                : lastMessage.message}
            </Text>
          </div>
        </div>
      </a>
    </Link>
  )
}
