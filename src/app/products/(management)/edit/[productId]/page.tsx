import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ProductForm from '../../_components/ProductForm'

import { getMe } from '@/repository/me/getMe'
import { getProduct } from '@/repository/products/getProduct'
import { City } from '@/utils/address'
import { AuthError } from '@/utils/error'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

type Props = {
  params: { productId: string }
}

export default async function ProductEdit({ params: { productId } }: Props) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  try {
    const {
      data: { shopId },
    } = await getMe(supabase)

    if (!shopId) {
      throw new AuthError()
    }
  } catch (e) {
    if (e instanceof AuthError) {
      return redirect(
        `/login?next=${encodeURIComponent(`/products/edit/${productId}`)}`,
      )
    }
    throw e
  }

  const { data: product } = await getProduct(supabase, productId)

  const [city, district] = product.address.split(' ')

  return (
    <ProductForm
      id={product.id}
      imageUrls={product.imageUrls}
      title={product.title}
      isUsed={product.isUsed}
      isChangeable={product.isChangeable}
      price={product.price}
      city={city as City}
      district={district}
      description={product.description}
      tags={product.tags || undefined}
    />
  )
}
