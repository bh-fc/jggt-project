'use client'

import camelcaseKeys from 'camelcase-keys'
import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { useEffect, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import getChatMessageCount from '@/repository/chatMessages/getChatMessageCount'
import { getChatMessages } from '@/repository/chatMessages/getChatMessages'
import { ChatMessage } from '@/types'
import { checkIsImage } from '@/utils/image'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  chatRoomId: string
  myShopId: string
}

dayjs.extend(relativeTime).locale('ko')

export default function Messages({ chatRoomId, myShopId }: Props) {
  const virtuoso = useRef<VirtuosoHandle>(null)

  const [count, setCount] = useState<number>()
  const [firstItemIndex, setFirstItemIndex] = useState<number>()
  const [messages, setMessage] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  useEffect(() => {
    ;(async () => {
      const [{ data: messages }, { data: count }] = await Promise.all([
        getChatMessages(supabase, {
          chatRoomId,
          fromIndex: 0,
          toIndex: 10,
        }),
        getChatMessageCount(supabase, chatRoomId),
      ])
      setMessage([...messages.reverse()])
      const firstItemIndex = count - messages.length
      setFirstItemIndex(count - messages.length)
      setCount(count)

      virtuoso.current?.scrollToIndex({
        index: firstItemIndex,
        align: 'end',
      })
    })()
  }, [chatRoomId])

  useEffect(() => {
    const subscribeChat = supabase.channel(`chat_on_${chatRoomId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `chat_room=eq.${chatRoomId}`,
      },
      (payload) => {
        setMessage((prev) => [
          ...prev,
          camelcaseKeys(payload.new) as ChatMessage,
        ])
        setCount((prev = 0) => prev + 1)
        setHasNewMessage(true)
        setTimeout(() => {
          setHasNewMessage(false)
        }, 3000)
      },
    )

    subscribeChat.subscribe()

    return () => {
      subscribeChat.unsubscribe()
    }
  }, [chatRoomId])

  const handleGetPrevMessage = async (index: number) => {
    if (count === undefined) {
      return
    }

    const fromIndex = count - index
    const toIndex = fromIndex + 10

    setIsLoading(true)

    const { data } = await getChatMessages(supabase, {
      chatRoomId,
      fromIndex,
      toIndex,
    })

    setMessage((prev) => [...data.reverse(), ...(prev || [])])
    setFirstItemIndex(Math.max(count - toIndex, 0))
    setIsLoading(false)
  }

  return (
    <div className="flex-1 overflow-scroll relative">
      {isLoading && (
        <div className="absolute top-1 left-0 w-full z-50">
          <div className="rounded bg-black text-center w-full m-auto opacity-50">
            <Text color="white">
              <Spinner />
            </Text>
          </div>
        </div>
      )}
      {hasNewMessage && (
        <div className="absolute bottom-1 left-0 w-full z-30">
          <button
            type="button"
            className="rounded bg-black text-center w-full m-auto opacity-50"
            onClick={() => {
              virtuoso.current?.scrollToIndex({
                index: messages.length - 1,
                align: 'end',
              })
              setHasNewMessage(false)
            }}
          >
            <Text color="white"> 새 메시지 보기 </Text>
          </button>
        </div>
      )}
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Text color="grey" size="lg">
            메시지가 없습니다
          </Text>
        </div>
      ) : (
        <Virtuoso
          ref={virtuoso}
          firstItemIndex={firstItemIndex}
          initialTopMostItemIndex={messages.length - 1}
          startReached={handleGetPrevMessage}
          data={messages}
          itemContent={(_, { id, message, createdBy, createdAt }) => {
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
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={message} alt="" />
                    ) : (
                      <Text size="sm">{message}</Text>
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
          }}
        />
      )}
    </div>
  )
}
