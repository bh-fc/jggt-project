import { useState, useEffect } from 'react'

import Product from '@/components/common/Product'
import { getProducts } from '@/repository/products/getProducts'
import { Product as TProduct } from '@/types'

export default function ProductList() {
  const [products, setProducts] = useState<TProduct[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await getProducts({ fromPage: 0, toPage: 1 })
      setProducts(data)
    })()
  }, [])

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
    </div>
  )
}
