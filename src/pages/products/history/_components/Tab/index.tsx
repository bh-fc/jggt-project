import Link from 'next/link'

import Text from '@/components/common/Text'

type Props = {
  currentTab: 'sell' | 'buy'
}

export default function Tab({ currentTab }: Props) {
  return (
    <div className="flex gap-2 my-5">
      <Text
        size="lg"
        weight="bold"
        color={currentTab === 'sell' ? 'red' : 'grey'}
      >
        <Link href="/products/history/sell">판매 내역</Link>
      </Text>
      <Text size="lg">|</Text>
      <Text
        size="lg"
        weight="bold"
        color={currentTab === 'buy' ? 'red' : 'grey'}
      >
        <Link href="/products/history/buy">구매 내역</Link>
      </Text>
    </div>
  )
}
