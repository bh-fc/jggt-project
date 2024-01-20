import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import ProductForm from '../../_components/ProductForm'

import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'
import { City } from '@/utils/address'

export const getServerSideProps: GetServerSideProps<{
  product: Product
}> = async (context) => {
  const productId = context.query.productId as string
  const { data: product } = await getProduct(productId)

  return { props: { product } }
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
      isChangable={product.isChangable}
      price={product.price}
      city={city as City}
      district={district}
      description={product.description}
      tags={product.tags || undefined}
    />
  )
}
