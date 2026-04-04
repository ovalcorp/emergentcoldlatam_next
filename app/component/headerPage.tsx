'use client'
import { Button } from '@headlessui/react'

interface HeaderPageProps {
  title: string
  onNew: () => void
  onSync?: () => void
  showNewButton?: boolean
}

export function HeaderPage({ title, onNew, onSync, showNewButton = true }: HeaderPageProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-xl sm:text-2xl font-bold text-black">{title}</h1>

      <div className="flex gap-2">
        {onSync && (
          <Button
            onClick={onSync}
            className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-sm flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sincronizar
          </Button>
        )}

        {showNewButton && (
          <Button
            onClick={onNew}
            className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-sm flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo
          </Button>
        )}
      </div>
    </div>
  )
}