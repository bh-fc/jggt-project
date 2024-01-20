import { GetServerSideProps } from 'next'

import { getMe } from '@/repository/me/getMe'
import { AuthError } from '@/utils/error'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const {
      data: { shopId },
    } = await getMe()

    if (!shopId) {
      throw new AuthError()
    }

    return {
      redirect: {
        destination: `/shops/${shopId}`,
        permanent: false,
      },
    }
  } catch (e) {
    if (e instanceof AuthError) {
      return {
        redirect: {
          destination: `/login?next=${encodeURIComponent('/my-shop')}`,
          permanent: false,
        },
      }
    }
    throw e
  }
}

export default function MyShops() {
  return null
}
