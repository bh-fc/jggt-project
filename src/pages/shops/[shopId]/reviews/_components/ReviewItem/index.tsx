import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import ShopProfileImage from '@/components/common/ShopProfileImage'
import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import MarkdownViewerSkeleton from '@/components/shared/MarkdownViewer/Skeleton'
import { getProduct } from '@/repository/products/getProduct'
import { getShop } from '@/repository/shops/getShop'
import { Product, Shop } from '@/types'

type Props = {
  reviewerId: string
  productId: string
  contents: string
  createdAt: string
}

dayjs.extend(relativeTime).locale('ko')

const MarkdownViewer = dynamic(
  () => import('@/components/shared/MarkdownViewer'),
  {
    ssr: false,
    loading: () => <MarkdownViewerSkeleton />,
  },
)

export default function ReviewItem({
  reviewerId,
  productId,
  contents,
  createdAt,
}: Props) {
  const [data, setData] = useState<{ reviewer: Shop; product: Product }>()

  useEffect(() => {
    ;(async () => {
      const [{ data: reviewer }, { data: product }] = await Promise.all([
        getShop(reviewerId),
        getProduct(productId),
      ])

      setData({ reviewer, product })
    })()
  }, [productId, reviewerId])

  if (!data) {
    return (
      <div className="my-5 border border-dashed py-2 px-5 flex justify-center items-center h-40">
        <Spinner />
      </div>
    )
  }

  const { reviewer, product } = data

  return (
    <div className="flex my-5 py-2 px-5">
      <ShopProfileImage imageUrl={reviewer.imageUrl || undefined} />
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <div>
            <Text weight="bold">{reviewer.name}</Text>
            <Text> 님의 후기 </Text>
          </div>
          <Text color="grey"> {dayjs(createdAt).fromNow()} </Text>
        </div>
        <div>
          <Link href={`/products/${product.id}`}>
            <a className="border border-grey-300 px-2 py-1 my-3 inline-flex gap-2 items-center">
              <Text size="sm" color="grey">
                {product.title}
              </Text>
              <Text size="sm" color="grey" weight="bold">
                {'>'}
              </Text>
            </a>
          </Link>
          <div>
            <MarkdownViewer value={contents} />
          </div>
        </div>
      </div>
    </div>
  )
}
