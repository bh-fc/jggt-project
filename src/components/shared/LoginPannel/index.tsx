'use client'

import { useState } from 'react'

import Login from './_components/Login'
import SignUp from './_components/SignUp'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'

export default function LoginPannel() {
  const [type, setType] = useState<undefined | 'login' | 'signup'>()

  return (
    <div
      className="bg-slate-50 flex flex-col justify-center items-center p-10 rounded w-96 gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Text size="lg"> 중고장터 시작하기 </Text>
      <Text weight="light"> 간편하게 가입하고 상품을 확인하세요 </Text>
      {type === 'login' ? (
        <Login handleSetType={(type) => setType(type)} />
      ) : type === 'signup' ? (
        <SignUp handleSetType={(type) => setType(type)} />
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <Button onClick={() => setType('login')}>로그인</Button>
          <Button onClick={() => setType('signup')}>회원가입</Button>
        </div>
      )}
    </div>
  )
}
