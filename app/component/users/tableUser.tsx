'use client'

import { useAuth } from '../../hook/useAuth'
import { BRAND_COLOR, successColor, cardColor, SECONDARY_COLOR, deleteColor } from '../../globals'

interface TableUserProps {
  users: Array<{
    id: number
    first_name?: string
    last_name?: string
    identification_number?: string
    position?: string
    area?: string
    department?: string
    country?: string
    site?: string
    is_active?: boolean
  }>
  updateUser?: (user: unknown) => void
  onDeleteUser?: (user: unknown) => void
}

const empty = '-'

/* 🔹 ICONOS */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

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

export function TableUser({ users, updateUser, onDeleteUser }: TableUserProps) {
  const { user } = useAuth()
  const showActions = user?.is_superuser || false

  return (
    <div className="w-full rounded-xl border border-slate-200/80 bg-white shadow-sm">

      {users.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-500">No hay usuarios registrados</p>
        </div>
      ) : (

        /* 🔹 CONTENEDOR SCROLL */
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px]">

            {/* 🔹 HEADER */}
            <thead>
              <tr style={{ backgroundColor: SECONDARY_COLOR }}>
                {[
                  'Nombre',
                  'Apellido',
                  'DNI',
                  'Cargo',
                  'Área',
                  'Departamento',
                  'País',
                  'Site',
                  'Activo',
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
              {users.map((u, idx) => (
                <tr
                  key={u.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                  } hover:bg-slate-100/70`}
                >
                  <td className="px-5 py-3 text-sm font-medium text-slate-900">{u.first_name || empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{u.last_name || empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{u.identification_number || empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{u.position || empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{u.area || empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{u.department || empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{u.country || empty}</td>
                  <td className="px-5 py-3 text-sm text-slate-700">{u.site || empty}</td>

                  {/* 🔹 ESTADO */}
                  <td className="px-5 py-3">
                    {u.is_active ? (
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${successColor}22`, color: successColor }}
                      >
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    ) : (
                      <span 
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600"
                      style={{ backgroundColor: `${deleteColor}22`, color: deleteColor }}
                      >
                        <XIcon className="h-5 w-5" />
                      </span>
                      
                    )}
                  </td>

                  {/* 🔹 ACCIONES */}
                  {showActions && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">

                        {updateUser && (
                          <button
                            onClick={() => updateUser(u)}
                            className="rounded-lg p-2 transition-all hover:bg-slate-100 hover:scale-105"
                            style={{ color: cardColor }}
                            title="Editar"
                          >
                            <EditIcon className="h-5 w-5" />
                          </button>
                        )}

                        <button
                          onClick={() => onDeleteUser?.(u)}
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
