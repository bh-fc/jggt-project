import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import Product from '@/components/common/Product'
import Spinner from '@/components/common/Spinner'
import { getProducts } from '@/repository/products/getProducts'
import { Product as TProduct } from '@/types'

export default function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([])
  const { ref, inView } = useInView({ threshold: 1 })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)

  const handleGetProducts = async ({
    fromPage,
    toPage,
  }: {
    fromPage: number
    toPage: number
  }) => {
    try {
      setIsLoading(true)
      const { data } = await getProducts({ fromPage, toPage })
      setProducts((prevProducts) => [...prevProducts, ...data])

      if (data.length === 0) {
        setIsLastPage(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // 컴포넌트가 마운트 되면 products 값을 2페이지 불러온다.
    handleGetProducts({ fromPage: 0, toPage: 2 })
  }, [])

  // 항상 products 값은 2페이지까지 불러와져 있다고 가정한다.
  const [page, setPage] = useState<number>(2)

  useEffect(() => {
    if (inView) {
      // inView가 true가 되면 새로운 페이지를 불러온다
      ;(async () => {
        handleGetProducts({ fromPage: page, toPage: page + 1 })
        setPage(page + 1)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div className="my-8">
      <div className="grid grid-cols-5 gap-4">
        {products?.map(({ id, title, price, imageUrls, createdAt }) => (
          <div key={id}>
            <Product
              title={title}
              price={price}
              imageUrl={imageUrls[0]}
              createdAt={createdAt}
            />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="text-center mt-2">
          <Spinner />
        </div>
      )}
      {!isLastPage && !!products.length && products.length < 100 && (
        <div ref={ref} />
      )}
    </div>
  )
}
