import { cookies } from 'next/headers'

import ReviewList from './_components/ReviewList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { getShopReviews } from '@/repository/shops/getShopReviews'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { shopId: string }
}

export default async function ShopReviews({ params: { shopId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const [{ data: shop }, { data: reviewCount }, { data: reviews }] =
    await Promise.all([
      getShop(supabase, shopId),
      getShopReviewCount(supabase, shopId),

      getShopReviews(supabase, { shopId, fromPage: 0, toPage: 1 }),
    ])

  return (
    <>
      <div className="mt-9 mb-5">
        <Text size="lg"> 후기 </Text>
        <Text size="lg" color="red">
          {reviewCount.toLocaleString()}개
        </Text>
      </div>
      <ReviewList
        initialReviews={reviews}
        count={reviewCount}
        shopId={shop.id}
      />
    </>
  )
}
