import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/products/manage',
      permanent: false,
    },
  }
}

export default function Products() {
  return null
}
