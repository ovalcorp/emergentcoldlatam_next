'use client'

import { useAuth } from '../../../hook/useAuth'
import { cardColor, SECONDARY_COLOR } from '../../../globals'
import { EditIcon, TrashIcon } from '../../common/icon/edit-icon'
import { TableSkeleton } from '../../../ui/skeletons/table-skeletons'
import { ErrorMessage } from '../../common/errorMessage'
import { Site } from '../../../hook/useSite'
import { Button } from '@headlessui/react'

interface TableSiteProps {
  sites: Site[]
  loading: boolean
  error: string | null
  onUpdate: (site: Site) => void
  onDelete: (site: Site) => void
  onRetry?: () => void
}

const empty = '-'

export function TableSite({ sites, loading, error, onUpdate, onDelete, onRetry }: TableSiteProps) {
  const { user } = useAuth()
  const showActions = user?.is_superuser ?? false

  if (loading) return <TableSkeleton rows={5} columns={7} />

  if (error) return <ErrorMessage message={error} onRetry={onRetry} />

  return (
    <div className="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm">
      {sites.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-500">No hay sitios registrados</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr style={{ backgroundColor: SECONDARY_COLOR }}>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Nombre
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  País
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  Razón Social
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  RUC / Tax
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  IP Principal
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                  IP Secundaria
                </th>
                {showActions && (
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sites.map((s, idx) => (
                <tr
                  key={s.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  } hover:bg-slate-100/70`}
                >
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">
                    {s.name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {s.country_name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {s.legal_name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {s.tax ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600 font-mono">
                    {s.ip_principal ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600 font-mono">
                    {s.ip_secondary ?? empty}
                  </td>
                  {showActions && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onUpdate(s)}
                          className="rounded-lg p-2 transition-all hover:bg-slate-100 hover:scale-105"
                          style={{ color: cardColor }}
                          title="Editar"
                        >
                          <EditIcon className="h-5 w-5" />
                        </Button>
                        <Button
                          onClick={() => onDelete(s)}
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