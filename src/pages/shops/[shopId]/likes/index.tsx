import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ShopLayout from '../../_components/ShopLayout'

import LikeList from './_components/LikeList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopLikes } from '@/repository/shops/getShopLikes'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { Like, Shop } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
  likes: Like[]
}> = async (context) => {
  const shopId = context.query.shopId as string

  const [
    { data: shop },
    { data: productCount },
    { data: reviewCount },
    { data: likeCount },
    { data: followingCount },
    { data: followerCount },
    { data: likes },
  ] = await Promise.all([
    getShop(shopId),
    getShopProductCount(shopId),
    getShopReviewCount(shopId),
    getShopLikeCount(shopId),
    getShopFollowingCount(shopId),
    getShopFollowerCount(shopId),
    getShopLikes({ shopId, fromPage: 0, toPage: 1 }),
  ])

  return {
    props: {
      shop,
      productCount,
      reviewCount,
      likeCount,
      followingCount,
      followerCount,
      likes,
    },
  }
}

export default function ShopsLikes({
  shop,
  productCount,
  reviewCount,
  likeCount,
  followingCount,
  followerCount,
  likes: initialLikes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ShopLayout
      shop={shop}
      productCount={productCount}
      reviewCount={reviewCount}
      likeCount={likeCount}
      followingCount={followingCount}
      followerCount={followerCount}
      currentTab="likes"
    >
      <div className="mt-9 mb-5">
        <Text size="lg"> 상품 </Text>
        <Text size="lg" color="red">
          {likeCount.toLocaleString()}개
        </Text>
      </div>
      <LikeList
        initialLikes={initialLikes}
        count={likeCount}
        shopId={shop.id}
      />
    </ShopLayout>
  )
}
