import FullScreenMessage from '@shared/FullScreenMessage'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import styles from './App.module.scss'

import { Wedding } from '@models/wedding'

import Heading from './components/sections/Heading'
import Video from './components/sections/Video'

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

  const { date } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      {JSON.stringify(wedding)}
    </div>
  )
}

export default App
