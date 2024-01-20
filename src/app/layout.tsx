import { Metadata } from 'next'
import { ReactNode } from 'react'

import '@/styles/globals.css'
import JggtLayout from '@/components/layout/JggtLayout'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: '중고장터',
  openGraph: {
    title: '중고장터',
  },
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body>
        <JggtLayout>{children}</JggtLayout>
      </body>
    </html>
  )
}
