'use client'

import { useEffect, useState } from 'react'

import BuyProductItem from '../BuyProductItem'

import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import { getShopSells } from '@/repository/shops/getShopSells'
import { Product } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialProducts?: Product[]
  count: number
  shopId: string
}

export default function BuyProductList({
  initialProducts = [],
  count,
  shopId,
}: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShopSells(supabase, {
        shopId,
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setProducts(data)
    })()
  }, [currentPage, shopId])

  return (
    <div>
      {products.length === 0 ? (
        <div className="pt-5 text-center">
          <Text>판매 내역이 없습니다</Text>
        </div>
      ) : (
        <>
          {products.map(({ id, imageUrls, title, price }) => (
            <BuyProductItem
              key={id}
              id={id}
              title={title}
              price={price}
              imageUrl={imageUrls[0]}
            />
          ))}
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
