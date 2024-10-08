import { Swiper, SwiperSlide } from 'swiper/react'

import generateImageUrl from '@/utils/generateImageUrl'
import classNames from 'classnames/bind'
import 'swiper/css'
import Dimmed from '../shared/Dimmed'
import styles from './ImageViewr.module.scss'
import './swiper.css'

const cx = classNames.bind(styles)

function ImageViewer({
  images,
  open,
  selectedIndex,
  onClose,
}: {
  images: string[]
  open: boolean
  selectedIndex: number
  onClose: () => void
}) {
  if (open === false) {
    return null
  }
  return (
    <Dimmed>
      <CloseBtn onClose={onClose} className={cx('icon-close')} />
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        initialSlide={selectedIndex}
      >
        {images.map((image, idx) => {
          return (
            <SwiperSlide key={idx}>
              <picture>
                <source
                  srcSet={`${generateImageUrl({ fileName: image, format: 'webp' })}`}
                  type="image/webp"
                />
                <img
                  src={`${generateImageUrl({ fileName: image, format: 'jpg' })}`}
                  alt="사진첩 이미지"
                />
              </picture>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Dimmed>
  )
}
export default ImageViewer

function CloseBtn({
  onClose,
  className,
}: {
  onClose: () => void
  className: string
}) {
  return (
    <svg
      className={className}
      id="Icons"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClose}
    >
      <defs></defs>
      <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
      <path d="M16.707,7.293a1,1,0,0,0-1.414,0L12,10.586,8.707,7.293A1,1,0,1,0,7.293,8.707L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414L13.414,12l3.293-3.293A1,1,0,0,0,16.707,7.293Z" />
    </svg>
  )
}
