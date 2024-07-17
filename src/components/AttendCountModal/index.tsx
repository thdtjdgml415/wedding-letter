import { useModalContext } from '@/contexts/ModalContexts'
import { Wedding } from '@/models/wedding'
import { useEffect, useRef } from 'react'

function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close } = useModalContext()
  const $input = useRef<HTMLInputElement>(null)

  const haveSeenModal = localStorage.getItem('@have-seen-modal')

  useEffect(() => {
    if (haveSeenModal === 'true') return
    open({
      title: `현재 참석자 ${wedding.attendCount}`,
      body: (
        <div>
          <input
            ref={$input}
            type="number"
            placeholder="참석하실 인원을 입력해주세요."
            style={{ width: '100%' }}
          />
        </div>
      ),
      onRightButtonClick: async () => {
        if ($input.current == null) {
          return
        }
        await fetch('http://localhost:8888/wedding', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,
            attendCount: wedding.attendCount + Number($input.current.value),
          }),
          headers: {
            'Content-type': 'application/json',
          },
        })
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
    })
  }, [open, close, wedding, haveSeenModal])
  return null
}
export default AttendCountModal
