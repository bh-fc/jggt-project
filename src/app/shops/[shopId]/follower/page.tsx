import { cookies } from 'next/headers'

import FollowerList from './_components/FollowerList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollower } from '@/repository/shops/getShopFollower'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { shopId: string }
}

export default async function Follower({ params: { shopId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const [{ data: shop }, { data: followerCount }, { data: follower }] =
    await Promise.all([
      getShop(supabase, shopId),
      getShopFollowerCount(supabase, shopId),
      getShopFollower(supabase, { shopId, fromPage: 0, toPage: 1 }),
    ])

  return (
    <>
      <div className="mt-9 mb-5">
        <Text size="lg"> 팔로워 </Text>
        <Text size="lg" color="red">
          {followerCount.toLocaleString()}
        </Text>
      </div>
      <FollowerList
        initialFollower={follower}
        count={followerCount}
        shopId={shop.id}
      />
    </>
  )
}
