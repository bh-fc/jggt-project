import { cookies } from 'next/headers'

import FollowingList from './_components/FollowingList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowing } from '@/repository/shops/getShopFollowing'
import { getShopFollowingCount } from '@/repository/shops/getShopFollowingCount'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { shopId: string }
}

export default async function Following({ params: { shopId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const [{ data: shop }, { data: followingCount }, { data: following }] =
    await Promise.all([
      getShop(supabase, shopId),
      getShopFollowingCount(supabase, shopId),
      getShopFollowing(supabase, { shopId, fromPage: 0, toPage: 1 }),
    ])

  return (
    <>
      <div className="mt-9 mb-5">
        <Text size="lg"> 팔로잉 </Text>
        <Text size="lg" color="red">
          {followingCount.toLocaleString()}
        </Text>
      </div>
      <FollowingList
        initialFollowing={following}
        count={followingCount}
        shopId={shop.id}
      />
    </>
  )
}
