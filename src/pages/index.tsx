import ProductList from './_components/ProductList'

import Container from '@/components/layout/Container'
import JggtLayout from '@/components/layout/JggtLayout'
import Wrapper from '@/components/layout/Wrapper'

export default function Home() {
  return (
    <JggtLayout>
      <Wrapper>
        <Container>
          <ProductList />
        </Container>
      </Wrapper>
    </JggtLayout>
  )
}
