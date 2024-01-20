import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import { cookies } from 'next/headers'

import ChatButton from '../_components/ChatButton'
import LikeButton from '../_components/LikeButton'
import ProductImage from '../_components/ProductImage'
import PurchaseButton from '../_components/PurchaseButton'

import Text from '@/components/common/Text'
import { getIsLikedWithProductIdAndShopId } from '@/repository/likes/getIsLikedWithProductIdAndShopId'
import { getMe } from '@/repository/me/getMe'
import { getProductApi } from '@/repository/products/getProductApi'
import { getShop } from '@/repository/shops/getShop'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

dayjs.extend(relativeTime).locale('ko')

type Props = {
  params: { productId: string }
}

export default async function ProductsDetailTitle({
  params: { productId },
}: Props) {
  const { data: product } = await getProductApi(productId)

  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  const {
    data: { shopId: myShopId },
  } = await getMe(supabase)

  const [{ data: shop }, { data: isLiked }] = await Promise.all([
    getShop(supabase, product.createdBy),
    myShopId !== null
      ? getIsLikedWithProductIdAndShopId(supabase, {
          productId,
          shopId: myShopId,
        })
      : { data: false },
  ])

  return (
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
  )
}
