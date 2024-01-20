import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
}

export default function Container({ children, className }: Props) {
  return (
    <section
      className={classNames(className, 'w-full mx-auto px-24')}
      style={{ maxWidth: 1200 }}
    >
      {children}
    </section>
  )
}
