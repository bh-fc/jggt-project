import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import 'dayjs/locale/ko'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import ShopProfileImage from '@/components/common/ShopProfileImage'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { Shop } from '@/types'
import { timeout } from '@/utils/mock'

dayjs.extend(relativeTime).locale('ko')

type Tabs = 'products' | 'reviews' | 'likes' | 'following' | 'follower'

type Props = {
  isMyShop: boolean
  shop: Shop
  productCount: number
  reviewCount: number
  likeCount: number
  followingCount: number
  followerCount: number
  currentTab: Tabs
  children: ReactNode
}

type EDIT_STUATUS = 'IDLE' | 'EDIT' | 'LOADING'

export default function ShopLayout({
  isMyShop,
  shop,
  productCount,
  reviewCount,
  likeCount,
  followingCount,
  followerCount,
  currentTab,
  children,
}: Props) {
  const [shopNameStatus, setShopNameState] = useState<EDIT_STUATUS>('IDLE')
  const [shopDescriptionStatus, setShopDescriptionState] =
    useState<EDIT_STUATUS>('IDLE')

  const handleSubmitShopName = async () => {
    setShopNameState('LOADING')
    await timeout(2000)
    setShopNameState('IDLE')
  }

  const handleSubmitShopDescription = async () => {
    setShopDescriptionState('LOADING')
    await timeout(2000)
    setShopDescriptionState('IDLE')
  }

  const handleSubmitShopProfileImage = async () => {
    alert('Image!')
  }

  return (
    <Wrapper>
      <Container>
        <div className="my-10">
          <div className="border border-gray-300 flex h-64">
            <div className="bg-gray-300 h-full w-60 flex flex-col justify-center items-center gap-2">
              {!isMyShop ? (
                <ShopProfileImage imageUrl={shop.imageUrl || undefined} />
              ) : (
                <>
                  <form onChange={handleSubmitShopProfileImage}>
                    <label htmlFor="image" className="cursor-pointer">
                      <ShopProfileImage imageUrl={shop.imageUrl || undefined} />
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      hidden
                      accept=".jpg, .jpeg, .png"
                    />
                  </form>
                  <Link href="/">
                    <a className="border border-white text-white px-3 py-2 my-2">
                      내 상점 관리
                    </a>
                  </Link>
                </>
              )}
            </div>
            <div className="flex flex-col flex-1 gap-2 py-2">
              <div className="pl-4 flex items-center">
                {isMyShop ? (
                  shopNameStatus === 'IDLE' ? (
                    <>
                      <Text size="lg">{shop.name}</Text>
                      <Button
                        size="xs"
                        className="ml-2"
                        outline
                        onClick={() => setShopNameState('EDIT')}
                      >
                        상점명 수정
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        className="text-xs w-60"
                        placeholder="새 닉네임을 입력하세요 (2자 이상)"
                        disabled={shopNameStatus === 'LOADING'}
                        required
                        autoComplete="off"
                        minLength={2}
                      />
                      <Button
                        className="text-sm w-20"
                        isLoading={shopNameStatus === 'LOADING'}
                        onClick={() => handleSubmitShopName()}
                      >
                        확인
                      </Button>
                    </>
                  )
                ) : (
                  <Text size="lg">{shop.name}</Text>
                )}
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
              <div className="flex flex-col flex-1 px-4 overflow-hidden">
                {isMyShop ? (
                  shopDescriptionStatus === 'IDLE' ? (
                    <>
                      <Text size="sm" className="block overflow-scroll h-full">
                        {shop.introduce}
                      </Text>
                      <Button
                        size="xs"
                        outline
                        className="w-20"
                        onClick={() => setShopDescriptionState('EDIT')}
                      >
                        소개글 수정
                      </Button>
                    </>
                  ) : (
                    <>
                      <textarea
                        className="flex-1 p-1 mb-2 text-sm border outline-none disabled:opacity-50"
                        placeholder="소개글을 입력해주세요"
                        disabled={shopDescriptionStatus === 'LOADING'}
                      >
                        {shop.introduce}
                      </textarea>
                      <Button
                        size="xs"
                        outline
                        className="w-20"
                        isLoading={shopDescriptionStatus === 'LOADING'}
                        onClick={() => handleSubmitShopDescription()}
                      >
                        확인
                      </Button>
                    </>
                  )
                ) : (
                  <Text size="sm" className="block overflow-scroll h-full">
                    {shop.introduce}
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-12 mt-6">
          <Link href={`/shops/${shop.id}/products`}>
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
          <Link href={`/shops/${shop.id}/reviews`}>
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
          <Link href={`/shops/${shop.id}/likes`}>
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
          <Link href={`/shops/${shop.id}/following`}>
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
          <Link href={`/shops/${shop.id}/follower`}>
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
