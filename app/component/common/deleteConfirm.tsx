'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'

interface DeleteConfirmProps {
    // Mensaje personalizable — por defecto aplica para cualquier entidad
    message?: string
    onConfirm: () => Promise<void>
    onCancel: () => void
  }

export function DeleteConfirm({
  message = 'Esta acción no se puede deshacer.',
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
    const [loading, setLoading] = useState(false)

    const handleConfirm = async () => {
        setLoading(true)
        try {
            await onConfirm()
        } catch (error) {
            console.error('Error al eliminar:', error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">{message}</p>

      <div className="flex gap-3">
        {/* 🔴 BOTÓN ELIMINAR */}
        <Button
          onClick={handleConfirm}
          disabled={loading}
          className="
            rounded-md px-4 py-2 text-sm text-white
            bg-red-600
            data-hover:bg-red-500
            data-active:bg-red-700
            data-disabled:bg-red-300
            data-disabled:cursor-not-allowed
          "
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
        </Button>

        {/* ⚪ BOTÓN CANCELAR */}
        <Button
          onClick={onCancel}
          disabled={loading}
          className="
            rounded-md px-4 py-2 text-sm text-white
            bg-gray-600
            data-hover:bg-gray-500
            data-active:bg-gray-700
            data-disabled:bg-gray-300
            data-disabled:cursor-not-allowed
          "
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}