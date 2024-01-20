import { InferGetServerSidePropsType } from 'next'

import ProductList from './_components/ProductList'

import Container from '@/components/layout/Container'
import JggtLayout from '@/components/layout/JggtLayout'
import Wrapper from '@/components/layout/Wrapper'
import { getProducts } from '@/repository/products/getProducts'

export const getServerSideProps = async () => {
  const { data } = await getProducts({ fromPage: 0, toPage: 2 })

  return { props: { products: data } }
}

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <JggtLayout>
      <Wrapper>
        <Container>
          <ProductList initialProducts={products} />
        </Container>
      </Wrapper>
    </JggtLayout>
  )
}
