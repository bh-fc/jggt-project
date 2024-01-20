import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import Wrapper from '@/components/layout/Wrapper'

export default function UserInfo() {
  return (
    <Wrapper>
      <aside className="border-b border-slate-300">
        <Container>
          <div className="flex justify-end py-1">
            <Text size="sm" color="grey">
              로그인 / 회원가입
            </Text>
          </div>
        </Container>
      </aside>
    </Wrapper>
  )
}
