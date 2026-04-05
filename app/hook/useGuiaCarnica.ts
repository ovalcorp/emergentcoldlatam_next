'use client'

import { useState, useCallback } from 'react'
import { handleRequest } from '../utils/handleRequest'
import { extractErrorMessage } from '../utils/extractErrorMessage'

export type GuiaCarnicaRow = {
  COMPANIA: string
  ALMACEN: string
  TITULO: string
  CLIENTE: string
  FECHA_DOCTO: string
  NIT: string
  PLACA: string
  CONDUCTOR: string
  DESTINO: string
  DIRECCION: string
  DEPTO: string
  MUNICIPIO: string
  ORD_TEMP_FRONT: string
  ORD_TEMP_MID: string
  ORD_TEMP_BACK: string
  REMISION: string
  ORD_LINE_NUM: string
  PALLETID: string
  PRODUCTO: string
  DESCRIPCION_PRODUCTO: string
  EMBALAJE: string
  LOTE: string
  VENCE: string
  CANTIDAD: string
  UNIDS: string
  KILOS_NETO: string
  PROM: string
  ORD_NUM: string
  OBSERVACIONES: string
  DIRECCION_ALMACEN: string
  TELEFONO_ALMACEN: string
}

export type GuiaCarnicaPayload = {
  CompanyCode: string
  Ord_Num: number
}

export function useGuiaCarnica() {
  const [rows, setRows] = useState<GuiaCarnicaRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getGuiaCarnica = useCallback(
    (payload: GuiaCarnicaPayload) =>
      handleRequest(async () => {
        const res = await fetch('/api/guia-carnica', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const message = await extractErrorMessage(res, 'Error al consultar guía cárnica')
          throw new Error(message)
        }

        const data = await res.json()
        setRows(data.results ?? [])
      }, setLoading, setError),
    []
  )

  const reset = () => {
    setRows([])
    setError(null)
  }

  return { rows, loading, error, getGuiaCarnica, reset }
}