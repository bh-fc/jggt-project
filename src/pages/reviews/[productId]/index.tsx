import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import MarkdownEditorSkeleton from '@/components/shared/MarkdownEditor/Skeleton'
import { getProduct } from '@/repository/products/getProduct'
import { getReviewByProductId } from '@/repository/reviews/getReviewByProductId'
import { Product, Review } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  product: Product
  review: Review | null
}> = async (context) => {
  const productId = context.query.productId as string

  const [{ data: product }, { data: review }] = await Promise.all([
    getProduct(productId),
    getReviewByProductId(productId),
  ])

  return {
    props: { product, review },
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
  const [value, setValue] = useState<string>(review?.contents || '')

  const handleSubmit = () => {
    alert(value)
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
            <Button color="red" onClick={handleSubmit} disabled={!!review}>
              작성하기
            </Button>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
