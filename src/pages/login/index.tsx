import { GetServerSideProps } from 'next'

import LoginPannel from '@/components/shared/LoginPannel'
import { getMe } from '@/repository/me/getMe'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    data: { shopId },
  } = await getMe()

  if (shopId) {
    const destination = context.query.next
      ? decodeURIComponent(context.query.next as string)
      : '/'

    return {
      redirect: {
        destination,
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default function Login() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: 'inherit' }}
    >
      <LoginPannel />
    </div>
  )
}
