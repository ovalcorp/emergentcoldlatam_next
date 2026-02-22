'use client'

import { createPortal } from 'react-dom'
import { useEffect } from 'react'

interface ModalBasicProps {
  show: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

export function ModalBasic({ show, onClose, title, children }: ModalBasicProps) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
      const main = document.querySelector('main')
      if (main) (main as HTMLElement).style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      const main = document.querySelector('main')
      if (main) (main as HTMLElement).style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      const main = document.querySelector('main')
      if (main) (main as HTMLElement).style.overflow = ''
    }
  }, [show])

  useEffect(() => {
    if (!show) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [show, onClose])

  if (!show) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="mb-4 text-lg font-semibold">
            {title}
          </h2>
        )}
        {children}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return null

  return createPortal(modalContent, document.body)
}
