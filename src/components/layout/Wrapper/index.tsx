import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function Wrapper({ children, className }: Props) {
  return (
    <section className={classNames(className, 'w-full')}>{children}</section>
  )
}
