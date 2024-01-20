'use client'

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'

import Messages from './_components/Messages'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { createChatMessage } from '@/repository/chatMessages/createChatMessage'
import { uploadImage } from '@/repository/common/uploadImage'
import { getShop } from '@/repository/shops/getShop'
import { Shop } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  chatRoomId: string
  myShopId: string
  counterShopId: string
}

export default function ChatMessages({
  chatRoomId,
  myShopId,
  counterShopId,
}: Props) {
  const [counterShop, setCounterShop] = useState<Shop>()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShop(supabase, counterShopId)
      setCounterShop(data)
    })()
  }, [counterShopId])

  const handleSubmitMessage: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (ref.current) {
      await createChatMessage(supabase, {
        chatRoomId,
        message: ref.current.value,
      })
      ref.current.value = ''
      ref.current.focus()
    }
  }

  const handleChangeImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files?.[0]) {
      try {
        const {
          data: { imageUrl },
        } = await uploadImage(supabase, e.target.files[0])
        await createChatMessage(supabase, {
          chatRoomId,
          message: imageUrl,
        })
      } catch (e) {
        alert('이미지 업로드에 실패했습니다.')
      } finally {
        e.target.value = ''
      }
    }
  }

  if (!counterShop) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-100 p-2 sticky top-0 bg-white z-50 h-12">
        <Text size="lg" weight="bold">
          {counterShop.name}
        </Text>
      </div>
      <Messages chatRoomId={chatRoomId} myShopId={myShopId} />
      <div className="bg-white py-2">
        <form
          onSubmit={handleSubmitMessage}
          className="bg-slate-100 w-full rounded-3xl px-4 py-1 flex justify-center items-center"
        >
          <input
            ref={ref}
            type="text"
            autoComplete="off"
            placeholder="메시지를 입력하세요."
            className="outline-0 bg-transparent flex-1"
          />
          <label
            htmlFor="image"
            className="flex justify-center items-center cursor-pointer"
          >
            <span className="material-symbols-outlined">photo_camera</span>
          </label>
          <input
            type="file"
            id="image"
            accept=".jpg, .jpeg, .png"
            hidden
            onChange={handleChangeImage}
          />
        </form>
      </div>
    </div>
  )
}
