'use client'

import { ReactNode, useEffect } from 'react'

import { addRecentItemId } from '@/utils/localstorage'

type Props = {
  children: ReactNode
  productId: string
}

export default function ProductWrapper({ children, productId }: Props) {
  useEffect(() => {
    addRecentItemId(productId)
  }, [productId])

  return <> {children} </>
}
