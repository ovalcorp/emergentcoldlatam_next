'use client'

import { useAuth } from '../../hook/useAuth'
import { cardColor, SECONDARY_COLOR } from '../../globals'

interface TableOperationProps {
  operations: Array<{
    id: number
    client?: string
    cargo_type?: string
    movement_type?: string
    transport_guide?: string
    wms_order?: string
    vehicle_plate?: string
    set_temperature?: number
    yard_entry_time?: string
    pre_chamber_entry_time?: string
    pre_chamber_exit_time?: string
    yard_exit_time?: string
    operation_date?: string
  }>
  updateOperation?: (operation: unknown) => void
  onDeleteOperation?: (operation: unknown) => void
}

const empty = '-'

/** Formatea hora (ej. "17:43:07" o "17:43") a "17:43" */
function formatTime(timeString: string | undefined): string {
  if (!timeString) return empty
  const match = timeString.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/)
  if (match) return `${match[1].padStart(2, '0')}:${match[2]}`
  return timeString
}

/** Formatea ISO o fecha (ej. 2026-02-23T17:43:07Z) a "23/02/2026" */
function formatDate(dateString: string | undefined): string {
  if (!dateString) return empty
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

/* 🔹 ICONOS */

function EditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 7.5-7.5z"
      />
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6M14 11v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V4h6v3M4 7h16" />
    </svg>
  )
}

export function TableOperation({ operations, updateOperation, onDeleteOperation }: TableOperationProps) {
  const { user } = useAuth()
  const showActions = user?.is_staff || false

  return (
    <div className="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm">

      {operations.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-500">No hay operaciones registradas</p>
        </div>
      ) : (

        /* 🔹 CONTENEDOR SCROLL */
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1400px]">

            {/* 🔹 HEADER */}
            <thead>
              <tr style={{ backgroundColor: SECONDARY_COLOR }}>
                {[
                  'Cliente',
                  'Tipo carga',
                  'Tipo movimiento',
                  'Guía transporte',
                  'Orden WMS',
                  'Placa vehículo',
                  'Temp. consigna',
                  'Entrada patio',
                  'Entrada precámara',
                  'Salida precámara',
                  'Salida patio',
                  'Fecha operación',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    {col}
                  </th>
                ))}

                {showActions && (
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>

            {/* 🔹 BODY */}
            <tbody className="divide-y divide-slate-100">
              {operations.map((op, idx) => (
                <tr
                  key={op.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  } hover:bg-slate-100/70`}
                >
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">{op.client ?? empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{op.cargo_type ?? empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{op.movement_type ?? empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{op.transport_guide ?? empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{op.wms_order ?? empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{op.vehicle_plate ?? empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{op.set_temperature != null ? op.set_temperature : empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{formatTime(op.yard_entry_time)}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{formatTime(op.pre_chamber_entry_time)}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{formatTime(op.pre_chamber_exit_time)}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{formatTime(op.yard_exit_time)}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{formatDate(op.operation_date)}</td>

                  {/* 🔹 ACCIONES */}
                  {showActions && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">

                        {updateOperation && (
                          <button
                            onClick={() => updateOperation(op)}
                            className="rounded-lg p-2 transition-all hover:bg-slate-100 hover:scale-105"
                            style={{ color: cardColor }}
                            title="Editar"
                          >
                            <EditIcon className="h-5 w-5" />
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteOperation?.(op)}
                          className="rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600 hover:scale-105"
                          title="Eliminar"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>

                      </div>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
