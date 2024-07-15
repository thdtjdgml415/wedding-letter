import React, {
  ComponentProps,
  createContext,
  useContext,
  useState,
} from 'react'

import Modal from '@/components/shared/Modal'
import { createPortal } from 'react-dom'

type ModalProps = ComponentProps<typeof Modal>
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (option: ModalOptions) => void
  close: () => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValue: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}

export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState(defaultValue)
  const $portal_root = document.getElementById('root-portal')
  const open = (options: ModalOptions) => {
    setModalState({ ...options, open: true })
  }
  const close = () => {
    setModalState(defaultValue)
  }

  const values = {
    open,
    close,
  }
  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Modal {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useModalContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('컨텍스트의 값을 찾을 수 없습니다.')
  }
  return values
}
