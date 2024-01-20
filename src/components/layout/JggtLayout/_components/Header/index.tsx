import { ReactNode } from 'react'

import Search from './_components/Search'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

type Props = { children: ReactNode }

export default function Header({ children }: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <Wrapper>
        <Container>
          <div className="flex justify-between items-center py-8">
            <Text
              size="4xl"
              style={{ fontFamily: `'Black Han Sans', sans-serif;` }}
            >
              🗃 중고장터
            </Text>
            <Search />
            <div className="flex gap-2">
              <div className="flex items-center">
                <span className="material-symbols-outlined">sell</span>
                <Text weight="light" size="sm" className="mx-1">
                  판매하기
                </Text>
              </div>
              |
              <div className="flex items-center">
                <span className="material-symbols-outlined">storefront</span>
                <Text weight="light" size="sm" className="mx-1">
                  내 상점
                </Text>
              </div>
              |
              <div className="flex items-center">
                <span className="material-symbols-outlined">chat_bubble</span>
                <Text weight="light" size="sm" className="mx-1">
                  채팅
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
      {children}
    </div>
  )
}
