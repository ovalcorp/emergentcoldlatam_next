/**
 * Pagination
 * Componente reutilizable de paginación con selector de tamaño de página.
 * Compatible con cualquier módulo que use getAll con paginación.
 */

import { Select, Field, Label, Button } from '@headlessui/react'

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50, 100]

interface PaginationProps {
  count: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function Pagination({ count, page, pageSize, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.ceil(count / pageSize)

  if (count === 0) return null

  // Genera números de página con ellipsis para muchas páginas
  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
    if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }

  const pages = getPages()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-3">

      {/* Info + selector de tamaño */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-slate-500">
          Mostrando{' '}
          <span className="font-medium text-slate-700">{(page - 1) * pageSize + 1}</span>
          {' '}-{' '}
          <span className="font-medium text-slate-700">{Math.min(page * pageSize, count)}</span>
          {' '}de{' '}
          <span className="font-medium text-slate-700">{count}</span>
          {' '}registros
        </p>

        {/* Selector de tamaño de página */}
        <Field>
          <Label className="sr-only">Registros por página</Label>
          <div className="relative">
            <Select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value))
              }}
              className="
                appearance-none rounded-lg border border-slate-200
                px-3 py-1.5 pr-7 text-sm text-slate-700
                bg-white shadow-sm
                data-focus:outline-none data-focus:ring-2 data-focus:ring-black
                data-hover:border-slate-300
                transition-colors cursor-pointer
              "
            >
              {PAGE_SIZE_OPTIONS.map(size => (
                <option key={size} value={size}>{size} por página</option>
              ))}
            </Select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </Field>
      </div>

      {/* Botones de página */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">

          {/* Anterior */}
          <Button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </Button>

          {/* Números */}
          {pages.map((p, idx) =>
            p === '...' ? (
              <span key={`ellipsis-${idx}`} className="w-8 text-center text-slate-400 text-sm">
                ...
              </span>
            ) : (
              <Button
                key={p}
                onClick={() => onPageChange(Number(p))}
                className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                  p === page
                    ? 'bg-black text-white font-medium'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p}
              </Button>
            )
          )}

          {/* Siguiente */}
          <Button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente →
          </Button>

        </div>
      )}

    </div>
  )
}