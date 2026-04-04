'use client'

import { useState, useCallback } from 'react'
import { getAll, createOne, updateOne, deleteOne } from '../services/crudService'

export type Department = {
  id: number
  name: string
}

export function useDepartment() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const endpoint = 'departments'
  const base = { endpoint, setLoading, setError }

  const getDepartments = useCallback(
    (search?: string) => getAll<Department>({ ...base, search, setData: setDepartments }),
    []
  )

  const createDepartment = (payload: Partial<Department>) =>
    createOne<Department>({ ...base, payload, setData: setDepartments })

  const updateDepartment = (id: number, payload: Partial<Department>) =>
    updateOne<Department>({ ...base, id, payload, setData: setDepartments })

  const deleteDepartment = (id: number) =>
    deleteOne<Department>({ ...base, id, setData: setDepartments })

  return {
    departments,
    loading,
    error,

    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  }
}
