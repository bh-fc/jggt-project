import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import 'dayjs/locale/ko'
import Link from 'next/link'
import { useState } from 'react'

import ProductImage from './_components/ProductImage'

import Button from '@/components/common/Button'
import Product from '@/components/common/Product'
import Shop from '@/components/common/Shop'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getIsFollowedByShopId } from '@/repository/followes/getIsFollowedByShopId'
import { getIsLikedWithProductIdAndShopId } from '@/repository/likes/getIsLikedWithProductIdAndShopId'
import { getMe } from '@/repository/me/getMe'
import { getProduct } from '@/repository/products/getProduct'
import { getProductsByTag } from '@/repository/products/getProductsByTag'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { Product as TProdct, Shop as TShop } from '@/types'
import { getShopProducts } from '@/repository/shops/getShopProducts'

export const getServerSideProps: GetServerSideProps<{
  product: TProdct
  shop: TShop
  productCount: number
  followerCount: number
  myShopId: string | null
  isLiked: boolean
  isFollowed: boolean
  suggest: TProdct[]
  shopProducts: TProdct[]
}> = async (context) => {
  const productId = context.query.productId as string

  const { data: product } = await getProduct(productId)
  const {
    data: { shopId: myShopId },
  } = await getMe()

  const [
    { data: isLiked },
    productsByTagsResult,
    { data: shop },
    { data: productCount },
    { data: followerCount },
    { data: isFollowed },
    { data: shopProducts },
  ] = await Promise.all([
    myShopId !== null
      ? await getIsLikedWithProductIdAndShopId({
          productId,
          shopId: myShopId,
        })
      : { data: false },
    Promise.all((product.tags || []).map((tag) => getProductsByTag(tag))),
    getShop(product.createdBy),
    getShopProductCount(product.createdBy),
    getShopFollowerCount(product.createdBy),
    myShopId !== null
      ? getIsFollowedByShopId({
          followerId: myShopId,
          followedId: product.createdBy,
        })
      : { data: false },
    getShopProducts({ shopId: product.createdBy, fromPage: 0, toPage: 1 }),
  ])

  const suggest = productsByTagsResult.map(({ data }) => data).flat()

  return {
    props: {
      product,
      shop,
      productCount,
      followerCount,
      myShopId,
      isLiked,
      suggest,
      isFollowed,
      shopProducts,
    },
  }
}

dayjs.extend(relativeTime).locale('ko')

