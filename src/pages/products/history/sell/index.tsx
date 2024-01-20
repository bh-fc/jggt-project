import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ProductsLayout from '../../_components/ProductsLayout'
import Tab from '../_components/Tab'

import SellProductList from './_components/SellProductList'

import Container from '@/components/layout/Container'
import { getMe } from '@/repository/me/getMe'
import { getShopSellCount } from '@/repository/shops/getShopSellCount'
import { getShopSells } from '@/repository/shops/getShopSells'
import { Product } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  products: Product[]
  count: number
  shopId: string
}> = async (context) => {
  const {
    data: { shopId },
  } = await getMe()
  if (!shopId) {
    throw new Error('로그인이 필요합니다')
  }

  const [{ data: products }, { data: count }] = await Promise.all([
    getShopSells({ shopId, fromPage: 0, toPage: 1 }),
    getShopSellCount(shopId),
  ])

  return { props: { products, count, shopId } }
}

export default function ProductsHistorySell({
  products: initialProducts,
  count,
  shopId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ProductsLayout currentTab="history">
      <Container>
        <Tab currentTab="sell" />
        <div className="flex text-center border-y border-black py-2">
          <div className="w-28">사진</div>
          <div className="flex-1">상품명</div>
          <div className="w-28">가격</div>
        </div>
        <SellProductList
          initialProducts={initialProducts}
          count={count}
          shopId={shopId}
        />
      </Container>
    </ProductsLayout>
  )
}