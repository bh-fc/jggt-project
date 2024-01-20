import { ReactNode } from 'react'
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import Button from '@/components/common/Button'

type Props = {
  children: ReactNode
}

export default function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button color="red" className="w-28 h-12" isLoading={pending}>
      {children}
    </Button>
  )
}
