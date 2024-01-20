import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import 'dayjs/locale/ko'

import ProductImage from './_components/ProductImage'

import Button from '@/components/common/Button'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'
import { getProduct } from '@/repository/products/getProduct'
import { Product } from '@/types'

export const getServerSideProps: GetServerSideProps<{
  product: Product
}> = async (context) => {
  const productId = context.query.productId as string

  const { data: product } = await getProduct(productId)

  return {
    props: { product },
  }
}

dayjs.extend(relativeTime).locale('ko')

export default function ProductDetail({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const handleLike = () => {
    alert('찜하기')
  }

  const handleChat = () => {
    alert('채팅하기')
  }

  const handlePruchase = () => {
    alert('구매하기')
  }

  return (
    <Wrapper>
      <Container>
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
              <Button
                fullWidth
                color="grey"
                className="flex justify-center items-center gap-1"
                onClick={() => handleLike()}
              >
                <span
                  style={{ fontSize: '1rem' }}
                  className="material-symbols-outlined"
                >
                  favorite
                </span>
                <Text color="white"> 찜 </Text>
              </Button>
              <Button
                fullWidth
                color="orange"
                className="flex justify-center items-center gap-1"
                onClick={() => handleChat()}
              >
                <span
                  style={{ fontSize: '1rem' }}
                  className="material-symbols-outlined"
                >
                  chat_bubble
                </span>
                <Text color="white"> 문의하기 </Text>
              </Button>
              <Button
                fullWidth
                color="red"
                className="flex justify-center items-center gap-1"
                onClick={() => handlePruchase()}
              >
                <Text color="white"> 바로구매 </Text>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}
