import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ShopLayout from '../../_components/ShopLayout'

import LikeList from './_components/LikeList'

import Text from '@/components/common/Text'
import { getMe } from '@/repository/me/getMe'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopLikes } from '@/repository/shops/getShopLikes'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { Like, Shop } from '@/types'
import getServerSupabase from '@/utils/supabase/getServerSupabase'

export const getServerSideProps: GetServerSideProps<{
  isMyShop: boolean
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
  likes: Like[]
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
    { data: likes },
  ] = await Promise.all([
    getMe(supabase),
    getShop(supabase, shopId),
    getShopProductCount(supabase, shopId),
    getShopReviewCount(supabase, shopId),
    getShopLikeCount(supabase, shopId),
    getShopFollowingCount(supabase, shopId),
    getShopFollowerCount(supabase, shopId),
    getShopLikes(supabase, { shopId, fromPage: 0, toPage: 1 }),
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
      likes,
    },
  }
}

export default function ShopsLikes({
  isMyShop,
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
      isMyShop={isMyShop}
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
