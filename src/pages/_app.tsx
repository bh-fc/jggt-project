import type { AppProps } from 'next/app'
import Head from 'next/head'

import JggtLayout from '@/components/layout/JggtLayout'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JggtLayout>
      <Head>
        <title>중고장터</title>
        <meta property="og:title" content="중고장터" key="title" />
      </Head>
      <Component {...pageProps} />
    </JggtLayout>
  )
}
