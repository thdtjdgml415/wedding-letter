import FullScreenMessage from '@shared/FullScreenMessage'
import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './App.module.scss'

import AttendCountModal from './components/AttendCountModal'
import Calendar from './components/sections/Calendar'
import Contact from './components/sections/Contact'
import Heading from './components/sections/Heading'
import ImageGallery from './components/sections/ImageGallery'
import Invitation from './components/sections/Invitation'
import Map from './components/sections/Map'
import Share from './components/sections/Share'
import Video from './components/sections/Video'
import Intro from './components/shared/Intro'
import useWedding from './hooks/useWedding'

const cx = classNames.bind(styles)

function App() {
  const { wedding, loading, error } = useWedding()
  const [count, setCount] = useState(0)
  // 1. wedding 데이터 호출

  if (wedding == null) return null

  if (loading) {
    return <FullScreenMessage type="loading" />
  }

  if (error) {
    return <FullScreenMessage type="error" />
  }

  const { date, galleryImages, groom, bride, location, message } = wedding

  return (
    <div className={cx('container')}>
      <button
        style={{ position: 'fixed', top: 0 }}
        onClick={() => {
          setCount((prev) => prev + 1)
        }}
      >
        + {count}
      </button>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={message.intro}
      />
      <Invitation message={message.invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />
      <AttendCountModal wedding={wedding} />
    </div>
  )
}

export default App
