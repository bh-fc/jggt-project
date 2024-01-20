import { cookies } from 'next/headers'

import SearchShopResult from './_components/SearchShopResult'

import { getShopsByKeyword } from '@/repository/shops/getShopsByKeyword'
import { getShopsByKeywordCount } from '@/repository/shops/getShopsByKeywordCount'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export default async function SearchShop({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)
  const originalQuery = searchParams.query
  if (!originalQuery) {
    throw new Error('검색어가 없습니다')
  }

  const query = decodeURIComponent(originalQuery)

  const [{ data: shops }, { data: count }] = await Promise.all([
    getShopsByKeyword(supabase, {
      query,
      fromPage: 0,
      toPage: 1,
    }),
    getShopsByKeywordCount(supabase, query),
  ])

  return <SearchShopResult shops={shops} count={count} />
}
