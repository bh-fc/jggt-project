import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Product from '@/components/common/Product'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'
import { Product as TProduct } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  products: TProduct[]
  query: string
}> = async (context) => {
  const originalQuery = context.query.query as string | undefined
  if (!originalQuery) {
    throw new Error('검색어가 없습니다')
  }

  const query = decodeURIComponent(originalQuery)
  const { data: products } = await getProductsByKeyword({
    query,
    fromPage: 0,
    toPage: 1,
  })

  return { props: { products, query } }
}

export default function Search({
  products,
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Wrapper>
      <Container>
        <div className="my-7">
          <Text size="lg" color="red">
            {query}
          </Text>
          <Text size="lg">의 검색 결과</Text>
        </div>
        <div className="grid grid-cols-5 gap-4 my-3">
          {products.length === 0 ? (
            <Text>검색 결과가 없습니다.</Text>
          ) : (
            products.map(({ id, title, price, createdAt, imageUrls }) => (
              <div key={id}>
                <Product
                  title={title}
                  price={price}
                  createdAt={createdAt}
                  imageUrl={imageUrls[0]}
                />
              </div>
            ))
          )}
        </div>
      </Container>
    </Wrapper>
  )
}
