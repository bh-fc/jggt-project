import { cookies } from 'next/headers'

import Banner from './_components/Banner'
import ProductList from './_components/ProductList'

import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProducts } from '@/repository/products/getProducts'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export default async function Home() {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)
  const { data: products } = await getProducts(supabase, {
    fromPage: 0,
    toPage: 2,
  })

  return (
    <Wrapper>
      <Container>
        <Banner />
        <ProductList initialProducts={products} />
      </Container>
    </Wrapper>
  )
}
