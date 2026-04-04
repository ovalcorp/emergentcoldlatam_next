'use client'

import { useState, useCallback } from 'react'
import { getAll, createOne, updateOne, deleteOne } from '../services/crudService'

export type Country = {
  id: number
  name: string
}

export function useCountry() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const endpoint = 'countries'
  const base = { endpoint, setLoading, setError }

  const getCountries = useCallback((search?: string) =>
    getAll<Country>({ ...base, search, setData: setCountries })
  , [])

  const createCountry = (payload: Partial<Country>) =>
    createOne<Country>({ ...base, payload, setData: setCountries })

  const updateCountry = (id: number, payload: Partial<Country>) =>
    updateOne<Country>({ ...base, id, payload, setData: setCountries })

  const deleteCountry = (id: number) =>
    deleteOne<Country>({ ...base, id, setData: setCountries })

  return {
    countries,
    loading,
    error,

    getCountries,
    createCountry,
    updateCountry,
    deleteCountry,
  }
}