import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ProductsLayout from '../../_components/ProductsLayout'
import Tab from '../_components/Tab'

import BuyProductList from './_components/BuyProductList'

import Container from '@/components/layout/Container'
import { getMe } from '@/repository/me/getMe'
import { getShopBuyCount } from '@/repository/shops/getShopBuyCount'
import { getShopBuys } from '@/repository/shops/getShopBuys'
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
    getShopBuys({ shopId, fromPage: 0, toPage: 1 }),
    getShopBuyCount(shopId),
  ])

  return { props: { products, count, shopId } }
}

export default function ProductsHistoryBuy({
  products: initialProducts,
  count,
  shopId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ProductsLayout currentTab="history">
      <Container>
        <Tab currentTab="buy" />
        <div className="flex text-center border-y border-black py-2">
          <div className="w-28">사진</div>
          <div className="flex-1">상품명</div>
          <div className="w-28">가격</div>
          <div className="w-32">기능</div>
        </div>
        <BuyProductList
          initialProducts={initialProducts}
          count={count}
          shopId={shopId}
        />
      </Container>
    </ProductsLayout>
  )
}
