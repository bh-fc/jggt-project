import classNames from 'classnames'

import ShopProfileImage from '../ShopProfileImage'
import Text from '../Text'

interface Props {
  /** 상점 이름 */
  name: string
  /** 상점 프로필 이미지 주소 */
  profileImageUrl?: string
  /** 상점에 등록된 상품 수 */
  productCount: number
  /** 상점을 팔로우 하는 팔로워 수 */
  followerCount: number
  /** 상점 컴포넌트 뷰 타입 */
  type?: 'row' | 'column'
}

export default function Shop({
  name,
  profileImageUrl,
  productCount,
  followerCount,
  type,
}: Props) {
  return (
    <div
      className={classNames(
        'flex',
        {
          'flex-row': type === 'row',
          'flex-col': type === 'column',
        },
        type === 'column' && 'gap-1 items-center',
      )}
    >
      <div className="w-14">
        <ShopProfileImage imageUrl={profileImageUrl} />
      </div>
      <div
        className={classNames(
          'flex flex-col overflow-hidden',
          type === 'row' && 'ml-3 justify-around',
          type === 'column' && 'w-full',
        )}
      >
        <div
          className={classNames('truncate', type === 'column' && 'text-center')}
        >
          <Text>{name}</Text>
        </div>
        <Text
          size="sm"
          color={type === 'row' ? 'grey' : 'black'}
          className={classNames(
            'flex gap-2',
            type === 'column' && 'justify-center',
          )}
        >
          <div>상품 {productCount.toLocaleString()}</div> |
          <div>팔로워 {followerCount.toLocaleString()}</div>
        </Text>
      </div>
    </div>
  )
}
