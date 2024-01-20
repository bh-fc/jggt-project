'use client'

import { useRouter } from 'next/navigation'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import { createChatRoom } from '@/repository/chatRooms/createChatRoom'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  isLoggedIn: boolean
  shopId: string
}

export default function ChatButton({ isLoggedIn, shopId }: Props) {
  const router = useRouter()

  const handleChat = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다')
      return
    }

    const { data: chatRoom } = await createChatRoom(supabase, shopId)
    router.push(`/messages/${chatRoom.id}`)
  }

  return (
    <Button
      fullWidth
      color="orange"
      className="flex justify-center items-center gap-1"
      onClick={() => handleChat()}
    >
      <span style={{ fontSize: '1rem' }} className="material-symbols-outlined">
        chat_bubble
      </span>
      <Text color="white"> 문의하기 </Text>
    </Button>
  )
}
