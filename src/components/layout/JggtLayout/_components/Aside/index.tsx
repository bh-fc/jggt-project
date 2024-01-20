import classNames from 'classnames'

import Recent from './_components/Recent'
import styles from './style.module.scss'

import Text from '@/components/common/Text'
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
        <div className="border border-black bg-white p-2 flex flex-col items-center">
          <Text size="xs">찜한 상품</Text>
          <Text size="xs" color="grey" className="flex gap-1 items-center mt-1">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '0.725rem' }}
            >
              favorite
            </span>
            0
          </Text>
        </div>
        <Recent />
      </aside>
    </Container>
  )
}
