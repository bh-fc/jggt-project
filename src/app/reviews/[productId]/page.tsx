import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ReviewForm from './_components/ReviewForm'

import { getMe } from '@/repository/me/getMe'
import { getProduct } from '@/repository/products/getProduct'
import { getReviewByProductId } from '@/repository/reviews/getReviewByProductId'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { productId: string }
}

export default async function ReviewPage({ params: { productId } }: Props) {
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
      return redirect(
        `/login?next=${encodeURIComponent(`reviews/${productId}`)}`,
      )
    }
    throw e
  }

  const [{ data: product }, { data: review }] = await Promise.all([
    getProduct(supabase, productId),
    getReviewByProductId(supabase, productId),
  ])

  return <ReviewForm product={product} review={review} />
}
