import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

import ProductWrapper from './_components/ProductWrapper'

import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProduct } from '@/repository/products/getProduct'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { productId: string }
  title: ReactNode
  detail: ReactNode
  shop: ReactNode
}

export async function generateMetadata({
  params: { productId },
}: Props): Promise<Metadata> {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const { data: product } = await getProduct(supabase, productId)

  const title = `중고장터 - ${product.title}`

  return {
    title,
    openGraph: {
      title,
      images: product.imageUrls,
    },
  }
}

export default async function ProductsDetailLayout({
  params: { productId },
  title,
  detail,
  shop,
}: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const { data: product } = await getProduct(supabase, productId)

  return (
    <ProductWrapper productId={product.id}>
      <Wrapper>
        <Container>
          {title}
          <div className="flex border-t border-black pt-10">
            <div className="w-4/6 pr-2">{detail}</div>
            <div className="w-2/6 border-l border-grey pl-2">{shop}</div>
          </div>
        </Container>
      </Wrapper>
    </ProductWrapper>
  )
}
