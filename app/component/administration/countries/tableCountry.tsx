'use client'

import { useAuth } from '../../../hook/useAuth'
import { cardColor, SECONDARY_COLOR } from '../../../globals'
import { EditIcon, TrashIcon } from '../../common/icon/icon'
import { TableSkeleton } from '../../../ui/skeletons/table-skeletons'
import { ErrorMessage } from '../../common/errorMessage'
import { Country } from '../../../hook/useCountry'

import { Button } from '@headlessui/react'

interface TableCountryProps {
  countries: Country[]
  loading: boolean
  error: string | null
  onUpdate: (country: Country) => void
  onDelete: (country: Country) => void
  onRetry?: () => void
}

const empty = '-'

export function TableCountry({ countries, loading, error, onUpdate, onDelete, onRetry }: TableCountryProps) {
  const { user } = useAuth()

  // Solo superusuarios pueden editar y eliminar
  const showActions = user?.is_superuser ?? false

  // Muestra skeleton mientras cargan los datos
  if (loading) return <TableSkeleton rows={5} columns={2} />

  if (error) return <ErrorMessage message={error} onRetry={onRetry} />

  return (
    <div className="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm">
      {countries.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-500">No hay países registrados</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr style={{ backgroundColor: SECONDARY_COLOR }}>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  País
                </th>
                {showActions && (
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {countries.map((c, idx) => (
                <tr
                  key={c.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  } hover:bg-slate-100/70`}
                >
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">
                    {c.name ?? empty}
                  </td>
                  {showActions && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onUpdate(c)}
                          className="rounded-lg p-2 transition-all hover:bg-slate-100 hover:scale-105"
                          style={{ color: cardColor }}
                          title="Editar"
                        >
                          <EditIcon className="h-5 w-5" />
                        </Button>
                        <Button
                          onClick={() => onDelete(c)}
                          className="rounded-lg p-2 text-slate-400 transition-all hover:bg-red-50 hover:text-red-600 hover:scale-105"
                          title="Eliminar"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </Button>
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