import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

export default function Footer() {
  return (
    <Wrapper>
      <aside className="border-t border-slate-300">
        <Container>
          <div className="py-5 flex gap-5">
            <Text>회사소개</Text>|<Text>이용약관</Text>|<Text>운영정책</Text>
          </div>
        </Container>
      </aside>
    </Wrapper>
  )
}
