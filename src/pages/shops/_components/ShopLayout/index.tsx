import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { ReactNode } from 'react'
import 'dayjs/locale/ko'

import ShopProfileImage from '@/components/common/ShopProfileImage'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { Shop } from '@/types'

dayjs.extend(relativeTime).locale('ko')

type Tabs = 'products' | 'reviews' | 'likes' | 'following' | 'follower'

type Props = {
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
  currentTab: Tabs
  children: ReactNode
}

export default function ShopLayout({
  shop,
  productCount,
  reviewCount,
  likeCount,
  followingCount,
  followerCount,
  currentTab,
  children,
}: Props) {
  return (
    <Wrapper>
      <Container>
        <div className="my-10">
          <div className="border border-gray-300 flex h-64">
            <div className="bg-gray-300 h-full w-60 flex flex-col justify-center items-center">
              <ShopProfileImage imageUrl={shop.imageUrl || undefined} />
            </div>
            <div className="flex flex-col flex-1 gap-2 py-2">
              <div className="pl-4">
                <Text size="lg">{shop.name}</Text>
              </div>
              <div className="pl-4 flex gap-2 border-y border-slate-200 py-2">
                <div className="flex gap-2">
                  <Text size="sm" color="grey">
                    가입일
                  </Text>
                  <Text size="sm">{dayjs(shop.createdAt).fromNow()}</Text>
                </div>
                <div className="flex gap-2">
                  <Text size="sm" color="grey">
                    상품수
                  </Text>
                  <Text size="sm">{productCount.toLocaleString()}개</Text>
                </div>
              </div>
              <div className="flex-1 px-4 overflow-hidden">
                <Text size="sm" className="block overflow-scroll h-full">
                  {shop.introduce}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-12 mt-6">
          <Link href="/">
            <a
              className={classNames(
                'flex-1 border flex justify-center items-center',
                currentTab === 'products'
                  ? 'border-black border-b-0'
                  : 'bg-gray-100 text-gray-600 border-gray',
              )}
            >
              상품 <Text className="ml-2">{productCount.toLocaleString()}</Text>
            </a>
          </Link>
          <Link href="/">
            <a
              className={classNames(
                'flex-1 border flex justify-center items-center',
                currentTab === 'reviews'
                  ? 'border-black border-b-0'
                  : 'bg-gray-100 text-gray-600 border-gray',
              )}
            >
              상점후기
              <Text className="ml-2">{reviewCount.toLocaleString()}</Text>
            </a>
          </Link>
          <Link href="/">
            <a
              className={classNames(
                'flex-1 border flex justify-center items-center',
                currentTab === 'likes'
                  ? 'border-black border-b-0'
                  : 'bg-gray-100 text-gray-600 border-gray',
              )}
            >
              찜 <Text className="ml-2">{likeCount.toLocaleString()}</Text>
            </a>
          </Link>
          <Link href="/">
            <a
              className={classNames(
                'flex-1 border flex justify-center items-center',
                currentTab === 'following'
                  ? 'border-black border-b-0'
                  : 'bg-gray-100 text-gray-600 border-gray',
              )}
            >
              팔로잉
              <Text className="ml-2">{followingCount.toLocaleString()}</Text>
            </a>
          </Link>
          <Link href="/">
            <a
              className={classNames(
                'flex-1 border flex justify-center items-center',
                currentTab === 'follower'
                  ? 'border-black border-b-0'
                  : 'bg-gray-100 text-gray-600 border-gray',
              )}
            >
              팔로워
              <Text className="ml-2">{followerCount.toLocaleString()}</Text>
            </a>
          </Link>
        </div>
        <div>{children}</div>
      </Container>
    </Wrapper>
  )
}
