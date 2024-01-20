import { useCallback, useEffect, useMemo, useState } from 'react'

import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'
import { getRecentItemIds } from '@/utils/localstorage'

export default function Recent() {
  const [isLoading, setIsLoading] = useState(false)
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const totalPage = useMemo(
    () => Math.floor(recentProducts.length / 3),
    [recentProducts],
  )

  const handleUpdateRecentProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      const recentIds = getRecentItemIds()
      const results = await Promise.all(
        recentIds.map((productId) => getProduct(productId)),
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
          <div className="border-t border-black border-dashed pt-3 mt-2">
            {recentProducts
              .slice(currentPage * 3, (currentPage + 1) * 3)
              .map(({ id, title, price, imageUrls }) => (
                <div key={id}>
                  <img src={imageUrls[0]} alt={title} />
                </div>
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
