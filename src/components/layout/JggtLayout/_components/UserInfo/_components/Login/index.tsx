import { useEffect, useState } from 'react'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

import Text from '@/components/common/Text'
import LoginPannel from '@/components/shared/LoginPannel'

export default function Login() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (showModal) {
      disablePageScroll()
    } else {
      enablePageScroll()
    }
  }, [showModal])

  return (
    <>
      <Text size="sm" color="grey" onClick={() => setShowModal(true)}>
        로그인 / 회원가입
      </Text>
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
