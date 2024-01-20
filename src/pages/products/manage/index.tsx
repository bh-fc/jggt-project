import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ProductsLayout from '../_components/ProductsLayout'

import ProductList from './_components/ProductList'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import { getMe } from '@/repository/me/getMe'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopProducts } from '@/repository/shops/getShopProducts'
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
    getShopProducts({ shopId, fromPage: 0, toPage: 1 }),
    getShopProductCount(shopId),
  ])

  return {
    props: {
      shopId,
      products,
      count,
    },
  }
}

export default function ProductsManage({
  products: initialProducts,
  count,
  shopId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <ProductsLayout currentTab="manage">
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
          <ProductList
            initialProducts={initialProducts}
            count={count}
            shopId={shopId}
          />
        </div>
      </Container>
    </ProductsLayout>
  )
}
