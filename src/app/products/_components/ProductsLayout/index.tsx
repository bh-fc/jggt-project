import Link from 'next/link'
import { ReactNode } from 'react'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

type Props = {
  children: ReactNode
  currentTab?: 'new' | 'manage' | 'history'
}

export default function ProductsLayout({ children, currentTab }: Props) {
  return (
    <Wrapper>
      <div className="border-b py-4">
        <Container>
          <div className="flex gap-7 items-center">
            <Text size="sm" color={currentTab === 'new' ? 'red' : 'grey'}>
              <Link href="/products/new">상품 등록</Link>
            </Text>
            |
            <Text size="sm" color={currentTab === 'manage' ? 'red' : 'grey'}>
              <Link href="/products/manage">상품관리</Link>
            </Text>
            |
            <Text size="sm" color={currentTab === 'history' ? 'red' : 'grey'}>
              <Link href="/products/history">구매 / 판매 내역</Link>
            </Text>
          </div>
        </Container>
      </div>
      {children}
    </Wrapper>
  )
}
