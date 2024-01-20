import classNames from 'classnames'

import Likes from './_components/Likes'
import Recent from './_components/Recent'
import styles from './style.module.scss'

import Container from '@/components/layout/Container'

export default function Aside() {
  return (
    <Container className="relative">
      <aside
        className={classNames(
          styles.aside,
          'absolute top-8 flex flex-col gap-2 w-24',
        )}
      >
        <Likes />
        <Recent />
      </aside>
    </Container>
  )
}
