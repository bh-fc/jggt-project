import { cookies } from 'next/headers'

import LikeList from './_components/LikeList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopLikeCount } from '@/repository/shops/getShopLikeCount'
import { getShopLikes } from '@/repository/shops/getShopLikes'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { shopId: string }
}

export default async function ShopsLikes({ params: { shopId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const [{ data: shop }, { data: likeCount }, { data: likes }] =
    await Promise.all([
      getShop(supabase, shopId),
      getShopLikeCount(supabase, shopId),
      getShopLikes(supabase, { shopId, fromPage: 0, toPage: 1 }),
    ])

  return (
    <>
      <div className="mt-9 mb-5">
        <Text size="lg"> 상품 </Text>
        <Text size="lg" color="red">
          {likeCount.toLocaleString()}개
        </Text>
      </div>
      <LikeList initialLikes={likes} count={likeCount} shopId={shop.id} />
    </>
  )
}
