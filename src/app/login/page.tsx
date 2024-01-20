import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import LoginPannel from '@/components/shared/LoginPannel'
import { getMe } from '@/repository/me/getMe'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  searchParams: { next?: string }
}

export default async function Login({ searchParams: { next } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const {
    data: { shopId },
  } = await getMe(supabase)

  if (shopId) {
    const destination = next ? decodeURIComponent(next) : '/'

    return redirect(destination)
  }

  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: 'inherit' }}
    >
      <LoginPannel />
    </div>
  )
}
