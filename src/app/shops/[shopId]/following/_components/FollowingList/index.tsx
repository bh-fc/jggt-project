'use client'

import { useEffect, useState } from 'react'

import FollowingItem from '../FollowingItem'

import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import { getShopFollowing } from '@/repository/shops/getShopFollowing'
import { Follow } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialFollowing?: Follow[]
  count: number
  shopId: string
}

export default function FollowingList({
  initialFollowing = [],
  count,
  shopId,
}: Props) {
  // 화면에 보이는 Page는 1부터 시작. API는 0부터 시작
  const [currentPage, setCurrentPage] = useState(1)
  const [following, setFollowing] = useState(initialFollowing)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShopFollowing(supabase, {
        shopId,
        // API 요청시에는 0부터 시작하기 때문에
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setFollowing(data)
    })()
  }, [currentPage, shopId])

  return (
    <div>
      {following.length === 0 ? (
        <Text color="grey"> 팔로잉이 없습니다. </Text>
      ) : (
        <>
          <div>
            {following.map(({ id, followingShopId }) => (
              <FollowingItem key={id} shopId={followingShopId} />
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
