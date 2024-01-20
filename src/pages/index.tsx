import { InferGetServerSidePropsType } from 'next'

import Banner from './_components/Banner'
import ProductList from './_components/ProductList'

import Container from '@/components/layout/Container'
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
    <Wrapper>
      <Container>
        <Banner />
        <ProductList initialProducts={products} />
      </Container>
    </Wrapper>
  )
}
