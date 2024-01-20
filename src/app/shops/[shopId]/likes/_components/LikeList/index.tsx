'use client'

import { useEffect, useState } from 'react'

import LikeItem from '../LikeItem'

import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import { getShopLikes } from '@/repository/shops/getShopLikes'
import { Like } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialLikes?: Like[]
  count: number
  shopId: string
}

export default function LikeList({ initialLikes = [], count, shopId }: Props) {
  // 화면에 보이는 Page는 1부터 시작, API는 0부터 시작
  const [currentPage, setCurrentPage] = useState(1)
  const [likes, setLikes] = useState(initialLikes)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShopLikes(supabase, {
        shopId,
        // API 요청시에는 0부터 시작하기 때문에
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setLikes(data)
    })()
  }, [currentPage, shopId])

  return (
    <div>
      {likes.length === 0 ? (
        <Text color="grey"> 찜한 상품이 없습니다. </Text>
      ) : (
        <>
          <div className="w-full grid grid-cols-5 gap-4">
            {likes.map(({ id, productId }) => (
              <LikeItem key={id} productId={productId} />
            ))}
          </div>
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              handlePageChange={(pageNumber) => setCurrentPage(pageNumber)}
              count={count}
            />
          </div>
        </>
      )}
    </div>
  )
}
