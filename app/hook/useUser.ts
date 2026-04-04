'use client'

import { useState, useCallback } from 'react'
import { Country } from './useCountry'
import { Site } from './useSite'
import { Department } from './useDepartment'
import { Area } from './useArea'
import { Metadata } from './useMetadata'
import { getAll, createOne, updateOne, deleteOne, Pagination } from '../services/crudService'

// Lo que RECIBES del backend (GET)
export type User = {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string

  country: Country
  country_name: string

  site: Site
  site_name: string

  department: Department
  department_name: string

  area: Area
  area_name: string

  metadata: number[]
  metadata_names: { id: number; name: string }[]

  permissions_sites: number[]
  permissions_sites_names: { id: number; name: string }[]

  identification_number: string
  position: string

  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
}

// Lo que ENVÍAS al backend (POST/PATCH)
export type UserPayload = {
  email: string
  username: string
  password: string

  first_name: string
  last_name: string
  identification_number: string
  position: string

  country: number
  site: number
  department: number
  area: number

  permissions_sites?: number[]
  metadata?: number[]

  is_active?: boolean
  is_staff?: boolean
  is_superuser?: boolean
}

// 🔥 UPDATE
export type UserUpdatePayload = Partial<UserPayload>

export function useUser() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({
    count: 0,
    next: null,
    previous: null
  })

  const endpoint = 'users'
  const base = { endpoint, setLoading, setError }

  /* =======================
     📥 GET USERS
  ======================= */
  const getUsers = useCallback(
    (search?: string, page?: number, pageSize?: number) =>
      getAll<User>({
        ...base,
        search,
        page,
        pageSize,
        setData: setUsers,
        setPagination
      }),
    []
  )

  /* =======================
     📥 CREATE USER
  ======================= */
  const createUser = (payload: UserPayload) =>
    createOne<User, UserPayload>({
      ...base,
      payload,
      setData: setUsers
    })

  /* =======================
     📥 UPDATE USER
  ======================= */
  const updateUser = (id: number, payload: UserUpdatePayload) =>
    updateOne<User, UserUpdatePayload>({
      ...base,
      id,
      payload,
      setData: setUsers
    })

  /* =======================
     📥 DELETE USER
  ======================= */
  const deleteUser = (id: number) =>
    deleteOne<User>({
      ...base,
      id,
      setData: setUsers
    })

  return {
    users,
    loading,
    error,
    pagination,

    getUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}