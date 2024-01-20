import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMe } from '@/repository/me/getMe'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export default async function MyShops() {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  try {
    const {
      data: { shopId },
    } = await getMe(supabase)

    if (!shopId) {
      throw new AuthError()
    }

    return redirect(`/shops/${shopId}`)
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect(`/login?next=${encodeURIComponent('/my-shop')}`)
    }
    throw e
  }
}
