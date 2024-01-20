import { cookies } from 'next/headers'

import SearchResult from './_components/SearchResult'

import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'
import { getProductsByKeywordCount } from '@/repository/products/getProductsByKeywordCount'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export default async function Search({
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

  const [{ data: products }, { data: count }] = await Promise.all([
    getProductsByKeyword(supabase, {
      query,
      fromPage: 0,
      toPage: 1,
    }),
    getProductsByKeywordCount(supabase, query),
  ])

  return <SearchResult products={products} count={count} />
}
