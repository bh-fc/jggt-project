import dayjs from 'dayjs'
import { MetadataRoute } from 'next'

import { getProducts } from '@/repository/products/getProducts'
import supabase from '@/utils/supabase/browserSupabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await getProducts(supabase, {
    fromPage: 0,
    toPage: 2,
  })

  const productsSitemap: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${process.env.BASE_URL}/products/${product.id}`,
    lastModified: dayjs(product.createdAt).toDate(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productsSitemap,
  ]
}
