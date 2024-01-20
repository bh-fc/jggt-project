import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ShopLayout from '../../_components/ShopLayout'

import FollowerList from './_components/FollowerList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollower } from '@/repository/shops/getShopFollower'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { Follow, Shop } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
  follower: Follow[]
}> = async (context) => {
  const shopId = context.query.shopId as string

  const [
    { data: shop },
    { data: productCount },
    { data: reviewCount },
    { data: likeCount },
    { data: followingCount },
    { data: followerCount },
    { data: follower },
  ] = await Promise.all([
    getShop(shopId),
    getShopProductCount(shopId),
    getShopReviewCount(shopId),
    getShopLikeCount(shopId),
    getShopFollowingCount(shopId),
    getShopFollowerCount(shopId),
    getShopFollower({ shopId, fromPage: 0, toPage: 1 }),
  ])

  return {
    props: {
      shop,
      productCount,
      reviewCount,
      likeCount,
      followingCount,
      followerCount,
      follower,
    },
  }
}

export default function Follower({
  shop,
  productCount,
  reviewCount,
  likeCount,
  followingCount,
  followerCount,
  follower: initialFollower,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ShopLayout
      shop={shop}
      productCount={productCount}
      reviewCount={reviewCount}
      likeCount={likeCount}
      followingCount={followingCount}
      followerCount={followerCount}
      currentTab="follower"
    >
      <div className="mt-9 mb-5">
        <Text size="lg"> 팔로워 </Text>
        <Text size="lg" color="red">
          {followerCount.toLocaleString()}
        </Text>
      </div>
      <FollowerList
        initialFollower={initialFollower}
        count={followerCount}
        shopId={shop.id}
      />
    </ShopLayout>
  )
}
