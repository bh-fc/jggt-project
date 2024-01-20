'use client'

import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

type Props = {
  imageUrls?: string[]
}

export default function ProductImage({ imageUrls = [] }: Props) {
  return (
    <Carousel infiniteLoop showThumbs={false} showStatus={false}>
      {imageUrls.map((url) => (
        <Image
          key={url}
          src={url}
          width={384}
          height={384}
          alt=""
          className="w-96 h-96"
        />
      ))}
    </Carousel>
  )
}
