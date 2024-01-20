'use client'

import { useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import { createdFollow } from '@/repository/followes/createFollow'
import { deleteFollow } from '@/repository/followes/deleteFollow'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  isLoggedIn: boolean
  initialIsFollowed: boolean
  shopId: string
}

export default function FollowButton({
  isLoggedIn,
  initialIsFollowed,
  shopId,
}: Props) {
  const [isFollowed, setIsFollowed] = useState(initialIsFollowed)
  const handleToggleFollow = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다')
      return
    }

    try {
      setIsFollowed(!isFollowed)
      if (!isFollowed) {
        await createdFollow(supabase, shopId)
      } else {
        await deleteFollow(supabase, shopId)
      }
    } catch (e) {
      setIsFollowed(isFollowed)
    }
  }

  return (
    <Button color="grey" fullWidth onClick={handleToggleFollow}>
      <Text color="black" className="flex justify-center items-center gap-1">
        <span className="material-symbols-outlined">
          {isFollowed ? 'person_remove' : 'person_add'}
        </span>
        {isFollowed ? '언팔로우' : '팔로우'}
      </Text>
    </Button>
  )
}
