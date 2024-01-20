import Text from '@/components/common/Text'

type Props = {
  query: string
  handleClose: () => void
}

export default function AutoComplete({ query, handleClose }: Props) {
  const keywords: string[] = []
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 overflow-hidden flex-1">
        <div className="border-b border-grey-300 pb-1 mb-2 flex items-center">
          <span className="material-symbols-outlined">storefront</span>
          <Text size="sm" className="ml-1">
            상점 검색 {'>'}
          </Text>
          <Text size="sm" color="red" className="mx-1">
            {query}
          </Text>
          <Text size="sm" color="grey">
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
              <Text size="sm" key={idx} className="block my-1">
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