export default function ProductDetail({
  product,
  shop,
  productCount,
  followerCount,
  myShopId,
  suggest,
  shopProducts,
  isLiked: initialIsLiked,
  isFollowed: initialIsFollowed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [isFollowed, setIsFollowed] = useState(initialIsFollowed)

  const checkAuth = (func: Function) => () => {
    if (!myShopId) {
      alert('로그인이 필요합니다.')
      return
    }
    func()
  }

  const handleToggleLike = checkAuth(() => {
    setIsLiked((prev) => !prev)
    // 서버 요청 전달
  })

  const handleChat = checkAuth(() => {
    alert('채팅하기')
  })

  const handlePruchase = checkAuth(() => {
    alert('구매하기')
  })

  const handleToggleFollow = checkAuth(() => {
    setIsFollowed((prev) => !prev)
    // 서버 요청 전달
  })

  return (
    <Wrapper>
      <Container>
        <div className="flex gap-6 my-6">
          <div className="w-96 h-96 shrink-0">
            <ProductImage imageUrls={product.imageUrls} />
          </div>
          <div
            className="flex flex-col justify-between flex-1"
            style={{ minWidth: 0 }}
          >
            <div>
              <div className="truncate">
                <Text size="4xl" weight="bold">
                  {product.title}
                </Text>
              </div>
              <div className="my-6">
                <Text size="3xl">{product.price.toLocaleString()}</Text>
                <Text size="xl"> 원 </Text>
              </div>
              <div className="border-t border-grey-500 py-4 flex gap-1 items-center">
                <Text color="grey" className="flex">
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: '1.25rem',
                    }}
                  >
                    schedule
                  </span>
                </Text>
                <Text color="grey">{dayjs(product.createdAt).fromNow()}</Text>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                fullWidth
                color="grey"
                className="flex justify-center items-center gap-1"
                onClick={() => handleToggleLike()}
              >
                <span
                  style={{ fontSize: '1rem' }}
                  className="material-symbols-outlined"
                >
                  favorite
                </span>
                <Text color="white"> {isLiked ? '찜 취소' : '찜'} </Text>
              </Button>
              <Button
                fullWidth
                color="orange"
                className="flex justify-center items-center gap-1"
                onClick={() => handleChat()}
              >
                <span
                  style={{ fontSize: '1rem' }}
                  className="material-symbols-outlined"
                >
                  chat_bubble
                </span>
                <Text color="white"> 문의하기 </Text>
              </Button>
              <Button
                fullWidth
                disabled={!!product.purchaseBy}
                color="red"
                className="flex justify-center items-center gap-1"
                onClick={() => handlePruchase()}
              >
                <Text color="white">
                  {!!product.purchaseBy ? '판매완료' : '바로구매'}
                </Text>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex border-t border-black pt-10">
          <div className="w-4/6 pr-2">
            <div className="border-b border-grey pb-3">
              <Text size="xl">상품 정보</Text>
            </div>
            <div className="mt-5 mb-10">{product.description}</div>
            <div className="border-y py-4 flex gap-2">
              <div className="rounded bg-slate-200 px-3 py-1 text-sm">
                {product.isUsed ? '중고상품' : '새 상품'}
              </div>
              <div className="rounded bg-slate-200 px-3 py-1 text-sm">
                {product.isChangable ? '교환가능' : '교환불가'}
              </div>
            </div>
            <div className="flex py-4 border-b mb-10">
              <div className="flex-1 flex flex-col items-center gap-2">
                <Text size="lg" color="grey">
                  거래지역
                </Text>
                <Text color="grey"> {product.address} </Text>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <Text size="lg" color="grey">
                  상품태그
                </Text>
                <div className="flex gap-2 flex-wrap justify-center">
                  {product.tags === null ? (
                    <Text color="grey"> 상품 태그가 없습니다.</Text>
                  ) : (
                    product.tags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-purple-200 rounded-xl px-2 text-sm"
                      >
                        {tag}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {suggest.length === 0 ? null : (
              <div>
                <div>
                  <Text size="xl"> 비슷한 상품 </Text>
                </div>
                <div className="my-5 flex gap-3 flex-wrap">
                  {suggest
                    .slice(0, 3)
                    .map(({ id, title, price, createdAt, imageUrls }) => (
                      <Link key={id} href={`/products/${id}`}>
                        <a className="w-44">
                          <Product
                            title={title}
                            price={price}
                            createdAt={createdAt}
                            imageUrl={imageUrls[0]}
                          />
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-2/6 border-l border-grey pl-2">
            <div className="border-b border-grey pb-3">
              <Text size="xl"> 상점 정보 </Text>
            </div>
            <div className="p-5">
              <Shop
                name={shop.name}
                profileImageUrl={shop.imageUrl || undefined}
                productCount={productCount}
                followerCount={followerCount}
                type="row"
              />
            </div>
            <Button color="grey" fullWidth onClick={handleToggleFollow}>
              <Text
                color="black"
                className="flex justify-center items-center gap-1"
              >
                <span className="material-symbols-outlined">
                  {isFollowed ? 'person_remove' : 'person_add'}
                </span>
                {isFollowed ? '언팔로우' : '팔로우'}
              </Text>
            </Button>
            <div className="grid grid-cols-2 gap-2 my-5">
              {shopProducts.slice(0, 2).map(({ id, imageUrls, price }) => (
                <div key={id} className="relative aspect-square">
                  <img src={imageUrls[0]} alt="" className="w-full h-full" />
                  <div className="absolute bottom-0 w-full bg-black opacity-50 text-center py-1">
                    <Text color="white" size="sm">
                      {price.toLocaleString()}원
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
