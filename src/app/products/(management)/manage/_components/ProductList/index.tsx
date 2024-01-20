'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import { deleteProduct } from '@/repository/products/deleteProduct'
import { getShopProducts } from '@/repository/shops/getShopProducts'
import { Product } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialProducts?: Product[]
  count: number
  shopId: string
}

dayjs.extend(relativeTime).locale('ko')

export default function ProductList({
  initialProducts = [],
  count,
  shopId,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState(initialProducts)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShopProducts(supabase, {
        shopId,
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setProducts(data)
    })()
  }, [currentPage, shopId])

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        deleteProduct(supabase, productId)
      } catch (e) {
        alert('삭제에 실패했습니다')
      } finally {
        window.location.reload()
      }
    }
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="py-5 text-center">
          <Text>등록된 상품이 없습니다</Text>
        </div>
      ) : (
        <>
          {products.map(
            ({ id, imageUrls, title, purchaseBy, price, createdAt }) => (
              <div key={id} className="flex text-center border-y-2 my-4 py-2">
                <div className="w-28 h-28 relative">
                  <Image src={imageUrls[0]} alt={title} fill />
                </div>
                <div className="w-28 flex justify-center items-center">
                  <Text>{!purchaseBy ? '판매중' : '판매완료'}</Text>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <Link href={`/products/${id}`}>
                    <Text>{title}</Text>
                  </Link>
                </div>
                <div className="w-28 flex justify-center items-center">
                  <Text>{price.toLocaleString()}</Text>
                </div>
                <div className="w-28 flex justify-center items-center">
                  <Text>{dayjs(createdAt).fromNow()}</Text>
                </div>
                <div className="w-28 flex justify-center items-center">
                  <div className="flex gap-2">
                    <Link href={`/products/edit/${id}`}>
                      <Button size="sm" color="orange" className="h-8 w-15">
                        수정
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      color="red"
                      className="h-8 w-15"
                      disabled={!!purchaseBy}
                      onClick={() => handleDeleteProduct(id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            ),
          )}
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
