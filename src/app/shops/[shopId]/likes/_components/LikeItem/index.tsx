'use client'

import { useEffect, useState } from 'react'

import Product from '@/components/common/Product'
import Spinner from '@/components/common/Spinner'
import { getProduct } from '@/repository/products/getProduct'
import { Product as TProduct } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  productId: string
}

export default function LikeItem({ productId }: Props) {
  const [product, setProduct] = useState<TProduct>()

  useEffect(() => {
    ;(async () => {
      const { data } = await getProduct(supabase, productId)
      setProduct(data)
    })()
  }, [productId])

  if (!product) {
    return (
      <div className="border border-dashed flex justify-center items-center h-56">
        <Spinner />
      </div>
    )
  }

  return (
    <Product
      title={product.title}
      price={product.price}
      createdAt={product.createdAt}
      imageUrl={product.imageUrls[0]}
      isSoldOut={!!product.purchaseBy}
    />
  )
}
