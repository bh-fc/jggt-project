import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ShopLayout from '../../_components/ShopLayout'

import ReviewList from './_components/ReviewList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { getShopReviews } from '@/repository/shops/getShopReviews'
import { Review, Shop } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
  reviews: Review[]
}> = async (context) => {
  const shopId = context.query.shopId as string

  const [
    { data: shop },
    { data: productCount },
    { data: reviewCount },
    { data: likeCount },
    { data: followingCount },
    { data: followerCount },
    { data: reviews },
  ] = await Promise.all([
    getShop(shopId),
    getShopProductCount(shopId),
    getShopReviewCount(shopId),
    getShopLikeCount(shopId),
    getShopFollowingCount(shopId),
    getShopFollowerCount(shopId),
    getShopReviews({ shopId, fromPage: 0, toPage: 1 }),
  ])

  return {
    props: {
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
