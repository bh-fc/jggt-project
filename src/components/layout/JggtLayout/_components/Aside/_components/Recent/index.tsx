'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import RecentItem from './_components/RecentItem'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'
import { RECENT_ITEM_IDS_KEY, getRecentItemIds } from '@/utils/localstorage'
import supabase from '@/utils/supabase/browserSupabase'

export default function Recent() {
  const [isLoading, setIsLoading] = useState(false)
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const totalPage = useMemo(
    () => Math.max(Math.ceil(recentProducts.length / 3) - 1, 0),
    [recentProducts],
  )

  useEffect(() => {
    setCurrentPage((_curPage) => Math.min(_curPage, totalPage))
  }, [totalPage])

  const handleUpdateRecentProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      const recentIds = getRecentItemIds()
      const results = await Promise.all(
        recentIds.map((productId) => getProduct(supabase, productId)),
      )
      const products = results.map(({ data }) => data)
      setRecentProducts(products)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    handleUpdateRecentProducts()
  }, [handleUpdateRecentProducts])

  useEffect(() => {
    const eventHandler = () => handleUpdateRecentProducts()
    window.addEventListener(RECENT_ITEM_IDS_KEY, eventHandler)
    return () => window.removeEventListener(RECENT_ITEM_IDS_KEY, eventHandler)
  }, [handleUpdateRecentProducts])

  return (
    <div className="border border-grey p-2 bg-white flex flex-col items-center">
      <Text size="xs">최근본상품</Text>
      {isLoading ? (
        <div className="py-5">
          <Spinner />
        </div>
      ) : recentProducts.length === 0 ? (
        <div className="mt-2 text-center">
          <Text size="xs" color="grey" className="block">
            최근 본 상품이 없습니다
          </Text>
        </div>
      ) : (
        <>
          <Text size="sm" color="red" weight="bold">
            {recentProducts.length}
          </Text>
          <div className="border-t border-black border-dashed pt-3 mt-2 flex flex-col gap-2">
            {recentProducts
              .slice(currentPage * 3, (currentPage + 1) * 3)
              .map(({ id, title, price, imageUrls }) => (
                <RecentItem
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  imageUrl={imageUrls[0]}
                />
              ))}
          </div>
          <div className="flex justify-between items-center mt-2 gap-1">
            <button
              className="border border-grey-300 h-5 w-5 flex justify-center items-center"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <Text size="xs" color="grey">
                {'<'}
              </Text>
            </button>
            <Text size="xs" color="grey">
              {currentPage + 1} / {totalPage + 1}
            </Text>
            <button
              className="border border-grey-300 h-5 w-5 flex justify-center items-center"
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <Text size="xs" color="grey">
                {'>'}
              </Text>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
