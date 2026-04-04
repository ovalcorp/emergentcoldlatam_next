/**
 * Funciones genéricas de CRUD reutilizables para cualquier endpoint.
 * Usa genéricos <T> para mantener tipado correcto en cada hook.
 *
 * Uso:
 * await getAll<Country>({ endpoint: 'countries', search, setState, setLoading, setError })
 * await createOne<Country>({ endpoint: 'countries', payload, setState, setLoading, setError })
 */

import { handleRequest } from '../utils/handleRequest'
import { extractErrorMessage } from '../utils/extractErrorMessage'

// Tipo para respuestas paginadas, el results es como te devuelven los datos
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type Pagination = Omit<PaginatedResponse<unknown>, 'results'>

// Tipo base que todos los recursos deben tener
interface BaseEntity {
    id: number
  }

// Parámetros comunes a todas las operaciones
interface BaseParams {
    endpoint: string
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
  }

// ─────────────────────────────────────────
// 📥 GET ALL (con search opcional)
// ─────────────────────────────────────────
interface GetAllParams<T> extends BaseParams {
    search?: string
    page?: number
    pageSize?: number
    setData: (data: T[]) => void
    setPagination?: (pagination: Pagination) => void
  }

export function getAll<T>({
    endpoint, search, page, pageSize,
    setData, setPagination, setLoading, setError
  }: GetAllParams<T>) {
    return handleRequest(async () => {
      const params = new URLSearchParams()
      if (search)   params.append('search', search)
      if (page)     params.append('page', String(page))
      if (pageSize) params.append('page_size', String(pageSize))
  
      const res = await fetch(`/api/${endpoint}?${params}`, { credentials: 'include' })
      if (!res.ok) {
        const message = await extractErrorMessage(res, `Error al obtener en ${endpoint}`)
        throw new Error(message)
      }
  
      const data = await res.json()
  
      // ✅ Detecta automáticamente si es paginado o no
      if (data.results !== undefined) {
        setData(data.results)
        setPagination?.({ count: data.count, next: data.next, previous: data.previous })
      } else {
        setData(data)
      }
    }, setLoading, setError)
  }

// ─────────────────────────────────────────
// ➕ CREATE — P es el tipo del payload, T es el tipo del dato
// ─────────────────────────────────────────
interface CreateOneParams<T, P = Partial<T>> extends BaseParams {
  payload: P
  setData: React.Dispatch<React.SetStateAction<T[]>>
}

export function createOne<T extends BaseEntity, P = Partial<T>>({ endpoint, payload, setData, setLoading, setError }: CreateOneParams<T, P>) {
  return handleRequest(async () => {
    const res = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const message = await extractErrorMessage(res, `Error al crear en ${endpoint}`)
      throw new Error(message)
    }

    const created: T = await res.json()
    setData(prev => [...prev, created])
  }, setLoading, setError)
}

// ─────────────────────────────────────────
// ✏️ UPDATE (PATCH) — P es el tipo del payload, T es el tipo del dato
// ─────────────────────────────────────────
interface UpdateOneParams<T, P = Partial<T>> extends BaseParams {
  id: number
  payload: P
  setData: React.Dispatch<React.SetStateAction<T[]>>
}

export function updateOne<T extends BaseEntity, P = Partial<T>>({ endpoint, id, payload, setData, setLoading, setError }: UpdateOneParams<T, P>) {
  return handleRequest(async () => {
    const res = await fetch(`/api/${endpoint}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const message = await extractErrorMessage(res, `Error al actualizar en ${endpoint}`)
      throw new Error(message)
    }

    const updated: T = await res.json()
    setData(prev => prev.map(item => item.id === id ? updated : item))
  }, setLoading, setError)
}

// ─────────────────────────────────────────
// 🗑️ DELETE
// ─────────────────────────────────────────
interface DeleteOneParams<T> extends BaseParams {
    id: number
    setData: React.Dispatch<React.SetStateAction<T[]>>
  }
  
  export function deleteOne<T extends BaseEntity>({ endpoint, id, setData, setLoading, setError }: DeleteOneParams<T>) {
    return handleRequest(async () => {
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!res.ok) {
        const message = await extractErrorMessage(res, `Error al eliminar en ${endpoint}`)
        throw new Error(message)
      }
  
      // Elimina el item de la lista
      setData(prev => prev.filter(item => item.id !== id))
    }, setLoading, setError)
  }