'use client'

import { useState, useCallback } from 'react'

export type Operation = {
  id: number
  client: string
  cargo_type: string
  movement_type: string
  transport_guide: string
  wms_order: string
  vehicle_plate: string
  set_temperature: number
  yard_entry_time: string
  pre_chamber_entry_time: string
  pre_chamber_exit_time: string
  yard_exit_time: string
  operation_date: string
}

export function useOperation() {
  const [operations, setOperations] = useState<Operation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* 🔹 helper */
  const handleRequest = async (fn: () => Promise<void>) => {
    setLoading(true)
    setError(null)

    try {
      await fn()
    } catch (err: any) {
      setError(err.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  /* =======================
     📥 GET OPERATIONS
  ======================= */
  const getOperations = useCallback(async () => {
    await handleRequest(async () => {
      const res = await fetch('/api/operations', { credentials: 'include' })
      if (!res.ok) throw new Error('Error al obtener operaciones')

      const data = await res.json()
      setOperations(data)
    })
  }, [])

  /* =======================
     ➕ CREATE OPERATION
  ======================= */
  const createOperation = async (payload: Partial<Operation>) => {
    await handleRequest(async () => {
      const res = await fetch('/api/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al crear operación')

      const newOperation = await res.json()
      setOperations((prev) => [...prev, newOperation])
    })
  }

  /* =======================
     ✏️ UPDATE OPERATION
  ======================= */
  const updateOperation = async (id: number, payload: Partial<Operation>) => {
    await handleRequest(async () => {
      const res = await fetch(`/api/operations/${id}`, {
        method: 'PATCH', // o PUT si usas actualización completa
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al actualizar operación')

      const updated = await res.json()

      setOperations((prev) =>
        prev.map((o) => (o.id === id ? updated : o))
      )
    })
  }

  /* =======================
     🗑️ DELETE OPERATION
  ======================= */
  const deleteOperation = async (id: number) => {
    await handleRequest(async () => {
      const res = await fetch(`/api/operations/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Error al eliminar operación')

      setOperations((prev) => prev.filter((o) => o.id !== id))
    })
  }

  return {
    operations,
    loading,
    error,

    getOperations,
    createOperation,
    updateOperation,
    deleteOperation,
  }
}