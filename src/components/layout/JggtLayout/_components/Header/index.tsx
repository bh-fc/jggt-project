import { Black_Han_Sans } from 'next/font/google'
import Link from 'next/link'
import { ReactNode } from 'react'

import Search from './_components/Search'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

type Props = { children: ReactNode }

const blackHanSans = Black_Han_Sans({
  weight: ['400'],
  display: 'swap',
  subsets: ['latin'],
})

export default function Header({ children }: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <Wrapper>
        <Container>
          <div className="flex justify-between items-center py-8 gap-2">
            <Link href="/" prefetch={false}>
              <Text size="4xl" className={blackHanSans.className}>
                🗃 중고장터
              </Text>
            </Link>
            <Search />
            <div className="flex gap-2">
              <Link
                href="/products/new"
                prefetch={false}
                className="flex items-center"
              >
                <span className="material-symbols-outlined">sell</span>
                <Text weight="light" size="sm" className="mx-1">
                  판매하기
                </Text>
              </Link>
              |
              <Link
                href="/my-shop"
                prefetch={false}
                className="flex items-center"
              >
                <span className="material-symbols-outlined">storefront</span>
                <Text weight="light" size="sm" className="mx-1">
                  내 상점
                </Text>
              </Link>
              |
              <Link
                href="/messages"
                prefetch={false}
                className="flex items-center"
              >
                <span className="material-symbols-outlined">chat_bubble</span>
                <Text weight="light" size="sm" className="mx-1">
                  채팅
                </Text>
              </Link>
            </div>
          </div>
        </Container>
      </Wrapper>
      {children}
    </div>
  )
}
