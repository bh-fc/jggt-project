'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

import { createProduct } from '@/repository/products/createProduct'
import { updateProduct } from '@/repository/products/updateProduct'
import getServerComponentSupabase from '@/utils/supabase/getServerComponentSupabase'

export async function createProductAction(
  previousState: unknown,
  formData: FormData,
) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  try {
    const tags = formData.getAll('tags') as string[]
    const imageUrls = formData.getAll('imageUrls') as string[]

    if (imageUrls.length === 0) {
      throw new Error('상품 이미지를 1개 이상 등록해주세요.')
    }

    const title = formData.get('title') as string
    const price = parseInt(formData.get('price') as string)
    const city = formData.get('city') as string
    const district = formData.get('district') as string
    const address = `${city} ${district}`
    const description = formData.get('description') as string

    const isChangeable = formData.get('isChangeable') === 'y'
    const isUsed = formData.get('isUsed') === 'y'

    const { data } = await createProduct(supabase, {
      title,
      price,
      address,
      description,
      isChangeable,
      isUsed,
      tags,
      imageUrls,
    })

    return {
      status: 'success',
      data,
    }
  } catch (e: unknown) {
    return {
      status: 'error',
      errorMessage:
        (e instanceof Error && e.message) || '알 수 없는 에러가 발생했습니다.',
    }
  }
}

export async function updateProductAction(
  previousState: unknown,
  formData: FormData,
) {
  const cookieStore = cookies()
  const supabase = getServerComponentSupabase(cookieStore)

  try {
    const tags = formData.getAll('tags') as string[]
    const imageUrls = formData.getAll('imageUrls') as string[]

    if (imageUrls.length === 0) {
      throw new Error('상품 이미지를 1개 이상 등록해주세요.')
    }

    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const price = parseInt(formData.get('price') as string)
    const city = formData.get('city') as string
    const district = formData.get('district') as string
    const address = `${city} ${district}`
    const description = formData.get('description') as string

    const isChangeable = formData.get('isChangeable') === 'y'
    const isUsed = formData.get('isUsed') === 'y'

    const { data } = await updateProduct(supabase, {
      id,
      title,
      price,
      address,
      description,
      isChangeable,
      isUsed,
      tags,
      imageUrls,
    })

    return {
      status: 'success',
      data,
    }
  } catch (e: unknown) {
    return {
      status: 'error',
      errorMessage:
        (e instanceof Error && e.message) || '알 수 없는 에러가 발생했습니다.',
    }
  } finally {
    revalidateTag('product')
  }
}
