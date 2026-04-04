import React, { useState } from 'react'

interface UseModalReturn {
  showModal: boolean
  titleModal: string
  contentModal: React.ReactNode
  openModal: (title: string, content: React.ReactNode) => void
  closeModal: () => void
}

export function useModal(): UseModalReturn {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [contentModal, setContentModal] = useState<React.ReactNode>(null)

  const openModal = (title: string, content: React.ReactNode) => {
    setTitleModal(title)
    setContentModal(content)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  return { showModal, titleModal, contentModal, openModal, closeModal }
}