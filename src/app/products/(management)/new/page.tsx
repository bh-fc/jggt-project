import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ProductForm from '../_components/ProductForm'

import { getMe } from '@/repository/me/getMe'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export default async function ProductNew() {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  try {
    const {
      data: { shopId },
    } = await getMe(supabase)

    if (!shopId) {
      throw new AuthError()
    }
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect(`/login?next=${encodeURIComponent('/products/new')}`)
    }
    throw e
  }

  return <ProductForm />
}
