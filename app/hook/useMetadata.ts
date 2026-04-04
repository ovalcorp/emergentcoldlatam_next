'use client'

import { useState, useCallback } from 'react'
import { getAll, createOne, updateOne, deleteOne } from '../services/crudService'

export type Metadata = {
  id: number
  name: string
}

export function useMetadata() {
  const [metadataList, setMetadataList] = useState<Metadata[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const endpoint = 'metadata'
  const base = { endpoint, setLoading, setError }

  const getMetadata = useCallback(
    (search?: string) => getAll<Metadata>({ ...base, search, setData: setMetadataList }),
    []
  )

  const createMetadata = (payload: Partial<Metadata>) =>
    createOne<Metadata>({ ...base, payload, setData: setMetadataList })

  const updateMetadata = (id: number, payload: Partial<Metadata>) =>
    updateOne<Metadata>({ ...base, id, payload, setData: setMetadataList })

  const deleteMetadata = (id: number) =>
    deleteOne<Metadata>({ ...base, id, setData: setMetadataList })

  return {
    metadataList,
    loading,
    error,

    getMetadata,
    createMetadata,
    updateMetadata,
    deleteMetadata,
  }
}
