'use client'

import { useState, useCallback } from 'react'

export type User = {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  identification_number: string
  position: string
  area: string
  department: string
  country: string
  site: string
}

export function useUser() {
  const [users, setUsers] = useState<User[]>([])
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
     📥 GET USERS
  ======================= */
  const getUsers = useCallback(async () => {
    await handleRequest(async () => {
      const res = await fetch('/api/users', { credentials: 'include' })
      if (!res.ok) throw new Error('Error al obtener usuarios')

      const data = await res.json()
      setUsers(data)
    })
  }, [])

  /* =======================
     ➕ CREATE USER
  ======================= */
  const createUser = async (payload: Partial<User>) => {
    await handleRequest(async () => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al crear usuario')

      const newUser = await res.json()
      setUsers((prev) => [...prev, newUser])
    })
  }

  /* =======================
     ✏️ UPDATE USER
  ======================= */
  const updateUser = async (id: number, payload: Partial<User>) => {
    await handleRequest(async () => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PATCH', // o PUT si usas actualización completa
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al actualizar usuario')

      const updated = await res.json()

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updated : u))
      )
    })
  }

  /* =======================
     🗑️ DELETE USER
  ======================= */
  const deleteUser = async (id: number) => {
    await handleRequest(async () => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Error al eliminar usuario')

      setUsers((prev) => prev.filter((u) => u.id !== id))
    })
  }

  return {
    users,
    loading,
    error,

    getUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}
