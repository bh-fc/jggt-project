import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ProductList from './_components/ProductList'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import { getMe } from '@/repository/me/getMe'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopProducts } from '@/repository/shops/getShopProducts'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export default async function ProductsManage() {
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
      return redirect(`/login?next=${encodeURIComponent('/products/manage')}`)
    }
    throw e
  }

  const [{ data: products }, { data: count }] = await Promise.all([
    getShopProducts(supabase, { shopId, fromPage: 0, toPage: 1 }),
    getShopProductCount(supabase, shopId),
  ])

  return (
    <Container>
      <div className="my-10">
        <div className="flex text-center border-y border-black py-2">
          <Text className="w-28">사진</Text>
          <Text className="w-28">판매상태</Text>
          <Text className="flex-1">상품명</Text>
          <Text className="w-28">가격</Text>
          <Text className="w-28">등록시간</Text>
          <Text className="w-28">기능</Text>
        </div>
        <ProductList initialProducts={products} count={count} shopId={shopId} />
      </div>
    </Container>
  )
}
