import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import ChatButton from './_components/ChatButton'
import FollowButton from './_components/FollowButton'
import LikeButton from './_components/LikeButton'
import ProductImage from './_components/ProductImage'
import ProductWrapper from './_components/ProductWrapper'
import PurchaseButton from './_components/PurchaseButton'
import ReviewItem from './_components/ReviewItem'
import ShopInfo from './_components/ShopInfo'

import Product from '@/components/common/Product'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import MarkdownViewerSkeleton from '@/components/shared/MarkdownViewer/Skeleton'
import { getIsFollowedByShopId } from '@/repository/followes/getIsFollowedByShopId'
import { getIsLikedWithProductIdAndShopId } from '@/repository/likes/getIsLikedWithProductIdAndShopId'
import { getMe } from '@/repository/me/getMe'
import { getProduct } from '@/repository/products/getProduct'
import { getProductsByTag } from '@/repository/products/getProductsByTag'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopProducts } from '@/repository/shops/getShopProducts'
import { getShopReviewCount } from '@/repository/shops/getShopReviewCount'
import { getShopReviews } from '@/repository/shops/getShopReviews'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

dayjs.extend(relativeTime).locale('ko')

const MarkdownViewer = dynamic(
  () => import('@/components/shared/MarkdownViewer'),
  {
    ssr: false,
    loading: () => <MarkdownViewerSkeleton />,
  },
)

type Props = {
  params: { productId: string }
}

export async function generateMetadata({
  params: { productId },
}: Props): Promise<Metadata> {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const { data: product } = await getProduct(supabase, productId)

  const title = `중고장터 - ${product.title}`

  return {
    title,
    openGraph: {
      title,
      images: product.imageUrls,
    },
  }
}

export default async function ProductDetail({ params: { productId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const { data: product } = await getProduct(supabase, productId)
  const {
    data: { shopId: myShopId },
  } = await getMe(supabase)

  const [
    { data: isLiked },
    productsByTagsResult,
    { data: shop },
    { data: productCount },
    { data: followerCount },
    { data: isFollowed },
    { data: shopProducts },
    { data: reviews },
    { data: reviewCount },
  ] = await Promise.all([
    myShopId !== null
      ? await getIsLikedWithProductIdAndShopId(supabase, {
          productId,
          shopId: myShopId,
        })
      : { data: false },
    Promise.all(
      (product.tags || []).map((tag) => getProductsByTag(supabase, tag)),
    ),
    getShop(supabase, product.createdBy),
    getShopProductCount(supabase, product.createdBy),
    getShopFollowerCount(supabase, product.createdBy),
    myShopId !== null
      ? getIsFollowedByShopId(supabase, {
          followerId: myShopId,
          followedId: product.createdBy,
        })
      : { data: false },
    getShopProducts(supabase, {
      shopId: product.createdBy,
      fromPage: 0,
      toPage: 1,
    }),
    getShopReviews(supabase, {
      shopId: product.createdBy,
      fromPage: 0,
      toPage: 1,
    }),
    getShopReviewCount(supabase, product.createdBy),
  ])

  const suggest = productsByTagsResult.map(({ data }) => data).flat()

  return (
    <ProductWrapper productId={product.id}>
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
                <LikeButton
                  initialIsLiked={isLiked}
                  isLoggedIn={!!myShopId}
                  productId={product.id}
                />
                <ChatButton isLoggedIn={!!myShopId} shopId={shop.id} />
                <PurchaseButton
                  isLoggedIn={!!myShopId}
                  isPurchased={!!product.purchaseBy}
                  productId={product.id}
                />
              </div>
            </div>
          </div>
          <div className="flex border-t border-black pt-10">
            <div className="w-4/6 pr-2">
              <div className="border-b border-grey pb-3">
                <Text size="xl">상품 정보</Text>
              </div>
              <div className="mt-5 mb-10">
                <MarkdownViewer value={product.description} />
              </div>
              <div className="border-y py-4 flex gap-2">
                <div className="rounded bg-slate-200 px-3 py-1 text-sm">
                  {product.isUsed ? '중고상품' : '새 상품'}
                </div>
                <div className="rounded bg-slate-200 px-3 py-1 text-sm">
                  {product.isChangeable ? '교환가능' : '교환불가'}
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
                          <Product
                            title={title}
                            price={price}
                            createdAt={createdAt}
                            imageUrl={imageUrls[0]}
                          />
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
                <ShopInfo
                  shop={shop}
                  followerCount={followerCount}
                  productCount={productCount}
                />
              </div>
              <FollowButton
                isLoggedIn={!!myShopId}
                initialIsFollowed={isFollowed}
                shopId={shop.id}
              />
              <div className="grid grid-cols-2 gap-2 mt-5">
                {shopProducts.slice(0, 2).map(({ id, imageUrls, price }) => (
                  <Link
                    key={id}
                    href={`/products/${id}`}
                    className="relative aspect-square"
                  >
                    <Image src={imageUrls[0]} alt="" fill />
                    <div className="absolute bottom-0 w-full bg-black opacity-50 text-center py-1">
                      <Text color="white" size="sm">
                        {price.toLocaleString()}원
                      </Text>
                    </div>
                  </Link>
                ))}
              </div>
              {shopProducts.length > 2 && (
                <Link href="/" className="block border-b text-center py-3">
                  <Text size="sm" color="red">
                    {shopProducts.length - 2}개
                  </Text>{' '}
                  <Text size="sm" color="grey">
                    상품 더 보기 {'>'}
                  </Text>
                </Link>
              )}
              <div>
                <div className="my-4 border-b pb-4">
                  <Text>상점후기</Text>{' '}
                  <Text color="red">{reviewCount.toLocaleString()}</Text>
                </div>
                <div>
                  {reviews
                    .slice(0, 3)
                    .map(({ id, contents, createdBy, createdAt }) => (
                      <ReviewItem
                        key={id}
                        contents={contents}
                        createdBy={createdBy}
                        createdAt={createdAt}
                      />
                    ))}
                </div>
                <div>
                  <Link
                    href={`/shops/${shop.id}/reviews`}
                    className="block border-y text-center py-2"
                  >
                    <Text color="grey" size="sm">
                      상점후기 더 보기 {'>'}
                    </Text>
                  </Link>
                </div>
                <div className="flex gap-1 my-7">
                  <ChatButton isLoggedIn={!!myShopId} shopId={shop.id} />
                  <PurchaseButton
                    isLoggedIn={!!myShopId}
                    isPurchased={!!product.purchaseBy}
                    productId={product.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </ProductWrapper>
  )
}
