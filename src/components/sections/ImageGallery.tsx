import classNames from 'classnames/bind'
import { useState } from 'react'
import ImageViewer from '../ImageViewer'

import Section from '../shared/Section'

import styles from './ImageGallery.module.scss'

const cx = classNames.bind(styles)

function ImageGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const open = selectedIndex > -1

  const handleSelecedImage = (idx: number) => {
    setSelectedIndex(idx)
  }

  const handleClose = () => {
    setSelectedIndex(-1)
  }

  return (
    <Section title="사진첩">
      <ul className={cx(`wrap-images`)}>
        {images.map((src, idx) => (
          <li
            key={idx}
            className={cx(`wrap-image`)}
            onClick={() => handleSelecedImage(idx)}
          >
            <img src={`${src}`} alt="사진첩 이미지" />
          </li>
        ))}
      </ul>
      <ImageViewer
        images={images}
        open={open}
        selectedIndex={selectedIndex}
        onClose={handleClose}
      />
    </Section>
  )
}
export default ImageGallery
