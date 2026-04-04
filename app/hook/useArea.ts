'use client'

import { useState, useCallback } from 'react'
import { createOne, updateOne, deleteOne } from '../services/crudService'
import { handleRequest } from '../utils/handleRequest'
import { extractErrorMessage } from '../utils/extractErrorMessage'

/** Respuesta del serializer (GET) */
export type Area = {
  id: number
  name: string
  department: number
  department_name: string
}

/** Body para POST/PATCH */
export type AreaPayload = {
  name: string
  department: number
}

export function useArea() {
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const endpoint = 'areas'
  const base = { endpoint, setLoading, setError }

  /**
   * Lista áreas; opcionalmente filtra por departamento (misma query que el proxy Next → Django).
   */
  const getAreas = useCallback(
    (search?: string, departmentId?: number) =>
      handleRequest(async () => {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (departmentId != null) params.append('department', String(departmentId))

        const qs = params.toString()
        const res = await fetch(`/api/areas${qs ? `?${qs}` : ''}`, {
          credentials: 'include',
        })
        if (!res.ok) {
          const message = await extractErrorMessage(res, 'Error al obtener áreas')
          throw new Error(message)
        }

        const data = await res.json()
        if (data.results !== undefined) {
          setAreas(data.results)
        } else {
          setAreas(data)
        }
      }, setLoading, setError),
    []
  )

  const createArea = (payload: AreaPayload) =>
    createOne<Area, AreaPayload>({ ...base, payload, setData: setAreas })

  const updateArea = (id: number, payload: Partial<AreaPayload>) =>
    updateOne<Area, Partial<AreaPayload>>({ ...base, id, payload, setData: setAreas })

  const deleteArea = (id: number) => deleteOne<Area>({ ...base, id, setData: setAreas })

  return {
    areas,
    loading,
    error,

    getAreas,
    createArea,
    updateArea,
    deleteArea,
  }
}
