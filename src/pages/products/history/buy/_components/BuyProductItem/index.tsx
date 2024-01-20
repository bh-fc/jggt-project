import Link from 'next/link'
import { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import { getReviewByProductId } from '@/repository/reviews/getReviewByProductId'

type Props = {
  id: string
  title: string
  price: number
  imageUrl: string
}

export default function BuyProductItem({ id, title, price, imageUrl }: Props) {
  const [isReviewPosted, setIsReviewPosted] = useState<boolean>()

  useEffect(() => {
    ;(async () => {
      const { data } = await getReviewByProductId(id)
      setIsReviewPosted(!!data)
    })()
  }, [id])

  return (
    <div className="flex text-center border-y-2 my-4 py-2">
      <div className="w-28 h-28">
        <img src={imageUrl} alt={title} className="w-full h-full" />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <Link href={`/products/${id}`}>
          <a>
            <Text>{title}</Text>
          </a>
        </Link>
      </div>
      <div className="w-28 flex justify-center items-center">
        <Text>{price.toLocaleString()}</Text>
      </div>
      <div className="w-32 flex justify-center items-center">
        <Link href={`/reviews/${id}`} prefetch={false}>
          <a>
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
          </a>
        </Link>
      </div>
    </div>
  )
}
