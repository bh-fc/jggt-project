import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import ChatPreview from './_components/ChatPreview'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getChatRooms } from '@/repository/chatRooms/getChatRooms'
import { getMe } from '@/repository/me/getMe'
import { ChatRoom } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  chatRooms: ChatRoom[]
  shopId: string
}> = async (context) => {
  const {
    data: { shopId },
  } = await getMe()

  if (!shopId) {
    throw new Error('로그인이 필요합니다')
  }

  const { data: chatRooms } = await getChatRooms(shopId)

  return {
    props: { chatRooms, shopId },
  }
}

export default function Messages({
  chatRooms,
  shopId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const currentChatRoomId = router.query.chatRoomId?.[0]

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
                {chatRooms.map(({ id, fromShopId, toShopId }) => {
                  return (
                    <ChatPreview
                      key={id}
                      chatRoomId={id}
                      shopId={fromShopId === shopId ? toShopId : fromShopId}
                    />
                  )
                })}
              </div>
            )}
          </div>
          <div
            className="w-1/2 border-l border-grey pl-2"
            style={{
              minHeight: 'calc(100vh - 28px - 108px - 65px)',
              maxHeight: 'calc(100vh - 28px - 108px - 65px)',
            }}
          >
            {!currentChatRoomId ? (
              <div className="flex justify-center items-center h-full">
                <Text color="grey">대화를 선택해주세요</Text>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
