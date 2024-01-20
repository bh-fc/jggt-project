import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import 'dayjs/locale/ko'

import ShopLayout from '../../_components/ShopLayout'

import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { Shop } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
}> = async (context) => {
  const shopId = context.query.shopId as string

  const [
    { data: shop },
    { data: productCount },
    { data: reviewCount },
    { data: likeCount },
    { data: followingCount },
    { data: followerCount },
  ] = await Promise.all([
    getShop(shopId),
    getShopProductCount(shopId),
    getShopReviewCount(shopId),
    getShopLikeCount(shopId),
    getShopFollowingCount(shopId),
    getShopFollowerCount(shopId),
  ])

  return {
    props: {
      shop,
      productCount,
      reviewCount,
      likeCount,
      followingCount,
      followerCount,
    },
  }
}

export default function ShopProducts({
  shop,
  productCount,
  reviewCount,
  likeCount,
  followingCount,
  followerCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ShopLayout
      shop={shop}
      productCount={productCount}
      reviewCount={reviewCount}
      likeCount={likeCount}
      followingCount={followingCount}
      followerCount={followerCount}
      currentTab="products"
    >
      hihihi
    </ShopLayout>
  )
}
