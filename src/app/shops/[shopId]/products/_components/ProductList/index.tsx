'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Pagination from '@/components/common/Pagination'
import Product from '@/components/common/Product'
import Text from '@/components/common/Text'
import { getShopProducts } from '@/repository/shops/getShopProducts'
import { Product as TProduct } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialProducts?: TProduct[]
  count: number
  shopId: string
}

export default function ProductList({
  initialProducts = [],
  count,
  shopId,
}: Props) {
  // 화면에 보이는 Page는 1부터 시작. API는 0부터 시작
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState(initialProducts)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShopProducts(supabase, {
        shopId,
        // API 요청시에는 0부터 시작하기 때문에
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setProducts(data)
    })()
  }, [currentPage, shopId])

  return (
    <div>
      {products.length === 0 ? (
        <Text color="grey"> 등록된 상품이 없습니다. </Text>
      ) : (
        <>
          <div className="w-full grid grid-cols-5 gap-4">
            {products.map(
              ({ id, title, price, createdAt, imageUrls, purchaseBy }) => (
                <Link href={`/products/${id}`} key={id}>
                  <Product
                    title={title}
                    price={price}
                    createdAt={createdAt}
                    imageUrl={imageUrls[0]}
                    isSoldOut={!!purchaseBy}
                  />
                </Link>
              ),
            )}
          </div>
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              handlePageChange={(pageNumber) => setCurrentPage(pageNumber)}
              count={count}
            />
          </div>
        </>
      )}
    </div>
  )
}
