import { useState } from 'react'

type Props = {
  id: string
  title: string
  price: number
  imageUrl: string
}

export default function RecentItem({ id, title, price, imageUrl }: Props) {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!isHover ? (
        <div className="w-16 h-16 border border-grey-300">
          <img src={imageUrl} alt={title} className="w-full h-full" />
        </div>
      ) : (
        <div className="w-16 h-16 relative">
          <div>
            <img src={imageUrl} alt={title} className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  )
}
