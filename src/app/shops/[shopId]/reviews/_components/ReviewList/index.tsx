'use client'

import { useEffect, useState } from 'react'

import ReviewItem from '../ReviewItem'

import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import { getShopReviews } from '@/repository/shops/getShopReviews'
import { Review } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialReviews?: Review[]
  count: number
  shopId: string
}

export default function ReviewList({
  initialReviews = [],
  count,
  shopId,
}: Props) {
  // 화면에 보이는 Page는 1부터 시작, API는 0부터 시작
  const [currentPage, setCurrentPage] = useState(1)
  const [reviews, setReviews] = useState(initialReviews)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShopReviews(supabase, {
        shopId,
        // API 요청시에는 0부터 시작하기 때문에
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setReviews(data)
    })()
  }, [currentPage, shopId])

  return (
    <div>
      {reviews.length === 0 ? (
        <Text color="grey"> 등록된 리뷰가 없습니다.</Text>
      ) : (
        <>
          <div>
            {reviews.map(
              ({ id, createdBy, productId, contents, createdAt }) => (
                <ReviewItem
                  key={id}
                  reviewerId={createdBy}
                  productId={productId}
                  contents={contents}
                  createdAt={createdAt}
                />
              ),
            )}
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
