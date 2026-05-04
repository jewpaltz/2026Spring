/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react'
import { create } from 'zustand'

type ConfirmState = {
  isOpen: boolean
  title: string
  message: string
  shouldFocus?: boolean
  resolve: (value: any) => void
  reject: (reason: any) => void
}

const useConfirmStore = create<ConfirmState>(() => ({
  isOpen: false,
  title: '',
  message: '',
  shouldFocus: undefined,
  resolve: () => null,
  reject: () => null,
}))

export function confirm(title: string, message: string, shouldFocus?: boolean) {
  return new Promise((resolve, reject) => {
    useConfirmStore.setState({
      isOpen: true,
      title,
      message,
      shouldFocus,
      resolve,
      reject,
    })
  })
}

export default function DialogBoxes() {
  const { isOpen, title, message, shouldFocus, resolve } = useConfirmStore()
  const btnYesRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && shouldFocus) {
      btnYesRef.current?.focus()
    }
  }, [isOpen, shouldFocus])

  function yes() {
    resolve(true)
    useConfirmStore.setState({ isOpen: false })
  }

  function no() {
    resolve(false)
    useConfirmStore.setState({ isOpen: false })
  }

  if (!isOpen) return null

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => useConfirmStore.setState({ isOpen: false })}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={() => useConfirmStore.setState({ isOpen: false })}></button>
        </header>
        <section className="modal-card-body">
          <p>{message}</p>
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button is-success" onClick={yes} ref={btnYesRef}>Yes</button>
            <button className="button" onClick={no}>No</button>
          </div>
        </footer>
      </div>
    </div>
  )
}
