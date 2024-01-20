import { useEffect, useState } from 'react'

import JggtLayout from '@/components/layout/JggtLayout'
import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'

export default function Home() {
  const [product, setProduct] = useState<Product>()
  useEffect(() => {
    getProduct('id').then(({ data }) => setProduct(data))
  }, [])
  return (
    <JggtLayout>
      <div>
        <h5> Sample Product </h5>
      </div>
      {product && <div> {JSON.stringify(product)}</div>}
    </JggtLayout>
  )
}
