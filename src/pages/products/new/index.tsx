import { GetServerSideProps } from 'next'

import ProductForm from '../_components/ProductForm'

import { getMe } from '@/repository/me/getMe'
import { AuthError } from '@/utils/error'

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  try {
    const {
      data: { shopId },
    } = await getMe()

    if (!shopId) {
      throw new AuthError()
    }

    return {
      props: {},
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

export default function ProductNew() {
  return <ProductForm />
}
