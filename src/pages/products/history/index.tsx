import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/products/history/sell',
      permanent: false,
    },
  }
}

export default function ProductsHistory() {
  return null
}
