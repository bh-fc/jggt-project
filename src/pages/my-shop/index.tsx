import { GetServerSideProps } from 'next'

import { getMe } from '@/repository/me/getMe'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    data: { shopId },
  } = await getMe()

  if (shopId === null) {
    throw new Error('로그인이 필요합니다')
  }

  return {
    redirect: {
      destination: `/shops/${shopId}`,
      permanent: false,
    },
  }
}

export default function MyShops() {
  return null
}
