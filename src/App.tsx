import FullScreenMessage from '@shared/FullScreenMessage'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'

import { Wedding } from '@models/wedding'

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

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // 1. wedding 데이터 호출
  useEffect(() => {
    setLoading(true)
    // callback, promise, await
    fetch('http://localhost:8888/wedding')
      .then((data) => {
        if (data.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return data.json()
      })
      .then((res) => {
        setWedding(res)
        setLoading(false)
      })
      .catch((e) => {
        console.error(e)

        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

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
