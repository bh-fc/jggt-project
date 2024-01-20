import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: `/shops/${context.query.shopId}/products`,
      permanent: false,
    },
  }
}

export default function Shops() {
  return null
}
