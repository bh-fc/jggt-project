'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

type Props = {
  children: ReactNode
}

type CurrentTab = 'new' | 'manage' | 'history'

export default function ProductsManagementLayout({ children }: Props) {
  const pathname = usePathname()
  const currentTab: CurrentTab | undefined = pathname.includes('new')
    ? 'new'
    : pathname.includes('manage')
      ? 'manage'
      : pathname.includes('history')
        ? 'history'
        : undefined

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
