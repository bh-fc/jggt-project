import { cookies } from 'next/headers'
import { ReactNode } from 'react'

import ShopLayout from '../_components/ShopLayout'

import { getMe } from '@/repository/me/getMe'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  children: ReactNode
  params: { shopId: string }
}

export default async function Layout({ children, params: { shopId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

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
  ] = await Promise.all([
    getMe(supabase),
    getShop(supabase, shopId),
    getShopProductCount(supabase, shopId),
    getShopReviewCount(supabase, shopId),
    getShopLikeCount(supabase, shopId),
    getShopFollowingCount(supabase, shopId),
    getShopFollowerCount(supabase, shopId),
  ])

  return (
    <ShopLayout
      isMyShop={myShopId === shopId}
      shop={shop}
      productCount={productCount}
      reviewCount={reviewCount}
      likeCount={likeCount}
      followingCount={followingCount}
      followerCount={followerCount}
    >
      {children}
    </ShopLayout>
  )
}
