import type { AppProps } from 'next/app'

import JggtLayout from '@/components/layout/JggtLayout'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JggtLayout>
      <Component {...pageProps} />
    </JggtLayout>
  )
}
