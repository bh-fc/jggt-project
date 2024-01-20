'use client'

import { FormEvent } from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import supabase from '@/utils/supabase/browserSupabase'

interface Props {
  handleSetType: (type?: 'login' | 'signup') => void
}

export default function SignUp({ handleSetType }: Props) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      alert(error.message)
      return
    }

    await supabase.auth.signInWithPassword({
      email,
      password,
    })

    location.reload()
  }

  return (
    <form className="my-2 flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="이메일" required />
      <Input name="password" type="password" placeholder="비밀번호" required />

      <div className="flex flex-col gap-2 w-full">
        <Button type="button" onClick={() => handleSetType('login')}>
          로그인
        </Button>
        <Button type="submit" outline>
          회원가입
        </Button>
      </div>
    </form>
  )
}
