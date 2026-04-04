'use client'

import { useState, useCallback } from 'react'
import { Country } from './useCountry'
import { getAll, createOne, updateOne, deleteOne, Pagination } from '../services/crudService'

// Lo que RECIBES del backend (GET)
export type Site = {
  id: number
  name: string
  country: Country      // objeto completo { id, name }
  country_name: string  // campo read_only del serializer
  ip_principal: string
  ip_secondary: string
  tax: string
  legal_name: string
}

// Lo que ENVÍAS al backend (POST/PATCH)
export type SitePayload = {
  name: string
  country: number
  ip_principal: string | null
  ip_secondary: string | null
  tax: string | null
  legal_name: string | null
}

export function useSite() {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<Pagination>({ count: 0, next: null, previous: null })

  const endpoint = 'sites'
  const base = { endpoint, setLoading, setError }

  const getSites = useCallback((search?: string, page?: number, pageSize?: number) =>
    getAll<Site>({ ...base, search, page, pageSize, setData: setSites, setPagination })
  , [])

  const createSite = (payload: SitePayload) =>
    createOne<Site, SitePayload>({ ...base, payload, setData: setSites })
  
  const updateSite = (id: number, payload: Partial<SitePayload>) =>
    updateOne<Site, Partial<SitePayload>>({ ...base, id, payload, setData: setSites })
  

  const deleteSite = (id: number) =>
    deleteOne<Site>({ ...base, id, setData: setSites })

  return {
    sites,
    loading,
    error,
    pagination,

    getSites,
    createSite,
    updateSite,
    deleteSite,
  }
}