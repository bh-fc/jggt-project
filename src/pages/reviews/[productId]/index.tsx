import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import MarkdownEditorSkeleton from '@/components/shared/MarkdownEditor/Skeleton'
import { getMe } from '@/repository/me/getMe'
import { getProduct } from '@/repository/products/getProduct'
import { createReview } from '@/repository/reviews/createReview'
import { getReviewByProductId } from '@/repository/reviews/getReviewByProductId'
import { Product, Review } from '@/types'
import { AuthError } from '@/utils/error'
import supabase from '@/utils/supabase/browserSupabase'
import getServerSupabase from '@/utils/supabase/getServerSupabase'

export const getServerSideProps: GetServerSideProps<{
  product: Product
  review: Review | null
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

    const [{ data: product }, { data: review }] = await Promise.all([
      getProduct(supabase, productId),
      getReviewByProductId(supabase, productId),
    ])

    return {
      props: { product, review },
    }
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

const MarkdownEditor = dynamic(
  () => import('@/components/shared/MarkdownEditor'),
  {
    ssr: false,
    loading: () => <MarkdownEditorSkeleton />,
  },
)

export default function ReviewPage({
  product,
  review,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>(review?.contents || '')

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await createReview(supabase, {
        productId: product.id,
        contents: value,
      })
      location.reload()
    } catch (e) {
      alert('리뷰 작성을 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Wrapper>
      <Container>
        <div className="my-5">
          <Text size="2xl" color="red">
            {product.title}
          </Text>
          <Text size="xl" weight="light">
            의 구매 후기를 작성해주세요.
          </Text>
        </div>
        <div>
          <MarkdownEditor
            initialValue={value}
            disabled={!!review}
            handleOnChage={(value) => setValue(value)}
          />
          <div className="flex justify-end mt-2">
            <Button
              color="red"
              onClick={handleSubmit}
              disabled={!!review}
              isLoading={isLoading}
            >
              작성하기
            </Button>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
