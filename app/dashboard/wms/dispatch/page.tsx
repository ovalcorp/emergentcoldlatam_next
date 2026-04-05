'use client'

import { useState } from 'react'
import { useGuiaCarnica } from '../../../hook/useGuiaCarnica'
import { SECONDARY_COLOR } from '../../../globals'

export default function DispatchPage() {
  // Vacío al inicio para que se vea el placeholder "Ej: S1" (si hay valor, el placeholder no se muestra)
  const [companyCode, setCompanyCode] = useState('')
  const [ordNum, setOrdNum] = useState('')
  const [searched, setSearched] = useState(false)
  const { rows, loading, error, getGuiaCarnica, reset } = useGuiaCarnica()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ordNum) return
    setSearched(true)
    await getGuiaCarnica({
      CompanyCode: companyCode.trim(),
      Ord_Num: Number(ordNum),
    })
  }

  const handleReset = () => {
    setOrdNum('')
    setSearched(false)
    reset()
  }

  const header = rows[0]

  return (
    <div className="w-full space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Guía Cárnica</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Company Code</label>
          <input
            type="text"
            value={companyCode}
            onChange={e => setCompanyCode(e.target.value.toUpperCase())}
            placeholder="Ej: S1"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black w-32"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Número de Despacho</label>
          <input
            type="number"
            value={ordNum}
            onChange={e => setOrdNum(e.target.value)}
            placeholder="Ej: 2581"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black w-40"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !ordNum}
          className="px-5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          {loading ? 'Consultando...' : 'Consultar'}
        </button>

        {(rows.length > 0 || searched) && (
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
          >
            Limpiar
          </button>
        )}
      </form>

      {/* ERROR */}
      {error && (
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-sm text-red-600 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* CABECERA DEL PEDIDO */}
      {header && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Cliente</p>
            <p className="text-sm font-medium text-gray-900">{header.CLIENTE || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Fecha</p>
            <p className="text-sm font-medium text-gray-900">{header.FECHA_DOCTO || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Destino</p>
            <p className="text-sm font-medium text-gray-900">{header.DESTINO || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Remisión</p>
            <p className="text-sm font-medium text-gray-900">{header.REMISION || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Dirección</p>
            <p className="text-sm font-medium text-gray-900">{header.DIRECCION || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Departamento</p>
            <p className="text-sm font-medium text-gray-900">{header.DEPTO || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Municipio</p>
            <p className="text-sm font-medium text-gray-900">{header.MUNICIPIO || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Estado</p>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
              header.TITULO === 'Pendiente'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {header.TITULO || '-'}
            </span>
          </div>
        </div>
      )}

      {/* TABLA */}
      {rows.length > 0 && (
        <div className="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-medium text-gray-700">
              {rows.length} línea{rows.length > 1 ? 's' : ''} encontrada{rows.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr style={{ backgroundColor: SECONDARY_COLOR }}>
                  {[
                    'Línea', 'Pallet ID', 'Producto', 'Descripción',
                    'Lote', 'Vence', 'Cantidad', 'Unids',
                    'Kg Neto', 'Prom', 'Temp F', 'Temp M', 'Temp T',
                    'Observaciones'
                  ].map(col => (
                    <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, idx) => (
                  <tr
                    key={`${row.PALLETID}-${row.ORD_LINE_NUM}-${idx}`}
                    className={`transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                    } hover:bg-slate-100/70`}
                  >
                    <td className="px-4 py-3 text-sm text-slate-600">{row.ORD_LINE_NUM || '-'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{row.PALLETID || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row.PRODUCTO || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row.DESCRIPCION_PRODUCTO || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row.LOTE || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row.VENCE || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">{row.CANTIDAD || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">{row.UNIDS || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">{row.KILOS_NETO || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">{row.PROM || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-center">{row.ORD_TEMP_FRONT || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-center">{row.ORD_TEMP_MID || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-center">{row.ORD_TEMP_BACK || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row.OBSERVACIONES || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SIN RESULTADOS — después de buscar */}
      {!loading && searched && rows.length === 0 && !error && (
        <div className="py-16 text-center">
          <p className="text-slate-400 text-sm">
            No se encontraron resultados para la orden <span className="font-medium text-slate-600">{ordNum}</span>
          </p>
        </div>
      )}

      {/* ESTADO INICIAL — antes de buscar */}
      {!loading && !searched && (
        <div className="py-16 text-center">
          <p className="text-slate-400 text-sm">Ingresa un Company Code y Número de Orden para consultar</p>
        </div>
      )}

    </div>
  )
}