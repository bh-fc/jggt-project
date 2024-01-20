'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import { getReviewByProductId } from '@/repository/reviews/getReviewByProductId'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  id?: string
  title?: string
  price?: number
  imageUrl?: string
}

export default function BuyProductItem({ id, title, price, imageUrl }: Props) {
  const [isReviewPosted, setIsReviewPosted] = useState<boolean>()

  useEffect(() => {
    ;(async () => {
      if (id) {
        const { data } = await getReviewByProductId(supabase, id)
        setIsReviewPosted(!!data)
      }
    })()
  }, [id])

  return (
    <div className="flex text-center border-y-2 my-4 py-2">
      <div className="w-28 h-28 relative">
        {imageUrl && title && <Image src={imageUrl} alt={title} fill />}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Link href={`/products/${id}`}>
          <Text>{title}</Text>
        </Link>
      </div>
      <div className="w-28 flex justify-center items-center">
        <Text>{price?.toLocaleString()}</Text>
      </div>
      <div className="w-32 flex justify-center items-center">
        <Link href={`/reviews/${id}`} prefetch={false}>
          <Button
            disabled={isReviewPosted}
            isLoading={isReviewPosted === undefined}
            color="red"
            className="flex justify-center items-center gap-1"
          >
            <span
              style={{ fontSize: '1rem' }}
              className="material-symbols-outlined"
            >
              rate_review
            </span>
            후기작성
          </Button>
        </Link>
      </div>
    </div>
  )
}
