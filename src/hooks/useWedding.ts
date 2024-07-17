import { getWedding } from '@/api/wedding'
import { Wedding } from '@/models/wedding'
import { useEffect, useState } from 'react'

function useWedding() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    setLoading(true)
    // callback, promise, await
    getWedding()
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
  return { wedding, loading, error }
}
export default useWedding
