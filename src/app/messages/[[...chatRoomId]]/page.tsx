import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ChatMessages from '../_components/ChatMessages'
import ChatRoom from '../_components/ChatRoom'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getChatRooms } from '@/repository/chatRooms/getChatRooms'
import { getMe } from '@/repository/me/getMe'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { chatRoomId?: string[] }
}

export default async function Messages({ params: { chatRoomId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  let shopId

  try {
    const { data } = await getMe(supabase)

    if (!data.shopId) {
      throw new AuthError()
    }

    shopId = data.shopId
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect(
        `/login?next=${encodeURIComponent(
          `/messages/${chatRoomId?.[0] || ''}`,
        )}`,
      )
    }
    throw e
  }

  const { data: chatRooms } = await getChatRooms(supabase, shopId)

  const currentChatRoomId = chatRoomId?.[0]
  const currentChatRoom = chatRooms.find(({ id }) => id === currentChatRoomId)

  console.log(currentChatRoomId, currentChatRoom)

  return (
    <Wrapper className="bg-gray-100">
      <Container>
        <div className="flex bg-white border-x border-gray-100">
          <div
            className="w-1/2 h-full flex overflow-scroll"
            style={{
              minHeight: 'calc(100vh - 28px - 108px - 65px)',
              maxHeight: 'calc(100vh - 28px - 108px - 65px)',
            }}
          >
            {chatRooms.length === 0 ? (
              <div className="flex justify-center items-center flex-1">
                <Text color="grey" size="2xl">
                  대화방이 없습니다
                </Text>
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                <ChatRoom
                  chatRooms={chatRooms}
                  currentChatRoomId={currentChatRoomId}
                  shopId={shopId}
                />
              </div>
            )}
          </div>
          <div
            className="w-1/2 border-l border-grey px-2"
            style={{
              minHeight: 'calc(100vh - 28px - 108px - 65px)',
              maxHeight: 'calc(100vh - 28px - 108px - 65px)',
            }}
          >
            {!currentChatRoom ? (
              <div className="flex justify-center items-center h-full">
                <Text color="grey">대화를 선택해주세요</Text>
              </div>
            ) : (
              <ChatMessages
                chatRoomId={currentChatRoom.id}
                myShopId={shopId}
                counterShopId={
                  currentChatRoom.fromShopId === shopId
                    ? currentChatRoom.toShopId
                    : currentChatRoom.fromShopId
                }
              />
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
