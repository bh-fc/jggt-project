import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Tab from '../_components/Tab'

import BuyProductList from './_components/BuyProductList'

import Container from '@/components/layout/Container'
import { getMe } from '@/repository/me/getMe'
import { getShopBuyCount } from '@/repository/shops/getShopBuyCount'
import { getShopBuys } from '@/repository/shops/getShopBuys'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export default async function ProductsHistoryBuy() {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  let shopId

  try {
    const { data } = await getMe(supabase)

    if (!data.shopId) {
      throw new AuthError()
    }

    shopId = data.shopId
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect(
        `/login?next=${encodeURIComponent('/products/history/buy')}`,
      )
    }
    throw e
  }

  const [{ data: products }, { data: count }] = await Promise.all([
    getShopBuys(supabase, { shopId, fromPage: 0, toPage: 1 }),
    getShopBuyCount(supabase, shopId),
  ])

  return (
    <Container>
      <Tab currentTab="buy" />
      <div className="flex text-center border-y border-black py-2">
        <div className="w-28">사진</div>
        <div className="flex-1">상품명</div>
        <div className="w-28">가격</div>
        <div className="w-32">기능</div>
      </div>
      <BuyProductList
        initialProducts={products}
        count={count}
        shopId={shopId}
      />
    </Container>
  )
}
