import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ShopLayout from '../../_components/ShopLayout'

import ReviewList from './_components/ReviewList'

import Text from '@/components/common/Text'
import { getMe } from '@/repository/me/getMe'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { getShopReviews } from '@/repository/shops/getShopReviews'
import { Review, Shop } from '@/types'
import getServerSupabase from '@/utils/supabase/getServerSupabase'

export const getServerSideProps: GetServerSideProps<{
  isMyShop: boolean
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
  reviews: Review[]
}> = async (context) => {
  const supabase = getServerSupabase(context)

  const shopId = context.query.shopId as string

  const [
    {
      data: { shopId: myShopId },
    },
    { data: shop },
    { data: productCount },
    { data: reviewCount },
    { data: likeCount },
    { data: followingCount },
    { data: followerCount },
    { data: reviews },
  ] = await Promise.all([
    getMe(supabase),
    getShop(supabase, shopId),
    getShopProductCount(supabase, shopId),
    getShopReviewCount(supabase, shopId),
    getShopLikeCount(supabase, shopId),
    getShopFollowingCount(supabase, shopId),
    getShopFollowerCount(supabase, shopId),
    getShopReviews(supabase, { shopId, fromPage: 0, toPage: 1 }),
  ])

  return {
    props: {
      isMyShop: myShopId === shopId,
      shop,
      productCount,
      reviewCount,
      likeCount,
      followingCount,
      followerCount,
      reviews,
    },
  }
}

export default function ShopReviews({
  isMyShop,
  shop,
  productCount,
  reviewCount,
  likeCount,
  followingCount,
  followerCount,
  reviews: initialReviews,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ShopLayout
      isMyShop={isMyShop}
      shop={shop}
      productCount={productCount}
      reviewCount={reviewCount}
      likeCount={likeCount}
      followingCount={followingCount}
      followerCount={followerCount}
      currentTab="reviews"
    >
      <div className="mt-9 mb-5">
        <Text size="lg"> 후기 </Text>
        <Text size="lg" color="red">
          {reviewCount.toLocaleString()}개
        </Text>
      </div>
      <ReviewList
        initialReviews={initialReviews}
        count={reviewCount}
        shopId={shop.id}
      />
    </ShopLayout>
  )
}
