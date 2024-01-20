import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ProductForm from '../../_components/ProductForm'

import { getMe } from '@/repository/me/getMe'
import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'
import { City } from '@/utils/address'
import { AuthError } from '@/utils/error'
import getServerSupabase from '@/utils/supabase/getServerSupabase'

export const getServerSideProps: GetServerSideProps<{
  product: Product
}> = async (context) => {
  const supabase = getServerSupabase(context)

  try {
    const {
      data: { shopId },
    } = await getMe(supabase)

    if (!shopId) {
      throw new AuthError()
    }

    const productId = context.query.productId as string
    const { data: product } = await getProduct(supabase, productId)

    return { props: { product } }
  } catch (e) {
    if (e instanceof AuthError) {
      return {
        redirect: {
          destination: `/login?next=${encodeURIComponent(context.resolvedUrl)}`,
          permanent: false,
        },
      }
    }
    throw e
  }
}

export default function ProductEdit({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
