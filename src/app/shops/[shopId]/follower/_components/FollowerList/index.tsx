'use client'

import { useEffect, useState } from 'react'

import FollowerItem from '../FollowerItem'

import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import { getShopFollower } from '@/repository/shops/getShopFollower'
import { Follow } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  initialFollower?: Follow[]
  count: number
  shopId: string
}

export default function FollowerList({
  initialFollower = [],
  count,
  shopId,
}: Props) {
  // 화면에 보이는 Page는 1부터 시작. API는 0부터 시작
  const [currentPage, setCurrentPage] = useState(1)
  const [follower, setFollower] = useState(initialFollower)

  useEffect(() => {
    ;(async () => {
      const { data } = await getShopFollower(supabase, {
        shopId,
        // API 요청시에는 0부터 시작하기 때문에
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setFollower(data)
    })()
  }, [currentPage, shopId])

  return (
    <div>
      {follower.length === 0 ? (
        <Text color="grey"> 팔로워가 없습니다. </Text>
      ) : (
        <>
          <div>
            {follower.map(({ id, createdBy }) => (
              <FollowerItem key={id} shopId={createdBy} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            handlePageChange={(pageNumber) => setCurrentPage(pageNumber)}
            count={count}
          />
        </>
      )}
    </div>
  )
}
