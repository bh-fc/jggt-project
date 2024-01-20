'use client'

import { useEffect, useState } from 'react'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import LoginPannel from '@/components/shared/LoginPannel'
import { getMe } from '@/repository/me/getMe'
import supabase from '@/utils/supabase/browserSupabase'

export default function Login() {
  const [showModal, setShowModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>()

  useEffect(() => {
    if (showModal) {
      disablePageScroll()
    } else {
      enablePageScroll()
    }
  }, [showModal])

  useEffect(() => {
    ;(async () => {
      const {
        data: { shopId },
      } = await getMe(supabase)
      setIsLoggedIn(!!shopId)
    })()
  }, [])

  const handleLogOut = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <>
      {isLoggedIn === undefined ? (
        <Text size="sm" color="grey">
          <Spinner size="xs" />
        </Text>
      ) : isLoggedIn === false ? (
        <Text
          size="sm"
          color="grey"
          onClick={() => setShowModal(true)}
          className="cursor-pointer"
        >
          로그인 / 회원가입
        </Text>
      ) : (
        <Text
          size="sm"
          color="grey"
          onClick={handleLogOut}
          className="cursor-pointer"
        >
          로그아웃
        </Text>
      )}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-gray-400/50 z-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <LoginPannel />
        </div>
      )}
    </>
  )
}
