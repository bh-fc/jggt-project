import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { useEffect, useState } from 'react'

import ShopProfileImage from '@/components/common/ShopProfileImage'
import Spinner from '@/components/common/Spinner'
import Text from '@/components/common/Text'
import { getShop } from '@/repository/shops/getShop'
import { Shop } from '@/types'

type Props = {
  contents: string
  createdBy: string
  createdAt: string
}

dayjs.extend(relativeTime).locale('ko')

export default function ReviewItem({ contents, createdAt, createdBy }: Props) {
  const [reviewer, setReviewer] = useState<Shop>()

  useEffect(() => {
    ;(async () => {
      const { data } = await getShop(createdBy)
      setReviewer(data)
    })()
  }, [createdBy])

  if (!reviewer) {
    return (
      <div className="flex my-2 py-2">
        <div className="flex justify-center items-center w-full h-32 border border-dashed">
          <Spinner />
        </div>
      </div>
    )
  }

  return (
    <div className="flex my-2 py-2">
      <ShopProfileImage imageUrl={reviewer.imageUrl || undefined} />
      <div className="ml-4 border-b pb-2 flex-1 w-0">
        <div className="flex justify-between">
          <div className="truncate pr-1">
            <Text color="grey" size="sm">
              {reviewer.name}
            </Text>
          </div>
          <div className="shrink-0">
            <Text color="grey" size="sm">
              {dayjs(createdAt).fromNow()}
            </Text>
          </div>
        </div>
        <div className="py-2">{contents}</div>
      </div>
    </div>
  )
}
