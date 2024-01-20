'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import Pagination from '@/components/common/Pagination'
import Product from '@/components/common/Product'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'
import { Product as TProduct } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  products: TProduct[]
  count: number
}

export default function SearchResult({
  products: initialProducts,
  count,
}: Props) {
  const searchParams = useSearchParams()
  const query = searchParams?.get('query')!
  const [products, setProducts] = useState<TProduct[]>(initialProducts)
  // 사용자에게 보이는 페이지는 1부터 시작
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [initialProducts])

  useEffect(() => {
    ;(async () => {
      const { data: products } = await getProductsByKeyword(supabase, {
        query,
        // 서버에서 처리되는 페이지는 0부터 시작
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setProducts(products)
    })()
  }, [currentPage, query])

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
              <Link key={id} href={`/products/${id}`}>
                <Product
                  title={title}
                  price={price}
                  createdAt={createdAt}
                  imageUrl={imageUrls[0]}
                />
              </Link>
            ))
          )}
        </div>
        <div className="my-6 flex justify-end">
          <Pagination
            currentPage={currentPage}
            count={count}
            handlePageChange={(pageNumber) => {
              setCurrentPage(pageNumber)
            }}
          />
        </div>
      </Container>
    </Wrapper>
  )
}
