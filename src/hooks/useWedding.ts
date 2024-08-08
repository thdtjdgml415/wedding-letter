import { getWedding } from '@/api/wedding'
import { Wedding } from '@/models/wedding'
import { useQuery } from 'react-query'

function useWedding() {
  const { data, isLoading, error } = useQuery<Wedding>(
    ['wedding'],
    () =>
      getWedding().then((response) => {
        if (response.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }
        return response.json() // 이 부분이 Promise<Wedding>을 반환하도록 보장합니다.
      }),
    {
      suspense: true,
    },
  )

  return { wedding: data, isLoading, error }
}
export default useWedding
