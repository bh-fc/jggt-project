import { throttle } from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import Text from '@/components/common/Text'
import { getProductsByKeyword } from '@/repository/products/getProductsByKeyword'

type Props = {
  query: string
  handleClose: () => void
}

export default function AutoComplete({ query, handleClose }: Props) {
  const [keywords, setKeywords] = useState<string[]>([])

  const handleSearch = useMemo(
    () =>
      throttle(async (query: string) => {
        if (!query) {
          setKeywords([])
          return
        }
        const { data } = await getProductsByKeyword({
          query,
          fromPage: 0,
          toPage: 2,
        })
        setKeywords(data.map(({ title }) => title))
      }, 500),
    [],
  )

  useEffect(() => {
    handleSearch(query)
  }, [handleSearch, query])

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 overflow-hidden flex-1">
        <div className="border-b border-grey-300 pb-1 mb-2 flex items-center">
          <span className="material-symbols-outlined shrink-0">storefront</span>
          <Text size="sm" className="ml-1 shrink-0">
            상점 검색 {'>'}
          </Text>
          <Text size="sm" color="red" className="mx-1 truncate">
            {query}
          </Text>
          <Text size="sm" color="grey" className="shrink-0">
            상점명으로 검색
          </Text>
        </div>
        {keywords.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            <Text color="grey" size="sm">
              추천 검색어가 없습니다
            </Text>
          </div>
        ) : (
          <div className="h-full overflow-scroll pb-8">
            {keywords.map((recent, idx) => (
              <Text size="sm" key={idx} className="block my-1 truncate">
                {recent}
              </Text>
            ))}
          </div>
        )}
      </div>
      <div className="bg-gray-100 flex justify-end items-center h-8 px-2">
        <Text size="sm" onClick={handleClose} className="cursor-pointer">
          닫기
        </Text>
      </div>
    </div>
  )
}
