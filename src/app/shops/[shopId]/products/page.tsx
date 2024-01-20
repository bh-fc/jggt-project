import { cookies } from 'next/headers'

import ProductList from './_components/ProductList'

import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopProducts } from '@/repository/shops/getShopProducts'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { shopId: string }
}

export default async function ShopProducts({ params: { shopId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const [{ data: shop }, { data: productCount }, { data: products }] =
    await Promise.all([
      getShop(supabase, shopId),
      getShopProductCount(supabase, shopId),
      getShopProducts(supabase, { shopId, fromPage: 0, toPage: 1 }),
    ])

  return (
    <>
      <div className="mt-9 mb-5">
        <Text size="lg"> 상품 </Text>
        <Text size="lg" color="red">
          {productCount.toLocaleString()}개
        </Text>
      </div>
      <ProductList
        initialProducts={products}
        count={productCount}
        shopId={shop.id}
      />
    </>
  )
}
