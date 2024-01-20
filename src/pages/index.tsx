import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Banner from './_components/Banner'
import ProductList from './_components/ProductList'

import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProducts } from '@/repository/products/getProducts'
import { Product } from '@/types'
import getServerSupabase from '@/utils/supabase/getServerSupabase'

export const getServerSideProps: GetServerSideProps<{
  products: Product[]
}> = async (context) => {
  const supabase = getServerSupabase(context)
  const { data } = await getProducts(supabase, { fromPage: 0, toPage: 2 })

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
