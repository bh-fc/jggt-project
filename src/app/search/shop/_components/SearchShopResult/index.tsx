'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import SearchShopItem from '../SearchShopItem'

import Pagination from '@/components/common/Pagination'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getShopsByKeyword } from '@/repository/shops/getShopsByKeyword'
import { Shop } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  shops: Shop[]
  count: number
}

export default function SearchShopResult({
  shops: initialShops,
  count,
}: Props) {
  const searchParams = useSearchParams()
  const query = searchParams?.get('query')!
  const [shops, setShops] = useState<Shop[]>(initialShops)

  // 사용자에게 보이는 페이지는 1부터 시작
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [initialShops])

  useEffect(() => {
    ;(async () => {
      const { data: shops } = await getShopsByKeyword(supabase, {
        query,
        // 서버에서 처리되는 페이지는 0부터 시작
        fromPage: currentPage - 1,
        toPage: currentPage,
      })
      setShops(shops)
    })()
  }, [currentPage, query])

  return (
    <Wrapper>
      <Container>
        <div className="my-7">
          <Text size="lg">검색결과</Text>
          <Text size="lg" color="grey" className="ml-1">
            {count.toLocaleString()}개
          </Text>
        </div>
        <div className="flex flex-col gap-3">
          {shops.length === 0 ? (
            <Text>검색 결과가 없습니다.</Text>
          ) : (
            shops.map(({ id, name, imageUrl }) => (
              <SearchShopItem
                key={id}
                id={id}
                name={name}
                profileImageUrl={imageUrl || undefined}
              />
            ))
          )}
        </div>
        <div className="my-6 flex justify-end">
          <Pagination
            currentPage={currentPage}
            count={count}
            handlePageChange={(pageIndex) => setCurrentPage(pageIndex)}
          />
        </div>
      </Container>
    </Wrapper>
  )
}
