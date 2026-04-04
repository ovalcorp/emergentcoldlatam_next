'use client'

import { useAuth } from '../../../hook/useAuth'
import { cardColor, SECONDARY_COLOR } from '../../../globals'
import { EditIcon, TrashIcon, ActiveIcon, InactiveIcon } from '../../common/icon/icon'
import { TableSkeleton } from '../../../ui/skeletons/table-skeletons'
import { ErrorMessage } from '../../common/errorMessage'
import { User } from '../../../hook/useUser'
import { Button } from '@headlessui/react'

interface TableUserProps {
  users: User[]
  loading: boolean
  error: string | null
  onUpdate: (user: User) => void
  onDelete: (user: User) => void
  onRetry?: () => void
}

const empty = '-'

export function TableUser({users, loading, error, onUpdate, onDelete, onRetry }: TableUserProps) {

  const { user } = useAuth()
  const showActions = user?.is_superuser ?? false

  if (loading) return <TableSkeleton rows={5} columns={10} />

  if (error) return <ErrorMessage message={error} onRetry={onRetry} />

  return (
    <div className="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm">
      {users.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-500">No hay usuarios registrados</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr style={{ backgroundColor: SECONDARY_COLOR }}>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Nombres</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Apellidos</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Documento de identidad</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Cargo</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Departamento</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Área</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">País</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Site</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Staff</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Activo</th>
                {showActions && <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">Acciones</th>}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((u, idx) => (
                <tr
                  key={u.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  } hover:bg-slate-100/70`}
                >
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">
                    {u.first_name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">
                    {u.last_name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {u.identification_number ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {u.position ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {u.department_name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {u.area_name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {u.country_name ?? empty}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">
                    {u.site_name ?? empty}
                  </td>

                  {/* 🔥 Boolean nice UI */}
                  <td className="td">
                    {u.is_staff ? <ActiveIcon className="h-5 w-5" /> : <InactiveIcon className="h-5 w-5" />}
                  </td>

                  <td className="px-5 py-3 text-sm text-slate-600">
                    {u.is_active ? <ActiveIcon className="h-5 w-5" /> : <InactiveIcon className="h-5 w-5" />}
                  </td>

                  {showActions && (
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onUpdate(u)}
                          className="rounded-lg p-2 transition-all hover:bg-slate-100 hover:scale-105"
                          style={{ color: cardColor }}
                          title="Editar"
                        >
                          <EditIcon className="h-5 w-5" />
                        </Button>

                        <Button
                          onClick={() => onDelete(u)}
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