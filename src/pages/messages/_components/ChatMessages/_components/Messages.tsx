import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { useEffect, useState } from 'react'

import Text from '@/components/common/Text'
import { getChatMessages } from '@/repository/chatMessages/getChatMessages'
import { ChatMessage } from '@/types'
import { checkIsImage } from '@/utils/image'

type Props = {
  chatRoomId: string
  myShopId: string
  counterShopId: string
}

dayjs.extend(relativeTime).locale('ko')

export default function Messages({
  chatRoomId,
  myShopId,
  counterShopId,
}: Props) {
  const [messages, setMessage] = useState<ChatMessage[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await getChatMessages({
        chatRoomId,
        fromIndex: 0,
        toIndex: 10,
      })
      setMessage(data)
    })()
  }, [chatRoomId])

  return (
    <div className="flex-1 overflow-scroll">
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Text color="grey" size="lg">
            메시지가 없습니다
          </Text>
        </div>
      ) : (
        messages.map(({ id, message, createdBy, createdAt }) => {
          const isMyMessage = createdBy === myShopId

          return (
            <div key={id} className="flex flex-col">
              <div
                className={classNames(
                  'flex flex-col m-2 px-2 py-1 w-72',
                  isMyMessage && 'border-l-2 border-slate-200',
                  !isMyMessage &&
                    'border-r-2 border-slate-200 self-end text-right',
                )}
              >
                <div>
                  {checkIsImage(message) ? (
                    <img src={message} alt="" />
                  ) : (
                    <Text size="sm">message</Text>
                  )}
                </div>
                <div>
                  <Text color="grey" size="sm">
                    {dayjs(createdAt).fromNow()}
                  </Text>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
