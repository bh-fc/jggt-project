import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Shop from '@/components/common/Shop'
import Spinner from '@/components/common/Spinner'
import { getShop } from '@/repository/shops/getShop'
import { getShopFollowerCount } from '@/repository/shops/getShopFollowerCount'
import { getShopProductCount } from '@/repository/shops/getShopProductCount'
import { getShopProducts } from '@/repository/shops/getShopProducts'
import { Product, Shop as TShop } from '@/types'

type Props = {
  shopId: string
}

export default function FollowingItem({ shopId }: Props) {
  const router = useRouter()
  const [data, setData] = useState<{
    shop: TShop
    products: Product[]
    productCount: number
    followerCount: number
  }>()

  useEffect(() => {
    ;(async () => {
      const [
        { data: shop },
        { data: products },
        { data: productCount },
        { data: followerCount },
      ] = await Promise.all([
        getShop(shopId),
        getShopProducts({ shopId, fromPage: 0, toPage: 1 }),
        getShopProductCount(shopId),
        getShopFollowerCount(shopId),
      ])
      setData({ shop, products, productCount, followerCount })
    })()
  }, [shopId])

  if (!data) {
    return (
      <div className="border border-dashed flex justify-center items-center h-40 my-6">
        <Spinner />
      </div>
    )
  }

  const { shop, products, productCount, followerCount } = data

  return (
    <div className="flex gap-5 my-6">
      <div className="flex items-center">
        <Shop
          name={shop.name}
          profileImageUrl={shop.imageUrl || undefined}
          productCount={productCount}
          followerCount={followerCount}
          handleClickTitle={() => router.push(`/shops/${shop.id}`)}
          handleClickProfileImage={() => router.push(`/shops/${shop.id}`)}
          handleClickProductCount={() =>
            router.push(`/shops/${shop.id}/products`)
          }
          handleClickFollowerCount={() =>
            router.push(`/shops/${shop.id}/follower`)
          }
          type="column"
        />
      </div>
      {products.slice(0, 3).map(({ imageUrls, id, title }) => (
        <Link href={`/products/${id}`} key={id}>
          <a className="w-40 h-40">
            <img src={imageUrls[0]} alt={title} className="w-full h-full" />
          </a>
        </Link>
      ))}
    </div>
  )
}
