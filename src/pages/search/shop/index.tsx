import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import Shop from '@/components/common/Shop'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getShopsByKeyword } from '@/repository/shops/getShopsByKeyword'
import { getShopsByKeywordCount } from '@/repository/shops/getShopsByKeywordCount'
import { Shop as TShop } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  shops: TShop[]
  query: string
  count: number
}> = async (context) => {
  const originalQuery = context.query.query as string | undefined
  if (!originalQuery) {
    throw new Error('검색어가 없습니다')
  }

  const query = decodeURIComponent(originalQuery)
  const { data: shops } = await getShopsByKeyword({
    query,
    fromPage: 0,
    toPage: 1,
  })
  const { data: count } = await getShopsByKeywordCount(query)

  return { props: { shops, query, count } }
}

export default function SearchShop({
  shops,
  query,
  count,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
              <div key={id} className="border border-grey-300 p-5">
                <Shop
                  type="row"
                  name={name}
                  productCount={0}
                  followerCount={0}
                  profileImageUrl={imageUrl || undefined}
                />
              </div>
            ))
          )}
        </div>
      </Container>
    </Wrapper>
  )
}
