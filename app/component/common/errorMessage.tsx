/**
 * ErrorMessage
 * Componente para errores CONTROLADOS del fetch en tablas y páginas.
 * Se usa cuando la API retorna un error (404, 401, 500, etc.)
 * y queremos mostrarlo de forma amigable sin romper el render.
 * 
 * Diferencia con error.tsx:
 * - error.tsx    → crashes inesperados, lo maneja Next.js automáticamente
 * - ErrorMessage → errores controlados, lo llamas tú explícitamente
 * 
 * Uso:
 * if (error) return <ErrorMessage message={error} onRetry={() => getData()} />
 */
'use client'

import { Button } from '@headlessui/react'

interface ErrorMessageProps {
    message: string
    // onRetry opcional — permite reintentar el fetch desde la tabla
    onRetry?: () => void
  }
  
  export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-64 gap-4">
  
        {/* Ícono */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
  
        {/* Mensaje */}
        <div className="text-center">
          <p className="text-gray-900 font-semibold text-sm mb-1">
            Error al cargar los datos
          </p>
          <p className="text-gray-500 text-xs">{message}</p>
        </div>
  
        {/* Botón de reintento — solo si se pasa onRetry */}
        {onRetry && (
          <Button
            onClick={onRetry}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm transition-colors"
          >
            Reintentar
          </Button>
        )}
  
      </div>
    )
  }