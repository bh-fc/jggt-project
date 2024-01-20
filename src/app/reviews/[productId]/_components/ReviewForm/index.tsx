'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import MarkdownEditorSkeleton from '@/components/shared/MarkdownEditor/Skeleton'
import { createReview } from '@/repository/reviews/createReview'
import { Product, Review } from '@/types'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  product: Product
  review: Review | null
}

const MarkdownEditor = dynamic(
  () => import('@/components/shared/MarkdownEditor'),
  {
    ssr: false,
    loading: () => <MarkdownEditorSkeleton />,
  },
)

export default function ReviewForm({ product, review }: Props) {
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
