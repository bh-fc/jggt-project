import { faker } from '@faker-js/faker'
import { Carousel } from 'react-responsive-carousel'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Banner() {
  return (
    <Carousel
      className="my-8"
      infiniteLoop
      showThumbs={false}
      showStatus={false}
    >
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="h-96">
          <img src={faker.image.dataUri()} className="w-full h-full" />
        </div>
      ))}
    </Carousel>
  )
}
